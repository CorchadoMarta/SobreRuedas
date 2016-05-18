angular.module('datosUser', []);

angular.module('datosUser').controller('datosUsuario', ['$scope', '$http' , function ($scope, $http) {
    'use strict';

    var datos = {};
    datos.direccion = {};

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
            datos.nombre = $scope.editaNombre;
        }
        
        if($scope.editaApellidos != undefined){
            datos.apellidos = $scope.editaApellidos;
        }
        
        if($scope.editaFecha != undefined){
            datos.fechNacimiento = $scope.editaFecha;
        }
        
        if($scope.editaDni != undefined){
            datos.dni = $scope.editaDni;
        }
        
        datos.direccion.calle = $scope.editaCalle || $scope.datos[0].direccion.calle;

        datos.direccion.num = $scope.editaNum || $scope.datos[0].direccion.num;

        datos.direccion.cp = $scope.editaCp || $scope.datos[0].direccion.cp;
        
        datos.direccion.provincia = $scope.editaProvincia || $scope.datos[0].direccion.provincia;

        datos.direccion.pais = $scope.editaPais || $scope.datos[0].direccion.pais;

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





