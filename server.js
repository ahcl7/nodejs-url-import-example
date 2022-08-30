import express from 'express'
const app = express()

app.get('/get-scripts', (req, res) => {
  res.send('export const VERSION = 1000')
})

app.listen(5000, () => {
  console.log('listening on 5000')
})
