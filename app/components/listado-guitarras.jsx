import Guitarra from '~/components/guitarra'

export default function ListadoGuitarras({ guitarras }) {
  return (
    <>
      <h2 className="heading">Nuestra Colección</h2>
      {guitarras.length && (
        <div className="guitarra-grid">
          {guitarras.map(guitarra => (
            <Guitarra
              key={guitarra?.id}
              guitarra={guitarra?.attributes}
            />
          ))}
        </div>
      )}
    </>
  )
}
