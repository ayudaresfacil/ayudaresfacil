angular.module('templates-app', ['404/404.tpl.html', 'checkout/money-flow.tpl.html', 'checkout/offer-flow.tpl.html', 'checkout/request-flow.tpl.html', 'home/home.tpl.html', 'institutional/helpUsToHelp/helpUsToHelp.tpl.html', 'institutional/meetProject/meetProject.tpl.html', 'institutional/successStories/successStories.tpl.html', 'institutional/whyHelp/whyHelp.tpl.html', 'layout/panel.tpl.html', 'layout/web.tpl.html', 'mail/mail-inbox.tpl.html', 'mail/mail-read.tpl.html', 'offer/offer-create.tpl.html', 'offer/offer-detail-user.tpl.html', 'offer/offer-detail.tpl.html', 'offer/offer-edit.tpl.html', 'offer/offer-favorites.tpl.html', 'offer/offer-list-user.tpl.html', 'offer/offer-list.tpl.html', 'offer/offer-needs-list.tpl.html', 'offer/offer-request-list.tpl.html', 'request/request-create.tpl.html', 'request/request-detail-user.tpl.html', 'request/request-detail.tpl.html', 'request/request-edit.tpl.html', 'request/request-favorites.tpl.html', 'request/request-helps-list.tpl.html', 'request/request-list-user.tpl.html', 'request/request-list.tpl.html', 'sponsor/sponsor.tpl.html', 'user/signin.tpl.html', 'user/signup.tpl.html', 'user/user-data.tpl.html', 'user/user-password.tpl.html', 'user/user-payment.tpl.html']);

angular.module("404/404.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("404/404.tpl.html",
    "<div class=\"login-header text-center\">\n" +
    "    <img src=\"assets/images/logo.png\" class=\"logo\" alt=\"Logo\">\n" +
    "</div>\n" +
    "<div class=\"login-wrapper\">\n" +
    "    <h1 class=\"error-number\">4<i class=\"fa fa-meh-o icon-xl icon-square icon-primary\"></i>4</h1>\n" +
    "    <p class=\"text-center\">Ups! al parecer la página a la que has querido ingresar no existe.</p> \n" +
    "\n" +
    "    <p class=\"text-center\">Probablemente, esto no habría sucedido si <strong>Chuck Norris</strong> hubiera desarrollado este sitio con nosostros...</p>\n" +
    "\n" +
    "    <br><br>\n" +
    "    \n" +
    "    <p class=\"text-center\">\n" +
    "        <strong>\n" +
    "        	<a ui-sref=\"web.home\" class=\"btn btn-warning btn-square\">Volver al Home</a>\n" +
    "        </strong>\n" +
    "    </p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("checkout/money-flow.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("checkout/money-flow.tpl.html",
    "<div class=\"panel wizard with-nav-tabs panel-success panel-no-border\" style=\"margin:20px 0;\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <ul class=\"nav nav-tabs\">\n" +
    "            <li ng-class=\"{ active: flow.step == 0, completed: flow.step > 0}\"><a href=\"javascript:return false;\" data-toggle=\"tab\"><i class=\"fa fa-users\"></i> Información de la publicación</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{ active: flow.step == 1, completed: flow.step > 1 }\"><a href=\"javascript:return false;\" data-toggle=\"tab\"><i class=\"fa fa-users\"></i> Poniendose en contacto</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{ active: flow.step == 2, completed: flow.step > 2 }\"><a href=\"javascript:return false;\" data-toggle=\"tab\"><i class=\"fa fa-check\"></i> Fin</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"panel-collapse-1\" class=\"collapse in\">\n" +
    "        <div class=\"tab-content\">\n" +
    "\n" +
    "            <div class=\"tab-pane fade\" ng-class=\"{active: flow.step == 0, in: flow.step == 0}\" id=\"wizard-1-step1\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "                            <h4 class=\"small-heading\">{{user.name}}, haz dicho que puedes ayudar?</h4>\n" +
    "\n" +
    "                            <div class=\"row\" data-ng-if=\"request\">\n" +
    "                                <div class=\"col-sm-6\">\n" +
    "                                    <img class=\"img-thumbnail\" ng-src=\"{{request.image[0].path}}\" alt=\"{{request.object.description}}\" />\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"col-sm-6\">\n" +
    "                                    <h3>{{request.title}}</h3>\n" +
    "                                    <p>\n" +
    "                                        <small>{{request.description}}</small>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"panel-footer text-right\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-6 col-xs-5 text-right\">\n" +
    "                            <a href=\"#/detalle-pedido/{{request.id}}\" class=\"btn btn-warning PrevStep\"><i class=\"fa fa-angle-left\"></i> Volver</a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-6 col-xs-7 text-left\">\n" +
    "                            <a class=\"btn btn-warning NextStep\" data-ng-click=\"flow.toNextStep()\">Si, quiero ayudar! <i class=\"fa fa-angle-right\"></i></a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"tab-pane fade\" ng-class=\"{active: flow.step == 1, in: flow.step == 1}\" id=\"wizard-1-step2\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "\n" +
    "                        <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "                            <h4 class=\"small-heading more-margin-bottom\">Algunos datos sobre la donación...</h4>\n" +
    "                            <form role=\"form\">\n" +
    "\n" +
    "                                <div class=\"form-group form-inline\">\n" +
    "                                    <label>Cuanto puedes donar?</label>\n" +
    "                                    <input type=\"number\" class=\"form-control\" data-ng-model=\"price\" placeholder=\"$ARS\" required min=\"0\" max=\"1000\" step=\"1\">\n" +
    "                                    <span class=\"help-block\" style=\"display:inline-block\">Si quieres donar $50 ingresa el valor 50.</span>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <p>Si quieres, puedes hacer una observación al dueño de la publicación sobre el ofrecimiento que haz iniciado</p>\n" +
    "                            \n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label>Comentarios</label>\n" +
    "                                    <textarea class=\"form-control\" data-ng-model=\"comments\" style=\"height: 100px;\"></textarea>\n" +
    "                                </div>\n" +
    "                            </form>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"panel-footer text-right\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-6 col-xs-5 text-right\">\n" +
    "                            <a class=\"btn btn-warning PrevStep\" data-ng-click=\"flow.toPrevStep()\"><i class=\"fa fa-angle-left\"></i> Volver</a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-6 col-xs-7 text-left\">\n" +
    "                            <a href=\"https://sandbox.mercadopago.com/mla/checkout/pay?pref_id=171261795-01c5a5c5-d508-433e-8aa7-09e7d9abca3a\" name=\"MP-Checkout\" onreturn=\"callbackMPModal\" class=\"btn btn-warning\" mp-mode=\"modal\">Donar</a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"tab-pane fade\" ng-class=\"{active: flow.step == 2, in: flow.step == 2}\" id=\"wizard-1-step3\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "                            <div ng-if=\"status == 'loading'\">\n" +
    "                                Cargando...\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"jumbotron\" ng-if=\"status == 'congrats'\">\n" +
    "                                <h1>Felicitaciones!</h1>\n" +
    "                                <p>Haz finalizado el pedido.</p>\n" +
    "                                <p>En breve le enviaremos un mensaje al dueño de la publicación, poniendolos en contacto para concretar la operación.</p>\n" +
    "\n" +
    "                                <p>\n" +
    "                                    <strong>Estado:</strong> <span class=\"text-info\">{{paymentStatusMessage}}</span>\n" +
    "                                </p>\n" +
    "                                <p><a ui-sref=\"web.home\" class=\"btn btn-primary btn-lg\" role=\"button\">Ir al home</a>\n" +
    "                                </p>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"jumbotron\" ng-if=\"status == 'fail'\">\n" +
    "                                <h1>Ups! Lo sentimos...</h1>\n" +
    "                                <p>Al parecer surgió un error al intentar realizar esta operación</p>\n" +
    "                                <p>Por favor, intenta nuevamente mas tarde. Si el problema persiste, ponte en contacto con el equipo de desarrollo.</p>\n" +
    "                                <p><a ui-sref=\"web.home\" class=\"btn btn-primary btn-lg\" role=\"button\">Ir al home</a>\n" +
    "                                </p>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("checkout/offer-flow.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("checkout/offer-flow.tpl.html",
    "<div class=\"panel wizard with-nav-tabs panel-success panel-no-border\" style=\"margin:20px 0;\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <ul class=\"nav nav-tabs\">\n" +
    "            <li ng-class=\"{ active: flow.step == 0, completed: flow.step > 0}\" ><a href=\"javascript:return false;\" data-toggle=\"tab\"><i class=\"fa fa-users\"></i> Información de la publicación</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{ active: flow.step == 1, completed: flow.step > 1 }\"><a href=\"javascript:return false;\" data-toggle=\"tab\"><i class=\"fa fa-users\"></i> Poniendose en contacto</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{ active: flow.step == 2, completed: flow.step > 2 }\"><a href=\"javascript:return false;\" data-toggle=\"tab\"><i class=\"fa fa-check\"></i> Fin</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"panel-collapse-1\" class=\"collapse in\">\n" +
    "        <div class=\"tab-content\">\n" +
    "\n" +
    "            <div class=\"tab-pane fade\" ng-class=\"{active: flow.step == 0, in: flow.step == 0}\" id=\"wizard-1-step1\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "                            <h4 class=\"small-heading\">{{user.name}}, haz dicho que necesitas esto?</h4>\n" +
    "                            \n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-sm-12\">\n" +
    "                                    <div class=\"alert alert-info alert-bold-border square fade in\">\n" +
    "                                        <strong>Recuerda!</strong> Otras personas con menores posibilidades podrían necesitarlo también.\n" +
    "                                        <a href=\"#fakelink\" class=\"alert-link\"></a>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"row\" data-ng-if=\"offer\">\n" +
    "                                <div class=\"col-sm-6\">\n" +
    "                                    <img class=\"img-thumbnail\" ng-src=\"{{offer.image[0].path}}\" alt=\"{{offer.object.description}}\"/>\n" +
    "                                </div>\n" +
    "                            \n" +
    "                                <div class=\"col-sm-6\">\n" +
    "                                    <h3>{{offer.title}}</h3>\n" +
    "                                    <p>\n" +
    "                                        <small>{{offer.description}}</small>\n" +
    "                                    </p>\n" +
    "                                    <p>\n" +
    "                                        <span class=\"badge badge-default\"> {{offer.quantity}} disponibles</span>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"panel-footer text-right\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-6 col-xs-5 text-right\">\n" +
    "                            <a href=\"#/ofrecimiento-detalle/{{offer.id}}\" class=\"btn btn-warning PrevStep\"><i class=\"fa fa-angle-left\"></i> Volver</a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-6 col-xs-7 text-left\">\n" +
    "                            <a class=\"btn btn-warning NextStep\" data-ng-click=\"flow.toNextStep()\">Si, lo necesito! <i class=\"fa fa-angle-right\"></i></a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"tab-pane fade\" ng-class=\"{active: flow.step == 1, in: flow.step == 1}\" id=\"wizard-1-step2\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "\n" +
    "                        <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "                            <h4 class=\"small-heading more-margin-bottom\">Quieres agregar algo?</h4>\n" +
    "                            <p>Si quieres, puedes hacer una observación al dueño de la publicación sobre el pedido que haz iniciado</p>\n" +
    "                            <form role=\"form\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label>Comentarios</label>\n" +
    "                                    <textarea class=\"form-control\" data-ng-model=\"comments\" style=\"height: 100px;\"></textarea>\n" +
    "                                </div>\n" +
    "                            </form>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"panel-footer text-right\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-6 col-xs-5 text-right\">\n" +
    "                            <a class=\"btn btn-warning PrevStep\" data-ng-click=\"flow.toPrevStep()\"><i class=\"fa fa-angle-left\"></i> Volver</a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-6 col-xs-7 text-left\">\n" +
    "                            <a class=\"btn btn-warning NextStep\" data-ng-click=\"flow.toNextStep()\">Finalizar! <i class=\"fa fa-angle-right\"></i></a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"tab-pane fade\" ng-class=\"{active: flow.step == 2, in: flow.step == 2}\" id=\"wizard-1-step3\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-8 col-sm-offset-2\"> \n" +
    "\n" +
    "                            <div ng-if=\"status == 'loading'\">\n" +
    "                                Cargando...\n" +
    "                            </div>\n" +
    "                            \n" +
    "                            <div class=\"jumbotron\" ng-if=\"status == 'congrats'\">\n" +
    "                                <h1>Felicitaciones!</h1>\n" +
    "                                <p>Haz finalizado el pedido.</p>\n" +
    "                                <p>En breve le enviaremos un mensaje al dueño de la publicación, poniendolos en contacto para concretar la operación.</p>\n" +
    "                                <p><a ui-sref=\"web.home\" class=\"btn btn-primary btn-lg\" role=\"button\">Ir al home</a></p>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"jumbotron\" ng-if=\"status == 'fail'\">\n" +
    "                                <h1>Ups! Lo sentimos...</h1>\n" +
    "                                <p>Al parecer surgió un error al intentar realizar esta operación</p>\n" +
    "                                <p>Por favor, intenta nuevamente mas tarde. Si el problema persiste, ponte en contacto con el equipo de desarrollo.</p>\n" +
    "                                <p><a ui-sref=\"web.home\" class=\"btn btn-primary btn-lg\" role=\"button\">Ir al home</a></p>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("checkout/request-flow.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("checkout/request-flow.tpl.html",
    "<div class=\"panel wizard with-nav-tabs panel-success panel-no-border\" style=\"margin:20px 0;\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <ul class=\"nav nav-tabs\">\n" +
    "            <li ng-class=\"{ active: flow.step == 0, completed: flow.step > 0}\" ><a href=\"javascript:return false;\" data-toggle=\"tab\"><i class=\"fa fa-users\"></i> Información de la publicación</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{ active: flow.step == 1, completed: flow.step > 1 }\"><a href=\"javascript:return false;\" data-toggle=\"tab\"><i class=\"fa fa-users\"></i> Poniendose en contacto</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{ active: flow.step == 2, completed: flow.step > 2 }\"><a href=\"javascript:return false;\" data-toggle=\"tab\"><i class=\"fa fa-check\"></i> Fin</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"panel-collapse-1\" class=\"collapse in\">\n" +
    "        <div class=\"tab-content\">\n" +
    "\n" +
    "            <div class=\"tab-pane fade\" ng-class=\"{active: flow.step == 0, in: flow.step == 0}\" id=\"wizard-1-step1\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "                            <h4 class=\"small-heading\">{{user.name}}, haz dicho que puedes ayudar?</h4>\n" +
    "                            \n" +
    "                            <!-- <div class=\"row\">\n" +
    "                                <div class=\"col-sm-12\">\n" +
    "                                    <div class=\"alert alert-info alert-bold-border square fade in\">\n" +
    "                                        <strong>Recuerda!</strong> Otras personas con menores posibilidades podrían necesitarlo también.\n" +
    "                                        <a href=\"#fakelink\" class=\"alert-link\"></a>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div> -->\n" +
    "\n" +
    "                            <div class=\"row\" data-ng-if=\"request\">\n" +
    "                                <div class=\"col-sm-6\">\n" +
    "                                    <img class=\"img-thumbnail\" ng-src=\"{{request.image[0].path}}\" alt=\"{{request.object.description}}\"/>\n" +
    "                                </div>\n" +
    "                            \n" +
    "                                <div class=\"col-sm-6\">\n" +
    "                                    <h3>{{request.title}}</h3>\n" +
    "                                    <p>\n" +
    "                                        <small>{{request.description}}</small>\n" +
    "                                    </p>\n" +
    "                                    <p>\n" +
    "                                        <span class=\"badge badge-default\"> {{request.quantity}} disponibles</span>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"panel-footer text-right\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-6 col-xs-5 text-right\">\n" +
    "                            <a href=\"#/detalle-pedido/{{request.id}}\" class=\"btn btn-warning PrevStep\"><i class=\"fa fa-angle-left\"></i> Volver</a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-6 col-xs-7 text-left\">\n" +
    "                            <a class=\"btn btn-warning NextStep\" data-ng-click=\"flow.toNextStep()\">Si, quiero ayudar! <i class=\"fa fa-angle-right\"></i></a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"tab-pane fade\" ng-class=\"{active: flow.step == 1, in: flow.step == 1}\" id=\"wizard-1-step2\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "\n" +
    "                        <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "                            <h4 class=\"small-heading more-margin-bottom\">Quieres agregar algo?</h4>\n" +
    "                            <p>Si quieres, puedes hacer una observación al dueño de la publicación sobre el ofrecimiento que haz iniciado</p>\n" +
    "                            <form role=\"form\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label>Comentarios</label>\n" +
    "                                    <textarea class=\"form-control\" data-ng-model=\"comments\" style=\"height: 100px;\"></textarea>\n" +
    "                                </div>\n" +
    "                            </form>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"panel-footer text-right\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-6 col-xs-5 text-right\">\n" +
    "                            <a class=\"btn btn-warning PrevStep\" data-ng-click=\"flow.toPrevStep()\"><i class=\"fa fa-angle-left\"></i> Volver</a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-6 col-xs-7 text-left\">\n" +
    "                            <a class=\"btn btn-warning NextStep\" data-ng-click=\"flow.toNextStep()\">Finalizar! <i class=\"fa fa-angle-right\"></i></a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"tab-pane fade\" ng-class=\"{active: flow.step == 2, in: flow.step == 2}\" id=\"wizard-1-step3\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-8 col-sm-offset-2\"> \n" +
    "\n" +
    "                            <div ng-if=\"status == 'loading'\">\n" +
    "                                Cargando...\n" +
    "                            </div>\n" +
    "                            \n" +
    "                            <div class=\"jumbotron\" ng-if=\"status == 'congrats'\">\n" +
    "                                <h1>Felicitaciones!</h1>\n" +
    "                                <p>Haz finalizado el pedido.</p>\n" +
    "                                <p>En breve le enviaremos un mensaje al dueño de la publicación, poniendolos en contacto para concretar la operación.</p>\n" +
    "                                <p><a ui-sref=\"web.home\" class=\"btn btn-primary btn-lg\" role=\"button\">Ir al home</a></p>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"jumbotron\" ng-if=\"status == 'fail'\">\n" +
    "                                <h1>Ups! Lo sentimos...</h1>\n" +
    "                                <p>Al parecer surgió un error al intentar realizar esta operación</p>\n" +
    "                                <p>Por favor, intenta nuevamente mas tarde. Si el problema persiste, ponte en contacto con el equipo de desarrollo.</p>\n" +
    "                                <p><a ui-sref=\"web.home\" class=\"btn btn-primary btn-lg\" role=\"button\">Ir al home</a></p>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"the-box full-width full\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-9 col-lg-9 col-full-width-right\">\n" +
    "            <div class=\"blog-detail-image\">\n" +
    "                <img src=\"assets/images/photo/large/dash.jpg\" class=\"img-blog\" alt=\"Blog image\">\n" +
    "                <div class=\"blog-title\" style=\"\">\n" +
    "                    <div style=\"position: absolute;top: 50%;margin-top: -300px;\">\n" +
    "                        <h1 style=\"line-height: 80px\">Comienza por aquí...</h1>\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-4 col-sm-offset-2\">\n" +
    "                                <div class=\"the-box no-border bg-success tiles-information\">\n" +
    "                                    <i class=\"fa fa-users icon-bg\"></i>\n" +
    "                                    <div class=\"tiles-inner text-center\">\n" +
    "                                        <p>OFRECIMIENTOS</p>\n" +
    "                                        <p>Si tienes un objeto que ya no usas puedes ofrecerlo a la comunidad. Los servicios también son valorados.</p>\n" +
    "                                        <div class=\"progress no-rounded progress-xs\">\n" +
    "                                            <div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"80\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 80%\">\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <p>\n" +
    "                                            <a ui-sref=\"web.offerList\" class=\"btn btn-success active\">Ver</a>\n" +
    "                                            <a ui-sref=\"panel.offerCreate\" class=\"btn btn-success active\">Ofrecer</a>\n" +
    "                                        </p>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "                                <div class=\"the-box no-border bg-danger tiles-information\">\n" +
    "                                    <i class=\"fa fa-money icon-bg\"></i>\n" +
    "                                    <div class=\"tiles-inner text-center\">\n" +
    "                                        <p>PEDIDOS</p>\n" +
    "                                        <p>Si necesitas dinero para una operación, un tratamiento o una causa común, este es el lugar correcto.</p>\n" +
    "                                        <div class=\"progress no-rounded progress-xs\">\n" +
    "                                            <div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuenow=\"80\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 80%\">\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <p>\n" +
    "                                            <a ui-sref=\"web.requestList\" class=\"btn btn-success active\">Ver</a>\n" +
    "                                            <a ui-sref=\"panel.requestCreate\" class=\"btn btn-success active\">Pedir</a>\n" +
    "                                        </p>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-3 col-lg-3 col-full-width-left\">\n" +
    "            <div class=\"the-box bg-primary no-border text-right no-margin more-padding\">\n" +
    "                <h4 style=\"font-size:38px\">ayudaresfacil.org es una plataforma que permite a la comunidad hacer donaciones y ofrecimientos de una manera fácil e intuitiva.</h4>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"the-box bg-warning no-border no-margin text-center more-padding home\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n" +
    "                        <span>\n" +
    "                            <a href=\"#\" data-toggle=\"tooltip\" title=\"Sebastián Pérez\">\n" +
    "                                <img src=\"assets/images/photo/small/profile_sebastian.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                            </a>\n" +
    "                        </span>\n" +
    "                        <span class=\"hidden-lg hidden-md\">@perezsebastianm</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n" +
    "                        <span>\n" +
    "                            <a href=\"#\" data-toggle=\"tooltip\" title=\"Sabrina Casado\">\n" +
    "                                <img src=\"assets/images/photo/small/profile_sabrina.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                            </a>\n" +
    "                        </span>\n" +
    "                        <span class=\"hidden-lg hidden-md\">@sabricasado</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n" +
    "                        <span>\n" +
    "                            <a href=\"#\" data-toggle=\"tooltip\" title=\"Sergio Areco\">\n" +
    "                                <img src=\"assets/images/photo/small/profile_sergio.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                            </a>\n" +
    "                        </span>\n" +
    "                        <span class=\"hidden-lg hidden-md\">@arecosergio</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<!-- /.the-box full-width -->\n" +
    "");
}]);

