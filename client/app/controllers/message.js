'use strict';

angular.module('tbApp.controllers')
  .controller('messageController', ['$rootScope', '$scope', '$timeout', '$location', '$http',
    function ($rootScope, $scope, $timeout, $location, $http) {
         $(".chat-list-wrapper, .message-list-wrapper").niceScroll();    	
    }
  ]);