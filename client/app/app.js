'user strict';

// Define Controller
angular.module('tbApp.controllers', []);
// Define Directive
angular.module('tbApp.directives', []);
// Define Services
angular.module('tbApp.services', []);

angular.module('tbApp.filters', []);

angular.module('tbApp.elements', []);
//models


var dependencies = [
	'btford.socket-io',	
	'angularMoment',
	'ngTable',
	'ngRoute',
	'ngAnimate',
  'ngCookies',
  'treeControl',
	'tbApp.controllers',
	'tbApp.directives',
	'tbApp.services',
	'tbApp.filters',
  'tbApp.elements',
  '720kb.datepicker',
  'countrySelect',
  'BotDetectCaptcha'
];

angular.module('tbApp', dependencies)

.constant('wsEntryPoint', window.location.host)
.constant('wsConfig', {
  'reconnection delay': 1000,
  'reconnection limit': 1000,
  'max reconnection attempts': 'Infinity'
})

.constant('firstLoadEventList', ['connected'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider
    .html5Mode(false)
    .hashPrefix('!');
  $routeProvider.
    when('/', {
      templateUrl: 'app/views/login.html',
      controller: 'loginController'
    }).    
    when('/signup',{
      templateUrl:'app/views/signup.html',
      controller:'signupController'
    }).
    when('/user/:activate?', {
      templateUrl: 'app/views/activate.html',
      controller: 'activateController'
    }).
    when('/main',{
      templateUrl:'app/views/main.html',
      controller: 'mainController'
    })
}])

.run(function ($rootScope) {
	
});