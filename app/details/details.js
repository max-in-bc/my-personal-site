'use strict';

angular.module('myApp.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}])

.controller('DetailsCtrl', ['$window', '$http', function($window, $http) {
  var isIncorrectPassword = function (attempted_password) {
    $http({
      url: 'localhost:3000/checkPassword',
      method: "GET",
      params: {attempted_password: attempted_password}
    }).success(function (data) {
      return data.results === 1;
    }).error(function (data) {
      return -1;
    });
  }

// at the bottom of your controller
  var checkCode = function () {
    var passcode = prompt("Please enter a passcode to view", "ie. js7_93Na");
    if (passcode == null || isIncorrectPassword(passcode.trim())) {
      $window.location.href = '/#/summary';
    }
  };
// and fire it after definition
  checkCode();
}]);