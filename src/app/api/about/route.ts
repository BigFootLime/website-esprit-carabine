// app/api/about/route.ts
export async function GET() {
  try {
    const base = process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL

    if (!base) {
      return Response.json(
        { error: 'Missing PAYLOAD_PUBLIC_SERVER_URL or NEXT_PUBLIC_SITE_URL' },
        { status: 500 },
      )
    }

    // Proxy to your Payload REST API (public read)
    const res = await fetch(`${base}/api/about?depth=1&limit=1`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return Response.json(
        { error: 'Failed to fetch from Payload /api/about' },
        { status: res.status },
      )
    }

    const data = await res.json()
    return Response.json(data)
  } catch (err) {
    console.error('GET /api/about error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
