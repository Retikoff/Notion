import { buttonStyle, headingStyle } from './StyleClasses'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Home() {
  const { user } = useSelector((store) => store)
  return (
    <div className="flex flex-col justify-evenly items-center w-screen h-screen">
      <div className="flex flex-col gap-1 justify-center items-center">
        <h1 className={headingStyle + ' text-5xl'}>About me</h1>
        <h1 className={headingStyle}>Email: {user.email}</h1>
        <h1 className={headingStyle}>Date sign up: {user.date}</h1>
      </div>

      <Link to="/notes" className={buttonStyle}>
        Go to notes
      </Link>
    </div>
  )
}
