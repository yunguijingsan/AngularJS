/**
 * Created by lcf on 2015/1/20.
 */
function Ctrl2($scope){
    $scope.format = 'M/d/yy h:mm:ss a';
}

function Ctrl3($scope) {
    var exprs = $scope.exprs = [];
    $scope.expr = '3*10|currency';
    $scope.addExp = function(expr) {
        exprs.push(expr);
    };

    $scope.removeExp = function(index) {
        exprs.splice(index, 1);
    };
}

function angularForm($scope) {
    $scope.master= {};

    $scope.update = function(user) {
        $scope.master= angular.copy(user);
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.isUnchanged = function(user) {
        return angular.equals(user, $scope.master);
    };
    $scope.reset();
}
angular.module('time',[]).directive("myCurrentTime",
function($timeout,dateFilter){
    return function (scope,element,attrs){
        var format,timeoutId;
        function upateTime(){
            element.text(dateFilter(new Date(),format));
        }
        scope.$watch(attrs.myCurrentTime,function(value){
            format = value;
            upateTime();
        })
        function updateLater(){
            timeoutId = $timeout(function(){
                upateTime();
                updateLater();
            },1000);
        }
        element.bind('$destroy',function(){
            $timeout.cancel(timeoutId);
        })
        updateLater();
    }
});
angular.module('form-example2', []).directive('contenteditable', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            // view -> model
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ctrl.$setViewValue(elm.html());
                });
            });

            // model -> view
            ctrl.$render = function(value) {
                elm.html(value);
            };

            // load init value from DOM
            ctrl.$setViewValue(elm.html());
        }
    };
});