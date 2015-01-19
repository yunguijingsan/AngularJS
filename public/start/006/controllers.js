function PhoneListCtrl($scope, $http) {
    $http.get('phones.json').success(function(data) {
        $scope.phones = data;
    });

    $scope.orderProp = 'age';
}