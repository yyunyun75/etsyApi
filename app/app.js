'use strict';
(function(angular){

	var app = angular.module('apiApp', []);

	app.config(['$locationProvider', function($locationProvider){
		$locationProvider.html5Mode(true);
	}]);

	app.controller('appCtrl', ['$scope', '$http', '$location',
		function($scope, $http, $location){
			$http.jsonp('https://openapi.etsy.com/v2/listings/active.js?fields=listing_id,title,price,url,description,tags&includes=Images:1:0&api_key=umb36tq9mcay4qh71njauw7b&callback=JSON_CALLBACK').then(
				function(results){
					var tags = $location.search().tags;
					if(!!tags){
						$scope.items = [];
						angular.forEach(results.data.results, function(value, key) {
						 	if(value.title.indexOf(tags)>-1 || value.tags.indexOf(tags) > -1 || value.description.indexOf(tags) > -1){
						 		this.push(value);
						 	}
						}, $scope.items);
					}else{
						$scope.items = results.data.results;
					}			

				},
				function(error){
					console.log('error getting data', error);
				}
			);



		}
	]);


})(angular);