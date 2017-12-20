'use strict';

window.pin = (function () {

  var PIN_WIDTH = 40;
  var PIN_HEIGTH = 40;

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

  return {
    createPins: createPins,
    identifyIndex: identifyIndex,
    PIN_HEIGTH: PIN_HEIGTH,
    PIN_WIDTH: PIN_WIDTH
  };

})();
