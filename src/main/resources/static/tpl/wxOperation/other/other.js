'use strict';

/* Controllers */

app.controller('otherController', ['$scope', '$modal', '$http', function ($scope, $modal, $http) {
    $scope.taUnlockformData = {};
    $scope.antoMathformData = {};
    $scope.noNeedMatchformData = {};
    $scope.enjoyBathformData = {};
    $scope.queuesArray = [];

    $scope.taUnlock = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'taUnlock.html',
            controller: taUnlockCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var taUnlockCtrl = function ($scope, $modalInstance) {
        $scope.taUnlock_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "doUnlock",
                data: $("#taUnlockform").serialize(),
                dataType: "json",
                success: function (datas) {
                    if (datas.code == '000') {
                        alert(datas.info);
                    };
                    if (datas.code == '999') {
                        alert(datas.info);
                    };
                },
                error: function () {
                    console.log();
                    alert("系统异常,请查看系统日志");
                },
            });
        };
        $scope.taUnlock_cancel = function () {
            $modalInstance.close();
        };
    };


    $scope.antoMath = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'antoMath.html',
            controller: antoMathCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var antoMathCtrl = function ($scope, $modalInstance) {
        $scope.antoMath_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "doAutoMatch",
                data: $("#antoMathform").serialize(),
                dataType: "json",
                success: function (datas) {
                    if (datas.code == '000') {
                        alert(datas.info);
                    };
                    if (datas.code == '999') {
                        alert(datas.info);
                    };
                },
                error: function () {
                    console.log();
                    alert("系统异常,请查看系统日志");
                },
            });
        };
        $scope.antoMath_cancel = function () {
            $modalInstance.close();
        };
    };


    $scope.noNeedMatch = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'noNeedMatch.html',
            controller: noNeedMatchCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var noNeedMatchCtrl = function ($scope, $modalInstance) {

        $scope.noNeedMatch_init = function () {
            setTimeout(function () {
                Metronic.initComponents();
                ComponentsPickers.init();
            }, 300);
        };

        $scope.noNeedMatch_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "noNeedMatch",
                data: $("#noNeedMatchform").serialize(),
                dataType: "json",
                success: function (datas) {
                    if (datas.code == '000') {
                        alert(datas.info);
                    };
                    if (datas.code == '999') {
                        alert(datas.info);
                    };
                },
                error: function () {
                    console.log();
                    alert("系统异常,请查看系统日志");
                },
            });
        };
        $scope.noNeedMatch_cancel = function () {
            $modalInstance.close();
        };
    };

    $scope.enjoyBath = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'enjoyBath.html',
            controller: enjoyBathCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var enjoyBathCtrl = function ($scope, $modalInstance) {
        $scope.enjoyBath_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "enjoyBath",
                data: $("#enjoyBathform").serialize(),
                dataType: "json",
                success: function (datas) {
                    if (datas.code == '000') {
                        alert(datas.info);
                    };
                    if (datas.code == '999') {
                        alert(datas.info);
                    };
                },
                error: function () {
                    console.log();
                    alert("系统异常,请查看系统日志");
                },
            });
        };
        $scope.enjoyBath_cancel = function () {
            $modalInstance.close();
        };
    };

    $scope.sendSIA = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'sendSIA.html',
            controller: sendSIACtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var sendSIACtrl = function ($scope, $modalInstance) {

        $scope.title = "发送SIA消息";
        $scope.sendSia_init = function() {
            $scope.queuesArray = new Array();
            $.ajax({
                type: "post",
                url: "getSiaCode",
                data: "",
                dataType: "json",
                success: function (datas) {
                        for(var key in datas) {
                            $scope.queuesArray.push({label:key,value:datas[key]});
                        }
                },
                error: function () {
                    console.log();
                    alert("系统异常,请查看系统日志");
                },
            });

        };

        $scope.sendSia_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "sendSia",
                data: $("#SiaSendform").serialize(),
                dataType: "json",
                success: function (datas) {
                    if (datas.code == '000') {
                        alert(datas.info);
                    };
                    if (datas.code == '999') {
                        alert(datas.info);
                    };
                },
                error: function () {
                    console.log();
                    alert("系统异常,请查看系统日志");
                },
            });
        };
        $scope.sendSia_cancel = function () {
            $modalInstance.close();
        };
    };
}]);