angular.module("institutional/helpUsToHelp/helpUsToHelp.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("institutional/helpUsToHelp/helpUsToHelp.tpl.html",
    "<div class=\"the-box full-width full\">\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-sm-8 col-md-9 col-full-width-right\">\n" +
    "			<div class=\"the-box no-border blog-detail-content\">\n" +
    "				<h1 class=\"page-header\">\n" +
    "				    Ayúdanos a ayudar\n" +
    "				</h1>\n" +
    "				<p class=\"text-justify\">\n" +
    "				Siempre supimos que el sitio que queriamos hacer iba a tener fines solidarios, simplemente porque creemos que nos hace falta una herramienta que facilite el hecho de brindar ayuda, que sea sencilla y amigable.\n" +
    "				Porque muchos a veces tienen ganas de ayudar y no saben de que forma hacerlo.\n" +
    "				</p>\n" +
    "				<p class=\"text-justify\">\n" +
    "				Nosotros te contamos como sacarte las ganas de darle una mano a alguién. Ahora podes ser parte de nosotros, queremos que participes de este proyecto, que uses lo que construimos para hacerte más llevadera la tarea de ayudar y que por sobre todas las cosas te de gusto hacerlo. \n" +
    "				</p>\n" +
    "				<div class=\"well well-sm\">\n" +
    "					<h5>Necesitas ayuda?</h5>\n" +
    "					<small>\n" +
    "					-Crea un pedido y desarrolla tu problema y/o necesidad en el mismo. Es muy facil! de esta manera las personas que entren al sitio van a ver tu publicación y van a tener la oportunidad de ayudarte a cumplir tus objetivos.\n" +
    "					</small>					\n" +
    "				</div>\n" +
    "				<div class=\"well well-sm\">\n" +
    "					<h5>Queres ayudar?</h5>\n" +
    "					<small>\n" +
    "					-Crea un ofrecimiento comentando que es lo que te sobra y tenes ganas de compartir con alguién que lo pueda necesitar más que vos. Quién necesite ayuda, se va a encontrar con tu publicación y van a poder contactarse para llevar a cabo el hecho.\n" +
    "					</small>					\n" +
    "				</div>\n" +
    "				<p class=\"text-justify\">\n" +
    "				Ayúdanos a que nos conozcan, difundí que llegó a tus manos una herramienta muy sencilla de usar, segura y accesible para todos. \n" +
    "				Te necesitamos como nunca, por ustedes, por nosotros, por la gente que necesita de estas buenas costumbres.\n" +
    "				</p>				\n" +
    "				<hr />\n" +
    "			</div><!-- /the.box .no-border -->\n" +
    "		</div><!-- /.col-sm-9 -->\n" +
    "		\n" +
    "	<div class=\"col-sm-4 col-md-3 col-full-width-left\">\n" +
    "			<div class=\"the-box bg-primary no-border text-right no-margin more-padding\">\n" +
    "                <h4 style=\"font-size:35px\">ayudaresfacil.org es una plataforma que permite a la comunidad hacer donaciones y ofrecimientos de una manera fácil e intuitiva.</h4>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"the-box bg-warning no-border no-margin text-center more-padding\">\n" +
    "                <h4>Autores Destacados</h4><br />\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <p><a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Sebastián Pérez\">\n" +
    "                            <img src=\"assets/images/photo/small/profile_sebastian.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                        </a></p>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <p><a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Sabrina Casado\">\n" +
    "                            <img src=\"assets/images/photo/small/profile_sabrina.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                        </a></p>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <p><a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Sergio Areco\">\n" +
    "                            <img src=\"assets/images/photo/small/profile_sergio.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                        </a></p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "		</div><!-- /.col-sm-3 -->\n" +
    "	</div><!-- /.row -->\n" +
    "</div><!-- /.the-box full-width -->");
}]);

angular.module("institutional/meetProject/meetProject.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("institutional/meetProject/meetProject.tpl.html",
    "<div class=\"the-box full-width full\">\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-sm-8 col-md-9 col-full-width-right\">\n" +
    "			<div class=\"the-box no-border blog-detail-content\">\n" +
    "				<h1 class=\"page-header\">\n" +
    "				    Conoce el proyecto\n" +
    "				</h1>\n" +
    "				<p class=\"text-justify\">\n" +
    "				En la vida cotidiana, la mayor parte de la población se encuentra constantemente con pedidos de ayuda en los medios de comunicación, provenientes de personas con graves problemas de salud, hogares de ancianos o niños que se quedan sin insumos, organizaciones sin fines de lucro que necesitan ayuda para continuar sus tareas y muchos más.\n" +
    "				</p>\n" +
    "				<p class=\"text-justify\">\n" +
    "				Ayudar Es Facil es un emprendimiento solidario sin fines de lucro, que tiene por fin brindar un medio para realizar donaciones que sea simple y rápido de utilizar. La funcionalidad principal concluye en realizar pedidos de ayuda y/o donaciones a los pedidos realizados. A través de una página web, buscamos conectar personas que están dispuestas a ayudar con aquellos que realmente lo necesitan.\n" +
    "				</p>\n" +
    "\n" +
    "				<h3>¿Quienes Somos?</h3>\n" +
    "				<p class=\"text-justify\">\n" +
    "				Somos un grupo de jóvenes estudiantes de Desarrollo Web en la Universidad Nacional de La Matanza experimentando en el campo social. Cada uno desde su especialidad, aplica sus habilidades para poder llevar a cabo este proyecto. \n" +
    "				Nuestro mayor interés es facilitar la comunicación entre las partes interesadas en la realización de donaciones; ya sea para dar o recibir. Sabemos que la herramienta que estamos brindando y las metodologías propuestas serán muy útiles para aumentar los hechos solidarios ayudando a cambiar un poco la realidad en que vivimos.\n" +
    "				</p>\n" +
    "				<hr />\n" +
    "			</div><!-- /the.box .no-border -->\n" +
    "		</div><!-- /.col-sm-9 -->\n" +
    "		\n" +
    "	<div class=\"col-sm-4 col-md-3 col-full-width-left\">\n" +
    "			<div class=\"the-box bg-primary no-border text-right no-margin more-padding\">\n" +
    "                <h4 style=\"font-size:35px\">ayudaresfacil.org es una plataforma que permite a la comunidad hacer donaciones y ofrecimientos de una manera fácil e intuitiva.</h4>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"the-box bg-warning no-border no-margin text-center more-padding\">\n" +
    "                <h4>Autores Destacados</h4><br />\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <p><a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Sebastián Pérez\">\n" +
    "                            <img src=\"assets/images/photo/small/profile_sebastian.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                        </a></p>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <p><a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Sabrina Casado\">\n" +
    "                            <img src=\"assets/images/photo/small/profile_sabrina.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                        </a></p>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <p><a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Sergio Areco\">\n" +
    "                            <img src=\"assets/images/photo/small/profile_sergio.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                        </a></p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "		</div><!-- /.col-sm-3 -->\n" +
    "	</div><!-- /.row -->\n" +
    "</div><!-- /.the-box full-width -->");
}]);

angular.module("institutional/successStories/successStories.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("institutional/successStories/successStories.tpl.html",
    "<div class=\"the-box full-width full\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12 col-md-12 col-full-width-right\">\n" +
    "            <div class=\"the-box no-border blog-detail-content\">\n" +
    "                <h1 class=\"page-header\">\n" +
    "				    Casos de éxito\n" +
    "				</h1>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-4 col-sm-6\">\n" +
    "                        <carousel interval=\"myInterval\" style=\"height:350px\">\n" +
    "                            <slide active=\"slide.active\">\n" +
    "                                <img ng-src=\"/ayudaresfacil/api/uploads/publication-images/10/dinero (1).jpg\" style=\"margin:auto;\">\n" +
    "                            </slide>\n" +
    "                        </carousel>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"col-md-8 col-sm-6\">\n" +
    "                        <h2 class=\"medium-heading more-margin-bottom text-primary\">Salvemos a HELENITA una vez más!</h2>\n" +
    "\n" +
    "                        <p style=\"margin-top: -10px;\">\n" +
    "                            <small style=\"margin: -20px 20px 0 0;\">\n" +
    "		                    <span class=\"glyphicon glyphicon-thumbs-up\"></span> Votos de fé: 340.009 \n" +
    "		                </small>\n" +
    "                            <small>\n" +
    "		                    <span class=\"glyphicon glyphicon-heart\"></span> Favoritos: 200.982\n" +
    "		                </small>\n" +
    "                        </p>\n" +
    "\n" +
    "                        <p>\n" +
    "                            Después de varias internaciones, una cirugía de hidrocefalia y colocación de válvula, los médicos le diagnosticaron Osteopetrosis, una rara enfermedad genética y degenerativa que si no es detenida de manera rápida le puede costar primera la visión, la audición y por último su vida. Es que sus huesos crecen compactos y se ensanchan, lo que le genera una compresión en todos los nervios de su cuerpo.\n" +
    "                        </p>\n" +
    "\n" +
    "                        <div class=\"panel-group\">\n" +
    "                            <div class=\"panel panel-default\">\n" +
    "                                <div class=\"panel-body\">\n" +
    "\n" +
    "                                    <h4>Dinero recaudado: $1.000.000</h4>\n" +
    "                                    <p>\n" +
    "                                        Dinero > Dinero\n" +
    "                                    </p>\n" +
    "                                    </p>\n" +
    "                                    <p>Visto:\n" +
    "                                        <strong>1.200.405</strong> veces</p>\n" +
    "                                    <p>Vencimiento:\n" +
    "                                        <strong>30-11-2014</strong>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"the-box transparent\">\n" +
    "                            <p>\n" +
    "                                <span class=\"badge badge-primary\">Padrinos</span>\n" +
    "                            </p>\n" +
    "                            <ul class=\"col-md-4 media-list media-sm media-team\">\n" +
    "                                <li class=\"media\">\n" +
    "                                    <a class=\"pull-left\">\n" +
    "                                        <img class=\"media-object img-circle\" src=\"assets/images/avatar/avatar.jpg\" alt=\"Avatar\">\n" +
    "                                    </a>\n" +
    "                                    <div class=\"media-body\">\n" +
    "                                        <a href=\"https://twitter.com/@cuervotineli\">\n" +
    "                                            <p class=\"text-danger\">@cuervotineli</p>\n" +
    "                                        </a>\n" +
    "                                    </div>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                            <ul class=\"col-md-4 media-list media-sm media-team\">\n" +
    "                                <li class=\"media\">\n" +
    "                                    <a class=\"pull-left\">\n" +
    "                                        <img class=\"media-object img-circle\" src=\"assets/images/avatar/avatar.jpg\" alt=\"Avatar\">\n" +
    "                                    </a>\n" +
    "                                    <div class=\"media-body\">\n" +
    "                                        <a href=\"https://twitter.com/@perroscalle\">\n" +
    "                                            <p class=\"text-danger\">@perroscalle</p>\n" +
    "                                        </a>\n" +
    "                                    </div>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                            <ul class=\"col-md-4 media-list media-sm media-team\">\n" +
    "                                <li class=\"media\">\n" +
    "                                    <a class=\"pull-left\">\n" +
    "                                        <img class=\"media-object img-circle\" src=\"assets/images/avatar/avatar.jpg\" alt=\"Avatar\">\n" +
    "                                    </a>\n" +
    "                                    <div class=\"media-body\">\n" +
    "                                        <a href=\"https://twitter.com/@G_Higuain\">\n" +
    "                                            <p class=\"text-danger\">@G_Higuain</p>\n" +
    "                                        </a>\n" +
    "                                    </div>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- /the.box .no-border -->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- /.row -->\n" +
    "</div>\n" +
    "<!-- /.the-box full-width -->\n" +
    "");
}]);

angular.module("institutional/whyHelp/whyHelp.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("institutional/whyHelp/whyHelp.tpl.html",
    "<div class=\"the-box full-width full\">\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-sm-8 col-md-9 col-full-width-right\">\n" +
    "			<div class=\"the-box no-border blog-detail-content\">\n" +
    "				<h1 class=\"page-header\">\n" +
    "				    Por que ayudar?\n" +
    "				</h1>\n" +
    "				<p class=\"text-justify\">\n" +
    "					Queremos masificar el hecho de ayudar, por eso te necesitamos junto a nosotros. \n" +
    "					Tu colaboración puede achicar las diferencias que separan a las personas y asi hacer\n" +
    "					entre todos un mundo mejor.\n" +
    "				</p>\n" +
    "				<p class=\"text-justify\">\n" +
    "					Quizas puedas pensarlo como un acto recíproco, ayudar con un objeto que ya no usas o con\n" +
    "					un poco de dinero te traerá muchos beneficios personales.\n" +
    "					Se trata de una forma de vida diferente, no solo por el hecho de donar objetos o dinero, sino\n" +
    "					también por el uso diario de nuestra voluntad para con otros.\n" +
    "					Un gran frase dice:\n" +
    "				</p>\n" +
    "				<blockquote>\n" +
    "					<small>\"Si quieres llegar rápido has de caminar solo, pero si quieres llegar lejos has de hacerlo acompañado\". </small>\n" +
    "				</blockquote>\n" +
    "				<p class=\"text-justify\">\n" +
    "					Es gratificante mirar a los lados y verse rodeado de gente dispuesta a dar una mano a quién más lo necesita. porque cuando decidimos ampliar nuestro circulo de aquello que cuidamos y mejoramos, pasando de nuestras familias a la comunidad donde vivimos, encontramos un nuevo reto y un sentido de vida adicional a lo que ya vivimos. Nos sentimos más orgullosos de lo que somos y lo que hacemos. Confirmamos que no seremos sólo uno más de los que se queja de la situacion actual del país, sin hacer mucho por ayudar.	 \n" +
    "				</p>\n" +
    "			</div><!-- /the.box .no-border -->\n" +
    "		</div><!-- /.col-sm-9 -->\n" +
    "\n" +
    "		<div class=\"col-sm-4 col-md-3 col-full-width-left\">\n" +
    "			<div class=\"the-box bg-primary no-border text-right no-margin more-padding\">\n" +
    "                <h4 style=\"font-size:35px\">ayudaresfacil.org es una plataforma que permite a la comunidad hacer donaciones y ofrecimientos de una manera fácil e intuitiva.</h4>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"the-box bg-warning no-border no-margin text-center more-padding\">\n" +
    "                <h4>Autores Destacados</h4><br />\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <p><a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Sebastián Pérez\">\n" +
    "                            <img src=\"assets/images/photo/small/profile_sebastian.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                        </a></p>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <p><a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Sabrina Casado\">\n" +
    "                            <img src=\"assets/images/photo/small/profile_sabrina.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                        </a></p>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <p><a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Sergio Areco\">\n" +
    "                            <img src=\"assets/images/photo/small/profile_sergio.jpg\" class=\"img-responsive img-circle\" alt=\"Avatar\">\n" +
    "                        </a></p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "		</div><!-- /.col-sm-3 -->\n" +
    "	</div><!-- /.row -->\n" +
    "</div><!-- /.the-box full-width -->");
}]);

