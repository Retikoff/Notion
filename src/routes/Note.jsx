import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { headingStyle } from './StyleClasses'
import { useSelector } from 'react-redux'

export default function Note() {
  const [note, setNote] = useState({})

  const { id } = useParams()
  const { user } = useSelector((store) => store)
  const navigate = useNavigate()
  useEffect(() => {
    fetch(`http://localhost:5001/notes/${id}`)
      .then((r) => r.json())
      .then((note) => {
        if (note.userId === user.id) {
          setNote(note)
        } else {
          navigate('/notes')
        }
      })
  }, [])

  function handleDelete() {
    fetch(`http://localhost:5001/notes/${id}`, {
      method: 'DELETE',
    }).then((responce) => {
      if (!responce.ok) {
        throw new Error('Smth wrong in delete from note view')
      }
      navigate('/notes')
    })
  }

  return (
    <div className="flex flex-col gap-14 items-center my-16 mx-16">
      <div className="flex flex-row gap-52 w-full justify-center">
        <button
          onClick={() => navigate('/notes')}
          className="font-bold bg-slate-300 px-3"
        >
          Back
        </button>
        <h1 className={headingStyle}>{note.title}</h1>
        <div className="flex flex-row gap-3 justify-center items-center">
          <Link to={`/editnote/${id}`} className="text-xl">
            ✍️
          </Link>
          <button onClick={handleDelete} className="text-xl">
            🗑
          </button>
        </div>
      </div>
      <pre className="self-start text-wrap bg-neutral-300 w-full h-max">
        {note.body}
      </pre>
    </div>
  )
}
