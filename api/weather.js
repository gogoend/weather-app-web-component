import { get } from '../../api/index.js'

// export const getWeather = (cityCode) => get('http://restapi.amap.com/v3/weather/weatherInfo', {
//     key: '516786aa1da89347ad99cc19c24488ac',
//     city: cityCode,
//     extensions: 'all'
// })

export const getWeather = (cityCode) => Promise.resolve({
    status: 1,
    count: 1,
    info: '',
    infocode: 10000,
    lives: {
        province: 'Beijing',
        city: 'Beijing',
        adcode: cityCode,
        weather: '晴',
        temperature: '15-24℃',
        winddirection: '东南风',
        windpower: 4,
        humidity: 5,
        reporttime: '2021-8-20'
    },
    forecasts: [{
        city: 'Beijing',
        adcode: cityCode,
        province: 'Beijing',
        reporttime: '2021-8-20',
        casts: [{
            date: '2021-8-21',
            week: 4,
            dayweather: '晴',
            nightweather: '晴',
            daytemp: '15-24℃',
            nighttemp: '15-24℃',
            daywind: '东南风',
            nightwind: '东风',
            daypower: 6,
            nightpower: 4
        },{
            date: '2021-8-22',
            week: 4,
            dayweather: '晴',
            nightweather: '多云',
            daytemp: '15-24℃',
            nighttemp: '15-24℃',
            daywind: '东南风',
            nightwind: '东风',
            daypower: 6,
            nightpower: 4
        },{
            date: '2021-8-23',
            week: 4,
            dayweather: '雨',
            nightweather: '多云',
            daytemp: '15-24℃',
            nighttemp: '15-24℃',
            daywind: '南风',
            nightwind: '东风',
            daypower: 6,
            nightpower: 4
        }]
    }]
})