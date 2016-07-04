'use strict';


angular.module('management', ['ui.router','ngAnimate', 'ui.bootstrap'])

.controller('manBodyController', ['$scope', '$state','$stateParams', '$rootScope',
	function($scope, $state, $stateParams, $rootScope){
        //$css.add('assets/css/manager/body.css');

        $rootScope.confVariable.titreGestion = "différentes fonctionnalités";

		$scope.menuOpen = false;

        $scope.snapOpts = {
      		disable: 'right'
    	};

}]);



