'use strict';

angular.module('pgdApp',[
	'ui.router',
	'siteBody',
	'door3.css',
    'ui.bootstrap',
    'ui.bootstrap.modal',
	'dialogs.main',
    'snap',  
    'textAngular',

	'accueil',
	'rubrique',
	'connexion',
	'registration',

	'management',
	'manAccueil',
	'poemes'
	])
	.config(['$stateProvider', '$urlRouterProvider', 
		function($stateProvider, $urlRouterProvider){
			//$urlRouterProvider.otherwise('/');
			$stateProvider
				.state("site", {
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
					url : '/dashboard',		
					views : {
						'header' : {
							
							templateUrl : 'app/site/body/header.html',
							controller : 'siteBodyController'
						},
						'content' : {
							templateUrl : 'app/manager/body/content.html',
							controller : 'manBodyController'
						}
					}

					/*data : {
						requireLogin : true
					}*/
				});
		}])
	.controller('testController', ['$scope', function($scope){
		$scope.testAngular =  'ça marche coté angular!!!';
	}])
	.run(function($rootScope){
		$rootScope.confVariable = {};
		$rootScope.confVariable.titre = "Thiantakones";

	});

/*


					views : {
						'header' : {
							
							templateUrl : 'app/site/body/header.html',
							controller : 'siteBodyController'
						},
						'title' : {
							templateUrl : 'app/site/body/title.html',
							controller : 'managerBodyController',
						},
						'content' : {
							templateUrl : 'app/manager/body/content.html',
							controller : 'managerBodyController'
						},
						'footer' : {
							templateUrl : 'app/site/body/footer.html'
						}
					}*/