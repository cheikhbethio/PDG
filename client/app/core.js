'use strict';

angular.module('pgdApp', [
	'ui.router',
	'siteBody',
	'ui.bootstrap',
	'snap',
	'textAngular',
	'ngStorage',
	//	site
	'accueil',
	'rubrique',
	'connexion',
	'connectionService',
	'registration',
	//	management
	'management',
	'manAccueil',
	'poemes',
	'poemeServices',
	'commentsService',
	'comments',
	//	common
	'currentUser',
	'underscore',
	'custumModal',
	'myAlerter'

])
.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
				.state("site", {
					views: {
						'header': {
							templateUrl: 'app/site/body/header.html',
							controller: 'siteBodyController',
							css: 'assets/css/body/header.css'
						},
						'title': {
							templateUrl: 'app/site/body/title.html',
							controller: 'siteBodyController',
							css: 'assets/css/body/title.css'
						},
						'content': {
							templateUrl: 'app/site/body/content.html',
							controller: 'siteBodyController'
						},
						'footer': {
							templateUrl: 'app/site/body/footer.html',
							css: 'assets/css/body/footer.css'
						}
					},
					data: {
						requireLogin: false
					}
				})
				.state("dashboard", {
					url: '/dashboard',
					views: {
						'header': {
							templateUrl: 'app/site/body/header.html',
							controller: 'siteBodyController'
						},
						'content': {
							templateUrl: 'app/manager/body/content.html',
							controller: 'manBodyController'
						}
					},
					data: {
						requireLogin: true
					}
				});
	}])
.run(function ($rootScope, $state, CurrentUser) {
	$rootScope.confVariable = {};
	$rootScope.confVariable.titre = "Thiantakones";

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
		var requireLogin = toState.data.requireLogin;
		var requireLoginDashboard = toState.data.requireLoginDashboard;

		if (requireLogin && !CurrentUser.isLoggedIn()) {
			console.log("not connected yet : ");
			event.preventDefault();
			$state.go('site.connexion');
		}
	});

});

