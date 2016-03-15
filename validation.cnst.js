(function() {
    
  'use strict';

  angular
    .module('ctRolodex')
    .constant('formValidation', {
      numbers: /^\d+$/,
      positiveNumbers: /^[1-9][0-9]*$/,
      zipCode: /^\d{5}(-\d{4})?$/,
      phoneNumber: /^1?\D*([02-9]\d{2})\D*(\d{3})\D*(\d{4})\D*(\d{0,6})$/,
      creditCard: /^\d{15,16}$/,
      money: /^\d+((,\d{3})+)?(\.\d+)?$/
    });

})();