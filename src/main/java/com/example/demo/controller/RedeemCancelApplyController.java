package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.send.trade.SendRedeemCancelApply;
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
public class RedeemCancelApplyController {

	private static Logger logger = LoggerFactory.getLogger(RedeemCancelApplyController.class);

	DataPrepare dataUtil = new DataPrepare();

	SendRedeemCancelApply sendRedeemCancelApply = new SendRedeemCancelApply();

	@RequestMapping(value = "/redeemCancelApply", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> RedeemCancelApply(@RequestParam(value = "redeemApplyId") String redeemApplyId,
                                                 @RequestParam(value = "redeemCancelenvtype") String redeemCancelenvtype) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !redeemCancelenvtype.equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && redeemCancelenvtype.equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY) && redeemCancelenvtype.equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !redeemCancelenvtype.equals(Constants.SYSTEM_PRE))) {

			logger.info("赎回撤销请求信息： " + " 赎回撤销申请id:" + redeemApplyId + ",环境：" + redeemCancelenvtype);

			// 发送赎回撤销数据
			data = sendRedeemCancelApply.runSendRedeemCancelApply(redeemApplyId, redeemCancelenvtype);

		}

		return data;

	}

}
