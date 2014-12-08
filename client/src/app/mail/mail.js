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
			url: '/mensajes/leer/:conversationId/:id',
			controller: 'ConversationCtrl',
			templateUrl: 'mail/mail-read.tpl.html',
			data:{ pageTitle: 'Mensaje' }
		});
})

.service('ConversationService',[ '$modal', function($modal) {
    this.openConversation = function (id) {
        var modalInstance = $modal.open({
        templateUrl: 'mail/mail-read.tpl.html',
        controller: 'ConversationCtrl',
        size: 'sm',
        resolve: {
        publicationId: function () {
          return id;
            }
        }
    });

        return modalInstance;
    };
}])

.factory('Authentication', [

    function() {
        var _this = this;

        _this._data = {
            user: JSON.parse(localStorage.getItem("user"))
        };

        return _this._data;
    }
])

.factory('Conversations', ['$resource', function($resource) {
        return $resource('/ayudaresfacil/api/message',{} , {}, {
            update: {method: 'PUT'}
        });
    }])

.factory('Messages', ['$resource', function($resource) {
        return $resource('/ayudaresfacil/api/message',{} , {}, {
            update: {method: 'PUT'}
        });
    }])
.factory('Publications', ['$resource', function($resource) {
        return $resource('/ayudaresfacil/api/publication',{});
    }
])

.controller( 'InBoxCtrl', function InBoxCtrl( $scope, $filter, ConversationService, Conversations, Authentication ) {
	var today = new Date();

    $scope.openConversation=function(object){
        ConversationService.openConversation(object.id);
    };

    $scope.getAllConversationsFromAllPublications=function(){
        var conversations = Conversations.get({userInConversations:Authentication.user.id}, function(response){
            if (response.result === undefined || response.result == "NOOK"){
               $scope.noConversations = true;
               $scope.conversations= null;
            }else{
                $scope.noConversations = false;
                $scope.conversations=response.data;
                $scope.publication = response.data[0].publication;
            }

            angular.forEach($scope.conversations, function(value, key) {
                var date = new Date(value.createDate.replace(/-/g, '/'));
                if($filter('date')(date, 'dd/MM/yyyy') == $filter('date')(today, 'dd/MM/yyyy')){
                    $scope.conversations[key].createDate = $filter('date')(date, 'HH:mm:ss');
                }else{
                    $scope.conversations[key].createDate = $filter('date')(date, 'dd/MM/yyyy HH:mm:ss');
                }
                if(value.userTo.id == Authentication.user.id){
                    $scope.conversations[key].userTo.name += ' (Yo)';
                }
                if(value.userFrom.id == Authentication.user.id){
                    $scope.conversations[key].userFrom.name += ' (Yo)';
                }
            });

        });
	};

    $scope.getAllConversationsFromMyPublications=function(){
        var conversations = Conversations.get({userOwner:Authentication.user.id}, function(response){
            if (response.result === undefined || response.result == "NOOK"){
               $scope.noConversations = true;
               $scope.conversations= null;
            }else{
                $scope.noConversations = false;
                $scope.conversations=response.data;
                $scope.publication = response.data[0].publication;
            }

            angular.forEach($scope.conversations, function(value, key) {
                var date = new Date(value.createDate.replace(/-/g, '/'));
                if($filter('date')(date, 'dd/MM/yyyy') == $filter('date')(today, 'dd/MM/yyyy')){
                    $scope.conversations[key].createDate = $filter('date')(date, 'HH:mm:ss');
                }else{
                    $scope.conversations[key].createDate = $filter('date')(date, 'dd/MM/yyyy HH:mm:ss');
                }
                if(value.userTo.id == Authentication.user.id){
                    $scope.conversations[key].userTo.name += ' (Yo)';
                }
                if(value.userFrom.id == Authentication.user.id){
                    $scope.conversations[key].userFrom.name += ' (Yo)';
                }
            });

        });
    };

    $scope.getAllConversationsFromOthersPublications=function(){
        var conversations = Conversations.get({userNoOwner:Authentication.user.id}, function(response){
            if (response.result === undefined || response.result == "NOOK"){
               $scope.noConversations = true;
               $scope.conversations= null;
            }else{
                $scope.noConversations = false;
                $scope.conversations=response.data;
                $scope.publication = response.data[0].publication;
            }

            angular.forEach($scope.conversations, function(value, key) {
                var date = new Date(value.createDate.replace(/-/g, '/'));
                if($filter('date')(date, 'dd/MM/yyyy') == $filter('date')(today, 'dd/MM/yyyy')){
                    $scope.conversations[key].createDate = $filter('date')(date, 'HH:mm:ss');
                }else{
                    $scope.conversations[key].createDate = $filter('date')(date, 'dd/MM/yyyy HH:mm:ss');
                }
                if(value.userTo.id == Authentication.user.id){
                    $scope.conversations[key].userTo.name += ' (Yo)';
                }
                if(value.userFrom.id == Authentication.user.id){
                    $scope.conversations[key].userFrom.name += ' (Yo)';
                }
            });

        });
    };

	$scope.getAllConversationsFromAllPublications();

})

.controller( 'ConversationCtrl', function ConversationCtrl( $scope, $http, $stateParams, $filter, ConversationService, Conversations, Authentication, Messages, publicationId, Publications ) {
    var today = new Date();
    $scope.user = Authentication.user;
    $scope.getPublication=function(){
        var publication = Publications.get({publicationId:publicationId}, function(response){
            $scope.publication = response.data[0];
        });
    };
    $scope.getConversation=function(){
            var p_data = {"userId":Authentication.user.id,"publicationId":publicationId};

            $http({method:'GET',
                   url:'/ayudaresfacil/api/message/getConversationByUserPublication',
                   params: p_data
               })
            .success(function(response) {
                $scope.conversationId = response.data.conversationId;
                $scope.getMessageFromConversation();
            });
    };
    $scope.getMessageFromConversation=function(){
        var messages = Messages.get({conversationId:$scope.conversationId}, function(response){
            if (response.result == "NOOK"){
               $scope.noMessages = true;
               $scope.messages= null;
            }else{
                $scope.noMessages = false;
                $scope.messages=response.data;
            }
            angular.forEach($scope.messages, function(value, key) {
                var date = new Date(value.createDate.replace(/-/g, '/'));
                if($filter('date')(date, 'dd/MM/yyyy') == $filter('date')(today, 'dd/MM/yyyy')){
                    $scope.messages[key].createDate = $filter('date')(date, 'HH:mm:ss');
                }else{
                    $scope.messages[key].createDate = $filter('date')(date, 'dd/MM/yyyy HH:mm:ss');
                }
            });
        });
    };
    $scope.getPublication();
    $scope.getConversation();

})
;
