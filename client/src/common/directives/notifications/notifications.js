angular.module('directives.notifications', [])

.directive('notifications', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/notifications/notifications.tpl.html',
        controller: "NotificationsCtrl"
    };
})

.controller('NotificationsCtrl', function NotificationsCtrl($scope) {
    $scope.message = {};

    //setInterval(function(){
    //$http al servicio

    //}, 10000);
});
