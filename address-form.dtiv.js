(function() {
  'use strict';

  angular
    .module('ctRolodex')
    .directive('ctAddressForm', directive);

  function directive() {
      
    return {
      templateUrl: 'address-form.tmpl.html',
      scope: {
        address: '=',
        onSubmit: '&',
        onCancel: '&'
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function(formValidation, addressConstants) {
          
        var vm = this;
        vm.validation = formValidation;
        vm.states = addressConstants.states;

        vm.addressModel = vm.address ? vm.address : {};

        function resetForm() {
            
          vm.addressModel = {};
          vm.form.$setPristine();
          vm.form.$setUntouched();
        }

        vm.cancel = function() {
            
          resetForm();
          vm.onCancel();
        };

        vm.submit = function() {
            
          if (vm.form.$valid) {
            vm.onSubmit({
              address: angular.copy(vm.addressModel)
            });
            resetForm();
          }
        };
      }
    };
  }
})();