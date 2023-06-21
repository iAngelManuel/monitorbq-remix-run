import { Link } from '@remix-run/react'
import { formatearFecha } from '~/utils/helper'

export default function Post({ post }) {
  const { titulo, contenido, url, publishedAt } = post.attributes
  return (
    <article className="post">
      <img src={post.attributes.imagen.data.attributes.formats.small.url} alt={`Imagen blog ${titulo}`} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="resumen">{contenido}</p>
        <Link to={`/blog/${url}`} className="enlace">Leer Post</Link>
      </div>
    </article>
  )
}
