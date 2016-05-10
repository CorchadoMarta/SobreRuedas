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
}]);





