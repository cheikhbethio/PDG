'use strict';


angular.module('poemes', ['ui.router', 'door3.css'])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('dashboard.createPoemes', {
		url : '/createPoemes',
		templateUrl : 'app/manager/poemes/create.html',
		controller : 'createPoemeController'				
	})
}])
.controller('createPoemeController', ['$state', '$scope', '$css', "$rootScope", 
	function($state, $scope, $css, $rootScope){
	$css.add('assets/css/manager/poemes/createPoemes.css');

}]);