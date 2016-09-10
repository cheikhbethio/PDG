angular.module('connectionService', ['ngResource'])
	.factory('SignUp', ['$resource', function($resource){
		return $resource('/api/users', {}, {
      		
		})
	}])
	.factory('Login', ['$resource', function($resource){
		return $resource('/api/login', {},{
			login : {method : 'POST', isArray: false}
		})
	}]);


