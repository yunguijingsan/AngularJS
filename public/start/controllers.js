function PhoneListCtrl($scope, $http) {
    $http.get('phones.json').success(function(data) {
        $scope.phones = Phone.query();
    });

    $scope.orderProp = 'age';
    $scope.hello = function(name) {
        alert('Hello ' + (name || 'world') + '!');
    }
}

function PhoneDetailCtrl($scope, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
}