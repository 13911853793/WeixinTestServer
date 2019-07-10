'use strict';

/* Controllers */

app.controller('redeemController', ['$scope', '$modal', '$http', function ($scope, $modal, $http) {

    $scope.redeemApplyformData = {};
    $scope.redeemCancelApplyformData = {};
    $scope.notifyPayResultformData = {};

    $scope.redeemApply = function (e) {
        var currentDom = $(e.currentTarget), data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'redeemApply.html',
            controller: redeemApplyCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var redeemApplyCtrl = function ($scope, $modalInstance) {

        $scope.redeemApply_init = function () {

            // 验证input输入框只能输入数字和小数点
            $scope.clearNoNumRedeem = function(obj,attr){
                //    把非数字的替换，除了数字和.
                obj[attr] = obj[attr].replace(/[^\d.]/g,"");
                //    保证第一个不是.
                obj[attr] = obj[attr].replace(/^\./g,"");
                //    保证没有多个.
                obj[attr] = obj[attr].replace(/\.{2,}/g,"");
                //    保证.只出现一次
                obj[attr] = obj[attr].replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            };

            setTimeout(function () {
                ComponentsPickers.init();
            }, 300);

            /*
               表单隐藏字段的控制
           */
            $scope.redeemPlan_visible = true;
            $scope.show_byApplyType = function (dateValue) {
                if (dateValue =='2' ) {
                    $scope.redeemPlan_visible = !$scope.redeemPlan_visible;
                }else {
                    $scope.redeemPlan_visible =true;
                }
            };

            $scope.redeemShare_visible = false;
            $scope.show_redeemShare = function (dateValue) {
                if (dateValue =='1') {
                    $scope.redeemShare_visible = !$scope.redeemShare_visible;
                } else{
                    $scope.redeemShare_visible = false;
                }
            };

            $scope.totalValue_invisible = true;
            $scope.show_redeem_way = function (dateValue) {
                if (dateValue =='0') {
                    $scope.totalValue_invisible = !$scope.totalValue_invisible;
                } else{
                    $scope.totalValue_invisible = true;
                }
            };

        };


        $scope.redeemApply_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "redeemApply",
                data: $("#redeemApplyform").serialize(),
                dataType: "json",
                success: function (datas) {
                    if (datas.code == '000') {
                        alert(datas.info);
                        location.reload();
                    };
                    if (datas.code == '999') {
                        alert(datas.info);
                    };
                },
                error: function () {
                    alert("系统异常,请查看系统日志");
                },
            });

        };
        $scope.redeemApply_cancel = function () {
            $modalInstance.close();
        };
    };

    $scope.redeemCancelApply = function (e) {
        var currentDom = $(e.currentTarget), data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'redeemCancelApply.html',
            controller: redeemCancelApplyCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var redeemCancelApplyCtrl = function ($scope, $modalInstance) {

        $scope.redeemCancleApply_init = function () {

            // 验证input输入框只能输入数字和小数点
            $scope.clearNoNumRedeemCancel= function(obj,attr){
                //    把非数字的替换，除了数字和.
                obj[attr] = obj[attr].replace(/[^\d.]/g,"");
                //    保证第一个不是.
                obj[attr] = obj[attr].replace(/^\./g,"");
                //    保证没有多个.
                obj[attr] = obj[attr].replace(/\.{2,}/g,"");
                //    保证.只出现一次
                obj[attr] = obj[attr].replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            };
            setTimeout(function () {
                Metronic.initComponents();
                ComponentsPickers.init();
            }, 300);
        };

        $scope.redeemCancelApply_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "redeemCancelApply",
                data: $("#redeemCancelApplyform").serialize(),
                dataType: "json",
                success: function (datas) {
                    if (datas.status == '000') {
                        alert(datas.info);
                        location.reload();
                    };
                    if (datas.code == '999') {
                        alert(datas.info);
                    };
                },
                error: function () {
                    alert("系统异常,请查看系统日志");
                },
            });
        };
        $scope.redeemCancelApply_cancel = function () {
            $modalInstance.close();
        };
    };

    $scope.notifyResult = function (e) {
        var currentDom = $(e.currentTarget), data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'notifyRedeemPayResult.html',
            controller: notifyRedeemPayResultCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var notifyRedeemPayResultCtrl = function ($scope,$modalInstance) {

        $scope.notifyRedeemPayResult_init = function () {
            // 验证input输入框只能输入数字和小数点
            $scope.clearNoNumRedeem = function(obj,attr){
                //    把非数字的替换，除了数字和.
                obj[attr] = obj[attr].replace(/[^\d.]/g,"");
                //    保证第一个不是.
                obj[attr] = obj[attr].replace(/^\./g,"");
                //    保证没有多个.
                obj[attr] = obj[attr].replace(/\.{2,}/g,"");
                //    保证.只出现一次
                obj[attr] = obj[attr].replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            };

            setTimeout(function () {
                Metronic.initComponents();
                ComponentsPickers.init();
            }, 300);

            /*
               表单隐藏字段的控制
           */
            $scope.amountvisible = true;
            $scope.reasonvisible = true;
            $scope.redeemapplytype = function (dateValue) {
                if (dateValue =='4' ) {
                    $scope.amountvisible= !$scope.amountvisible;
                }else {
                    $scope.amountvisible =false;
                }

                if (dateValue =='3') {
                    $scope.reasonvisible = !$scope.reasonvisible;
                } else{
                    $scope.reasonvisible = true;
                }
            };
        };

        $scope.notifyPayResultSend = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "notifyPayResult",
                data: $("#notifyPayResultform").serialize(),
                contentType:'application/json;charset=utf-8',
                dataType: "json",
                success: function (datas) {
                    if (datas.code == '000') {
                        alert("操作成功");
                        location.reload();
                    };
                    if (datas.code == '999') {
                        alert(datas.info);
                    };
                },
                error: function () {
                    alert("系统异常,请查看系统日志");
                },
            });
        };

        $scope.notifyPayResultCancel = function () {
            $modalInstance.close();

        };
    };

}]);