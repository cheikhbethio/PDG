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

		getRight : function(){
			var cookievalue = $cookies.get('SeugneBethioLaGrace');
			if (cookievalue) {
				cookievalue = JSON.parse(cookievalue);
				return cookievalue.right;			
			} 
			return null
		},

		set: function(user) {
			$localStorage.currentUser = angular.copy(user);
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

