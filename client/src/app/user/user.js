
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
            isSignout: true
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
.factory('Users', ['$resource', function($resource) {
        return $resource('/ayudaresfacil/api/user',{id:'@id'} , {}, {
            update: {method: 'PUT'}
        });
    }])

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

.controller('AuthenticationCtrl', function AuthenticationCtrl($scope, $http, $location, $state, Authentication) {
    this.signout = function(){
        Authentication.user = null;
        localStorage.clear();
        $state.transitionTo('web.home'); 
    };

    if($state.current.data.isSignout){
        this.signout();
    }else{
        $scope.authentication = Authentication;
    }

    $scope.signup = function() {
        $http.put('/ayudaresfacil/api/account', $scope.credentials).success(function(response) {
            $scope.authentication.user = response;

            $location.path('/user/data');
        }).error(function(response) {
            $scope.error = response.message;
        });
    };

    $scope.signin = function() {
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
//Set Change User Password - Begin
    $scope.btnText='Guardar Mis Datos';

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
//Set Change User Password - End

//Datepicker Config and Functions - Begin
    $scope.today = function() {
        $scope.datepicker = new Date();
    };
    $scope.today();
    $scope.clear = function() {
        $scope.datepicker = null;
    };
    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 0
    };
//Datepicker Config and Functions - End

    $scope.getProvinces = function(){ 
        $http.get('/ayudaresfacil/api/province').success(function(response) {
            $scope.provinces = response.data;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
        });
    };

    $scope.getDepartments = function(provinceId){ 
        $http({
            method:'GET',
            url:'/ayudaresfacil/api/department',
            params:{provinceId:provinceId}
        }).success(function(response) {
            $scope.departments = response.data;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
        });
    };

    $scope.getCities = function(departmentId){ 
        $http({
            method:'GET',
            url:'/ayudaresfacil/api/city',
            params:{departmentId:departmentId}
        }).success(function(response) {
            $scope.cities = response.data;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
        });
    };

    this.getUser = function(){
            $scope.user = Users.get({id:Authentication.user.id}, function() {
            var user = $scope.user;
            var userData;
            var userAddress;

            if(user === undefined || !($.isEmptyObject(user.data))){
               userData = user.data[0];
            }else{
                $scope.status='ERROR';
                $scope.error='No se encontraron datos para el usuario que estás buscando...';
                return false;
            }

            if(!($.isEmptyObject(userData.addresses))){
                userAddress = userData.addresses[0];
                $scope.getDepartments(userAddress.provinceId);
                $scope.getCities(userAddress.departmentId);
            }else{
                userData.addresses=[{}];
            }
            $scope.getProvinces();
            $scope.user = userData;
        });
    };

    $scope.addPhone = function() {
    if ($scope.user.phones == null){
        $scope.user.phones = [];
    }
    var phone = {"areaCode":$scope.areaCode,"number":$scope.number,"typeId":$scope.typeId};
    $scope.user.phones.push(phone);
    $scope.areaCode = null;
    $scope.number = null;
    $scope.typeId = null;
    };

    $scope.deletePhone = function ( idx ) {
      var phone_to_delete = $scope.user.phones[idx];
      $scope.user.phones.splice(idx, 1);
    };

    $scope.saveUser = function() {
        var user = new Users($scope.user);
        $scope.btnText=' Guardando....';
        user.$save(user,
                function(responseData){
                    $scope.status = 'SUCCESS';
                    $scope.btnText='Guardar Mis Datos';
                }, 
                function(error){
                    $scope.status = 'ERROR';
                    $scope.error = error;
                    $scope.btnText='Guardar Mis Datos';
                });
    };

    $scope.user = Authentication.user;
    if (!$scope.user) {
        $location.path('/');
    }

    this.getUser();

})

;
