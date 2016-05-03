angular.module("testUser.tpls", ["template/testUser/general.html", "template/testUser/inicio.html", "template/testUser/test.html", "template/testUser/fin.html"]);

angular.module('testUser', ["testUser.tpls"]).controller('hacerTest', ['$scope', '$http' , function ($scope, $http) {
    'use strict';
    $scope.loadEvents = function () {

        $http.get('/tests')
        .success(function(events) {
            $scope.eventSource = events;
        })
        .error(function(events) {
            console.log('Error: ' + events);
        });
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
    "</div>"
    );
}]);

angular.module("template/testUser/test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/testUser/test.html",
    "<div>\n" +
    "    <div >\n" +
    "    <p>{{eventSource[0].pregunta}}</p>\n" +
    "    <p>{{eventSource[0].respuestas[0].respuesta}}</p>\n" +
    "    <p>{{eventSource[0].respuestas[1].respuesta}}</p>\n" +
    "    <p>{{eventSource[0].respuestas[2].respuesta}}</p>\n" +
    "    <p>CONTINUE</p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/testUser/fin.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/testUser/fin.html",
    "<div>\n" +
    "    <div>\n" +
    "    <p>PEPEEEEEEEEEEEE</p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/testUser/general.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/testUser/general.html",
    "<div>\n" +
    "    <div>\n" +
    "    <p>PEPEEEEEEEEEEEE</p>\n" +
    "    </div>\n" +
    "</div>");
}]);
