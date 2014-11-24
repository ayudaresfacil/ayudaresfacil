angular.module( 'AyudarEsFacilApp.checkout', [
])

.config(function config($stateProvider) {
    $stateProvider.state('web.checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'checkout/checkout.tpl.html',
        data: {
            pageTitle: ''
        }
    });
})

.controller('CheckoutCtrl', function CheckoutCtrl($scope, $http, $location, $state, $stateParams, Authentication) {
    $scope.error = '';

    // $scope.user = Authentication.user;
    // if (!$scope.user) {
    //     $location.path('/');
    // }


})
;
