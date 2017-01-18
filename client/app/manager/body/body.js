'use strict';


angular.module('management', ['ui.router','ngAnimate', 'ui.bootstrap'])

.controller('manBodyController', ['$scope', '$state','$stateParams', '$rootScope',
	function($scope, $state, $stateParams, $rootScope){
    $rootScope.confVariable.titreGestion = "différentes fonctionnalités";
		$scope.menuOpen = false;
    $scope.snapOpts = {
    	disable: 'right'
    };
		$scope.rightToDo = false;	

}]);
