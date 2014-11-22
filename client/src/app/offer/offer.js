angular.module( 'AyudarEsFacilApp.offer', [
  'ui.router','ui.bootstrap'
  ])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'web.offerList', {        
    url: '/ofrecimientos',
    controller: 'OfferCtrl',
    templateUrl: 'offer/offer-list.tpl.html',
    data:{ pageTitle: 'Ofrecimientos' }
  });
  $stateProvider.state( 'panel.offerCreate', {        
    url: '/ofrecer-ayuda',
    controller: 'OfferCreateCtrl',
    templateUrl: 'offer/offer-create.tpl.html',
    data:{ pageTitle: 'Crear Ofrecimiento' }
  });
  $stateProvider.state( 'web.offerDetail', {     
    url: '/ofrecimiento-detalle/:id',
    controller: 'OfferCtrl',
    templateUrl: 'offer/offer-detail.tpl.html',
    data:{ pageTitle: 'Detalle del Ofrecimiento' }
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
.factory('Offers', ['$resource',
  function($resource) {
    return $resource('http://localhost/ayudaresfacil/api/offer', {publicationId:'@id'}, {}, {
      update: {
        method: 'PUT'
      }
    });
  }
  ])

.factory('Favorites', ['$resource',
  function($resource) {
    return $resource('http://localhost/ayudaresfacil/api/offer/favorite', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
  ])

.controller( 'OfferCtrl', function OfferCtrl( $scope, $http, Offers, $stateParams, Favorites, Authentication){
  $scope.myInterval = 5000;
  $scope.user = Authentication.user;

  var offers = new Offers();
  var favorites = new Favorites();
  
  if ($stateParams.id === undefined){
    if (Authentication.user === null){
      offers.$get(function(response){
        $scope.offers = offers.data;
      });
    }else{
      offers.$get({userLog:Authentication.user.id}, function(response){
        $scope.offers = offers.data;
      });
    }
  }else{
    if (Authentication.user === null){
      offers.$get({publicationId:$stateParams.id},function(response){
        $scope.offers = offers.data;
      });
    }else{
      offers.$get({userLog:Authentication.user.id, publicationId:$stateParams.id},function(response){
        $scope.offers = offers.data;
      });
    }
  }

  $scope.setFavorite = function(id) {
    var data = {
      publicationId: id, 
      userId: $scope.user.id
    };

    $http.post('/ayudaresfacil/api/offer/favorite', data)
    .success(function(response) {
      $scope.error = false;
      offers.$get({userLog:Authentication.user.id, publicationId:$stateParams.id},function(response){
        $scope.offers = offers.data;
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

    $http.post('/ayudaresfacil/api/offer/favorite', data)
    .success(function(response) {
      $scope.error = false;
      offers.$get({userLog:Authentication.user.id, publicationId:$stateParams.id},function(response){
        $scope.offers = offers.data;
      });
    })
    .error(function(response) { 
      $scope.error = true;
      $scope.credentials = {};
    });
  };

});