angular.module("layout/panel.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("layout/panel.tpl.html",
    "<div class=\"wrapper\">\n" +
    "    <!-- BEGIN TOP NAV -->\n" +
    "    <div class=\"top-navbar\">\n" +
    "        <div class=\"top-navbar-inner\">\n" +
    "\n" +
    "            <!-- Begin Logo brand -->\n" +
    "            <div class=\"logo-brand\">\n" +
    "                <a ui-sref=\"web.home\">\n" +
    "                    <img src=\"assets/images/logo.png\" alt=\"AyudarEsFacil.org\">\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <!-- /.logo-brand -->\n" +
    "            <!-- End Logo brand -->\n" +
    "\n" +
    "            <div class=\"top-nav-content\">\n" +
    "\n" +
    "                <!-- Begin button sidebar left toggle -->\n" +
    "                <div class=\"btn-collapse-sidebar-left\">\n" +
    "					<i class=\"fa fa-long-arrow-right icon-dinamic\"></i>\n" +
    "				</div>\n" +
    "                <!-- /.btn-collapse-sidebar-left -->\n" +
    "                <!-- End button sidebar left toggle -->\n" +
    "\n" +
    "                <!-- Begin button sidebar right toggle -->\n" +
    "            <!--     <div class=\"btn-collapse-sidebar-right\">\n" +
    "                    <i class=\"fa fa-bullhorn\"></i>\n" +
    "                </div> -->\n" +
    "                <!-- /.btn-collapse-sidebar-right -->\n" +
    "                <!-- End button sidebar right toggle -->\n" +
    "\n" +
    "                <!-- Begin button nav toggle -->\n" +
    "                <div class=\"btn-collapse-nav\" data-toggle=\"collapse\" data-target=\"#main-fixed-nav\">\n" +
    "                    <i class=\"fa fa-plus icon-plus\"></i>\n" +
    "                </div>\n" +
    "                <!-- /.btn-collapse-sidebar-right -->\n" +
    "                <!-- End button nav toggle -->\n" +
    "\n" +
    "\n" +
    "                <!-- Begin user session nav -->\n" +
    "                <session-user></session-user>\n" +
    "                <!-- End user session nav -->\n" +
    "\n" +
    "                <!-- Begin Collapse menu nav -->\n" +
    "                <notifications></notifications>\n" +
    "                <!-- End Collapse menu nav -->\n" +
    "            </div>\n" +
    "            <!-- /.top-nav-content -->\n" +
    "        </div>\n" +
    "        <!-- /.top-navbar-inner -->\n" +
    "    </div>\n" +
    "    <!-- /.top-navbar -->\n" +
    "    <!-- END TOP NAV -->\n" +
    "\n" +
    "    <!-- BEGIN SIDEBAR LEFT -->\n" +
    "    <div class=\"sidebar-left sidebar-nicescroller\">\n" +
    "    	<!-- <div class=\"logo-brand primary-color\">\n" +
    "            <a ui-sref=\"web.home\">\n" +
    "                <img src=\"assets/images/logo.png\" alt=\"AyudarEsFacil.org\">\n" +
    "            </a>\n" +
    "        </div> -->\n" +
    "        <ul class=\"sidebar-menu\">\n" +
    "			<li class=\"static left-profile-summary\">\n" +
    "			    <div class=\"media\">\n" +
    "			        <p class=\"pull-left\">\n" +
    "			            <img data-ng-src=\"{{authentication.user.profileImage}}\" class=\"avatar img-circle media-object\" alt=\"Avatar\">\n" +
    "			        </p>\n" +
    "			        <div class=\"media-body\">\n" +
    "			            <h4>Hola,\n" +
    "			                <br />\n" +
    "			                <strong>{{authentication.user.name}} {{authentication.user.lastName}}</strong>\n" +
    "			            </h4>\n" +
    "			            <button ui-sref=\"panel.user.data\" class=\"btn btn-success btn-xs\">\n" +
    "                            <i class=\"fa fa-cog\"></i>\n" +
    "			            </button>\n" +
    "			            <button ui-sref=\"account.signout\" class=\"btn btn-danger btn-xs\">Cerrar Sesión</button>\n" +
    "			        </div>\n" +
    "			    </div>\n" +
    "			</li>\n" +
    "\n" +
    "            <li class=\"active selected\">\n" +
    "                <a href=\"#/\">\n" +
    "                    <i class=\"fa fa-home icon-sidebar\"></i>Home\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            \n" +
    "            <li class=\"active selected\">\n" +
    "                <a ui-sref=\"#\">\n" +
    "                    <i class=\"fa fa-user icon-sidebar\"></i>\n" +
    "                    {{authentication.user.email}}\n" +
    "                </a>\n" +
    "                <ul class=\"submenu visible\">\n" +
    "                    <li class=\"active selected\">\n" +
    "                        <a ui-sref=\"panel.user.data\">Mis datos </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"active selected\">\n" +
    "                <a ui-sref=\"panel.offerListUser\">\n" +
    "                    <i class=\"fa fa-gift icon-sidebar\"></i>\n" +
    "                    Mis Ofrecimientos\n" +
    "                </a>\n" +
    "                <ul class=\"submenu visible\">\n" +
    "                    <li class=\"active selected\">\n" +
    "                        <a ui-sref=\"panel.offerCreate\">Nuevo Ofrecimiento </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <!--<ul class=\"submenu visible\">\n" +
    "                    <li class=\"active selected\">\n" +
    "                        <a ui-sref=\"panel.offerRequest\">Pedidos de usuarios</a>\n" +
    "                    </li>\n" +
    "                </ul>-->\n" +
    "                <ul class=\"submenu visible\">\n" +
    "                    <li class=\"active selected\">\n" +
    "                        <a ui-sref=\"panel.offerFavorites\">Favoritos </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"active selected\">\n" +
    "                <a ui-sref=\"panel.requestListUser\">\n" +
    "                    <i class=\"fa fa-bullhorn icon-sidebar\"></i>\n" +
    "                    Mis Pedidos\n" +
    "                </a>\n" +
    "                <ul class=\"submenu visible\">\n" +
    "                    <li class=\"active selected\">\n" +
    "                        <a ui-sref=\"panel.requestCreate\">Nuevo Pedido </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <ul class=\"submenu visible\">\n" +
    "                    <li class=\"active selected\">\n" +
    "                        <a ui-sref=\"panel.requestFavorites\">Favoritos </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"active selected\">\n" +
    "                <a ui-sref=\"panel.requestHelps\">\n" +
    "                    <i class=\"fa fa-flag icon-sidebar\"></i>\n" +
    "                    Mis Ayudas\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"active selected\">\n" +
    "                <a ui-sref=\"panel.offerNeeds\">\n" +
    "                    <i class=\"fa fa-heart-o icon-sidebar\"></i>\n" +
    "                    Mis Necesidades\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"active selected\">\n" +
    "                <a ui-sref=\"panel.mail.inbox\">\n" +
    "                    <i class=\"fa fa-envelope icon-sidebar\"></i>\n" +
    "                    Mensajes\n" +
    "                </a>\n" +
    "                <ul class=\"submenu visible\">\n" +
    "                    <li class=\"active selected\">\n" +
    "                    	<a ui-sref=\"panel.mail.inbox\">Bandeja de Entrada </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <!-- /.sidebar-left -->\n" +
    "    <!-- END SIDEBAR LEFT -->\n" +
    "\n" +
    "    <!-- BEGIN SIDEBAR RIGHT HEADING -->\n" +
    "    <div class=\"sidebar-right-heading\">\n" +
    "        <ul class=\"nav nav-tabs square nav-justified\">\n" +
    "            <li class=\"active\"><a href=\"#online-user-sidebar\" data-toggle=\"tab\"><i class=\"fa fa-comments\"></i></a>\n" +
    "            </li>\n" +
    "            <li><a href=\"#notification-sidebar\" data-toggle=\"tab\"><i class=\"fa fa-bell\"></i></a>\n" +
    "            </li>\n" +
    "            <li><a href=\"#task-sidebar\" data-toggle=\"tab\"><i class=\"fa fa-tasks\"></i></a>\n" +
    "            </li>\n" +
    "            <li><a href=\"#setting-sidebar\" data-toggle=\"tab\"><i class=\"fa fa-cogs\"></i></a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <!-- /.sidebar-right-heading -->\n" +
    "    <!-- END SIDEBAR RIGHT HEADING -->\n" +
    "\n" +
    "    <!-- BEGIN SIDEBAR RIGHT -->\n" +
    "    <div class=\"sidebar-right right-sidebar-nicescroller\">\n" +
    "        <div class=\"tab-content\">\n" +
    "            <div class=\"tab-pane fade in active\" id=\"online-user-sidebar\">\n" +
    "                <ul class=\"sidebar-menu online-user\">\n" +
    "                    <li class=\"static\">ONLINE USERS</li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status success\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <i class=\"fa fa-mobile-phone device-status\"></i>\n" +
    "                            Thomas White\n" +
    "                            <span class=\"small-caps\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status success\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">Doina Slaivici\n" +
    "                            <span class=\"small-caps\">Duis autem vel eum iriure dolor in hendrerit in</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status success\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <i class=\"fa fa-android device-status\"></i>\n" +
    "                            Harry Nichols\n" +
    "                            <span class=\"small-caps\">I think so</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status success\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <i class=\"fa fa-mobile-phone device-status\"></i>\n" +
    "                            Mihaela Cihac\n" +
    "                            <span class=\"small-caps\">Yes, I'll be waiting</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status success\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <i class=\"fa fa-apple device-status\"></i>\n" +
    "                            Harold Chavez\n" +
    "                            <span class=\"small-caps\">Thank you!</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"static\">IDLE USERS</li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status warning\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <i class=\"fa fa-windows device-status\"></i>\n" +
    "                            Elizabeth Owens\n" +
    "                            <span class=\"small-caps\">2 hours</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status warning\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <i class=\"fa fa-apple device-status\"></i>\n" +
    "                            Frank Oliver\n" +
    "                            <span class=\"small-caps\">4 hours</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status warning\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">Mya Weastell\n" +
    "                            <span class=\"small-caps\">15 minutes</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status warning\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <i class=\"fa fa-mobile-phone device-status\"></i>\n" +
    "                            Carl Rodriguez\n" +
    "                            <span class=\"small-caps\">20 hours</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status warning\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <i class=\"fa fa-mobile-phone device-status\"></i>\n" +
    "                            Nikita Carter\n" +
    "                            <span class=\"small-caps\">2 minutes</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"static\">OFFLINE USERS</li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status danger\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">Craig Dixon\n" +
    "                            <span class=\"small-caps\">Last seen 2 hours ago</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status danger\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">Mikayla King\n" +
    "                            <span class=\"small-caps\">Last seen yesterday</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status danger\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">Richard Dixon\n" +
    "                            <span class=\"small-caps\">Last seen Feb 20, 2014 05:45:50</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status danger\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">Brenda Fuller\n" +
    "                            <span class=\"small-caps\">Last seen Feb 15, 2014 11:35:50</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\">\n" +
    "                            <span class=\"user-status danger\"></span>\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">Ryan Ortega\n" +
    "                            <span class=\"small-caps\">Last seen Jan 20, 2014 03:45:50</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"tab-pane fade\" id=\"notification-sidebar\">\n" +
    "                <ul class=\"sidebar-menu sidebar-notification\">\n" +
    "                    <li class=\"static\">TODAY</li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Karen Wallace\" data-placement=\"left\">\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <span class=\"activity\">Posted something on your profile page</span>\n" +
    "                            <span class=\"small-caps\">17 seconds ago</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Phillip Lucas\" data-placement=\"left\">\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <span class=\"activity\">Uploaded a photo</span>\n" +
    "                            <span class=\"small-caps\">2 hours ago</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Sandra Myers\" data-placement=\"left\">\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <span class=\"activity\">Commented on your post</span>\n" +
    "                            <span class=\"small-caps\">5 hours ago</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Charles Guerrero\" data-placement=\"left\">\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <span class=\"activity\">Send you a message</span>\n" +
    "                            <span class=\"small-caps\">17 hours ago</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Maria Simpson\" data-placement=\"left\">\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <span class=\"activity\">Change her avatar</span>\n" +
    "                            <span class=\"small-caps\">20 hours ago</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"static\">YESTERDAY</li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Jason Crawford\" data-placement=\"left\">\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <span class=\"activity\">Posted something on your profile page</span>\n" +
    "                            <span class=\"small-caps\">Yesterday 10:45:12</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Cynthia Mendez\" data-placement=\"left\">\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <span class=\"activity\">Uploaded a photo</span>\n" +
    "                            <span class=\"small-caps\">Yesterday 08:00:05</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Peter Ramirez\" data-placement=\"left\">\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <span class=\"activity\">Commented on your post</span>\n" +
    "                            <span class=\"small-caps\">Yesterday 07:49:08</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Jessica Gutierrez\" data-placement=\"left\">\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <span class=\"activity\">Send you a message</span>\n" +
    "                            <span class=\"small-caps\">Yesterday 07:35:19</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"Ryan Ortega\" data-placement=\"left\">\n" +
    "                            <img src=\"assets/images/avatar/avatar.jpg\" class=\"ava-sidebar img-circle\" alt=\"Avatar\">\n" +
    "                            <span class=\"activity\">Change her avatar</span>\n" +
    "                            <span class=\"small-caps\">Yesterday 06:00:00</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"static text-center\">\n" +
    "                        <button class=\"btn btn-primary btn-sm\">See all notifications</button>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"tab-pane fade\" id=\"task-sidebar\">\n" +
    "                <ul class=\"sidebar-menu sidebar-task\">\n" +
    "                    <li class=\"static\">UNCOMPLETED</li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"in progress\" data-placement=\"left\">\n" +
    "                            <i class=\"fa fa-clock-o icon-task-sidebar progress\"></i>\n" +
    "                            Creating documentation\n" +
    "                            <span class=\"small-caps\">Deadline : Next week</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"uncompleted\" data-placement=\"left\">\n" +
    "                            <i class=\"fa fa-exclamation-circle icon-task-sidebar uncompleted\"></i>\n" +
    "                            Eating sand\n" +
    "                            <span class=\"small-caps\">Deadline : 2 hours ago</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"uncompleted\" data-placement=\"left\">\n" +
    "                            <i class=\"fa fa-exclamation-circle icon-task-sidebar uncompleted\"></i>\n" +
    "                            Sending payment\n" +
    "                            <span class=\"small-caps\">Deadline : 2 seconds ago</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"in progress\" data-placement=\"left\">\n" +
    "                            <i class=\"fa fa-clock-o icon-task-sidebar progress\"></i>\n" +
    "                            Uploading new version\n" +
    "                            <span class=\"small-caps\">Deadline : Tomorrow</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"static\">COMPLETED</li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"completed\" data-placement=\"left\">\n" +
    "                            <i class=\"fa fa-check-circle-o icon-task-sidebar completed\"></i>\n" +
    "                            Drinking coffee\n" +
    "                            <span class=\"small-caps\">Completed : 10 hours ago</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"completed\" data-placement=\"left\">\n" +
    "                            <i class=\"fa fa-check-circle-o icon-task-sidebar completed\"></i>\n" +
    "                            Walking to nowhere\n" +
    "                            <span class=\"small-caps\">Completed : Yesterday</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"completed\" data-placement=\"left\">\n" +
    "                            <i class=\"fa fa-check-circle-o icon-task-sidebar completed\"></i>\n" +
    "                            Sleeping under bridge\n" +
    "                            <span class=\"small-caps\">Completed : Feb 10 2014</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#fakelink\" data-toggle=\"tooltip\" title=\"completed\" data-placement=\"left\">\n" +
    "                            <i class=\"fa fa-check-circle-o icon-task-sidebar completed\"></i>\n" +
    "                            Buying some cigarettes\n" +
    "                            <span class=\"small-caps\">Completed : Jan 15 2014</span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"static text-center\">\n" +
    "                        <button class=\"btn btn-success btn-sm\">See all tasks</button>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <!-- /#task-sidebar -->\n" +
    "            <div class=\"tab-pane fade\" id=\"setting-sidebar\">\n" +
    "                <ul class=\"sidebar-menu\">\n" +
    "                    <li class=\"static\">ACCOUNT SETTING</li>\n" +
    "                    <li class=\"text-content\">\n" +
    "                        <div class=\"switch\">\n" +
    "                            <div class=\"onoffswitch blank\">\n" +
    "                                <input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"onlinestatus\" checked>\n" +
    "                                <label class=\"onoffswitch-label\" for=\"onlinestatus\">\n" +
    "                                    <span class=\"onoffswitch-inner\"></span>\n" +
    "                                    <span class=\"onoffswitch-switch\"></span>\n" +
    "                                </label>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        Online status\n" +
    "                    </li>\n" +
    "                    <li class=\"text-content\">\n" +
    "                        <div class=\"switch\">\n" +
    "                            <div class=\"onoffswitch blank\">\n" +
    "                                <input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"offlinecontact\" checked>\n" +
    "                                <label class=\"onoffswitch-label\" for=\"offlinecontact\">\n" +
    "                                    <span class=\"onoffswitch-inner\"></span>\n" +
    "                                    <span class=\"onoffswitch-switch\"></span>\n" +
    "                                </label>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        Show offline contact\n" +
    "                    </li>\n" +
    "                    <li class=\"text-content\">\n" +
    "                        <div class=\"switch\">\n" +
    "                            <div class=\"onoffswitch blank\">\n" +
    "                                <input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"invisiblemode\">\n" +
    "                                <label class=\"onoffswitch-label\" for=\"invisiblemode\">\n" +
    "                                    <span class=\"onoffswitch-inner\"></span>\n" +
    "                                    <span class=\"onoffswitch-switch\"></span>\n" +
    "                                </label>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        Invisible mode\n" +
    "                    </li>\n" +
    "                    <li class=\"text-content\">\n" +
    "                        <div class=\"switch\">\n" +
    "                            <div class=\"onoffswitch blank\">\n" +
    "                                <input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"personalstatus\" checked>\n" +
    "                                <label class=\"onoffswitch-label\" for=\"personalstatus\">\n" +
    "                                    <span class=\"onoffswitch-inner\"></span>\n" +
    "                                    <span class=\"onoffswitch-switch\"></span>\n" +
    "                                </label>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        Show my personal status\n" +
    "                    </li>\n" +
    "                    <li class=\"text-content\">\n" +
    "                        <div class=\"switch\">\n" +
    "                            <div class=\"onoffswitch blank\">\n" +
    "                                <input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"deviceicon\">\n" +
    "                                <label class=\"onoffswitch-label\" for=\"deviceicon\">\n" +
    "                                    <span class=\"onoffswitch-inner\"></span>\n" +
    "                                    <span class=\"onoffswitch-switch\"></span>\n" +
    "                                </label>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        Show my device icon\n" +
    "                    </li>\n" +
    "                    <li class=\"text-content\">\n" +
    "                        <div class=\"switch\">\n" +
    "                            <div class=\"onoffswitch blank\">\n" +
    "                                <input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"logmessages\">\n" +
    "                                <label class=\"onoffswitch-label\" for=\"logmessages\">\n" +
    "                                    <span class=\"onoffswitch-inner\"></span>\n" +
    "                                    <span class=\"onoffswitch-switch\"></span>\n" +
    "                                </label>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        Log all message\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <!-- /#setting-sidebar -->\n" +
    "        </div>\n" +
    "        <!-- /.tab-content -->\n" +
    "    </div>\n" +
    "    <!-- /.sidebar-right -->\n" +
    "    <!-- END SIDEBAR RIGHT -->\n" +
    "\n" +
    "    <!-- BEGIN PAGE CONTENT -->\n" +
    "    <div class=\"page-content\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div ui-view></div>\n" +
    "        </div>\n" +
    "        <!-- /.container-fluid -->\n" +
    "    </div>\n" +
    "    <!-- /.page-content -->\n" +
    "</div>\n" +
    "<!-- /.wrapper -->\n" +
    "<!-- END PAGE CONTENT -->\n" +
    "\n" +
    "<!-- BEGIN BACK TO TOP BUTTON -->\n" +
    "<!-- <div id=\"back-top\">\n" +
    "    <a href=\"#top\"><i class=\"fa fa-chevron-up\"></i></a>\n" +
    "</div> -->\n" +
    "");
}]);

