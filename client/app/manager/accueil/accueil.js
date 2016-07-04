'use strict';

angular.module('manAccueil', ['ui.router'])
.config(['$stateProvider', function($stateProvider){
	$stateProvider.
	state('dashboard.home', {
		url : '/',
		templateUrl : 'app/manager/accueil/accueil.html',
		controller : 'manAccueilController'
	})
}])

.controller('manAccueilController', ['$state', '$scope', "$rootScope", 
	function($state, $scope, $rootScope){
	//$css.add('assets/css/manager/accueil.css');
	$rootScope.confVariable.titre = $state.current.name;

}]);



