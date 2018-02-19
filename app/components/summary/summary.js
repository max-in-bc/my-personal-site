'use strict';

angular.module('myApp.summary', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/summary', {
    templateUrl: 'components/summary/summary.html',
    controller: 'SummaryCtrl'
  });
}])

.controller('SummaryCtrl', ['$scope','$window', function($scope, $window) {
    $scope.anonymized = location.host == 'torontoweb.ninja' ? true : false;
    $scope.details = false;
    $scope.largeScreen = $window.innerWidth > 666;

}]);