import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const products = await payload.find({
      collection: 'product',
    })

    return Response.json(products)
  } catch (error) {
    return Response.json({ error: 'Erreur lors du chargement des produits' }, { status: 500 })
  }
}
