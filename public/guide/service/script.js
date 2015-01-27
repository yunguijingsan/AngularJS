var myApp = angular.module("myApp", []);

myApp.controller('MyController', ['$scope', 'notify', function ($scope, notify) {
    $scope.callNotify = function (msg) {
        notify(msg);
    }
}]).factory('notify', ['$window', function (win) {
    var msgs = [];
    return function (msg) {
        msgs.push(msg);
        if (msgs.length == 3) {
            win.alert(msgs.join('\n'));
            msgs = [];
        }
    }
}]);

myApp.controller('UnicornController',['$scope','unicornLauncher',function($scope,unicornLauncher){
    unicornLauncher.launch();
    $scope.unicornLauncher =unicornLauncher;
    $scope.launch = function (){
        console.log('launch')
        unicornLauncher.launch();
    }
}]);

function UnicornLauncher(apiToken) {
    this.launchedCount = 0;
    this.launch = function() {
        this.launchedCount++;
    }
}
myApp.factory('unicornLauncher', ["apiToken", function(apiToken) {
    return new UnicornLauncher(apiToken);
}]);
myApp.factory('batchLog', ['$interval', '$log', function ($interval, $log) {
    var messageQueue = [];

    function log() {
        if (messageQueue.length) {
            $log.log('batchLog messages:', messageQueue);
            messageQueue = [];
        }
    }
    $interval(log, 5000);
    return function (message) {
        messageQueue.push(message);
    }
}]);

myApp.factory('routeTemplateMonitor', ['$route', 'batchLog', '$rootScope',
    function ($route, batchLog, $rootScope) {
        $rootScope.$on('$rootChangeSuccess', function () {
            batchLog($route.current ? root.current.template : null);
        })
}]);

myApp.value('clientId','a12345654321x');

myApp.controller('DemoController',['clientId',function(clientId){
    this.clientId = clientId;
}])

myApp.factory('apiToken',['clientId',function(clientId){
    var encrypt = function(data1,data2){
        return (data1 +':' +data2).toLowerCase();
    }
    var secret = window.localStorage.getItem('myApp.secret');
    var apiToken = encrypt(clientId,secret);
    return apiToken;
}]);

