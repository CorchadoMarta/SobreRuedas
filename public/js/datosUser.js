angular.module('datosUser', []);

angular.module('datosUser').controller('datosUsuario', ['$scope', '$http' , function ($scope, $http) {
    'use strict';

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
        $scope.editaNombre = $scope.datos[0].nombre;
    };

    $scope.cancelar = function() {
        $scope.editor = false;
    };

    $scope.guardar = function() {
        $scope.datos[0].nombre = $scope.editaNombre;
        $scope.cancelar();
    };

}]);





