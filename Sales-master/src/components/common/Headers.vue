<template>
 <div class="navbar navbar-inverse navbar-fixed-top">
           <div class="navbar-inner">
               <div class="container">
                   <a class="brand" href="/home"> &nbsp;REPORT&nbsp; </a>
                   <div class="nav-collapse collapse">
                       <ul class="nav">
                           <!--<li class="dropdown">
                               <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                   报表引擎<b class="caret"></b>
                               </a>
                               <ul class="dropdown-menu">
                               <li>
                                   <a th:href="@{/report/reportConfigQuery.htm}">数据配置</a>
                               </li>
                               <li>
                                   <a th:href="@{/schedule/index.htm}">定时任务</a>
                               </li>
                               </ul>
                           </li>-->
                           <li class="dropdown">
                               <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                   数据拉取<b class="caret"></b>
                               </a>
                               <ul class="dropdown-menu">
                                   <li>
                                       <a href="/order/order_base_data">自组字段报表</a>
                                   </li>
                                   <li>
                                        <a href="/order/universal_report_template">通用报表模板</a>
                                   </li>
                               </ul>
                           </li>
                           <li class="dropdown">
                               <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                   销售报表<b class="caret"></b>
                               </a>
                               <ul class="dropdown-menu">
                                   <li>
                                       <a href="/dist#/sale-report/trend-analysis">销售报表趋势图分析</a>
                                   </li>
                                    <li>
                                        <a href="/sales/profit_table">利润报表</a>
                                    </li>
                                   <li>
                                       <a href="/sales/sale_target">销售目标配置</a>
                                   </li>
                                   <li>
                                       <a href="/api/customize/report">定制销售报表</a>
<!--                                        <a th:if="${session.reportFunction.get('reportcustomizesalesview')}" href="/UED/sales/customization.html">定制销售报表</a> -->
                                   </li>
                                </ul>
                           </li>
                           <li class="dropdown">
                               <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                   财务报表<b class="caret"></b>
                               </a>
                               <ul class="dropdown-menu">
                               <li>
                                   <a href="/finance/receivable_table">财务应收</a>
                               </li>
                               <li>
                                   <a href="/finance/payable_table">财务应付</a>
                               </li>
                               <li>
                                   <a href="/finance/profit_table">财务利润</a>
                               </li>
                               <!--<li>
                                   <a th:if="${session.reportFunction.get('reportfinancereceivedifferenceview')}" th:href="@{/finance/fileLog}">财务应收订单差异</a>
                               </li>-->
                               <li>
                                   <a href="/compensation/salesChangeRecords">销售额变动报表</a>
                               </li>
                               <li>
                                   <a href="/compensation/costChangeRecords">成本变动报表</a>
                               </li>
                               <li>
                                   <a href="/finance/financeMetaData">财务用订单数据拉取</a>
                               </li>
                               <li>
                                   <a href="/finance/orderMatch_table">飞猪渠道订单匹配报表</a>
                                   <!-- <a th:href="@{/finance/orderMatch_table}">飞猪渠道订单匹配报表</a> -->
                               </li>
                            </ul>
                           </li>
                           <li class="dropdown">
                               <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                   产品报表<b class="caret"></b>
                               </a>
                               <ul class="dropdown-menu">
                                   <li>
                                       <a href="/product/productinfo">产品总表</a>
                                   </li>
