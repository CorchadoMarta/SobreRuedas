angular.module('ui.testUser.tpls', ["template/testuser/inicio.html"]);
angular.module('testUser', ['ui.testUser']);

angular.module('testUser').controller('ui.testUser.hacerTest', ['$scope', '$http' , function ($scope, $http) {
    'use strict';

    $scope.prac = {uni : 0, pack : 0 };

    $scope.practisUser = function () {

        $http.get('/tests')
        .success(function(prac) {

            $scope.practicas =  prac;
        })
        .error(function(practicas) {
            console.log('Error: ' + practicas);
        });
    };

}])
.directive('inicio', function () {
    'use strict';
    return {
        replace: true,
        templateUrl: 'template/testuser/inicio.html',
        controller: 'ui.testUser.hacerTest'
    };
});

angular.module("template/testUser/inicio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/testUser/inicio.html",
    "<div>\n" +
    "    <p>pepe</p>\n" +
    "</div>");
}]);