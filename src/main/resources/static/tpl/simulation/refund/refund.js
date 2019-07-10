'use strict';

/* Controllers */

app.controller('refundController', ['$scope', '$modal', '$http', function ($scope, $modal, $http) {

    $scope.refundApplyformData = {};

    $scope.refundApply = function (e) {
        var currentDom = $(e.currentTarget), data = currentDom.attr("data-id");
        // data = data ? {"id":data} : {};
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'refundApply.html',
            controller: refundApplyCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var refundApplyCtrl = function ($scope, $modalInstance) {


        $scope.title = "认购退款申请";

        $scope.refundApply_init = function () {
            var formDom = $("#refundApplyform"),
                investApplyId = formDom.find("[name='investApplyId']"),
                refundReason = formDom.find("[name='refundReason']"),
                refundWay = formDom.find("[name='refundWay']"),
                refundType = formDom.find("[name='refundType']"),
                envType=formDom.find("[name='envType']");

                //全部退款
            if(refundWay == '1'){
                var refundSubfeeAmt = null;
                var refundContractAmt = null;
                var refundAmt = null;
            }else {
                //认购费退款-部分
                if (refundType == '1') {
                    var refundSubfeeAmt = $("#refundSubfeeAmt").val();
                    var refundContractAmt = null;
                    var refundAmt = null;
//			var refundSubfeeAmtCancel = "0000";
                }
                //合同退款-部分
                else if (refundType == '2') {
                    var refundSubfeeAmt = null;
                    var refundContractAmt = $("#refundContractAmt").val();
                    var refundAmt = null;
                }
                //合同退款-部分
                else if (refundType == '3') {
                    var refundSubfeeAmt = null;
                    var refundContractAmt = null;
                    var refundAmt = $("#refundAmt").val();
                }
            }


                setTimeout(function () {
                    Metronic.initComponents();
                    ComponentsPickers.init();
                }, 300);

                $scope.refundAmt_visible = true;
                $scope.refundSubfeeAmt_visible = true;
                $scope.refundContractAmt_visible = true;
                $scope.show_refundAmt = function () {
                    ////1:全部退款 2:部分退款
                    var refundWay = document.getElementsByName("refundWay")[0].value; // 获取下拉表单的value值
                    //1:认购费  2:合同退款  3:余额退款  4:认购取消退款
                    var refundType = document.getElementsByName("refundType")[0].value; // 获取下拉表单的value值

                         if(refundWay == "2"){
                             //认购费退款
                            if (refundType == "1") {

                                $scope.refundSubfeeAmt_visible = !$scope.refundSubfeeAmt_visible;
                                $scope.refundAmt_visible = true;
                                $scope.refundContractAmt_visible = true;

                            }else{
                                $scope.refundSubfeeAmt_visible = true;
                            }
                            //合同退款
                            if (refundType =='2'){
                                $scope.refundContractAmt_visible = !$scope.refundContractAmt_visible;
                                $scope.refundAmt_visible = true;
                                $scope.refundSubfeeAmt_visible = true;
                            }else {
                                $scope.refundContractAmt_visible = true;
                            }

                            //余额退款
                            if (refundType == '3'){
                                $scope.refundAmt_visible = !$scope.refundAmt_visible;
                                $scope.refundSubfeeAmt_visible = true;
                                $scope.refundContractAmt_visible = true;

                                alert("余额退款只支持全部退款");

                            } else {
                                $scope.refundAmt_visible = true;
                            }

                    } else{
                             $scope.refundAmt_visible = false;
                             $scope.refundSubfeeAmt_visible = true;
                             $scope.refundContractAmt_visible = true;


                         }


                }
            };


        $scope.refundApply_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "refundApply",
                data: $("#refundApplyform").serialize(),
                dataType: "json",
                success: function (datas) {
                    if (datas.code == '000') {
                        alert("操作成功");
                        location.reload();
                    }
                    ;
                    if (datas.code == '999') {
                        alert(datas.info);
                    }
                    ;
                },
                error: function () {
                    alert("系统异常,请查看系统日志");
                },
            });
        };
        $scope.refundApply_cancel = function () {
            $modalInstance.close();
        };
    };

    $scope.flowRefundApply = function (e) {
        var currentDom = $(e.currentTarget),data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'flowRefundApply.html',
            controller: flowRefundApplyCtrl,
            resolve: {
                "form" : function () {
                    return data;
                }
            }
        });
    };

    var flowRefundApplyCtrl =function ($scope, $modalInstance) {

        $scope.title = "流水退款申请";

        $scope.flowRefundApply_init = function () {
            setTimeout(function () {
                Metronic.initComponents();
                ComponentsPickers.init();
            }, 300);

        };

        $scope.flowRefundApply_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "flowRefundApply",
                data: $("#flowRefundApplyform").serialize(),
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

        $scope.flowRefundApply_cancel = function () {
            $modalInstance.close();

        };

        };

    $scope.notifyPayResult = function (e) {
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

        $scope.title = "退款申请支付通知";

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
