'use strict';

angular.module('myApp.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}])

.controller('DetailsCtrl', [function() {

}]);