'use strict';


angular.module('accueil', ['ui.router', 'door3.css'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.accueil', {
				url :'/',
                css : 'assets/css/body/content.css',
				templateUrl : 'app/site/accueil/accueil.html',
				controller	: 'accueilController'
			})
	}])
	.controller('accueilController', ['$rootScope', '$scope', '$css', '$state', 
		function($rootScope, $scope, $css, $state){
		$css.add('assets/css/body/content.css');
		$css.add('assets/css/body/sidebar.css');
		$rootScope.titre = "Thiantakones";

		$scope.rubrique = function(id){
			$state.go("site.rubrique", {id:1});
		}

	}]);