class SingleWeatherInfo extends HTMLElement {
    constructor() {
        super()
        this.state = {}
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.render()
    }
    render() {
        let chineseDigi = [
            '〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'
        ]
        let item=JSON.parse(this.getAttribute('weather-info'))
        this.shadowRoot.innerHTML = `
        <style>
            li{
                margin:0
            }
        </style>
        <span>${item.date} 星期${item.week === '7' ? '日' : chineseDigi[item.week]}</span>
        <section>
            <header>
                白天
            </header>
            <ul>
                <li>${item.dayweather}</li>
                <li>${item.daytemp}℃</li>
                <li>${item.daywind}</li>
                <li>${item.daypower}级</li>
            </ul>
        </section>
        <section>
            <header>
                夜间
                    </header>
            <ul>
                <li>${item.nightweather}</li>
                <li>${item.nighttemp}℃</li>
                <li>${item.nightwind}</li>
                <li>${item.nightpower}级</li>
            </ul>
        </section>
    `
    }
}

export default SingleWeatherInfo