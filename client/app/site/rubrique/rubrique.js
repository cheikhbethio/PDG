(function () {
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
			.controller('rubriqueController', rubriqueController)
			.controller('viewPoemController', viewPoemController);



	viewPoemController.$inject = ['$scope', '$uibModalInstance'];
	function viewPoemController($scope, $uibModalInstance) {
		$scope.yes = yes;
		$scope.no = no;
		function yes() {
			$uibModalInstance.close("yessss");
		}

		function no() {
			$uibModalInstance.dismiss('cancel');
		}
	}


	rubriqueController.$inject = ['Poeme', 'myModal', '$rootScope', '$scope', '$uibModal', '$log'];
	function rubriqueController(Poeme, myModal, $rootScope, $scope, $uibModal, $log) {
		$rootScope.titre = "Titre de la rubrique";
		$scope.viewPoem = viewPoem;
		$scope.poemToDisplay;
		$scope.poemlist = Poeme.query();

		function viewPoem(width, poemeId) {
			Poeme.get({id: poemeId}, function (res) {
				$scope.poemToDisplay = res.result;
				console.log("res : ", $scope.poemToDisplay);

				var poemModal = myModal.viewPoem('app/manager/poemes/modals/poemeVue.html', 'lg', $scope.poemToDisplay);

			});
			console.log(width, poemeId);
		}

		$scope.items = ['item1', 'item2', 'item3'];
		$scope.testBoitedialogue1 = function (size) {
			var modalInstance = myModal.confirm('app/common/modalView/confirm.html', size);
			modalInstance.result.then(function (res) {
				console.log(res);

			}, function () {
				console.log("nooooooooooooooo");
			});
		};
		$scope.testBoitedialogue = function (size) {

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
		}
	}
})();