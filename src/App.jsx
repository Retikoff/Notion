import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useRouteError,
} from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import RequireAuth from './components/RequireAuth'
import SingUp from './routes/SignUp'
import Notes from './routes/Notes'
import Layout from './routes/Layout'
import CreateNote from './routes/CreateNote'
import Note from './routes/Note'
import EditNote from './routes/EditNote'
import { headingStyle } from './routes/StyleClasses'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SingUp />,
  },
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: '/notes',
        element: (
          <RequireAuth>
            <Notes />
          </RequireAuth>
        ),
      },
      {
        path: '/notes/:id',
        element: (
          <RequireAuth>
            <Note />
          </RequireAuth>
        ),
      },
      {
        path: '/editnote/:id',
        element: (
          <RequireAuth>
            <EditNote />
          </RequireAuth>
        ),
      },
      {
        path: '/createnote',
        element: (
          <RequireAuth>
            <CreateNote />
          </RequireAuth>
        ),
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className={headingStyle + ' text-5xl'}>404</h1>
      <h1 className={headingStyle + ' text-4xl'}>Page not found</h1>
      <div className="flex flex-row gap-4">
        <h1 className={headingStyle + ' text-xl'}>Try this</h1>
        <Link to={'/'} className={headingStyle + '  text-blue-400 text-xl'}>
          Home
        </Link>
      </div>
    </div>
  )
}
