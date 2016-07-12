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
		.controller('rubriqueController', ['$rootScope', '$scope', '$uibModal', '$log',
			function ($rootScope, $scope, $uibModal, $log) {
				$rootScope.titre = "Titre de la rubrique";
				$scope.items = ['item1', 'item2', 'item3'];
//				var size = "lg";
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
				};

			}])

		.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'items', function ($scope, $uibModalInstance, items) {

//				$scope.items = items;
//				$scope.selected = {
//					item: $scope.items[0]
//				};
//
//				$scope.ok = function () {
//					$uibModalInstance.close($scope.selected.item);
//				};
//
//				$scope.cancel = function () {
//					$uibModalInstance.dismiss('cancel');
//				};
			}]);
//
//
//angular.module('rubrique', ['ui.router'])
//	.config(['$stateProvider',  function($stateProvider){
//		$stateProvider
//			.state('site.rubrique', {
//				url :'/rubrique/:id',
//				templateUrl : 'app/site/rubrique/rubrique.html',
//				controller	: 'rubriqueController'
//			})
//	}])
//	.controller('rubriqueController', ['$rootScope','$scope', 'dialogs',
//		function($rootScope, $scope, dialogs){
//		//$css.add(['assets/css/rubrique.css', 'assets/css/body/sidebar.css', 'assets/css/dialog.css']);
//		$rootScope.titre = "Titre de la rubrique";
//
//		$scope.testBoitedialogue=function(){
//			var dlg = dialogs.create('app/site/dialogTemplate/poemeVue.html',
//			'deleteArticleDialogController',
//			{ articletitle: 11 },
//			'lg');
//		}
//
//	}])
//
//
//.controller('deleteArticleDialogController', function($scope, $modalInstance, data){
//
//
//		$scope.cancel = function(){
//			$modalInstance.dismiss('Canceled');
//		};
//
//		$scope.save = function(){
//			$modalInstance.close();
//		};
//
//});