angular.module('pdg.currentUser', [])
.factory('CurrentUser', ['$localStorage',  
	function($localStorage) {
  
	//var currentUser;

	return {

		set: function(user) {
			$localStorage.currentUser = angular.copy(user);
		},

		clear: function() {
			delete $localStorage.currentUser;
		},

		isLoggedIn: function() {
			if($localStorage.currentUser === undefined)
				return false;
			else
				return true;
		},

		getRight: function(){
			if($localStorage.currentUser === undefined)
				return undefined;
			else
				return $localStorage.currentUser.right;
		},

		getId: function(){
			if($localStorage.currentUser === undefined)
				return undefined;
			else
				return $localStorage.currentUser._id;
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

