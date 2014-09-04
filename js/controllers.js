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
			services.test($scope).then(function(data) {
				$scope.data = data.data;
				if ($scope.data[0] === undefined) {
					$scope.messageGetData = {
						text: "no entries found",
						type: "alert-warning"
					}
				} else {
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

viewControllers.controller('MyCtrl2', ['$scope', function($scope) {
	$scope.test = "2";
}]);

viewControllers.controller("editEntryModalController", function ($scope, $modal) {
	$scope.open = function (entry) {
		var modalInstance = $modal.open({
			templateUrl: "myModalContent.html",
			controller: editEntryModalInstanceController,
			size: "lg",
			resolve: { entry: function() { return entry; } }
		});
	}
});

var editEntryModalInstanceController = function ($scope, $modalInstance, entry) {
	$scope.entry = entry;
	$scope.ok = function () { $modalInstance.close(); }
};

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
					type: "alert-success"
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
			} else if (data.data.status === "undefined") {
				$scope.messageEdit = {
					text: "something weird happened.",
					type: "alert-warning"
				}
			} else {
				$scope.messageAdd = {
					text: "done. factual says " + data.data.status + ".",
					type: "alert-success"	
				}
				$scope.commitID = data.data.response.commit_id;
			}
			console.log(data);
		});
	}
});

viewControllers.controller("collapseController", function ($scope) {
	$scope.isCollapsed = true;
	$scope.toggle = function () {
		$scope.isCollapsed = !$scope.isCollapsed;
	}
});

