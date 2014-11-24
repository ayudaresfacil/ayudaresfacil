angular.module('AyudarEsFacilApp.request', [
    'ui.router', 'ui.bootstrap'
])

.config(function config($stateProvider, $httpProvider) {
    $stateProvider.state('web.requestList', {
        url: '/pedidos',
        controller: 'RequestCtrl',
        templateUrl: 'request/request-list.tpl.html',
        data: {
            pageTitle: 'Pedidos'
        }
    });
    $stateProvider.state('panel.requestCreate', {
        url: '/pedir-ayuda',
        controller: 'CreateRequestCtrl',
        templateUrl: 'request/request-create.tpl.html',
        data: {
            pageTitle: 'Crear Pedido'
        }
    });
    $stateProvider.state('web.requestDetail', {
        url: '/pedido-detalle/:id',
        controller: 'RequestCtrl',
        templateUrl: 'request/request-detail.tpl.html',
        data: {
            pageTitle: 'Detalle del Pedido'
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

// Users service used for communicating with the users REST endpoint
.factory('Requests', ['$resource',
    function($resource) {
        return $resource('http://localhost/ayudaresfacil/api/request', {
            publicationId: '@id'
        }, {}, {
            update: {
                method: 'PUT'
            }
        });
    }
])

// Users service used for communicating with the users REST endpoint
.factory('Category', ['$resource',
    function($resource) {
        return $resource('http://localhost/ayudaresfacil/api/category', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
])

// Users service used for communicating with the users REST endpoint
.factory('Subcategory', ['$resource',
    function($resource) {
        return $resource('http://localhost/ayudaresfacil/api/subcategory', {
            categoryId: '@id'
        }, {}, {
            update: {
                method: 'PUT'
            }
        });
    }
])

.controller('RequestCtrl', function RequestCtrl($scope, $http, Requests, $location, $stateParams, Authentication) {
    $scope.myInterval = 5000;
    $scope.user = Authentication.user;

    var requests = new Requests();

    if ($stateParams.id === undefined) {
        if (Authentication.user === null) {
            requests.$get(function(response) {
                $scope.requests = requests.data;
            });
        } else {
            requests.$get({
                userLog: Authentication.user.id
            }, function(response) {
                $scope.requests = requests.data;
            });
        }
    } else {
        if (Authentication.user === null) {
            requests.$get({
                publicationId: $stateParams.id
            }, function(response) {
                $scope.requests = requests.data;
            });
        } else {
            requests.$get({
                userLog: Authentication.user.id,
                publicationId: $stateParams.id
            }, function(response) {
                $scope.requests = requests.data;
            });
        }
    }

    $scope.setFavorite = function(id) {
        var data = {
            publicationId: id,
            userId: $scope.user.id
        };

        $http.post('/ayudaresfacil/api/request/favorite', data)
            .success(function(response) {
                $scope.error = false;
                requests.$get({
                    userLog: Authentication.user.id,
                    publicationId: $stateParams.id
                }, function(response) {
                    $scope.requests = requests.data;
                });
            })
            .error(function(response) {
                $scope.error = true;
                $scope.credentials = {};
            });
    };

    $scope.unsetFavorite = function(id) {
        var data = {
            publicationId: id,
            userId: $scope.user.id,
            del: 'true'
        };

        $http.post('/ayudaresfacil/api/request/favorite', data)
            .success(function(response) {
                $scope.error = false;
                requests.$get({
                    userLog: Authentication.user.id,
                    publicationId: $stateParams.id
                }, function(response) {
                    $scope.requests = requests.data;
                });
            })
            .error(function(response) {
                $scope.error = true;
                $scope.credentials = {};
            });
    };

    $scope.setVote = function(id) {
        var data = {
            publicationId: id,
            userId: $scope.user.id
        };

        $http.post('/ayudaresfacil/api/request/vote', data)
            .success(function(response) {
                $scope.error = false;
                requests.$get({
                    userLog: Authentication.user.id,
                    publicationId: $stateParams.id
                }, function(response) {
                    $scope.requests = requests.data;
                });
            })
            .error(function(response) {
                $scope.error = true;
                $scope.credentials = {};
            });
    };

    $scope.unsetVote = function(id) {
        var data = {
            publicationId: id,
            userId: $scope.user.id,
            del: 'true'
        };

        $http.post('/ayudaresfacil/api/request/vote', data)
            .success(function(response) {
                $scope.error = false;
                requests.$get({
                    userLog: Authentication.user.id,
                    publicationId: $stateParams.id
                }, function(response) {
                    $scope.requests = requests.data;
                });
            })
            .error(function(response) {
                $scope.error = true;
                $scope.credentials = {};
            });
    };

})

.controller('CreateRequestCtrl', function CreateRequestCtrl($scope, $http, $location, Requests, Subcategory, Authentication) {
    $scope.user = Authentication.user;

    var subcategories = new Subcategory();
    $scope.subcategories = null;

    // If user is not signed in then redirect back home
    if (!$scope.user) {
        $location.path('/signin');
    }

    subcategories.$get(function(response) {
        $scope.subcategories = subcategories.data;
    });

    $scope.createRequest = function(id) {
        var data = {
            request: $scope.request,
            userId: Authentication.user.id,
            creationDate: 'current_timesamp'
        };

        $http.post('/ayudaresfacil/api/request/', data)
            .success(function(response) {
                $scope.error = false;
            })
            .error(function(response) {
                $scope.error = true;
                $scope.credentials = {};
            });

    };

});
