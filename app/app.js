'use strict';

//app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.summary',
    'myApp.details'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/summary'});
}]);

app.constant('WorkingURL', 'http://0.0.0.0');
// app.constant('WorkingURL', 'http://' + location.host.indexOf(":") > -1 ? location.host.slice(0, location.host.indexOf(":")) : location.host);

app.service('ResumeService', function(){
    /**
     * Constructor, with class name
     */
    this.markup = function(resumeText, anonymized) {

        var resumeSplit = resumeText.split('\n');

        var resume = {};

        resume['full_name'] = {};
        resume['contact'] = {};
        if (anonymized){
            resume['full_name']['first_name'] = "Maxwell";
            resume['full_name']['middle_name'] = "TO Web";
            resume['full_name']['last_name'] = "Ninja";
            resume['contact']['email'] = 'max@torontoweb.ninja';
        }
        else{

            resume['full_name']['first_name'] = resumeSplit[0];

            if (resumeSplit[2].length == 0){
                //no middle name
                resume['full_name']['middle_name'] = "";
                resume['full_name']['last_name'] = resumeSplit[1];

                resume['contact']['email'] = resumeSplit[2];
                resume['contact']['phone'] = resumeSplit[3];
            }
            else{
                resume['full_name']['middle_name'] = resumeSplit[1];
                resume['full_name']['last_name'] = resumeSplit[2];
                resume['contact']['email'] = resumeSplit[3];
                resume['contact']['phone'] = resumeSplit[4];

                resumeSplit[4] = "";
            }

            resumeSplit[0] = "";
            resumeSplit[1] = "";
            resumeSplit[2] = "";
            resumeSplit[3] = "";


        }

        var curSection = "";

        var lastStar = 0, counter = 0;
        for (var i = 0; i < resumeSplit.length; i++){
            var curLine = resumeSplit[i];

            if (curLine.length == 0){
                continue;
            }

            else if (curLine.substring(0, 5) == "*".repeat(5)){
                resume[curSection][counter++]["description"] = curLine.substring(5);
                resume[curSection][counter] = {};
                lastStar = 5;
            }
            else if  (curLine.substring(0, 4) == "*".repeat(4)){
                resume[curSection][counter]["stack"] = curLine.substring(4);
                lastStar = 4;

            }
            else if  (curLine.substring(0, 3) == "*".repeat(3)){
                if (lastStar == 2){
                    resume[curSection][counter]["title"] = curLine.substring(3);
                }
                else if (lastStar == 3){
                    resume[curSection][counter]["dates"] = curLine.substring(3);
                }

                lastStar = 3;
            }
            else if  (curLine.substring(0, 2) == "*".repeat(2)){
                if (lastStar == 1 || lastStar == 5){
                    resume[curSection][counter]["place"] = curLine.substring(2);
                }
                else if (lastStar == 2){
                    resume[curSection][counter]["location"] = curLine.substring(2);
                }

                lastStar = 2;
            }
            else if  (curLine[0] == "*"){
                if (lastStar == 5 && Object.keys(resume[curSection][counter]).length === 0 && resume[curSection][counter].constructor === Object){
                    delete resume[curSection][counter];
                }

                lastStar = 1;

                if (curLine.indexOf("Work Experience") !== -1){
                    curSection = "work_experience";
                }
                else if  (curLine.indexOf("Volunteer Projects") !== -1){
                    curSection = "volunteer_experience";
                }
                else if  (curLine.indexOf("Education") !== -1){
                    curSection = "education_experience";
                }

                counter = 0;
                resume[curSection] = {};
                resume[curSection][counter] = {};

            }
        }

        //Check the last line of the unedited resume for blank
        if (Object.keys(resume[curSection][counter]).length === 0 && resume[curSection][counter].constructor === Object){
            delete resume[curSection][counter];
        }


        return resume;
    }
});