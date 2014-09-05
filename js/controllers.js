'use strict';

/* Controllers */

var viewControllers = angular.module('viewControllers', []);

viewControllers.controller('searchController', ['$scope', '$http', 'services', function($scope, $http, services) {
	$scope.getData = function () {
		$scope.messageGetData = {
				text: "searching for " + $scope.query + "...",
				type: "alert-info"
		}
		if ($scope.query) {
			services.getData($scope).then(function(data) {
				$scope.data = data.data;
				if ($scope.data[0] === undefined) {
					$scope.messageGetData = {
						text: "no entries found",
						type: "alert-warning"
					}
				} else {
					console.log($scope.data)
					$scope.messageGetData = null;
				}
			})
		} else {
			$scope.messageGetData = {
				text: "forget something?",
				type: "alert-warning"
			}
		}
	};
	$scope.clear = function () {
		$scope.messageGetData = null;
		$scope.data = null;
		$scope.query = "";
	};
}]);

viewControllers.controller("flagEntryModalController", function ($scope, $modal) {
	$scope.open = function (entry) {
		var modalInstance = $modal.open({
			templateUrl: "flagEntryModal.html",
			controller: modalInstanceController,
			size: "md",
			resolve: { entry: function() { return entry; } }
		});
	}
});

viewControllers.controller("editEntryModalController", function ($scope, $modal) {
	$scope.open = function (entry) {
		var modalInstance = $modal.open({
			templateUrl: "myModalContent.html",
			controller: modalInstanceController,
			size: "lg",
			resolve: { entry: function() { return entry; } }
		});
	}
});

var modalInstanceController = function ($scope, $modalInstance, entry) {
	$scope.entry = entry;
	$scope.ok = function () { $modalInstance.close(); }
};

viewControllers.controller("flagEntryController", function ($scope, services) {
	$scope.flag = function (entry) {
		$scope.messageFlag = {
			text: "trying to flag " + entry.name + "...",
			type: "alert-info"
		};
		services.flagEntry($scope, entry).then(function(data) {
			console.log(data);
			if (data.data.status === "ok") {
				$scope.messageFlag = {
					text: entry.name + " has been flagged as " + $scope.problem + ".",
					type: "alert-success",
					success: true
				};
			} else {
				$scope.messageFlag = {
					text: "something's wrong. what'd you do?",
					type: "alert-warning"
				};
			}
		});
	}
});

viewControllers.controller("editEntryController", function ($scope, services) {
	$scope.edit = function (entry) {
		$scope.messageEdit = {
				text: "attempting to edit " + entry.name + "...",
				type: "alert-info"
		}
		services.editEntry(entry).then(function(data) {
			console.log(data);
			if (data.data.status === "warning") {
				$scope.messageEdit = {
					text: data.data.message,
					type: "alert-warning"
				};
			} else if (data.data.status === "undefined") {
				$scope.messageEdit = {
					text: "something weird happened.",
					type: "alert-warning"
				}
			} else {
				$scope.messageEdit = {
					text: "done. factual says " + data.statusText + ".",
					type: "alert-success",
					success: true
				}
				$scope.commitID = data.data.response.commit_id;
			}
		});
	}
});

viewControllers.controller("addEntryController", function ($scope, services) {
	$scope.add = function () {
		$scope.messageAdd = {
				text: "creating a new entry for " + $scope.name + "...",
				type: "alert-info"
		}
		services.addEntry($scope).then(function(data) {
			if (data.data.status === "warning") {
				$scope.messageAdd = {
					text: data.data.message,
					type: "alert-warning"
				};
			} else if (data.data.status === "undefined" || typeof data.data.status === "undefined") {
				$scope.messageAdd = {
					text: "something weird happened.",
					type: "alert-warning"
				}
			} else {
				$scope.messageAdd = {
					text: "done. factual says " + data.data.status + ".",
					type: "alert-success",
					success: true
				}
				$scope.commitID = data.data.response.commit_id;
			}
			console.log(data);
		});
	}
	$scope.clear = function () {
		$scope.name = $scope.address = $scope.address_extended = $scope.locality
		= $scope.region = $scope.postcode = $scope.country = $scope.templateUrl
		= $scope.fax = $scope.latitude = $scope.longitude = $scope.website
		= $scope.hours = $scope.chain_id = $scope.po_box = $scope.category_ids
		= $scope.email = null;
		if ($scope.messageAdd) {
			$scope.messageAdd.text = $scope.messageAdd.type
			= $scope.messageAdd.success = null;
		}
	}
});

viewControllers.controller("addEntryCollapseController", function ($scope) {
	$scope.isCollapsed = true;
	$scope.buttonText = "add data";
	$scope.toggle = function () {
		$scope.isCollapsed = !$scope.isCollapsed;
		if ($scope.buttonText === "add data") $scope.buttonText = "nevermind";
		else $scope.buttonText = "add data";
	}
});

