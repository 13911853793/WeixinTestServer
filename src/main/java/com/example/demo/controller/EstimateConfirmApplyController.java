package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.EstimateConfirmApplyVo;
import cn.creditease.send.trade.SendEstimateConfirmApply;
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
public class EstimateConfirmApplyController {

	private static Logger logger = LoggerFactory.getLogger(EstimateConfirmApplyController.class);

	DataPrepare dataUtil = new DataPrepare();

	SendEstimateConfirmApply sendEstimateConfirmApply = new SendEstimateConfirmApply();

	@RequestMapping(value = "/sendEstimateConfirmApply", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> EstimateConfirmApply(@RequestBody EstimateConfirmApplyVo estimateConfirm) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();
		
		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !estimateConfirm.getEstimateConfirmEnvtype().equals(Constants.SYSTEM_PRE)) {
			
			data.put("status","fail");
			data.put("info",Constants.isPre);
			
		}
		else if (ipdata.equals(Constants.SYS_STATEN) && estimateConfirm.getEstimateConfirmEnvtype().equals(Constants.SYSTEM_PRE)) {
			
			data.put("status","fail");
			data.put("info",Constants.isTest);
			
		}
		else if ((ipdata.equals(Constants.SYS_STATEY) && estimateConfirm.getEstimateConfirmEnvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !estimateConfirm.getEstimateConfirmEnvtype().equals(Constants.SYSTEM_PRE))) {	
			
			
			logger.info("估值申请信息： " + " 估值确认申请Id:" + estimateConfirm.getEstimateApplyId() + ",确认结果:"
					+ estimateConfirm.getConfirmResult() + ",估值日期:" + estimateConfirm.getEstimateDate() + ",确认价格:"
					+ estimateConfirm.getConfirmPrice() + ",环境：" + estimateConfirm.getEstimateConfirmEnvtype());
	
			// 发送认购数据
			data = sendEstimateConfirmApply.runSendEstimateConfirmApply(estimateConfirm);

		}
		return data;

	}

}
