'use strict';

angular.module('tbApp.controllers')
  .controller('signupController', ['$rootScope', '$scope', '$timeout', '$location', '$http',
    function ($rootScope, $scope, $timeout, $location, $http) {    

    	$scope.first_name = "";
        $scope.last_name = "";
        $scope.email = "";
        $scope.password = "";
        $scope.birthday = "";
        $scope.telephone = "";
    	$scope.signup = function() {

            var validationError = false;

            var forms = document.getElementsByClassName('needs-validation');

            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                        form.classList.add('was-validated');
                        validationError = true;
                    }
                }, true);
            });

            setTimeout(function() {
                if(validationError == false) {
                    var dat = {
                        first_name: $scope.first_name,
                        last_name: $scope.last_name,
                        email: $scope.email,
                        password: $scope.password,
                        birthday: $scope.birthday,
                        telephone: $scope.telephone
                    }
                    $http.post("/v1/api/signup", dat).then(function (response){
                        console.log("Response = ");
                        console.log(response);
                    }, function (response){

                    });
                }
            }, 100);
    	}
    }
  ]);