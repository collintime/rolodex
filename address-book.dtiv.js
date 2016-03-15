(function() {
  'use strict';
  angular
    .module('ctRolodex')
    .directive('ctAddressBook', directive);

  function directive() {
      
    return {
      templateUrl: 'address-book.tmpl.html',
      scope: {
        addresses: '=',
        options: '=?',
        onSave: '&',
        onDelete: '&',
        onAdd: '&',
        onSelect: '&'
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function() {
          
        var vm = this;
        vm.editInProgress = false;
        vm.newAddressFormVisible = !vm.addresses.length;

        if (!vm.options) {
          vm.options = {};
        }

        // Hoek.applyToDefaults() would be nice here
        vm.options.enableSave = angular.isDefined(vm.options.enableSave) ? vm.options.enableSave : false;
        vm.options.enableDelete = angular.isDefined(vm.options.enableDelete) ? vm.options.enableDelete : false;
        vm.options.enableSelect = angular.isDefined(vm.options.enableSelect) ? vm.options.enableSelect : false;
        vm.options.enableAdd = angular.isDefined(vm.options.enableAdd) ? vm.options.enableAdd : false;
        vm.options.newAddressFormVisible = angular.isDefined(vm.options.newAddressFormVisible) ? vm.options.newAddressFormVisible : true;

        function remove(address) {
            
          var index = vm.addresses.indexOf(address);
          vm.addresses.splice(index, 1);
        }

        vm.toggleNewAddressForm = function() {
            
          vm.newAddressFormVisible = !vm.newAddressFormVisible;
          vm.editInProgress = !vm.editInProgress;
        };

        vm.cancel = function() {
            
          vm.newAddressFormVisible = false;
          vm.editInProgress = false;
        };

        vm.delete = function(address) {
            
          if (vm.options.enableDelete) {
            remove(address);
            vm.onDelete({
              address: address
            });
          }
        };

        vm.save = function(address) {
            
          if (vm.options.enableSave) {
            vm.onSave({
              address: address
            });
          }
        };

        vm.add = function(address) {
            
          if (vm.options.enableAdd) {
            vm.editInProgress = true;
            vm.addresses.push(address);
            vm.onAdd({
              address: address
            });
            vm.toggleNewAddressForm();
          }
        };

        vm.shipTo = function(address) {
            
          if (vm.options.enableSelect) {
            vm.onSelect({
              address: address
            });
          }
        };

      }
    };
  }
})();