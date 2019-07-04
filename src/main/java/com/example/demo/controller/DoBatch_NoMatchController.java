package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.httpClient.HttpPostRequest;
import cn.creditease.util.DateUtil;
import cn.creditease.util.GetLocalhostIP;
import cn.creditease.util.GetProperty;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@EnableAutoConfiguration
@RestController
public class DoBatch_NoMatchController {

	private static Logger logger = LoggerFactory.getLogger(DoBatch_NoMatchController.class);
	static String message = "";
	static String status = "";

	@RequestMapping(value = "/doBatch_noMatch", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> NoMatch(@RequestParam(value = "envtype") String envtype){
		// public Map<String, Object> Lock_unlock() throws Exception {

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

			// 获取自动匹配的url
			String url = GetProperty.GetProper(envtype, "batch");

			// 发送 POST 请求
			String str = HttpPostRequest.sendPost(url, "arriveEndDateStr=" + DateUtil.getCurrentTime());

			JSONObject jasonObject = JSONObject.fromObject(str);

			Map map = (Map) jasonObject;

			if (map.get("success").toString().equals("true")) {
				data.put("status", "ok");
				data.put("info", "划扣跑批结束！");
			} else {
				data.put("status", "fail");
				data.put("info", "划扣跑批失败");
			}

		}
		return data;

	}

	/**
	 * 发送安享账户跑批
	 * 
	 * @param envtype
	 *            环境
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/enjoybath", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> EnjoyBath(@RequestParam(value = "envtype") String envtype) throws Exception {
		// public Map<String, Object> Lock_unlock() throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !envtype.equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info", "当前是pre环境，不能发送test环境数据");

		} else if (ipdata.equals(Constants.SYS_STATEN) && envtype.equals(Constants.SYSTEM_PRE)) {

			data.put("status", "fail");
			data.put("info", "当前是test环境，不能发送pre环境数据");

		} else if ((ipdata.equals(Constants.SYS_STATEY) && envtype.equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !envtype.equals(Constants.SYSTEM_PRE))) {
			
			// 获取自动匹配的url
			String url = GetProperty.GetProper(envtype, "enjoybath");

			// 发送 POST 请求
			String str = HttpPostRequest.sendPost(url, "");

			JSONObject jasonObject = JSONObject.fromObject(str);

			Map map = (Map) jasonObject;

			if (map.get("success").toString().equals("true")) {

				data.put("status", "fail");
				data.put("info", "跑批结束！");
				 
			} else {
				data.put("status", "fail");
				data.put("info", "跑批失败");
			}

		}

		return data;

	}
}
