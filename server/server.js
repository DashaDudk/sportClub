const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const dataPath = path.join(__dirname, 'public')
const sectionsFile = path.join(dataPath, 'sections.json')
const trainersFile = path.join(dataPath, 'trainers.json')

// GET
app.get('/sections.json', (req, res) => res.sendFile(sectionsFile))
app.get('/trainers.json', (req, res) => res.sendFile(trainersFile))

// POST
app.post('/saveSections', (req, res) => {
  fs.writeFile(sectionsFile, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send('Помилка при збереженні секцій')
    res.send('OK')
  })
})

app.post('/saveTrainers', (req, res) => {
  fs.writeFile(trainersFile, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send('Помилка при збереженні тренерів')
    res.send('OK')
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`)
})
