(function() {
    
  'use strict';
  
  angular
    .module('ctRolodex')
    .directive('ctAddressTile', directive);

  function directive() {
    return {
      templateUrl: 'address-tile.tmpl.html',
      scope: {
        address: '=',
        options: '=?',
        onDelete: '&',
        onSave: '&',
        onSelect: '&',
        editInProgress: '=?',
        onCancel: '&'
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function() {
        var vm = this;
        vm.editMode = false;
        vm.confirmRequired = false;
        vm.editInProgress = angular.isDefined(vm.editInProgress) ? vm.editInProgress : false;

        if (!vm.options) {
          vm.options = {};
        }

        vm.options.enableSave = angular.isDefined(vm.options.enableSave) ? vm.options.enableSave : false;
        vm.options.enableDelete = angular.isDefined(vm.options.enableDelete) ? vm.options.enableDelete : false;
        vm.options.enableSelect = angular.isDefined(vm.options.enableSelect) ? vm.options.enableSelect : false;

        function toggleActive(isActive) {
          vm.editMode = isActive;
          vm.editInProgress = isActive;
        }

        vm.toggleEditMode = function() {
          toggleActive(true);
        };

        vm.save = function() {
          if (vm.options.enableSave) {
            toggleActive(false);
            vm.onSave({
              address: vm.address
            });
          }
        };

        vm.cancel = function() {
          toggleActive(false);
          vm.onCancel();
        };

        vm.delete = function(address) {
          if (vm.options.enableDelete) {
            vm.confirmRequired = true;
          }
        };

        vm.deleteProceed = function() {
          toggleActive(false);
          vm.onDelete({
            address: vm.address
          });
        };

        vm.deleteAbort = function() {
          vm.confirmRequired = false;
        };

        vm.shipTo = function() {
          if (vm.options.enableSelect) {
            toggleActive(false);
            vm.onSelect({
              address: vm.address
            });
          }
        };
      }
    };
  }
})();