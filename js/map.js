'use strict';

window.map = (function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var fieldset = form.querySelectorAll('.form__element');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin');
  var target;
  var popupClose;

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

    window.pin.createPins(window.data.adList);
    window.pin.getArrPins();
  };

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
      window.pin.getArrPins();
      popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', window.pin.onPopupClose);
      document.addEventListener('keydown', window.pin.onPopupEscPress);
      popupClose.addEventListener('keydown', window.pin.onPopupEscPress);
      popupClose.addEventListener('keydown', window.pin.onPopupEnterPress);
    }
  };

  mapPin.addEventListener('click', onClickPin);
  mapPinMain.addEventListener('mouseup', onMouseupButton);

  return {
    onClickPin: onClickPin,
  };

})();
