window.addEventListener('load', () => {
  alert('Opération de maintenance en cours, merci de revenir plus tard...')
})

const loader = document.querySelector('.loader-container');
const loaderParent = document.querySelector('.content');
let apiUrl = 'https://cors-anywhere.herokuapp.com/http://www.infoclimat.fr/public-api/gfs/json?_ll=48.85341,2.3488&_auth=BhwHEA9xVXcALVBnVyFXflY%2BAjdeKFB3AHxVNglsXyIHbFY3D29TNVQ6BnsPIFZgUn8DYFphADABagtzWCpTMgZsB2sPZFUyAG9QNVd4V3xWeAJjXn5QdwBkVToJel89B2ZWNA9yUzBUPAZnDyFWY1JjA2daegAnAWMLaVg8UzgGYgdjD29VMQBtUDdXeFd8VmACNF5lUDkAZ1U6CWRfNQdkVjUPalMxVDoGbA8hVmtSZQNiWmQAMQFnC2hYMVMvBnoHGg8fVSoAL1BwVzJXJVZ4AjdeP1A8&_c=19f13168e71332a1d0913aabac898649';

async function main(apiUrl) {
  document.body.style.cursor = 'progress';
  loaderParent.appendChild(loader);
  const meteo = await window.fetch(apiUrl)
  .then(res => res.json())
  .then (json => json);

  displayWeatherInfos(meteo);
  removeLoader();

  function displayWeatherInfos(data) {

    let date = new Date();
    let jour = date.getDate();
    let mois = date.getMonth() + 1;
    let annee = date.getFullYear();
    let heure = date.getHours();

    heure >= 2 && heure < 5 ? heure = 2 : heure = heure;
    heure >= 5 && heure < 8 ? heure = 5 : heure = heure;
    heure >= 8 && heure < 11 ? heure = 8 : heure = heure;
    heure >= 11 && heure < 14 ? heure = 11 : heure = heure;
    heure >= 14 && heure < 17 ? heure = 14 : heure = heure;
    heure >= 17 && heure < 20 ? heure = 17 : heure = heure;
    heure >= 20 && heure < 23 ? heure = 20 : heure = heure;
    heure >= 23 && heure < 2 ? heure = 23 : heure = heure;

    heure < 10 ? heure = `0${heure}` : heure = heure;

    jour < 10 ? jour = '0' + jour : jour = jour;
    mois < 10 ? mois = '0' + mois : mois = mois;

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

    let day2 = new Date(date.setDate(date.getDate()+1));

    let yeard = day2.getFullYear();
    let moisd = day2.getMonth() + 1;
    let jourd = day2.getDate();

    jourd < 10 ? jourd = '0' + jourd : jourd = jourd;
    moisd < 10 ? moisd = '0' + moisd : moisd = moisd;

    const temperatureD = Math.floor(meteo[yeard + '-' + moisd + '-' + jourd + ' ' + heure + ':00:00'].temperature.sol - 273.15);
    const humiditeD = Math.floor(meteo[yeard + '-' + moisd + '-' + jourd + ' ' + heure + ':00:00'].humidite['2m']);
    const ventD = Math.floor(meteo[yeard + '-' + moisd + '-' + jourd + ' ' + heure + ':00:00'].vent_moyen["10m"]);
    const precipD = Math.floor(meteo[yeard + '-' + moisd + '-' + jourd + ' ' + heure + ':00:00'].pluie);
    const pressionD =  Math.floor((meteo[yeard + '-' + moisd + '-' + jourd + ' ' + heure + ':00:00'].pression["niveau_de_la_mer"])/100);

    document.querySelector('.temp-demain').textContent = temperatureD + "°C";
    document.querySelector('.precipitacions-demain').textContent = precipD + " mm";
    document.querySelector('.vent-demain').textContent = ventD + " km/h";
    document.querySelector('.humidite-demain').textContent = humiditeD + " %";
    document.querySelector('.pression-demain').textContent = pressionD + " hPa";


    let day3 = new Date(day2.setDate(day2.getDate()+1));

    let yearad = day3.getFullYear();
    let moisad = day3.getMonth() + 1;
    let jourad = day3.getDate();

    jourad < 10 ? jourad = '0' + jourad : jourad = jourad;
    moisad < 10 ? moisad = '0' + moisad : moisad =  moisad;

    const temperatureAd = Math.floor(meteo[yearad + '-' + moisad + '-' + jourad + ' ' + heure + ':00:00'].temperature.sol - 273.15);
    const humiditeAd = Math.floor(meteo[yearad + '-' + moisad + '-' + jourad + ' ' + heure + ':00:00'].humidite['2m']);
    const ventAd = Math.floor(meteo[yearad + '-' + moisad + '-' + jourad + ' ' + heure + ':00:00'].vent_moyen["10m"]);
    const precipAd = Math.floor(meteo[yearad + '-' + moisad + '-' + jourad + ' ' + heure + ':00:00'].pluie);
    const pressionAd =  Math.floor((meteo[yearad + '-' + moisad + '-' + jourad + ' ' + heure + ':00:00'].pression["niveau_de_la_mer"])/100);

    document.querySelector('.temp-ademain').textContent = temperatureAd + "°C";
    document.querySelector('.precipitacions-ademain').textContent = precipAd + " mm";
    document.querySelector('.vent-ademain').textContent = ventAd + " km/h";
    document.querySelector('.humidite-ademain').textContent = humiditeAd + " %";
    document.querySelector('.pression-ademain').textContent = pressionAd + " hPa";
  };

  function removeLoader(){
    loaderParent.removeChild(loader);
  };
  document.body.style.cursor = 'auto';
};

