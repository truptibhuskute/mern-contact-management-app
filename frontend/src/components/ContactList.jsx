import React from 'react'

export default function ContactList({ contacts, loading, onDelete, apiBase }) {
  async function handleDelete(id) {
    if (!window.confirm('Delete this contact?')) return
    try {
      const res = await fetch(`${apiBase}/contacts/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      if (onDelete) onDelete(id)
    } catch (err) {
      // Use a nicer toast in the future; fallback to alert
      alert('Failed to delete: ' + err.message)
    }
  }

  if (loading) return <div className="text-muted">Loading...</div>
  if (!contacts || contacts.length === 0) return <div className="text-muted">No contacts yet</div>

  return (
    <div className="table-responsive">
      <table className="table table-hover contacts-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Message</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c._id}>
              <td className="align-middle">{c.name}</td>
              <td className="align-middle">{c.email || '-'}</td>
              <td className="align-middle">{c.phone}</td>
              <td className="align-middle message">{c.message || '-'}</td>
              <td className="align-middle">
                <button className="btn btn-sm btn-danger btn-danger-custom" onClick={() => handleDelete(c._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
