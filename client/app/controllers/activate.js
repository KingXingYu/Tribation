'use strict';

angular.module('tbApp.controllers')
  .controller('activateController', ['$rootScope', '$scope', '$timeout', '$location', '$http', '$routeParams',
    function ($rootScope, $scope, $timeout, $location, $http, $routeParams) {     

    	var tokenKey = $routeParams.activate_key;

    	$http.post("/v1/api/verify_email", {token: tokenKey}).then(function (response){
            setTimeout(function() { $("div.loader").remove(); $("div.alert").fadeIn("fast");}, 3500);
            setTimeout(function() { location.href = "/"; }, 6000);
        }, function (response){
        	
        });
    }
  ]);