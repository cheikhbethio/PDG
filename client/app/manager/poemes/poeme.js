(function () {
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
								controller: 'editPoemeController',
								resolve: {
									poemToEdit: getAPoem
								}
							})
							.state('dashboard.showPoeme', {
								url: '/poeme/:id',
								templateUrl: 'app/manager/poemes/show.html',
								controller: 'showPoemeController',
								resolve: {
									poemToDisplay: getAPoem
								}
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
							});
				}])
			.controller('createPoemeController', createPoemeController)
			.controller('editPoemeController', editPoemeController)
			.controller('showPoemeController', showPoemeController)
			.controller('allPoemeController', allPoemeController)
			.controller('lastPoemeController', lastPoemeController);

	createPoemeController.$inject = ['CurrentUser', 'Poeme', '$scope'];
	function createPoemeController(CurrentUser, Poeme, $scope) {
		$scope.addPoeme = addPoeme;
		$scope.info = {};
		$scope.info.showMessage = false;
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
						$scope.info.showMessage = true;
					}
					$scope.newPoeme = {};
				});
			}
		}
	}

	editPoemeController.$inject = ['poemToEdit', "$stateParams", "Poeme", "$scope", "$state"];
	function editPoemeController(poemToEdit, $stateParams, Poeme, $scope, $state) {
		$scope.upatePoem = upatePoem;
		$scope.poemToEdit;
		$scope.info;
		$scope.poemToEdit = poemToEdit.result;
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
	}

	showPoemeController.$inject = ['myModal', 'poemToDisplay', '$state', 'Poeme', '$scope'];
	function showPoemeController(myModal, poemToDisplay, $state, Poeme, $scope) {
		$scope.poemToDisplay = poemToDisplay.result;
		$scope.editPoem = editPoem;
		$scope.deletePoem = deletePoem;
		$scope.info;

		function deletePoem() {
			var modalConfirm = myModal.confirm('app/common/modalView/confirm.html', 'sm');
			modalConfirm.result.then(function (res) {
				if (res) {
					Poeme.delete({id: $scope.poemToDisplay._id}, function (res) {
						if (res.code === 0) {
							$state.go('dashboard.allPoeme');
						} else {
							$scope.info = {
								message: res.message,
								type: 'danger'
							};
						}
					});
				}
			});

		}

		function editPoem() {
			$state.go('dashboard.editPoeme', {id: $scope.poemToDisplay._id});
		}

	}

	allPoemeController.$inject = ['Poeme', '$scope'];
	function allPoemeController(Poeme, $scope) {
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

	}

	lastPoemeController.$inject = ['LastPoemes', '$scope'];
	function lastPoemeController(LastPoemes, $scope) {

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

	}



	getAPoem.$inject = ['Poeme', '$stateParams'];
	function getAPoem(Poeme, $stateParams) {
		return Poeme.get({id: $stateParams.id}).$promise;
	}

})();