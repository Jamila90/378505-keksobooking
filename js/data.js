'use strict';

window.data = (function () {

  var PRICES = [1000, 1000000];
  var GUESTS = [1, 10];
  var ROOMS = [1, 5];
  var TITLES = ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo', 'palace'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'];
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
  var TYPES_LOCAL = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var getRandomValue = function (minNum, maxNum) {
    return Math.floor(minNum + Math.random() * (maxNum + 1 - minNum));
  };

  var getRandomArr = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var shuffle = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[rand];
      arr[rand] = temp;
    }
    return arr;
  };

  var titles = shuffle(TITLES);

  var createAd = function (amount) {
    var adList = [];
    for (var i = 0; i < amount; i++) {
      var locX = getRandomValue(LOCATION.x.min, LOCATION.x.max);
      var locY = getRandomValue(LOCATION.y.min, LOCATION.y.max);
      var features = shuffle(FEATURES).slice(0, getRandomValue(1, FEATURES.length));
      var avatarAd = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        },
        'offer': {
          'title': titles[i],
          'address': locX + ',' + locY,
          'price': getRandomValue(PRICES[0], PRICES[1]),
          'type': getRandomArr(TYPES),
          'rooms': getRandomValue(ROOMS[0], ROOMS[1]),
          'guests': getRandomValue(GUESTS[0], GUESTS[1]),
          'checkin': getRandomArr(CHECKIN),
          'checkout': getRandomArr(CHECKOUT),
          'features': features,
          'description': '',
          'photos': [],
        },

        'location': {
          'x': locX,
          'y': locY,
        }

      };
      adList.push(avatarAd);
    }
    return adList;
  };

  return {
    LOCATION: LOCATION,
    TYPES_LOCAL: TYPES_LOCAL,
    adList: createAd(8)
  };

})();
