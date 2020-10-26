const loader = document.querySelector('.loader-container');
const loaderParent = document.querySelector('.content');
let apiKey = 'BhwCFQF%2FXH5QfVptUiQLIlY%2BVWAKfAUiAn5QMw9qXyIJYlc2Dm5VMwNtUC1SfQs9Ai8GZQoxCDhUP1IqAHICYwZsAm4Balw7UD9aP1J9CyBWeFU0CioFIgJmUD8PfF89CWhXNQ5zVTYDa1AxUnwLPgIzBmIKKggvVDZSMwBtAmAGZAJvAWVcNlA3WjpSfQsgVmBVYwoyBT0CZFAwD2FfbQloV2UOaVU2A29QNVJ8Cz8CNAZgCjQINFQ%2BUjcAagJ%2BBnoCHwERXCNQf1p6UjcLeVZ4VWAKawVp&_c=e1f1f6aa3054a85d4b428fe6051deefa';
let apiUrl = 'https://cors-anywhere.herokuapp.com/https://www.infoclimat.fr/public-api/gfs/json?_ll=48.85341,2.3488&_auth=' + apiKey;
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://www.infoclimat.fr/public-api/gfs/json?_ll=';
let href = window.location.href;
const cityDesc = document.querySelector('.city-h1');
let msgBox = document.querySelector('.info-box');

let pos = navigator.geolocation.getCurrentPosition((position) => {
  pos = position;
  if (href.indexOf('pos') !== -1) {
    console.log('geoloc');
    geoloc();
  }
  console.log('Permission accordée !');
});

function removeLoader(){
  loaderParent.removeChild(loader);
};

function removeMsgBox() {
  try {
    document.body.removeChild(msgBox);
  } catch {};
};

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

async function getForecasts(apiUrl) {
  document.body.style.cursor = 'progress';
  loaderParent.appendChild(loader);
  const meteo = await window.fetch(apiUrl)
  .then(res => res.json())
  .then (json => json);

  console.log(meteo);

  displayWeatherInfos(meteo);
  removeLoader();

  document.body.style.cursor = 'auto';
};

function displayWeatherInfos(meteo) {

  let date = new Date();
  let jour = date.getDate();
  let mois = date.getMonth() + 1;
  let annee = date.getFullYear();
  let heure = date.getHours();

  heure >= 1 && heure < 4 ? heure = 1 : heure = heure;
  heure >= 4 && heure < 7 ? heure = 4 : heure = heure;
  heure >= 7 && heure < 10 ? heure = 7 : heure = heure;
  heure >= 10 && heure < 13 ? heure = 10 : heure = heure;
  heure >= 13 && heure < 16 ? heure = 13 : heure = heure;
  heure >= 16 && heure < 19 ? heure = 16 : heure = heure;
  heure >= 19 && heure < 22 ? heure = 19 : heure = heure;
  heure >= 22 && heure < 2 ? heure = 22 : heure = heure;

  heure < 10 ? heure = `0${heure}` : heure = heure;

  jour < 10 ? jour = '0' + jour : jour = jour;
  mois < 10 ? mois = '0' + mois : mois = mois;

  displayTodayForecast(meteo, heure, jour, mois, annee);

  let day2 = new Date(date.setDate(date.getDate()+1));

  let yeard = day2.getFullYear();
  let moisd = day2.getMonth() + 1;
  let jourd = day2.getDate();

  jourd < 10 ? jourd = '0' + jourd : jourd = jourd;
  moisd < 10 ? moisd = '0' + moisd : moisd = moisd;

  displayTomorrowForecast(meteo, heure, jourd, moisd, yeard);


  let day3 = new Date(day2.setDate(day2.getDate()+1));

  let yearad = day3.getFullYear();
  let moisad = day3.getMonth() + 1;
  let jourad = day3.getDate();

  jourad < 10 ? jourad = '0' + jourad : jourad = jourad;
  moisad < 10 ? moisad = '0' + moisad : moisad =  moisad;

  displayAfterForecast(meteo, heure, jourad, moisad, yearad);
};

