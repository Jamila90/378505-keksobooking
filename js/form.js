'use strict';

(function () {

  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var typeSelect = form.querySelector('#type');
  var price = form.querySelector('#price');

  var timeChange = function (changedTime, timeToSynchrone) {
    var isSynchroniseToLow = changedTime.id === 'timein' ? true : false;
    if (isSynchroniseToLow) {
      if (parseInt(changedTime.value, 10) > parseInt(timeToSynchrone.value, 10)) {
        timeToSynchrone.value = changedTime.value;
      }
    } else {
      if (parseInt(changedTime.value, 10) < parseInt(timeToSynchrone.value, 10)) {
        timeToSynchrone.value = changedTime.value;
      }
    }
  };

  window.synchronizeFields(timeIn, timeOut, timeChange);
  window.synchronizeFields(timeOut, timeIn, timeChange);

  var priceChange = function (type, priceVal) {
    switch (type.value) {
      case 'bungalo':
        priceVal.value = 0;
        break;
      case 'flat':
        priceVal.value = 1000;
        break;
      case 'house':
        priceVal.value = 5000;
        break;
      case 'palace':
        priceVal.value = 10000;
    }
  };

  window.synchronizeFields(typeSelect, price, priceChange);

  var setRoomNumberCapacity = function (rooms, guests) {
    switch (rooms.value) {
      case '1':
        guests.value = '1';
        break;
      case '2':
        guests.value = '2';
        break;
      case '3':
        guests.value = '3';
        break;
      case '100':
        guests.value = '0';
    }
  };

  window.synchronizeFields(roomNumber, capacity, setRoomNumberCapacity);

})();
