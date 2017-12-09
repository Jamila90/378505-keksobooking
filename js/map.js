'use strict';

var TITLES = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var TYPES = ['flat', 'house', 'bungalo'];
var TYPES_LOCAL = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};

var PRICES = [1000, 1000000];
var ROOMS = [1, 5];
var FEATURES = ['wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];

var GUESTS = [1, 10];
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
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var features = shuffle(FEATURES).slice(0, getRandomValue(1, FEATURES.length));
var titles = shuffle(TITLES);

var createAd = function (amount) {
  var adList = [];
  for (var i = 0; i < amount; i++) {
    var locX = getRandomValue(LOCATION.x.min, LOCATION.x.max);
    var locY = getRandomValue(LOCATION.y.min, LOCATION.y.max);
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


var createPin = function (obj) {
  var img = document.createElement('img');
  var pin = document.createElement('button');
  pin.classList.add('map__pin');
  pin.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = obj.location.y - PIN_HEIGTH + 'px';
  img.src = obj.author.avatar;
  img.width = PIN_WIDTH;
  img.height = PIN_HEIGTH;
  pin.appendChild(img);

  return pin;

};

var createPins = function (arr) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {

    fragment.appendChild(createPin(adList[i]));
  }
  mapPins.appendChild(fragment);
};

var dialogAdvert = function (obj) {
  var template = document.querySelector('template').content;
  var lodge = template.cloneNode(true);
  var popup = lodge.querySelector('.popup__features');
  lodge.querySelector('h3').textContent = obj.offer.title;
  lodge.querySelector('p small').textContent = obj.offer.address;
  lodge.querySelector('.popup__price').textContent = obj.offer.price + '₽/ночь';
  lodge.querySelector('h4').textContent = TYPES_LOCAL[obj.offer.type];
  lodge.querySelector('p:nth-of-type(3)').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  lodge.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  lodge.querySelector('p:nth-of-type(5)').textContent = obj.offer.description;
  lodge.querySelector('.popup__avatar').src = obj.author.avatar;

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < obj.offer.features.length; i++) {
    var element = document.createElement('li');
    element.className = 'feature feature--' + obj.offer.features[i];
    fragment.appendChild(element);
  }
  popup.innerHTML = '';
  popup.appendChild(fragment);

  return lodge;
};

var adList = createAd(8);


var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var mapPinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.notice__form');
var fieldset = form.querySelectorAll('.form__element');
var mapPin = map.querySelector('.map__pin');
var popupClose;
var target;

var identifyIndex = function (src) {
  var index = null;
  adList.forEach(function (item, i) {
    if (src.indexOf(item.author.avatar) >= 0) {
      index = i;
    }
  });
  return index;
};

var arrPins = function () {
  var mapPins = map.querySelectorAll('.map__pin');
  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].addEventListener('click', onClickPin);
  }
};

var onMouseupButton = function () {
  var mapFaded = document.querySelector('.map--faded');
  var noticeForm = document.querySelector('.notice__form--disabled');

  if (mapFaded) {
    mapFaded.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');

    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].removeAttribute('disabled', 'disabled');
    }
  }

  createPins(adList);
  arrPins();
};

var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPopupClose();
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onPopupClose();
  }
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupClose = function () {
  var popup = document.querySelector('.popup');
  if (popup) {
    popup.classList.add('hidden');
  }
  map.querySelector('.map__pin--active').classList.remove('map__pin--active');
};

var onClickPin = function (evt) {
  if (evt.target.classList.contains('map__pin')) {
    target = evt.target.firstElementChild;
  } else if (evt.target.nodeName === 'IMG') {
    target = evt.target;
  } else {
    return;
  }
  var index = identifyIndex(target.src);
  if (index !== null) {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      map.removeChild(mapCard);
    }
    map.insertBefore(dialogAdvert(adList[index]), mapFiltersContainer);
    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.classList.remove('hidden');
    }
    evt.currentTarget.classList.add('map__pin--active');
    arrPins();
    popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', onPopupClose);
    document.addEventListener('keydown', onPopupEscPress);
    popupClose.addEventListener('keydown', onPopupEscPress);
    popupClose.addEventListener('keydown', onPopupEnterPress);
  }
};

mapPinMain.addEventListener('mouseup', onMouseupButton);
mapPin.addEventListener('click', onClickPin);

