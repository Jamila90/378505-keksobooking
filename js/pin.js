'use strict';

window.pin = (function () {

  var PIN_WIDTH = 40;
  var PIN_HEIGTH = 40;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');

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
      fragment.appendChild(createPin(window.data.adList[i]));
    }
    mapPins.appendChild(fragment);
  };

  var identifyIndex = function (src) {
    var index = null;
    window.data.adList.forEach(function (item, i) {
      if (src.indexOf(item.author.avatar) >= 0) {
        index = i;
      }
    });
    return index;
  };

  var getArrPins = function () {
    var mapPins = map.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', window.map.onClickPin);
    }
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
    var mapActive = map.querySelector('.map__pin--active');
    if (mapActive) {
      mapActive.classList.remove('map__pin--active');
    }
  };

  return {
    createPins: createPins,
    getArrPins: getArrPins,
    identifyIndex: identifyIndex,
    onPopupEnterPress: onPopupEnterPress,
    onPopupEscPress: onPopupEscPress,
    onPopupClose: onPopupClose
  };

})();
