import { reqSunriseSunsetAPI, reqGeolocationAPI } from './apiRequests'

describe('reqGeolocationAPI()', () => {
  test('should return json if successful', async () => {
    const res = await reqGeolocationAPI()
    expect(res.test).toBe('test')
  })

  test('should return error if promise rejects', async () => {
    const err = await reqGeolocationAPI('invalid')
    expect(err.message).toBe('Error: this url is invalid')
  })
})

describe('reqSunriseSunsetAPI', () => {
  const date = new Date(2017, 1, 10)

  test('should return json if successful', async () => {
    const res = await reqSunriseSunsetAPI({ lat: 30, lng: 100 }, date)
    expect(res.test).toBe('test')
  })

  test('should propagate the params to the request url', async () => {
    const { url } = await reqSunriseSunsetAPI({ lat: 30, lng: 100 }, date)
    expect(url).toMatch(/lat=30/)
    expect(url).toMatch(/lng=100/)
    expect(url).toMatch(/date=2017-2-10/)
  })

  test('should return error if promise rejects', async () => {
    const err = await reqSunriseSunsetAPI({ lat: 'invalid', lng: 100 }, date)
    expect(err.message).toBe('Error: this url is invalid')
  })
})