angular.module("layout/web.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("layout/web.tpl.html",
    "<div class=\"wrapper\">\n" +
    "    <!-- BEGIN TOP NAV -->\n" +
    "    <div class=\"top-navbar\">\n" +
    "        <div class=\"top-navbar-inner\">\n" +
    "\n" +
    "            <!-- Begin Logo brand -->\n" +
    "            <div class=\"logo-brand\">\n" +
    "                <a ui-sref=\"web.home\">\n" +
    "                    <img src=\"assets/images/logo.png\" alt=\"Sentir logo\">\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <!-- End Logo brand -->\n" +
    "\n" +
    "            <div class=\"top-nav-content\">\n" +
    "\n" +
    "                <!-- Begin button nav toggle -->\n" +
    "                <div class=\"btn-collapse-nav\" data-toggle=\"collapse\" data-target=\"#main-fixed-nav\">\n" +
    "                    <i class=\"fa fa-plus icon-plus\"></i>\n" +
    "                </div>\n" +
    "                <!-- End button nav toggle -->\n" +
    "\n" +
    "                \n" +
    "                <blockquote class=\"blockquote-reverse\" style=\"margin-top:10px; display: inline-block\">\n" +
    "                    <p>Dar una mano a otro, es ahora mas fácil...</p>\n" +
    "                </blockquote>\n" +
    "            </div>\n" +
    "            <!-- /.top-nav-content -->\n" +
    "        </div>\n" +
    "        <!-- /.top-navbar-inner -->\n" +
    "    </div>\n" +
    "    <!-- /.top-navbar -->\n" +
    "    <!-- END TOP NAV -->\n" +
    "\n" +
    "    <!-- BEGIN TOP MAIN NAVIGATION -->\n" +
    "    <div class=\"top-main-navigation\">\n" +
    "        <nav class=\"navbar square navbar-default no-border\" role=\"navigation\">\n" +
    "            <div class=\"container-fluid\">\n" +
    "                <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "                <div class=\"collapse navbar-collapse\" id=\"top-main-navigation\">\n" +
    "                    <ul class=\"nav navbar-nav\">\n" +
    "                        <li ui-sref-active=\"active\">\n" +
    "                            <a href ui-sref=\"web.home\">\n" +
    "                                <span class=\"glyphicon glyphicon-home\"></span>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "\n" +
    "                        <li ui-sref-active=\"active\">\n" +
    "                            <a href ui-sref=\"web.whyHelp\">\n" +
    "                                por que ayudar?\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        \n" +
    "                        <li ui-sref-active=\"active\">\n" +
    "                            <a href ui-sref=\"web.meetProject\">\n" +
    "                                conoce el proyecto\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "\n" +
    "                        <li ui-sref-active=\"active\">\n" +
    "                            <a href ui-sref=\"web.helpUsToHelp\">\n" +
    "                                ayúdanos a ayudar\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "\n" +
    "                        <li ui-sref-active=\"active\">\n" +
    "                            <a href ui-sref=\"web.successStories\">\n" +
    "                                casos de éxito\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                   \n" +
    "                    <!-- Begin user session nav -->\n" +
    "                    <session-auth></session-auth>\n" +
    "                    \n" +
    "                    <!-- <ul class=\"nav-user navbar-right\">\n" +
    "                        <li class=\"dropdown\">\n" +
    "                            <a href=\"#fakelink\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
    "                                <img src=\"assets/images/avatar/avatar.jpg\" class=\"avatar img-circle\" alt=\"Avatar\">Hi,\n" +
    "                                <strong>Paris Hawker</strong>\n" +
    "                            </a>\n" +
    "                            <ul class=\"dropdown-menu square primary margin-list-rounded with-triangle\">\n" +
    "                                <li><a href=\"#fakelink\">Account setting</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"#fakelink\">Payment setting</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"#fakelink\">Change password</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"#fakelink\">My public profile</a>\n" +
    "                                </li>\n" +
    "                                <li class=\"divider\"></li>\n" +
    "                                <li><a href=\"lock-screen.html\">Lock screen</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"login.html\">Log out</a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </li>\n" +
    "                    </ul> -->\n" +
    "                    <!-- End user session nav -->\n" +
    "\n" +
    "                </div><!-- /.navbar-collapse -->\n" +
    "            </div><!-- /.container-fluid -->\n" +
    "        </nav>\n" +
    "        <!-- End inverse navbar -->\n" +
    "    </div><!-- /.top-main-navigation -->\n" +
    "    <!-- END TOP MAIN NAVIGATION -->\n" +
    "\n" +
    "    <!-- BEGIN PAGE CONTENT -->\n" +
    "    <div class=\"page-content no-left-sidebar\">\n" +
    "        <div class=\"container-fluid\" style=\"margin-top: 50px;\">\n" +
    "            <div ui-view></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <footer>\n" +
    "            &copy; 2014 <a href=\"#\">AyudarEsFacil.org</a>\n" +
    "            <br />Design by <a href=\"http://github.com/ayudaresfacil/ayudaresfacil\" target=\"_blank\">3S</a>.\n" +
    "        </footer>\n" +
    "\n" +
    "    </div>\n" +
    "    <!-- /.page-content -->\n" +
    "</div>\n" +
    "<!-- /.wrapper -->\n" +
    "<!-- END PAGE CONTENT -->");
}]);

angular.module("mail/mail-inbox.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("mail/mail-inbox.tpl.html",
    "<!-- BEGIN MAIL APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "    <div class=\"the-box bg-success no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-8\">\n" +
    "                <h1><i class=\"fa fa-envelope icon-lg icon-circle icon-bordered\"></i> Bandeja de Entrada</h1>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- /.row -->\n" +
    "    </div>\n" +
    "    <div class=\"the-box no-margin\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-4 col-md-3\">\n" +
    "                <div class=\"list-group square no-border\">\n" +
    "                    <a ng-click=\"getAllConversationsFromAllPublications()\" class=\"list-group-item\">Todas las publicaciones <!--<span class=\"badge badge-success\">5</span>--></a>\n" +
    "                    <a ng-click=\"getAllConversationsFromMyPublications()\" class=\"list-group-item\">Mis publicaciones <!--<span class=\"badge badge-info\">11</span>--></a>\n" +
    "                    <a ng-click=\" getAllConversationsFromOthersPublications()\" class=\"list-group-item\">Publicaciones de otros <!--<span class=\"badge badge-warning\">15</span>--></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- /.col-sm-4 col-md-3 -->\n" +
    "            <div class=\"col-sm-8 col-md-9\">\n" +
    "                <div ng-if=\"noConversations\" class=\"alert alert-warning alert-bold-border square fade in alert-dismissable\">\n" +
    "                Todavia no tenés mensajes... Escribe en alguna publicación o haz una nueva publicación, alguién puede necesitarte <strong>más de lo que te imaginas!</strong> :)\n" +
    "                </div>\n" +
    "                <div ng-if=\"conversations\" class=\"list-group success square no-side-border\" ng-repeat=\"conversation in conversations\">\n" +
    "                    <a ng-click=\"openConversation({publicationId:conversation.publication.id,conversationId:conversation.conversationId})\" class=\"list-group-item mail-list\" ng-class=\"(conversation.commonState == 'L') ? 'list-group-item mail-list read' : ''\">\n" +
    "                        <!--<span class=\"favorite fa fa-star\"></span>-->\n" +
    "                        <img data-ng-src=\"{{conversation.userFrom.profileImage}}\" class=\"avatar img-circle\" alt=\"Avatar\">\n" +
    "                        <span class=\"name\">{{conversation.userFrom.name}}</span>\n" +
    "                        <span class=\"subject\">{{conversation.text}}</span>\n" +
    "                        <span class=\"time\">{{conversation.createDate}}</span>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- /.col-sm-8 col-md-9 -->\n" +
    "        </div>\n" +
    "        <!-- /.row -->\n" +
    "    </div>\n" +
    "    <!-- /.the-box -->\n" +
    "</div>\n" +
    "<!-- /.mail-apps-wrap -->\n" +
    "<!-- END MAIL APPS INBOX -->\n" +
    "");
}]);

angular.module("mail/mail-read.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("mail/mail-read.tpl.html",
    "<!-- BEGIN MAIL APPS READ MAIL -->\n" +
    "<div class=\"mail-apps-wrap\" id=\"modal-messages-container\">\n" +
    "    <div class=\"the-box bg-success no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-8\">\n" +
    "                <h2><i class=\"fa fa-comments icon-circle icon-bordered\"></i> Conversación</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- /.row -->\n" +
    "    </div>\n" +
    "    <div class=\"the-box no-margin\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <!-- BEGIN CHAT -->\n" +
    "                <div class=\"the-box no-border\">\n" +
    "                    <div ng-if=\"noMessages\" class=\"alert alert-warning alert-bold-border square fade in alert-dismissable\">\n" +
    "                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>\n" +
    "                    Todavia no tenés mensajes... Escribe en alguna publicación o haz una nueva publicación, alguién puede necesitarte <strong>más de lo que te imaginas!</strong> :)\n" +
    "                    </div>\n" +
    "                    <h4 class=\"medium-heading more-margin-bottom\">Conversación de \"{{publication.title}}\"</h4>\n" +
    "                    <div class=\"chat-wrap scroll-chat-widget\" id=\"container-messages\">\n" +
    "                        <ul class=\"media-list media-xs media-dotted media-chat\" >\n" +
    "                            <div ng-repeat=\"message in messages\" >\n" +
    "                                <li class=\"media\">\n" +
    "                                    <a ng-class=\"(message.userFrom.id==user.id) ? 'pull-left' : 'pull-right'\">\n" +
    "                                        <img class=\"media-object img-circle\" data-ng-src=\"{{message.userFrom.profileImage}}\" alt=\"Avatar\">\n" +
    "                                    </a>\n" +
    "                                    <div class=\"media-body\" ng-class=\"(message.userFrom.id==user.id) ? 'me' : ''\">\n" +
    "                                        <p class=\"name\" >\n" +
    "                                            <small>{{message.userFrom.name}}</small>\n" +
    "                                        </p>\n" +
    "                                        <p class=\"small\">{{message.text}}</p>\n" +
    "                                        <p class=\"small\">\n" +
    "                                            <small>{{message.createDate}}</small>\n" +
    "                                        </p>\n" +
    "                                    </div>\n" +
    "                                </li>\n" +
    "                            </div>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <!-- /.chat-wrap -->\n" +
    "                    <div class=\"action-chat\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-8\">\n" +
    "                                <form role=\"form\">\n" +
    "                                    <div class=\"form-group\">\n" +
    "                                        <input id=\"inputText\" ng-keypress=\"$event.keyCode == 13 ? saveMessage() : null\" type=\"text\" class=\"form-control\" placeholder=\"Escribe un mensaje y presiona enter\">\n" +
    "                                    </div>\n" +
    "                                </form>\n" +
    "                            </div>\n" +
    "                            <!-- /.col-xs-8 -->\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <a data-toggle=\"tooltip\" ng-click=\"saveMessage()\" title=\"Enviar Mensaje\" class=\"btn btn-sm btn-success\"><i class=\"fa fa-send\"></i></a>\n" +
    "                                    <a data-toggle=\"tooltip\" ng-click=\"getConversation()\" title=\"Actualizar\" class=\"btn btn-sm btn-info\"><i class=\"fa fa-refresh\"></i></a>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <!-- /.col-xs-8 -->\n" +
    "                        </div>\n" +
    "                        <!-- /.row -->\n" +
    "                    </div>\n" +
    "                    <!-- /.action -->\n" +
    "                </div>\n" +
    "                <!-- /.the-box .no-border -->\n" +
    "                <!-- END CHAT -->\n" +
    "\n" +
    "            </div>\n" +
    "            <!-- /.col-sm-8 col-md-9 -->\n" +
    "        </div>\n" +
    "        <!-- /.row -->\n" +
    "    </div>\n" +
    "    <!-- /.the-box -->\n" +
    "</div>\n" +
    "<!-- /.mail-apps-wrap -->\n" +
    "<!-- END MAIL APPS READ MAIL -->\n" +
    "");
}]);

angular.module("offer/offer-create.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer-create.tpl.html",
    "<div class=\"mail-apps-wrap\">\n" +
    "\n" +
    "    <div class=\"the-box bg-danger no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-gift icon-lg icon-circle icon-bordered\"></i> Crear ofrecimiento</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"the-box no-border\">\n" +
    "        <form name=\"myForm\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-8\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input type=\"text\" maxlength=\"30\" class=\"form-control input-md\" name=\"title\" ng-model=\"offer.title\" placeholder=\"Un titulo para la publicación\" ng-required=\"true\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <textarea class=\"form-control input-md\" name=\"description\" ng-model=\"offer.description\" rows=\"20\" ng-required=\"true\" placeholder=\"Un lugar para que te expreses..\"></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Contá todos los detalles</label>\n" +
    "                        <p class=\"help-block\"><small>Mientras más claro seas para contar tu situación mejores resultados vas a obtener.</small>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Categoria</label>\n" +
    "                        <select ng-model=\"offer.categoryId\" name=\"categoryId\" class=\"form-control input-md\" ng-change=\"getSubcategories(offer.categoryId);\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option ng-repeat=\"category in categories\" value=\"{{category.id}}\" ng-selected=\"offer.categoryId == category.id\" data-ng-if=\"category.id != '9'\">{{category.description}}</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Subcategoría</label>\n" +
    "                        <select ng-model=\"offer.subcategoryId\" class=\"form-control input-md\" ng-change=\"getObjects(offer.categoryId, offer.subcategoryId);\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option ng-repeat=\"subcategory in subcategories\" value=\"{{subcategory.id}}\" ng-selected=\"offer.subcategoryId == subcategory.id\">{{subcategory.description}}</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Objeto ofrecido</label>\n" +
    "                        <select ng-model=\"offer.objectId\" class=\"form-control input-md\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option ng-repeat=\"object in objects\" value=\"{{object.id}}\" ng-selected=\"offer.objectId == object.id\">{{object.description}}</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div ng-if=\"offer.categoryId == '9'\" class=\"form-group\">\n" +
    "                            <label class=\"hidden-xs\">Cantidad de dinero a ofrecer</label>\n" +
    "                            <input type=\"text\" class=\"form-control input-md\" name=\"cantidad\" ng-model=\"offer.quantity\" placeholder=\"Ingrese la suma sin signos / ej.: 1000000\" ng-required=\"true\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Fecha de expiración</label>\n" +
    "                        <div style=\"display:inline-block;\">\n" +
    "                            <p class=\"input-group\">\n" +
    "                                <input type=\"text\" datepicker-popup=\"yyyy-MM-dd\" class=\"form-control input-md\" ng-model=\"offer.expirationDate\" name=\"expirationDate\" ng-required=\"true\" show-weeks=\"false\" is-open=\"opened\" date-disabled=\"disabled(date, mode)\" show-button-bar=\"false\" />\n" +
    "                                <span class=\"input-group-btn\">\n" +
    "                                        <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\">\n" +
    "                                            <i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "                                        </button>\n" +
    "                                    </span>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Imagenes</label>\n" +
    "                        <input type=\"file\" name=\"file[]\" id=\"inputFile\" multiple required/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <hr/>\n" +
    "                <p class=\"text-center\">\n" +
    "                    <button ng-click=\"submitForm(myForm.$valid)\" class=\"btn btn-success\" type=\"submit\"><i class=\"glyphicon glyphicon-ok\" ng-disabled=\"myForm.$invalid\"></i>{{btnText}}</button>\n" +
    "                    <button ui-sref=\"web.offerList\" class=\"btn btn-danger\"><i class=\"glyphicon glyphicon-remove\"></i>Cancelar</button>\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("offer/offer-detail-user.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer-detail-user.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "\n" +
    "    <div class=\"the-box bg-danger no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-gift icon-lg icon-circle icon-bordered\"></i> Detalle del ofrecimiento</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"the-box no-border\" ng-repeat=\"offer in offers\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-4 col-sm-6\">\n" +
    "                <carousel interval=\"myInterval\" style=\"height:350px\">\n" +
    "                    <slide ng-repeat=\"slide in offer.image\" active=\"slide.active\">\n" +
    "                        <img ng-src=\"{{slide.path}}\" style=\"margin:auto;\">\n" +
    "                    </slide>\n" +
    "                </carousel>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-md-8 col-sm-6\">\n" +
    "                <h2 class=\"medium-heading more-margin-bottom text-primary\">\n" +
    "                    {{offer.title}}\n" +
    "                </h2>\n" +
    "\n" +
    "                <p style=\"margin-top: -10px;\">\n" +
    "                    <small>\n" +
    "                        <span class=\"glyphicon glyphicon-heart\"></span> Favoritos: {{offer.favorites[0].quan}}\n" +
    "                    </small>\n" +
    "                </p>\n" +
    "                \n" +
    "                <p>\n" +
    "                    <span ng-if=\"request.processState.id == 'P'\" class=\"badge badge-info\">Publicación Pausada</span>\n" +
    "                </p>\n" +
    "\n" +
    "                <p>\n" +
    "                    <span ng-if=\"request.processState.id == 'C'\" class=\"badge badge-success\">Objetivo Cumplido</span>\n" +
    "                </p>\n" +
    "\n" +
    "                <p>\n" +
    "                    {{offer.description}}\n" +
    "                </p>\n" +
    "\n" +
    "                <blockquote>\n" +
    "                    <p>{{offer.type.description}}</p>\n" +
    "                    <small>{{offer.type.comment}}</small>\n" +
    "                </blockquote>\n" +
    "\n" +
    "                <div class=\"panel-group\">\n" +
    "                    <div class=\"panel panel-default\">\n" +
    "                        <div class=\"panel-body\">\n" +
    "                            <h4>{{offer.object.description}}</h4>\n" +
    "                            <p>\n" +
    "                                {{offer.category.description}} > {{offer.subcategory.description}}\n" +
    "                            </p>\n" +
    "                            <p ng-if=\"offer.quantity == '1'\">\n" +
    "                                Disponible: <strong>{{offer.quantity}}</strong>\n" +
    "                            </p>\n" +
    "                            <p ng-if=\"offer.quantity != '1'\">\n" +
    "                                Disponible: <strong><span id=\"currency-default\">{{ offer.quantity | currency}}</span></strong>\n" +
    "                                <br>\n" +
    "                            </p>\n" +
    "                            </p>\n" +
    "                            <p>Visto:\n" +
    "                                <strong>{{offer.views}}</strong> veces</p>\n" +
    "                            <p>Vencimiento:\n" +
    "                                <strong>{{offer.expirationDate}}</strong>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "");
}]);

