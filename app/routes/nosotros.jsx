import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta() {
  return [
    {
      title: 'GuitarLA - Nosotros',
      description: 'Conoce más sobre nosotros',
    }
  ]
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

export default function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Sobre Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="Imagen sobre nosotros" />
        <div>
          <p>Suspendisse elit ante, bibendum eu lacinia in, lobortis non nibh. Phasellus eget viverra libero. Phasellus nec augue lorem. Morbi consectetur pulvinar dolor ut mattis. Etiam quis pellentesque mauris. Aenean luctus lacus in mauris auctor, eget sodales tortor euismod. Nulla est turpis, lacinia eu cursus non, porttitor at ex. Nam varius rutrum tellus vel facilisis. Aenean id dignissim felis. </p>
          <p>Suspendisse elit ante, bibendum eu lacinia in, lobortis non nibh. Phasellus eget viverra libero. Phasellus nec augue lorem. Morbi consectetur pulvinar dolor ut mattis. Etiam quis pellentesque mauris. Aenean luctus lacus in mauris auctor, eget sodales tortor euismod. Nulla est turpis, lacinia eu cursus non, porttitor at ex. Nam varius rutrum tellus vel facilisis. Aenean id dignissim felis. </p>
        </div>
      </div>
    </main>
  )
}
