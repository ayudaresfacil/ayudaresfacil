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
        url: '/detalle-pedido/:id',
        controller: 'RequestCtrl',
        templateUrl: 'request/request-detail.tpl.html',
        data: {
            pageTitle: 'Detalle del Pedido'
        }
    });
    $stateProvider.state('panel.requestDetailUser', {
        url: '/detalle-mi-pedido/:id',
        controller: 'RequestCtrl',
        templateUrl: 'request/request-detail-user.tpl.html',
        data: {
            pageTitle: 'Detalle del Pedido'
        }
    });
    $stateProvider.state('panel.requestListUser', {
        url: '/mis-pedidos',
        controller: 'CreateRequestCtrl',
        templateUrl: 'request/request-list-user.tpl.html',
        data: {
            pageTitle: 'Pedidos'
        }
    });
    $stateProvider.state('panel.requestFavorites', {
        url: '/mis-favoritos',
        controller: 'RequestFavorites',
        templateUrl: 'request/request-list.tpl.html',
        data: {
            pageTitle: 'Pedidos favoritos'
        }
    });
    $stateProvider.state('panel.requestEdit', {
        url: '/editar-pedido/:id',
        controller: 'RequestCtrl',
        templateUrl: 'request/request-edit.tpl.html',
        data: {
            pageTitle: 'Editar Pedido'
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

.controller('RequestCtrl', function RequestCtrl($scope, $http, Request, $state, $location, $stateParams, Authentication) {
    $scope.myInterval = 5000;
    $scope.user = Authentication.user;
    $scope.btnText = 'Publicar';
    $scope.likedLabels = [];
    $scope.sponsorDel = [];
    $scope.message = " ";

    var requests = new Request();

    if ($stateParams.id === undefined || $stateParams.id === null) {
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

    $scope.getCategories = function() {
        $http({
            method: 'GET',
            url: '/ayudaresfacil/api/category'
        }).success(function(response) {
            $scope.categories = response.data;
            $scope.subcategories = null;
            $scope.objects = null;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
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

    $scope.getObjects = function(categoryId, subcategoryId) {
        $http({
            method: 'GET',
            url: '/ayudaresfacil/api/object',
            params: {
                subcategoryId: subcategoryId,
                categoryId: categoryId
            }
        }).success(function(response) {
            $scope.objects = response.data;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
        });
    };

    $scope.submitFormEdit = function(isValid) {
        if (isValid) {
            var request = new Request($scope.requests[0]);
            request.publicationId = $stateParams.id;
            request.userId = Authentication.user.id;
            request.sponsorsn = $scope.likedLabels;

            $scope.btnText = ' Guardando....';
            request.$save(request,
                function(response) {
                    $scope.status = 'SUCCESS';
                    $scope.btnText = 'Publicar';
                    var retVal = confirm("Las modificaciones se han guardado con éxito");

                    if (retVal === true) {
                        $state.go("panel.requestListUser");
                        return true;
                    } else {
                        return false;
                    }
                },
                function(error) {
                    $scope.status = 'ERROR';
                    $scope.error = error;
                    $scope.btnText = 'Publicar';
                });
        }
    };

    $scope.toggleFavorite =  function(){
        if(this.request.isFavorite === "0"){
            this.setFavorite(this.request.id);
        }else{
            this.unsetFavorite(this.request.id);
        }
    };

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

    $scope.requestDelete = function(id) {
        var retVal = confirm("Seguro que quieres dar de baja la publicación?");

        if (retVal === true) {
            var data = {
                publicationId: id,
                userId: $scope.user.id,
                del: 'true'
            };

            $http.post('/ayudaresfacil/api/request/delete', data)
                .success(function(response) {
                    $scope.error = false;
                    $state.go('panel.requestListUser');
                })
                .error(function(response) {
                    $scope.error = true;
                });

            return true;
        } else {
            return false;
        }
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

    $scope.addDeleteSponsor = function(idx, id) {        
        $scope.sponsorDel.push({
            sponsorId: id
        });
    };

    $scope.getCategories();
})

.controller('CreateRequestCtrl', function CreateRequestCtrl($scope, $http, $location, $stateParams, $state, Request, Authentication) {

    // If user is not signed in then redirect back home
    /* if (!$scope.user) {
       $location.path('/signin');
     }*/

    $scope.user = Authentication.user;
    $scope.btnText = 'Publicar';
    $scope.msgSuccess = '0';
    $scope.msgSponsor = '';
    $scope.likedLabels = [];

    var date = new Date();
    var requests = new Request();

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

    $scope.getCategories = function() {
        $http({
            method: 'GET',
            url: '/ayudaresfacil/api/category'
        }).success(function(response) {
            $scope.categories = response.data;
            $scope.subcategories = null;
            $scope.objects = null;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
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

    $scope.getObjects = function(categoryId, subcategoryId) {
        $http({
            method: 'GET',
            url: '/ayudaresfacil/api/object',
            params: {
                subcategoryId: subcategoryId,
                categoryId: categoryId
            }
        }).success(function(response) {
            $scope.objects = response.data;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
        });
    };

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
    $scope.getCategories();

})

.controller('RequestFavorites', function RequestFavorites($scope, $http, Authentication) {
    $scope.user = Authentication.user;
    $scope.message = " ";

    $scope.offerFavoritesUser = function() {
        $scope.requests = null;
        $http({
            method: 'GET',
            url: '/ayudaresfacil/api/request/favorite',
            params: {
                userId: Authentication.user.id
            }
        }).success(function(response) {
            $scope.requests = response.data;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
            $scope.message = "Aún no tienes favoritos";
        });
    };

    $scope.offerFavoritesUser();
});
