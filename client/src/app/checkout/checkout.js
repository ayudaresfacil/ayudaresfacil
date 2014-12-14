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
    
    this.userService = new Users();
    this.promiseUser = this.userService.$get({
        userId: $scope.user.id
    });

    this.promiseUser.then(function(response) {
        $scope.user = response.data[0];

        angular.forEach($scope.user.addresses, function(value, key) {
            $http({ method:'GET',
                    url:'/ayudaresfacil/api/city',
                    params:{id:$scope.user.addresses[key].cityId}}
                ).success(function(response) {
                    $scope.user.addresses[key]["city"] = response.data[0].description;
                });

            $http({ method:'GET',
                    url:'/ayudaresfacil/api/department',
                    params:{id:$scope.user.addresses[key].departmentId}}
                ).success(function(response) {
                    $scope.user.addresses[key]["department"] = response.data[0].description;
                });

            $http({ method:'GET',
                    url:'/ayudaresfacil/api/province',
                    params:{id:$scope.user.addresses[key].provinceId}}
                ).success(function(response) {
                    $scope.user.addresses[key]["province"] =  response.data[0].description;
                });
        });

    });

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

            angular.forEach($scope.user.addresses, function(value, key) {
                message += ' -- Domicilio: ';
                message += 'Calle: ' + value.street + ' - ';
                message += 'Nro.: ' + value.number;
                if(value.apartment !== ""){
                    message += ' - Depto.: ' +value.apartment;
                }
                if(value.floor !== ""){
                    message += ' - Piso: ' +value.floor;
                }
                if(value.postalCode !== ""){
                    message += ' - Cod. Postal: ' +value.postalCode;
                }
                if(value.province !== ""){
                    message += ' - Provincia: ' +value.province;
                }
                if(value.department !== ""){
                    message += ' - Ciudad: ' +value.department;
                }
                if(value.city !== ""){
                    message += ' - Localidad: ' +value.city;
                }
                
            });

            angular.forEach($scope.user.phones, function(value, key) {
                message += ' -- Teléfono: ';
                if(value.areaCode !== ""){
                    message += 'Cod. Area (' + value.areaCode + ') ';                    
                }
                message += 'Nro.: ' + value.number;
            });

            $http.post('/ayudaresfacil/api/message',{
                userFrom: $scope.user.id,
                userTo: $scope.offer.userId, 
                publication: $scope.offer.id, 
                //FAQ: "0", 
                //commonStateId: "N", 
                //subject: "Te han pedido lo que ofreciste", 
                text: message, 
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

            angular.forEach($scope.user.addresses, function(value, key) {
                message += ' -- Domicilio: ';
                message += 'Calle: ' + value.street + ' - ';
                message += 'Nro.: ' + value.number;
                if(value.apartment !== ""){
                    message += ' - Depto.: ' +value.apartment;
                }
                if(value.floor !== ""){
                    message += ' - Piso: ' +value.floor;
                }
                if(value.postalCode !== ""){
                    message += ' - Cod. Postal: ' +value.postalCode;
                }
                if(value.province !== ""){
                    message += ' - Provincia: ' +value.province;
                }
                if(value.department !== ""){
                    message += ' - Ciudad: ' +value.department;
                }
                if(value.city !== ""){
                    message += ' - Localidad: ' +value.city;
                }
                
            });

            angular.forEach($scope.user.phones, function(value, key) {
                message += ' -- Teléfono: ';
                if(value.areaCode !== ""){
                    message += 'Cod. Area (' + value.areaCode + ') ';                    
                }
                message += 'Nro.: ' + value.number;
            });

            $http.post('/ayudaresfacil/api/message',{
                userFrom: $scope.user.id,
                userTo: $scope.request.userId, 
                publication: $scope.request.id, 
                //FAQ: "0", 
                //commonStateId: "N", 
                //subject: "Han dicho que pueden ayudarte", 
                text: message,
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
