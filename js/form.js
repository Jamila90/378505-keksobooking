'use strict';

(function () {

  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var typeSelect = form.querySelector('#type');
  var price = form.querySelector('#price');
  var target;

  var timeChange = function (evt) {
    var toChange = evt.target.id === 'timein' ? timeOut : timeIn;
    var timeInValue = parseInt(timeIn.value, 10);
    var timeOutValue = parseInt(timeOut.value, 10);
    if (timeInValue > timeOutValue) {
      toChange.value = evt.target.value;
    }
  };

  var roomNumberCapacity = function (evt) {
    target = evt.target.value;
    switch (target) {
      case '1':
        capacity.value = '1';
        break;
      case '2':
        capacity.value = '2';
        break;
      case '3':
        capacity.value = '3';
        break;
      case '100':
        capacity.value = '0';
    }
  };

  var priceChange = function (evt) {
    target = evt.currentTarget.value;
    switch (target) {
      case 'bungalo':
        price.value = 0;
        break;
      case 'flat':
        price.value = 1000;
        break;
      case 'house':
        price.value = 5000;
        break;
      case 'palace':
        price.value = 10000;
    }
  };

  timeIn.addEventListener('change', timeChange);
  timeOut.addEventListener('change', timeChange);
  roomNumber.addEventListener('change', roomNumberCapacity);
  typeSelect.addEventListener('change', priceChange);

})();
