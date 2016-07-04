'use strict';


angular.module('accueil', ['ui.router'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.accueil', {
				url :'/',
                css : 'assets/css/body/content.css',
				templateUrl : 'app/site/accueil/accueil.html',
				controller	: 'accueilController'
			})
	}])
	.controller('accueilController', ['$rootScope', '$scope', '$state', 
		function($rootScope, $scope, $state){
		/*$css.add('assets/css/body/content.css');
		$css.add('assets/css/body/sidebar.css');
		*/

		$rootScope.confVariable.titre = "Thiantakones";
		$scope.rubrique = function(id){
			$state.go("site.rubrique", {id:1});
		}

	}]);