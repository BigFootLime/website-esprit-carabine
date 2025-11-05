// app/api/training/route.ts
export async function GET() {
  try {
    const base = process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL

    if (!base) {
      return Response.json(
        { error: 'Missing PAYLOAD_PUBLIC_SERVER_URL or NEXT_PUBLIC_SITE_URL' },
        { status: 500 },
      )
    }

    // Adjust endpoint/params to your collection name & needs
    const res = await fetch(`${base}/api/coaching?depth=1&limit=100`, { cache: 'no-store' })
    if (!res.ok) {
      return Response.json({ error: 'Failed to fetch /api/coaching' }, { status: res.status })
    }

    const data = await res.json()
    return Response.json(data)
  } catch (e) {
    console.error('GET /api/training error:', e)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
