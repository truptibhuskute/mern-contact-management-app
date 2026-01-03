import React, { useState } from 'react'

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email)
}

export default function ContactForm({ onSuccess, apiBase }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!phone.trim()) e.phone = 'Phone is required'
    if (email && !validateEmail(email)) e.email = 'Invalid email'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSuccess('')
    const eObj = validate()
    setErrors(eObj)
    if (Object.keys(eObj).length) return

    setSubmitting(true)
    try {
      const res = await fetch(`${apiBase}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')

      setSuccess('Contact submitted successfully')
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setErrors({})

      if (onSuccess) onSuccess(data)
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setSubmitting(false)
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const isValid = Object.keys(validate()).length === 0

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label">Name *</label>
        <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
        {errors.name && <div className="form-text text-danger">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <div className="form-text text-danger">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Phone *</label>
        <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
        {errors.phone && <div className="form-text text-danger">{errors.phone}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea className="form-control" value={message} onChange={e => setMessage(e.target.value)} />
      </div>

      <div className="d-flex align-items-center gap-3">
        <button type="submit" className="btn btn-primary" disabled={!isValid || submitting}>
          {submitting ? 'Sending...' : 'Send'}
        </button>
        {success && <div className="success-badge">{success}</div>}
        {errors.submit && <div className="form-text text-danger">{errors.submit}</div>}
      </div>
    </form>
  )
}
