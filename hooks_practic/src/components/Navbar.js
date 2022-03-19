import {NavLink} from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='navbar navbar-dark bg-primary navbar-expand-lg'>
      <div className="container-fluid">
        <a className="navbar-brand">Github Поиск</a>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink exact to="/" className='nav-link'>Главная</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/about" className='nav-link'>Информация</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
