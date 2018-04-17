'use strict';

angular.module('tbApp.controllers')
  .controller('mainController', ['$rootScope', '$scope', '$timeout', '$location', '$http',
    function ($rootScope, $scope, $timeout, $location, $http) {
    	
    	$http.post("/v1/api/isLogged", {msg: "IsLogged"}).then(function (response){
            if(response.data.success == 0) {
            	location.href = "/";
            }
        }, function (response){

        });
    	
    }
  ]);