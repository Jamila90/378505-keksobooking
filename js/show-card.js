'use strict';

window.showCard = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var target;
  var popupClose;

  var onClickPin = function (evt) {
    if (evt.target.classList.contains('map__pin')) {
      target = evt.target.firstElementChild;
    } else if (evt.target.nodeName === 'IMG') {
      target = evt.target;
    } else {
      return;
    }
    var index = window.pin.identifyIndex(target.src);
    if (index !== null) {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        map.removeChild(mapCard);
      }
      map.insertBefore(window.card.dialogAdvert(window.data.adList[index]), mapFiltersContainer);
      var mapPinActive = document.querySelector('.map__pin--active');
      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.classList.remove('hidden');
      }
      evt.currentTarget.classList.add('map__pin--active');
      getArrPins();
      popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', onPopupClose);
      document.addEventListener('keydown', onPopupEscPress);
      popupClose.addEventListener('keydown', onPopupEscPress);
      popupClose.addEventListener('keydown', onPopupEnterPress);
    }
  };

  var getArrPins = function () {
    var mapPins = map.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', onClickPin);
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

  mapPin.addEventListener('click', onClickPin);

  return {
    getArrPins: getArrPins,
    onClickPin: onClickPin,
  };

})();
