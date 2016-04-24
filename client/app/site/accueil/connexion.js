'use strict';


angular.module('connexion', ['ui.router', 'door3.css'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.connexion', {
				url :'/connexion',
                css : 'assets/css/body/connexion.css',
				templateUrl : 'app/site/accueil/connexion.html',
				controller	: 'connexionController'
			})
	}])
	.controller('connexionController', ['$rootScope', '$scope', '$css', '$state', 
		function($rootScope, $scope, $css, $state){
		/*$css.add('assets/css/body/content.css');
		$css.add('assets/css/body/sidebar.css');*/
		$rootScope.titre = "Thiantakones";

		$scope.rubrique = function(id){
			$state.go("site.rubrique", {id:1});
		}

	}]);