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

            $scope.userPagos =  userPago;
        })
        .error(function(userPago) {
            console.log('Error: ' + userPago);
        });

        $scope.userEscogido = obj;

    };

    $scope.reservas = function() {
        if (  $scope.userPagos != undefined){
            var longiExPrac = $scope.userPagos[0].examenPractico.length;
            if(longiExPrac != undefined){
                var longiExTeo = $scope.userPagos[0].examenTeorico.length;
                console.log("UNO  " + longiExPrac + " Prac -- Teo " + longiExTeo);
                console.log($scope.userPagos[0].examenPractico[longiExPrac - 1]);

            } else {
                console.log("DOS  " + longiExPrac + " Prac -- Teo " + longiExTeo);
            }

        }
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





