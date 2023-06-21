import { useLoaderData } from '@remix-run/react'
import { getGuitarras } from '~/api/guitarras.server'
import { getPosts } from '~/api/posts.server'
import { getCursos } from '~/api/curso.server'
import ListadoGuitarras from '~/components/listado-guitarras'
import ListadoPosts from '~/components/listado-posts'
import Curso from '~/components/curso'
import stylesGuitarras from '~/styles/guitarras.css'
import stylesPosts from '~/styles/blog.css'
import stylesCurso from '~/styles/curso.css'

export async function loader() {
  const [guitarras, posts, curso ] = await Promise.all([ getGuitarras(), getPosts(), getCursos() ])
  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  }
}

export function meta() {
  return [
    {
      title: 'GuitarLA - Inicio',
      description: 'Guitarras, venta de guitarras, inicio'
    }
  ]
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesPosts
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

export default function Index() {
  const { guitarras, posts, curso } = useLoaderData()

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras
          guitarras={guitarras}
        />
      </main>

      <Curso
        curso={curso.attributes}
      />

      <section className="contenedor">
        <ListadoPosts
          posts={posts}
        />
      </section>
    </>
  )
}
