angular.module('app', []);

angular.module('app')
  .controller('testCtrl', function () {
    var vm = this;

    vm.jobs = [
      {
        title: 'Sales Person',
        description: 'you will fight dragons'
      },
      {
        title: 'Accoutant',
        description: 'you will use the keyboard'
      }
    ];
  });
