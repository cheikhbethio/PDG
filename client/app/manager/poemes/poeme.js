'use strict';


angular.module('poemes', ['ui.router', 'door3.css', 'ngAnimate','ui.bootstrap'])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('dashboard.createPoeme', {
		url : '/poeme/create',
		templateUrl : 'app/manager/poemes/create.html',
		controller : 'createPoemeController'				
	})
	.state('dashboard.editPoeme', {
		url : '/poeme/:id/edit',
		templateUrl : 'app/manager/poemes/edit.html',
		controller : 'editPoemeController'				
	})
	.state('dashboard.showPoeme', {
		url : '/poeme/:id',
		templateUrl : 'app/manager/poemes/show.html',
		controller : 'showPoemeController'				
	})
	.state('dashboard.allPoeme', {
		url : '/poeme',
		templateUrl : 'app/manager/poemes/all.html',
		controller : 'allPoemeController'				
	})
	.state('dashboard.lastPoeme', {
		url : '/lastPoeme',
		templateUrl : 'app/manager/poemes/last.html',
		controller : 'lastPoemeController'				
	})
}])
.controller('createPoemeController', ['$state', '$scope', '$css', "$rootScope", 
	function($state, $scope, $css, $rootScope){
	$css.add('assets/css/manager/poemes/create.css');

}])
.controller('editPoemeController', ['$state', '$scope', '$css', "$rootScope", 
	function($state, $scope, $css, $rootScope){
	$css.add('assets/css/manager/poemes/edit.css');

}])
.controller('showPoemeController', ['$state', '$scope', '$css', "$rootScope", 
	function($state, $scope, $css, $rootScope){
	$css.add('assets/css/manager/poemes/show.css');

}])
.controller('allPoemeController', ['$state', '$scope', '$css', "$rootScope", 
	function($state, $scope, $css, $rootScope){
	$css.add('assets/css/manager/poemes/all.css');

}])
.controller('lastPoemeController', ['$state', '$scope', '$css', "$rootScope", 
	function($state, $scope, $css, $rootScope){

	$css.add('assets/css/manager/poemes/last.css');	

	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.active = 0;
	var slides = $scope.slides = [];
	var currIndex = 0;

	//à utiliser pour les différents poemes. à voire aussi avec ng-repeat
	$scope.addSlide = function() {
		var newWidth = 600 + slides.length + 1;
		slides.push({
			image: 'http://lorempixel.com/' + newWidth + '/300',
			text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
			id: currIndex++
		});
	};
	for (var i = 0; i < 4; i++) {
		$scope.addSlide();
	}

}]);