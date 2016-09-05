var userService  = angular.module('userService', ['ngResource']);

userService.factory('user', ['$resource', function($resource){
	return $resource('api/users/:id', {}, {
		query: {method: 'GET', isArray: true},
		get: {method: 'GET'},
		save: {method: 'POST'},
		update: {method: 'PUT',isArray: false},
		remove: {method: 'DELETE'}
	});
}]);

// userService.factory('getUserByLabel', ['$resource', function ($resource) {
// 				return $resource('/api/forComment/bylabel', {}, {
// 					get: {method: 'GET'}
// 				});
// 			}]);