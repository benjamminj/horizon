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

app.use(express.static('../client/build'))

app.use('/api/sunrise-sunset/lat=:lat&lng=:lng', proxy('api.sunrise-sunset.org/json', {
  forwardPathAsync: (req, res) => {
    return new Promise((resolve, reject) => {
      console.log('Request for proxy')
      const { lat, lng } = req.params

      resolve(`http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`)
    })
  }
}))

const PORT = process.env.PORT || 8080

app.listen('8080', () => {
  console.log(`Listening to server on ${PORT}`)
})
