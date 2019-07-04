package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.NotifyPayResultVo;
import cn.creditease.send.trade.SendNotifyPayResult;
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
public class NotifyPayResultController {

	private static Logger logger = LoggerFactory.getLogger(NotifyPayResultController.class);

	DataPrepare dataUtil = new DataPrepare();
	
	SendNotifyPayResult sendNotifyPayResult = new SendNotifyPayResult();

	@RequestMapping(value = "/notifyPayResult", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> NotifyPayResult(@RequestBody NotifyPayResultVo notifyPayResultVo) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !notifyPayResultVo.getPayEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN)
				&& notifyPayResultVo.getPayEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY)
				&& notifyPayResultVo.getPayEnvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN)
						&& !notifyPayResultVo.getPayEnvtype().equals(Constants.SYSTEM_PRE))) {


			 logger.info("支付通知信息： " + " 申请id:" +
			 notifyPayResultVo.getRequestId() + ",支付结果:"
			 + notifyPayResultVo.getPayStatus() + ",支付时间:" +
			 notifyPayResultVo.getPayTime() + ",支付金额:"
			 + notifyPayResultVo.getAmount() + ",失败原因:" +
			 notifyPayResultVo.getReason() + "，环境信息:"
			 + notifyPayResultVo.getPayEnvtype() + "，业务系统:" +
			 notifyPayResultVo.getProjectEnv());
			
			 // 发送认购数据
			 data = sendNotifyPayResult.runSendNotifyPayResult(notifyPayResultVo);

		}
		return data;

	}

}
