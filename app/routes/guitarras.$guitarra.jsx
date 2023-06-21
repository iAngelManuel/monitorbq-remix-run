import { useState } from 'react'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { getGuitarra } from '~/api/guitarras.server'

export async function loader({ params }) {
  const { guitarra } = params
  const guitarraUrl = await getGuitarra(guitarra)
  if (guitarraUrl.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra no encontrada'
    })
  }
  return guitarraUrl
}

export function meta({ data }) {
  if (!data) {
    return {
      title: 'Guitarra no encontrada',
      description: 'Guitarras, venta de guitarras, guitarra no encontrada'
    }
  }
  return [
    {
      title: `GuitarLA - ${data.data[0].attributes.nombre}`,
      description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
    }
  ]
}

export default function Guitarra() {
  const datas = useLoaderData()
  const { nombre, descripcion, imagen, precio } = datas.data[0].attributes
  const [ cantidad, setCantidad ] = useState(0)
  const { agregarCarrito } = useOutletContext()

  const handleSubmit = e => {
    e.preventDefault()
    if (cantidad === 0) {
      return alert('Seleccione una cantidad')
    }
    const item = {
      id: datas.data[0].id,
      nombre,
      precio,
      imagen: imagen.data.attributes.url,
      cantidad
    }
    agregarCarrito(item)
  }

  return (
    <div className="guitarra">
      <img src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} className="imagen" />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>
        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>
          <select
            onChange={e => setCantidad(Number(e.target.value))}
            id="cantidad"
          >
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input 
            type="submit"
            value="Agregar al carrito"
          />
        </form>
      </div>
    </div>
  )
}
