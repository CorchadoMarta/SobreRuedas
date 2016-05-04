angular.module('searchUsers', []);

angular.module('searchUsers').controller('buscaUsuarios', ['$scope', '$http' , function ($scope, $http) {
    'use strict';

    $scope.busquedaUsers = function (user) {

        $http.post('/buscar', user)
        .success(function(encontrarUsers) {
            console.log(user);

            $scope.users =  encontrarUsers;
        })
        .error(function(encontrarUsers) {
            console.log('Error: ' + users);
        });
    };
    $scope.getUser = function(obj) {
        $scope.userEscogido = obj;
    };
}]);





