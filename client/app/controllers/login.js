'use strict';

angular.module('tbApp.controllers')
  .controller('loginController', ['$rootScope', '$scope', '$timeout', '$location', '$http',
    function ($rootScope, $scope, $timeout, $location, $http) {
    	$scope.email = "";
    	$scope.password = "";

    	$scope.login = function() {

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
            
    		/*var dat = {
    			email: $scope.email,
    			password: $scope.password
    		}

    		$http.post("/v1/api/signup", dat).then(function (response){
                console.log("Response = ");
                console.log(response.data.message);
            }, function (response){

            });*/
    	}
    }
  ]);