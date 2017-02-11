export default (url) => {
  return new Promise((resolve, reject) => {
    // if include `invalid` anywhere in url, get back error response
    if (/invalid/.test(url)) {
      reject(new Error('this url is invalid'))
    } else {
      resolve({
        status: 'ok',
        json () {
          return { test: 'test', url: url }
        }
      })
    }
  })
}
