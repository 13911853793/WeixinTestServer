'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )

  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('/subscribe/operation');
          $stateProvider
              .state('subscribe', {
                  abstract: true,
                  url: '/subscribe',
                  templateUrl: 'tpl/simulation/subscribe/subscribe.html'
              })
              .state('subscribe.operation', {
                  url: '/operation',
                  views: {
                      'searchPage': {
                          templateUrl: 'tpl/simulation/search.html'
                      },
                      'viewPage': {
                          templateUrl: 'tpl/simulation/viewPage.html'
                      },

                      'menuPage': {
                          templateUrl: 'tpl/simulation/subscribe/menu.html'
                      },
                      'subscribeApply': {
                          templateUrl: 'tpl/simulation/subscribe/subscribeApply.html'
                      },

                      'arrivalFlow': {
                          templateUrl: 'tpl/simulation/subscribe/arrivalFlow.html'
                      },

                      'CCSubscribeApply': {
                          templateUrl: 'tpl/simulation/subscribe/CCSubscribeApply.html'
                      },

                      'subscribeChange': {
                          templateUrl: 'tpl/simulation/subscribe/subscribeChange.html'
                      },

                      'subscribeCancel': {
                          templateUrl: 'tpl/simulation/subscribe/subscribeCancel.html'
                      }
                  },
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load({files:[
                              'tpl/simulation/subscribe/subscribe.js','tpl/simulation/search.js'
                          ]});
                      }]
                  }
              })

              .state('transfer',{
                  abstract:true,
                  url:'/transfer',
                  templateUrl:'tpl/simulation/transfer/transfer.html'
              })
              .state('transfer.operation',{
                  url:'/operation',
                  views:{
                      'searchPage': {
                          templateUrl: 'tpl/simulation/search.html'
                      },
                      'menuPage': {
                          templateUrl: 'tpl/simulation/transfer/menu.html'
                      },
                      'viewPage': {
                          templateUrl: 'tpl/simulation/viewPage.html'
                      },
                      'estimateApply': {
                          templateUrl: 'tpl/simulation/transfer/estimateApply.html'
                      },
                      'estimateConfirmApply': {
                          templateUrl: 'tpl/simulation/transfer/estimateConfirmApply.html'
                      },
                      'transferCancelApply': {
                          templateUrl: 'tpl/simulation/transfer/transferCancelApply.html'
                      },
                      'transferApply': {
                          templateUrl: 'tpl/simulation/transfer/transferApply.html'
                      },
                      'transferPayResult': {
                          templateUrl: 'tpl/simulation/refund/notifyPayResult.html'
                      }
                  },
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function ($ocLazyLoad) {
                              return $ocLazyLoad.load({files:[
                                      'tpl/simulation/transfer/transfer.js', 'tpl/simulation/search.js'
                                  ]});
                          }]
                  }
              })

              .state('refund', {
                  abstract: true,
                  url: '/refund',
                  templateUrl: 'tpl/simulation/refund/refund.html'
              })
              .state('refund.operation', {
                  url: '/operation',
                  views: {
                      'searchPage': {
                          templateUrl: 'tpl/simulation/search.html'
                      },
                      'viewPage': {
                          templateUrl: 'tpl/simulation/viewPage.html'
                      },
                      'menuPage': {
                          templateUrl: 'tpl/simulation/refund/menu.html'
                      },
                      'refundApply': {
                          templateUrl: 'tpl/simulation/refund/refundApply.html'
                      },

                      'flowRefundApply': {
                          templateUrl: 'tpl/simulation/refund/flowRefundApply.html'
                      },

                      'notifyPayResult': {
                          templateUrl: 'tpl/simulation/refund/notifyPayResult.html'
                      }
                  },
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                              return $ocLazyLoad.load({files:[
                                      'tpl/simulation/refund/refund.js','tpl/simulation/search.js'
                                  ]});
                          }]
                  }
              })



              .state('redeem', {
                  abstract: true,
                  url: '/redeem',
                  templateUrl: 'tpl/simulation/redeem/redeem.html'
              })
              .state('redeem.operation', {
                  url: '/operation',
                  views: {
                      'searchPage': {
                          templateUrl: 'tpl/simulation/search.html'
                      },
                      'viewPage': {
                          templateUrl: 'tpl/simulation/viewPage.html'
                      },
                      'menuPage': {
                          templateUrl: 'tpl/simulation/redeem/menu.html'
                      },
                      'redeemApply': {
                          templateUrl: 'tpl/simulation/redeem/redeemApply.html'
                      },

                      'redeemCancelApply': {
                          templateUrl: 'tpl/simulation/redeem/redeemCancelApply.html'
                      },

                      'notifyRedeemPayResult': {
                          templateUrl: 'tpl/simulation/redeem/notifyRedeemPayResult.html'
                      }
                  },
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                              return $ocLazyLoad.load({files:[
                                      'tpl/simulation/redeem/redeem.js','tpl/simulation/search.js'
                                  ]});
                          }]
                  }
              })


              .state('other', {
                  abstract: true,
                  url: '/other',
                  templateUrl: 'tpl/simulation/other/other.html'
              })
              .state('other.operation', {
                  url: '/operation',
                  views: {
                      'searchPage': {
                          templateUrl: 'tpl/simulation/search.html'
                      },
                      'viewPage': {
                          templateUrl: 'tpl/simulation/viewPage.html'
                      },
                      'menuPage': {
                          templateUrl: 'tpl/simulation/other/menu.html'
                      },
                      'antoMath': {
                          templateUrl: 'tpl/simulation/other/antoMath.html'
                      },

                      'enjoyBath': {
                          templateUrl: 'tpl/simulation/other/enjoyBath.html'
                      },

                      'noNeedMatch': {
                          templateUrl: 'tpl/simulation/other/noNeedMatch.html'
                      },
                      'sendSIA': {
                          templateUrl: 'tpl/simulation/other/sendSIA.html'
                      },
                      'taUnlock': {
                          templateUrl: 'tpl/simulation/other/taUnlock.html'
                      }
                  },
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                              return $ocLazyLoad.load({files:[
                                      'tpl/simulation/other/other.js','tpl/simulation/search.js'
                                  ]});
                          }]
                  }
              })




      }
    ]
  );