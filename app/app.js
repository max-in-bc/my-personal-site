'use strict';

//app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.summary',
    'myApp.details',
    'myApp.version'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/summary'});
}]);
