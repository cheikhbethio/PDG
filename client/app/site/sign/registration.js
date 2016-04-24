'use strict';


angular.module('registration', ['ui.router', 'door3.css'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.registration', {
				url :'/registration',
                css : 'assets/css/body/sign.css',
				templateUrl : 'app/site/sign/registration.html',
				controller	: 'registrationController'
			})
	}])
	.controller('registrationController', ['$rootScope', '$scope', '$css', '$state', 
		function($rootScope, $scope, $css, $state){

		$rootScope.titre = "Thiantakones";


	}]);