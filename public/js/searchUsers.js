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
            $scope.reservas();
        })
        .error(function(userPago) {
            console.log('Error: ' + userPago);
        });

        $scope.userEscogido = obj;

    };

    $scope.reservas = function() {
        if (  $scope.userPagos != undefined){
            var longiExPrac = $scope.userPagos[0].examenPractico.length;
            
            if(longiExPrac != (undefined || 0)){
                $scope.mostrarReno  = false;
                $scope.mostrarPrac  = true;
                $scope.mostrarTeo  = false;
                $scope.mostrarFallos = false;
                //ya estamos en el práctico
                var longiExTeo = $scope.userPagos[0].examenTeorico.length;
                console.log("UNO  " + longiExPrac + " Prac -- Teo " + longiExTeo);

            } else {
                var arrayTeo = $scope.userPagos[0].examenTeorico;
                // sólo tiene teórico
                //ordenar por fechas los exámenes de teorica
                arrayTeo.sort(function(a,b){ 
                    return new Date(b.fechEx) - new Date(a.fechEx);
                });

                if( !( 'fallos' in arrayTeo[0]) ){
                    console.log('no existe fallos');
                    $scope.mostrarReno  = false;
                    $scope.mostrarPrac  = false;
                    $scope.mostrarTeo  = true;
                    $scope.mostrarFallos = true;

                } else {
                    $scope.mostrarReno  = false;
                    $scope.mostrarPrac  = false;
                    $scope.mostrarTeo  = true;
                    $scope.mostrarFallos = false;

                }
            }
            return longiExPrac;
        };

    };

    $scope.exPrac = function(obj) {
        var tipoEx = obj;
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





