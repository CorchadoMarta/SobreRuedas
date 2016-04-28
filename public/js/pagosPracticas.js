// public/core.js
angular.module('pagosPracticas', []);

function mainController($scope, $http) {
    // when landing on the page, get all todos and show them

    // when submitting the add form, send the text to the node API
        $http.get('/pagos')
            .success(function(data) {
                $scope.practisUser = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
   


}