import { useState, useEffect } from 'react'
import { useOutletContext } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'
import styles from '~/styles/carrito.css'

export function meta() {
  return [
    {
      title: 'GuitarLA - Carrito de Compras',
      description: 'Venta de guitarras, música, blog, carrito de compras, tienda'
    }
  ]
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export default function Carrito() {
  const [ total, setTotal ] = useState(0)
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext()
  useEffect(() => {
    const calculoTotal = carrito.reduce((total, item) => total + (item.cantidad * item.precio), 0)
    setTotal(calculoTotal)
  }, [carrito])
  return (
    <ClientOnly fallback={'Cargando...'}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de Compras</h1>
          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>
              {carrito?.length === 0 ? 'Carrito Vacio' : (
                carrito?.map(item => (
                  <div key={item.id} className="producto">
                    <div>
                      <img src={item.imagen} alt={`Imagen de la guitarra ${item.nombre}`} className="imagen" />
                    </div>
                    <div>
                      <p className="nombre">{item.nombre}</p>
                      <p>Cantidad: </p>
                      <select
                        id="cantidad"
                        value={item.cantidad}
                        onChange={e => actualizarCantidad({ cantidad: Number(e.target.value), id: item.id })}
                        className="select"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <p className="precio">Precio: <span>${item.precio}</span></p>
                      <p className="precio">Subtotal: <span>${item.cantidad * item.precio}</span></p>
                    </div>
                    <button
                      type="submit"
                      className="btn_eliminar"
                      onClick={() => eliminarGuitarra(item.id)}
                    >X</button>
                  </div>
                ))
              )}
            </div>
            <aside className="resumen">
              <h3>Resumen del Pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  )
}
