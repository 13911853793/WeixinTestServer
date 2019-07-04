package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.EnjoyAccountPaysConfirmVo;
import cn.creditease.send.trade.SendEnjoyAccountPaysConfirm;
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
public class EnjoyAccountPaysConfirmController {

	private static Logger logger = LoggerFactory.getLogger(EnjoyAccountPaysConfirmController.class);

	DataPrepare dataUtil = new DataPrepare();

	SendEnjoyAccountPaysConfirm sendEnjoyAccountPaysConfirm = new SendEnjoyAccountPaysConfirm();

	@RequestMapping(value = "/enjoyAccountPaysConfirm", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> EnjoyAccountPaysConfirm(EnjoyAccountPaysConfirmVo EnjoyAccountPaysConfirm)
			throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !EnjoyAccountPaysConfirm.getEnjoyAccountEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && EnjoyAccountPaysConfirm.getEnjoyAccountEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY) && EnjoyAccountPaysConfirm.getEnjoyAccountEnvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !EnjoyAccountPaysConfirm.getEnjoyAccountEnvtype().equals(Constants.SYSTEM_PRE))) {
			
			logger.info("安享账户到账通知请求信息： " + "认购id:" + EnjoyAccountPaysConfirm.getEnjoyAccountSubscribeId() + "到账日期："
					+ EnjoyAccountPaysConfirm.getEnjoyAccountArriveDate() + "环境信息："
					+ EnjoyAccountPaysConfirm.getEnjoyAccountEnvtype());

			// 发送流水退款数据
			data = sendEnjoyAccountPaysConfirm.runSendEnjoyAccountPaysConfirm(EnjoyAccountPaysConfirm);

		}
		return data;

	}

}
