//Variáveis
const apiKey = "b517e34acbb1a4a543aa2169e4cd405b"
const apiFlag = "https://flagsapi.com/BR/flat/64.png"

const cidadeInput = document.querySelector('.input-busca')
const botaoBuscar = document.querySelector('.botao-buscar')
const nomeCidade = document.querySelector('.cidade')
const bandeira = document.querySelector('.bandeira')
const temp = document.querySelector('.temperatura')
const condImg = document.querySelector('.condicao-img')
const condTipo = document.querySelector('.condicao-tipo')
const umidade = document.querySelector('.umidade-p')
const vento = document.querySelector('.vento-km')
const max = document.querySelector('.temp-max')
const min = document.querySelector('.temp-min')
const painelInfo = document.querySelector('.informacoes')
const painelInfo2 = document.querySelector('.info-temp')

//Funções
const solicitaPrevisao = async (cidade) => { 
    const apiPrevisaoURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`
    const res = await fetch(apiPrevisaoURL)
    const data = await res.json()
    
    if (data.name === undefined) {
        painelInfo.classList.add('esconder')
        painelInfo2.classList.add('esconder')
    } else {
        painelInfo.classList.remove('esconder')
        painelInfo2.classList.remove('esconder')
    }

    return data
}

const mostraPrevisao = async (cidade) => {
    const data = await solicitaPrevisao(cidade)
    if (data.name === undefined) {
        return
    } else {
        nomeCidade.innerText = data.name
        bandeira.src = `https://flagsapi.com/${data.sys.country}/flat/64.png`
        temp.innerHTML = `${parseInt(data.main.temp)}&deg`
        condImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        condTipo.innerText = data.weather[0].description
        max.innerHTML = `${parseInt(data.main.temp_max)}&deg`
        min.innerHTML = `${parseInt(data.main.temp_min)}&deg`
        umidade.innerText = `${data.main.humidity}%`
        vento.innerText = `${parseInt(data.wind.speed * 1.6)} km/h`
        cidadeInput.value = ''
    }

}

//Eventos

botaoBuscar.addEventListener('click', (e) => {
    const cidade = cidadeInput.value
    e.preventDefault()
    mostraPrevisao(cidade)
})

cidadeInput.addEventListener('keydown', (e) => {
    const cidade = cidadeInput.value
    if (e.key === 'Enter') {
        e.preventDefault()
        mostraPrevisao(cidade)
    }
})