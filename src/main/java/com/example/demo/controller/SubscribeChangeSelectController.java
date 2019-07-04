package com.example.demo.controller;

import cn.creditease.common.support.Constants;
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
public class SubscribeChangeSelectController {

	private static Logger logger = LoggerFactory.getLogger(SubscribeChangeSelectController.class);

	static DataPrepare dataUtil = new DataPrepare();

	@RequestMapping(value = "/subscribeChangeSelect", method = RequestMethod.POST)
	@ResponseBody
	// public Map<String, Object> SubscribeChangeSelect(@RequestBody
	// SubscribeChangeVo subscribeChange) throws Exception {
	//
	// // 返回给页面的map
	// Map<String, Object> resultdata = new HashMap<String, Object>();
	//
	// Map<String, Object> result = new HashMap<String, Object>();
	//
	// Map<String, Object> data =
	// dataUtil.getSubscribeChange(subscribeChange.getChange_applyno(),subscribeChange.getEnvtype());
	public Map<String, Object> SubscribeChangeSelect(@RequestParam String change_applyno,
                                                     @RequestParam String changeType, @RequestParam String envtype) throws Exception {

		// 返回给页面的map
		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !envtype.equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isPre);

		} else if (ipdata.equals(Constants.SYS_STATEN) && envtype.equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info",Constants.isTest);

		} else if ((ipdata.equals(Constants.SYS_STATEY) && envtype.equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !envtype.equals(Constants.SYSTEM_PRE))) {

			Map<String, Object> result = new HashMap<String, Object>();

			Map<String, String> sqlMap = dataUtil.getSubscribeChange(change_applyno, envtype);

			if (sqlMap.size() == 0) {

				data.put("status", "fail");
				data.put("info", "查询失败，请检查出资关联的客户银行账户信息");

			} else {

				result.put("contract_no", data.get("contract_no"));
				result.put("bank_account_name", data.get("bank_account_name"));
				result.put("bank_account_name_en", data.get("bank_account_name_en"));
				result.put("bank_account", data.get("bank_account"));
				result.put("bank_code", data.get("bank_code"));
				result.put("bank_detail", data.get("bank_detail"));
				result.put("bank_detail_code", data.get("bank_detail_code"));
				result.put("bank_province", data.get("bank_province"));
				result.put("bank_city", data.get("bank_city"));
				result.put("bank_swift_code", data.get("bank_swift_code"));
				result.put("bank_address", data.get("bank_address"));
				result.put("bank_region", data.get("bank_region"));
				result.put("bank_country", data.get("bank_country"));
				result.put("bank_state", data.get("bank_state"));

				data.put("status", "ok");
				data.put("info", result);

			}

		}
		return data;

	}

}
