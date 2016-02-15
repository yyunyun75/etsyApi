'use strict';
(function(angular){

	var app = angular.module('apiApp', []);


	app.controller('appCtrl', ['$scope', '$http',
		function($scope, $http){
			$http.jsonp('https://openapi.etsy.com/v2/listings/active.js?fields=listing_id,title,price,url,tags&includes=Images:1:0&api_key=umb36tq9mcay4qh71njauw7b&callback=JSON_CALLBACK').then(
				function(results){
					$scope.items = results.data.results;
					console.log($scope.items);
				},
				function(error){
					console.log('error getting data', error);
				}
			);

		}
	]);


})(angular);