'use strict';


app.controller('transferController',['$scope','$modal','$http',function ($scope, $modal, $http) {

    $scope.transferApplyformDate = {};
    $scope.estimateApplyformDate = {};
    $scope.estimateConfirmApplyformDate = {};
    $scope.transferCancelApplyDate = {};


    /**
     * 打开表单弹窗：估值申请
     * @param e
     */
    $scope.estimateApply = function (e) {
        //获取当前dom  及当前日期
        var currentDom = $(e.currentTarget), data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'estimateApply.html',
            controller: estimateApplyCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });

    };

    /**
     * 估值申请页面ctrl
     * @param $scope
     * @param $modalInstance
     */
    var estimateApplyCtrl = function ($scope, $modalInstance) {

        $scope.estimateApply_init = function () {
            $scope.estimateApplyformDate = {
                isCapitalCall:0,
                transferType:0,
                isRetainCCRight:0,
                giveUpProfit:0,
                envType:0,
                transferShare:0
            }

            //字段显示控制
            $scope.transferShare_visible = false;
            $scope.CC_visible = false;
            $scope.show_transferShare = function () {
                $scope.transferShare_visible = !$scope.transferShare_visible;
            };

            //当字段显示发生变化，初始化数据校验
            $scope.show_CC = function() {
                $scope.CC_visible = !$scope.CC_visible;
            }


        };

        /**
         * 提交
         * @returns {boolean}
         */
        $scope.estimateApply_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "sendEstimateApply",
                 data: $("#estimateApplyform").serialize(),
                // data:$scope.estimateApplyformDate,
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

        /**
         * 取消
         */
        $scope.estimateApply_cancel = function () {
            $modalInstance.close();
        };

    };

    /**
     * 打开估值确认弹窗
     * @param e
     */
    $scope.estimateConfirmApply = function (e) {
        //获取当前dom  及当前日期
        var currentDom = $(e.currentTarget), data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'estimateConfirmApply.html',
            controller: estimateConfirmApplyCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    /**
     * 估值确认申请页面ctrl
     * @param $scope
     * @param $modalInstance
     */
    var estimateConfirmApplyCtrl = function ($scope, $modalInstance) {

        $scope.estimateConfirmApply_init = function () {
        };
        /**
         * 估值确认申请提交
         * @returns {boolean}
         */
        $scope.estimateConfirmApply_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "sendEstimateConfirmApply",
                data: $("#estimateConfirmApplyFrom").serialize(),
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

        /**
         * 取消
         */
        $scope.estimateConfirmApply_cancel = function () {
            $modalInstance.close();
        };
    }


    /**
     * 打开转让过户申请页面
     * @param e
     */
    $scope.transferApply = function (e) {
        //获取当前dom
        var currentDom = $(e.currentTarget), data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'transferApply.html',
            controller: transferApplyCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    }

    /**
     * 转受让过户申请页面ctrl
     * @param $scope
     * @param $modalInstance
     */
    var transferApplyCtrl = function ($scope, $modalInstance) {
        $scope.transferApplyformDate = {
            transferorServiceFeeAmt:0,
            transfereeServiceFeeAmt:0,
        };

        $scope.transferApply_init = function () {
            //变量初始化
            $scope.gh_visible = false;
            $scope.cc_disable = true;
            $scope.transferShare_disable = true;
            //过户相关字段控制显示
            $scope.show_noTradeTransfer = function () {
                $scope.gh_visible = !$scope.gh_visible;

            };
            //cc相关字段控制可用
            $scope.show_aboutCC = function () {
                $scope.cc_disable = !$scope.cc_disable;
            };
            //部分过户时金额字段可用
            $scope.show_noTradeTransferShare = function () {
                $scope.transferShare_disable = !$scope.transferShare_disable;
                // transferShare.Validator({hmsg: "请填写过户金额/份额", showok: false, style: {placement: "top"}, emsg: "部分过户时不能为空"});
            }
        };

        $scope.transferApply_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "sendTransferApply",
                data: $("#transferApplyform").serialize(),
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

        /**
         * 取消
         */
        $scope.transferApply_cancel = function () {
            $modalInstance.close();
        };
    };

    /**
     * 打开转受让过取消弹窗
     * @param e
     */
    $scope.transferCancelApply = function (e) {
        //获取当前dom  及当前日期
        var currentDom = $(e.currentTarget), data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'transferCancelApply.html',
            controller: transferCancelApplyCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    }

    /**
     * 转受让取消申请页面ctrl
     * @param $scope
     * @param $modalInstance
     */
    var transferCancelApplyCtrl = function ($scope, $modalInstance) {

        $scope.estimateCancelApply_init = function () {
        };
        //转受让取消申请提交
        $scope.transferCancelApply_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "sendTransferCancelApply",
                data: $("#transferCancelApplyFrom").serialize(),
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
        //取消
        $scope.transferCancelApply_cancel = function () {
            $modalInstance.close();
        };
    };

    /**
     * 转受让支付到账页面弹窗
     * @param e
     */
    $scope.transferPayResult = function (e) {
        var currentDom = $(e.currentTarget),data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'notifyPayResult.html',
            controller: notifyPayResultCtrl,
            resolve: {
                "form" : function () {
                    return data;
                }
            }
        });

    };

    var notifyPayResultCtrl = function ($scope,$modalInstance) {

        $scope.notifyPayResult_init = function () {
            // 验证input输入框只能输入数字和小数点
            $scope.clearNoNum = function(obj,attr){
                //    把非数字的替换，除了数字和.
                obj[attr] = obj[attr].replace(/[^\d.]/g,"");
                //    保证第一个不是.
                obj[attr] = obj[attr].replace(/^\./g,"");
                //    保证没有多个.
                obj[attr] = obj[attr].replace(/\.{2,}/g,"");
                //    保证.只出现一次
                obj[attr] = obj[attr].replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            },


            setTimeout(function () {
                Metronic.initComponents();
                ComponentsPickers.init();
            }, 300);

            /*
               表单隐藏字段的控制
           */
            $scope.amount_visible = true;
            $scope.reason_visible = true;
            $scope.show_amount_reason = function (dateValue) {
                if (dateValue =='4' ) {
                    $scope.amount_visible = !$scope.amount_visible;
                }else {
                    $scope.amount_visible =false;
                }

                if (dateValue =='3') {
                    $scope.reason_visible = !$scope.reason_visible;
                } else{
                    $scope.reason_visible = true;
                }

            };

        };

        $scope.notifyPayResult_send = function () {
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

        $scope.notifyPayResult_cancel = function () {
            $modalInstance.close();

        };


    };
}]);
