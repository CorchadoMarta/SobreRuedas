angular.module("testUser.tpls", ["template/testUser/resultado.html", "template/testUser/inicio.html", "template/testUser/test.html", "template/testUser/fin.html"]);

angular.module('testUser', ["testUser.tpls"]).controller('hacerTest', ['$scope', '$http' , function ($scope, $http) {
    'use strict';

    $scope.position = 0;

    $scope.respUsusario = new Array(30);

    $scope.respPreg = {checked: false};

    $scope.acabado = false;

    $scope.estilazo = new Array(3);


    $scope.reset = function () {
        $scope.position = 0;
        $scope.respUsusario = new Array(30);
        $scope.respPreg = {checked: false};
        $scope.acabado = false;
        $scope.estilazo = [];
    };

    $scope.moveIndex = function (pos) {
        $scope.position = pos;
        if($scope.respUsusario[$scope.position] == undefined){
            $scope.respPreg = {checked: false};
        } else {
            $scope.respPreg = $scope.respUsusario[$scope.position];
        };
        $scope.corregirEstilos();   

    };

    $scope.corregirEstilos = function () {
        if($scope.acabado == true){
            $scope.estilazo = [];
            var resultStyle = $scope.eventSource[$scope.position].respuestas.solucion;
            $scope.estilazo[resultStyle] = 'green';

            if($scope.eventSource[$scope.position].respuestas.solucion != $scope.respUsusario[$scope.position]){
                $scope.estilazo[($scope.respUsusario[$scope.position])] = 'red';
            }
            console.log($scope.estilazo);

        };   
    };

    $scope.corregir = function () {
        $scope.fallos = 0;
        for(var i=0; i <  $scope.respUsusario.length ; i++){
            console.log($scope.eventSource[i].respuestas.solucion + "respuestas " + $scope.respUsusario[i]);
            if($scope.eventSource[i].respuestas.solucion != $scope.respUsusario[i]){
                $scope.fallos++;
            }
        };
        $scope.acabado = true;
        $scope.corregirEstilos();

        var parametroTest = { fallos: $scope.fallos , idTema : $scope.eventSource[0].idTema};

        $http.post('/guardarTest', parametroTest)
        .success(function() {
            console.log('Guardado Test');
        })
        .error(function() {
            console.log('Error');
        });
        $scope.cargarResultados();

    };
    $scope.cargarResultados = function () {
        $http.get('/testsDelUser')
        .success(function(eve) {
            $scope.ultimosTest = eve;
        })
        .error(function(eve) {
            console.log('Error: ' + eve);
        });
    };



    $scope.loadEvents = function () {

        $http.get('/tests')
        .success(function(events) {
            $scope.eventSource = events;
        })
        .error(function(events) {
            console.log('Error: ' + events);
        });

        $scope.cargarResultados();
    };

    $scope.move = function (pos) {
        if($scope.position >= 0  && $scope.position <= 30){
            $scope.position += pos;
            if($scope.respUsusario[$scope.position] == undefined){
                $scope.respPreg = {checked: false};

            } else {
                $scope.respPreg = $scope.respUsusario[$scope.position];
            }
            $scope.corregirEstilos(); 

        };

    };

    $scope.myFunc = function (pos) {
        $scope.respUsusario[$scope.position] = $scope.respPreg;
    };

}])
.directive('resultado', function () {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/testUser/resultado.html',
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
    "<div class='form-group'>\n" +
    "   <p>{{(position+1) + '. ' + eventSource[position].pregunta}}</p>\n" +
    "   <div class='form-group'>\n" +
    "       <input type='radio' name='respuesta' value='0' ng-model='respPreg' ng-disabled='acabado' ng-change='myFunc()' ><span ng-style='{ color : estilazo[0] }' >{{eventSource[position].respuestas.respuesta[0]}}</span></input><br>\n" +
    "       <input type='radio' name='respuesta' value='1' ng-model='respPreg' ng-disabled='acabado' ng-change='myFunc()' ><span ng-style='{ color : estilazo[1] }' >{{eventSource[position].respuestas.respuesta[1]}}</span></input><br>\n" +
    "       <input type='radio' name='respuesta' value='2' ng-model='respPreg' ng-disabled='acabado' ng-change='myFunc()' ><span ng-style='{ color : estilazo[2] }' >{{eventSource[position].respuestas.respuesta[2]}}</span></input><br>\n" +
    "   </div>\n" +
    "</div>");
}]);

angular.module("template/testUser/fin.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/testUser/fin.html",

    "<div>\n" +
    "   <div>\n" +
    "       <span>¿ Quieres acabar el test?</span>\n" +
    "   </div>\n" +
    "   <div class='form-group'>\n" +
    "       <div class='col-sm-offset-2 col-sm-10'>\n" +
    "           <button class='btn btn-default' data-dismiss='modal'>Cancelar</button>\n" +
    "       </div>\n" +
    "       <div class='col-sm-offset-2 col-sm-10'>\n" +
    "           <button type='submit' class='btn btn-default' ng-click='corregir()'>Acabar</button>\n" +
    "       </div>\n" +
    "   </div>\n" +
    "</div>");

}]);

angular.module("template/testUser/resultado.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/testUser/resultado.html",
    "<div>\n" +
    "    <div>\n" +
    "    <p>PEPEEEEEEEEEEEE</p>\n" +
    "    </div>\n" +
    "</div>");
}]);
