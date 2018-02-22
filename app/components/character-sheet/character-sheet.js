'use strict';

angular.module('myApp.characterSheet', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/characterSheet', {
    templateUrl: 'components/character-sheet/character-sheet.html',
    controller: 'CharacterSheetCtrl'
  });
}])

.controller('CharacterSheetCtrl', ['$scope','$window', function($scope, $window) {
    $scope.anonymized = location.host == 'torontoweb.ninja' ? true : false;
    $scope.details = false;
    $scope.largeScreen = $window.innerWidth > 666;

}]);