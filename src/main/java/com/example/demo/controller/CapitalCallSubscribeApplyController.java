package com.example.demo.controller;

import cn.creditease.bean.trade.CapitalCallSubscribeApply;
import cn.creditease.common.support.CheckTaInfo;
import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.CapitalCallSubscribeApplyVo;
import cn.creditease.send.trade.SendCapitalCallSubscribeApply;
import cn.creditease.util.DataPrepare;
import cn.creditease.util.GetLocalhostIP;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@EnableAutoConfiguration
@RestController
public class CapitalCallSubscribeApplyController {

	private static Logger logger = LoggerFactory.getLogger(CapitalCallSubscribeApplyController.class);

	DataPrepare dataUtil = new DataPrepare();

	SendCapitalCallSubscribeApply ccsendSubscribeApply = new SendCapitalCallSubscribeApply();

	CapitalCallSubscribeApply ccsa = new CapitalCallSubscribeApply();

	CheckTaInfo check = new CheckTaInfo();

	Long pfund_id = null;

	@RequestMapping(value = "/ccSubscribeApply", method = RequestMethod.POST)
	public @ResponseBody
    Map<String, Object> CCSubscribeApply(CapitalCallSubscribeApplyVo ccsubscribeApply)
			throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !ccsubscribeApply.getCcenvtype().equals(Constants.SYSTEM_PRE)) {
			
			data.put("status", "fail");
			data.put("info",Constants.isPre);
			
		} else if (ipdata.equals(Constants.SYS_STATEN) && ccsubscribeApply.getCcenvtype().equals(Constants.SYSTEM_PRE)) {
			
			data.put("status", "fail");
			data.put("info",Constants.isTest);
			
		} else if ((ipdata.equals(Constants.SYS_STATEY) && ccsubscribeApply.getCcenvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !ccsubscribeApply.getCcenvtype().equals(Constants.SYSTEM_PRE))) {

			logger.info("CC认购请求信息： " + " 基金etChannel:" + ccsubscribeApply.getChannel() + " 主认购id判:"
					+ ccsa.getRootInvestApplyNo() + " 基金id:" + ccsubscribeApply.getCcpfundId() + ",期限id:"
					+ ccsubscribeApply.getCcftermId() + ",合同金额:" + ccsubscribeApply.getCccontractAmt() + ",到帐日:"
					+ ccsubscribeApply.getCctranstime() + ",认购笔数:" + ccsubscribeApply.getCcsubscribeApplynum()
					+ ",是否一致:" + ccsubscribeApply.getCcispayAmount()+"call款比例："+ccsubscribeApply.getCallContractRate() + ", 流水笔数:" + ccsubscribeApply.getCcflow_num()
					+ ", 流水金额：" + ccsubscribeApply.getCcflow_amount() + ", 环境：" + ccsubscribeApply.getCcenvtype()
					+ ", 支付方式：" + ccsubscribeApply.getCcpaytype() + ",冷静期截止日:"
					+ ccsubscribeApply.getCccoolingPeriodEnd() + ",协议签署时间:" + ccsubscribeApply.getCccontractSignDate()
					+ ",chanelType:" + ccsubscribeApply.getChannelType() + "，customerMainType:"
					+ ccsubscribeApply.getCcCustomerMainType()+"，客户锁定期"+ccsubscribeApply.getCclockPeriod()
					+"锁定期类型："+ccsubscribeApply.getCclockPeriodUnit()+",赎回周期："+ccsubscribeApply.getCcredeemCycleType()
					+",赎回间隔："+ccsubscribeApply.getCcredeemCycle()
			);

			//cc认购，取页面参数----20180516--shen
			ccsubscribeApply.setCclockPeriod(ccsubscribeApply.getCclockPeriod());
			ccsubscribeApply.setCclockPeriodUnit(ccsubscribeApply.getCclockPeriodUnit());
			ccsubscribeApply.setCcredeemCycle(ccsubscribeApply.getCcredeemCycle());
			ccsubscribeApply.setCcredeemCycleType(ccsubscribeApply.getCcredeemCycleType());

			// 存放开户信息的map
			Map<String, String> tadata = new HashMap<String, String>();

			// 通过主认购id判断是否首call
			if (ccsa.getRootInvestApplyNo() == null) {
				pfund_id = ccsubscribeApply.getCcpfundId();

				// 获取校验ta开户的信息
				tadata = check.CheckAcc_Info(pfund_id, ccsubscribeApply.getCcenvtype());

				// 根据开户信息判断是否进行认购
				if (tadata.get("status").equals("success")) {
					logger.info("该基金的基金分户实体卡户都存在，发送认购数据");

					// 发送认购数据
					data = ccsendSubscribeApply.runccSendSubscribeApply(ccsubscribeApply, pfund_id);

				} else {
					data.put("status", tadata.get("status"));
					data.put("info", tadata.get("info"));

				}

			} else {
				// 通过主认购查询pfundid
				pfund_id = Long.valueOf(dataUtil.getCcSubscribeApplyInfo(ccsubscribeApply.getRootInvestApplyNo(),
						ccsubscribeApply.getCcenvtype()).get("pfund_id"));
				// 发送认购数据
				data = ccsendSubscribeApply.runccSendSubscribeApply(ccsubscribeApply, pfund_id);
			}
		}

		return data;

	}

}
