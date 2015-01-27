var myApp = angular.module("myApp",[]);

myApp.controller('MyController2',['$scope','notify',function($scope,notify){
    $scope.callNotify = function(msg){
        notify(msg);
    }
}]).factory('notify',['$window',function(win){
    var msgs = [];
    return function(msg){
        msgs.push(msg);
        if(msgs.length==3){
            win.alert(msgs.join('\n'));
            msgs=[];
        }
    }
}]);



myApp.controller('MainController', ['$scope', function($scope) {
    $scope.timeOfDay = 'morning';
    $scope.name = 'Nikki';
}]);
myApp.controller('ChildController', ['$scope', function($scope) {
    $scope.name = 'Mattie';
}]);
myApp.controller('GrandChildController', ['$scope', function($scope) {
    $scope.timeOfDay = 'evening';
    $scope.name = 'Gingerbread Baby';
}]);

myApp.controller('CustomSpicyController',['$scope',function($scope){
    $scope.customSpice = 'wasabi';
    $scope.spice = 'very';

    $scope.spicy = function(spice){
        $scope.spice = spice;
    }
}])

myApp.controller('GreetingController',['$scope',function($scope){
    $scope.greeting = 'Greeting  aaahhh!';
}]);

myApp.controller('DoubleController',['$scope',function($scope){
    $scope.double = function(value){
        return value * 2;
    }
}])

myApp.controller('SpicyController',['$scope',function($scope){
    $scope.spice = 'very';
    $scope.chiliSpicy = function(){
        $scope.spice = 'chili';
    }
    $scope.jalapenoSpicy = function(){
        $scope.spice = 'jalapeno';
    }
}]);