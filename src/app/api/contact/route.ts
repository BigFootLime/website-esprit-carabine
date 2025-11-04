// app/api/contact/route.ts
export const runtime = 'nodejs' // ⬅️ nodemailer a besoin du runtime node
export const dynamic = 'force-dynamic' // ⬅️ pour éviter le cache route

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type Product = { id: string; title: string; price: number }

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

// Construit la base URL du site (prod/dev) sans Vercel_URL
function getBaseUrl(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL
  const proto = req.headers.get('x-forwarded-proto') ?? 'http'
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  return `${proto}://${host}`
}

// Récupère les produits via ton REST Payload (slug = 'product')
async function fetchProductsByIds(req: NextRequest, ids: string[]): Promise<Product[]> {
  if (!ids.length) return []

  const base = getBaseUrl(req)
  const res = await fetch(`${base}/api/products?limit=1000&depth=0`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`)
  }

  const data = await res.json()
  const docs = Array.isArray(data?.docs) ? data.docs : []

  // ✅ Filtre ici localement, pour ne garder que ceux sélectionnés
  const filtered = docs.filter((d: any) => ids.includes(String(d.id)))

  return filtered.map((d: any) => ({
    id: String(d.id),
    title: d.title,
    price: Number(d.price) || 0,
  }))
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    // honeypot
    if ((formData.get('company') as string) || ''.trim() !== '') {
      return NextResponse.json({ ok: true })
    }

    const firstName = String(formData.get('firstName') || '').trim()
    const lastName = String(formData.get('lastName') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const message = String(formData.get('message') || '').trim()

    const ids = Array.from(new Set(formData.getAll('productIds[]').map(String).filter(Boolean)))

    // ✅ On lit via l’endpoint REST (plus de payload.find qui plante)
    const items = await fetchProductsByIds(req, ids)
    const total = items.reduce((s, p) => s + p.price, 0)

    // ✅ Transport SMTP (Gmail / Orange selon ton .env)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true', // 465 => true
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const to = process.env.CONTACT_TO || 'esprit.carabine@orange.fr'
    const subject = `Demande via le site — ${firstName} ${lastName}`

    const rows = items
      .map(
        (p) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(p.title)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${p.price.toFixed(2)} €</td>
      </tr>
    `,
      )
      .join('')

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111;">
        <h2 style="margin:0 0 8px;">Nouvelle demande de contact</h2>
        <p style="margin:0 0 16px;color:#555;">Envoyée depuis le formulaire du site.</p>

        <h3 style="margin:16px 0 8px;">Coordonnées</h3>
        <table style="border-collapse:collapse;width:100%;max-width:640px;">
          <tr><td style="padding:4px 0;color:#555;">Nom</td><td>${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
          <tr><td style="padding:4px 0;color:#555;">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:4px 0;color:#555;">Téléphone</td><td>${escapeHtml(phone)}</td></tr>
        </table>

        <h3 style="margin:24px 0 8px;">Produits</h3>
        ${
          items.length === 0
            ? '<p style="color:#555;">Aucun produit sélectionné.</p>'
            : `<table style="border-collapse:collapse;width:100%;max-width:640px;">
                 <thead><tr>
                   <th style="text-align:left;padding:8px;border-bottom:1px solid #ddd;">Produit</th>
                   <th style="text-align:right;padding:8px;border-bottom:1px solid #ddd;">Prix</th>
                 </tr></thead>
                 <tbody>${rows}</tbody>
                 <tfoot><tr>
                   <td style="padding:8px;border-top:2px solid #111;font-weight:600;">Total</td>
                   <td style="padding:8px;border-top:2px solid #111;text-align:right;font-weight:600;">${total.toFixed(2)} €</td>
                 </tr></tfoot>
               </table>`
        }

        ${message ? `<h3 style="margin:24px 0 8px;">Message</h3><p style="white-space:pre-wrap;color:#111;">${escapeHtml(message)}</p>` : ''}

        <p style="margin-top:24px;font-size:12px;color:#888;">Email automatique • Ne pas répondre.</p>
      </div>
    `
    const text = [
      `Commande`,
      `Nom: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Téléphone: ${phone}`,
      '',
      'Produits:',
      ...items.map((p) => `- ${p.title} — ${p.price.toFixed(2)} €`),
      `Total: ${total.toFixed(2)} €`,
      '',
      message ? `Message:\n${message}` : '',
    ].join('\n')

    const info = await transporter.sendMail({
      to,
      from: process.env.SMTP_FROM || process.env.SMTP_USER, // ⬅️ garde aligné avec l’expéditeur SMTP
      replyTo: email || undefined,
      subject,
      text,
      html,
    })

    // Log utile pour debug (peut être retiré après test)
    console.log('MAIL SENT id=', info.messageId)

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('CONTACT_API_ERROR', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
