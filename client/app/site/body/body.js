'use strict';

angular.module('siteBody', [])
		.controller('siteBodyController', ['$scope', 'CurrentUser', '$state',
			function ($scope, CurrentUser, $state) {

				$scope.toDisconnect = function () {
					CurrentUser.clear();
					$state.go("site.connexion", {disconnected: true});
					$scope.isConnected = false;
				};


				$scope.isConnected = CurrentUser.isLoggedIn();
			}]);