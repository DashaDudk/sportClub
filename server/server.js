const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const uploadPath = path.join(__dirname, 'public/uploads')
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  },
})
const upload = multer({ storage })

app.use('/uploads', express.static(uploadPath))

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не завантажено' })
  }
  const url = `http://localhost:${PORT}/uploads/${req.file.filename}`
  res.json({ url })
})

const dbFile = path.join(__dirname, 'db.json')

function readDB() {
  try {
    const raw = fs.readFileSync(dbFile, 'utf8')
    return JSON.parse(raw)
  } catch {
    return { sections: [], trainers: [], submissions: [] }
  }
}

function writeDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2))
}

app.get('/sections', (req, res) => {
  const db = readDB()
  res.json(db.sections || [])
})

app.post('/sections', (req, res) => {
  const db = readDB()
  const newSection = { ...req.body, id: Date.now() }
  db.sections.push(newSection)
  writeDB(db)
  res.json(newSection)
})

app.put('/sections/:id', (req, res) => {
  const db = readDB()
  const id = parseInt(req.params.id)
  const index = db.sections.findIndex(s => s.id === id)
  if (index === -1) return res.status(404).json({ error: 'Секцію не знайдено' })

  db.sections[index] = { ...req.body, id }
  writeDB(db)
  res.json(db.sections[index])
})

app.delete('/sections/:id', (req, res) => {
  const db = readDB()
  const id = parseInt(req.params.id)
  const index = db.sections.findIndex(s => s.id === id)
  if (index === -1) return res.status(404).json({ error: 'Секцію не знайдено' })

  db.sections.splice(index, 1)
  writeDB(db)
  res.json({ success: true })
})

app.get('/trainers', (req, res) => {
  const db = readDB()
  res.json(db.trainers || [])
})

app.post('/trainers', (req, res) => {
  const db = readDB()
  const newTrainer = { ...req.body, id: Date.now() }
  db.trainers.push(newTrainer)
  writeDB(db)
  res.json(newTrainer)
})

app.put('/trainers/:id', (req, res) => {
  const db = readDB()
  const id = parseInt(req.params.id)
  const index = db.trainers.findIndex(t => t.id === id)
  if (index === -1) return res.status(404).json({ error: 'Тренера не знайдено' })

  db.trainers[index] = { ...req.body, id }
  writeDB(db)
  res.json(db.trainers[index])
})

app.delete('/trainers/:id', (req, res) => {
  const db = readDB()
  const id = parseInt(req.params.id)
  const index = db.trainers.findIndex(t => t.id === id)
  if (index === -1) return res.status(404).json({ error: 'Тренера не знайдено' })

  db.trainers.splice(index, 1)
  writeDB(db)
  res.json({ success: true })
})

// ==== ВІДПРАВЛЕНІ ЗАЯВКИ (submissions) ====
app.get('/submissions', (req, res) => {
  const db = readDB()
  res.json(db.submissions || [])
})

app.post('/submissions', (req, res) => {
  const db = readDB()
  const newSubmission = { ...req.body, id: Date.now() }
  db.submissions.push(newSubmission)
  writeDB(db)
  res.json(newSubmission)
})

// ==== Запуск сервера ====
app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`)
})
