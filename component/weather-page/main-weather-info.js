class MainWeatherInfo extends HTMLElement {
    constructor() {
        super()
        this.state = {}
        const shadowRoot = this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() { return ['weather-info'] }
    async connectedCallback() {
    }
    disconnectedCallback() {
        console.log(`disconnectedCallback`)
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(`attributeChangedCallback`)
        this.state.weatherInfo = newVal
        this.render()
    }
    render() {
        let { weatherInfo } = this.state
        if(weatherInfo) weatherInfo = JSON.parse(weatherInfo)
        /*
        {"date":"2020-06-14","week":"7","dayweather":"晴","nightweather":"晴","daytemp":"34","nighttemp":"22","daywind":"西南","nightwind":"西南","daypower":"≤3","nightpower":"≤3"}
        */
        this.shadowRoot.innerHTML = `
        <style>
            .wrap{
                display:flex
            }
            .weather-detail h1{
                margin:0
            }
            .zz{
                
            }
        </style>
        <div class="wrap">
            <aside class="weather-icon">
            <svg width="70px" height="70px" viewBox="0 0 70 70" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 61.2 (89653) - https://sketch.com -->
                <title>椭圆形</title>
                <desc>Created with Sketch.</desc>
                <defs>
                    <radialGradient cx="50%" cy="0%" fx="50%" fy="0%" r="177.866667%" gradientTransform="translate(0.500000,0.000000),scale(1.000000,0.562219),rotate(90.000000),translate(-0.500000,-0.000000)" id="radialGradient-1">
                        <stop stop-color="#66D4FF" offset="0%"></stop>
                        <stop stop-color="#3FA3E6" offset="100%"></stop>
                    </radialGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2">
                        <stop stop-color="#E4B917" stop-opacity="0.903039384" offset="0%"></stop>
                        <stop stop-color="#FFD2D3" stop-opacity="0.5" offset="100%"></stop>
                    </linearGradient>
                    <radialGradient cx="115.773929%" cy="8.71553465%" fx="115.773929%" fy="8.71553465%" r="88.4789329%" id="radialGradient-3">
                        <stop stop-color="#FF8282" offset="0%"></stop>
                        <stop stop-color="#FFC0AA" offset="64.9277585%"></stop>
                        <stop stop-color="#FF8484" stop-opacity="0" offset="100%"></stop>
                    </radialGradient>
                    <circle id="path-4" cx="30" cy="98" r="25"></circle>
                    <filter x="-30.0%" y="-30.0%" width="160.0%" height="160.0%" filterUnits="objectBoundingBox" id="filter-5">
                        <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="iPhone-8" transform="translate(-38.000000, -358.000000)">
                        <g id="block" transform="translate(20.000000, 243.000000)">
                            <g id="list" transform="translate(23.000000, 52.000000)">
                                <g id="编组-2">
                                    <g id="椭圆形">
                                        <use fill="black" fill-opacity="1" filter="url(#filter-5)" xlink:href="#path-4"></use>
                                        <use fill="#F20000" fill-rule="evenodd" xlink:href="#path-4"></use>
                                        <use fill="url(#linearGradient-2)" fill-rule="evenodd" xlink:href="#path-4"></use>
                                        <use fill-opacity="0.46" fill="url(#radialGradient-3)" fill-rule="evenodd" style="mix-blend-mode: overlay;" xlink:href="#path-4"></use>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            </aside>
            <section class="weather-detail">
                <div>
                    <h1>${weatherInfo.dayweather}</h1>
                    <span>${weatherInfo.daytemp}℃</span>
                </div>
                <div class="wind-info">
                    ${weatherInfo.daywind} ${weatherInfo.daypower}
                </div>
                
            </section>
        </div>
    `
    }
}

export default MainWeatherInfo