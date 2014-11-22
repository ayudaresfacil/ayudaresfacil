
angular.module( 'AyudarEsFacilApp.user', [
    'ui.router','ui.bootstrap'
])

.config(function config($stateProvider, $httpProvider) {
    $stateProvider.state('panel.user', {
        template: '<ui-view/>'
    })
    .state('panel.user.data', {
        url: '/user/data',
        controller: 'UserCtrl',
        templateUrl: 'user/user-data.tpl.html',
        data: {
            pageTitle: 'Información del usuario'
        }
    })
    .state('panel.user.password', {
        url: '/user/password',
        controller: 'UserCtrl',
        templateUrl: 'user/user-password.tpl.html',
        data: {
            pageTitle: 'Cambiar mi contraseña'
        }
    })
    .state('account.signin', {
        url: '/signin',
        controller: 'AuthenticationCtrl',
        templateUrl: 'user/signin.tpl.html',
        data: {
            pageTitle: 'Inicia Sesión',
            bodyClass: "login tooltips"
        }
    })
    .state('account.signout', {
        url: '/signout',
        controller: 'AuthenticationCtrl',
        templateUrl: 'user/signin.tpl.html',
        data: {
            action: 'signout'
        }
    })
    .state('account.signup', {
        url: '/signup',
        controller: 'AuthenticationCtrl',
        templateUrl: 'user/signup.tpl.html',
        data: {
            pageTitle: 'Registrarme',
            bodyClass: 'login tooltips'
        }
    })
    .state('account.confirm', {
        url: '/account/confirm/:token',
        controller: 'AuthenticationCtrl',
        data: {
            action: 'confirm'
        }
    });

    //Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
        function($q, $location, Authentication) {
            return {
                responseError: function(rejection) {
                    switch (rejection.status) {
                        case 401:
                            // Deauthenticate the global user
                            Authentication.user = null;

                            // Redirect to signin page
                            $location.path('signin');
                            break;
                        case 403:
                            // Add unauthorized behaviour 
                            break;
                    }

                    return $q.reject(rejection);
                }
            };
        }
    ]);
})

// Users service used for communicating with the users REST endpoint
.factory('Users', ['$resource',
    function($resource) {
        return $resource('/ayudaresfacil/api/user', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
])

// Authentication service for user variables
.factory('Authentication', [

    function() {
        var _this = this;

        _this._data = {
            user: JSON.parse(localStorage.getItem("user"))
        };

        return _this._data;
    }
])

.controller('AuthenticationCtrl', function AuthenticationCtrl($scope, $http, $location, $state, $stateParams, Authentication) {
    $scope.credentials = {};
    $scope.error = '';
    $scope.activationError = false;
    $scope.newRegistration = false;
    $scope.activating = false;
    
    $scope.sendButton = 'REGISTRARME';


    this.signout = function(){
        Authentication.user = null;
        localStorage.clear();
        $state.transitionTo('web.home'); 
    };

    this.confirm = function(){
        
        $http.get('/ayudaresfacil/api/account/confirm',{
            params: {
                token: $stateParams.token
            }
        })
        .success(function(response) {
            $scope.activating = true;
            $location.path('/signin');
        }).error(function(response) {
            $scope.activationError = true;
        });
    };

    this.saveSession = function(data){
        var user = {
            id: data.id,
            email: data.email,
            name: data.name,
            lastName: data.lastName,
            profileImage: data.profileImage,
            token: data.token
        };

        $scope.authentication.user = user;

        localStorage.setItem("user", JSON.stringify(user));
    };

    if($state.current.data.action == 'signout'){
        this.signout();
    }else if($state.current.data.action == 'confirm'){
        this.confirm();
    }else{
        $scope.authentication = Authentication;
    }

    $scope.signup = function() {
        $scope.sendButton = 'GUARDANDO...';
        $http.put('/ayudaresfacil/api/account', $scope.credentials)
        .success(function(response) {
            $scope.newRegistration = true;
        }).error(function(response) {
            
            $scope.error = {};

            var message = {
                'EMPTY_VALUES': function(){
                    $scope.error.emptyValues = true;  
                },
                'REPEAT_ENTRY': function(){
                    $scope.error.repeatEntry = true;  
                },
                'NOOK': function(){
                    $scope.error.nook = true;  
                }
            };

            message[response.result]();

            $scope.sendButton = 'REGISTRARME';
        });
    };

    $scope.signin = function() {
        var that = this;

        $http.get('/ayudaresfacil/api/authentication/signin', {
            params: $scope.credentials
        })
        .success(function(response) {
            $scope.error = false;   
            
            var user = {
                id: response.data.id,
                email: response.data.email,
                name: response.data.name,
                lastName: response.data.lastName,
                profileImage: response.data.profileImage,
                token: response.token
            };

            $scope.authentication.user = user;

            localStorage.setItem("user", JSON.stringify(user));

            $location.path('/user/data');
        }).error(function(response) { 
            $scope.error = true;
            $scope.credentials = {};
        });
    };

})

.controller('UserCtrl', function UserCtrl($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    // If user is not signed in then redirect back home
    if (!$scope.user) {
		$location.path('/');
    }

    $scope.updateUserProfile = function() {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);

        user.$update(function(response) {
            $scope.success = true;
            Authentication.user = response;
        }, function(response) {
            $scope.error = response.data.message;
        });
    };

    $scope.changeUserPassword = function() {
        $scope.success = $scope.error = null;

        $http.post('/users/password', $scope.passwordDetails).success(function(response) {
            // If successful show success message and clear form
            $scope.success = true;
            $scope.passwordDetails = null;
        }).error(function(response) {
            $scope.error = response.message;
        });
    };

    $scope.today = function() {
        $scope.datepicker = new Date();
    };

    $scope.today();
    $scope.clear = function() {
        $scope.datepicker = null;
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };
})

;
