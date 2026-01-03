import React, { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export default function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchContacts() {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/contacts`)
      const data = await res.json()
      setContacts(data)
    } catch (err) {
      console.error('Failed to fetch contacts', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  function addContactToList(contact) {
    setContacts(prev => [contact, ...prev])
  }

  function removeContactFromList(id) {
    setContacts(prev => prev.filter(c => c._id !== id))
  }

  return (
    <div className="app-container">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="app-title">Contact Management</h1>
        <small className="text-muted">MERN demo — responsive & simple</small>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card card-surface p-4 h-100">
            <h5 className="mb-3">Send a message</h5>
            <ContactForm onSuccess={addContactToList} apiBase={API_BASE} />
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card card-surface p-4 h-100">
            <h5 className="mb-3">Submitted Contacts</h5>
            <ContactList
              contacts={contacts}
              loading={loading}
              onDelete={removeContactFromList}
              apiBase={API_BASE}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
