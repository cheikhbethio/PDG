'use strict';

angular.module('connexion', ['ui.router'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.connexion', {
				url :'/connexion?registration&disconnected',
                css : 'assets/css/body/sign.css',
				templateUrl : 'app/site/sign/connexion.html',
				controller	: 'connexionController'
			})
	}])
	.controller('connexionController', ['Login','$rootScope', '$scope', '$state', '$localStorage', "$stateParams",
		function(Login , $rootScope, $scope, $state, $localStorage, $stateParams){

		$rootScope.titre = "Thiantakones";
		$scope.user;

		//message
		var okSignUp = "Merci pour votre inscription! Vous pouvez maintenant vous connecter :)";
		var byby = "Merci et à bientôt sur les publication de grâce";
		var echecConnexion = "Echec de connexion: Verifiez votre mot de passe et ou votre login";
		$scope.info = {
			message : "",
			type : ""
		};
		$scope.registration = $stateParams.registration;
		$scope.disconnected = $stateParams.disconnected;
		$scope.showAlert = false;



		//for initialize the alerter
		function init(){
			if($scope.registration){
				setInfo(okSignUp, "success");
			}else if ($scope.disconnected) {
				setInfo(byby, "success");
			}else{
				$scope.message = "";
			}
		}

		//info alerte
		function setInfo(mes, typer){
			$scope.info = {
				message : mes,
				type : typer
			};
			$scope.showAlert = true;
		}

		$scope.connexion = function(){
			if($scope.connectionForm.$valid){
				Login.login({
					username : $scope.user.login,
					password : $scope.user.password,
				}, function(user){
					$localStorage.currentUser = user;
					//console.log("###### user stored : ", user);
					$state.go('dashboard.home');
					//console.log("###### connexion avec success");
				}, function(error){
					console.log('Erreur de connection');
					setInfo(echecConnexion, "danger");
					$scope.user = {};
				});
			} else{
				console.log('Formulaire Invalide');
				setInfo(echecConnexion, "danger");
			}
		};

		
  		$scope.closeAlert = function() {
			$scope.showAlert = false;
		};

		//called function
		init();
	}]);