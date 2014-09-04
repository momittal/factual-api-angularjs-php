"use strict";

var app = angular.module("myApp", [
	"myApp.filters",
	"myApp.services",
	"myApp.directives",
	"viewControllers",
	"ui.router",
	"ui.bootstrap",
	"ipCookie"
]);

app.factory("services", ["$http", function($http) {
	var serviceBase = "/factualapi/services/";
	var obj = {};
	obj.test = function($scope) {
		return $http({
			method: "GET",
			url: serviceBase + "test?query=" + $scope.query
		});
	};
	obj.editEntry = function(entry) {
		return $http({
			method: "GET",
			url: serviceBase + "editEntry?name=" + entry.name
				+ "&address=" + entry.address
				+ "&locality=" + entry.locality
				+ "&region=" + entry.region
				+ "&postcode=" + entry.postcode
				+ "&country=" + entry.country
				+ "&tel=" + entry.tel
				+ "&website=" + entry.website
		});
	}
	obj.addEntry = function($scope) {
		return $http({
			method: "GET",
			url: serviceBase + "addEntry?name=" + $scope.name
				+ "&address=" + $scope.address
				+ "&locality=" + $scope.locality
				+ "&region=" + $scope.region
				+ "&postcode=" + $scope.postcode
				+ "&country=" + $scope.country
				+ "&tel=" + $scope.tel
				+ "&website=" + $scope.website
		});
	}
	return obj;
}]);

app.config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise("search");
	$stateProvider
		.state("search", {
			url: "/search",
			templateUrl: "partials/search.php",
			controller: "searchController"
		})
		.state("view2", {
			url: "/view2",
			templateUrl: "partials/partial2.php",
			controller: "MyCtrl2"
		});
}]);