/// <reference path="c:\users\alemor\documents\visual studio 2013\Projects\AngularApps\AngularWebApp1\Scripts/angular.js" />
(function () {


    // create service
    var github = function ($http) {

        var getUser = function (username) {
            $http.get("https://api.github.com/users/" + username)
                 .then(function (response) {
                     return response.data;
                 });
        };


        var getRepos = function (username) {
            $http.get($scope.user.repos_url)
                .then(function (response) {
                    return response.data;
                });
        };


        return {
            getUser:getUser,
            getRepos:getRepos
        };
    };

    // Get references to module
    var module = angular.module("githubviewer");

    // Add service to module
    module.factory("github", github);

})();