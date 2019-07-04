package com.example.demo.controller;

import cn.creditease.common.support.CheckTaInfo;
import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.SubmitSubscribeVo;
import cn.creditease.send.trade.SendSubscribeApply;
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

/**
 * @author chendi
 */
@EnableAutoConfiguration
@RestController
public class SubscribeApplyController {

	private static Logger logger = LoggerFactory.getLogger(SubscribeApplyController.class);

	DataPrepare dataUtil = new DataPrepare();
	
	CheckTaInfo check = new CheckTaInfo();

	SendSubscribeApply sendSubscribeApply = new SendSubscribeApply();

	@RequestMapping(value = "/subscribeApply", method = RequestMethod.POST)
	public @ResponseBody
    Map<String, Object> SubscribeApply(SubmitSubscribeVo subscribeApply) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !subscribeApply.getEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && subscribeApply.getEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY) && subscribeApply.getEnvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !subscribeApply.getEnvtype().equals(Constants.SYSTEM_PRE))) {

			logger.info("认购请求信息： " + " 基金id:" + subscribeApply.getPfundId() + ",期限id:" + subscribeApply.getFtermId()
					+ ",合同金额:" + subscribeApply.getContractAmt() + ",到帐日:" + subscribeApply.getTranstime() + ",认购笔数:"
					+ subscribeApply.getSubscribeApplynum() + ",是否一致:" + subscribeApply.getIspayAmount() + ", 流水笔数:"
					+ subscribeApply.getFlow_num() + ", 流水金额：" + subscribeApply.getFlow_amount() + ", 环境："
					+ subscribeApply.getEnvtype() + ", 支付方式：" + subscribeApply.getPaytype() + ",冷静期截止日:"
					+ subscribeApply.getCoolingPeriodEnd() + ",协议签署时间:" + subscribeApply.getContractSignDate()
                    + ",客户锁定期："+subscribeApply.getLockPeriod()+",锁定期单位："+subscribeApply.getLockPeriodUnit()
                    +",赎回周期："+subscribeApply.getRedeemCycleType()+ ",赎回间隔："+subscribeApply.getRedeemCycle());

			// 获取校验ta开户的信息
			Map<String, String> tadata = check.CheckAcc_Info(subscribeApply.getPfundId(), subscribeApply.getEnvtype());

			// 根据开户信息判断是否进行认购
			if (tadata.get("status").equals("success")) {
				logger.info("该基金的基金分户实体卡户都存在，发送认购数据");

				// 发送认购数据
				data = sendSubscribeApply.runSendSubscribeApply(subscribeApply);

			} else {
				data.put("status", tadata.get("status"));
				data.put("info", tadata.get("info"));

			}

		}
		return data;

	}

}
