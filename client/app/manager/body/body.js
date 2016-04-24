'use strict';


angular.module('management', ['ui.router', 'door3.css','ngAnimate', 'ui.bootstrap'])

.controller('manBodyController', ['$scope', '$state','$stateParams', '$css', '$rootScope',
	function($scope, $state, $stateParams, $css, $rootScope){
        $css.add('assets/css/manager/body.css');

        $rootScope.confVariable.titreGestion = "différentes fonctionnalités";

		$scope.menuOpen = false;

        $scope.snapOpts = {
      		disable: 'right'
    	};

}]);



