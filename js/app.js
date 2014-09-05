"use strict";

var app = angular.module("app", [
	"app.filters",
	"app.services",
	"app.directives",
	"viewControllers",
	"ui.router",
	"ui.bootstrap",
	"ipCookie"
]);

app.factory("services", ["$http", function($http) {
	var serviceBase = "/factual-api-angularjs-php/services/";
	var obj = {};
	obj.getData = function($scope) {
		return $http({
			method: "GET",
			url: serviceBase + "getData?query=" + $scope.query
		});
	};
	obj.flagEntry = function($scope, entry) {
		return $http({
			method: "GET",
			url: serviceBase + "flagEntry?id=" + entry.factual_id
				+ "&problem=" + $scope.problem
		});
	}
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
				+ "&address_extended=" + entry.address_extended
				+ "&neighborhood=" + entry.neighborhood
				+ "&fax=" + entry.fax
				+ "&latitude=" + entry.latitude
				+ "&longitude=" + entry.longitude
				+ "&hours=" + entry.hours
				+ "&chain_id=" + entry.chain_id
				+ "&po_box=" + entry.po_box
				+ "&category_ids=" + entry.category_ids
				+ "&email=" + entry.email
				+ "&category_labels=" + entry.category_labels
				+ "&chain_name=" + entry.chain_name
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
				+ "&address_extended=" + $scope.address_extended
				+ "&neighborhood=" + $scope.neighborhood
				+ "&fax=" + $scope.fax
				+ "&latitude=" + $scope.latitude
				+ "&longitude=" + $scope.longitude
				+ "&hours=" + $scope.hours
				+ "&chain_id=" + $scope.chain_id
				+ "&po_box=" + $scope.po_box
				+ "&category_ids=" + $scope.category_ids
				+ "&email=" + $scope.email
				+ "&category_labels=" + $scope.category_labels
				+ "&chain_name=" + $scope.chain_name
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