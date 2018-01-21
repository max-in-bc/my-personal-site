'use strict';

angular.module('myApp.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}])

.controller('DetailsCtrl', ['$window', '$http', '$scope', function($window, $http, $scope) {
  $scope.textLimit = 50;
  function unhideText (html_this) {
    console.log(html_this);

    return 5;
  };

  var isCorrectPassword = function (attempted_password, callback) {
    $http({
      url: 'http://localhost:3000/password',
      method: "GET",
      params: {attempted_password: attempted_password}
    }).success(function (data) {
      callback( data.results === 1 );
    }).error(function (data) {
      callback(-1);
    });
  };

// at the bottom of your controller
  var checkCode = function () {
    var passcode = prompt("Please enter a passcode to view", "ie. abc123");
    if (passcode == null || passcode == '') {
      $window.location.href = '/#/summary';
    }
    isCorrectPassword(passcode.trim(), function(results){
      if (results === true){
        $window.location.href = '/#/details';
      }else{
        $window.location.href = '/#/summary';
      }
    });

  };
// and fire it after definition
  checkCode();
}]);