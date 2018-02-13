'use strict';

angular.module('myApp.summary', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/summary', {
    templateUrl: 'components/summary/summary.html',
    controller: 'SummaryCtrl'
  });
}])

.controller('SummaryCtrl', [function() {

}]);