(function () {

    var app = angular.module("githubviewer", []);

    var MainController = function ($scope, github, $interval, $log, $anchorScroll, $location) {


        // Initialize the array
        $scope.message = "Github Viewer";

        $scope.repoSortOrder = "-stargazers_count";

        $scope.countdown = 5;


        $scope.repos = [];

        $scope.username = "angular";

        var countdownInterval = null;

        // Functions

        var startCountdown = function () {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1)
                $scope.search($scope.username);
        };

        $scope.search = function (username) {

            $log.info("Searching for " + username);

            github.getUser(username)
                 .then(onUserComplete, onError);

            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

        startCountdown();

        // Event Handlers
        var onUserComplete = function (data) {

            $scope.user = data;

            github.getRepos(username)
                 .then(onRepos, onError);

        };

        var onRepos = function (data) {
            $scope.repos = data;
            $location.hash("userDetails");
            $anchorScroll();
        };

        var onError = function (reason) {
            $scope.error = "Coult not fetch the data.";
        };

    };

    app.controller("MainController", ['$scope', 'github', '$interval', '$log', '$anchorScroll', '$location', MainController])
})();