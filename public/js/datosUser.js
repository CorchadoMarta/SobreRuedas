angular.module('datosUser', []);

angular.module('datosUser').controller('datosUsuario', ['$scope', '$http' , function ($scope, $http) {
    'use strict';

    var datos = {};

    $scope.datosUserFunction = function () {

        $http.get('/datosUser')
            .success(function(datoDeUsuario) {
            console.log(datoDeUsuario);
            $scope.datos =  datoDeUsuario;
        })
            .error(function(datoDeUsuario) {
            console.log('Error: ' + datoDeUsuario);
        });
    };

    $scope.editor = false;

    $scope.editar = function() {
        $scope.editor = true;
    };

    $scope.cancelar = function() {
        $scope.editor = false;
    };

    $scope.guardar = function() {
        console.log($scope.editaNombre);
        if($scope.editaNombre != undefined){
            $scope.datos[0].nombre = $scope.editaNombre;
            datos.nombre = $scope.editaNombre;
        }
        $scope.cancelar();
        $http.post('/editaDatosUser', datos)
            .success(function() {
            console.log('bien hecho');
            $scope.datosUserFunction();
        })
            .error(function() {
            console.log('Error MAAL' );
        });
    };


}]);





