angular.module('poemeServices', ['ngResource'])

.factory('Poeme', ['$resource', function($resource){
	return $resource('/api/poeme/:id', {}, {
    	query: {method:'GET', isArray:true},
    	get: {method:'GET', isArray:false},
    	save: {method:'POST', isArray:false},
     	update: {method:'PUT', isArray:false},
     	remove : {method : 'DELETE'}
    });
  }]);
