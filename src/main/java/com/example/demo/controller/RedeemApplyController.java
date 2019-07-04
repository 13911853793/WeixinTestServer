package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.RedeemApplyVo;
import cn.creditease.send.trade.SendRedeemApply;
import cn.creditease.util.DataPrepare;
import cn.creditease.util.GetLocalhostIP;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @author chendi
 */
@EnableAutoConfiguration
@RestController
public class RedeemApplyController {

	private static Logger logger = LoggerFactory.getLogger(RedeemApplyController.class);

	DataPrepare dataUtil = new DataPrepare();

	SendRedeemApply sendRedeemApply = new SendRedeemApply();

	@RequestMapping(value = "/redeemApply", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> RedeemApply(@RequestBody RedeemApplyVo redeemApply) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !redeemApply.getEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && redeemApply.getEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY) && redeemApply.getEnvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !redeemApply.getEnvtype().equals(Constants.SYSTEM_PRE))) {

			logger.info("赎回请求信息： " + " 认购id:" + redeemApply.getSubscribleId() + ",赎回类型:" + redeemApply.getRedeemType()
					+ ",赎回申请类型:" + redeemApply.getRedeemApplyType() + "，计划id" + redeemApply.getRedeemScheduleId()
					+ ",环境：" + redeemApply.getEnvtype() +"赎回方式："+ redeemApply.getRedeemWay()
					+"赎回总价值" +redeemApply.getRedeemTotalValue());

			// 发送赎回数据
			data = sendRedeemApply.runSendRedeemApply(redeemApply);

		}
		return data;

	}

}
