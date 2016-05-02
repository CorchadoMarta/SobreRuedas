angular.module('searchUsers', []);

angular.module('searchUsers').controller('buscaUsuarios', ['$scope', '$http' , function ($scope, $http) {
    'use strict';

    $scope.busquedaUsers = function () {

        $http.post('/buscar')
        .success(function(encontrarUsers) {

            $scope.users =  encontrarUsers;
        })
        .error(function(encontrarUsers) {
            console.log('Error: ' + users);
        });
    };
}]);





