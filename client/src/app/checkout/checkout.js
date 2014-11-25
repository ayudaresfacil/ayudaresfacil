angular.module( 'AyudarEsFacilApp.checkout', [
])

.config(function config($stateProvider) {
    $stateProvider.state('web.offerFlow', {
        url: '/checkout/offer/:publicationId',
        controller: 'CheckoutCtrl',
        templateUrl: 'checkout/offer-flow.tpl.html',
        data: {
            pageTitle: 'Lo necesito',
            publicationType: 'offer'
        }
    })
    .state('web.requestFlow', {
        url: '/checkout/request/:publicationId',
        controller: 'CheckoutCtrl',
        templateUrl: 'checkout/request-flow.tpl.html',
        data: {
            pageTitle: 'Quiero ayudar',
            publicationType: 'request'
        }
    })
    .state('web.moneyFlow', {
        url: '/checkout/money/:publicationId',
        controller: 'CheckoutCtrl',
        templateUrl: 'checkout/money-flow.tpl.html',
        data: {
            pageTitle: 'Quiero ayudar',
            publicationType: 'money'
        }
    });
})

.controller('CheckoutCtrl', function CheckoutCtrl($scope, $http, $location, $state, $stateParams, Authentication, Offers) {

    $scope.user = Authentication.user;
    if (!$scope.user) {
        $location.path('/');
        return;
    }

    $scope.error = '';
    $scope.publicationType = $state.current.data.publicationType;
    $scope.publicationId = $stateParams.publicationId;
    $scope.offer = {};

    $scope.flow = {
        step: 0,
        toNextStep: function(){
            this.step++;
        },
        toPrevStep: function(){
            this.step--;
        }
    };

    var offers = new Offers();

    this.requestAction = function(){
        console.log('requestAction');
    };

    this.offerAction = function(){  
        var pOffers = offers.$get({
            publicationId: $scope.publicationId
        });

        pOffers.then(function(response) {
            $scope.offer = response.data[0];
            console.log($scope.offer);
        });
    };

    this.moneyAction = function(){
        console.log('moneyAction');
    };

    var actionsByPublicationType = {
        'request': this.requestAction,
        'offer': this.offerAction,
        'money': this.moneyAction
    };

    actionsByPublicationType[$scope.publicationType]();
})
;
