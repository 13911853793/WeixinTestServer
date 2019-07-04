package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.PenaltyApplyVo;
import cn.creditease.send.trade.SendPenaltyApply;
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
public class PenaltyApplyController {

	private static Logger logger = LoggerFactory.getLogger(PenaltyApplyController.class);

	DataPrepare dataUtil = new DataPrepare();

	SendPenaltyApply sendPenaltyApply = new SendPenaltyApply();

	@RequestMapping(value = "/penaltyApply", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> PenaltyApply(PenaltyApplyVo penaltyApply) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !penaltyApply.getPenaltyenvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && penaltyApply.getPenaltyenvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY) && penaltyApply.getPenaltyenvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !penaltyApply.getPenaltyenvtype().equals(Constants.SYSTEM_PRE))) {

			logger.info("违约关单请求信息： " + "认购id:" + penaltyApply.getPenaltySubscribeId() + "申请类型："
					+ penaltyApply.getApplyType() + "违约金锁定日期:" + penaltyApply.getApplyDate() + "减免类型："
					+ penaltyApply.getReductionType() + "减免jine" + penaltyApply.getReductionAmt() + ""
					+ penaltyApply.getMatchEndDate());

			// 发送违约缴款申请数据
			data = sendPenaltyApply.runSendPenaltyApply(penaltyApply);
		}
		return data;

	}

}
