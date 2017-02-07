import express from 'express'
import bodyParser from 'body-parser'
import proxy from 'express-http-proxy'

const app = express()

app.all('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/sunrise-sunset/lat=:lat&lng=:lng&date=:date', proxy('api.sunrise-sunset.org/json', {
  forwardPathAsync: (req, res) => {
    return new Promise((resolve, reject) => {
      const { date, lat, lng } = req.params
      const destUrl = `http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`

      console.log(`${new Date(Date.now())} [${req.ip}] - ${req.method} '${req.baseUrl}' --PROXY-- '${destUrl}'`)

      resolve(destUrl)
    })
  }
}))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Listening to server on ${PORT}`)
})
