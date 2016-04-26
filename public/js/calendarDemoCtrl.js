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

        var auxili = {time: selectedTime};
        console.log(auxili);
        $http.post('/guardar', auxili)
            .success(function(data) {

            console.log('practica guardada');
        })
            .error(function(data) {
            console.log('Error: ' + data);
        });


    };
    // when landing on the page, get all todos and show them


    function createRandomEvents($http) {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            var startMinute = 0;
            var endMinute = 45;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
            events.push({
                title: 'Event - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });

        }
        return events;
    }
    /*    function mainController($scope, $http) {

    // when landing on the page, get all todos and show them
    $http.get('/pepe')

        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });*/
}]);
