angular.module('templates-common', ['directives/notifications/notifications.tpl.html', 'directives/session/auth.tpl.html', 'directives/session/user.tpl.html', 'security/login/form.tpl.html', 'security/login/toolbar.tpl.html']);

angular.module("directives/notifications/notifications.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/notifications/notifications.tpl.html",
    "<div class=\"collapse navbar-collapse\" id=\"main-fixed-nav\">\n" +
    "    <ul class=\"nav navbar-nav navbar-left\">\n" +
    "        <!-- Begin nav message -->\n" +
    "        <li class=\"dropdown\">\n" +
    "            <a ui-sref=\"panel.mail.inbox\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
    "                <span class=\"badge badge-success icon-count\">{{message}}</span>\n" +
    "                <i class=\"fa fa-envelope\"></i>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "        <!-- End nav message -->\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directives/session/auth.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/session/auth.tpl.html",
    "<div class=\"pull-right\" style=\"margin:8px 0\">\n" +
    "    <!--Is not logged in-->\n" +
    "    <a data-ui-sref=\"account.signin\" class=\"text-muted\" style=\"margin:0 15px\" data-ng-if=\"!authentication.user\">Inicia Sésion</a>\n" +
    "    \n" +
    "    <a data-ui-sref=\"account.signup\" class=\"btn btn-warning\" data-ng-if=\"!authentication.user\">Registrate</a>\n" +
    "    \n" +
    "    <!--Is logged in-->\n" +
    "    <a data-ui-sref=\"account.signout\" class=\"text-muted\" style=\"margin:0 15px\" data-ng-if=\"authentication.user\">Cerrar Sésion</a>\n" +
    "    \n" +
    "    <button ui-sref=\"panel.user.data\" class=\"btn btn-warning\" data-ng-if=\"authentication.user\">Mi Cuenta</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directives/session/user.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/session/user.tpl.html",
    "<ul class=\"nav-user navbar-right\">\n" +
    "    <li class=\"dropdown\">\n" +
    "        <a href=\"#fakelink\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
    "            <img data-ng-src=\"{{authentication.user.profileImage}}\" class=\"avatar img-circle\" alt=\"Avatar\">\n" +
    "            <strong>{{authentication.user.name}}</strong>\n" +
    "        </a>\n" +
    "        <ul class=\"dropdown-menu square primary margin-list-rounded with-triangle\">\n" +
    "            <li>\n" +
    "                <a href=\"javascript:return false;\">{{authentication.user.email}}</a>\n" +
    "            </li>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li>\n" +
    "                <a ui-sref=\"panel.user.data\">Mis datos</a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a ui-sref=\"panel.user.payment\">Método de cobros</a>\n" +
    "            </li>\n" +
    "<!--             <li>\n" +
    "                <a ui-sref=\"panel.user.password\">Cambiar mi contraseña</a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"#fakelink\">Mi perfil publico</a>\n" +
    "            </li>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li>\n" +
    "                <a href=\"lock-screen.html\">Bloquear pantalla</a>\n" +
    "            </li> -->\n" +
    "            <li>\n" +
    "                <a ui-sref=\"account.signout\">Salir</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "</ul>");
}]);

angular.module("security/login/form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("security/login/form.tpl.html",
    "<form name=\"form\" novalidate class=\"login-form\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h4>Sign in</h4>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <div class=\"alert alert-warning\" ng-show=\"authReason\">\n" +
    "            {{authReason}}\n" +
    "        </div>\n" +
    "        <div class=\"alert alert-error\" ng-show=\"authError\">\n" +
    "            {{authError}}\n" +
    "        </div>\n" +
    "        <div class=\"alert alert-info\">Please enter your login details</div>\n" +
    "        <label>E-mail</label>\n" +
    "        <input name=\"login\" type=\"email\" ng-model=\"user.email\" required autofocus>\n" +
    "        <label>Password</label>\n" +
    "        <input name=\"pass\" type=\"password\" ng-model=\"user.password\" required>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary login\" ng-click=\"login()\" ng-disabled='form.$invalid'>Sign in</button>\n" +
    "        <button class=\"btn clear\" ng-click=\"clearForm()\">Clear</button>\n" +
    "        <button class=\"btn btn-warning cancel\" ng-click=\"cancelLogin()\">Cancel</button>\n" +
    "    </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("security/login/toolbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("security/login/toolbar.tpl.html",
    "<ul class=\"nav pull-right\">\n" +
    "  <li class=\"divider-vertical\"></li>\n" +
    "  <li ng-show=\"isAuthenticated()\">\n" +
    "      <a href=\"#\">{{currentUser.firstName}} {{currentUser.lastName}}</a>\n" +
    "  </li>\n" +
    "  <li ng-show=\"isAuthenticated()\" class=\"logout\">\n" +
    "      <form class=\"navbar-form\">\n" +
    "          <button class=\"btn logout\" ng-click=\"logout()\">Log out</button>\n" +
    "      </form>\n" +
    "  </li>\n" +
    "  <li ng-hide=\"isAuthenticated()\" class=\"login\">\n" +
    "      <form class=\"navbar-form\">\n" +
    "          <button class=\"btn login\" ng-click=\"login()\">Log in</button>\n" +
    "      </form>\n" +
    "  </li>\n" +
    "</ul>");
}]);
