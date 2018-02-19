'use strict';

angular.module('myApp.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details', {
    templateUrl: 'components/details/details.html',
    controller: 'DetailsCtrl'
  });
}])

.controller('DetailsCtrl', ['$window', '$http', '$scope', 'ResumeService', 'WorkingURL', function($window, $http, $scope, ResumeService, WorkingURL) {

    $scope.anonymized = location.host == 'torontoweb.ninja' ? true : false;

  //call api to check if code for resume is correct
  var getFullResume = function (callback) {
    $http({
      url: WorkingURL + ':3000/fullresume',
      params: {anon: $scope.anonymized},
      method: "GET",
    }).success(function (data) {
      callback( data.results );
    }).error(function (data) {
      callback(-1);
    });
  };


  //each section that is summarized can be controlled individually
  var startSummarizerController = function(){
     var nJobs = {
         'work_experience': 0,
         'volunteer_experience': 0,
         'education_experience': 0
     };

      nJobs['work_experience'] = Object.keys($scope.resume['work_experience']).length;
      nJobs['volunteer_experience'] = Object.keys($scope.resume['volunteer_experience']).length;
      nJobs['education_experience'] = Object.keys($scope.resume['education_experience']).length;


      $scope.showDetails = {
          'work_experience': Array.apply(null, Array(nJobs['work_experience'])).map(function() { return false }),
          'volunteer_experience': Array.apply(null, Array(nJobs['volunteer_experience'])).map(function() { return false }),
          'education_experience': Array.apply(null, Array(nJobs['education_experience'])).map(function() { return false })
      }

  }

  //call api to check if code for resume is correct
  var isCorrectPassword = function (attempted_password, callback) {
    $http({
      url: WorkingURL + ':3000/fullresume',
      method: "GET",
      params: {attempted_password: attempted_password,
               anon: $scope.anonymized}
    }).success(function (resumeRequest) {
      if( resumeRequest.results === 1 ){
          callback({result: true, data: resumeRequest.data});
      }
      else{
          callback({result: false, data: null});
      }
    }).error(function (data) {
      callback({result: false, data: null});
    });
  };

// at the bottom of your controller
  var checkCodeAndGetResume = function (callback) {
      if ($scope.anonymized){
            var passcode = prompt("Please enter a passcode to view", "ie. abc123");
            if (passcode == null || passcode == '') {
              $window.location.href = '/#/summary';
              return;
            }
      }
    isCorrectPassword($scope.anonymized ? passcode.trim() : null, function(checkCode){
      if (checkCode.result === true){
        $window.location.href = '/#/details';
        callback(checkCode.result, checkCode.data);
      }else{
        $window.location.href = '/#/summary';
        callback(checkCode.result, null);
      }
    });

  };


  //and fire it after definition
  checkCodeAndGetResume(function(correctPassword, fullResume){
    if (correctPassword){
        $scope.resume  = ResumeService.markup(fullResume, $scope.anonymized);

        //"show more/less" button controller
        startSummarizerController();
    }
  });



}]);