angular.module('phonecatFilters', []).filter('lowerCase', function() {
    return function(input) {
        return input.toLowerCase();
    };
});