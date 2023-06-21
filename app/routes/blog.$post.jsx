import { useLoaderData } from '@remix-run/react'
import { getPost } from '~/api/posts.server'
import { formatearFecha } from '~/utils/helper'

export async function loader({ params }) {
  const { post } = params
  const postUrl = await getPost(post)
  if (postUrl.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Post no encontrado'
    })
  }
  return postUrl
}

export function meta({ data }) {
  if (!data) {
    return {
      title: 'GuitarLA - Post no encontrada',
      description: 'Guitarras, venta de guitarras, post no encontrada'
    }
  }
  return [
    {
      title: `GuitarLA - ${data.data[0].attributes.nombre}`,
      description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
    }
  ]
}

export default function Blog() {
  const data = useLoaderData()
  const { titulo, contenido, publishedAt } = data.data[0].attributes
  return (
    <article className="post mt-3">
      <img src={data.data[0].attributes.imagen.data.attributes.url} alt={`Imagen blog ${titulo}`} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  )
}
