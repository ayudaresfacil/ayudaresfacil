angular.module( 'AyudarEsFacilApp.request', [
  'ui.router'
  ])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'web.requestList', {        
    url: '/pedidos',
    controller: 'RequestCtrl',
    templateUrl: 'request/request-list.tpl.html',
    data:{ pageTitle: 'Pedidos' }
  });
  $stateProvider.state( 'panel.requestCreate', {        
    url: '/pedir-ayuda',
    controller: 'RequestCreateCtrl',
    templateUrl: 'request/request-create.tpl.html',
    data:{ pageTitle: 'Crear Pedido' }
  });
  $stateProvider.state( 'web.requestDetail', {     
    url: '/pedido-detalle/:id',
    controller: 'RequestCtrl',
    templateUrl: 'request/request-detail.tpl.html',
    data:{ pageTitle: 'Detalle del Pedido' }
  });
})

// Authentication service for user variables
.factory('Authentication', [

  function() {
    var _this = this;

    _this._data = {
      user: JSON.parse(localStorage.getItem("user"))
    };

    return _this._data;
  }
  ])

// Users service used for communicating with the users REST endpoint
.factory('Requests', ['$resource',
  function($resource) {
    return $resource('http://localhost/ayudaresfacil/api/request', {publicationId:'@id'}, {}, {
      update: {
        method: 'PUT'
      }
    });
  }
  ])

.controller( 'RequestCtrl', function RequestCtrl( $scope, $http, Requests, $stateParams, Authentication) {
  $scope.myInterval = 5000;
  $scope.user = Authentication.user;

  var requests = new Requests();
  
  if ($stateParams.id === undefined){
    if (Authentication.user === null){
      requests.$get(function(response){
        $scope.requests = requests.data;
      });
    }else{
      requests.$get({userLog:Authentication.user.id}, function(response){
        $scope.requests = requests.data;
      });
    }
  }else{
    if (Authentication.user === null){
      requests.$get({publicationId:$stateParams.id},function(response){
        $scope.requests = requests.data;
      });
    }else{
      requests.$get({userLog:Authentication.user.id, publicationId:$stateParams.id},function(response){
        $scope.requests = requests.data;
      });
    }    
  }

$scope.setFavorite = function(id) {
  var data = {
    publicationId: id, 
    userId: $scope.user.id
  };

  $http.post('/ayudaresfacil/api/request/favorite', data)
  .success(function(response) {
    $scope.error = false;
    requests.$get({userLog:Authentication.user.id, publicationId:$stateParams.id},function(response){
      $scope.requests = requests.data;
    });
  })
  .error(function(response) { 
    $scope.error = true;
    $scope.credentials = {};
  });
};

$scope.unsetFavorite = function(id) {
  var data = {
    publicationId: id, 
    userId: $scope.user.id,
    del:'true'
  };

  $http.post('/ayudaresfacil/api/request/favorite', data)
  .success(function(response) {
    $scope.error = false;
    requests.$get({userLog:Authentication.user.id, publicationId:$stateParams.id},function(response){
      $scope.requests = requests.data;
    });
  })
  .error(function(response) { 
    $scope.error = true;
    $scope.credentials = {};
  });
};

$scope.setVote = function(id) {
  var data = {
    publicationId: id, 
    userId: $scope.user.id
  };

  $http.post('/ayudaresfacil/api/request/vote', data)
  .success(function(response) {
    $scope.error = false;
    requests.$get({userLog:Authentication.user.id, publicationId:$stateParams.id},function(response){
      $scope.requests = requests.data;
    });
  })
  .error(function(response) { 
    $scope.error = true;
    $scope.credentials = {};
  });
};

$scope.unsetVote = function(id) {
  var data = {
    publicationId: id, 
    userId: $scope.user.id,
    del:'true'
  };

  $http.post('/ayudaresfacil/api/request/vote', data)
  .success(function(response) {
    $scope.error = false;
    requests.$get({userLog:Authentication.user.id, publicationId:$stateParams.id},function(response){
      $scope.requests = requests.data;
    });
  })
  .error(function(response) { 
    $scope.error = true;
    $scope.credentials = {};
  });
};
});