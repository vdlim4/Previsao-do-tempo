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
const chuva = document.querySelector('.chuva-p')
const vento = document.querySelector('.vento-km')

//Funções
const solicitaPrevisao = async (cidade) => { 
    const apiPrevisaoURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`
    const res = await fetch(apiPrevisaoURL)
    const data = await res.json()

    return data
}

const mostraPrevisao = async (cidade) => {
    const data = await solicitaPrevisao(cidade)

    nomeCidade.innerText = data.name
    bandeira.src = `https://flagsapi.com/${data.sys.country}/flat/64.png`
    temp.innerHTML = `${parseInt(data.main.temp)}&deg`
    condImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    condTipo.innerText = data.weather[0].description
    
}
//Eventos

botaoBuscar.addEventListener('click', (e) => {
    e.preventDefault()
    const cidade = cidadeInput.value
    mostraPrevisao(cidade)
})