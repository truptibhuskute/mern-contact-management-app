# Contact Management — Backend

Simple Express + MongoDB backend for the Contact Management demo.

Getting started

1. Install dependencies

```powershell
cd "c:/Users/trupt/Desktop/Contact Management/backend"
npm install
```

2. Create `.env` from `.env.example` and set `MONGO_URI`.

3. Start server

```powershell
npm run dev  # requires nodemon
# or
npm start
```

APIs

- GET /api/contacts — list contacts
- POST /api/contacts — create contact (body: { name, email, phone, message })
- DELETE /api/contacts/:id — delete contact
