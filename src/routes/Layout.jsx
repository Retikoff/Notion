import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { headingStyle, linkActive, linkDefault } from './StyleClasses'
import { useDispatch, useSelector } from 'react-redux'

export default function Layout() {
  const { user } = useSelector((store) => store)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleClick() {
    dispatch({ type: 'USER/NONE' })
    localStorage.removeItem('userId', user.id)
    navigate('/login')
  }

  return (
    <>
      <header className="flex flex-row justify-between fixed w-screen bg-white px-14">
        <h1 className={headingStyle}>Hello, {user.email}</h1>
        <div className="flex flex-row gap-4">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? linkActive : linkDefault)}
          >
            About
          </NavLink>
          <NavLink
            to="/notes"
            end={true}
            className={({ isActive }) => (isActive ? linkActive : linkDefault)}
          >
            Notes
          </NavLink>
          <button className={linkDefault} onClick={handleClick}>
            Log Out
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
