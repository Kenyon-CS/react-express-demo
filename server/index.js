import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const app = express()
app.use(express.json())

// In-memory data (stands in for a database)
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]

// API routes (Express -> JSON)
app.get('/api/users', (req, res) => res.json(users))

app.post('/api/users', (req, res) => {
  const name = (req.body?.name || '').trim()
  if (!name) return res.status(400).json({ error: 'name is required' })

  const user = { id: Date.now(), name }
  users.push(user)
  res.json(user)
})

// Serve built React files (client/dist)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../client/dist')
const indexHtml = path.join(distDir, 'index.html')

if (!fs.existsSync(indexHtml)) {
  console.error('ERROR: client/dist/index.html not found.')
  console.error('You must build the React client first:')
  console.error('  npm --prefix client install')
  console.error('  npm --prefix client run build')
  process.exit(1)
}

app.use(express.static(distDir))

// SPA fallback: any non-API route returns index.html
app.get(/^\/(?!api).*/, (req, res) => res.sendFile(indexHtml))

const PORT = Number(process.env.PORT || 4101)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`UI:  http://10.192.145.170:${PORT}/`)
  console.log(`API: http://10.192.145.170:${PORT}/api/users`)
})
