import { useEffect, useState } from 'react'
import { buttonStyle, headingStyle } from './StyleClasses'
import NoteInList from './NoteInList'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Notes() {
  const [notes, setNotes] = useState([])

  const { user } = useSelector((store) => store)

  useEffect(() => {
    fetch(`http://localhost:5001/notes?userId=${user.id}`)
      .then((r) => r.json())
      .then((notes) => setNotes(notes))
  }, [])

  const handleDeleteFromList = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center py-16">
      <h1 className={headingStyle + ' text-5xl'}>Notes</h1>
      <Link className={buttonStyle} to="/createnote">
        Add new note
      </Link>
      <div className="flex flex-col gap-3 w-screen px-16">
        {notes.map((note) => (
          <NoteInList
            key={note.id}
            title={note.title}
            date={note.date}
            noteId={note.id}
            onDelete={handleDeleteFromList}
          />
        ))}
      </div>
    </div>
  )
}
