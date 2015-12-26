'use strict';

angular.module('pgdApp',[
	'ui.router',
	'siteBody',
	'door3.css',
	'accueil',
	'rubrique'
	])
	.config(['$stateProvider', '$urlRouterProvider', 
		function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise('/');
			$stateProvider
				.state("site", {
                    css : { href : 'assets/css/body/body.css'},
					views : {
						'header' : {
							templateUrl : 'app/site/body/header.html',
							controller : 'siteBodyController',
                        	css         :   'assets/css/body/header.css'
						},
						'title' : {
							templateUrl : 'app/site/body/title.html',
							controller : 'siteBodyController',
                        	css         :   'assets/css/body/title.css'
						},
						'content' : {
							templateUrl : 'app/site/body/content.html',
							controller : 'siteBodyController'
						},
						'footer' : {
							templateUrl : 'app/site/body/footer.html',
                        	css         :   'assets/css/body/footer.css'
						}
					},
					data : {
						requireLogin : false
					}
				})
				.state("dashboard", {
					url : "/dashboard",
					views : {
						'header' : {
							templateUrl : 'app/dashboard/body/header.html',
							controller : 'dashboardHeaderController'
						},
						'content' : {
							templateUrl : 'app/dashboard/body/content.html',
							controller : 'dashboardHeaderController'
						}
					},
					data : {
						requireLogin : true
					}
				});
		}])
	.controller('testController', ['$scope', function($scope){
		$scope.testAngular =  'ça marche coté angular!!!';
	}]);