'use strict';
(function () {

  window.synchronizeFields = function (field, value, callback) {

    field.addEventListener('change', function () {
      callback(field, value);
    });

  };

})();
