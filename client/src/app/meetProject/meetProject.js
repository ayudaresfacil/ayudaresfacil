angular.module( 'AyudarEsFacilApp.meetProject', [
    'ui.router'
])

.config(function config( $stateProvider ) {
    $stateProvider.state( 'meetProject', {
        url: '/conoce-el-proyecto',
        views: {
            "main": {
                controller: 'MeetProjectCtrl',
                templateUrl: 'meetProject/meetProject.tpl.html'
            }
        },
        data:{ pageTitle: 'Casos de éxito' }
    });
})

.controller( 'MeetProjectCtrl', function MeetProjectCtrl( $scope ) {

})

;
