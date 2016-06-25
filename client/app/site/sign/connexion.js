'use strict';

angular.module('connexion', ['ui.router', 'door3.css', ])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.connexion', {
				url :'/connexion',
                css : 'assets/css/body/sign.css',
				templateUrl : 'app/site/sign/connexion.html',
				controller	: 'connexionController'
			})
	}])
	.controller('connexionController', ['Login','$rootScope', '$scope', '$css', '$state', '$localStorage',
		function(Login , $rootScope, $scope, $css, $state, $localStorage){

		$rootScope.titre = "Thiantakones";
		$scope.user;
		$scope.invalidForm = false;

		$scope.connexion = function(){
			if($scope.connectionForm.$valid){
				Login.login({
					username : $scope.user.login,
					password : $scope.user.password,
				}, function(user){
					$localStorage.currentUser = user;
					console.log("###### user stored : ", user);
					$state.go('dashboard.home');
					console.log("###### connexion avec success");
				}, function(error){
					console.log('Erreur de connection');
					$scope.invalidForm = true;
				});
			} else{
				console.log('Formulaire Invalide');
				$scope.invalidForm = true;
			}
		};

		
  		$scope.closeAlert = function() {
			$scope.invalidForm = false;
		};

	}]);