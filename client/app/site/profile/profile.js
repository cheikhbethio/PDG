'use strict';


angular.module('profile', ['ui.router'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.profile', {
				url :'/profile',
				templateUrl : 'app/site/profile/profile.html',
				controller	: 'profileController'
			})
	}])
	.controller('profileController', ['CurrentUser', '$rootScope', '$scope', '$state', 
		function(CurrentUser,$rootScope, $scope, $state){
			console.log("goood");

	}]);