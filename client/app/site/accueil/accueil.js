'use strict';


angular.module('accueil', ['ui.router'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.accueil', {
				url :'/',
                css : 'assets/css/body/content.css',
				templateUrl : 'app/site/accueil/accueil.html',
				controller	: 'accueilController'
			})
	}])
	.controller('accueilController', ['CurrentUser', '$rootScope', '$scope', '$state', 
		function(CurrentUser,$rootScope, $scope, $state){

		$rootScope.confVariable.titre = "Thiantakones";
		$scope.anim = [];

		$scope.runAnim = runAnim;
		function runAnim(elem){
			$scope.anim[elem] = true;
		}
		$scope.stopAnim = stopAnim;
		function stopAnim(elem){
			$scope.anim[elem] = false;
		}

		$rootScope.confVariable.isConnected =  CurrentUser.isLoggedIn();
		$scope.rubrique = function(id){
			$state.go("site.rubrique", {id:id});
		}

		/************************* carousel *********************** */
		
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
		function goToPoeme(poem) {
			$scope.poemToDisplay = poem;
		}


	}]);