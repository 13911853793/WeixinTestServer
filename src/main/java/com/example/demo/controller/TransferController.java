package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.TransferVo;
import cn.creditease.send.trade.SendTransferApply;
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
public class TransferController {

	private static Logger logger = LoggerFactory.getLogger(TransferController.class);

	DataPrepare dataUtil = new DataPrepare();
	
	SendTransferApply sendTransferApply = new SendTransferApply();

	@RequestMapping(value = "/sendtransferApply", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> TransferApply(@RequestBody TransferVo transfer) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !transfer.getTransferEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && transfer.getTransferEnvtype().equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY) && transfer.getTransferEnvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !transfer.getTransferEnvtype().equals(Constants.SYSTEM_PRE))) {

			logger.info("转让过户申请信息： " + "业务类型：" + transfer.getTransferApplyType() + " ,认购id:"
					+ transfer.getTransfer_subscribeId() + ",到账时间:" + transfer.getPayArrivalTimeTransferee()
					+ ",估值申请id:" + transfer.getTransfer_estimateApplyId());

			// 发送转让过户数据
			data = sendTransferApply.runSendTransferApply(transfer);

		}
		return data;

	}

}
