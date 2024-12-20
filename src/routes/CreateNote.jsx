import { useState } from 'react'
import { buttonStyle, headingStyle, inputStyle } from './StyleClasses'
import { useNavigate } from 'react-router-dom'
import { Note } from '../utils/validation'
import { useSelector } from 'react-redux'

export default function CreateNote() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState('')
  const [id, setId] = useState('')

  const { user } = useSelector((store) => store)
  const navigate = useNavigate()

  async function handleCreate() {
    const result = Note.safeParse({ title, body })

    if (!result.success) {
      setErrors(result.error.format())
    } else {
      await fetch(`http://localhost:5001/notes`, {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: user.id,
          date: new Date().toLocaleDateString(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      await fetch(`http://localhost:5001/notes?title=${title}`)
        .then((r) => r.json())
        .then((note) => setId(note.id))

      navigate(`/notes/${id}`)
    }
  }

  return (
    <div className="flex flex-col justify-center gap-2 items-center w-screen h-screen">
      <h1 className={headingStyle}>Create new note</h1>
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
          onClick={handleCreate}
          className={buttonStyle + ' col-start-2 col-span-1'}
        >
          Create
        </button>
        <button className="font-bold" onClick={() => navigate('/notes')}>
          Back
        </button>
      </div>
    </div>
  )
}
