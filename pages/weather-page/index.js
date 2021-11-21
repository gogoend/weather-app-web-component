import * as weatherApi from '../../api/weather.js'

import SingleWeatherInfo from '../../components/weather-page/single-weather-info.js'
import MainWeatherInfo from '../../components/weather-page/main-weather-info.js'

if (!customElements.get('single-weather-info')) {
    customElements.define('single-weather-info', SingleWeatherInfo)
}
if (!customElements.get('main-weather-info')) {
    customElements.define('main-weather-info', MainWeatherInfo)
}

class WeatherPage extends HTMLElement {
    constructor() {
        super()
        this.state = {
            weatherInfo: {
                forecasts: [[]]
            },
            cachedInfo: {}
        }
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.render()
    }
    cacheInfo(city, info) {
        this.state.cachedInfo[city] = {
            updateTime: new Date().getTime(),
            info
        }
    }
    async cityChange(e) {
        let { cachedInfo } = this.state
        let newCity = e.target ? e.target.value : e;
        let newInfo

        if (cachedInfo[newCity] && ((new Date().getTime()) - cachedInfo[newCity].updateTime) < 600000) {
            newInfo = cachedInfo[newCity].info
            // debugger
        } else {
            newInfo = await weatherApi.getWeather(newCity)
            this.cacheInfo(newCity, newInfo)
        }

        this.state.weatherInfo = newInfo
        this.render()
    }
    render() {
        let { weatherInfo } = this.state

        this.cityChange = this.cityChange.bind(this)

        let futureForecastDOM = []
        let todayForecast = ''

        if (weatherInfo && Array.isArray(weatherInfo.forecasts[0].casts)) {
            futureForecastDOM = weatherInfo.forecasts[0].casts.map((item, index) => {
                if (index === 0) {
                    todayForecast = JSON.stringify(item)
                } else {
                    return `
                    <li><single-weather-info weather-info=${JSON.stringify(item)}></single-weather-info></li>
                    `
                }
            })
        }

        this.shadowRoot.innerHTML = `
        <style>
        ul.weather-info-list{
            display:flex;
            justify-content:space-between;
            padding:0;
            margin:0;
            list-style:none
        }
        ul.weather-info-list li{
            flex-basis:33.33%
        }
        </style>
        <div>
            <section class="weather-app-container">
                <main>
                    <main-weather-info weather-info=${todayForecast}></main-weather-info>
                </main>
                <ul class="weather-info-list">
                    ${futureForecastDOM.join('')}
                </ul>
            </section>
        </div>
        `
    }
    static get observedAttributes() { return ['city'] }
    set city(val) {
        this.state.city = val
        this.cityChange(this.state.city.code)
    }
    get city() {
        return this.state.city
    }
}

export default WeatherPage