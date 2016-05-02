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

    $scope.onTimeSelected = function (practiObject) {
        //Controlar objeto y fecha por separado
        if(practiObject.events != undefined){
            var practId = practiObject.events[0].event._id;
            var horaPractica = {practId: practId };

            $http.post('/borrar', horaPractica)
            .success(function(data) {
                $scope.loadEvents();
                console.log('practica borrada');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
            

        } else {
            var selectedTime = practiObject.time;
            var horaPractica = {time: selectedTime };
            console.log(selectedTime.getTime());
            var ahora = new Date();
            ahora.setDate(ahora.getDate() + 1);
            if(ahora.getTime() < selectedTime.getTime()){
                $http.post('/guardar', horaPractica)
                .success(function(data) {
                    $scope.loadEvents();
                    console.log('practica guardada');
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            } else {
                console.log('es una fecha anterior');
            };

        }

    };

}]);

angular.module('calendarDemoApp').controller('PracticasUser', ['$scope', '$http' , function ($scope, $http) {
    'use strict';

    $scope.prac = {uni : 0, pack : 0 };

    $scope.practisUser = function () {

        $http.get('/pagos')
        .success(function(prac) {

            $scope.practicas =  prac;
        })
        .error(function(practicas) {
            console.log('Error: ' + practicas);
        });
    };
    $scope.open = function() {
        $scope.showModal = true;
    };

    $scope.ok = function() {
        $scope.showModal = false;
    };

    $scope.cancel = function() {
        $scope.showModal = false;
    };

}]);





