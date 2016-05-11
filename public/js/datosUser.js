angular.module('datosUser', []);

angular.module('datosUser').controller('datosUsuario', ['$scope', '$http' , function ($scope, $http) {
    'use strict';

    var datos = {};
    var direccion = {};

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
        
        if($scope.editaApellidos != undefined){
            $scope.datos[0].apellidos = $scope.editaApellidos;
            datos.apellidos = $scope.editaApellidos;
        }
        
        if($scope.editaFecha != undefined){
            $scope.datos[0].fechNacimiento = $scope.editaFecha;
            datos.fechNacimiento = $scope.editaFecha;
        }
        
        if($scope.editaDni != undefined){
            $scope.datos[0].dni = $scope.editaDni;
            datos.dni = $scope.editaDni;
        }
        
        if($scope.editaCalle != undefined){
            $scope.datos[0].direccion.calle = $scope.editaCalle;
            direccion.calle = $scope.editaCalle;
            datos.direccion = direccion;
        }
        
        if($scope.editaNum != undefined){
            $scope.datos[0].direccion.num = $scope.editaNum;
            direccion.num = $scope.editaNum;
            datos.direccion = direccion;
        }
        
        if($scope.editaCp != undefined){
            $scope.datos[0].direccion.cp = $scope.editaCp;
            direccion.cp = $scope.editaCp;
            datos.direccion = direccion;
        }
        
        if($scope.editaProvincia != undefined){
            $scope.datos[0].direccion.provincia = $scope.editaProvincia;
            direccion.provincia = $scope.editaProvincia;
        }
        
        if($scope.editaPais != undefined){
            $scope.datos[0].direccion.pais = $scope.editaPais;
            direccion.pais = $scope.editaPais;
            datos.direccion = direccion;
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





