angular.module('calendarDemoApp', ['ui.rCalendar']);

angular.module('calendarDemoApp').controller('CalendarDemoCtrl', ['$scope', '$http' , function ($scope, $http) {
    'use strict';
    $scope.changeMode = function (mode) {
        $scope.mode = mode;
    };

    $scope.today = function () {
        $scope.currentDate = new Date();
    };

    $scope.isToday = function () {
        var today = new Date(),
        currentCalendarDate = new Date($scope.currentDate);

        today.setHours(0, 0, 0, 0);
        currentCalendarDate.setHours(0, 0, 0, 0);
        return today.getTime() === currentCalendarDate.getTime();
    };

    $scope.loadEvents = function () {

        $http.get('/pagos')
        .success(function(data) {
            pepito = data;
            console.log(pepito);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

        $http.get('/practis')
        .success(function(events) {
            console.log(events);
            $scope.eventSource = events;
            return events;
        })
        .error(function(events) {
            console.log('Error: ' + events);
        });
    };

    $scope.onEventSelected = function (event) {
        $scope.event = event;
    };

    $scope.onTimeSelected = function (selectedTime) {
        var practis = $scope.eventSource;
        var practId = search(selectedTime,practis);
        var horaPractica = {time: selectedTime, practId: practId };

        if(practId != undefined){

           $http.post('/borrar', horaPractica)
           .success(function(data) {

            console.log('practica borrada');
        })
           .error(function(data) {
            console.log('Error: ' + data);
        });

       } else {
        var ahora = new Date();
        ahora.setDate(ahora.getDate() + 1);
        if(ahora.getTime() < selectedTime.getTime()){
            $http.post('/guardar', horaPractica)
            .success(function(data) {
                console.log('practica guardada');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        } else {
            console.log('es una fecha anterior');
        }
    }

    $scope.loadEvents();

};
function search(nameKey, myArray){
    if (myArray[0] != undefined){
        var nuevo = new Date(myArray[0].startTime);
        console.log(nameKey.getTime());
        for (var i=0; i < myArray.length || nuevo.getTime() == nameKey.getTime(); i++) {
            nuevo = new Date(myArray[i].startTime);
            if (nuevo.getTime() == nameKey.getTime()) {
                return myArray[i]._id;
            }
        }

    } 

}
var pepito;



}]);
