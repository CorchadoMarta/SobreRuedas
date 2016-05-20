angular.module('showPractis', []);

angular.module('showPractis').controller('buscarPractis', ['$scope', '$http' , function ($scope, $http) {
    'use strict';

    $scope.busquedaPracticas = function () {

        $http.get('/buscarPracticas')
        .success(function(encontrarPractica) {
            console.log(encontrarPractica);
            $scope.users =  encontrarPractica;
        })
        .error(function(encontrarPractica) {
            console.log('Error:');
        });
    };

}]);





