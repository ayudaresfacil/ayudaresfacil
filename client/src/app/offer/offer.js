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
        url: '/detalle-ofrecimiento/:id',
        controller: 'OfferCtrl',
        templateUrl: 'offer/offer-detail.tpl.html',
        data: {
            pageTitle: 'Detalle del Ofrecimiento'
        }
    });
    $stateProvider.state('panel.offerDetailUser', {
        url: '/detalle-mi-ofrecimiento/:id',
        controller: 'OfferCtrl',
        templateUrl: 'offer/offer-detail-user.tpl.html',
        data: {
            pageTitle: 'Detalle del Ofrecimiento'
        }
    });
    $stateProvider.state('panel.offerListUser', {
        url: '/mis-ofrecimientos',
        controller: 'CreateOfferCtrl',
        templateUrl: 'offer/offer-list-user.tpl.html',
        data: {
            pageTitle: 'Ofrecimientos'
        }
    });
    $stateProvider.state('panel.offerFavorites', {
        url: '/mis-ofrecimientos-favoritos',
        controller: 'OfferFavorites',
        templateUrl: 'offer/offer-favorites.tpl.html',
        data: {
            pageTitle: 'Ofrecimientos favoritos'
        }
    });
    $stateProvider.state('panel.offerEdit', {
        url: '/editar-ofrecimiento/:id',
        controller: 'OfferCtrl',
        templateUrl: 'offer/offer-edit.tpl.html',
        data: {
            pageTitle: 'Editar Ofrecimiento'
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
            },
            remove: {
                method: 'DELETE'
            }
        });
    }
])

.controller('OfferCtrl', function OfferCtrl($scope, $http, Offers, $state, $stateParams, Authentication, ConversationService) {
    $scope.myInterval = 5000;
    $scope.user = Authentication.user;
    $scope.btnText = 'Publicar';
    $scope.message = " ";

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
            var offer = new Offers($scope.offers[0]);
            offer.publicationId = $stateParams.id;
            offer.userId = Authentication.user.id;

            $scope.btnText = ' Guardando....';
            offer.$save(offer,
                function(response) {
                    $scope.status = 'SUCCESS';
                    $scope.btnText = 'Publicar';
                    var retVal = confirm("Las modificaciones se han guardado con éxito");

                    if (retVal === true) {
                        $state.go("panel.offerListUser");
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
        if(this.offer.isFavorite === "0"){
            this.setFavorite(this.offer.id);
        }else{
            this.unsetFavorite(this.offer.id);
        }
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

    $scope.offerDelete = function(id) {
        var retVal = confirm("Seguro que quieres dar de baja la publicación?");

        if (retVal === true) {
            var data = {
                publicationId: id,
                userId: $scope.user.id
            };

            $http.post('/ayudaresfacil/api/offer/delete', data)
                .success(function(response) {
                    $scope.error = false;
                    $state.go('panel.offerListUser');
                }).error(function(response) {
                    $scope.error = true;
                });

            return true;
        } else {
            return false;
        }
    };

    $scope.openConversation=function(){
        ConversationService.openConversation();
    };

    $scope.getCategories();
})

.controller('CreateOfferCtrl', function CreateOfferCtrl($scope, $http, $location, $stateParams, $state, Offers, Authentication) {

    // If user is not signed in then redirect back home
    /* if (!$scope.user) {
       $location.path('/signin');
     }*/

    $scope.user = Authentication.user;
    $scope.btnText = 'Publicar';
    $scope.msgSuccess = '0';

    var date = new Date();
    var offers = new Offers();

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

    $scope.toggleFavorite =  function(){
        if(this.offer.isFavorite === "0"){
            this.setFavorite(this.offer.id);
        }else{
            this.unsetFavorite(this.offer.id);
        }
    };
    
    $scope.getCategories = function() {
        $http({
            method: 'GET',
            url: '/ayudaresfacil/api/category'
        }).success(function(response) {
            $scope.categories = response.data;
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

    // $scope.onFileSelect = function($files) {
    //     var file = $files[0];
    //     $scope.offer.path = $scope.file;

    //     if (file.type.indexOf('image') == -1) {
    //         $scope.error = 'image extension not allowed, please choose a JPEG or PNG file.';
    //     }
    //     if (file.size > 2097152) {
    //         $scope.error = 'File size cannot exceed 2 MB';
    //     }
    //     $scope.upload = $upload.upload({
    //         url: upload.php,
    //         data: {
    //             fname: filename
    //         },
    //         file: file
    //     }).success(function(data, status, headers, config) {
    //         // file is uploaded successfully
    //         console.log(data);
    //     });
    // };

    $scope.offersUser();
    $scope.getCategories();

})

.controller('OfferFavorites', function OfferFavorites($scope, $http, Offers, Authentication, $stateParams) {
    $scope.user = Authentication.user;
    $scope.message = " ";

    var offers = new Offers();

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

    $scope.toggleFavorite =  function(){
        if(this.offer.isFavorite === "0"){
            this.setFavorite(this.offer.id);
        }else{
            this.unsetFavorite(this.offer.id);
        }
    };

    $scope.offerFavoritesUser = function() {
        $scope.offers = null;
        $http({
            method: 'GET',
            url: '/ayudaresfacil/api/offer/favorite',
            params: {
                userId: Authentication.user.id
            }
        }).success(function(response) {
            $scope.offers = response.data;
        }).error(function(response) {
            $scope.error = response.message;
            $scope.status = 'ERROR';
            $scope.message = "Aún no tienes favoritos";
        });
    };

    $scope.offerFavoritesUser();
});
