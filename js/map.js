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

  var getRandomValue = function(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) - minNum;
  };

  var getRandomArr = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var features = shuffle(FEATURES).slice(0, getRandomValue(1, FEATURES.length));

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
    var AdList = [];
    for (var i = 0; i < amount; i++) {
      var avatarAd = {
      'author': {
          'avatar': 'img/avatars/user0' + (i+1) + '.png',
        },

        "offer": {
          'title': TITLES[i],
          'address': LOCATION.x + ',' + LOCATION.y,
          'price': getRandomValue(PRICES),
          'type': getRandomValue(TYPES),
          'rooms': getRandomValue(ROOMS),
          'guests': getRandomValue(QUESTS),
          'checkin': CHECKIN,
          'checkout': CHECKOUT,
          'features': features,
          'description': '',
          'photos': [],
        },

        'location': {
          'x': getRandomValue(LOCATION.x.min, LOCATION.x.max),
          'y': getRandomValue(LOCATION.y.min, LOCATION.y.max),
        }
      }
      AdList.push(avatarAd);
    }
    return AdList;
  }
