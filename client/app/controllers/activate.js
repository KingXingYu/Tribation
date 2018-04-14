'use strict';

angular.module('tbApp.controllers')
  .controller('activateController', ['$rootScope', '$scope', '$timeout', '$location', '$http', '$routeParams',
    function ($rootScope, $scope, $timeout, $location, $http, $routeParams) {     

    	var tokenKey = $routeParams.activate_key;

    	$http.post("/v1/api/verify_email", {token: tokenKey}).then(function (response){

            setTimeout(function() {
                location.href = "/";    
            }, 5000);
                        
        }, function (response){
        	
        });
    }
  ]);