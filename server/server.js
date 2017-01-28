import express from 'express'
import proxy from 'express-http-proxy'

const app = express()

app.use(express.static('build'))

app.use('/api/sunrise-sunset/lat=:lat&lng=:lng', proxy('api.sunrise-sunset.org/json', {
  forwardPathAsync: (req, res) => {
    return new Promise((resolve, reject) => {
      const { lat, lng } = req.params

      resolve(`http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`)
    })
  }
}))

app.listen('8080', () => {
  console.log('Listening to server on localhost:8080')
})
