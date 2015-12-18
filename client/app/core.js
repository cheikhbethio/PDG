'use strict';

var validationApp = angular.module('pdgApp', []);
validationApp.controller('validationController', function($scope){
	$scope.validate = function(isValid){
		if(isValid){
			alert('our form is amazing!!!');
		}else{
			alert('not valid form')
		}
	};
});