let msgBox = document.querySelector('.info-box');

async function findCity(city) {

  document.body.removeChild(msgBox);

  let apiKey = 'VU8EE1YoXH4ALVNkVyEKI1Y%2BADVZLwkuVCgBYg5rA34HbANiB2cBZ1U7A34CLQE3WXQDYA80ADBQOwpyWykEZVU%2FBGhWPVw7AG9TNld4CiFWeABhWXkJLlQwAW4OfQNhB2YDYQd6AWJVPQNiAiwBNFloA2cPLwAnUDIKaFs%2FBG9VMARpVjJcPQBoUzBXeAohVmAANlliCWBUNQEwDmoDMgc2AzQHNQFjVT4DYwIsAT1ZbwNhDzMAOlA3Cm5bMwR4VSkEGVZGXCMAL1NzVzIKeFZ4ADVZOAll&_c=6afd777ac1b376af17cc7744faec4733';

  var request = new XMLHttpRequest();
  request.open('GET', `https://cors-anywhere.herokuapp.com/https://www.infoclimat.fr/api-previsions-meteo.html?id=${city}&cntry=FR`);
  request.send();

  request.onload = function() {
    var res = request.response;
    let string = '<textarea style="width:100%" rows="3">';
    let index = res.indexOf(string) + string.length;
    let sliced = res.slice(index);
    let index2 = sliced.indexOf(string) + string.length;
    let sliced2 = sliced.slice(index2);

    let string2 = '</textarea>';
    let index3 = sliced2.indexOf(string2);
    let goodSlice = sliced2.slice(0, index3);
    let falseIndex = goodSlice.indexOf('amp;');
    let slicedWithKey = goodSlice.slice(0, falseIndex) + '_auth=' + apiKey;
    console.log(slicedWithKey);

    apiUrl = 'https://cors-anywhere.herokuapp.com/' + slicedWithKey;

    main(apiUrl)
  };
};

let closeBtn = document.querySelector('.close-btn');

document.querySelector('#submit').onclick = function(e) {
  let inputVal = document.querySelector('#city').value;
  if(inputVal.length === 7){
    findCity(inputVal);
    console.info('Données récupérées !');
  } else {
    console.error('Id de ville invalide ! Veuillez réessayer !');
  };
};

document.querySelector('#city').onkeypress = function(e) {
  if(e.key === 'Enter'){
    let inputVal = document.querySelector('#city').value;
    if(inputVal.length === 7){
      findCity(inputVal);
      console.info('Données récupérées !');
    } else {
      console.error('Id de ville invalide ! Veuillez réessayer !');
    }
  }
};


closeBtn.onclick = function(e){
  document.body.removeChild(msgBox);
};


let href = window.location.href;
if (href.indexOf('?') !== -1) {
  let index = href.indexOf("?") + 4;
  findCity(href.slice(index));
} else {
  main(apiUrl)
}
