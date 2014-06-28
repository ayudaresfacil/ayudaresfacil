angular.module( 'AyudarEsFacilApp.whyHelp', [
    'ui.router'
])

.config(function config( $stateProvider ) {
    $stateProvider.state( 'whyHelp', {
        url: '/por-que-ayudar',
        views: {
            "main": {
                controller: 'WhyHelpCtrl',
                templateUrl: 'whyHelp/whyHelp.tpl.html'
            }
        },
        data:{ pageTitle: 'Por que ayudar' }
    });
})

.controller( 'WhyHelpCtrl', function WhyHelpCtrl( $scope ) {

})

;
