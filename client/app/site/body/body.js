'use strict';

angular.module('siteBody',['door3.css'])
	.controller('siteBodyController', ['$scope', '$css', function($scope, $css){
		$css.add('assets/css/body/body.css');
		$css.add('assets/css/body/title.css');
		$css.add('assets/css/body/header.css');
		$css.add('assets/css/body/sidebar.css');
		$css.add('assets/css/body/footer.css');
	}]);