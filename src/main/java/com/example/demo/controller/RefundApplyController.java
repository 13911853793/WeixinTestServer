package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.RefundApplyVo;
import cn.creditease.send.trade.SendRefundApply;
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
public class RefundApplyController {

	private static Logger logger = LoggerFactory.getLogger(RefundApplyController.class);

	DataPrepare dataUtil = new DataPrepare();
	
	SendRefundApply sendRefundApply = new SendRefundApply();

	@RequestMapping(value = "/refundApply", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> RefundApply(@RequestBody RefundApplyVo refundApply) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !refundApply.getEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && refundApply.getEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY) && refundApply.getEnvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !refundApply.getEnvtype().equals(Constants.SYSTEM_PRE))) {

			logger.info("退款请求信息： " + " 认购id:" + refundApply.getRefundapplyno() + ",退款方式:" + refundApply.getRefundWay()
					+ ",退款类型:" + refundApply.getRefundType() + ",退款原因:" + refundApply.getRefundReason() + ",认购费:"
					+ refundApply.getRefundSubfeeAmt() + ",合同金额:" + refundApply.getRefundContractAmt() + ", 余额退款:"
					+ refundApply.getRefundAmt() + ",环境" + refundApply.getEnvtype());

			// 发送认购数据
			data = sendRefundApply.runSendRefundApply(refundApply);

		}
		return data;

	}

}
