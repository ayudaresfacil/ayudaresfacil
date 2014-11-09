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
  $stateProvider.state( 'web.favoriteCreate', {     
        //
      });
  $stateProvider.state( 'web.requestDetail', {     
    url: '/pedido-detalle/:id',
    controller: 'RequestCtrl',
    templateUrl: 'request/request-detail.tpl.html',
    data:{ pageTitle: 'Detalle del Pedido' }
  });
})

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

.factory('Sponsors', ['$resource',
  function($resource) {
    return $resource('http://localhost/ayudaresfacil/api/request/sponsor', {publicationId:'@id'}, {}, {
      update: {
        method: 'PUT'
      }
    });
  }
  ])

.factory('Images', ['$resource',
  function($resource) {
    return $resource('http://localhost/ayudaresfacil/api/request/image', {publicationId:'@id'}, {}, {
      update: {
        method: 'PUT'
      }
    });
  }
  ])

.factory('Votes', ['$resource',
  function($resource) {
    return $resource('http://localhost/ayudaresfacil/api/request/vote', {publicationId:'@id'}, {}, {
      update: {
        method: 'PUT'
      }
    });
  }
  ])

.controller( 'RequestCtrl', function RequestCtrl( $scope, Requests, Sponsors, Images, Votes, $stateParams ) {
  $scope.myInterval = 5000;

  var requests = new Requests();
  var sponsors = new Sponsors();
  var slides = new Images();
  var votes = new Votes();
  
  if ($stateParams.id === undefined){
    requests.$get(function(response){
      $scope.requests = requests.data;
    });
  }else{
    requests.$get({publicationId:$stateParams.id},function(response){
      $scope.requests = requests.data;
    });
    sponsors.$get({publicationId:$stateParams.id},function(response){
      $scope.sponsors = sponsors.data;
    });
    slides.$get({publicationId:$stateParams.id},function(response){
      $scope.slides = slides.data;
    });
    votes.$get({publicationId:$stateParams.id},function(response){
      $scope.votes = votes.data;
    });
  }

});