angular.module("offer/offer-detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer-detail.tpl.html",
    "<h1 class=\"page-heading\">Ofrecimientos\n" +
    "    <small>Detalle del ofrecimiento</small>\n" +
    "</h1>\n" +
    "\n" +
    "<ol class=\"breadcrumb default square rsaquo sm\">\n" +
    "    <li>\n" +
    "        <a href=\"index.html\"><i class=\"fa fa-home\"></i></a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "        <a href=\"index.html#/ofrecimientos\">Ofrecimientos</a>\n" +
    "    </li>\n" +
    "    <li class=\"active\">Ver Detalle</li>\n" +
    "</ol>\n" +
    "\n" +
    "<div class=\"the-box no-border\" ng-repeat=\"offer in offers\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4 col-sm-6\">\n" +
    "            <carousel interval=\"myInterval\" style=\"height:350px\">\n" +
    "                <slide ng-repeat=\"slide in offer.image\" active=\"slide.active\">\n" +
    "                    <img ng-src=\"{{slide.path}}\" style=\"margin:auto;\">\n" +
    "                </slide>\n" +
    "            </carousel>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-8 col-sm-6\">\n" +
    "            <h2 class=\"medium-heading more-margin-bottom text-primary\">\n" +
    "                {{offer.title}}\n" +
    "                 <a href ng-if=\"offer.isOwner == '0'\" class=\"pull-right\" ng-click=\"toggleFavorite()\" title=\"Favorito\">\n" +
    "                    <i class=\"glyphicon glyphicon-heart text-muted\"  ng-class=\"{'text-warning': offer.isFavorite == '1'}\"></i>\n" +
    "                </a>\n" +
    "            </h2>\n" +
    "            \n" +
    "            <p>\n" +
    "                <span ng-if=\"offer.processState.id == 'P'\" class=\"badge badge-info\">Publicación Pausada</span>\n" +
    "            </p>\n" +
    "\n" +
    "            <p>\n" +
    "                <small>\n" +
    "                    <span class=\"glyphicon glyphicon-heart\"></span> Favoritos: {{offer.favorites[0].quan}}\n" +
    "                </small>\n" +
    "            </p>\n" +
    "\n" +
    "            <p>\n" +
    "                {{offer.description}}\n" +
    "            </p>\n" +
    "\n" +
    "            <blockquote>\n" +
    "                <p>{{offer.type.description}}</p>\n" +
    "                <small>{{offer.type.comment}}</small>\n" +
    "            </blockquote>\n" +
    "\n" +
    "            <div class=\"panel-group\">\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <h4>{{offer.object.description}}</h4>\n" +
    "                        <p>\n" +
    "                            {{offer.category.description}} > {{offer.subcategory.description}}\n" +
    "                        </p>\n" +
    "                        Disponible: <strong>{{offer.quantity}}</strong>\n" +
    "                        </p>\n" +
    "                        <p>Visto:\n" +
    "                            <strong>{{offer.views}}</strong> veces</p>\n" +
    "                        <p>Vencimiento:\n" +
    "                            <strong>{{offer.expirationDate}}</strong>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-10 col-xs-6\">\n" +
    "                    <button ng-if=\"offer.isOwner == '0'\" class=\"btn btn-success btn-lg\" ng-click=\"openConversation({publicationId:offer.id})\">\n" +
    "                        <span class=\"fa fa-envelope\"></span> Envíale un mensaje\n" +
    "                    </button>\n" +
    "\n" +
    "                    <a href=\"#/checkout/offer/{{offer.id}}\" ng-if=\"offer.processState.id == 'V' && offer.isOwner == '0'\" class=\"btn btn-danger btn-lg\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok\"></span> Lo necesito</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("offer/offer-edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer-edit.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "\n" +
    "    <div class=\"the-box bg-danger no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-gift icon-lg icon-circle icon-bordered\"></i> Editar ofrecimiento</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"the-box no-border\">\n" +
    "        <form name=\"myForm\" ng-repeat=\"offer in offers\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-8\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input type=\"text\" maxlength=\"30\" class=\"form-control input-md\" name=\"title\" ng-model=\"offer.title\" ng-required=\"true\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <textarea class=\"form-control input-md\" name=\"description\" ng-model=\"offer.description\" rows=\"20\" ng-required=\"true\"></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Contá todos los detalles</label>\n" +
    "                        <p class=\"help-block\"><small>Mientras más claro seas para contar tu situación mejores resultados vas a obtener.</small>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Estado: </label><span class=\"label label-warning pull-right\">{{offer.processState.description}}</span>\n" +
    "                        <select ng-model=\"offer.processStateId\" class=\"form-control input-md\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option value=\"C\">Cerrado</option>\n" +
    "                            <option value=\"P\">Pausado</option>\n" +
    "                            <option value=\"V\">Vigente</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Categoria: </label><span class=\"label label-warning pull-right\">{{offer.category.description}}</span>\n" +
    "                        <select ng-model=\"offer.categoryId\" name=\"categoryId\" class=\"form-control input-md\" ng-change=\"getSubcategories(offer.categoryId);\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option ng-repeat=\"category in categories\" value=\"{{category.id}}\" ng-selected=\"offer.categoryId == category.id\" data-ng-if=\"category.id != '9'\">{{category.description}}</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Subcategoría: </label><span class=\"label label-warning pull-right\">{{offer.subcategory.description}}</span>\n" +
    "                        <select ng-model=\"offer.subcategoryId\" class=\"form-control input-md\" ng-change=\"getObjects(offer.categoryId, offer.subcategoryId);\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option ng-repeat=\"subcategory in subcategories\" value=\"{{subcategory.id}}\" ng-selected=\"offer.subcategoryId == subcategory.id\">{{subcategory.description}}</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Objeto ofrecido: </label><span class=\"label label-warning pull-right\">{{offer.object.description}}</span>\n" +
    "                        <select ng-model=\"offer.objectId\" class=\"form-control input-md\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option ng-repeat=\"object in objects\" value=\"{{object.id}}\" ng-selected=\"offer.objectId == object.id\">{{object.description}}</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Fecha de expiración</label>\n" +
    "                        <div style=\"display:inline-block;\">\n" +
    "                            <p class=\"input-group\">\n" +
    "                                <input type=\"text\" datepicker-popup=\"yyyy-MM-dd\" class=\"form-control input-md\" ng-model=\"offer.expirationDate\" name=\"expirationDate\" ng-required=\"true\" show-weeks=\"false\" is-open=\"opened\" date-disabled=\"disabled(date, mode)\" show-button-bar=\"false\" />\n" +
    "                                <span class=\"input-group-btn\">\n" +
    "                                    <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\">\n" +
    "                                        <i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "                                    </button>\n" +
    "                                </span>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- <div class=\"form-group\">\n" +
    "                        <label>Imagenes</label>\n" +
    "                        <input type=\"text\" ng-if=\"(offer.image).length == '0' \" class=\"form-control input-md\" name=\"path\" ng-model=\"image.path\" ng-required=\"true\">\n" +
    "                        <input type=\"text\" ng-repeat=\"image in offer.image\" class=\"form-control input-md\" name=\"path\" ng-model=\"image.path\" ng-required=\"true\">\n" +
    "                    </div> -->\n" +
    "                    <!--<input type=\"file\" ng-model=\"offer.fname\" ng-file-select=\"onFileSelect($files)\" >-->\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-12\">\n" +
    "                        <hr/>\n" +
    "                        <p class=\"text-center\">\n" +
    "                            <button ng-click=\"submitFormEdit(myForm.$valid)\" class=\"btn btn-success\" type=\"submit\"><i class=\"glyphicon glyphicon-ok\" ng-disabled=\"myForm.$invalid\"></i>{{btnText}}</button>\n" +
    "                            <button ui-sref=\"panel.offerListUser\" class=\"btn btn-danger\"><i class=\"glyphicon glyphicon-remove\"></i>Cancelar</button>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "");
}]);

angular.module("offer/offer-favorites.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer-favorites.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "\n" +
    "    <div class=\"the-box bg-danger no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-gift icon-lg icon-circle icon-bordered\"></i> Ofrecimientos favoritos</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container-masonry\">\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in alert-dismissable\" ng-show=\"activating\">\n" +
    "        <strong>Hey!</strong> Todavía no tienes favoritos..\n" +
    "    </div>\n" +
    "    <ol>\n" +
    "        <li class=\"item-masonry\" ng-repeat=\"offer in offers\">\n" +
    "            <div ng-if=\"offer.isFavorite == '1'\" class=\"the-box no-border full store-item text-center mansory-inner\">\n" +
    "\n" +
    "                <img data-ng-src=\"{{offer.image[0].path}}\" class=\"item-image\" alt=\"Image\" ui-sref=\"web.offerDetail({id: offer.id})\">\n" +
    "\n" +
    "                <div class=\"the-box bg-default no-margin no-border item-des\">\n" +
    "                    <p class=\"text-muted\">\n" +
    "                        {{offer.object.description}}\n" +
    "                    </p>\n" +
    "\n" +
    "                    <h3><a class=\"bolded\" ui-sref=\"web.offerDetail({id: offer.id})\">{{offer.title}}</a>\n" +
    "                        </h3>\n" +
    "\n" +
    "                    <p>{{offer.description}}</p>\n" +
    "\n" +
    "                    <p>{{message}}</p>\n" +
    "\n" +
    "                    <a href=\"#/checkout/offer/{{offer.id}}\" ng-if=\"offer.processState.id == 'V' &&  offer.isOwner == '0'\" class=\"btn btn-danger btn-block\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok\"></span>Lo necesito\n" +
    "                    </a>\n" +
    "\n" +
    "                    <div class=\"row extra-data\">\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-left\">\n" +
    "                            <a href ng-click=\"toggleFavorite()\" title=\"Favorito\">\n" +
    "                                <i class=\"glyphicon glyphicon-heart text-muted\" ng-class=\"{'text-warning': offer.isFavorite == '1'}\"></i>\n" +
    "                            </a>\n" +
    "                            {{offer.favorites[0].quan}}\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-right\">\n" +
    "                            <i class=\"glyphicon glyphicon-eye-open text-muted\"></i> {{offer.views}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "</div>\n" +
    "");
}]);

angular.module("offer/offer-list-user.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer-list-user.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "\n" +
    "    <div class=\"the-box bg-danger no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-gift icon-lg icon-circle icon-bordered\"></i> Mis ofrecimientos</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container-masonry\">\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in alert-dismissable\" ng-show=\"activating\">\n" +
    "        <strong>Hey!</strong> Todavía no has creado ningún ofrecimiento..\n" +
    "    </div>\n" +
    "    <ol>\n" +
    "        <li ng-if=\"offer.isOwner == '1'\" class=\"item-masonry\" ng-repeat=\"offer in offers\">\n" +
    "            <div class=\"the-box no-border full store-item text-center mansory-inner\">\n" +
    "\n" +
    "                <img ng-src=\"{{offer.image[0].path}}\" class=\"item-image\" alt=\"Image\" ui-sref=\"panel.offerDetailUser({id: offer.id})\">\n" +
    "\n" +
    "                <div class=\"the-box bg-default no-margin no-border item-des\">\n" +
    "                    <div class=\"pull-right\">\n" +
    "                        <a href ng-click=\"offerDelete(offer.id)\" title=\"Dar de baja\">\n" +
    "                            <i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "                        </a> |\n" +
    "                        <a href ui-sref=\"panel.offerEdit({id: offer.id})\" title=\"Editar\">\n" +
    "                            <i class=\"glyphicon glyphicon-pencil\"></i>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <p class=\"text-muted text-left\">\n" +
    "                        {{offer.object.description}}\n" +
    "                    </p>\n" +
    "\n" +
    "                    <h3><a class=\"bolded\" ui-sref=\"panel.offerDetailUser({id: offer.id})\">{{offer.title}}</a>\n" +
    "                        </h3>\n" +
    "\n" +
    "                    <p>{{offer.description}}</p>\n" +
    "\n" +
    "                    <!-- <p>{{message}}</p> -->\n" +
    "\n" +
    "                    <a href=\"#/checkout/offer/{{offer.id}}\" ng-if=\"offer.processState.id == 'V' &&  offer.isOwner == '0'\" class=\"btn btn-danger btn-block\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok\"></span>Lo necesito\n" +
    "                    </a>\n" +
    "\n" +
    "                    <div class=\"row extra-data\">\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-left\">\n" +
    "                            <a href ng-click=\"toggleFavorite()\" title=\"Favorito\">\n" +
    "                                <i class=\"glyphicon glyphicon-heart text-muted\" ng-class=\"{'text-warning': offer.isFavorite == '1'}\"></i>\n" +
    "                            </a>\n" +
    "                            {{offer.favorites[0].quan}}\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-right\">\n" +
    "                            <i class=\"glyphicon glyphicon-eye-open text-muted\"></i> {{offer.views}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "</div>\n" +
    "");
}]);

angular.module("offer/offer-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer-list.tpl.html",
    "<div class=\"container-fluid\">\n" +
    "    <h1 class=\"page-heading\">Ofrecimientos\n" +
    "        <small>Busca aquello que estas necesitando y pidelo!</small>\n" +
    "    </h1>\n" +
    "\n" +
    "    <ol class=\"breadcrumb default square rsaquo sm\">\n" +
    "        <li>\n" +
    "            <a href=\"index.html\"><i class=\"fa fa-home\"></i></a>\n" +
    "        </li>\n" +
    "        <li class=\"active\">Ofrecimientos</li>\n" +
    "    </ol>\n" +
    "\n" +
    "    <div class=\"container-masonry\">\n" +
    "        <ol>\n" +
    "            <li class=\"item-masonry\" ng-repeat=\"offer in offers\">\n" +
    "                <div class=\"the-box no-border full store-item text-center mansory-inner\">\n" +
    "                    <img data-ng-src=\"{{offer.image[0].path}}\" class=\"item-image\" alt=\"Image\" ui-sref=\"web.offerDetail({id: offer.id})\">\n" +
    "\n" +
    "                    <div class=\"the-box bg-default no-margin no-border item-des\">\n" +
    "                        <p class=\"text-muted\">\n" +
    "                            {{offer.object.description}}\n" +
    "                        </p>\n" +
    "\n" +
    "                        <h3><a class=\"bolded\" ui-sref=\"web.offerDetail({id: offer.id})\">{{offer.title}}</a>\n" +
    "                        </h3>\n" +
    "\n" +
    "                        <p>{{offer.description}}</p>\n" +
    "\n" +
    "                        <p>{{message}}</p>\n" +
    "\n" +
    "                        <a href=\"#/checkout/offer/{{offer.id}}\" ng-if=\"offer.processState.id == 'V' && offer.isOwner == '0'\" class=\"btn btn-danger btn-block\">\n" +
    "                            <span class=\"glyphicon glyphicon-ok\"></span>Lo necesito\n" +
    "                        </a>\n" +
    "\n" +
    "                        <div class=\"row extra-data\">\n" +
    "                            <div class=\"col-md-6 col-xs-6 text-left\">\n" +
    "                                <a href ng-click=\"toggleFavorite()\" title=\"Favorito\">\n" +
    "                                    <i class=\"glyphicon glyphicon-heart text-muted\" ng-class=\"{'text-warning': offer.isFavorite == '1'}\"></i>\n" +
    "                                </a>\n" +
    "                                {{offer.favorites[0].quan}}\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-6 col-xs-6 text-right\">\n" +
    "                                <i class=\"glyphicon glyphicon-eye-open text-muted\"></i> {{offer.views}}\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </ol>\n" +
    "    </div>\n" +
    "");
}]);

angular.module("offer/offer-needs-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer-needs-list.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "\n" +
    "    <div class=\"the-box bg-primary no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-gift icon-lg icon-circle icon-bordered\"></i> Mis Necesidades</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container-masonry\">\n" +
    "<div class=\"alert alert-warning alert-bold-border fade in alert-dismissable\" ng-show=\"activating\">\n" +
    "        <strong>Hey!</strong> No has pedido nada todavía.Podés ver si algún ofrecimiento, en el listado de publicaciones puede ser útil!\n" +
    "    </div>\n" +
    "    <ol>\n" +
    "        <li class=\"item-masonry\" ng-repeat=\"offer in offers\">\n" +
    "            <div class=\"the-box no-border full store-item text-center mansory-inner\">\n" +
    "\n" +
    "                <img data-ng-src=\"{{offer.image[0].path}}\" class=\"item-image\" alt=\"Image\" ui-sref=\"panel.offerDetailUser({id: offer.id})\">\n" +
    "\n" +
    "                <div class=\"the-box bg-default no-margin no-border item-des\">\n" +
    "\n" +
    "                    <p class=\"text-muted text-left\">\n" +
    "                       {{offer.object.description}}\n" +
    "                    </p>\n" +
    "                    <div ng-if=\"offer.processState.id=='C'\" >\n" +
    "                        <p><span class=\"badge badge-success\">Ayuda concretada!</span></p>\n" +
    "                    </div>\n" +
    "                    <div ng-if=\"offer.processState.id=='P'\" >\n" +
    "                        <p><span class=\"badge badge-info\">Esperando que la ayuda se concrete</span></p>\n" +
    "                    </div>\n" +
    "                    <div ng-if=\"offer.processState.id=='V'\" >\n" +
    "                        <p><span class=\"badge badge-danger\">Ayuda no concretada</span></p>\n" +
    "                    </div>\n" +
    "                    <h3>\n" +
    "                        <a class=\"bolded\" ui-sref=\"panel.offerDetailUser({id: offer.id})\">{{offer.title}}</a>\n" +
    "                    </h3>\n" +
    "\n" +
    "                    <div class=\"row extra-data\">\n" +
    "                        <div ng-if=\"offer.processState.id=='C'\" >\n" +
    "                            <p class=\"text-muted text-left\">Que bueno que hayas conseguido lo que necesitabas!. Esperamos que puedas seguir colaborando a diferentes causas. Hasta la próxima.</p>\n" +
    "                        </div>\n" +
    "                        <div ng-if=\"offer.processState.id=='P'\" >\n" +
    "                            <p class=\"text-muted text-left\">Podrás ver que sucedió con tu pedido en este lugar. Recuerda enviar mensajes a la persona que tiene lo que necesitas!.</p>\n" +
    "                        </div>\n" +
    "                        <div ng-if=\"offer.processState.id=='V'\" >\n" +
    "                            <p class=\"text-muted text-left\">Lamentablemente, el usuario ha decidido seguir con el ofrecimiento... Igualmente no desesperes! Buscá en los otros ofrecimientos, quién te dice y aparece algo mucho mejor.</p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "</div>\n" +
    "");
}]);

