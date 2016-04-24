'use strict';

angular.module('manAccueil', ['ui.router', 'door3.css'])
.config(['$stateProvider', function($stateProvider){
	$stateProvider.
	state('dashboard.home', {
		url : '/',
		templateUrl : 'app/manager/accueil/accueil.html',
		controller : 'manAccueilController'
	})
}])

.controller('manAccueilController', ['$state', '$scope', '$css', "$rootScope", 
	function($state, $scope, $css, $rootScope){
	$css.add('assets/css/manager/accueil.css');
	$rootScope.confVariable.titre = $state.current.name;

}]);



