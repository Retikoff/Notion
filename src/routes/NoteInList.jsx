import { Link } from 'react-router-dom'
import { noteInList } from './StyleClasses'

export default function NoteInList({ title, date, noteId, onDelete }) {
  function handleDelete() {
    fetch(`http://localhost:5001/notes/${noteId}`, {
      method: 'DELETE',
    }).then((responce) => {
      if (!responce.ok) {
        throw new Error('Smth wrong in delete from list')
      }
      onDelete(noteId)
    })
  }

  return (
    <div className={noteInList + ' w-full  flex flex-row justify-between'}>
      <Link to={`/notes/${noteId}`} className="flex flex-row gap-3 w-full">
        <h3>{title}</h3>
        <h3 className="opacity-50">{date}</h3>
      </Link>
      <div className="flex flex-row">
        <Link to={`/editnote/${noteId}`}>✍️</Link>
        <button onClick={handleDelete}>🗑</button>
      </div>
    </div>
  )
}
