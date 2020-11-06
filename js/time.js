const days = {
  Mon: 'Lundi',
  Tue: 'Mardi',
  Wed: 'Mercredi',
  Thu: 'Jeudi',
  Fri: 'Vendredi',
  Sat: 'Samedi',
  Sun: 'Dimanche'
}

const months = {
  Jan: 'Janvier',
  Feb: 'Février',
  Mar: 'Mars',
  Apr: 'Avril',
  May: 'Mai',
  Jun: 'Juin',
  Jul: 'Juillet',
  Aug: 'Août',
  Sep: 'Septembre',
  Oct: 'Octobre',
  Nov: 'Novembre',
  Dec: 'Décembre'
}

function getDate() {
  let day = new Date();
  let today = new Date();
  let tomorrow = new Date(day.setDate(day.getDate() + 1));
  let afterTomorrow = new Date(day.setDate(day.getDate() + 1));

  let todayArray = today.toDateString().split(' ');
  let todayStr = `${days[todayArray[0]]} ${todayArray[2]} ${months[todayArray[1]]}`;

  let tomorrowArray = tomorrow.toDateString().split(' ');
  let tomorrowStr = `${days[tomorrowArray[0]]} ${tomorrowArray[2]} ${months[tomorrowArray[1]]}`;

  let aTomorrowArray = afterTomorrow.toDateString().split(' ');
  let aTomorrowStr = `${days[aTomorrowArray[0]]} ${aTomorrowArray[2]} ${months[aTomorrowArray[1]]}`;


  document.querySelector('.today h2').textContent = todayStr;
  document.querySelector('.tomorrow h2').textContent = tomorrowStr;
  document.querySelector('.after-tomorrow h2').textContent = aTomorrowStr;

  let hour = today.toLocaleTimeString();

  let day1 = today.getDate();
  let month1 = today.getMonth() + 1;
  day1 < 10 ? day1 = '0' + day1 : day1 = day1;
  month1 < 10 ? month1 = '0' + month1 : month1 = month1;

  let day2 = tomorrow.getDate();
  let month2 = tomorrow.getMonth() + 1;
  day2 < 10 ? day2 = '0' + day2 : day2 = day2;
  month2 < 10 ? month2 = '0' + month2 : month2 = month2;

  let day3 = afterTomorrow.getDate();
  let month3 = afterTomorrow.getMonth() + 1;
  day3 < 10 ? day3 = '0' + day3 : day3 = day3;
  month3 < 10 ? month3 = '0' + month3 : month3 = month3;

  today = today.getFullYear() + '-' + month1 + '-' + day1;
  tomorrow = tomorrow.getFullYear() + '-' + month2 + '-' + day2;
  afterTomorrow = afterTomorrow.getFullYear() + '-' + month3 + '-' + day3;

  return [getHour(hour), today, tomorrow, afterTomorrow];
}

const acceptedValues = ['01:00', '04:00', '07:00', '10:00', '13:00', '16:00', '19:00', '22:00']

function getHour(def) {
  let inputVal = document.querySelector('.hour').value;

  if (inputVal === '') {
    console.log('Default hour');
    def = def.slice(0,2);
    def = parseInt(def);

    def<=4 ? def = '01:00:00' : def = def;
    def>=4 && def<7 ? def = '04:00:00' : def = def;
    def>=7 && def<10 ? def = '07:00:00' : def = def;
    def>=10 && def<13 ? def = '10:00:00' : def = def;
    def>=13 && def<16 ? def = '13:00:00' : def = def;
    def>=16 && def<19 ? def = '16:00:00' : def = def;
    def>=19 && def<22 ? def = '19:00:00' : def = def;
    def>=22 ? def = '22:00:00' : def = def;

    changeDisplayedHour(def)

    return def;
  } else {
    if (acceptedValues.indexOf(inputVal) !== -1) {
      console.log('Hour setted at ' + inputVal + ' by user.');
      changeDisplayedHour(inputVal + ':00');
      return inputVal + ':00';
    } else {
      document.querySelector('.hour').value = '';
    }
  }
}

function changeDisplayedHour(val) {
  let displayed = document.querySelectorAll('.forecast h5');
  displayed.forEach((h5, i) => {
    h5.textContent = val.slice(0, 5);
  });

}

getDate();
