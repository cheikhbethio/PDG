var currentUserModule = angular.module('currentUser', ['ngCookies', 'ngResource']);
/*
currentUserModule.factory('userCookie', ['$resource', function ($resource) {
	return $resource('/api/session', {}, {
		get: {method: 'GET'},
	});
}]);
*/

currentUserModule.factory('CurrentUser', ['$cookies', '$localStorage',  '$resource',
	function($cookies, $localStorage, $resource) {
  	return {

		clear: function() {
			$cookies.remove('SeugneBethioLaGrace');
		},

		isLoggedIn: function() {
 			return angular.isDefined($cookies.get('SeugneBethioLaGrace'));
		},
		getId: function(){
			var cookievalue = JSON.parse($cookies.get('SeugneBethioLaGrace'));
			return cookievalue.id
		},



		set: function(user) {
			$localStorage.currentUser = angular.copy(user);
		},

		getRight: function(){
			if($localStorage.currentUser === undefined)
				return undefined;
			else
				return $localStorage.currentUser.right;
		},
		isAdmin: function(){
			if($localStorage.currentUser === undefined)
				return false;
			else
				if(this.getRight() === 3) 
					return true;
				else 
					return false;
		},

		hasProfilePic: function(){
			if($localStorage.currentUser === undefined)
				return false;
			else
				if($localStorage.currentUser.picture == "")
					return false;
				else
					return true;
		},

		profilePicUrl: function(){
            if(this.hasProfilePic()){
                return $localStorage.currentUser.picture;
            } else {
                return "components/res/default.png";
            }
        },

		currentUser: function() { return $localStorage.currentUser; }

	};
}]);

