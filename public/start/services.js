angular.module('phonecatServices', ['ngResource']).
    factory('Phone', function($resource){
        return $resource(':phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    });