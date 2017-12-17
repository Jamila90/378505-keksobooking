'use strict';
(function () {

  window.synchronizeFields = (function (elem1, elem2, value1, value2, callback) {

    elem1.addEventListener('change', function () {
      for (var i = 0; i < value1.length; i++) {
        if (elem1.value === value1[i]) {
          callback(elem2, value2[i]);
        }
      }
    });

    elem2.addEventListener('change', function () {
      for (var i = 0; i < value2.length; i++) {
        if (elem2.value === value2[i]) {
          callback(elem1, value1[i]);
        }
      }
    });
  });

})();
