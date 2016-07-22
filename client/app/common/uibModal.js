var custumModal = angular.module('custumModal', ['underscore']);
custumModal.factory('myModal', ['_', '$uibModal', function (_, $uibModal) {
		return {
			confirm: function (template, size) {
				return $uibModal.open({
					animation: true,
					templateUrl: template,
					controller: function ($uibModalInstance, $scope) {
						$scope.yes = yes;
						$scope.no = no;

						function yes() {
							$uibModalInstance.close("ok");
						}

						function no() {
							$uibModalInstance.dismiss('cancel');
						}
					},
					size: size
				});
			},
			viewPoem: function (template, size) {
				return $uibModal.open({
					animation: true,
					templateUrl: template,
					controller: 'viewPoemController',
					size: size
				});
			}
		};
	}]);