angular.module("offer/offer-request-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("offer/offer-request-list.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "\n" +
    "    <div class=\"the-box bg-danger no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-gift icon-lg icon-circle icon-bordered\"></i> Pedidos de mis ofrecimientos</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container-masonry\">\n" +
    "    <ol>\n" +
    "        <li ng-if=\"offer.isOwner == '1'\" class=\"item-masonry\" ng-repeat=\"offer in offers\">\n" +
    "            <div class=\"the-box no-border full store-item text-center mansory-inner\">\n" +
    "\n" +
    "                <img ng-src=\"{{offer.image[0].path}}\" class=\"item-image\" alt=\"Image\" ui-sref=\"panel.offerDetailUser({id: offer.id})\">\n" +
    "\n" +
    "                <div class=\"the-box bg-default no-margin no-border item-des\">\n" +
    "                    <div class=\"pull-right\">\n" +
    "                        <a href ng-click=\"offerDelete(offer.id)\" title=\"Dar de baja\">\n" +
    "                            <i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "                        </a> |\n" +
    "                        <a href ui-sref=\"panel.offerEdit({id: offer.id})\" title=\"Editar\">\n" +
    "                            <i class=\"glyphicon glyphicon-pencil\"></i>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <p class=\"text-muted\">\n" +
    "                        {{offer.object.description}}\n" +
    "                    </p>\n" +
    "\n" +
    "                    <h3><a class=\"bolded\" ui-sref=\"panel.offerDetailUser({id: offer.id})\">{{offer.title}}</a>\n" +
    "                        </h3>\n" +
    "\n" +
    "                    <p>{{offer.description}}</p>\n" +
    "\n" +
    "                    <p>{{message}}</p>\n" +
    "\n" +
    "                    <a href=\"#/checkout/offer/{{offer.id}}\" ng-if=\"offer.processState.id == 'V' &&  offer.isOwner == '0'\" class=\"btn btn-danger btn-block\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok\"></span>Lo necesito\n" +
    "                    </a>\n" +
    "\n" +
    "                    <div class=\"row extra-data\">\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-left\">\n" +
    "                            <a href ng-click=\"toggleFavorite()\" title=\"Favorito\">\n" +
    "                                <i class=\"glyphicon glyphicon-heart text-muted\" ng-class=\"{'text-warning': offer.isFavorite == '1'}\"></i>\n" +
    "                            </a>\n" +
    "                            {{offer.favorites[0].quan}}\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-right\">\n" +
    "                            <i class=\"glyphicon glyphicon-eye-open text-muted\"></i> {{offer.views}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "</div>\n" +
    "");
}]);

angular.module("request/request-create.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("request/request-create.tpl.html",
    "<div class=\"mail-apps-wrap\">\n" +
    "    <div class=\"the-box bg-warning no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-bullhorn icon-lg icon-circle icon-bordered\"></i> Crear pedido</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"the-box no-border\">\n" +
    "        <form name=\"myForm\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-8\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input type=\"text\" class=\"form-control input-md\" name=\"title\" ng-model=\"request.title\" placeholder=\"Un titulo para la publicación\" ng-required=\"true\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <textarea class=\"form-control input-md\" name=\"description\" ng-model=\"request.description\" rows=\"20\" ng-required=\"true\" placeholder=\"Un lugar para que te expreses..\"></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <label>Contá todos los detalles</label>\n" +
    "                            <p class=\"help-block\"><small>Mientras más claro seas para contar tu situación mejores resultados vas a obtener.</small>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <label class=\"hidden-xs\">Categoria</label>\n" +
    "                            <select ng-model=\"request.categoryId\" name=\"categoryId\" class=\"form-control input-md\" ng-change=\"getSubcategories(request.categoryId);\" ng-select=\"request.categoryId[1]\" required>\n" +
    "                                <option value=\"\">-- Elige una opción --</option>\n" +
    "                                <option ng-repeat=\"category in categories\" value=\"{{category.id}}\" ng-selected=\"request.categoryId == category.id\">{{category.description}}</option>\n" +
    "                            </select>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <label class=\"hidden-xs\">Subcategoría</label>\n" +
    "                            <select ng-model=\"request.subcategoryId\" class=\"form-control input-md\" ng-change=\"getObjects(request.categoryId, request.subcategoryId);\" required>\n" +
    "                                <option value=\"\">-- Elige una opción --</option>\n" +
    "                                <option ng-repeat=\"subcategory in subcategories\" value=\"{{subcategory.id}}\" ng-selected=\"request.subcategoryId == subcategory.id\">{{subcategory.description}}</option>\n" +
    "                            </select>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <label class=\"hidden-xs\">Objeto a pedir</label>\n" +
    "                            <select ng-model=\"request.objectId\" class=\"form-control input-md\" required>\n" +
    "                                <option value=\"\">-- Elige una opción --</option>\n" +
    "                                <option ng-repeat=\"object in objects\" value=\"{{object.id}}\" ng-selected=\"request.objectId == object.id\">{{object.description}}</option>\n" +
    "                            </select>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div ng-if=\"request.categoryId == '9'\" class=\"form-group\">\n" +
    "                                <label class=\"hidden-xs\">Cantidad de dinero necesario</label>\n" +
    "                                <input type=\"text\" class=\"form-control input-md\" name=\"cantidad\" ng-model=\"request.quantity\" placeholder=\"Ingrese la suma sin signos / ej.: 1000000\" ng-required=\"true\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <label>Fecha de expiración</label>\n" +
    "                            <div style=\"display:inline-block;\">\n" +
    "                                <p class=\"input-group\">\n" +
    "                                    <input type=\"text\" datepicker-popup=\"yyyy-MM-dd\" class=\"form-control input-md\" ng-model=\"request.expirationDate\" name=\"expirationDate\" ng-required=\"true\" show-weeks=\"false\" is-open=\"opened\" date-disabled=\"disabled(date, mode)\" show-button-bar=\"false\" />\n" +
    "                                    <span class=\"input-group-btn\">\n" +
    "                                        <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\">\n" +
    "                                            <i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "                                        </button>\n" +
    "                                    </span>\n" +
    "                                </p>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Imagenes</label>\n" +
    "                        <input type=\"file\" name=\"file[]\" id=\"inputFile\" multiple required/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Un padrino para la publicación\n" +
    "                            <button ng-click=\"addInput()\" class=\"btn btn-success btn-xs\">\n" +
    "                                <span class=\"glyphicon glyphicon-plus\">\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"deleteInput($index)\" class=\"btn btn-success btn-xs\">\n" +
    "                                <span class=\"glyphicon glyphicon-minus\">\n" +
    "                            </button>\n" +
    "                        </label>\n" +
    "                        <p class=\"bg-danger\">{{msgSponsor}}</p>\n" +
    "                        <div ng-repeat=\"item in likedLabels\">\n" +
    "                            <input class=\"form-control input-md\" name=\"label\" ng-model=\"item.label\" ng-required=\"true\"/>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <hr/>\n" +
    "                <p class=\"text-center\">\n" +
    "                    <button ng-click=\"submitForm(myForm.$valid)\" class=\"btn btn-success\" type=\"submit\"><i class=\"glyphicon glyphicon-ok\" ng-disabled=\"myForm.$invalid\"></i>{{btnText}}</button>\n" +
    "                    <button ui-sref=\"web.requestList()\" class=\"btn btn-danger\"><i class=\"glyphicon glyphicon-remove\"></i>Cancelar</button> \n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "");
}]);

angular.module("request/request-detail-user.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("request/request-detail-user.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "\n" +
    "    <div class=\"the-box bg-warning no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-bullhorn icon-lg icon-circle icon-bordered\"></i> Detalle del pedido</h1>\n" +
    "        </div>\n" +
    "        <!-- /.row -->\n" +
    "    </div>\n" +
    "    <!-- the-box -->\n" +
    "\n" +
    "    <div class=\"row\">&nbsp;</div>\n" +
    "\n" +
    "    <div class=\"the-box no-border\" ng-repeat=\"request in requests\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-4 col-sm-6\">\n" +
    "                <carousel interval=\"myInterval\" style=\"height:350px\">\n" +
    "                    <slide ng-repeat=\"slide in request.image\" active=\"slide.active\">\n" +
    "                        <img ng-src=\"{{slide.path}}\" style=\"margin:auto;\">\n" +
    "                    </slide>\n" +
    "                </carousel>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-md-8 col-sm-6\">\n" +
    "                <h2 class=\"medium-heading more-margin-bottom text-primary\">\n" +
    "                    {{request.title}}            \n" +
    "                </h2>\n" +
    "\n" +
    "                <p style=\"margin-top: -10px;\">\n" +
    "                    <small style=\"margin: -20px 20px 0 0;\">\n" +
    "                        <span class=\"glyphicon glyphicon-thumbs-up\"></span> Votos de fé: {{request.votes[0].quan}} \n" +
    "                    </small>\n" +
    "                    <small>\n" +
    "                        <span class=\"glyphicon glyphicon-heart\"></span> Favoritos: {{request.favorites[0].quan}}\n" +
    "                    </small>\n" +
    "                </p>\n" +
    "\n" +
    "                <p>\n" +
    "                    <span ng-if=\"request.processState.id == 'P'\" class=\"badge badge-info\">Publicación Pausada</span>\n" +
    "                </p>\n" +
    "\n" +
    "                <p>\n" +
    "                    <span ng-if=\"request.processState.id == 'C'\" class=\"badge badge-success\">Objetivo Cumplido</span>\n" +
    "                </p>\n" +
    "                \n" +
    "                <p>\n" +
    "                    {{request.description}}\n" +
    "                </p>\n" +
    "\n" +
    "                <div class=\"panel-group\">\n" +
    "                    <div class=\"panel panel-default\">\n" +
    "                        <div class=\"panel-body\">\n" +
    "\n" +
    "                            <h4>{{request.object.description}}</h4>\n" +
    "                            <p>\n" +
    "                                {{request.category.description}} > {{request.subcategory.description}}\n" +
    "                            </p>\n" +
    "                            <p ng-if=\"request.quantity == '1'\">\n" +
    "                                Se necesita: <strong>{{request.quantity}}</strong>\n" +
    "                            </p>\n" +
    "                            <p ng-if=\"request.quantity != '1'\">\n" +
    "                                Se necesita: <strong><span id=\"currency-default\">{{ request.quantity | currency}}</span></strong>\n" +
    "                                <br>\n" +
    "                            </p>\n" +
    "                            </p>\n" +
    "                            <p>Visto:\n" +
    "                                <strong>{{request.views}}</strong> veces</p>\n" +
    "                            <p>Vencimiento:\n" +
    "                                <strong>{{request.expirationDate}}</strong>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"the-box transparent\">\n" +
    "                    <p>\n" +
    "                        <span class=\"badge badge-primary\">Padrinos</span>\n" +
    "                    </p>\n" +
    "                    <ul class=\"col-md-4 media-list media-sm media-team\" ng-repeat=\"sponsor in request.sponsors\">\n" +
    "                        <li class=\"media\">\n" +
    "                            <a class=\"pull-left\">\n" +
    "                                <img class=\"media-object img-circle\" src=\"assets/images/avatar/avatar.jpg\" alt=\"Avatar\">\n" +
    "                            </a>\n" +
    "                            <div class=\"media-body\">\n" +
    "                                <!-- <h4 class=\"media-heading\">Nombre de padrino</h4> -->\n" +
    "                                <a href=\"https://twitter.com/{{sponsor.userTw}}\">\n" +
    "                                    <p class=\"text-danger\">{{sponsor.userTw}}</p>\n" +
    "                                </a>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <p ng-if=\"request.sponsors == ''\">\n" +
    "                        Esta publicación aún no tiene padrinos..\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("request/request-detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("request/request-detail.tpl.html",
    "<h1 class=\"page-heading\">Pedidos\n" +
    "    <small>Detalle del pedido</small>\n" +
    "</h1>\n" +
    "\n" +
    "<ol class=\"breadcrumb default square rsaquo sm\">\n" +
    "    <li>\n" +
    "        <a href=\"index.html\"><i class=\"fa fa-home\"></i></a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "        <a href=\"index.html#/pedidos\">Pedidos</a>\n" +
    "    </li>\n" +
    "    <li class=\"active\">Ver Detalle</li>\n" +
    "</ol>\n" +
    "\n" +
    "<div class=\"the-box no-border\" ng-repeat=\"request in requests\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4 col-sm-6\">\n" +
    "            <carousel interval=\"myInterval\" style=\"height:350px\">\n" +
    "                <slide ng-repeat=\"slide in request.image\" active=\"slide.active\">\n" +
    "                    <img ng-src=\"{{slide.path}}\" style=\"margin:auto;\">\n" +
    "                </slide>\n" +
    "            </carousel>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-8 col-sm-6\">\n" +
    "            <h2 class=\"medium-heading more-margin-bottom text-primary\">\n" +
    "                {{request.title}}\n" +
    "                 <a href ng-if=\"request.isOwner == '0'\" class=\"pull-right\" ng-click=\"toggleFavorite()\" title=\"Favorito\">\n" +
    "                    <i class=\"glyphicon glyphicon-heart text-muted\"  ng-class=\"{'text-warning': request.isFavorite == '1'}\"></i>\n" +
    "                </a>\n" +
    "            </h2>\n" +
    "\n" +
    "            <p style=\"margin-top: -10px;\">\n" +
    "                <small style=\"margin: -20px 20px 0 0;\">\n" +
    "                    <span class=\"glyphicon glyphicon-thumbs-up\"></span> Votos de fé: {{request.votes[0].quan}} \n" +
    "                </small>\n" +
    "                <small>\n" +
    "                    <span class=\"glyphicon glyphicon-heart\"></span> Favoritos: {{request.favorites[0].quan}}\n" +
    "                </small>\n" +
    "            </p>\n" +
    "\n" +
    "            <p>\n" +
    "                <span ng-if=\"request.processState.id == 'P'\" class=\"badge badge-info\">Publicación Pausada</span>\n" +
    "            </p>\n" +
    "\n" +
    "            <p>\n" +
    "                <span ng-if=\"request.processState.id == 'C'\" class=\"badge badge-success\">Objetivo Cumplido</span>\n" +
    "            </p>\n" +
    "\n" +
    "            <p>\n" +
    "                {{request.description}}\n" +
    "            </p>\n" +
    "\n" +
    "            <div class=\"panel-group\">\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-body\">\n" +
    "\n" +
    "                        <h4>{{request.object.description}}</h4>\n" +
    "                        <p>\n" +
    "                            {{request.category.description}} > {{request.subcategory.description}}\n" +
    "                        </p>\n" +
    "                        <p ng-if=\"request.quantity == '1'\">\n" +
    "                            Se necesita: <strong>{{request.quantity}}</strong>\n" +
    "                        </p>\n" +
    "                        <p ng-if=\"request.quantity != '1'\">\n" +
    "                            Se necesita: <strong><span id=\"currency-default\">{{ request.quantity | currency}}</span></strong>\n" +
    "                            <br>\n" +
    "                        </p>\n" +
    "                        <p>Visto:\n" +
    "                            <strong>{{request.views}}</strong> veces</p>\n" +
    "                        <p>Vencimiento:\n" +
    "                            <strong>{{request.expirationDate}}</strong>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"the-box transparent\">\n" +
    "                <p>\n" +
    "                    <span class=\"badge badge-primary\">Padrinos</span>\n" +
    "                </p>\n" +
    "                <ul class=\"col-md-4 media-list media-sm media-team\" ng-repeat=\"sponsor in request.sponsors\">\n" +
    "                    <li class=\"media\">\n" +
    "                        <a class=\"pull-left\">\n" +
    "                            <img class=\"media-object img-circle\" src=\"assets/images/avatar/avatar.jpg\" alt=\"Avatar\">\n" +
    "                        </a>\n" +
    "                        <div class=\"media-body\">\n" +
    "                            <!-- <h4 class=\"media-heading\">Nombre de padrino</h4> -->\n" +
    "                            <a href=\"https://twitter.com/{{sponsor.userTw}}\">\n" +
    "                                <p class=\"text-danger\">{{sponsor.userTw}}</p>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <p ng-if=\"request.sponsors == ''\">\n" +
    "                    Esta publicación aún no tiene padrinos..\n" +
    "                </p>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-10 col-xs-6\">\n" +
    "                    <a href=\"#/checkout/money/{{request.id}}\" ng-if=\"request.processState.id == 'V' && request.isOwner == '0' && request.category.id == '9'\" class=\"btn btn-danger\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok\"></span> Quiero Ayudar</a>\n" +
    "                    \n" +
    "                    <a href=\"#/checkout/request/{{request.id}}\" ng-if=\"request.processState.id == 'V' && request.isOwner == '0' && request.category.id != '9'\" class=\"btn btn-danger\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok\"></span> Quiero Ayudar</a>\n" +
    "                    \n" +
    "                    <button ng-if=\"request.isOwner == '0'\" class=\"btn btn-success btn-md\" ng-click=\"openConversation({publicationId:request.id})\">\n" +
    "                        <span class=\"fa fa-envelope\"></span> Envíale un mensaje\n" +
    "                    </button>\n" +
    "\n" +
    "                    <button type=\"button\" ng-if=\"request.isVote == '1' && request.isOwner == '0'\" ng-click=\"unsetVote(request.id)\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-thumbs-down\"></span>Ya no doy fe!</button>\n" +
    "\n" +
    "                    <button type=\"button\" ng-if=\"request.isVote == '0' && request.isOwner == '0'\" ng-click=\"setVote(request.id)\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-thumbs-up\"></span>Doy fe!</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("request/request-edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("request/request-edit.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "\n" +
    "    <div class=\"the-box bg-warning no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-bullhorn icon-lg icon-circle icon-bordered\"></i> Editar pedido</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"the-box no-border\">\n" +
    "        <form name=\"myForm\" ng-repeat=\"request in requests\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-8\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input type=\"text\" maxlength=\"30\" class=\"form-control input-md\" name=\"title\" ng-model=\"request.title\" ng-required=\"true\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <textarea class=\"form-control input-md\" name=\"description\" ng-model=\"request.description\" rows=\"30\" ng-required=\"true\"></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Contá todos los detalles</label>\n" +
    "                        <p class=\"help-block\"><small>Mientras más claro seas para contar tu situación mejores resultados vas a obtener.</small>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Estado: </label><span class=\"label label-warning pull-right\">{{request.processState.description}}</span>\n" +
    "                        <select ng-model=\"request.processStateId\" class=\"form-control input-md\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option value=\"C\">Cerrado</option>\n" +
    "                            <option value=\"P\">Pausado</option>\n" +
    "                            <option value=\"V\">Vigente</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Categoria: </label><span class=\"label label-warning pull-right\">{{request.category.description}}</span>\n" +
    "                        <select ng-model=\"request.categoryId\" name=\"categoryId\" class=\"form-control input-md\" ng-change=\"getSubcategories(request.categoryId);\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option ng-repeat=\"category in categories\" value=\"{{category.id}}\" ng-selected=\"request.categoryId == category.id\">{{category.description}}</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Subcategoría: </label><span class=\"label label-warning pull-right\">{{request.subcategory.description}}</span>\n" +
    "                        <select ng-model=\"request.subcategoryId\" class=\"form-control input-md\" ng-change=\"getObjects(request.categoryId, request.subcategoryId);\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option ng-repeat=\"subcategory in subcategories\" value=\"{{subcategory.id}}\" ng-selected=\"request.subcategoryId == subcategory.id\">{{subcategory.description}}</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"hidden-xs\">Objeto ofrecido: </label><span class=\"label label-warning pull-right\">{{request.object.description}}</span>\n" +
    "                        <select ng-model=\"request.objectId\" class=\"form-control input-md\" required>\n" +
    "                            <option value=\"\">-- Elige una opción --</option>\n" +
    "                            <option ng-repeat=\"object in objects\" value=\"{{object.id}}\" ng-selected=\"request.objectId == object.id\">{{object.description}}</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div ng-show=\"request.category.id == '9' || request.categoryId == '9'\" class=\"form-group\">\n" +
    "                            <label class=\"hidden-xs\">Cantidad de dinero necesario</label>\n" +
    "                            <input type=\"text\" class=\"form-control input-md\" name=\"cantidad\" ng-model=\"request.quantity\" placeholder=\"Ingrese la suma sin signos / ej.: 1000000\" ng-required=\"true\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Fecha de expiración</label>\n" +
    "                        <div style=\"display:inline-block;\">\n" +
    "                            <p class=\"input-group\">\n" +
    "                                <input type=\"text\" datepicker-popup=\"yyyy-MM-dd\" class=\"form-control input-md\" ng-model=\"request.expirationDate\" name=\"expirationDate\" ng-required=\"true\" show-weeks=\"false\" is-open=\"opened\" date-disabled=\"disabled(date, mode)\" show-button-bar=\"false\" />\n" +
    "                                <span class=\"input-group-btn\">\n" +
    "                                <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\">\n" +
    "                                    <i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "                                </button>\n" +
    "                            </span>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- <div class=\"form-group\">\n" +
    "                        <label>Imagenes</label>\n" +
    "                        <input type=\"text\" ng-if=\"(request.image).length == '0' \" class=\"form-control input-md\" name=\"path\" ng-model=\"image.path\" ng-required=\"true\">\n" +
    "                        <input type=\"text\" ng-repeat=\"image in request.image\" class=\"form-control input-md\" name=\"path\" ng-model=\"image.path\" ng-required=\"true\">\n" +
    "                    </div> -->\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <p class=\"bg-danger\">{{msgSponsor}}</p>\n" +
    "                        <label>Agregar padrinos\n" +
    "                            <div ng-repeat=\"item in likedLabels\">\n" +
    "                                <input class=\"form-control input-md\" name=\"label\" ng-model=\"item.label\" ng-required=\"true\" />\n" +
    "                            </div>\n" +
    "                            <button ng-click=\"addInput()\" class=\"btn btn-success btn-xs\">\n" +
    "                                <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"deleteInput($index)\" class=\"btn btn-success btn-xs\">\n" +
    "                                <span class=\"glyphicon glyphicon-minus\"></span>\n" +
    "                            </button>\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Editar o borrar padrinos existentes</label>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div ng-repeat=\"sponsor in request.sponsors\">\n" +
    "                                <input class=\"form-control input-md\" name=\"userTw\" ng-model=\"sponsor.userTw\" />\n" +
    "                                <!-- <button ng-click=\"addDeleteSponsor($index, sponsor.id)\" class=\"btn btn-success btn-xs\">\n" +
    "                                        <span class=\"glyphicon glyphicon-minus\">\n" +
    "                                        </button> -->\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <!--<input type=\"file\" ng-model=\"request.fname\" ng-file-select=\"onFileSelect($files)\" >-->\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-12\">\n" +
    "                        <hr/>\n" +
    "                        <p class=\"text-center\">\n" +
    "                            <button ng-click=\"submitFormEdit(myForm.$valid)\" class=\"btn btn-success\" type=\"submit\"><i class=\"glyphicon glyphicon-ok\" ng-disabled=\"myForm.$invalid\"></i>{{btnText}}</button>\n" +
    "                            <button ui-sref=\"panel.requestListUser\" class=\"btn btn-danger\"><i class=\"glyphicon glyphicon-remove\"></i>Cancelar</button>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "");
}]);

