var app = angular.module('kappa', ['ui.router']);

app.service('authService', ['$state', '$window', '$http', function($state, $window, $http) {

  this.logout = function() {
    console.log("Logging out");
    $window.localStorage.setItem('uuid', 'null'); 
    $state.go('home');
  }

  this.isLoggedIn = function(appId) { 
    return this.getCurrentUser();
  }

  this.authenticate = function(_appId, uuid, callback) {
    
  }
}]);

app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
      url : '/home',
      templateUrl : '/views/index.html',
      controller : 'MainCtrl',
  }).state('dashboard', {
      url : '/dashboard',
      templateUrl : '/views/dashboard.html',
      controller : 'DashboardCtrl',
      requireLogin: true,
  });

  $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', ['$scope', '$window', '$state', 'kappaApi',
function($scope, $window, $state, kappaApi) {


  $scope.authenticate = function() {
     
    if ($window.localStorage) {
      $window.localStorage.setItem('uuid', '');
    } 
  }

}]); 

app.controller('DashboardCtrl', ['$scope', '$window', 'kappaApi',
function($scope, $window, kappaApi) {



  $scope.logout = function() {

  } 
}]);  