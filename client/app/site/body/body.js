'use strict';

angular.module('siteBody',[])
	.controller('siteBodyController', ['$scope','CurrentUser', '$state',
		function($scope, CurrentUser, $state){
		/*$css.add('assets/css/body/body.css');
		$css.add('assets/css/body/title.css');
		$css.add('assets/css/body/header.css');
		$css.add('assets/css/body/sidebar.css');
		$css.add('assets/css/body/footer.css');
	*/
	$scope.toDisconnect = function(){
		CurrentUser.clear();
        $state.go("site.connexion", {disconnected:true});
		console.log("I am clicked, so : ", CurrentUser.isLoggedIn());
	}


		$scope.isConnected = CurrentUser.isLoggedIn();
}]);