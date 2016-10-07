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
									user: getMe,
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

	profileEditController.$inject = ["$scope", "user"]
	function profileEditController($scope, user) {
		$scope.pwdToggle = false;
		$scope.user = user;
		$scope.passwordConfirmation = "";

		console.log(" ********** ", $scope.user);

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