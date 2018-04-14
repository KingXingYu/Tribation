'use strict';

angular.module('tbApp.controllers')
  .controller('loginController', ['$rootScope', '$scope', '$timeout', '$location', '$http',
    function ($rootScope, $scope, $timeout, $location, $http) {
    	
        $scope.user = {
            email: '',
            password: '',
        }

        $scope.alert = {
            type: '',
            content: '',
            class: ''
        }

        $scope.flResponse = false;
        $scope.passwordLen = 6;

    	$scope.init = function() {
            setTimeout(function() {
                $("input").each(function(e) {
                    $(this).removeClass('ng-invalid');
                })                
            }, 10);
        }
        $scope.init();

        $scope.login = function() {

            var canSubmit = true;
            var flVal = [];
            var flPassword = false;
            $("input.required").each(function(e) {
                if($(this).val() == "") {
                    $(this).addClass('ng-invalid');
                    flVal.push(false);
                } else {
                    flVal.push(true);
                }
            });            
            if($("#password").val().length < Number($scope.passwordLen - 1)) { flPassword = false;}
            else { flPassword = true; }

            for (var i = 0; i < flVal.length; i++) {
                if(flVal[i] == false) {
                    canSubmit = false;
                }
            }

            if(canSubmit == true && flPassword == true){
                $http.post("/v1/api/login", $scope.user).then(function (response){
                    if(response.data.success == 0) {
                        $scope.alert.type = "Error!"
                        $scope.alert.class = "alert-danger";
                    }
                    $scope.alert.content = response.data.message;
                    $scope.flResponse = true;
                    $("div.alert").fadeIn();
                    setTimeout(function() {
                        $("div.alert").fadeOut("slow");
                        $scope.flResponse = false;
                        if(response.data.success == 1) {
                            alert("OK");
                        }
                    }, 2500);
                }, function (response){

                });
            }            
        }
    }
  ]);