'use strict';


angular.module('rubrique', ['ui.router'])
		.config(['$stateProvider', function ($stateProvider) {
				$stateProvider
						.state('site.rubrique', {
							url: '/rubrique/:id',
							templateUrl: 'app/site/rubrique/rubrique.html',
							controller: 'rubriqueController'
						})
			}])
		.controller('rubriqueController', ['myModal', '$rootScope', '$scope', '$uibModal', '$log',
			function (myModal, $rootScope, $scope, $uibModal, $log) {
				$rootScope.titre = "Titre de la rubrique";
				$scope.items = ['item1', 'item2', 'item3'];


				$scope.testBoitedialogue = function (size) {
					/*
					 var modalInstance = $uibModal.open({
					 animation: true,
					 templateUrl: 'app/common/modalView/confirm.html',
					 controller: function ($scope, $uibModalInstance) {
					 $scope.yes = yes;
					 $scope.no = no;

					 function yes() {
					 $uibModalInstance.close("yessss");
					 }

					 function no() {
					 $uibModalInstance.dismiss('cancel');
					 }
					 },
					 size: size
					 });
					 */
					var modalInstance = myModal.confirm('app/common/modalView/confirm.html', size);

					modalInstance.result.then(function (res) {
						console.log(res);
					}, function () {
						console.log("nooooooooooooooo");
					});
				};
				$scope.testBoitedialogue1 = function (size) {

					var modalInstance = $uibModal.open({
						animation: true,
						templateUrl: 'app/site/dialogTemplate/poemeVue.html',
						controller: 'ModalInstanceCtrl',
						size: size,
						resolve: {
							items: function () {
								return $scope.items;
							}
						}
					});

					modalInstance.result.then(function (selectedItem) {
						$scope.selected = selectedItem;
					}, function () {
						$log.info('Modal dismissed at: ' + new Date());
					});
				};

			}])

		.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance',
			function ($scope, $uibModalInstance) {
				$scope.yes = yes;
				$scope.no = no;

				function yes() {
					$uibModalInstance.close("yessss");
				}

				function no() {
					$uibModalInstance.dismiss('cancel');
				}
			}]);
