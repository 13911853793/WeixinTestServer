'use strict';

/* Controllers */

app.controller('menuOperationController', ['$scope', '$modal', '$http', function ($scope, $modal, $http) {
    $scope.createMenuData = {};

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
                url: "wx/menuOperation/createByJson",
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
            url: "wx/menuOperation/delete",
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




}]);
