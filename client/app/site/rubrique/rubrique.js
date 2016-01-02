'use strict';


angular.module('rubrique', ['ui.router', 'door3.css'])
	.config(['$stateProvider',  function($stateProvider){
		$stateProvider
			.state('site.rubrique', {
				url :'/rubrique/:id',
				templateUrl : 'app/site/rubrique/rubrique.html',
				controller	: 'rubriqueController'
			})
	}])
	.controller('rubriqueController', ['$rootScope','$scope', '$css', 'dialogs',
		function($rootScope, $scope, $css, dialogs){
		$css.add(['assets/css/rubrique.css', 'assets/css/body/sidebar.css', 'assets/css/dialog.css']);
		//$css.add('assets/css/body/sidebar.css');
		$rootScope.titre = "Titre de la rubrique";

		$scope.testBoitedialogue=function(){
			var dlg = dialogs.create('app/site/dialogTemplate/poemeVue.html', 
			'deleteArticleDialogController', 
			{ articletitle: 11 },
			'lg');
		}

	}])

	
.controller('deleteArticleDialogController', function($scope, $modalInstance, data){

	
		$scope.cancel = function(){
			$modalInstance.dismiss('Canceled');
		};
		
		$scope.save = function(){
			$modalInstance.close();
		};

});