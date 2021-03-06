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
        $scope.mostrarReno  = false;
        $scope.mostrarPrac  = false;
        $scope.mostrarTeo  = false;
        $scope.mostrarFallos = false;
    };

    $scope.getUser = function(obj) {
        $scope.userExams = obj;
        console.log($scope.userExams);
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
            var hoy = new Date();
            var longiExPrac = $scope.userPagos[0].examenPractico.length;
            
            if($scope.userExams.examen.teoricoAprobado){
                $scope.mostrarReno  = false;
                $scope.mostrarPrac  = true;
                $scope.mostrarTeo  = false;
                $scope.mostrarFallos = false;
                //ya estamos en el práctico
                var longiExTeo = $scope.userPagos[0].examenTeorico.length;

            } else {
                if ( $scope.userPagos[0].examenTeorico.length != 0){
                    var arrayTeo = $scope.userPagos[0].examenTeorico;
                    // sólo tiene teórico
                    //ordenar por fechas los exámenes de teorica
                    arrayTeo.sort(function(a,b){ 
                        return new Date(b.fechEx) - new Date(a.fechEx);
                    });
                    console.log(arrayTeo);
                    var fechaPrueba = new Date(arrayTeo[0].fechEx);
                    if( !( 'fallos' in arrayTeo[0]) && hoy > fechaPrueba ){
                        $scope.mostrarReno  = false;
                        $scope.mostrarPrac  = false;
                        $scope.mostrarTeo  = false;
                        $scope.mostrarFallos = true;

                    } else {
                        if(arrayTeo.length == 2 && !$scope.userExams.examen.teoricoAprobado){
                            console.log($scope.userPagos[0]);
                            $scope.mostrarReno  = false;
                            $scope.mostrarPrac  = true;
                            $scope.mostrarTeo  = false;
                            $scope.mostrarFallos = false;

                        } else {
                            $scope.mostrarReno  = false;
                            $scope.mostrarPrac  = false;
                            $scope.mostrarTeo  = true;
                            $scope.mostrarFallos = false;

                        }

                    }

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

    $scope.fallos = function(obj) {

    //impExTeo = 0, impEXPrac = 40.6
    var examenFallo = {fallos: $scope.fallosEx,
        user: $scope.userExams._id,
        exId: $scope.userPagos[0].examenTeorico[0]._id};
        console.log($scope.userPagos[0].examenTeorico[0]);
        console.log(examenFallo);

        $http.post('/fallos', examenFallo)
        .success(function() {
            console.log('es bien');
        })
        .error(function() {
            console.log('Es mal');
        });
        if ($scope.fallosEx <= 3){
            var aprobado ={ 'examen.teoricoAprobado' : true,
            user: $scope.userExams._id };
            $http.post('/editaDatosUser', aprobado)
            .success(function() {
                $scope.userExams.examen[0].teoricoAprobado = true;
                console.log('es bien boolean probado');
            })
            .error(function() {
                console.log('Es mal');
            });
        }

        $scope.getUser($scope.userExams);

    };

    $scope.exPrac = function(obj) {
        var tipoEx = obj;
        var examen = {fechEx: $scope.fechTeo || $scope.fechPrac,
            examenPagado: false,
            user: $scope.userExams._id,
            tipo: tipoEx };

            $http.post('/examenes', examen)
            .success(function() {
                $scope.getUser($scope.userExams);
                console.log('es bien');

            })
            .error(function() {
                console.log('Es mal');
            });


        };
        $scope.pagar = function () {
            var user1 = {user: $scope.userExams._id,
                exId: $scope.userPagos[0].examenPractico[0]._id};
                console.log(user1);
                $http.post('/pagar', user1)
                .success(function(encontrarUsers) {
                    $scope.userPagos[0].examenPractico[0].examenPagado = true;
                    console.log('Bien 1');
                })
                .error(function(encontrarUsers) {
                    console.log('Error: mal2' + users);
                });
            };

            $scope.datosTraer = function (){
                $http.get('/datosUser')
                .success(function(datosServer) {

                    $scope.userExams =  datosServer;
                    $scope.getUser($scope.userExams[0]);
                })
                .error(function(datosServer) {
                    console.log('Error: ' + datosServer);
                });
            };

        }]);





