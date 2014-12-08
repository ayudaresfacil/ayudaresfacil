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

    var that = this;

    $scope.error = '';
    $scope.publicationType = $state.current.data.publicationType;
    $scope.publicationId = $stateParams.publicationId;
    $scope.offer = {};

    /**
     * FLOWS
     */

    this.offerFlow = function(){  
        this.steps = 2;
        this.offerService = new Offers();
        
        $scope.flow.endStep = this.steps;

        this.getData = function(){
            this.promiseOffer = this.offerService.$get({
                publicationId: $scope.publicationId
            });

            this.promiseOffer.then(function(response) {
                $scope.offer = response.data[0];
            });
        };

        this.end = function(){            
            console.log($scope.comments);
        };

        this.getData();
    };

    this.moneyAction = function(){
        
    };

    this.requestAction = function(){
        
    };

    this.flowsByPublicationType = {
        'request': this.requestFlow,
        'offer': this.offerFlow,
        'money': this.moneyFlow
    };
    
    /* END OF FLOWS */

    /**
     * FLOW HANDLER
     */
    
    $scope.flow = {
        step: 0,
        goal: {},
        toNextStep: function(){
            this.step++;
            $scope.$emit('flow.nextStep');
        },
        toPrevStep: function(){
            this.step--;
        }
    };

    $scope.flow.goal = new this.flowsByPublicationType[$scope.publicationType]();
    
    /* END OF FLOW HANDLER */
    
    $scope.$on('flow.nextStep', function(){
        if($scope.flow.step === $scope.flow.endStep){
            $scope.flow.goal.end();
        }
    });
})
;
