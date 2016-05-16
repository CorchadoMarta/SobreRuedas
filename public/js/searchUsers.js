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
        $scope.userExams = obj;
        $http.post('/pagos', obj)
        .success(function(userPago) {

            console.log(userPago);

            $scope.userPagos =  userPago;
        })
        .error(function(userPago) {
            console.log('Error: ' + userPago);
        });

        $scope.userEscogido = obj;
    };

    $scope.exPrac = function() {
        var tipoEx;
        if ($scope.fechTeo == undefined || ""){
            tipoEx = 'true'; // examen practico
        } else {
            tipoEx = 'false'; // examen teorico
        };
        var examen = {fechEx: $scope.fechTeo || $scope.fechPrac,
        impExamen: 50,
        examenPagado: false,
        user: $scope.userExams._id,
        tipo: tipoEx };

       $http.post('/examenes', examen)
        .success(function() {

            console.log('es bien');

        })
        .error(function() {
            console.log('Es mal');
        });
        $scope.getUser($scope.userExams);

    };

}]);





