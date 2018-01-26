'use strict';

angular.module('myApp.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}])

.controller('DetailsCtrl', ['$window', '$http', '$scope', function($window, $http, $scope) {

  //call api to check if code for resume is correct
  var getFullResume = function (callback) {
    $http({
      url: 'http://localhost:3000/fullresume',
      method: "GET",
    }).success(function (data) {
      callback( data.results );
    }).error(function (data) {
      callback(-1);
    });
  };


  //each section that is summarized can be controlled individually
  var startSummarizerController = function(){
     var nJobs = $window.document.getElementsByClassName("listing").length;

     $scope.showDetails = Array.apply(null, Array(nJobs)).map(function() { return false });
  }

  //call api to check if code for resume is correct
  var isCorrectPassword = function (attempted_password, callback) {
    $http({
      url: 'http://0.0.0.0:3000/password',
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
  //and fire it after definition
  checkCode();

  //get the resume from the server as well
  getFullResume(function(resume){
    $scope.fullResume = resume;

    //TODO: make model for resume
    var lines = resume.split('\n');

    var summaries = [], stacks = [], titles = [], names = [], sections = [];

    for (var line in lines){
      //job summary
      if (lines[line].indexOf("*****") > -1){
        summaries.push(lines[line].replace("*****",""));
      }

      //program stack
      else if (lines[line].indexOf("****") > -1){
        stacks.push(lines[line].replace("****",""));
      }

      //job title
      else if (lines[line].indexOf("***") > -1){
        titles.push(lines[line].replace("***",""));
      }

      //company name
      else if (lines[line].indexOf("**") > -1){
        names.push(lines[line].replace("**",""));
      }

      //new section
      else if (lines[line].indexOf("*") > -1){
        sections.push(lines[line].replace("*",""));
      }
      else{
        console.log(lines[line]);
      }
    }

    //"show more/less" button controller
    startSummarizerController();
  });

}]);