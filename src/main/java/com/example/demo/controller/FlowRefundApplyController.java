package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.FlowRefundApplyVo;
import cn.creditease.send.trade.SendFlowRefundApply;
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
public class FlowRefundApplyController {

	private static Logger logger = LoggerFactory.getLogger(FlowRefundApplyController.class);

	DataPrepare dataUtil = new DataPrepare();

	SendFlowRefundApply sendflowRefundApply = new SendFlowRefundApply();

	@RequestMapping(value = "/flowRefundApply", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> FlowRefundApply(FlowRefundApplyVo flowRefundApply) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !flowRefundApply.getFrenvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && flowRefundApply.getFrenvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);
			
		} else if ((ipdata.equals(Constants.SYS_STATEY) && flowRefundApply.getFrenvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !flowRefundApply.getFrenvtype().equals(Constants.SYSTEM_PRE))) {

			logger.info("流水退款请求信息： " + "募集账号:" + flowRefundApply.getRaiseAccount() + "，打款账号："
					+ flowRefundApply.getFrbankAccount() + "，境内外：" + flowRefundApply.getBankRegion() + "，币种："
					+ flowRefundApply.getCurrency() + "，打款金额：" + flowRefundApply.getPayAmt() + "，客户类型："
					+ flowRefundApply.getFrcustomerMainType() + ",环境：" + flowRefundApply.getFrenvtype());

			// 发送流水退款数据
			data = sendflowRefundApply.runSendFlowRefundApply(flowRefundApply);

		}
		return data;

	}

}
