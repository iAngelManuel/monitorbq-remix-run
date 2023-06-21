import { useLoaderData } from '@remix-run/react'
import { getGuitarras } from '~/api/guitarras.server'
import ListadoGuitarras from '~/components/listado-guitarras'

export async function loader() {
  const guitarras = await getGuitarras()
  return guitarras.data
}

export function meta() {
  return [
    {
      title: 'Tienda',
      description: 'Tienda de guitarras',
      keywords: 'guitarras, tienda, musica',
    }
  ]
}

export default function Tienda() {
  const guitarras = useLoaderData()
  return (
    <ListadoGuitarras
      guitarras={guitarras}
    />
  )
}
