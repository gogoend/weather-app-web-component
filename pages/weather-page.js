import { get } from '../api/index.js'
import SingleWeatherInfo from '../component/weather-page/single-weather-info.js'
if(!customElements.get('single-weather-info')){
    customElements.define('single-weather-info', SingleWeatherInfo)
}

async function getWeather(cityCode) {
    let { data } = await get('http://restapi.amap.com/v3/weather/weatherInfo', {
        key: '516786aa1da89347ad99cc19c24488ac',
        city: cityCode,
        extensions: 'all'
    })
    console.log(JSON.parse(data))
    return JSON.parse(data)
}
class WeatherPage extends HTMLElement {
    static get observedAttributes() { return ['city'] }
    set city(val) {
        this.state.city = val
        this.cityChange(this.state.city.code)
    }
    get city() {
        return this.state.city
    }
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
    async connectedCallback() {
    }
    disconnectedCallback() {
        console.log(`disconnectedCallback`)
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(`attributeChangedCallback`)
    }
    async cityChange(e) {
        let { cachedInfo } = this.state
        let newCity = e.target ? e.target.value : e;
        let newInfo

        if (cachedInfo[newCity] && ((new Date().getTime()) - cachedInfo[newCity].updateTime) < 600000) {
            newInfo = cachedInfo[newCity].info
            // debugger
        } else {
            newInfo = await getWeather(newCity)
            this.cacheInfo(newCity, newInfo)
        }

        this.state.weatherInfo = newInfo
        this.render()
    }
    cacheInfo(city, info) {
        this.state.cachedInfo[city] = {
            updateTime: new Date().getTime(),
            info
        }
    }
    render() {
        let { weatherInfo } = this.state
        let chineseDigi = [
            '〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'
        ]

        this.cityChange = this.cityChange.bind(this)

        let forecastDOM = []

        if (weatherInfo && Array.isArray(weatherInfo.forecasts[0].casts)) {
            forecastDOM = weatherInfo.forecasts[0].casts.map((item) => {
                return `
                    <single-weather-info weather-info=${JSON.stringify(item)}></single-weather-info>
                    `

            })
        }

        // debugger

        this.shadowRoot.innerHTML = `
        <div>
            <section class="weather-app-container">
                <ul>
                    ${forecastDOM.join('')}
                </ul>
            </section>
        </div>
        `
    }
}

export default WeatherPage