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
	'ui.bootstrap',
	'angularMoment',
	'ngTable',
	'ngRoute',
	'ngAnimate',
  'treeControl',
	'tbApp.controllers',
	'tbApp.directives',
	'tbApp.services',
	'tbApp.filters',
  'tbApp.elements'
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
      templateUrl: 'app/views/main-feed.html',
      controller: 'mainFeedController'
    }).    
    when('/lectures',{
      templateUrl:'app/views/lectures.html',
      controller:'lecturesController'
    }).
    when('/products/:type_id?', {
      templateUrl: 'app/views/products.html'
    }).
    when('/advertise/:id', {
      templateUrl: 'app/views/advertise-products.html'
    }).
    when('/products/detail/:id', {
      templateUrl: 'app/views/productdetail.html',
      controller: 'productDetailController'
    }).    
    when('/offices/:id', {
      templateUrl: 'app/views/officedetail.html',
      controller: 'officeController'
    }).
    when('/mypage', {
      templateUrl : 'app/views/mypage.html',
      controller : 'mypageController'
    }).
    otherwise({
        redirectTo: '/'
    });
}])

.run(function ($rootScope) {
	
});

/* */
jQuery(document).ready(function(){
  var myVar = setInterval(myTimer, 1000);

  function myTimer() {
    $('span, h4, h6, p').each(function(){
      var html = $(this).html();
      if(html.search(/김일성/i) > -1) {
        if(html.search(/<strong>김일성<\/strong>/i) == -1) {
          html = html.replace(/김일성/i, "<strong>김일성</strong>");
          $(this).html(html);
        }
      }
    });
  }
});
