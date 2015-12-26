'use strict';


angular.module('rubrique', ['ui.router', 'door3.css'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.rubrique', {
				url :'/rubrique/:id',
				templateUrl : 'app/site/rubrique/rubrique.html',
				controller	: 'rubriqueController'
			})
	}])
	.controller('rubriqueController', ['$rootScope','$scope', '$css', 
		function($rootScope, $scope, $css){
		$css.add('assets/css/rubrique.css');
		$css.add('assets/css/body/sidebar.css');
		$rootScope.titre = "Titre de la rubrique";

	}]);