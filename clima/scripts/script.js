document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault(); // impede o formulario de enviar para não resetar tudo

  let input = document.querySelector('#searchInput').value;

  if (input !== '') {
    showWarning('Carregando...')
  }

  // encodeURI serve para retirar os espaços
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=43ad811bc0d6f9eecb8282e9a1af6b3d&units=metric&lang=pt_br`


  let results = await fetch(url) // fazer a requisição e esperar a resposta
  let json = await results.json() // pegando o resultado e transformando em Json

  if (json.cod === 200) {
    showInfo({
      name: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      windAngle: json.wind.deg,

    })
  } else {
    clearInfo()
    showWarning('Não encontramos essa localização')
  }

})

function showInfo(json) {
  showWarning('')

  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

  document.querySelector('.resultado').style.display = 'block'
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg
}

function clearInfo() {
  showWarning('')
  document.querySelector('.resultado').style.display = 'none'
}