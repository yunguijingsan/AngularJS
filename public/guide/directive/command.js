/**
 * Created by lcf on 2015/1/20.
 */
var myApp = angular.module('myApp',[]);
myApp.controller('NaomiController', ['$scope', function($scope) {
    $scope.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
    };
}])
    .controller('IgorController', ['$scope', function($scope) {
        $scope.customer = {
            name: 'Igor',
            address: '123 Somewhere'
        };
    }])
    .directive('myCustomer4', function() {
        return {
            restrict: 'E',
            templateUrl: 'my-customer.html'
        };
    });
myApp.controller('timeController',['$scope',function($scope){
    $scope.format = "M/d/yy h:mm:ss a"
    }])
    .directive('myCurrentTime',['$interval','dateFilter',function($interval,dateFilter){
        function link(scope,element,attrs){
            var format;
            var timeoutId;
            function upateTime(){
                element.text(dateFilter(new Date(),format));
            }
            scope.$watch(attrs.myCurrentTime,function(value){
                format = value;
                upateTime();
            });

            element.on('$destroy',function(){
                $interval.cancel(timeoutId);
            })

            timeoutId = $interval(function(){
                upateTime();
            },1000);
        }
        return {
            link : link
        }
}]);
myApp.controller('AttrController',['$scope',function($scope){
    $scope.cx = 200;
}]);
myApp.controller('docController',['$scope',function($scope){
        $scope.customer = {
            name :'lcf',
            address :'Beijing Haidian'
        }
    }])
    .directive('myCustomer1',function(){
        return {
            template:'Name:{{customer.name}}   Address:{{customer.address}}'
        };
    })
    .directive('myCustomer2', function() {
        return {
            templateUrl: 'my-customer.html'
        };
    })
    .directive('myCustomer3', function() {
        return {
            restrict:'EA',
            templateUrl:function (ele,attr){
                return 'customer-' + attr.type+".html";
            }
        };
    });
