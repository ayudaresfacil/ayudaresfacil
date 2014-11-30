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
    $stateProvider.state('panel.requestListUser', {
        url: '/mis-pedidos',
        controller: 'CreateRequestCtrl',
        templateUrl: 'request/request-list.tpl.html',
        data: {
            pageTitle: 'Pedidos'
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
.factory('Request', ['$resource',
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

.controller('RequestCtrl', function RequestCtrl($scope, $http, Request, $location, $stateParams, Authentication) {
    $scope.myInterval = 5000;
    $scope.user = Authentication.user;

    var requests = new Request();

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

.controller('CreateRequestCtrl', function CreateRequestCtrl($scope, $http, $location, $stateParams, $state, Request, Category, Subcategory, Authentication) {

    // If user is not signed in then redirect back home
    /* if (!$scope.user) {
       $location.path('/signin');
     }*/

    $scope.user = Authentication.user;
    $scope.btnText = 'Publicar';
    $scope.msgSuccess = '0';
    $scope.msgSponsor = '';
    $scope.likedLabels = [];

    var categories = new Category();
    var subcategories = new Subcategory();
    var date = new Date();
    var requests = new Request();

    categories.$get(function(response) {
        $scope.categories = categories.data;
        $scope.subcategories = null;
        $scope.objects = null;
    });

    $scope.submitForm = function(isValid) {
        if (isValid) {
            var request = new Request($scope.request);
            request.userId = Authentication.user.id;
            request.creationDate = date;
            request.votes = 0;
            request.sponsors = $scope.likedLabels;

            $scope.btnText = ' Guardando....';
            request.$save(request,
                function(response) {
                    $scope.status = 'SUCCESS';
                    $scope.btnText = 'Publicar';
                    $scope.request = null;
                    $state.go('panel.requestListUser');
                },
                function(error) {
                    $scope.status = 'ERROR';
                    $scope.error = error;
                    $scope.btnText = 'Publicar';
                });
        }

    };

    $scope.requestsUser = function(message) {
        requests.$get({
            userLog: Authentication.user.id,
            userId: Authentication.user.id
        }, function(response) {
            $scope.requests = requests.data;
            $scope.msgSuccess = '1';
        });
    };

    $scope.getSubcategories = function(categoryId) {
        $http({
            method: 'GET',
            url: '/ayudaresfacil/api/subcategory',
            params: {
                categoryId: categoryId
            }
        }).success(function(response) {
            $scope.subcategories = response.data;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
        });
    };

    $scope.getObjects = function(subcategoryId) {
        $http({
            method: 'GET',
            url: '/ayudaresfacil/api/object',
            params: {
                subcategoryId: subcategoryId
            }
        }).success(function(response) {
            $scope.objects = response.data;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
        });
    };

    $scope.onFileSelect = function($files) {
        var file = $files[0];
        $scope.request.path = $scope.file;

        if (file.type.indexOf('image') == -1) {
            $scope.error = 'image extension not allowed, please choose a JPEG or PNG file.';
        }
        if (file.size > 2097152) {
            $scope.error = 'File size cannot exceed 2 MB';
        }
        $scope.upload = $upload.upload({
            url: upload.php,
            data: {
                fname: filename
            },
            file: file
        }).success(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log(data);
        });
    };

    $scope.addInput = function() {
        if ($scope.likedLabels.length < 4) {
            $scope.likedLabels.push({
                label: ''
            });
        } else {
            $scope.msgSponsor = 'Has llegado al límite de padrinos';
        }
    };

    $scope.deleteInput = function(idx) {
        var request_to_delete = $scope.likedLabels[idx];
        $scope.likedLabels.splice(idx, 1);
    };

    $scope.requestsUser();

});
