import { Link } from '@remix-run/react'
import Navegacion from './navegacion';
import logo from '../../public/img/logo.svg'

export default function Header() {
  return (
    <header className="header">
      <div className="contenedor barra">
        <div to="/index" className="logo">
          <Link>
            <img src={logo} alt="Imagen logo" className="logo" />
          </Link>
        </div>
        <Navegacion />
      </div>
    </header>
  )
}
