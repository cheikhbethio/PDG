'use strict';

angular.module('connexion', ['ui.router'])
		.config(['$stateProvider', function ($stateProvider) {
				$stateProvider
						.state('site.connexion', {
							url: '/connexion?registration&disconnected',
							css: 'assets/css/body/sign.css',
							templateUrl: 'app/site/sign/connexion.html',
							controller: 'connexionController'
						})
			}])
		.controller('connexionController', ['Login', '$rootScope', '$scope', '$state', '$localStorage', "$stateParams",
			function (Login, $rootScope, $scope, $state, $localStorage, $stateParams) {

				$rootScope.titre = "Thiantakones";
				$scope.user;

				//message
				var okSignUp = "Merci pour votre inscription! Nous vous proposons de proceder à la validation dans l'émail qui viernt de bous être envoyé";
				var byby = "Merci et à bientôt sur les publication de grâce";
				var echecConnexion = "Echec de connexion: Verifiez votre mot de passe et ou votre login";
				$scope.info = {
					message: "",
					type: ""
				};
				$scope.registration = $stateParams.registration;
				$scope.disconnected = $stateParams.disconnected;
				$scope.showAlert = false;



				//for initialize the alerter
				function init() {
					if ($scope.registration) {
						setInfo(okSignUp, "success");
					} else if ($scope.disconnected) {
						setInfo(byby, "success");
					} else {
						$scope.message = "";
					}
				}

				//info alerte
				function setInfo(mes, typer) {
					$scope.info = {
						message: mes,
						type: typer,
						showMessage: true
					};
				}

				$scope.connexion = function () {
					if ($scope.connectionForm.$valid) {
						Login.login({
							username: $scope.user.login,
							password: $scope.user.password,
						}, function (user) {
							// $localStorage.currentUser = user;
							$state.go('site.accueil');
						}, function (error) {
							console.log('Erreur de connection');
							setInfo(echecConnexion, "danger");
							$scope.user = {};
						});
					} else {
						console.log('Formulaire Invalide');
						setInfo(echecConnexion, "danger");
					}
				};


				$scope.closeAlert = function () {
					$scope.showAlert = false;
				};

				//called function
				init();
			}]);