// app/api/about/route.ts
import { NextRequest } from 'next/server'

const getBase = () => process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL

export async function GET() {
  const base = getBase()
  if (!base) {
    return Response.json(
      { error: 'Missing PAYLOAD_PUBLIC_SERVER_URL or NEXT_PUBLIC_SITE_URL' },
      { status: 500 },
    )
  }
  const res = await fetch(`${base}/api/about?depth=1&limit=1`, { cache: 'no-store' })
  return new Response(await res.text(), { status: res.status, headers: res.headers })
}

export async function POST(req: NextRequest) {
  const base = getBase()
  if (!base) {
    return Response.json(
      { error: 'Missing PAYLOAD_PUBLIC_SERVER_URL or NEXT_PUBLIC_SITE_URL' },
      { status: 500 },
    )
  }

  // Forward query string too
  const url = new URL(req.url)
  const qs = url.search ? url.search : ''

  // Detect content type to forward correctly
  const contentType = req.headers.get('content-type') || ''

  let body: BodyInit | undefined
  const headers: HeadersInit = {
    // forward auth/cookies if you rely on them
    authorization: req.headers.get('authorization') || '',
    cookie: req.headers.get('cookie') || '',
  }

  if (contentType.includes('application/json')) {
    headers['content-type'] = 'application/json'
    body = JSON.stringify(await req.json())
  } else if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData()
    body = formData // node-fetch in Next can send FormData directly
    // content-type with boundary will be set automatically
  } else {
    // fallback: stream raw body
    body = req.body as any
    if (contentType) headers['content-type'] = contentType
  }

  const res = await fetch(`${base}/api/about${qs}`, {
    method: 'POST',
    headers,
    body,
    // important when forwarding credentials
    redirect: 'manual',
  })

  return new Response(await res.text(), { status: res.status, headers: res.headers })
}
