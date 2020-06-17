import WeatherPage from './pages/weather-page/index.js'
if (!customElements.get('weather-page')) {
    customElements.define('weather-page', WeatherPage);
}
const cityList = [
    {
        city: '北京',
        code: 110000
    },
    {
        city: '上海',
        code: 310000
    },
    {
        city: '成都',
        code: 510100
    },
    {
        city: '三沙',
        code: 460300
    },
    {
        city: '深圳',
        code: 440300
    },
    {
        city: '厦门',
        code: 350200
    },
    {
        city: '广州',
        code: 440100
    },
    {
        city: '重庆',
        code: 500000
    },
    {
        city: '杭州',
        code: 330100
    },
    {
        city: '拉萨',
        code: 540100
    }
]
class App extends HTMLElement {
    constructor() {
        super()
        this.state={}
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/style/reset.css" />
            <style>
                :host{
                    min-height:100vh;
                    display:block;
                    background-image: radial-gradient(100vh 100vh, #3FA3E6 0%,#66D4FF 100%);
                    background-image: radial-gradient(100vh 100vh, #d0d0d0 0%,#7f96a2 100%);
                    background-size: 100vh 300vh;
                    background-position-y: -50vh;
                    BACKGROUND-POSITION-X: 50%;
                }
                .city-select{
                    display:flex;
                    height:0.4rem;
                    padding:0.5em 0;
                }
                h1{
                    display:none;
                    margin:0
                }
                .city-select select{
                    color:#fff;
                    border:0;
                    background-color:transparent;
                    width:20vw;
                    margin-left:1em;
                    font-size:1.2em
                }
            </style>
            <div class="city-select">
                <h1></h1>
                <select></select>
            </div>
            <weather-page />
        `
        let selectEl = shadowRoot.querySelector('select')
        this.selectEl = selectEl

        cityList.forEach((item,index)=>{
            let aOption=document.createElement('option');
            aOption.setAttribute('value',item.code);
            aOption.textContent = item.city;
            selectEl.appendChild(aOption)
        })
        let h1El = this.shadowRoot.querySelector('h1')

        this.state.globalCurrentCity=getInfoById(cityList,this.selectEl.value,'code')[0]

        h1El.textContent = this.state.globalCurrentCity.city

        this.globalCityChange()

    }
    connectedCallback() {
        this.selectEl.addEventListener('change',this.globalCityChange.bind(this))
    }
    globalCityChange(){
        let h1El = this.shadowRoot.querySelector('h1')
        let weatherPage = this.shadowRoot.querySelector('weather-page')
        this.state.globalCurrentCity=getInfoById(cityList,this.selectEl.value,'code')[0]
        h1El.textContent = this.state.globalCurrentCity.city
        weatherPage.city=this.state.globalCurrentCity
    }
    disconnectedCallback() {
        console.log(`disconnectedCallback`)
    }
    adoptedCallback() {
        console.log(`adoptedCallback`)
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(`attributeChangedCallback`)
    }
}

export default App