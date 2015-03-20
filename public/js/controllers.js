var app = angular.module('app', ['ui.router', 'ngStorage']);

app.controller('ViewController', function ($scope, $http, $localStorage) {
  $http.defaults.headers.common.Token = 'Basic YmVlcDpib29w'
  console.log($localStorage.token)
  $scope.investments = {}

  $http.get('/investments').
    success(function(data, status, headers, config) {
      $scope.investments = data
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
});

app.controller('AdminController', function ($scope, $http, $localStorage) {
  $scope.newInvestment = {
    name: "",
    description: "",
    baseprice: undefined,
    spbonus: undefined,
    level: undefined
  }
  $http.defaults.headers.common.Token = 'Basic YmVlcDpib29w'
  // $http.defaults.headers.common['Content-Type'] = 'application/json'
  $scope.investments = []

  $http.get('/investments').
    success(function(data, status, headers, config) {
      $scope.investments = data
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  $scope.createInvestment = function(investment){
    $http.post('/investments', investment).
    success(function(data, status, headers, config) {
      console.log('created.')
      $scope.investments.push(data)
    }).
    error(function(data, status, headers, config) {
      console.log('invalid data.')
    });
  }

  $scope.deleteInvestment = function(investment){
    console.log(investment)
    $http.delete('/investments/'+investment._id).
      success(function(data, status, headers, config) {
        console.log('deleted.')
        for (var i=0;i<$scope.investments.length;i++){
          if ($scope.investments[i]._id == investment._id)
            $scope.investments.splice(i, i+1);
        }

      }).
      error(function(data, status, headers, config) {
        console.log('invalid data.')
      });
  }
});



app.service('NavService', function ($location) {
  var items = [];

  this.getState = function(path) {
    if ($location.path().substr(0, path.length) == path) {
      return "selected"
    } else {
      return ""
    }
  }
});

app.controller('MainController', function ($scope, NavService) {
  $scope.getState = function(path){
    return NavService.getState(path)
  }

});

app.controller('AccountController', function ($scope) {

});

app.controller('UpgradeController', function ($scope) {

});

app.controller('WorldController', function ($scope) {

});


app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('home', {
      url: "/home",
      controller: 'ViewController',
      templateUrl: "p-home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "p-login.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('account', {
      url: "/account",
      templateUrl: "p-account.html",
      controller: 'AccountController'
    })
    .state('world', {
      url: "/world",
      templateUrl: "p-world.html",
      controller: 'WorldController'
    })
    .state('upgrade', {
      url: "/upgrade",
      templateUrl: "p-upgrade.html",
      controller: 'UpgradeController'
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "p-admin.html",
      controller: 'AdminController'
    })
});