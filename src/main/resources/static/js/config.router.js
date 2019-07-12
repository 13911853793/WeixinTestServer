'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )

    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/menuOperation/operation');

                $stateProvider
                    .state('subscribe', {
                        abstract: true,
                        url: '/menuOperation',
                        templateUrl: 'tpl/wxOperation/menuOperation/index.html'
                    })
                    .state('subscribe.operation', {
                        url: '/operation',
                        views: {

                            'menuPage': {
                                templateUrl: 'tpl/wxOperation/menuOperation/menuOperation.html'
                            },
                            'createMenu': {
                                templateUrl: 'tpl/wxOperation/menuOperation/createMenu.html'
                            }

                            // 'subscribeApply': {
                            //     templateUrl: 'tpl/wxOperation/menuOperation/subscribeApply.html'
                            // },
                            //
                            // 'searchPage': {
                            //     templateUrl: 'tpl/wxOperation/search.html'
                            // },
                            // 'viewPage': {
                            //     templateUrl: 'tpl/wxOperation/viewPage.html'
                            // },
                            //
                            // 'CCSubscribeApply': {
                            //     templateUrl: 'tpl/wxOperation/menuOperation/CCSubscribeApply.html'
                            // },
                            //
                            // 'subscribeChange': {
                            //     templateUrl: 'tpl/wxOperation/menuOperation/subscribeChange.html'
                            // },
                            //
                            // 'subscribeCancel': {
                            //     templateUrl: 'tpl/wxOperation/menuOperation/subscribeCancel.html'
                            // }
                        },
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        files: [
                                            'tpl/wxOperation/menuOperation/menuOperation.js', 'tpl/wxOperation/search.js'
                                        ]
                                    });
                                }]
                        }
                    })

                    // .state('transfer', {
                    //     abstract: true,
                    //     url: '/transfer',
                    //     templateUrl: 'tpl/wxOperation/transfer/transfer.html'
                    // })
                    // .state('transfer.operation', {
                    //     url: '/operation',
                    //     views: {
                    //         'searchPage': {
                    //             templateUrl: 'tpl/wxOperation/search.html'
                    //         },
                    //         'menuPage': {
                    //             templateUrl: 'tpl/wxOperation/transfer/menuOperation.html'
                    //         },
                    //         'viewPage': {
                    //             templateUrl: 'tpl/wxOperation/viewPage.html'
                    //         },
                    //         'estimateApply': {
                    //             templateUrl: 'tpl/wxOperation/transfer/estimateApply.html'
                    //         },
                    //         'estimateConfirmApply': {
                    //             templateUrl: 'tpl/wxOperation/transfer/estimateConfirmApply.html'
                    //         },
                    //         'transferCancelApply': {
                    //             templateUrl: 'tpl/wxOperation/transfer/transferCancelApply.html'
                    //         },
                    //         'transferApply': {
                    //             templateUrl: 'tpl/wxOperation/transfer/transferApply.html'
                    //         },
                    //         'transferPayResult': {
                    //             templateUrl: 'tpl/wxOperation/refund/notifyPayResult.html'
                    //         }
                    //     },
                    //     resolve: {
                    //         deps: ['$ocLazyLoad',
                    //             function ($ocLazyLoad) {
                    //                 return $ocLazyLoad.load({
                    //                     files: [
                    //                         'tpl/wxOperation/transfer/transfer.js', 'tpl/wxOperation/search.js'
                    //                     ]
                    //                 });
                    //             }]
                    //     }
                    // })
                    //
                    // .state('refund', {
                    //     abstract: true,
                    //     url: '/refund',
                    //     templateUrl: 'tpl/wxOperation/refund/refund.html'
                    // })
                    // .state('refund.operation', {
                    //     url: '/operation',
                    //     views: {
                    //         'searchPage': {
                    //             templateUrl: 'tpl/wxOperation/search.html'
                    //         },
                    //         'viewPage': {
                    //             templateUrl: 'tpl/wxOperation/viewPage.html'
                    //         },
                    //         'menuPage': {
                    //             templateUrl: 'tpl/wxOperation/refund/menuOperation.html'
                    //         },
                    //         'refundApply': {
                    //             templateUrl: 'tpl/wxOperation/refund/refundApply.html'
                    //         },
                    //
                    //         'flowRefundApply': {
                    //             templateUrl: 'tpl/wxOperation/refund/flowRefundApply.html'
                    //         },
                    //
                    //         'notifyPayResult': {
                    //             templateUrl: 'tpl/wxOperation/refund/notifyPayResult.html'
                    //         }
                    //     },
                    //     resolve: {
                    //         deps: ['$ocLazyLoad',
                    //             function ($ocLazyLoad) {
                    //                 return $ocLazyLoad.load({
                    //                     files: [
                    //                         'tpl/wxOperation/refund/refund.js', 'tpl/wxOperation/search.js'
                    //                     ]
                    //                 });
                    //             }]
                    //     }
                    // })
                    //
                    //
                    // .state('redeem', {
                    //     abstract: true,
                    //     url: '/redeem',
                    //     templateUrl: 'tpl/wxOperation/redeem/redeem.html'
                    // })
                    // .state('redeem.operation', {
                    //     url: '/operation',
                    //     views: {
                    //         'searchPage': {
                    //             templateUrl: 'tpl/wxOperation/search.html'
                    //         },
                    //         'viewPage': {
                    //             templateUrl: 'tpl/wxOperation/viewPage.html'
                    //         },
                    //         'menuPage': {
                    //             templateUrl: 'tpl/wxOperation/redeem/menuOperation.html'
                    //         },
                    //         'redeemApply': {
                    //             templateUrl: 'tpl/wxOperation/redeem/redeemApply.html'
                    //         },
                    //
                    //         'redeemCancelApply': {
                    //             templateUrl: 'tpl/wxOperation/redeem/redeemCancelApply.html'
                    //         },
                    //
                    //         'notifyRedeemPayResult': {
                    //             templateUrl: 'tpl/wxOperation/redeem/notifyRedeemPayResult.html'
                    //         }
                    //     },
                    //     resolve: {
                    //         deps: ['$ocLazyLoad',
                    //             function ($ocLazyLoad) {
                    //                 return $ocLazyLoad.load({
                    //                     files: [
                    //                         'tpl/wxOperation/redeem/redeem.js', 'tpl/wxOperation/search.js'
                    //                     ]
                    //                 });
                    //             }]
                    //     }
                    // })
                    //
                    //
                    // .state('other', {
                    //     abstract: true,
                    //     url: '/other',
                    //     templateUrl: 'tpl/wxOperation/other/other.html'
                    // })
                    // .state('other.operation', {
                    //     url: '/operation',
                    //     views: {
                    //         'searchPage': {
                    //             templateUrl: 'tpl/wxOperation/search.html'
                    //         },
                    //         'viewPage': {
                    //             templateUrl: 'tpl/wxOperation/viewPage.html'
                    //         },
                    //         'menuPage': {
                    //             templateUrl: 'tpl/wxOperation/other/menuOperation.html'
                    //         },
                    //         'antoMath': {
                    //             templateUrl: 'tpl/wxOperation/other/antoMath.html'
                    //         },
                    //
                    //         'enjoyBath': {
                    //             templateUrl: 'tpl/wxOperation/other/enjoyBath.html'
                    //         },
                    //
                    //         'noNeedMatch': {
                    //             templateUrl: 'tpl/wxOperation/other/noNeedMatch.html'
                    //         },
                    //         'sendSIA': {
                    //             templateUrl: 'tpl/wxOperation/other/sendSIA.html'
                    //         },
                    //         'taUnlock': {
                    //             templateUrl: 'tpl/wxOperation/other/taUnlock.html'
                    //         }
                    //     },
                    //     resolve: {
                    //         deps: ['$ocLazyLoad',
                    //             function ($ocLazyLoad) {
                    //                 return $ocLazyLoad.load({
                    //                     files: [
                    //                         'tpl/wxOperation/other/other.js', 'tpl/wxOperation/search.js'
                    //                     ]
                    //                 });
                    //             }]
                    //     }
                    // })


            }
        ]
    );