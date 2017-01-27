(function () {
	'use strict';

	angular.module('allPoems', ['ui.router'])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				.state('site.allPoems', {
					url: '/allPoems',
					templateUrl: 'app/site/allPoems/all.html',
					controller: 'allPoemsController'
				})
      }])
		.controller('allPoemsController', allPoemsController);

	allPoemsController.$inject = ["$scope", "Poeme"];

	function allPoemsController($scope, Poeme) {
		Poeme.query({}, function (res) {
			console.log("************ ", res);
		})
	}

})()