angular.module("request/request-favorites.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("request/request-favorites.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "    <div class=\"the-box bg-warning no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-bullhorn icon-lg icon-circle icon-bordered\"></i> Pedidos favoritos</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container-masonry\">\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in alert-dismissable\" ng-show=\"activating\">\n" +
    "        <strong>Hey!</strong> Todavía no tienes favoritos..\n" +
    "    </div>\n" +
    "    <ol>\n" +
    "        <li class=\"item-masonry\" ng-repeat=\"request in requests\">\n" +
    "            <div ng-if=\"request.isFavorite == '1'\" class=\"the-box no-border full store-item text-center mansory-inner\">\n" +
    "\n" +
    "                <img data-ng-src=\"{{request.image[0].path}}\" class=\"item-image img-responsive\" alt=\"Image\" ui-sref=\"web.requestDetail({id: request.id})\">\n" +
    "\n" +
    "                <div class=\"the-box bg-default no-margin no-border item-des\">\n" +
    "                    <p class=\"text-muted\">\n" +
    "                        {{request.object.description}}\n" +
    "                    </p>\n" +
    "\n" +
    "                    <h3><a class=\"bolded\" ui-sref=\"web.requestDetail({id: request.id})\">{{request.title}}</a>\n" +
    "                    </h3>\n" +
    "\n" +
    "                    <p>{{request.description}}</p>\n" +
    "\n" +
    "                    <p>{{message}}</p>\n" +
    "\n" +
    "                    <strong class=\"text-left\" ng-if=\"request.category.id == '9'\">Recaudado: <span id=\"currency-default\">{{ request.amountCollected[0].quan | currency}}</span></strong>\n" +
    "                    <div ng-if=\"request.category.id == '9'\" class=\"progress no-rounded progress-sm progress-striped\">\n" +
    "                        <div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"request.amountCollected[0].quan\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{request.progressValue}}%\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <a href=\"#/checkout/money/{{request.id}}\" ng-if=\"request.isOwner == '0' && request.category.id == '9' && offer.processState.id == 'V'\" class=\"btn btn-danger btn-block\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok\"></span>Quiero ayudar!\n" +
    "                    </a>\n" +
    "\n" +
    "                    <a href=\"#/checkout/request/{{request.id}}\" ng-if=\"request.isOwner == '0' && request.category.id != '9' && offer.processState.id == 'V'\" class=\"btn btn-danger btn-block\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok\"></span>Quiero ayudar!\n" +
    "                    </a>\n" +
    "\n" +
    "                    <div class=\"row extra-data\">\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-left\">\n" +
    "                            <a href ng-click=\"toggleFavorite()\" title=\"Favorito\">\n" +
    "                                <i class=\"glyphicon glyphicon-heart text-muted\" ng-class=\"{'text-warning': request.isFavorite == '1'}\"></i>\n" +
    "                            </a>\n" +
    "                            {{request.favorites[0].quan}}\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-right\">\n" +
    "                            <i class=\"glyphicon glyphicon-eye-open text-muted\"></i> {{request.views}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "</div>\n" +
    "");
}]);

angular.module("request/request-helps-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("request/request-helps-list.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "    <div class=\"the-box bg-primary no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-flag icon-lg icon-circle icon-bordered\"></i> Mis Ayudas</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container-masonry\">\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in alert-dismissable\" ng-show=\"activating\">\n" +
    "        <strong>Hey!</strong> No has ayudado a ninguna causa, aún. Puedes hacerlo de manera muy rápida y segura!. Alguien puede necesitarte mas de lo que imaginas!\n" +
    "    </div>\n" +
    "    <ol>\n" +
    "        <li class=\"item-masonry\" ng-repeat=\"request in requests\">\n" +
    "            <p>{{message}}</p>\n" +
    "            <div class=\"the-box no-border full store-item text-center mansory-inner\">\n" +
    "                <img data-ng-src=\"{{request.image[0].path}}\" class=\"item-image img-responsive\" alt=\"Image\" ui-sref=\"panel.requestDetailUser({id: request.id})\">\n" +
    "\n" +
    "                <div class=\"the-box bg-default no-margin no-border item-des\">\n" +
    "                    <p class=\"text-muted\">\n" +
    "                        {{request.object.description}}\n" +
    "                    </p>\n" +
    "\n" +
    "                    <h3><a class=\"bolded\" ui-sref=\"panel.requestDetailUser({id: request.id})\">{{request.title}}</a>\n" +
    "                    </h3>\n" +
    "\n" +
    "                    <strong class=\"text-left\" ng-if=\"request.category.id == '9'\">Recaudado hasta ahora: <span id=\"currency-default\">{{ request.amountCollected[0].quan | currency}}</span></strong>\n" +
    "                    <div class=\"row extra-data\">\n" +
    "                        <div ng-if=\"request.category.id == '9'\">\n" +
    "                            <p class=\"text-muted text-left\">Haz ayudado con <strong> {{request.amountDonated | currency}}</strong> esta causa! :)</p>\n" +
    "                        </div>\n" +
    "                        <div ng-if=\"request.category.id != '9'\">\n" +
    "                            <span ng-if=\"request.donations[0].processState.id=='W'\">\n" +
    "                                <p class=\"text-muted text-left\" >\n" +
    "                                    <small>Después de ponerte de acuerdo con la persona que necesita ayuda, cuéntanos... Pudiste concluir la ayuda solicitada?</small>\n" +
    "                                </p>\n" +
    "                            </span>\n" +
    "                            <span ng-if=\"request.donations[0].processState.id=='C'\">\n" +
    "                                <p><span class=\"badge badge-info\">No pudo concretarse la ayuda</span>\n" +
    "                            </p>\n" +
    "                            <p class=\"text-muted text-left\">\n" +
    "                                <small>Es una pena que no has podido concreatar la ayuda. Igualmente sigue ayudando en otros pedido. Hay mucha gente que te necesita mucho más de lo que te imaginás.</small>\n" +
    "                            </p>\n" +
    "                            </span>\n" +
    "                            <span ng-if=\"request.donations[0].processState.id=='F'\">\n" +
    "                                <p><span class=\"badge badge-success\">Ayuda concretada!</span></p>\n" +
    "                                <p class=\"text-muted text-left\" >\n" +
    "                                    <small>Has contribuido con esta causa. Sigue así. Hay mucha gente que te necesita mucho más de lo que te imaginás!</small>\n" +
    "                                </p>\n" +
    "                            </span>\n" +
    "                            <div class=\"row\" ng-if=\"request.donations[0].processState.id=='W'\">\n" +
    "                                <div class=\"col-md-6 col-xs-6\">\n" +
    "                                    <button ng-click=\"confirmHelp(request.donations[0].id)\" ng-if=\"request.category.id != '9'\" class=\"btn btn-sm btn-danger\">\n" +
    "                                        <span class=\"glyphicon glyphicon-ok\"></span><span class=\"hidden-sm hidden-xs\"> Sí!,Pude ayudar</span>\n" +
    "                                    </button>\n" +
    "                                </div>\n" +
    "                                <div class=\"col-md-6 col-xs-6\">\n" +
    "                                    <button ng-click=\"cancelHelp(request.donations[0].id)\" ng-if=\"request.category.id != '9'\" class=\"btn btn-sm btn-info\">\n" +
    "                                        <span class=\"glyphicon glyphicon-remove\"></span><span class=\"hidden-sm hidden-xs\"> No esta vez</span>\n" +
    "                                    </button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"row\" ng-if=\"request.donations[0].processState.id=='F'\">\n" +
    "                                <div id=\"fb-root\">\n" +
    "                                    <div class=\"fb-share-button text-center\" data-href=\"https://github.com/ayudaresfacil/ayudaresfacil\" data-layout=\"button\"></div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "</div>\n" +
    "");
}]);

angular.module("request/request-list-user.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("request/request-list-user.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "    <div class=\"the-box bg-warning no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-bullhorn icon-lg icon-circle icon-bordered\"></i> Mis pedidos</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container-masonry\">\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in alert-dismissable\" ng-show=\"activating\">\n" +
    "        <strong>Hey!</strong> Todavía no has creado ningún pedido de ayuda..\n" +
    "    </div>\n" +
    "    <ol>\n" +
    "        <li ng-if=\"request.isOwner == '1'\" class=\"item-masonry\" ng-repeat=\"request in requests\">\n" +
    "            <div class=\"the-box no-border full store-item text-center mansory-inner\">\n" +
    "                <img data-ng-src=\"{{request.image[0].path}}\" class=\"item-image img-responsive\" alt=\"Image\" ui-sref=\"panel.requestDetailUser({id: request.id})\">\n" +
    "\n" +
    "                <div class=\"the-box bg-default no-margin no-border item-des\">\n" +
    "                    <div class=\"pull-right\">\n" +
    "                        <a href ng-click=\"requestDelete(request.id)\" title=\"Dar de baja\">\n" +
    "                            <i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "                        </a> |\n" +
    "                        <a href ui-sref=\"panel.requestEdit({id: request.id})\" title=\"Editar\">\n" +
    "                            <i class=\"glyphicon glyphicon-pencil\"></i>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <p class=\"text-muted text-left\">\n" +
    "                        {{request.object.description}}\n" +
    "                    </p>\n" +
    "\n" +
    "                    <h3><a class=\"bolded\" ui-sref=\"panel.requestDetailUser({id: request.id})\">{{request.title}}</a>\n" +
    "                    </h3>\n" +
    "\n" +
    "                    <p>{{request.description}}</p>\n" +
    "\n" +
    "                    <!-- <p>{{message}}</p> -->\n" +
    "\n" +
    "                    <strong class=\"text-left\" ng-if=\"request.category.id == '9'\">Recaudado: <span id=\"currency-default\">{{ request.amountCollected[0].quan | currency}}</span></strong>\n" +
    "                    <div ng-if=\"request.category.id == '9'\" class=\"progress no-rounded progress-sm progress-striped\">\n" +
    "                        <div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"request.amountCollected[0].quan\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{request.progressValue}}%\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <div class=\"row extra-data\">\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-left\">\n" +
    "                            <a href ng-click=\"toggleFavorite()\" title=\"Favorito\">\n" +
    "                                <i class=\"glyphicon glyphicon-heart text-muted\" ng-class=\"{'text-warning': request.isFavorite == '1'}\"></i>\n" +
    "                            </a>\n" +
    "                            {{request.favorites[0].quan}}\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-right\">\n" +
    "                            <i class=\"glyphicon glyphicon-eye-open text-muted\"></i> {{request.views}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "</div>\n" +
    "");
}]);

angular.module("request/request-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("request/request-list.tpl.html",
    "<!-- Begin page heading -->\n" +
    "<h1 class=\"page-heading\">Pedidos\n" +
    "    <small>Elegí una publicación y empezá a colaborar!</small>\n" +
    "</h1>\n" +
    "\n" +
    "<ol class=\"breadcrumb default square rsaquo sm\">\n" +
    "    <li>\n" +
    "        <a href=\"index.html\"><i class=\"fa fa-home\"></i></a>\n" +
    "    </li>\n" +
    "    <li class=\"active\">Pedidos</li>\n" +
    "</ol>\n" +
    "\n" +
    "<div class=\"container-masonry\">\n" +
    "    <ol>\n" +
    "        <li class=\"item-masonry\" ng-repeat=\"request in requests\">\n" +
    "            <div class=\"the-box no-border full store-item text-center mansory-inner\">\n" +
    "\n" +
    "                <img data-ng-src=\"{{request.image[0].path}}\" class=\"item-image img-responsive\" alt=\"Image\" ui-sref=\"web.requestDetail({id: request.id})\">\n" +
    "\n" +
    "                <div class=\"the-box bg-default no-margin no-border item-des\">\n" +
    "                    <p class=\"text-muted\">\n" +
    "                        {{request.object.description}}\n" +
    "                    </p>\n" +
    "\n" +
    "                    <h3><a class=\"bolded\" ui-sref=\"web.requestDetail({id: request.id})\">{{request.title}}</a>\n" +
    "                    </h3>\n" +
    "\n" +
    "                    <p>{{request.description}}</p>\n" +
    "\n" +
    "                    <p>{{message}}</p>\n" +
    "\n" +
    "                    <strong class=\"text-left\" ng-if=\"request.category.id == '9'\">Recaudado: <span id=\"currency-default\">{{ request.amountCollected[0].quan | currency}}</span></strong>\n" +
    "                    <div ng-if=\"request.category.id == '9'\" class=\"progress no-rounded progress-sm progress-striped\">\n" +
    "                        <div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"request.amountCollected[0].quan\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{request.progressValue}}%\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <a href=\"#/checkout/money/{{request.id}}\" ng-if=\"request.isOwner == '0' && request.category.id == '9' && request.processState.id == 'V'\" class=\"btn btn-danger btn-block\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok\"></span>Quiero ayudar!\n" +
    "                    </a>\n" +
    "\n" +
    "                    <a href=\"#/checkout/request/{{request.id}}\" ng-if=\"request.isOwner == '0' && request.category.id != '9' && request.processState.id == 'V'\" class=\"btn btn-danger btn-block\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok\"></span>Quiero ayudar!\n" +
    "                    </a>\n" +
    "\n" +
    "                    <div class=\"row extra-data\">\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-left\">\n" +
    "                            <a href ng-click=\"toggleFavorite()\" title=\"Favorito\">\n" +
    "                                <i class=\"glyphicon glyphicon-heart text-muted\" ng-class=\"{'text-warning': request.isFavorite == '1'}\"></i>\n" +
    "                            </a>\n" +
    "                            {{request.favorites[0].quan}}\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-6 col-xs-6 text-right\">\n" +
    "                            <i class=\"glyphicon glyphicon-eye-open text-muted\"></i> {{request.views}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "</div>\n" +
    "");
}]);

angular.module("sponsor/sponsor.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sponsor/sponsor.tpl.html",
    "SPONSOR VIEW");
}]);

angular.module("user/signin.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("user/signin.tpl.html",
    "<div class=\"login-header text-center\">\n" +
    "    <img src=\"assets/images/logo.png\" class=\"logo\" alt=\"Logo\">\n" +
    "</div>\n" +
    "<div class=\"login-wrapper\">\n" +
    "\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in\" ng-show=\"error.emptyValues\">\n" +
    "        <strong>Oye!</strong> Olvidates completar algunos datos. <strong class=\"text-warning\">Corrige e intenta nuevamente.</strong>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in alert-dismissable\" ng-show=\"error.userNotFound\">\n" +
    "        <strong>Oye!</strong> Al parecer tus datos no son correctos. <strong class=\"text-warning\">Corrigelos e intenta nuevamente.</strong>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in alert-dismissable\" ng-show=\"error.nook\">\n" +
    "        <strong>Ups!</strong> Al parecer hubo un error en la conexión. <strong class=\"text-warning\">Intenta nuevamente mas tarde.</strong>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert alert-danger alert-block fade in\" ng-show=\"activationError\">\n" +
    "        <strong>Ups!</strong> Lo sentimos, al parecer no pudimos activar tu cuenta. Por favor intenta nuevamente mas tarde.\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert alert-info alert-block fade in\" ng-show=\"activating\">\n" +
    "        <strong>Hey!</strong> Aguarda unos segundos mientras activamos tu cuenta...\n" +
    "    </div>\n" +
    "\n" +
    "    <form role=\"form\" action=\"\" ng-submit=\"signin()\">\n" +
    "        \n" +
    "        <div class=\"form-group has-feedback lg left-feedback no-label\">\n" +
    "            <input type=\"text\" class=\"form-control no-border input-lg rounded\" placeholder=\"Tu email...\" autofocus data-ng-model=\"credentials.username\" autofocus=\"true\">\n" +
    "            <span class=\"fa fa-user form-control-feedback\"></span>\n" +
    "        </div>\n" +
    "        \n" +
    "        <div class=\"form-group has-feedback lg left-feedback no-label\">\n" +
    "            <input type=\"password\" class=\"form-control no-border input-lg rounded\" placeholder=\"Tu contraseña...\" data-ng-model=\"credentials.password\">\n" +
    "            <span class=\"fa fa-unlock-alt form-control-feedback\"></span>\n" +
    "        </div>\n" +
    "        \n" +
    "       <!--  <div class=\"form-group\">\n" +
    "            <div class=\"checkbox\">\n" +
    "                <label>\n" +
    "                    <input type=\"checkbox\" class=\"i-yellow-flat\">Recuerdame\n" +
    "                </label>\n" +
    "            </div>\n" +
    "        </div> -->\n" +
    "       <!--  <p class=\"text-right\">\n" +
    "            <small>\n" +
    "                <a href=\"forgot-password.html\">Olvidaste tu contraseña?</a>\n" +
    "            </small>\n" +
    "        </p> -->\n" +
    "        \n" +
    "        <div class=\"form-group\">\n" +
    "            <button type=\"submit\" class=\"btn btn-warning btn-lg btn-perspective btn-block\">INICIAR SESIÓN</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <p class=\"text-center\">o</p>\n" +
    "    \n" +
    "    <p class=\"text-center\">\n" +
    "        <strong>\n" +
    "            <a ui-sref=\"account.signup\">Crea una cuenta</a>\n" +
    "        </strong>\n" +
    "    </p>\n" +
    "</div>");
}]);

