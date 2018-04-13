'use strict';

angular.module('tbApp.controllers')
  .controller('signupController', ['$rootScope', '$scope', '$timeout', '$location', '$http',
    function ($rootScope, $scope, $timeout, $location, $http) {
    	$scope.email = "";
    	$scope.password = "";

    	$scope.signup = function() {
    		var dat = {
    			email: $scope.email,
    			password: $scope.password
    		}

    		$http.post("/v1/api/signup", dat).then(function (response){
                console.log("Response = ");
                console.log(response);
            }, function (response){

            });
    	}
    }
  ]);