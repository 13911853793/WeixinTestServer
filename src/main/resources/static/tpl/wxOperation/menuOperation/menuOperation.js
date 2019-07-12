'use strict';

/* Controllers */

app.controller('menuOperationController', ['$scope', '$modal', '$http', function ($scope, $modal, $http) {
    $scope.createMenuData = {};
    $scope.deleteMenuByIdData = {};
    $scope.menuTryMatchByIdData = {};


    $scope.createMenu = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'createMenu.html',
            controller: createMenuCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var createMenuCtrl = function ($scope, $modalInstance) {

        $scope.createMenuSend = function () {
            $modalInstance.close();

            $http({
                method: "POST",
                url: "wx/menu/createByJson",
                headers: {
                    'Content-type':'application/json;charset=UTF-8'
                },
                data: $scope.createMenuData.JsonBody})
                .success(function (data)
                {
                    alert(data.info);
                    location.reload();
                })
                .error(function (data)
                {
                    alert(data.info);
                });
        };
        $scope.createMenuCancel = function () {
            $modalInstance.close();
        };
    };


    $scope.deleteMenuSend = function () {
        $http({
            method: "GET",
            url: "wx/menu/delete",
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }})
            .success(function (data)
            {
                alert(data.info);
                location.reload();
            })
            .error(function (data)
            {
                alert(data.info);
            });
    };


    $scope.getMenuSend = function () {
        $http({
            method: "GET",
            url: "wx/menu/get",
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }})
            .success(function (data)
            {
                alert(data.info);
                location.reload();
            })
            .error(function (data)
            {
                alert(data.info);
            });
    };


    $scope.getSelfMenuInfoSend = function () {
        $http({
            method: "GET",
            url: "wx/menu/getSelfMenuInfo",
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }})
            .success(function (data)
            {
                alert(data.info);
                location.reload();
            })
            .error(function (data)
            {
                alert(data.info);
            });
    };



    $scope.deleteMenuById = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'deleteMenuById.html',
            controller: deleteMenuByIdCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var deleteMenuByIdCtrl = function ($scope, $modalInstance) {

        $scope.deleteMenuByIdSend = function () {
            $modalInstance.close();

            $http({
                method: "GET",
                url: "wx/menu/delete/"+$scope.deleteMenuByIdData.menuId,
                headers: {
                    'Content-type':'application/json;charset=UTF-8'
                }})
                .success(function (data)
                {
                    alert(data.info);
                    location.reload();
                })
                .error(function (data)
                {
                    alert(data.info);
                });
        };
        $scope.deleteMenuByIdCancel = function () {
            $modalInstance.close();
        };
    };





    $scope.menuTryMatchById = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'menuTryMatchById.html',
            controller: menuTryMatchByIdCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var menuTryMatchByIdCtrl = function ($scope, $modalInstance) {

        $scope.menuTryMatchByIdSend = function () {
            $modalInstance.close();

            $http({
                method: "GET",
                url: "wx/menu/menuTryMatch/"+$scope.menuTryMatchByIdData.userid,
                headers: {
                    'Content-type':'application/json;charset=UTF-8'
                }})
                .success(function (data)
                {
                    alert(data.info);
                    location.reload();
                })
                .error(function (data)
                {
                    alert(data.info);
                });
        };
        $scope.menuTryMatchByIdCancel = function () {
            $modalInstance.close();
        };
    };


}]);