<!--                                   <li>
                                       <a th:href="@{/product/productSales}">产品销量表</a>
                                   </li>-->
                               </ul>
                           </li>
                           <li class="dropdown">
                               <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                   反馈报表<b class="caret"></b>
                               </a>
                               <ul class="dropdown-menu">
                                   <li>
                                       <a href="/feedback/userFeedback">用户反馈</a>
                                   </li>
                               </ul>
                           </li>
                           <li class="dropdown">
                               <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                   资源报表<b class="caret"></b>
                               </a>
                               <ul class="dropdown-menu">
                                   <li>
                                       <a href="/hotel/hotel">酒店报表</a>
                                   </li>
                                   <li>
                                       <a href="/flight/flightReport">机票报表</a>
                                   </li>
                                   <li>
                                       <a href="/order/NonPurchasedResource">未订购资源报表</a>
                                   </li>
                                   <li>
                                       <a href="/hotel/hotelPurchase">酒店采购单维度报表</a>
                                   </li>
                                   <li>
                                       <a href="/resource/resourceDemandMetaData">资源需求单报表</a>
                                   </li>
                                   <li>
                                       <a href="/resourceInfo/resourceInfoMetaData">资源库信息表(自组字段)</a>
                                   </li>
                                   <li>
                                       <a href="/resource/operataionForGroupAndCustomize">操作报表</a>
                                   </li>
                               </ul>
                           </li>
                           <li class="dropdown">
                               <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                   散拼团报表<b class="caret"></b>
                               </a>
                               <ul class="dropdown-menu">
                                   <li>
                                       <a href="/product/sanpintuan">散拼团基础信息报表</a>
                                   </li>
                                   <li>
                                       <a href="/group/groupResourceDemand">散拼团需求单报表</a>
                                       <!--<a th:href="@{/group/groupResourceDemand}">散拼团需求单报表</a>-->
                                   </li>
                                   <li>
                                       <a href="/group/groupOrderOperation">散拼团采购单报表</a>
                                       <!--<a th:href="@{/group/groupOrderOperation}">散拼团采购单报表</a>-->
                                   </li>
                                   <li>
                                       <a href="/group/groupResourceUsage">散拼团资源使用情况报表</a>
                                       <!--<a th:href="@{/group/groupOrderOperation}">散拼团采购单报表</a>-->
                                   </li>
                               </ul>
                           </li>
                           <li class="dropdown">
                               <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                   跟团游报表<b class="caret"></b>
                               </a>
                               <ul class="dropdown-menu">
                                   <li>
                                       <!-- <a th:if="${session.reportFunction.get('reportgroupproductresidualpositionview')}" th:href="@{/group/groupProductResidualPosition}">跟团游产品占位表</a> -->
                                       <a href="/group/groupProductResidualPosition">跟团游产品占位表</a>
                                   </li>
                                   <li>
                                       <a href="/group/groupPackageTourQuotation">跟团游报价单表</a>
                                   </li>
                               </ul>
                           </li>
                       </ul>
                       <div id = 'notice-box'></div>
                       <div class="btn-group pull-right" style="margin-right: -165px">
                           <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                               <i class="icon-user"></i><span class="hidden-phone">徐玉麟</span>
                               <span class="caret"></span>
                           </a>
                           <ul class="dropdown-menu">
                               <li><a href="/tosignout">登出</a></li>
                           </ul>
                       </div>
                   </div>
               </div>
           </div>
       </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang='postcss' scoped>
.navbar-fixed-top, .navbar-fixed-bottom {

    z-index: 1030;
    margin-bottom: 0;
}
.navbar-inverse .navbar-inner {
    background-color: #1b1b1b;
    background-image: linear-gradient(to bottom, #222222, #111111);
    background-repeat: repeat-x;
    border-color: #252525;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff222222', endColorstr='#ff111111', GradientType=0);
}
.navbar-fixed-top .navbar-inner, .navbar-static-top .navbar-inner {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
}
.navbar-fixed-top .navbar-inner, .navbar-fixed-bottom .navbar-inner {
    padding-right: 0;
    padding-left: 0;
    border-radius: 0;
}
.navbar-inner {
    min-height: 40px;
    padding-right: 20px;
    padding-left: 20px;
    background-color: #fafafa;
    background-image: linear-gradient(to bottom, #ffffff, #f2f2f2);
    background-repeat: repeat-x;
    border: 1px solid #d4d4d4;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#fff2f2f2', GradientType=0);
    *zoom: 1;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
}
.navbar .nav {
   position: relative;
    left: 0;
    display: block;
    float: left;
    margin: 0 10px 0 0;
}

.navbar .nav > li {
    float: left;
}
</style>
