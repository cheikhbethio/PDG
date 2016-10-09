(function () {
	'use strict';

	angular.module('profile', ['ui.router'])
			.config(['$stateProvider', function ($stateProvider) {
					$stateProvider
							.state('site.profile', {
								url: '/profile',
								abstract: true,
								templateUrl: 'app/site/profile/profile.html'
							})
							.state('site.profile.edit', {
								url: '/edit',
								templateUrl: 'app/site/profile/edit.html',
								controller: 'profileEditController',
								resolve: {
									userToUp: getMe,
								}
							})
							.state('site.profile.favoris', {
								url: '/favoris',
								templateUrl: 'app/site/profile/favoris.html',
								controller: 'profileFavorisController'
							})
							.state('site.profile.poems', {
								url: '/poem',
								templateUrl: 'app/site/profile/poem.html',
								controller: 'profilePoemController',
								resolve: {
									poemsList: getPoemByAuthor
								}
							})
							.state('site.profile.me', {
								url: '/me',
								templateUrl: 'app/site/profile/me.html',
								controller: 'profileMeController',
								resolve: {
									myProfile: getMe
								}
							})
				}])
			.controller('profileEditController', profileEditController)
			.controller('profileFavorisController', profileFavorisController)
			.controller('profilePoemController', profilePoemController)
			.controller('profileMeController', profileMeController);

	profileEditController.$inject = ["user", "$scope", "userToUp"]
	function profileEditController(user, $scope, userToUp) {
		$scope.user = userToUp;
		console.log(" ********** ", $scope.user);

		$scope.upUser =  upUser;
		$scope.pwdToggle = false;
		$scope.passwordConfirmation = "";
		$scope.info = {};
		$scope.info.showMessage = false;

		function upUser(param){
			console.log(" *****Param***** ", param);

			if ($scope.pwdToggle && $scope.passwordConfirmation !== $scope.user.local.password) {
				$scope.info.message = "Les deux mot de passe ne sont pas les mêmes";
				$scope.info.type = 'danger';
				$scope.info.showMessage = true;
				console.log("passwordConfirmation : ",$scope.passwordConfirmation, "local : ",$scope.user.local.password)
				//$scope.passwordConfirmation = ""; 
				//$scope.user.local.password = "";
			} else {
				console.log("goooood")
			}
		}

	}

	profileFavorisController.$inject = []
	function profileFavorisController() {
	}

	profilePoemController.$inject = ["$scope", "poemsList"]
	function profilePoemController($scope, poemsList) {
		$scope.poemsList = poemsList.result;
	}

	profileMeController.$inject = ["$scope", "myProfile"];
	function profileMeController($scope, myProfile) {
		$scope.myProfile = myProfile;
	}

	getMe.$inject = ["user", "CurrentUser"];
	function getMe(user, CurrentUser) {
		var my_id = CurrentUser.getId();
		return user.get({id: my_id}).$promise;
	}



	//get allpoeme by author
	getPoemByAuthor.$inject = ['getPoemsByLabel', 'CurrentUser'];
	function getPoemByAuthor(getPoemsByLabel, CurrentUser) {
		return getPoemsByLabel.get({key: "id_auteur", valu: "577e12686f2c7ed4794451ad"}).$promise;
	}

})()