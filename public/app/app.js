angular.module('app', []);

angular.module('app')
  .controller('testCtrl', function () {
    var vm = this;

    vm.test = 'working!';
  });
