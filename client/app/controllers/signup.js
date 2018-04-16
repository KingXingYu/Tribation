'use strict';

angular.module('tbApp.controllers')
  .controller('signupController', ['$rootScope', '$scope', '$timeout', '$location', '$http',
    function ($rootScope, $scope, $timeout, $location, $http) {

        $scope.user = {
            firstname: '',
            lastname: '',
            gender: 'male',
            email: '',
            password: '',
            birthday: '',
            city: '',
            country: '',
            telephone: ''
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
                $("#telephone").intlTelInput();
                $("input, select").each(function(e) {
                    $(this).removeClass('ng-invalid');
                })                
            }, 10);
            /*$(".g-recaptcha").hide();
            setTimeout(function() {
                $(".g-recaptcha>div>div").css({'margin' : '0 auto'});
                $(".g-recaptcha").show();
            }, 1000);*/
        }
        $scope.init();

        $scope.matchPassFlag = true;
        $scope.matchPassword = function(e) {
            if($("#password").val() == $("#confirm_password").val()) {
                $scope.matchPassFlag = true;
            } else {
                $scope.matchPassFlag = false;
            }
        }

    	$scope.signup = function() {

            var flCaptcha = true;
            var responseCaptcha = grecaptcha.getResponse();
            if(responseCaptcha.length == 0) {  //reCaptcha not verified
                $("p#captcha").show();
                flCaptcha = false;
            } else { // reCaptcah verified
                $("p#captcha").hide();
                flCaptcha = true;
            }
    
            var canSubmit = true;
            var flVal = [];
            var flPassword = false;

            $("input.required, select").each(function(e) {
                if($(this).val() == "" || $(this).val() == null) {
                    $(this).addClass('ng-invalid');
                    flVal.push(false);
                } else {
                    flVal.push(true);
                }
            });

            if($("#password").val().length < Number($scope.passwordLen - 1)) { flPassword = false;}
            else { 
                if($scope.matchPassFlag == true) {
                    flPassword = true;
                } else {
                    flPassword = false;
                }
            }

            for (var i = 0; i < flVal.length; i++) {
                if(flVal[i] == false) {
                    canSubmit = false;
                }
            }

            if(canSubmit == true && flPassword == true && flCaptcha == true) {
                $http.post("/v1/api/signup", $scope.user).then(function (response){
                    if(response.data.success == 0) {
                        $scope.alert.type = "Error!"
                        $scope.alert.class = "alert-danger";
                    } else {
                        $scope.alert.type = "Success!"
                        $scope.alert.class = "alert-success";
                    }
                    $scope.alert.content = response.data.message;
                    $scope.flResponse = true;
                    $("div.alert").fadeIn();
                    setTimeout(function() {
                        $("div.alert").fadeOut("slow");
                        $scope.flResponse = false;
                        if(response.data.success == 1) {
                            location.href = "/";
                        }
                    }, 3500);
                }, function (response){

                });
            }            
    	}
    }
  ]);