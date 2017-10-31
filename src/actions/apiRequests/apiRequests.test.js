import { reqSunriseSunsetAPI, reqGeolocationAPI } from './apiRequests'
import nock from 'nock'

describe('reqGeolocation', () => {
  describe('ok responses', () => {
    beforeEach(() => {
      nock('https://freegeoip.net/json')
        .get('/')
        .reply(200, { test: 'test' })
    })

    afterEach(() => {
      nock.cleanAll()
    })

    test('should return json if successful', async () => {
      const res = await reqGeolocationAPI()
      expect(res.test).toBe('test')
    })
  })

  describe('error responses', () => {
    beforeEach(() => {
      const proxy = nock('https://freegeoip.net/json')
        .get('/')
        .replyWithError('testing geolocation')
    })

    test('should return error', async () => {
      const err = await reqGeolocationAPI()
      expect(err.message).toMatch(/testing geolocation/)
    })
  })
})

describe('reqSunriseSunsetAPI', () => {
  const date = new Date(2017, 1, 10)
  const location = { lat: 30, lng: 100 }

  describe('ok responses', () => {
    beforeEach(() => {
      const dateParam = '2017-2-10'

      nock(`${process.env.rAPI}/json`)
        .get(`?lat=${location.lat}&lng=${location.lng}&date=${dateParam}`)
        .reply(200, { test: 'test' })
    })

    test('should return json if successful', async () => {
      const res = await reqSunriseSunsetAPI(location, date)
      expect(res.test).toBe('test')
    })
  })

  describe('error response', () => {
    beforeEach(() => {
      const dateParam = '2017-2-10'

      nock(`${process.env.REACT_APP_API}/json`)
        .get(`?lat=${location.lat}&lng=${location.lng}&date=${dateParam}`)
        .replyWithError('testing sunrise sunset')
    })

    test('should return error if promise rejects', async () => {
      const err = await reqSunriseSunsetAPI(location, date)
      expect(err.message).toMatch(/testing sunrise sunset/)
    })
  })
})


