'use strict'

var TITLES = ['Большая уютная квартира',
 'Маленькая неуютная квартира',
 'Огромный прекрасный дворец',
 'Маленький ужасный дворец',
 'Красивый гостевой домик',
 'Некрасивый негостеприимный домик',
 'Уютное бунгало далеко от моря',
 'Неуютное бунгало по колено в воде'];

var TYPES = ['flat', 'house', 'bungalo'];
var PRICES = [1000, 1000000];
var ROOMS = [1, 5];
var FEATURES = ['wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];

var QUESTS = [0, 10];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var LOCATION = {
   x: {
     min: 300,
     max: 900,
   },

   y: {
     min: 100,
     max: 500,
   }
};

var PIN_WIDTH = 40;
var PIN_HEIGTH = 40;

  var getRandomValue = function(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) - minNum;
  };

  var getRandomArr = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var features = shuffle(FEATURES).slice(0, getRandomValue(1, FEATURES.length));
  var titles = shuffle(TITLES);

    function shuffle(arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
      }

      return arr;
    };

  var createAd = function (amount) {
    var adList = createAd(8);
    for (var i = 0; i < amount; i++)
      var avatarAd = {
      'author': {
          'avatar': 'img/avatars/user0' + (i+1) + '.png',
        },

        "offer": {
          'title': titles[i],
          'address': location.x + ',' + location.y,
          'price': getRandomValue(PRICES),
          'type': getRandomValue(TYPES),
          'rooms': getRandomValue(ROOMS),
          'guests': getRandomValue(QUESTS),
          'checkin': getRandomValue(CHECKIN),
          'checkout': getRandomValue(CHECKOUT),
          'features': features,
          'description': '',
          'photos': [],
        },

        'location': {
          'x': getRandomValue(LOCATION.x.min, LOCATION.x.max),
          'y': getRandomValue(LOCATION.y.min, LOCATION.y.max),
        }

      }
      adList.push(avatarAd);
      return adList;
    };



  var createPin = function (obj) {
    var img = document.createElement('img');
    var pin = document.createELement('button');
    pin.classList.add('map__pin');
    pin.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = obj.location.y - PIN_HEIGTH / 2 + 'px';
    img.src = obj.author.avatar;
    img.width = PIN_WIDTH;
    img.height = PIN_HEIGTH ;
    pin.appendChild('img');

    return pin;

  };

  var createPins = function (pin) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0;i < pin.length;i++) {

      fragment.appendChild(createPin(adList[i]));
    }
      mapPins.appendChild(fragment);
  };


