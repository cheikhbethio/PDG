angular.module('connectionService', ['ngResource'])
	.factory('SignUp', ['$resource', function($resource){
		return $resource('http://localhost:8080/api/users', {}, {
		})
	}])
	.factory('Login', ['$resource', function($resource){
		return $resource('http://localhost:8000/api/login', {},{
			login : {method : 'POST', isArray: false}
		})
	}]);