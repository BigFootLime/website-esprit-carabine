import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const products = await payload.find({
      collection: 'product',
      pagination: false, // 👈 returns all docs
      depth: 1,
      sort: '-createdAt',
    })

    return Response.json(products)
  } catch (_) {
    return Response.json({ error: 'Erreur lors du chargement des produits' }, { status: 500 })
  }
}
