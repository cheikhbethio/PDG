(function () {
	'use strict';

	angular.module('poemes', ['ngCookies', 'ui.router', 'ngAnimate', 'ui.bootstrap', 'underscore'])
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
		// .run(function($rootScope, $state, $stateParams, CurrentUser){
		// 	$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
		// 		var status = CurrentUser.getRight();
		// 		console.log("*********typeof*************",  status);
		//
		// 			if (status <= 1 || ($state.current.url !== "/poeme/create" && status === 2)) {
		// 				console.log("voilaaa cest un simple ecrivain");
		// 				// event.preventDefault();
		// 				$state.go('site.connexion');
		// 			}
		//
		// 	})
		// })

		.controller('createPoemeController', createPoemeController)
		.controller('editPoemeController', editPoemeController)
		.controller('showPoemeController', showPoemeController)
		.controller('allPoemeController', allPoemeController)
		.controller('lastPoemeController', lastPoemeController);

	createPoemeController.$inject = ['myModal', 'CurrentUser', 'Poeme', '$scope', '_'];

	function createPoemeController(myModal, CurrentUser, Poeme, $scope, _) {
		$scope.addPoeme = addPoeme;
		$scope.showModalTof = showModalTof;
		$scope.info = {};
		$scope.info.showMessage = false;
		$scope.newPoeme = {};
		$scope.newPoeme.rubric = 0;
		var my_id = CurrentUser.getId();
		$scope.rubricList = ['Dieureudieuf Serigne Bethio', 'L\'esprit universel', 'Histoire sacrées',
			'Gatt Saf', 'Les plus appréciés', 'L\'originalité spiritelle'];
		$scope.linkList = [];

		initTofList($scope.linkList);

		function showModalTof() {
			var modalTof = myModal.tofChoice('app/common/modalView/tof.html', 'lg', $scope.linkList);
			modalTof.result.then(function (res) {
				if(res) {
					$scope.newPoeme.tof = res;
				}
			});
		}


		function addPoeme() {
			if(!$scope.newPoeme) {
				console.log("tous les champs semblent vides. Veillez les remplir s'il vous plait.");
			} else {
				$scope.newPoeme.id_auteur = my_id;
				if(_.indexOf($scope.rubricList, $scope.newPoeme.rubric) > -1) {
					$scope.newPoeme.rubric = _.indexOf($scope.rubricList, $scope.newPoeme.rubric) + 1;
				} else {
					$scope.newPoeme.rubric = null;
				}

				Poeme.save($scope.newPoeme, function (resp) {
					$scope.info.message = resp.message;
					$scope.info.showMessage = true;
					if(resp.code === 0) {
						$scope.info.type = "success";
					} else {
						$scope.info.message = "Le titre, le livre d'origine, " +
							"l'image, la catégorie et contenu du poême sont tous obligatoire";
						$scope.info.type = "danger";
						$scope.info.showMessage = true;
					}
					$scope.newPoeme = {};
				});
			}
		}
	}

	editPoemeController.$inject = ['myModal', 'poemToEdit', "$stateParams", "Poeme", "$scope",
		"$state"];

	function editPoemeController(myModal, poemToEdit, $stateParams, Poeme, $scope, $state) {
		$scope.upatePoem = upatePoem;
		$scope.showModalTof = showModalTof;
		$scope.poemToEdit;
		$scope.info;
		$scope.poemToEdit = poemToEdit.result;
		$scope.rubricList = ['Dieureudieuf Serigne Bethio', 'L\'esprit universel', 'Histoire sacrées',
			'Gatt Saf', 'Les plus appréciés', 'L\'originalité spiritelle'];
		var holdRubric = $scope.poemToEdit.rubric;
		$scope.linkList = [];

		initTofList($scope.linkList);

		function showModalTof() {
			var modalTof = myModal.tofChoice('app/common/modalView/tof.html', 'lg', $scope.linkList);
			modalTof.result.then(function (res) {
				if(res) {
					$scope.poemToEdit.tof = res;
				}
			});
		}


		function upatePoem() {
			if(!$scope.poemToEdit.content) {
				$scope.info = {
					message: "Le contenue du poeme est vide: la mise à jour est alors impossible!",
					type: "danger"
				}
			} else {
				var ind = _.indexOf($scope.rubricList, $scope.poemToEdit.rubric);
				if(ind < 0 || isNaN(ind)) {
					$scope.poemToEdit.rubric = holdRubric
				} else {
					$scope.poemToEdit.rubric = ind + 1;
				}

				Poeme.update({ id: $stateParams.id }, $scope.poemToEdit, function (resp) {
					if(resp.code !== 0) {
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
		$scope.rubricList = ['Dieureudieuf Serigne Bethio', 'L\'esprit universel', 'Histoire sacrées',
			'Gatt Saf', 'Les plus appréciés', 'L\'originalité spiritelle'];

		function deletePoem() {
			var modalConfirm = myModal.confirm('app/common/modalView/confirm.html', 'sm');
			modalConfirm.result.then(function (res) {
				if(res) {
					Poeme.delete({ id: $scope.poemToDisplay._id }, function (res) {
						if(res.code === 0) {
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
			$state.go('dashboard.editPoeme', { id: $scope.poemToDisplay._id });
		}

	}

	allPoemeController.$inject = ['$cookies', 'CurrentUser', 'Poeme', '$scope'];

	function allPoemeController($cookies, CurrentUser, Poeme, $scope) {
		$scope.deletePoeme = deletePoeme;
		$scope.poemlist = Poeme.query();
		$scope.config = {
			itemsPerPage: 2,
			fillLastPage: true
		};

		function deletePoeme(indicePoeme) {
			var toDel = $scope.poemlist[indicePoeme];
			Poeme.delete({ id: toDel._id }, function (res) {
				if(res) {
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
		$scope.goToPoeme = goToPoeme;

		$scope.rubricList = ['Dieureudieuf Serigne Bethio', 'L\'esprit universel', 'Histoire sacrées',
			'Gatt Saf', 'Les plus appréciés', 'L\'originalité spiritelle'];

		LastPoemes.query(function (list) {
			$scope.listPoeme = list;
		});

		function goToPoeme(poem) {
			$scope.poemToDisplay = poem;
		}

	}


	/***Functions auxiliaires********************************************/

	getAPoem.$inject = ['Poeme', '$stateParams'];

	function getAPoem(Poeme, $stateParams) {
		return Poeme.get({ id: $stateParams.id }).$promise;
	}

	function initTofList(list) {
		for(var i = 13; i >= 1; i--) {
			list.push("assets/images/poeme/tofPoeme" + i + ".jpg");
		}

		for(var i = 102; i >= 101; i--) {
			list.push("assets/images/poeme/tofPoeme" + i + ".png");
		}
	}
})();
