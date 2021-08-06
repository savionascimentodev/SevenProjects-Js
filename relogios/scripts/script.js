let digitalElement = document.querySelector('.digital')
let secondsElement = document.querySelector('.p_s')
let minutesElement = document.querySelector('.p_m')
let hoursElement = document.querySelector('.p_h')

function updateClock() {
  let now = new Date()
  let hour = now.getHours()
  let minute = now.getMinutes()
  let second = now.getSeconds()

  digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}` // Relógio Digital

  let secondsDeg = ((360 / 60) * second) - 90
  let minutesDeg = ((360 / 60) * minute) - 90
  let hoursDeg = ((360 / 12) * hour) - 90 // Calculo de ângulo de cada um 

  secondsElement.style.transform = `rotate(${secondsDeg}deg)`
  minutesElement.style.transform = `rotate(${minutesDeg}deg)`
  hoursElement.style.transform = `rotate(${hoursDeg}deg)` // Relógio Analógico
}

function fixZero(time) {
  return time < 10 ? `0${time}` : time
}// Adiciona um zero a frente dos números para deixar uma estetica mais bonita e limpa

setInterval(updateClock, 1000)
updateClock()