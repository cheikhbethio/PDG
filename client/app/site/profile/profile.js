(function () {
	'use strict';

angular.module('profile', ['ui.router'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.profile', {
				url :'/profile',
    	        abstract : true,
				templateUrl : 'app/site/profile/profile.html'
			})
			.state('site.profile.edit', {
				url :'/profile/edit',
				templateUrl : 'app/site/profile/edit.html',
				controller	: 'profileEditController'
			})
			.state('site.profile.favoris', {
				url :'/profile/favoris',
				templateUrl : 'app/site/profile/favoris.html',
				controller	: 'profileFavorisController'
			})
			.state('site.profile.poems', {
				url :'/profile/poem',
				templateUrl : 'app/site/profile/poem.html',
				controller	: 'profilePoemController'
			})
			.state('site.profile.me', {
				url :'/profile/me',
				templateUrl : 'app/site/profile/me.html',
				controller	: 'profileMeController',
				resolve : {
					myProfile : getMe
				}
			})
	}])
	.controller('profileEditController', profileEditController)
	.controller('profileFavorisController', profileFavorisController)
	.controller('profilePoemController', profilePoemController)
	.controller('profileMeController', profileMeController);
	
	profileEditController.$inject = []
	function profileEditController(){
	}

	profileFavorisController.$inject = []
	function profileFavorisController(){
	}

	profilePoemController.$inject = []
	function profilePoemController(){
	}

	profileMeController.$inject = ["$scope", "myProfile"];
	function profileMeController($scope, myProfile){
		$scope.myProfile = myProfile;
		console.log("+++++++$scope.user : ", myProfile);
	}

	getMe.$inject = ["user", "CurrentUser"];
	function getMe(user, CurrentUser){
		var my_id = CurrentUser.getId();
		return user.get({id: my_id}).$promise;
	}

})()