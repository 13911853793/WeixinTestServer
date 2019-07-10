'use strict';

/* Controllers */

app.controller('subscribeController', ['$scope', '$modal', '$http', function ($scope, $modal, $http) {

    $scope.subscribeApplyformData = {};
    $scope.arrivalFlowFormData = {};
    $scope.CCSubscribeApplyformData = {};
    $scope.subscribeChangeformData = {};
    $scope.subscribeCancelformData = {};

    $scope.subscribeApply = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'subscribeApply.html',
            controller: subscribeApplyCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var subscribeApplyCtrl = function ($scope, $modalInstance) {
        //表单字段的默认值
        $scope.subscribeApplyformData = {
            subscribeApplyNum: "1",
            flowNum: "1",
            lockPeriod: "0",
            redeemCycle: "0",
            ftermId: "0",
            flowAmount: "0",
            subfeeDisRate: "1",
            subfeeDisAmt: "0"
        };
        $scope.subscribeApply_init = function () {


            setTimeout(function () {
                Metronic.initComponents();
                ComponentsPickers.init();
            }, 300);

            //表单隐藏字段的控制
            $scope.flow_amount_visible = true;
            $scope.show_flow_amount = function () {
                $scope.flow_amount_visible = !$scope.flow_amount_visible;
            };

            $scope.redeemCycle_visible = true;
            $scope.show_redeemCycle = function (dateValue) {
                if (dateValue == '4') {
                    $scope.redeemCycle_visible = !$scope.redeemCycle_visible;
                } else {
                    $scope.redeemCycle_visible = true;
                }
            };

            $scope.ftermType_visible = true;
            $scope.show_ftermType = function (dateValue) {
                if (dateValue == '2') {
                    $scope.ftermType_visible = !$scope.ftermType_visible;
                } else {
                    $scope.ftermType_visible = true;
                }
            };
            $scope.change_subfeeDisType = function (dateValue) {
                if (dateValue == '1') {
                    $scope.subscribeApplyformData.subfeeDisRate = "1";
                    $scope.subscribeApplyformData.subfeeDisAmt = "0";
                }
                if (dateValue == '2') {
                    $scope.subscribeApplyformData.subfeeDisRate = "1";
                    $scope.subscribeApplyformData.subfeeDisAmt = "0";
                }

            };


            $scope.isPay_visible = true;
            $scope.isPayType_visible = true;
            $scope.isPayBackType_visible = true;
            $scope.transTime_visible = true;

            $scope.show_isPayType = function (dateValue) {
                if (dateValue == '5') {
                    $scope.isPay_visible = false;
                    $scope.isPayType_visible = false;
                    $scope.transTime_visible = true;
                }
                if (dateValue == '1' || dateValue == '2' || dateValue == '3') {
                    $scope.isPay_visible = false;
                    $scope.isPayType_visible = true;
                    $scope.transTime_visible = false;
                }
                if (dateValue == '0') {
                    $scope.isPay_visible = true;
                    $scope.isPayType_visible = true;
                    $scope.transTime_visible = true;
                }
            };
            $scope.show_isPayBackType = function (dateValue) {
                if (dateValue == '1') {
                    $scope.isPay_visible = false;
                    $scope.isPayBackType_visible = false;
                } else {
                    $scope.isPay_visible = true;
                    $scope.isPayBackType_visible = true;
                }
            };
        };

        $scope.subscribeApply_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "sendSubscribeApply",
                data: $("#subscribeApplyform").serialize(),
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
                    console.log();
                    alert("系统异常,请查看系统日志");
                },
            });
        };
        $scope.subscribeApply_cancel = function () {
            $modalInstance.close();
        };
    };


    $scope.arrivalFlow = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'arrivalFlow.html',
            controller: arrivalFlowCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var arrivalFlowCtrl = function ($scope, $modalInstance) {
        $scope.arrivalFlowFormData = {flowNum: "1", flowAmount: "0"};
        $scope.arrivalFlowInit = function () {
            setTimeout(function () {
                Metronic.initComponents();
                ComponentsPickers.init();
            }, 300);

            //表单隐藏字段的控制
            $scope.flow_amount_visible = true;
            $scope.fee_amount_visible = true;
            $scope.fee_type_disable = true;
            $scope.disabledFeeType = function(flowType){
                if('5'== flowType){
                    $scope.arrivalFlowFormData.isFeeAmount = 1;
                    $scope.fee_type_disable = false;
                    $scope.fee_amount_visible = false;
                }else {
                    $scope.arrivalFlowFormData.isFeeAmount = 0;
                    $scope.fee_type_disable = true;
                    $scope.fee_amount_visible = true;
                }
            };
            $scope.showArrivalFlowFormFlowAmount = function () {
                $scope.flow_amount_visible = !$scope.flow_amount_visible;
            };
            $scope.showArrivalFlowFormFeeAmount = function () {
                $scope.fee_amount_visible = !$scope.fee_amount_visible;
            };
        };

        $scope.arrivalFlowSend = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "sendArrivalFlow",
                data: $("#arrivalFlowForm").serialize(),
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
        $scope.arrivalFlowCancel = function () {
            $modalInstance.close();
        };
    };


    $scope.ccSubscribeApply = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'CCSubscribeApply.html',
            controller: ccSubscribeApplyCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var ccSubscribeApplyCtrl = function ($scope, $modalInstance) {
        //表单字段的默认值
        $scope.CCSubscribeApplyformData = {
            flowNum: "1",
            lockPeriod: "0",
            redeemCycle: "0",
            ftermId: "0",
            flowAmount: "0",
            subfeeDisRate: "1",
            subfeeDisAmt: "0",
            callContractRate: "0"
        };
        $scope.ccSubscribeApply_init = function () {
            setTimeout(function () {
                Metronic.initComponents();
                ComponentsPickers.init();
            }, 300);


            //表单隐藏字段的控制
            $scope.isFirstCall_rootInvestApplyNo_visible = true;
            $scope.isFirstCall_visible = !$scope.isFirstCall_rootInvestApplyNo_visible;
            $scope.show_isFirstCall = function (dateValue) {
                if (dateValue == '0') {
                    $scope.isFirstCall_rootInvestApplyNo_visible = !$scope.isFirstCall_rootInvestApplyNo_visible;
                    $scope.isFirstCall_visible = !$scope.isFirstCall_rootInvestApplyNo_visible;
                }
                if (dateValue == '1') {
                    $scope.isFirstCall_rootInvestApplyNo_visible = true;
                    $scope.isFirstCall_visible = !$scope.isFirstCall_rootInvestApplyNo_visible;
                }

            };
            $scope.isCallContractRate_visible = false;
            $scope.show_isLastCall = function (dateValue) {
                if (dateValue == '1') {
                    $scope.isCallContractRate_visible = !$scope.isCallContractRate_visible;
                }
                if (dateValue == '0') {
                    $scope.isCallContractRate_visible = false;
                }

            };

            $scope.ccFlow_amount_visible = true;
            $scope.show_ccFlow_amount = function () {
                $scope.ccFlow_amount_visible = !$scope.ccFlow_amount_visible;
            };

            $scope.ccRedeemCycle_visible = true;
            $scope.show_ccRedeemCycle = function (dateValue) {
                if (dateValue == '4') {
                    $scope.ccRedeemCycle_visible = !$scope.ccRedeemCycle_visible;
                } else {
                    $scope.ccRedeemCycle_visible = true;
                }
            };

            $scope.ccFtermType_visible = true;
            $scope.show_ccFtermType = function (dateValue) {
                if (dateValue == '2') {
                    $scope.ccFtermType_visible = !$scope.ccFtermType_visible;
                } else {
                    $scope.ccFtermType_visible = true;
                }
            };

            $scope.isPay_cc_visible = true;
            $scope.isPayType_cc_visible = true;
            $scope.isPayBackType_cc_visible = true;
            $scope.transTime_cc_visible = true;

            $scope.show_cc_isPayType = function (dateValue) {
                if (dateValue == '5') {
                    $scope.isPay_cc_visible = false;
                    $scope.isPayType_cc_visible = false;
                    $scope.transTime_cc_visible = true;
                }
                if (dateValue == '1' || dateValue == '2' || dateValue == '3') {
                    $scope.isPay_cc_visible = false;
                    $scope.isPayType_cc_visible = true;
                    $scope.transTime_cc_visible = false;
                }
                if (dateValue == '0') {
                    $scope.isPay_cc_visible = true;
                    $scope.isPayType_cc_visible = true;
                    $scope.transTime_cc_visible = true;
                }
            };
            $scope.show_cc_isPayBackType = function (dateValue) {
                if (dateValue == '1') {
                    $scope.isPay_cc_visible = false;
                    $scope.isPayBackType_cc_visible = false;
                } else {
                    $scope.isPay_cc_visible = true;
                    $scope.isPayBackType_cc_visible = true;
                }
            };


            $scope.change_ccSubfeeDisType = function (dateValue) {
                if (dateValue == '1') {
                    $scope.CCSubscribeApplyformData.subfeeDisRate = "1";
                    $scope.CCSubscribeApplyformData.subfeeDisAmt = "0";
                }
                if (dateValue == '2') {
                    $scope.CCSubscribeApplyformData.subfeeDisRate = "1";
                    $scope.CCSubscribeApplyformData.subfeeDisAmt = "0";
                }

            };
        };

        $scope.ccSubscribeApply_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "sendCCSubscribeApply",
                data: $("#CCSubscribeApplyform").serialize(),
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
        $scope.ccSubscribeApply_cancel = function () {
            $modalInstance.close();
        };
    };

    $scope.subscribeChange = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'subscribeChange.html',
            controller: subscribeChangeCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var subscribeChangeCtrl = function ($scope, $modalInstance) {
        //表单字段的默认值
        $scope.subscribeChangeformData = {
            changeReason: "认购变更",
            changeType: 1,
            envType: 0
        };
        $scope.subscribeChange_init = function () {
            setTimeout(function () {
                Metronic.initComponents();
                ComponentsPickers.init();
            }, 300);

            //表单隐藏字段的控制
            $scope.changeType_bankAccount = false;
            $scope.changeType_contractNo = true;
            $scope.changeType_bankinfo = true;
            $scope.changeType_bankAccount_info = true;
            $scope.show_changeType = function (dateValue) {
                if (dateValue == '1') {
                    $scope.changeType_bankAccount = false;
                    $scope.changeType_contractNo = true;
                    $scope.changeType_bankinfo = true;
                    $scope.changeType_bankAccount_info = true;
                }
                if (dateValue == '2') {
                    $scope.changeType_bankAccount = true;
                    $scope.changeType_contractNo = false;
                    $scope.changeType_bankinfo = true;
                    $scope.changeType_bankAccount_info = true;
                }
                if (dateValue == '3') {
                    $scope.changeType_bankAccount = true;
                    $scope.changeType_contractNo = true;
                    $scope.changeType_bankinfo = false;
                    $scope.changeType_bankAccount_info = true;
                    $scope.get_investBankInfo($scope.subscribeChangeformData.investApplyNo,
                        $scope.subscribeChangeformData.bankAccount, $scope.subscribeChangeformData.changeType, $scope.subscribeChangeformData.envType);
                }
                if (dateValue == '4') {
                    $scope.changeType_bankAccount = true;
                    $scope.changeType_contractNo = true;
                    $scope.changeType_bankinfo = true;
                    $scope.changeType_bankAccount_info = false;
                    $scope.get_investBankInfo($scope.subscribeChangeformData.investApplyNo,
                        $scope.subscribeChangeformData.bankAccount, $scope.subscribeChangeformData.changeType, $scope.subscribeChangeformData.envType);

                }
            };

            $scope.is_CNY = false;
            $scope.is_FOREI = true;
            $scope.show_currency = function (dateValue) {
                if (dateValue == '0') {
                    $scope.is_CNY = false;
                    $scope.is_FOREI = true;
                }
                if (dateValue == '1') {
                    $scope.is_CNY = true;
                    $scope.is_FOREI = false;
                }

            };

            $scope.is_IN = false;
            $scope.is_OUT = true;
            $scope.show_bankRegion = function (dateValue) {
                if (dateValue == '0') {
                    $scope.is_IN = false;
                    $scope.is_OUT = true;
                }
                if (dateValue == '1') {
                    $scope.is_IN = true;
                    $scope.is_OUT = false;
                }

            };
        };
        $scope.get_investBankInfo = function (investApplyNo, bankAccount, changeType, envType) {

            if (changeType == '3' || (changeType == '4' && bankAccount != null)) {
                $.ajax({
                    type: "post",
                    url: "getInvestBankInfo",
                    data: {
                        "investApplyNo": investApplyNo,
                        "bankAccount": bankAccount,
                        "changeType": changeType,
                        "envType": envType
                    },
                    dataType: "json",
                    success: function (datas) {
                        if (datas.code == '000') {
                            $scope.subscribeChangeformData.bankAccountName = datas.bankAccountName;
                            $scope.subscribeChangeformData.bankCode = datas.bankCode;
                            $scope.subscribeChangeformData.bankOpenName = datas.bankOpenName;
                            $scope.subscribeChangeformData.bankAccountNameEn = datas.bankAccountNameEn;
                            $scope.subscribeChangeformData.bankSwiftCode = datas.bankSwiftCode;
                            $scope.subscribeChangeformData.bankAddress = datas.bankAddress;
                            $scope.subscribeChangeformData.bankProvinceId = datas.bankProvinceId;
                            $scope.subscribeChangeformData.bankCityId = datas.bankCityId;
                            $scope.subscribeChangeformData.bankCountry = datas.bankCountry;
                            $scope.subscribeChangeformData.bankState = datas.bankState;
                            $scope.subscribeChangeformData.currency = 0;
                            $scope.subscribeChangeformData.bankRegion = 0;
                        }
                        ;
                    },
                    error: function () {
                        console.log();
                        alert("系统异常,请查看系统日志");
                    },
                });
            }
        };
        $scope.subscribeChange_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "sendSubscribeChange",
                // data: $("#subscribeChangeform").serialize(),
                data:$scope.subscribeChangeformData,
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
                    console.log();
                    alert("系统异常,请查看系统日志");
                },
            });
        };
        $scope.subscribeChange_cancel = function () {
            $modalInstance.close();
        };
    };

    $scope.subscribeCancel = function (e) {
        var currentDom = $(e.currentTarget),
            data = currentDom.attr("data-id");
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'subscribeCancel.html',
            controller: subscribeCancelCtrl,
            resolve: {
                "form": function () {
                    return data;
                }
            }
        });
    };

    var subscribeCancelCtrl = function ($scope, $modalInstance) {
        //表单字段的默认值
        $scope.subscribeCancelformData = {
            cancelReason: "认购取消"
        };
        $scope.subscribeCancel_init = function () {
            setTimeout(function () {
                Metronic.initComponents();
                ComponentsPickers.init();
            }, 300);


            $scope.is_Call = true;
            $scope.show_isCall = function (dateValue) {
                if (dateValue == '0') {
                    $scope.is_Call = true;
                };
                if (dateValue == '1') {
                    $scope.is_Call = false;
                };

            };

            $scope.is_Root = true;
            $scope.show_isRoot = function (dateValue) {
                if (dateValue == '0') {
                    $scope.is_Root = true;
                };
                if (dateValue == '1') {
                    $scope.is_Root = false;
                };

            };
        };

        $scope.subscribeCancel_send = function () {
            $modalInstance.close();
            $.ajax({
                type: "post",
                url: "sendSubscribeCancel",
                data: $("#subscribeCancelform").serialize(),
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
                    console.log();
                    alert("系统异常,请查看系统日志");
                },
            });
        };
        $scope.subscribeCancel_cancel = function () {
            $modalInstance.close();
        };
    };
}]);
