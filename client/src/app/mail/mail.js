angular.module( 'AyudarEsFacilApp.mail', [
    'ui.router'
])

.config(function config( $stateProvider ) {
    $stateProvider
		.state( 'panel.mail', { 
			template: '<ui-view/>'
		})
		.state( 'panel.mail.inbox', {        
			url: '/mensajes/bandeja-de-entrada',
			controller: 'InBoxCtrl',
			templateUrl: 'mail/mail-inbox.tpl.html',
			data:{ pageTitle: 'Bandeja de Entrada' }
		})
		.state( 'panel.mail.read', {        
			url: '/mensajes/leer/:id',
			controller: 'ConversationCtrl',
			templateUrl: 'mail/mail-read.tpl.html',
			data:{ pageTitle: 'Mensaje' }
		});
})

.service('ConversationService',[ '$modal', function($modal) {
    this.openConversation = function () {
        var modalInstance = $modal.open({
        templateUrl: 'mail/mail-read.tpl.html',
        controller: 'ConversationCtrl',
        size: 'sm'});

        return modalInstance;
    };
}])

.controller( 'InBoxCtrl', function OfferCtrl( $scope, ConversationService ) {
    $scope.openConversation=function(){
        ConversationService.openConversation();
    };
})

.controller( 'ConversationCtrl', function OfferCtrl( $scope ) {

})
;
