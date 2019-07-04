package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.send.trade.SendSubscribeCancelApply;
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
public class SubscribeCancelApplyController {

	private static Logger logger = LoggerFactory.getLogger(SubscribeCancelApplyController.class);

	DataPrepare dataUtil = new DataPrepare();
	
	SendSubscribeCancelApply scribeCancelApply = new SendSubscribeCancelApply();

	@RequestMapping(value = "/subscribeCancelApply", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> SbuscribeCancelApply(@RequestParam String subscribeApplyId,
                                                    @RequestParam String Cancelenvtype, @RequestParam String isLeafCall, @RequestParam String rootSubscribeNo) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !Cancelenvtype.equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && Cancelenvtype.equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY) && Cancelenvtype.equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !Cancelenvtype.equals(Constants.SYSTEM_PRE))) {

			logger.info("认购取消申请申请id:" + subscribeApplyId + ",环境:" + Cancelenvtype
			+ "是否为cc认购取消："+isLeafCall+"主认购编号："+rootSubscribeNo);

			// 发送认购取消数据
			data = scribeCancelApply.runSendSubscribeCancelApply(subscribeApplyId, Cancelenvtype,isLeafCall,rootSubscribeNo);

		}

		return data;
	}

}
