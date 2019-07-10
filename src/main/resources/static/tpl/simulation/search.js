'use strict';

/* Controllers */

app.controller('searchController', ['$scope', '$modal', '$http', function ($scope, $modal, $http) {

    $scope.select = {};

    $scope.search = function () {
        $http(
            {
                url: 'getOperateResult',
                method: 'post',
                data: $("#searchForm").serialize(),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(
            function (datas) {
                //数据源
                $scope.datas = datas.lists;
                //分页总数
                $scope.pageSize = 8;
                $scope.pages = Math.ceil($scope.datas.length / $scope.pageSize); //分页数
                $scope.newPages = $scope.pages > 8 ? 8 : $scope.pages;
                $scope.pageList = [];
                $scope.selPage = 1;
                //设置表格数据源(分页)
                $scope.setData = function () {
                    $scope.items = $scope.datas.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
                };
                $scope.items = $scope.datas.slice(0, $scope.pageSize);
                //分页要repeat的数组
                for (var i = 0; i < $scope.newPages; i++) {
                    $scope.pageList.push(i + 1);
                }
                //打印当前选中页索引
                $scope.selectPage = function (page) {
                    //不能小于1大于最大
                    if (page < 1 || page > $scope.pages) return;
                    //最多显示分页数5
                    if (page > 2) {
                        //因为只显示5个页数，大于2页开始分页转换
                        var newpageList = [];
                        for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                            newpageList.push(i + 1);
                        }
                        $scope.pageList = newpageList;
                    }
                    $scope.selPage = page;
                    $scope.setData();
                    $scope.isActivePage(page);
                    console.log("选择的页：" + page);
                };
                //设置当前选中页样式
                $scope.isActivePage = function (page) {
                    return $scope.selPage == page;
                };
                //上一页
                $scope.Previous = function () {
                    $scope.selectPage($scope.selPage - 1);
                };
                //下一页
                $scope.Next = function () {
                    $scope.selectPage($scope.selPage + 1);
                };
            });
    };



    $scope.viewpage = function (pkid, message, siacode, env, create_time, result) {
        $scope.viewpageitems = [pkid, message, siacode, env, create_time, result];
        $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'viewPage.html',
            controller: ViewPageCtrl,
            resolve: {
                viewpageitems: function () {
                    return $scope.viewpageitems;
                }
            }
        });
    };

    var ViewPageCtrl = function ($scope, $modalInstance, viewpageitems) {
        $scope.viewpageitems = viewpageitems;
        $scope.viewpagepkid = $scope.viewpageitems[0];
        $scope.viewpagemessage = $scope.viewpageitems[1];
        $scope.viewpagesiacode = $scope.viewpageitems[2];
        $scope.viewpageenv = $scope.viewpageitems[3];
        $scope.viewpagecreate_time = $scope.viewpageitems[4];
        $scope.viewpageresult = $scope.viewpageitems[5];

        $scope.viewpage_ok = function () {
            $modalInstance.close("close");
        };
    };

}]);
