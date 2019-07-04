package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.SubscribeChangeVo;
import cn.creditease.send.trade.SendSubscribeChange;
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
public class SubscribeChangeController {

	private static Logger logger = LoggerFactory.getLogger(SubscribeChangeController.class);

	DataPrepare dataUtil = new DataPrepare();

	SendSubscribeChange SendSubscribeChange = new SendSubscribeChange();

	@RequestMapping(value = "/subscribeChange", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> SubscribeChangeSubmit(@RequestBody SubscribeChangeVo subscribeChange) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !subscribeChange.getEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && subscribeChange.getEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY) && subscribeChange.getEnvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !subscribeChange.getEnvtype().equals(Constants.SYSTEM_PRE))) {

			logger.info("认购变更信息： " +

					"认购编号：" + subscribeChange.getChange_applyno() + ",变更类型：" + subscribeChange.getChangeType()
					+ ",协议编号：" + subscribeChange.getContractNo() + ",银行卡号：" + subscribeChange.getBankAccount()
					+ ",账户名称：" + subscribeChange.getBankAccountName() + ",英文名称："
					+ subscribeChange.getBankAccountNameEn() + ",银行编号：" + subscribeChange.getBankCode() + ",境内境外："
					+ subscribeChange.getBankRegion()

			);

			// 发送认购数据
			data = SendSubscribeChange.runSendSubscribeChange(subscribeChange);

		}

		return data;

	}

}
