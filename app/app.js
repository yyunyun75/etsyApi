'use strict';
(function(angular){

	var app = angular.module('apiApp', []);


	app.controller('appCtrl', ['$scope', '$http',
		function($scope, $http){
			$http.jsonp('https://openapi.etsy.com/v2/listings/active.js?api_key=umb36tq9mcay4qh71njauw7b&callback=JSON_CALLBACK').then(
				function(results){
					console.log(results.data.results);
				},
				function(error){
					console.log('error getting data', error);
				}
			);

		}
	]);


})(angular);