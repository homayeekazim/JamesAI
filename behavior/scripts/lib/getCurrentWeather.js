'use strict'

const request = require('request')

module.exports = function getCurrentWeather(locationName, next) {
  const appId = '<YOUR APP ID>'

  const requestUrl = `http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=42e3d4a0558896b81cf12cb63b826371&q=${locationName}`

  console.log('Making HTTP GET request to:', requestUrl)

  request(requestUrl, (err, res, body) => {
    if (err) {
      throw new Error(err)
    }

    if (body) {
      const parsedResult = JSON.parse(body)
      next(parsedResult)
    } else {
      next()
    }
  })
}