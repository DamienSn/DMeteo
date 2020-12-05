let apiKey = '&_auth=ARtRRg9xXH5Sf1RjUiRQeVE5VWBeKFN0CnZQM1s%2BBXhSOVEwVTVRNwNtVCkBLgE3WHUFZggzUGBUP1UtXS9TMgFrUT0PZFw7Uj1UMVJ9UHtRf1U0Xn5TdApuUD9bKAVnUjNRM1UoUTIDa1Q1AS8BNFhpBWEIKFB3VDZVNF0wUzQBZ1E0D2VcNlI%2BVD9SfVB7UWdVY14wU2gKaVAwWz8FMFJkUWFVPlE0A2VUNwEvATVYaAVtCDBQbVQ0VTZdNFMvAX1RTA8fXCNSfVR0UjdQIlF%2FVWBeP1M%2F&_c=894c7a363235f0d1904ee2237eec8d41';

let baseUrl = 'https://www.infoclimat.fr/public-api/gfs/json';
let ll = '?_ll=48.85341,2.3488';

let citiesUrl = 'https://geo.api.gouv.fr/communes';

function $_GET(param) {
  var vars = {};
  window.location.href.replace( location.hash, '' ).replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if ( param ) {
    return vars[param] ? vars[param] : null;
  }
  return vars;
}

async function fetchApi(url) {
  // Date must be : YYYY-MM-DD
  //Hour must be : HH:00:00

  let res = await fetch(url)
  .then(res => {
    if (!res.ok){
      console.log('Error with fetch !');
    } else {
      res = res.json();
      return res;
    }
  })
  .catch(e => {
    console.error('There were a problem with fetch : ' + e)
  })

  return res;
}

async function getDatas() {
  let meteo = await fetchApi(baseUrl + ll + apiKey);
  // try {
    process(meteo);
  // } catch (e) {
  //   alert('Un problème est survenu... Veuillez réessayer plus tard.\nSi le probleme persiste, merci de créer un rapport de bug ici :\nhttps://github.com/DamienSn/DMeteo/issues')
  // }
}

getDatas();

let input = document.querySelector('.hour');

input.onchange = getDatas;

function geoloc() {
  let coords = navigator.geolocation.getCurrentPosition(pos => {
    coords = pos;
    let lat = coords.coords.latitude;
    let long = coords.coords.longitude;
    ll = `?_ll=${lat},${long}`;
    document.querySelector('.change-hour h1 span').textContent = 'ma position';
    getDatas();
  });

}

function populateCities() {
  let list = fetch(citiesUrl)
  .then(res => res.json())
  .then(json => {
    json.forEach((item, i) => {
      let infos = item.nom + ' - ' + item.codesPostaux[0];
      let option = new Option(infos, infos);
      document.querySelector('#cities').appendChild(option)
    })
  })
}

populateCities();

function changeCity(val) {
  //Val must be : city - postcode
  val = val.split(' - ');
  console.log(val);
  document.querySelector('.change-hour h1 span').textContent = capitalize(val[0]);

  let coords = [];

  let res = fetch(`${citiesUrl}?nom=${val[0]}&codePostal=${val[1]}&format=geojson`)
  .then(res => res.json())
  .then(json => {
    coords.push(json.features[0].geometry.coordinates[1]);
    coords.push(json.features[0].geometry.coordinates[0]);
    ll = `?_ll=${coords[0]},${coords[1]}`;
    getDatas();
  })
}

let cityInput = document.querySelector('.menu input');

cityInput.onchange = function() {
  changeCity(cityInput.value);
  document.querySelector('.menu').classList.remove('active');
  document.querySelector('.menu-toggler').classList.remove('active');
};

if($_GET('ville') !== null && $_GET('code') !== null) {
  changeCity($_GET('ville') + ' - ' + $_GET('code'));
} else {
  geoloc();
}

function capitalize(str)  {
  return str[0].toUpperCase() + str.slice(1);
}
