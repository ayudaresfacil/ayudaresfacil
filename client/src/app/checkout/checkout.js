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

.controller('CheckoutCtrl', function CheckoutCtrl($scope, $http, $location, $state, $stateParams, Authentication, Offers, Request, Users) {  
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
        $scope.comments = '';

        this.getData = function(){
            this.promiseOffer = this.offerService.$get({
                publicationId: $scope.publicationId
            });

            this.promiseOffer.then(function(response) {
                $scope.offer = response.data[0];
            });
        };

        this.end = function(){   
            $scope.status = 'loading';
            
            var message = $scope.user.name + ' ha dicho que necesita lo que ofreces. Contacta con el para finalizar el proceso';

            if($scope.comments.length > 0){
                message += '. Comentarios: ' + $scope.comments;
            }

            $http.post('/ayudaresfacil/api/checkout/end',{
                userFromId: $scope.user.id,
                userToId: $scope.offer.userId, 
                publicationId: $scope.offer.id, 
                publicationType: $scope.publicationType,
                comments: message, 
                objectId: $scope.offer.object.id,
                quantity: 1,
                token: $scope.user.token

            })
            .success(function(response) {
                $scope.status = 'congrats';
            }).error(function(response) {
                $scope.status = 'fail';
            });
        };

        this.getData();
    };

    this.requestFlow = function(){
        this.steps = 2;
        this.requestService = new Request();
        
        $scope.flow.endStep = this.steps;
        $scope.comments = '';

        this.getData = function(){
            this.promiseRequest = this.requestService.$get({
                publicationId: $scope.publicationId
            });

            this.promiseRequest.then(function(response) {
                $scope.request = response.data[0];
            });
        };

        this.end = function(){   
            $scope.status = 'loading';
            var message = $scope.user.name + ' ha dicho que tiene lo que necesitas. Contacta con el para finalizar el proceso';

            if($scope.comments.length > 0){
                message += '. Comentarios: ' + $scope.comments;
            }

            $http.post('/ayudaresfacil/api/checkout/end',{
                userFromId: $scope.user.id,
                userToId: $scope.request.userId, 
                publicationId: $scope.request.id, 
                publicationType: $scope.publicationType,
                comments: message,
                objectId: $scope.request.object.id,
                quantity: 1,
                token: $scope.user.token
            })
            .success(function(response) {
                $scope.status = 'congrats';
            }).error(function(response) {
                $scope.status = 'fail';
            });
        };

        this.getData();
    };

    this.moneyFlow = function(){
        this.steps = 2;
        this.requestService = new Request();
        
        $scope.flow.endStep = this.steps;
        $scope.comments = '';

        this.getData = function(){
            this.promiseRequest = this.requestService.$get({
                publicationId: $scope.publicationId
            });

            this.promiseRequest.then(function(response) {
                $scope.request = response.data[0];
            });
        };

        this.pay = function(){
            (function() {
                function $MPBR_load() {
                    window.$MPBR_loaded !== true && (function() {
                        var s = document.createElement("script");
                        s.type = "text/javascript";
                        s.async = true;
                        s.src = ("https:" == document.location.protocol ? "https://www.mercadopago.com/org-img/jsapi/mptools/buttons/" : "http://mp-tools.mlstatic.com/buttons/") + "render.js";
                        var x = document.getElementsByTagName('script')[0];
                        x.parentNode.insertBefore(s, x);
                        window.$MPBR_loaded = true;
                    })();
                }
                window.$MPBR_loaded !== true ? (window.attachEvent ? window.attachEvent('onload', $MPBR_load) : window.addEventListener('load', $MPBR_load, false)) : null;
            })();

            function callbackMPModal(json) {
                alert("LLAMANDO CALLCBACK");
                if (json.collection_status == 'approved') {
                    alert('Pago acreditado');
                } else if (json.collection_status == 'pending') {
                    alert('El usuario no completó el pago');
                } else if (json.collection_status == 'in_process') {
                    alert('El pago está siendo revisado');
                } else if (json.collection_status == 'rejected') {
                    alert('El pago fué rechazado, el usuario puede intentar nuevamente el pago');
                } else if (json.collection_status == null) {
                    alert('El usuario no completó el proceso de pago, no se ha generado ningún pago');
                }
            };
        };

        this.end = function(){   
            $scope.status = 'loading';
            var message = $scope.user.name + ' ha dicho que tiene lo que necesitas. Contacta con el para finalizar el proceso';

            if($scope.comments.length > 0){
                message += '. Comentarios: ' + $scope.comments;
            }

            $http.post('/ayudaresfacil/api/checkout/end',{
                userFromId: $scope.user.id,
                userToId: $scope.request.userId, 
                publicationId: $scope.request.id, 
                publicationType: $scope.publicationType,
                comments: message,
                objectId: $scope.request.object.id,
                quantity: 100,
                token: $scope.user.token
            })
            .success(function(response) {
                $scope.status = 'congrats';
            }).error(function(response) {
                $scope.status = 'fail';
            });
        };

        this.getData();
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
