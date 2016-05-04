angular.module("testUser.tpls", ["template/testUser/general.html", "template/testUser/inicio.html", "template/testUser/test.html", "template/testUser/fin.html"]);

angular.module('testUser', ["testUser.tpls"]).controller('hacerTest', ['$scope', '$http' , function ($scope, $http) {
    'use strict';
    $scope.position = 0;

    $scope.respUsusario = [];


    $scope.loadEvents = function () {

        $http.get('/tests')
        .success(function(events) {
            $scope.eventSource = events;
        })
        .error(function(events) {
            console.log('Error: ' + events);
        });
    };

    $scope.move = function (pos) {
        console.log($scope.position);
        if($scope.position >= 0 && $scope.position <= 30){
            $scope.position += pos;
        }
        

    };


}])
.directive('general', function () {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/testUser/general.html',
        require: ['testUser', '?^ngModel'],
        controller: 'hacerTest',
    };
})
.directive('inicio', function () {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/testUser/inicio.html',
        require: ['testUser', '?^ngModel'],
        controller: 'hacerTest',
    };
})
.directive('test', function () {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/testUser/test.html',
        require: ['testUser', '?^ngModel'],
        controller: 'hacerTest',
    };
})
.directive('fin', function () {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/testUser/fin.html',
        require: ['testUser', '?^ngModel'],
        controller: 'hacerTest',
    };
});



angular.module("template/testUser/inicio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/testUser/inicio.html",
    "<div>\n" +
    "   <h3  class=\"col-sm-4\">TEST TEÓRICOS</h3>\n" +
    "   <label>Escoge Tema</label>\n" +
    "   <button type=\"button\" class=\"btn btn-default\">Escoger</button>\n" +
    "   <button type=\"button\" class=\"btn btn-default\" data-toggle=\"modal\" data-target=\"#ISesion\">Empezar</button>\n" +
    "</div>"
    );
}]);

angular.module("template/testUser/test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/testUser/test.html",
    "<div modal='showModal' class='modal fade' id='ISesion' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-backdrop='static' data-keyboard='false'>\n" +
    "   <div class='modal-dialog' role='document'>\n" +
    "       <div class='modal-content'>\n" +
    "           <div class='modal-header'>\n" +
    "               <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>\n" +
    "               <h4 class='modal-title align-center' id='myModalLabel'>Test</h4>\n" +
    "               <div class='modal-body'>\n" +
    "                   <div>\n" +
    "                       <p>{{eventSource[0].pregunta}}</p>\n" +
    "                       <div class='form-group'>\n" +
    "                           <input class='modal-body'type='radio'>{{eventSource[0].respuestas.respuesta[0]}}</input>\n" +
    "                           <input class='modal-body'type='radio'>{{eventSource[0].respuestas.respuesta[1]}}</input>\n" +
    "                           <input class='modal-body'type='radio'>{{eventSource[0].respuestas.respuesta[2]}}</input>\n" +
    "                       </div>\n" +
    "                   </div>\n" +
    "                   <fin></fin>\n" +
    "               </div>\n" +
    "           </div>\n" +
    "      </div>\n" +
    "   </div>\n" +
    "</div>");
}]);

angular.module("template/testUser/fin.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/testUser/fin.html",

    "                                <div>\n" +
    "                                <div>\n" +
    "                                    <span>¿ Quieres acabar el test?</span>\n" +
    "                                </div>\n" +
    "                            <div class='form-group'>\n" +
    "                              <div class='col-sm-offset-2 col-sm-10'>\n" +
    "                               <button class='btn btn-default' data-dismiss='modal'>Cancelar</button>\n" +
    "                            </div>\n" +
    "                            <div class='col-sm-offset-2 col-sm-10'>\n" +
    "                                <button type='submit' class='btn btn-default'>Acabar</button>\n" +
    "                            </div>\n" +
        "                            </div>\n" +
    "                        </div>");

}]);

angular.module("template/testUser/general.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/testUser/general.html",
    "<div>\n" +
    "    <div>\n" +
    "    <p>PEPEEEEEEEEEEEE</p>\n" +
    "    </div>\n" +
    "</div>");
}]);
