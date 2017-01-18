angular.module('connectionService', ['ngResource'])
		.factory('SignUp', ['$resource', function ($resource) {
				return $resource('/api/users', {}, {
				})
			}])
		.factory('Login', ['$resource', function ($resource) {
				return $resource('/api/login', {}, {
					login: {method: 'POST', isArray: false}
				})
			}])
		.factory('Validation', ['$resource', function ($resource) {
				return $resource('/api/validation/signUp/:id', {}, {
					getToken: {method: 'GET'}
				})
			}])
			.factory('connectionRedirection', ["$rootScope", "$state", "CurrentUser",		function($rootScope, $state, CurrentUser){
					return {
						dashboard : function(){
							$rootScope.confVariable = {};
							$rootScope.confVariable.titre = "Thiantakones";

							$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
								var requireLogin = toState.data.requireLogin;
								var requireLoginDashboard = toState.data.requireLoginDashboard;
								var status = CurrentUser.getRight();

								if (requireLogin && !CurrentUser.isLoggedIn()) {
									console.log("not connected yet : ");
									event.preventDefault();
									$state.go('site.connexion');
								}
								// if (requireLoginDashboard && CurrentUser.getRight() <= 1){
								// 	console.log("not connected yet22 : ");
								// 	event.preventDefault();
								// 	$state.go('site.accueil');
								// }
						})
					}
				}
				}]);
