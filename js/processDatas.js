const icons = {
  bolt: 'fas fa-bolt',
  wind: 'fas fa-wind',
  cloudy: 'fas fa-cloud',
  smog: 'fas fa-smog',
  sunny: 'far fa-sun',
  cloudSun: 'fas fa-cloud-sun',
  showers: 'fas fa-cloud-showers-heavy',
  rain: 'fas fa-cloud-rain',
  snow: 'fas fa-snowflake'
}

function process(datas) {
  console.log('Proceeding datas : ');
  console.log(datas);

  let dates = getDate();
  let hour = dates[0];
  let today = dates[1];
  let tomorrow = dates[2];
  let afterTomorrow = dates[3];

  console.log(dates);

  let td = document.querySelectorAll('.today-forecast');

  document.querySelectorAll('.today td')[1].innerHTML = Math.floor(datas[today + ' ' + hour].temperature.sol - 273.15) + '<span>°C</span>';
  td[0].textContent = datas[today + ' ' + hour].pluie + ' mm';
  td[1].textContent = datas[today + ' ' + hour].vent_moyen['10m'] + ' km/h';
  td[2].textContent = datas[today + ' ' + hour].humidite['2m'] + ' %';
  td[3].textContent = Math.floor(datas[today + ' ' + hour].pression.niveau_de_la_mer / 100) + ' hPa';

  td = document.querySelectorAll('.tomorrow td span');

  document.querySelectorAll('.tomorrow td')[1].innerHTML = Math.floor(datas[tomorrow + ' ' + hour].temperature.sol - 273.15) + '<span>°C</span>';
  td[1].textContent = datas[tomorrow + ' ' + hour].pluie + ' mm';
  td[2].textContent = datas[tomorrow + ' ' + hour].vent_moyen['10m'] + ' km/h';
  td[3].textContent = datas[tomorrow + ' ' + hour].humidite['2m'] + ' %';
  td[4].textContent = Math.floor(datas[tomorrow + ' ' + hour].pression.niveau_de_la_mer / 100) + ' hPa';

  td = document.querySelectorAll('.after-tomorrow td span');

  document.querySelectorAll('.after-tomorrow td')[1].innerHTML = Math.floor(datas[afterTomorrow + ' ' + hour].temperature.sol - 273.15) + '<span>°C</span>';
  td[1].textContent = datas[afterTomorrow + ' ' + hour].pluie + ' mm';
  td[2].textContent = datas[afterTomorrow + ' ' + hour].vent_moyen['10m'] + ' km/h';
  td[3].textContent = datas[afterTomorrow + ' ' + hour].humidite['2m'] + ' %';
  td[4].textContent = Math.floor(datas[afterTomorrow + ' ' + hour].pression.niveau_de_la_mer / 100) + ' hPa';

  if(datas[today + ' ' + hour].pluie == 0) {
    document.querySelector('.today td i').setAttribute('class', icons.sunny)
  }
  if(datas[today + ' ' + hour].pluie > 0 && datas[today + ' ' + hour].pluie < 1) {
    document.querySelector('.today td i').setAttribute('class', icons.cloudy)
  }
  if(datas[today + ' ' + hour].pluie > 1) {
    document.querySelector('.today td i').setAttribute('class', icons.rain)
  }
  if(datas[today + ' ' + hour].vent_moyen['10m'] > 45) {
    document.querySelector('.today td i').setAttribute('class', icons.wind)
  }
  if(datas[today + ' ' + hour].risque_neige === 'oui') {
    document.querySelector('.today td i').setAttribute('class', icons.snow)
  }

  if(datas[tomorrow + ' ' + hour].pluie == 0) {
    document.querySelector('.tomorrow td i').setAttribute('class', icons.sunny)
  }
  if(datas[tomorrow + ' ' + hour].pluie > 0 && datas[tomorrow + ' ' + hour].pluie < 1) {
    document.querySelector('.tomorrow td i').setAttribute('class', icons.cloudy)
  }
  if(datas[tomorrow + ' ' + hour].pluie > 1) {
    document.querySelector('.tomorrow td i').setAttribute('class', icons.rain)
  }
  if(datas[tomorrow + ' ' + hour].vent_moyen['10m'] > 45) {
    document.querySelector('.tomorrow td i').setAttribute('class', icons.wind)
  }
  if(datas[tomorrow + ' ' + hour].rique_neige === 'oui') {
    document.querySelector('.tomorrow td i').setAttribute('class', icons.snow)
  }


  if(datas[afterTomorrow + ' ' + hour].pluie === 0) {
    document.querySelector('.after-tomorrow td i').setAttribute('class', icons.sunny)
  }
  if(datas[afterTomorrow + ' ' + hour].pluie > 0 && datas[afterTomorrow + ' ' + hour].pluie < 1) {
    document.querySelector('.after-tomorrow td i').setAttribute('class', icons.cloudy)
  }
  if(datas[afterTomorrow + ' ' + hour].pluie > 1) {
    document.querySelector('.after-tomorrow td i').setAttribute('class', icons.rain)
  }
  if(datas[afterTomorrow + ' ' + hour].vent_moyen['10m'] > 45) {
    document.querySelector('.after-tomorrow td i').setAttribute('class', icons.wind)
  }
  if(datas[afterTomorrow + ' ' + hour].rique_neige === 'oui') {
    document.querySelector('.after-tomorrow td i').setAttribute('class', icons.snow)
  }


}
