import { useState, useEffect } from 'react'
import { Meta, Links, Outlet, Scripts, LiveReload, useRouteError, isRouteErrorResponse, Link } from '@remix-run/react'
import Header from '~/components/header'
import Footer from './components/footer'
import styles from '~/styles/index.css'

export function meta() {
  return [
    {
      charset: 'utf-8',
      title: 'GuitarLA - Remix',
      viewport: 'width=device-width,initial-scale=1',
    }
  ]
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
    },
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export default function App() {
  const carritoLS = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('carrito')) || []
  const [ carrito, setCarrito ] = useState(carritoLS)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('carrito', JSON.stringify(carrito))
    }
  }, [carrito])
  const agregarCarrito = item => {
    if (carrito.some(guitarraState => guitarraState.id === item.id)) {
      const carritoActualizado = carrito.map(guitarraState => {
        if (guitarraState.id === item.id) {
          guitarraState.cantidad = item.cantidad
        }
        return guitarraState
      })
      setCarrito(carritoActualizado)
    } else {
      setCarrito([...carrito, item])
    }
  }
  const actualizarCantidad = guitarraCantidad => {
    const carritoActualizado = carrito.map(guitarraState => {
      if (guitarraState.id === guitarraCantidad.id) {
        guitarraState.cantidad = guitarraCantidad.cantidad
      }
      return guitarraState
    })
    setCarrito(carritoActualizado)
  }
  const eliminarGuitarra = id => {
    const eliminarCarrito = carrito.filter(guitarraState => guitarraState.id !== id)
    setCarrito(eliminarCarrito)
  }
  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra
        }}
      />
    </Document>
  )
}

function Document({ children }) {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
    if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className="error">{error.status} {error.statusText}</p>
        <Link to="/" className="error-enlace">Volver al inicio</Link>
      </Document>
    )
  }
}