function displayTodayForecast(meteo, heure, jour, mois, annee) {
  const temperature = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].temperature.sol - 273.15);
  const humidite = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].humidite['2m']);
  const vent = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].vent_moyen["10m"]);
  const precip = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].pluie);
  const pression =  Math.floor((meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].pression["niveau_de_la_mer"])/100);

  document.querySelector('.temp').textContent = temperature + "°C";
  document.querySelector('.precipitacions').textContent = precip + " mm";
  document.querySelector('.vent').textContent = vent + " km/h";
  document.querySelector('.humidite').textContent = humidite + " %";
  document.querySelector('.pression').textContent = pression + " hPa";
};

function displayTomorrowForecast(meteo, heure, jour, mois, annee) {
  const temperature = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].temperature.sol - 273.15);
  const humidite = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].humidite['2m']);
  const vent = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].vent_moyen["10m"]);
  const precip = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].pluie);
  const pression =  Math.floor((meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].pression["niveau_de_la_mer"])/100);

  document.querySelector('.temp-demain').textContent = temperature + "°C";
  document.querySelector('.precipitacions-demain').textContent = precip + " mm";
  document.querySelector('.vent-demain').textContent = vent + " km/h";
  document.querySelector('.humidite-demain').textContent = humidite + " %";
  document.querySelector('.pression-demain').textContent = pression + " hPa";
};

function displayAfterForecast(meteo, heure, jour, mois, annee) {
  const temperature = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].temperature.sol - 273.15);
  const humidite = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].humidite['2m']);
  const vent = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].vent_moyen["10m"]);
  const precip = Math.floor(meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].pluie);
  const pression =  Math.floor((meteo[annee + '-' + mois + '-' + jour + ' ' + heure + ':00:00'].pression["niveau_de_la_mer"])/100);

  document.querySelector('.temp-ademain').textContent = temperature + "°C";
  document.querySelector('.precipitacions-ademain').textContent = precip + " mm";
  document.querySelector('.vent-ademain').textContent = vent + " km/h";
  document.querySelector('.humidite-ademain').textContent = humidite + " %";
  document.querySelector('.pression-ademain').textContent = pression + " hPa";
}

async function findCity(city, postCode) {

  removeMsgBox()

  res = await fetch(`https://geo.api.gouv.fr/communes?nom=${city}&format=geojson`)
    .then(res => res.json())
    .then(json => json);

    res = res.features;

    for (var item of res) {
      item.properties.codesPostaux.forEach((code, i) => {
        if (code == postCode) {
          let lat = item.geometry.coordinates[1];
          let long = item.geometry.coordinates[0];
          getForecasts(`${baseUrl}${lat},${long}&_auth=${apiKey}`);
          console.log('Fecth en cours !');
          cityDesc.textContent = capitalize(city);
        }
      });

    };
  };


  let closeBtn = document.querySelector('.close-btn');

  document.querySelector('#submit').onclick = function(e) {
    let city = document.querySelector('#city').value.toLowerCase();
    let postCode = document.querySelector('#postcode').value;
    findCity(city, postCode)
  };

  document.querySelector('#postcode').onkeypress = function(e) {
    if(e.key === 'Enter'){
      let city = document.querySelector('#city').value.toLowerCase();
      let postCode = document.querySelector('#postcode').value;
      findCity(city, postCode)
    }
  };


  closeBtn.onclick = function(e){
    document.body.removeChild(msgBox);
  };

  if ('geolocation' in navigator) {
    let btn = document.createElement('button')
    btn.textContent = 'Utiliser ma position';
    btn.classList.add('posBtn');
    let parent = document.querySelector('footer');
    let cpRight = document.querySelector('.cpright');
    parent.insertBefore(btn, cpRight);
    btn.onclick = geoloc;
  }

  function geoloc() {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    getForecasts(`${baseUrl}${lat},${long}&_auth=${apiKey}`);
    cityDesc.textContent = 'ma position';
    removeMsgBox();
  };

  if (href.indexOf('?') !== -1) {
    if (href.indexOf("?") !== -1 && href.indexOf('&') !== -1){
      let index = href.indexOf("?");
      let indexEt = href.indexOf('&');
      let city = href.slice(index + 7, indexEt).toLowerCase();
      let code = href.slice(indexEt + 6);

      findCity(city, code);
    }
  } else {
    getForecasts(apiUrl)
  }
