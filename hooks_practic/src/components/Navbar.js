import {NavLink} from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink exact to="/" className='navbar-brand'>Github Search</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink exact to="/" className='nav-link'>Главная</NavLink>
            <NavLink to="/about" className='nav-link'>Информация</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

