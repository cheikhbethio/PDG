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
				$scope.message;
				$scope.invalidForm = false;

				$scope.loginAlreadyUsed = false;
				$scope.emailAlreadyUsed = false;

				$scope.saveNewUser = function (newer) {

					if ($scope.registrationForm.$valid) {

						if (newer.password === newer.passwordConfirmation) {
							SignUp.save(newer, function (resp) {
								if (resp.code === 0) {
									$scope.message = resp.message;
									$state.go('site.connexion', {registration: true});
//									console.log("### ok registration :", $scope.message);
								} else {
									$scope.message = resp.message;
//									console.log("### ko registration :", $scope.message);
									$scope.invalidForm = true;
								}
							}, function (error) {
//								console.log("Response: ", error);
								$scope.message = "un probleme s'est produit. L'enregistrement est temporairement impossible";
							});

						} else {
//							console.log("the password don't match !!");
							$scope.message = "les deux mots de passe ne sont pas identiques. Veillez réessayer!!";
							$scope.invalidForm = true;
						}
					} else {
						console.log("Invalide form: ");
						$scope.invalidForm = true;
					}

					console.log($scope.newUser);
				};

				$scope.resetRegistrationForm = function () {
					$scope.newUser = {};
					$scope.loginAlreadyUsed = false;
					$scope.emailAlreadyUsed = false;
					$scope.invalidForm = true;
				};

				$scope.closeAlert = function () {
					$scope.invalidForm = false;
				};


			}]);