package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.EstimateApplyVo;
import cn.creditease.send.trade.SendEstimateApply;
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
public class EstimateApplyController {

	private static Logger logger = LoggerFactory.getLogger(EstimateApplyController.class);

	DataPrepare dataUtil = new DataPrepare();
	
	private SendEstimateApply sendEstimateApply = new SendEstimateApply();

	@RequestMapping(value="/sendEstimateApply", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> estimateApply(@RequestBody EstimateApplyVo estimateApply) throws Exception {
		
		Map<String, Object> myData = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !estimateApply.getEstimateEnvtype().equals(Constants.SYSTEM_PRE)) {

			myData.put("status","fail");
			myData.put("info",Constants.isPre);
			
		}
		else if (ipdata.equals(Constants.SYS_STATEN) && estimateApply.getEstimateEnvtype().equals(Constants.SYSTEM_PRE)) {

			myData.put("status","fail");
			myData.put("info",Constants.isTest);
			
		}
		else if ((ipdata.equals(Constants.SYS_STATEY) && estimateApply.getEstimateEnvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !estimateApply.getEstimateEnvtype().equals(Constants.SYSTEM_PRE))) {	
				
			
			logger.info("估值申请信息： "+" 认购id:"+estimateApply.getSubscribleId()+",转让类型:"+estimateApply.getTransferType()+",期望转让日期:"+estimateApply.getExpectTransferDate()+",转让本金/份额:"+estimateApply.getTransferShare()+",认购费:"+estimateApply.getGiveUpProfit()+",环境："+estimateApply.getEstimateEnvtype());
			
			//发送认购数据
			myData = sendEstimateApply.runSendEstimateApply(estimateApply);
			
		}
	    return myData;

	}

}
