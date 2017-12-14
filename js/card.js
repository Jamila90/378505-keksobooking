'use strict';
window.card = (function () {

  return {
    dialogAdvert: function (obj) {
      var template = document.querySelector('template').content;
      var lodge = template.cloneNode(true);
      var popup = lodge.querySelector('.popup__features');
      lodge.querySelector('h3').textContent = obj.offer.title;
      lodge.querySelector('p small').textContent = obj.offer.address;
      lodge.querySelector('.popup__price').textContent = obj.offer.price + '₽/ночь';
      lodge.querySelector('h4').textContent = window.data.TYPES_LOCAL[obj.offer.type];
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
    }
  };
})();
