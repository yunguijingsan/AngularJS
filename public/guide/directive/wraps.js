var myApp = angular.module('myApp', []);
myApp.controller('Controller', ['$scope', function ($scope) {
    $scope.name = 'tobias';
}]).directive('myDialog', function () {
    return {
        restrict:'E',
        transclude:true,
        templateUrl:'my-dialog.html'

    }
})
