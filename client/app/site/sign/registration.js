'use strict';


angular.module('registration', ['ui.router'])
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('site.registration', {
				url :'/registration',
                css : 'assets/css/body/sign.css',
				templateUrl : 'app/site/sign/registration.html',
				controller	: 'registrationController'
			})
	}])
	.controller('registrationController', ['$rootScope', '$scope', '$state', 'SignUp',
		function($rootScope, $scope, $state, SignUp){

		$rootScope.titre = "Thiantakones";
		$scope.newUser = {};
		$scope.message;
		$scope.invalidForm = false;
		
		$scope.loginAlreadyUsed = false;
		$scope.emailAlreadyUsed = false;
		$scope.nonMatchingPwd = false;

		$scope.saveNewUser = function() {

		  	if ($scope.registrationForm.$valid) {

		    	if($scope.newUser.password === $scope.newUser.passwordConfirmation){

		    		var nuser =  {
						firstname: $scope.newUser.firstName,
						lastname: $scope.newUser.lastName, 
						login: $scope.newUser.login,
						email: $scope.newUser.email,
						password: $scope.newUser.password
					};

		    		SignUp.save(nuser, function(resp) {
						if(resp.code == 0){
							$scope.message = resp.message;
							$state.go('site.connexion', {registration : true});
							console.log("### ok registration :", $scope.message);
						}else{
							$scope.message = resp.message;
							console.log("### ko registration :", $scope.message);
							$scope.invalidForm = true;
						}
					}, function(error){
						console.log("Response: ", error);
					});

		    	}
		    	else{
		    		$scope.nonMatchingPwd = true;
		    		console.log("the password don't match !!");
		    	}
		  	}
		  	else{
		  		console.log("Invalide form: ");
		  		$scope.invalidForm = true;
		  	}

		  	console.log($scope.newUser);
		};

		$scope.resetRegistrationForm = function() {
			$scope.newUser = {};

			$scope.loginAlreadyUsed = false;
			$scope.emailAlreadyUsed = false;

			$scope.nonMatchingPwd = false;;
  		};

  		$scope.closeAlert = function() {
			$scope.invalidForm = false;
		};


	}]);