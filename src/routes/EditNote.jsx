import { useEffect, useState } from 'react'
import { buttonStyle, headingStyle, inputStyle } from './StyleClasses'
import { useNavigate, useParams } from 'react-router-dom'
import { Note } from '../utils/validation'
import { useSelector } from 'react-redux'

export default function EditNote() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState('')

  const { id } = useParams()
  const { user } = useSelector((store) => store)

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:5001/notes/${id}`)
      .then((r) => r.json())
      .then((note) => {
        if (note.userId === user.id) {
          setTitle(note.title)
          setBody(note.body)
        } else {
          navigate('/notes')
        }
      })
  }, [])

  async function handleEdit() {
    const result = Note.safeParse({ title, body })

    if (!result.success) {
      setErrors(result.error.format())
    } else {
      await fetch(`http://localhost:5001/notes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          body: body,
        }),
      })

      navigate(`/notes/${id}`)
    }
  }

  return (
    <div className="flex flex-col justify-center gap-2 items-center w-screen h-screen">
      <h1 className={headingStyle}>Edit note</h1>
      {errors?.title && (
        <div style={{ color: 'red' }}>{errors?.title?._errors}</div>
      )}
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={inputStyle + ' w-96'}
      />
      <textarea
        placeholder="Note text..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className={inputStyle + ' w-96 h-60'}
      />
      <div className="grid grid-cols-3 grid-rows-1">
        <button
          onClick={handleEdit}
          className={buttonStyle + ' col-start-2 col-span-1'}
        >
          Edit
        </button>
        <button className="font-bold" onClick={() => navigate(`/notes`)}>
          Back
        </button>
      </div>
    </div>
  )
}
