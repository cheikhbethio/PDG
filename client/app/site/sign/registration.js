'use strict';


angular.module('registration', ['ui.router'])
		.config(['$stateProvider', function ($stateProvider) {
				$stateProvider
						.state('site.registration', {
							url: '/registration',
							css: 'assets/css/body/sign.css',
							templateUrl: 'app/site/sign/registration.html',
							controller: 'registrationController'
						});
			}])
		.controller('registrationController', ['$rootScope', '$scope', '$state', 'SignUp',
			function ($rootScope, $scope, $state, SignUp) {

				$rootScope.titre = "Thiantakones";
				$scope.newUser = {};


				$scope.info = {};
				$scope.info.showMessage = false;

				$scope.saveNewUser = function (newer) {

					if ($scope.registrationForm.$valid) {

						if (newer.password === newer.passwordConfirmation) {
							SignUp.save(newer, function (resp) {
								if (resp.code === 0) {
									$scope.info.message = resp.message;
									$state.go('site.connexion', {registration: true});
								} else {
									$scope.info.message = resp.message;
									$scope.info.type = 'danger';
									$scope.info.showMessage = true;
								}
							}, function (error) {
								$scope.info.message = "un probleme s'est produit. L'enregistrement est temporairement impossible";
								$scope.info.type = 'danger';
								$scope.info.showMessage = true;
							});

						} else {
							$scope.info.message = "les deux mots de passe ne sont pas identiques. Veillez réessayer!!";
							$scope.info.showMessage = true;
							$scope.info.type = 'danger';
						}
					} else {
						$scope.info.message = 'Les données sont incorrectes, Veillez recommencer svp'
						$scope.info.showMessage = true;
						$scope.info.type = 'danger';
					}

					console.log($scope.newUser);
				};

				$scope.resetRegistrationForm = function () {
					$scope.newUser = {};
				};


			}]);