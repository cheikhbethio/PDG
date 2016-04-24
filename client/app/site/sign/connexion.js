'use strict';


angular.module('connexion', ['ui.router', 'door3.css'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.connexion', {
				url :'/connexion',
                css : 'assets/css/body/sign.css',
				templateUrl : 'app/site/sign/connexion.html',
				controller	: 'connexionController'
			})
	}])
	.controller('connexionController', ['$rootScope', '$scope', '$css', '$state', 
		function($rootScope, $scope, $css, $state){

		$rootScope.titre = "Thiantakones";


	}]);