'use strict';

angular.module('tbApp.controllers')
  .controller('messengerController', ['$rootScope', '$scope', '$timeout', '$location', '$http', '$cookies',
    function ($rootScope, $scope, $timeout, $location, $http, $cookies) {

        $scope.loginUser = {};
        $scope.registerUsers = [];

        $scope.init = function() {
            setTimeout(function(){$(".scroller").slimScroll({allowPageScroll: true, size: '7px', color: '#2bb9dd', wrapperClass: 'slimScrollDiv', railColor:  '#eaeaea', position: 'right', opacity : 1, borderRadius: '0px', railBorderRadius : '0px'});},100);

            setTimeout(function() {getRegisterUsers();}, 100);
        }
        $scope.init();

        function getRegisterUsers() {
            $scope.loginUser = JSON.parse($cookies.get('userInfo'));            
            $http.post("/v1/api/getAllUser", {loginUser: $scope.loginUser}).then(function (response){
                $scope.registerUsers = response.data.message;
            }, function (response){

            });
        }

        $scope.sendmessage = function(){
            sendNewMessage();
            
        };

        $scope.keypress = function(e){
            if(!e.shiftKey && !e.ctrlKey && !e.altKey && e.keyCode == 13){
                sendNewMessage();
            }
        }

        function sendNewMessage(){
            var textArea = document.getElementById('messege-input-box');
            var content = textArea.value.trim();
            textArea.value = content;
            content = encodeHTML(content);
            content = content.replace(/\r?\n/g, '<br/>');

            if(content == "") {
                return;
            }

            var msgObj =  {
                userinfo:{
                    name:"Eliza",
                    imgurl  :"https://bootdey.com/img/Content/avatar/avatar1.png",
                },
                content:content,
                date:"21:30",
                type:'out'
            };

            $scope.messageBox.push(msgObj);

            $timeout(function() {
                var scroller = $("#chat-history-scroller");
                var h = 10000000000000;
                scroller.slimScroll({scrollTo:h});
                textArea.value = "";
                textArea.scrollTop = 0;

            }, 0, false);

        }

        function encodeHTML(s) {
            if(s == ""){
                return "";
            }
            return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&rt;').replace(/"/g, '&quot;');
        }

    	$scope.$on('$viewContentLoaded', function() {

    	});
    }
  ])
  .filter('unsafe', function($sce) {
    return $sce.trustAsHtml; 
});