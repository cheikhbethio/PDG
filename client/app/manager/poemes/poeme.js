'use strict';


angular.module('poemes', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
		.config(['$stateProvider', function ($stateProvider) {
				$stateProvider
						.state('dashboard.createPoeme', {
							url: '/poeme/create',
							templateUrl: 'app/manager/poemes/create.html',
							controller: 'createPoemeController'
						})
						.state('dashboard.editPoeme', {
							url: '/poeme/:id/edit',
							templateUrl: 'app/manager/poemes/edit.html',
							controller: 'editPoemeController'
						})
						.state('dashboard.showPoeme', {
							url: '/poeme/:id',
							templateUrl: 'app/manager/poemes/show.html',
							controller: 'showPoemeController'
						})
						.state('dashboard.allPoeme', {
							url: '/poeme',
							templateUrl: 'app/manager/poemes/all.html',
							controller: 'allPoemeController'
						})
						.state('dashboard.lastPoeme', {
							url: '/lastPoeme',
							templateUrl: 'app/manager/poemes/last.html',
							controller: 'lastPoemeController'
						})
			}])
		.controller('createPoemeController', ['CurrentUser', 'Poeme', '$scope',
			function (CurrentUser, Poeme, $scope) {
				/**
				 * Function
				 */
				$scope.addPoeme = addPoeme;
				$scope.closeAlert = closeAlert;

				/**
				 * Variable
				 */
				$scope.info = {};
				$scope.newPoeme = {};
				var my_id = CurrentUser.getId();

				function addPoeme() {
					if (!$scope.newPoeme) {
						console.log("tous les champs semblent vide. Veillez les remplir s'il vous plait.");
					} else {
						$scope.newPoeme.id_auteur = my_id;
						Poeme.save($scope.newPoeme, function (resp) {
							$scope.info.message = resp.message;
							$scope.info.showMessage = true;
							if (resp.code === 0) {
								$scope.info.type = "success";
								console.log("### content Poeme : ", $scope.newPoeme);
							} else {
								$scope.info.type = "danger";
							}
							$scope.newPoeme = {};
						});
					}
				}

				function closeAlert() {
					$scope.info.showMessage = false;
					$scope.newPoeme = {};
				}

			}])
		.controller('editPoemeController', ['$state', '$scope', "$rootScope",
			function ($state, $scope, $rootScope) {
				//$css.add('assets/css/manager/poemes/edit.css');

			}])
		.controller('showPoemeController', ['$state', '$scope', "$rootScope",
			function ($state, $scope, $rootScope) {
				//$css.add('assets/css/manager/poemes/show.css');

			}])
		.controller('allPoemeController', ['Poeme', '$state', '$scope', "$rootScope",
			function (Poeme, $state, $scope, $rootScope) {
				$scope.poemlist = Poeme.query();
				$scope.list = Poeme.query();
				$scope.config = {
					itemsPerPage: 2,
					fillLastPage: true
				}

			}])
		.controller('lastPoemeController', ['LastPoemes', 'Poeme', '$state', '$scope', "$rootScope",
			function (LastPoemes, $state, $scope, $rootScope) {

				/**
				 * *********************** carousel ***********************
				 */
				//-----------------------------------------function
				$scope.addSlide = addSlide;
				$scope.goToPoeme = goToPoeme;

				//-----------------------------------------declaration
				$scope.myInterval = 5000;
				$scope.noWrapSlides = false;
				$scope.active = 0;
				var slides = $scope.slides = [];
				var currIndex = 0;

				//à utiliser pour les différents poemes. à voire aussi avec ng-repeat
				function addSlide() {
					var newWidth = 600 + slides.length + 1;
					slides.push({
						image: 'http://lorempixel.com/' + newWidth + '/300',
						text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
						id: currIndex++
					});
				}
				for (var i = 0; i < 4; i++) {
					$scope.addSlide();
				}


				/************************lists des poemes**********************/
				$scope.listPoeme = LastPoemes.query();
				$scope.poemToDisplay;


				function goToPoeme(poem) {
					$scope.poemToDisplay = poem;

				}

			}]);