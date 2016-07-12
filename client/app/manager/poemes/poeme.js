'use strict';
angular.module('poemes', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'underscore'])
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

				$scope.addPoeme = addPoeme;
				$scope.closeAlert = closeAlert;
				$scope.info = {};
				$scope.newPoeme = {};
				var my_id = CurrentUser.getId();
				function addPoeme() {
					if (!$scope.newPoeme) {
						console.log("tous les champs semblent vides. Veillez les remplir s'il vous plait.");
					} else {
						$scope.newPoeme.id_auteur = my_id;
						Poeme.save($scope.newPoeme, function (resp) {
							$scope.info.message = resp.message;
							$scope.info.showMessage = true;
							if (resp.code === 0) {
								$scope.info.type = "success";
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
		.controller('editPoemeController', ["$stateParams", "Poeme", "$scope", "$state",
			function ($stateParams, Poeme, $scope, $state) {
				$scope.upatePoem = upatePoem;
				$scope.poemToEdit;
				$scope.info;
				function upatePoem() {
					if (!$scope.poemToEdit.content) {
						$scope.info = {
							message: "Le contenue du poeme est vide: la mise à jour est alors impossible!",
							type: "danger"
						}
					} else {
						Poeme.update({id: $stateParams.id}, $scope.poemToEdit, function (resp) {
							if (resp.code !== 0) {
								$scope.info = {
									message: resp.message,
									type: "danger"
								};
							} else {
								$state.go("dashboard.allPoeme");
							}
						});
					}
				}
				Poeme.get({id: $stateParams.id}, function (resp) {
					$scope.poemToEdit = resp.result;
				});
			}])
		.controller('showPoemeController', ['$state', '$scope', "$rootScope",
			function ($state, $scope, $rootScope) {

			}])
		.controller('allPoemeController', ['_', 'Poeme', '$state', '$scope', "$rootScope",
			function (_, Poeme, $state, $scope, $rootScope) {
				$scope.deletePoeme = deletePoeme;
				$scope.poemlist = Poeme.query();
				$scope.config = {
					itemsPerPage: 2,
					fillLastPage: true
				};
				function deletePoeme(indicePoeme) {
					var toDel = $scope.poemlist[indicePoeme];
					Poeme.delete({id: toDel._id}, function (res) {
						if (res) {
							$scope.poemlist.splice(indicePoeme, 1);
						} else {
							console.log("## non : ", res.message);
						}

					});
				}

			}])
		.controller('lastPoemeController', ['LastPoemes', '$state', '$scope', "$rootScope",
			function (LastPoemes, $state, $scope, $rootScope) {

				$scope.listPoeme;
				$scope.poemToDisplay;
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
				LastPoemes.query(function (list) {
					$scope.listPoeme = list;
				});
				function goToPoeme(poem) {
					$scope.poemToDisplay = poem;
				}

			}]);