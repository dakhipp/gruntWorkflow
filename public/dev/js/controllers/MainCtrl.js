(function() {
  angular.module('MainCtrl', []).controller('mainController', [
    '$scope', function($scope) {
      return $scope.message = 'Look at me go!';
    }
  ]);

}).call(this);
