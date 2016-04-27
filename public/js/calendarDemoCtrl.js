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
        $http.get('/practis')

        .success(function(events) {
            console.log(events);
            $scope.eventSource = events;
        })
        .error(function(events) {
            console.log('Error: ' + events);
        });


    };

    $scope.onEventSelected = function (event) {
        $scope.event = event;
    };

    $scope.onTimeSelected = function (selectedTime) {
        var ahora = new Date();
        ahora.setDate(ahora.getDate() + 1);
        if(ahora.getTime() < selectedTime.getTime()){
            var horaPractica = {time: selectedTime};
            console.log(horaPractica);
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

    };
    // when landing on the page, get all todos and show them
}]);
