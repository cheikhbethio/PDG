(function () {
	'use strict';

	angular.module('user', ['ui.router', 'ui.bootstrap', 'underscore'])
			.config(['$stateProvider', function ($stateProvider) {
					$stateProvider
							.state('dashboard.user', {
								url: '/user',
            					abstract: true,
 		  						template: "<div ui-view></div>"
							})
							.state('dashboard.user.show', {
								url: '/show/:id',
								templateUrl: 'app/manager/users/show.html',
								controller: 'showUserController',
								resolve: {
									userToDisplay: getAUser,
									poemsList : getPoemByAuthor
								}
							})
							.state('dashboard.user.edit', {
								url: '/edit/:id',
								templateUrl: 'app/manager/users/edit.html',
								controller: 'editUserController',
								resolve: {
									userToEdit: getAUser
								}
							})
							.state('dashboard.user.all', {
								url: '/all',
								templateUrl: 'app/manager/users/all.html',
								controller: 'allUserController',
								resolve: {
									usersList: getAllUser
								}
							});
				}])
			.controller('editUserController', editUserController)
			.controller('showUserController', showUserController)
			.controller('allUserController', allUserController);


	showUserController.$inject = ['myModal', 'poemsList','userToDisplay', '$state', 'user', '$scope'];
	function showUserController(myModal, poemsList, userToDisplay, $state, user, $scope) {
		$scope.userToDisplay = userToDisplay;
		$scope.poemsList = poemsList.result;
		$scope.deleteUser = deleteUser;

		function deleteUser(){
			var modalConfirm = myModal.confirm('app/common/modalView/confirm.html', 'sm');
			modalConfirm.result.then(function (res) {
				if (res) {
					user.remove({id: userToDisplay._id}, function (res) {
						if (res.code === 0) {
							$state.go('dashboard.user.all');
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

	}

	editUserController.$inject = ['user', 'userToEdit','$rootScope', '$scope', '$state'];
	function editUserController(user, userToEdit, $rootScope, $scope, $state) {
		$scope.saveUser = saveUser;
		$scope.cancel = cancel;
		$scope.user = userToEdit;	

		var tabRight = ["Verification email", "En, attente de Validation","Actif", "Suppimé"];	
		$scope.right = tabRight.indexOf($scope.user.local.status.msg).toString();
		console.log("+++++++$scope.user : ", $scope.right);	

		console.log("+++++++$scope.user : ", $scope.user);	

		$scope.info = {};
		$scope.info.showMessage = false;

		function saveUser() {

			if ($scope.userForm.$valid) {
					user.update({id : $scope.user._id}, $scope.user, 
						function (resp) {
							if (resp.code === 0) {
								$state.go('dashboard.user.show', {id: $scope.user._id});
							} else {
								$scope.info.message = resp.message;
								$scope.info.type = 'danger';
								$scope.info.showMessage = true;
							}
						}, 
						function (error) {
						$scope.info.message = "un probleme s'est produit. L'enregistrement est temporairement impossible";
						$scope.info.type = 'danger';
						$scope.info.showMessage = true;
					});

			} else {
				$scope.info.message = 'Les données sont incorrectes, Veillez recommencer svp'
				$scope.info.showMessage = true;
				$scope.info.type = 'danger';
			}
		};

		function cancel() {
			$state.go('dashboard.user.show', {id: $scope.user._id});
		};
	}

	allUserController.$inject = ["myModal", "user", "$scope", "usersList", "$state"];
	function allUserController(myModal, user, $scope, usersList, $state) {
		$scope.usersList = usersList;
		$scope.deleteUser = deleteUser;

		function deleteUser(param){
			var modalConfirm = myModal.confirm('app/common/modalView/confirm.html', 'sm');
			modalConfirm.result.then(function (res) {
				if (res) {
					user.remove({id: param._id}, function (res) {
						if (res.code === 0) {
							$state.reload();
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
	}

	//get a user by id
	getAUser.$inject = ['user', '$stateParams'];
	function getAUser(user, $stateParams) {
		return user.get({id: $stateParams.id}).$promise;
	}

	//get all users
	getAllUser.$inject = ['user'];
	function getAllUser(user) {
		return user.query().$promise;
	}

	//get allpoeme by author
	getPoemByAuthor.$inject = ['getPoemsByLabel', '$stateParams'];
	function getPoemByAuthor(getPoemsByLabel, $stateParams){		
		return getPoemsByLabel.get({key :"id_auteur", valu : $stateParams.id}).$promise;
	}

	//deleteUser

})();