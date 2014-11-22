angular.module('services.screen', []).factory('screen', ['$rootScope', function($rootScope) {
    var uiService = {};

    uiService.moveToTop = function() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    };

    return uiService;
}]);