angular.module("user/signup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("user/signup.tpl.html",
    "<div class=\"login-header text-center\">\n" +
    "    <img src=\"assets/images/logo.png\" class=\"logo\" alt=\"Logo\">\n" +
    "</div>\n" +
    "<div class=\"login-wrapper\">\n" +
    "\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in\" ng-show=\"error.emptyValues\">\n" +
    "        <strong>Oye!</strong> Olvidates completar algunos datos. <strong class=\"text-warning\">Corrige e intenta nuevamente.</strong>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in\" ng-show=\"error.repeatEntry\">\n" +
    "        <strong>Oye!</strong> El email que haz ingresado ya esta siendo utilizado. <strong class=\"text-warning\">Corrige e intenta nuevamente.</strong>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert alert-warning alert-bold-border fade in\" ng-show=\"error.nook\">\n" +
    "        <strong>Ups!</strong> Al parecer hubo un error al intentar realizar la acción.<strong class=\"text-warning\">Aguarda unos segundos intenta nuevamente.</strong>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"alert alert-info alert-bold-border fade in alert-dismissable text-center\" ng-show=\"newRegistration\">\n" +
    "        <p>\n" +
    "            <strong>Hey!</strong> ya casi puedes empezar a formar parte de esta hermosa comunidad. \n" +
    "        </p>\n" +
    "        <p>\n" +
    "            <strong class=\"text-info\">Chequea tu correo electrónico para activar tu cuenta.</strong>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "    <form role=\"form\" action=\"\" ng-submit=\"signup()\" ng-show=\"!newRegistration\">\n" +
    "        <div class=\"form-group has-feedback lg left-feedback no-label\">\n" +
    "            <input data-ng-model=\"credentials.name\" type=\"text\" class=\"form-control no-border input-lg rounded\" placeholder=\"dime tu nombre...\" autofocus >\n" +
    "            <span class=\"fa fa-male form-control-feedback\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"form-group has-feedback lg left-feedback no-label\">\n" +
    "            <input data-ng-model=\"credentials.email\" type=\"email\" class=\"form-control no-border input-lg rounded\" placeholder=\"ahora tu email...\" >\n" +
    "            <span class=\"fa fa-envelope form-control-feedback\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"form-group has-feedback lg left-feedback no-label\">\n" +
    "            <input data-ng-model=\"credentials.password\" type=\"password\" class=\"form-control no-border input-lg rounded\" placeholder=\"elije una contraseña...\" >\n" +
    "            <span class=\"fa fa-lock form-control-feedback\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"form-group has-feedback lg left-feedback no-label\">\n" +
    "            <input data-ng-model=\"credentials.confirmPassword\" type=\"password\" class=\"form-control no-border input-lg rounded\" placeholder=\"reingresala...\" >\n" +
    "            <span class=\"fa fa-unlock form-control-feedback\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"checkbox\">\n" +
    "                <label class=\"inline-popups\">\n" +
    "                    <input data-ng-model=\"credentials.terms\" type=\"checkbox\" class=\"i-yellow-flat\">Acepto los <a href=\"\" data-effect=\"mfp-zoom-in\" >Terminos y condiciones</a>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <button type=\"submit\" class=\"btn btn-warning btn-lg btn-perspective btn-block\">{{sendButton}}</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<!-- /.login-wrapper -->\n" +
    "\n" +
    "\n" +
    "<!-- Text popup -->\n" +
    "<!-- <div id=\"text-popup\" class=\"white-popup wide mfp-with-anim mfp-hide\">\n" +
    "    <h4>TERMS</h4>\n" +
    "    <p>\n" +
    "        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.\n" +
    "    </p>\n" +
    "    <hr />\n" +
    "    <h4>CONDITIONS</h4>\n" +
    "    <p>\n" +
    "        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.\n" +
    "    </p>\n" +
    "</div> -->\n" +
    "");
}]);

angular.module("user/user-data.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("user/user-data.tpl.html",
    "<!-- BEGIN USER APPS INBOX -->\n" +
    "<div class=\"mail-apps-wrap\">\n" +
    "\n" +
    "	<div class=\"the-box bg-info no-border no-margin heading\">\n" +
    "		<div class=\"row\">\n" +
    "			<h1><i class=\"fa fa-user icon-lg icon-circle icon-bordered\"></i> Mis Datos</h1>\n" +
    "		</div><!-- /.row -->\n" +
    "	</div><!-- the-box -->\n" +
    "	\n" +
    "	<div class=\"row\">&nbsp;</div>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-sm-1\"></div>\n" +
    "		<div class=\"col-sm-10\">\n" +
    "			<!-- Begin basic form elements -->\n" +
    "					<div ng-if=\"status=='SUCCESS'\" class=\"alert alert-success alert-block fade in alert-dismissable\">\n" +
    "						<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n" +
    "						<strong>Ya estás registrado</strong> ahora a disfrutar\n" +
    "					</div>\n" +
    "					<div ng-if=\"status=='ERROR'\" class=\"alert alert-warning alert-block fade in alert-dismissable\">\n" +
    "						<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n" +
    "						<strong>Lo sentimos, pero...</strong><br/>\n" +
    "						{{error}}\n" +
    "					</div>\n" +
    "			<div class=\"the-box\">\n" +
    "				<h2>Datos Personales</h2>\n" +
    "				<form role = \"form\">\n" +
    "					<div class=\"form-group\">\n" +
    "						<label>Correo Electronico</label>\n" +
    "						<input type=\"text\" ng-model=\"user.email\" class=\"form-control\" placeholder=\"Correo Electronico\">\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">\n" +
    "						<label>Nombre</label>\n" +
    "						<input type=\"text\" ng-model=\"user.name\" class=\"form-control\" placeholder=\"Nombre\">\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">\n" +
    "						<label>Apellido</label>\n" +
    "						<input type=\"text\" ng-model=\"user.lastName\" class=\"form-control\" placeholder=\"Apellido\">\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">\n" +
    "						<label>Fecha de nacimiento</label>\n" +
    "						<div class=\"row\">\n" +
    "							<div class=\"col-xs-6\">\n" +
    "								<div style=\"display:inline-block;\">\n" +
    "									<p class=\"input-group\">\n" +
    "										<input type=\"text\" datepicker-popup=\"yyyy-MM-dd\" class=\"form-control\" ng-model=\"user.birthdayDate\" show-weeks=\"false\" is-open=\"opened\" date-disabled=\"disabled(date, mode)\" ng-required=\"true\" show-button-bar=\"false\"/>\n" +
    "										<span class=\"input-group-btn\">\n" +
    "											<button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\">\n" +
    "												<i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "											</button>\n" +
    "										</span>\n" +
    "									</p>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">\n" +
    "						<label>Donde podemos encontrarte?</label><p class=\"help-block\"><small><strong>Atención: </strong>Cuando hagas un pedido, o quieras donar algo, esta información será súper importante!</small></p>\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">	\n" +
    "						<div ng-repeat=\"address in user.addresses\"><!-- Addresses Container -->\n" +
    "							<div class=\"form-group\">\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-xs-1\">\n" +
    "										<label class=\"hidden-xs\">Provincia</label>\n" +
    "									</div>\n" +
    "									<div class=\"col-xs-11\" class=\"hidden-xs\">\n" +
    "										<select ng-model=\"address.provinceId\" class=\"form-control\" ng-change=\"getDepartments(address.provinceId);\" >\n" +
    "											<option value=\"\">Provincia</option>\n" +
    "											<option ng-repeat=\"province in provinces\" value=\"{{province.id}}\" ng-selected=\"address.provinceId == province.id\">{{province.description}}</option>\n" +
    "										</select>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "							<div class=\"form-group\">\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-xs-1\">\n" +
    "										<label class=\"hidden-xs\">Municipio</label>\n" +
    "									</div>\n" +
    "									<div class=\"col-xs-11\" class=\"hidden-xs\">\n" +
    "										<select ng-model=\"address.departmentId\" class=\"form-control\" ng-change=\"getCities(address.departmentId);\" >\n" +
    "											<option value=\"\">Municipio</option>\n" +
    "											<option ng-repeat=\"department in departments\" value=\"{{department.id}}\" ng-selected=\"address.departmentId == department.id\">{{department.description}}</option>\n" +
    "										</select>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "							<div class=\"form-group\">\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-xs-1\">\n" +
    "										<label class=\"hidden-xs\">Localidad</label>\n" +
    "									</div>\n" +
    "									<div class=\"col-xs-11\">\n" +
    "										<select ng-model=\"address.cityId\" class=\"form-control\">\n" +
    "											<option value=\"\">Localidad</option>\n" +
    "											<option ng-repeat=\"city in cities\" value=\"{{city.id}}\" ng-selected=\"address.cityId == city.id\">{{city.description}}</option>\n" +
    "										</select>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "							<div class=\"form-group\">\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-xs-1\">\n" +
    "										<label class=\"hidden-xs\">Calle</label>\n" +
    "									</div>\n" +
    "									<div class=\"col-md-8 col-xs-8\">\n" +
    "										<input type=\"text\" ng-model=\"address.street\" class=\"form-control\" placeholder=\"Calle\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-1 col-xs-1\">\n" +
    "										<label class=\"hidden-xs\">Número</label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-2 col-xs-2\">\n" +
    "										<input type=\"text\" ng-model=\"address.number\" class=\"form-control\" placeholder=\"Nro\"/>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "							<div class=\"form-group\">\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-1 col-xs-1\">\n" +
    "										<label class=\"hidden-xs\">Cod. Postal</label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-2 col-xs-11\">\n" +
    "										<input type=\"text\" ng-model=\"address.postalCode\" class=\"form-control\" placeholder=\"C.P.\"/>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-1 col-xs-1\">\n" +
    "										<label class=\"hidden-xs\">Piso</label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-2 col-xs-11\">\n" +
    "										<input type=\"text\" ng-model=\"address.floor\" class=\"form-control\" placeholder=\"Piso\"/>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-1 col-xs-1\">\n" +
    "										<label class=\"hidden-xs\">Dpto.</label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-2 col-xs-11\">\n" +
    "										<input type=\"text\" ng-model=\"address.apartment\" class=\"form-control\" placeholder=\"Dpto\"/>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "						</div><!--  Addresses Container -->\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">\n" +
    "						<label>Cómo nos podemos comunicar con vos?</label>\n" +
    "						<div class=\"row\" ng-repeat=\"phone in user.phones\">\n" +
    "							<div class=\"phone-container\"> <!-- Contenedor de tel. -->\n" +
    "								<div class=\"col-xs-2\">\n" +
    "									<input type=\"text\" ng-model=\"phone.areaCode\" class=\"form-control\" placeholder=\"Cod. Area\">\n" +
    "									<p class=\"help-block\"><small>Si estas en BS AS es 011</small></p>\n" +
    "								</div>\n" +
    "								<div class=\"col-xs-5\">\n" +
    "									<input type=\"text\" ng-model=\"phone.number\" class=\"form-control\" placeholder=\"Nro. Telefono\">\n" +
    "								</div>\n" +
    "								<div class=\"col-xs-4\">\n" +
    "									<select data-ng-model=\"phone.typeId\" class=\"form-control\">\n" +
    "										<option value=\"1\">Celular</option>\n" +
    "										<option value=\"2\">Particular</option>\n" +
    "										<option value=\"3\">Laboral</option>\n" +
    "									</select>\n" +
    "								</div>\n" +
    "								<div class=\"col-xs-1\">\n" +
    "									<button ng-click=\"deletePhone($index)\" class=\"btn btn-info btn-xs\"><span class=\"glyphicon glyphicon-minus\"></button>\n" +
    "								</div>\n" +
    "							</div><!-- Contenedor de tel. -->\n" +
    "						</div>\n" +
    "						<div class=\"row\">\n" +
    "							<div class=\"phone-container\">\n" +
    "								<div class=\"col-xs-2\">\n" +
    "									<input type=\"text\" ng-model=\"areaCode\" class=\"form-control\" placeholder=\"Cod. Area\">\n" +
    "									<p class=\"help-block\"><small>Si estas en BS AS es 011</small></p>\n" +
    "								</div>\n" +
    "								<div class=\"col-xs-5\">\n" +
    "									<input type=\"text\" ng-model=\"number\" class=\"form-control\" placeholder=\"Nro. Telefono\">\n" +
    "								</div>\n" +
    "								<div class=\"col-xs-4\">\n" +
    "									<select ng-model=\"typeId\" class=\"form-control\">\n" +
    "										<option value=\"1\">Celular</option>\n" +
    "										<option value=\"2\">Particular</option>\n" +
    "										<option value=\"3\">Laboral</option>\n" +
    "									</select>\n" +
    "								</div>\n" +
    "								<div class=\"col-xs-1\">\n" +
    "									<button ng-click=\"addPhone()\" class=\"btn btn-success btn-xs\"><span class=\"glyphicon glyphicon-plus\"></button>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">\n" +
    "						<label>Cuéntanos como sos...</label>\n" +
    "						<textarea class=\"form-control no-resize\"  ng-model=\"user.description\" placeholder=\"Tu espacio...\"></textarea>\n" +
    "						<p class=\"help-block\">Puedes expresar lo que quieras, es tu espacio :)</p>\n" +
    "					</div>\n" +
    "\n" +
    "					<button ng-click=\"saveUser()\" class=\"btn btn-success btn-block btn-lg\" type=\"submit\"><i class=\"glyphicon glyphicon-ok\"></i>{{btnText}}</button>\n" +
    "					\n" +
    "				</form>\n" +
    "			</div><!-- /.the-box -->\n" +
    "			<!-- End basic form elements -->\n" +
    "		</div><!-- /.col-sm-10 -->\n" +
    "		<div class=\"col-sm-1\"></div>\n" +
    "	</div><!-- /.row -->\n" +
    "	<div class=\"the-box toolbar no-border no-margin\">\n" +
    "		<div class=\"btn-toolbar\" role=\"toolbar\">\n" +
    "\n" +
    "			<!-- /.btn-group .pull-right -->\n" +
    "		</div>\n" +
    "		<!-- /.btn-toolbar -->\n" +
    "	</div>\n" +
    "	<!-- /.the-box -->\n" +
    "</div><!-- /.user-apps-wrap -->");
}]);

angular.module("user/user-password.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("user/user-password.tpl.html",
    "<div class=\"mail-apps-wrap\">\n" +
    "    <div class=\"the-box bg-info no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-user icon-lg icon-circle icon-bordered\"></i> Seguridad</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">&nbsp;</div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-1\"></div>\n" +
    "        <div class=\"col-sm-10\">\n" +
    "            <div class=\"the-box\">\n" +
    "                <h2>Cambiar mi contraseña</h2>\n" +
    "                <form role=\"form\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <p class=\"help-block\">\n" +
    "                            <small>\n" +
    "                                <strong>Atención:</strong>Cuando hagas un pedido, o quieras donar algo, esta información será súper importante!\n" +
    "                            </small>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Contraseña actual</label>\n" +
    "                        <input type=\"text\" ng-model=\"security.oldPassword\" class=\"form-control\" placeholder=\"Escribe tu vieja contraseña\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Nueva contraseña</label>\n" +
    "                        <input type=\"text\" ng-model=\"security.newPassword\" class=\"form-control\" placeholder=\"Escribe una nueva contraseña\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Repite la nueva contrasña</label>\n" +
    "                        <input type=\"text\" ng-model=\"security.newPasswordConfirmation\" class=\"form-control\" placeholder=\"Repite la nueva contraseña\">\n" +
    "                    </div>\n" +
    "\n" +
    "                    <button ng-click=\"add()\" class=\"btn btn-success btn-block btn-lg\" type=\"submit\"><i class=\"glyphicon glyphicon-ok\"></i> Guardar</button>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-1\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("user/user-payment.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("user/user-payment.tpl.html",
    "<div class=\"mail-apps-wrap\">\n" +
    "    <div class=\"the-box bg-info no-border no-margin heading\">\n" +
    "        <div class=\"row\">\n" +
    "            <h1><i class=\"fa fa-user icon-lg icon-circle icon-bordered\"></i> Método de cobros</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">&nbsp;</div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-1\"></div>\n" +
    "        <div class=\"col-sm-10\">\n" +
    "            <div class=\"alert alert-warning fade in\" ng-show=\"status == 'error'\">\n" +
    "                <strong>Ups!</strong> Al parecer hubo un error al intentar pedir los permisos. <strong class=\"text-warning\">Intenta nuevamente mas tarde.</strong>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"alert alert-success fade in\" ng-show=\"status == 'success'\">\n" +
    "                <strong>La solicitud ha sido un éxito</strong> Ya puedes empezar a recibir pagos de otras personas.\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"the-box\">\n" +
    "                <h2>MercadoPago</h2>\n" +
    "                <form role=\"form\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <blockquote>\n" +
    "                            <p>Para que puedas recibir cobros sofre tus pedidos de dinero, necesitamos que habilites los permisos sobre la plataforma de pagos</p>\n" +
    "                            <small>Tranquila/o, las operaciones son totalmente seguras y estan respaldadas por la plataforma de MercadoPago. </small>\n" +
    "                        </blockquote>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"alert alert-info alert-bold-border square fade in\" style=\"border:0\">\n" +
    "                        <strong>Hey!</strong> Si aun no tienes una cuenta de mercadopago puedes solicitar una ingresando <a href=\"https://registration-ar.mercadopago.com/registration-mp/?mode=mp\" target=\"_blank\" class=\"alert-link\">aquí</a>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group text-center\">\n" +
    "                        <a href=\"https://auth.mercadolibre.com.ar/authorization?client_id={{appId}}&response_type=code&platform_id=mp&redirect_uri={{redirectUrl}}\" class=\"btn btn-success btn-lg\" type=\"submit\"><i class=\"glyphicon glyphicon-transfer\"></i> Solicita los permisos</a>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-1\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
