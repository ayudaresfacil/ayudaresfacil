angular.module('AyudarEsFacilApp.offer', [
    'ui.router', 'ui.bootstrap'
])

.config(function config($stateProvider, $httpProvider) {
    $stateProvider.state('web.offerList', {
        url: '/ofrecimientos',
        controller: 'OfferCtrl',
        templateUrl: 'offer/offer-list.tpl.html',
        data: {
            pageTitle: 'Ofrecimientos'
        }
    });
    $stateProvider.state('panel.offerCreate', {
        url: '/ofrecer-ayuda',
        controller: 'CreateOfferCtrl',
        templateUrl: 'offer/offer-create.tpl.html',
        data: {
            pageTitle: 'Crear Ofrecimiento'
        }
    });
    $stateProvider.state('web.offerDetail', {
        url: '/ofrecimiento-detalle/:id',
        controller: 'OfferCtrl',
        templateUrl: 'offer/offer-detail.tpl.html',
        data: {
            pageTitle: 'Detalle del Ofrecimiento'
        }
    });
    $stateProvider.state('panel.offerListUser', {
        url: '/mis-ofrecimientos',
        controller: 'CreateOfferCtrl',
        templateUrl: 'offer/offer-list.tpl.html',
        data: {
            pageTitle: 'Ofrecimientos'
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

.factory('Offers', ['$resource',
    function($resource) {
        return $resource('http://localhost/ayudaresfacil/api/offer', {
            publicationId: '@id'
        }, {}, {
            update: {
                method: 'PUT'
            }
        });
    }
])

.factory('Category', ['$resource',
    function($resource) {
        return $resource('http://localhost/ayudaresfacil/api/category', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
])

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

.controller('OfferCtrl', function OfferCtrl($scope, $http, Offers, $state, $stateParams, Authentication) {
    $scope.myInterval = 5000;
    $scope.user = Authentication.user;

    var offers = new Offers();

    if ($stateParams.id === undefined || $stateParams.id === null) {
        if (Authentication.user === null) {
            offers.$get(function(response) {
                $scope.offers = offers.data;
            });
        } else {
            offers.$get({
                userLog: Authentication.user.id
            }, function(response) {
                $scope.offers = offers.data;
            });
        }
    } else {
        if (Authentication.user === null) {
            offers.$get({
                publicationId: $stateParams.id
            }, function(response) {
                $scope.offers = offers.data;
            });
        } else {
            offers.$get({
                userLog: Authentication.user.id,
                publicationId: $stateParams.id
            }, function(response) {
                $scope.offers = offers.data;
            });
        }
    }

    $scope.setFavorite = function(id) {
        var data = {
            publicationId: id,
            userId: $scope.user.id
        };

        $http.post('/ayudaresfacil/api/offer/favorite', data)
            .success(function(response) {
                $scope.error = false;
                offers.$get({
                    userLog: Authentication.user.id,
                    publicationId: $stateParams.id
                }, function(response) {
                    $scope.offers = offers.data;
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

        $http.post('/ayudaresfacil/api/offer/favorite', data)
            .success(function(response) {
                $scope.error = false;
                offers.$get({
                    userLog: Authentication.user.id,
                    publicationId: $stateParams.id
                }, function(response) {
                    $scope.offers = offers.data;
                });
            })
            .error(function(response) {
                $scope.error = true;
                $scope.credentials = {};
            });
    };

    $scope.offerDelete = function(id) {
        var data = {
            publicationId: id,
            userId: $scope.user.id,
            del: 'true'
        };

        $http.post('/ayudaresfacil/api/offer', data)
            .success(function(response) {
                $scope.error = false;
            })
            .error(function(response) {
                $scope.error = true;
                $scope.credentials = {};
            });
        $state.go('web.offerList');
    };
})

.controller('CreateOfferCtrl', function CreateOfferCtrl($scope, $http, $location, $stateParams, $state, Offers, Category, Subcategory, Authentication) {

    // If user is not signed in then redirect back home
    /* if (!$scope.user) {
       $location.path('/signin');
     }*/

    $scope.user = Authentication.user;
    $scope.btnText = 'Publicar';
    $scope.msgSuccess = '0';

    var categories = new Category();
    var subcategories = new Subcategory();
    var date = new Date();
    var offers = new Offers();

    categories.$get(function(response) {
        $scope.categories = categories.data;
        $scope.subcategories = null;
        $scope.objects = null;
    });

    $scope.submitForm = function(isValid) {
        if (isValid) {
            var offer = new Offers($scope.offer);
            offer.userId = Authentication.user.id;
            offer.creationDate = date;
            offer.votes = 0;

            $scope.btnText = ' Guardando....';
            offer.$save(offer,
                function(response) {
                    $scope.status = 'SUCCESS';
                    $scope.btnText = 'Publicar';
                    $scope.offer = null;
                    $state.go('panel.offerListUser');
                },
                function(error) {
                    $scope.status = 'ERROR';
                    $scope.error = error;
                    $scope.btnText = 'Publicar';
                });
        }
    };

    $scope.offersUser = function(message) {
        offers.$get({
            userLog: Authentication.user.id,
            userId: Authentication.user.id
        }, function(response) {
            $scope.offers = offers.data;
            $scope.msgSuccess = '1';
        });
    };

    $scope.setFavorite = function(id) {
        var data = {
            publicationId: id,
            userId: $scope.user.id
        };

        $http.post('/ayudaresfacil/api/offer/favorite', data)
            .success(function(response) {
                $scope.error = false;
                offers.$get({
                    userLog: Authentication.user.id,
                    publicationId: $stateParams.id
                }, function(response) {
                    $scope.offers = offers.data;
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

        $http.post('/ayudaresfacil/api/offer/favorite', data)
            .success(function(response) {
                $scope.error = false;
                offers.$get({
                    userLog: Authentication.user.id,
                    publicationId: $stateParams.id
                }, function(response) {
                    $scope.offers = offers.data;
                });
            })
            .error(function(response) {
                $scope.error = true;
                $scope.credentials = {};
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
        $scope.offer.path = $scope.file;

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

    $scope.offersUser();

});
