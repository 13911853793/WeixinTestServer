package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.httpClient.HttpPostRequest;
import cn.creditease.util.GetLocalhostIP;
import cn.creditease.util.GetProperty;
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
public class TALock_UnlockController {

	private static Logger logger = LoggerFactory.getLogger(TALock_UnlockController.class);
	static String message = "";
	static String status  = "";
	
	@RequestMapping(value = "/dolock_unlock", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> Lock_unlock(@RequestParam(value="envtype") String envtype) throws Exception {
//	public Map<String, Object> Lock_unlock() throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();
		
		//获取自动匹配的url
		String url = GetProperty.GetProper(envtype, "ta");
		// 发送 POST 请求
		String str = HttpPostRequest.sendPost(url, "");


		if (str.equals("success")) {
			
			status = "ok";
			message = "TA解锁成功！";

		} else {
			status = "fail";
			message = "TA解锁失败";
		}
		
		data.put("status", status);
		data.put("info", message);

		return data;

	}

	
	@RequestMapping(value = "/testpage", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> testpage(@RequestParam(value="testEnvtype") String testEnvtype) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();

		String ipdata = GetLocalhostIP.AssertOSIP();
		
		//当前是pre环境，不能发送test数据
		if(ipdata.equals(Constants.SYS_STATEY) && !testEnvtype.equals(Constants.SYSTEM_PRE)){
			
			status = "fail";
			data.put("info",Constants.isPre);
			
		}
		//当前是test环境，不能发送pre数据
		else if(ipdata.equals(Constants.SYS_STATEN) && testEnvtype.equals(Constants.SYSTEM_PRE)){
			
			status = "fail";
			data.put("info",Constants.isTest);
//			message = "当前是"+OSType.values()[Integer.valueOf(ipdata)].name+"环境，不能发送"+OSType.values()[Integer.valueOf(testEnvtype)].name+"数据";
			
		} 
		//其他情况正常发送数据
		else if((ipdata.equals(Constants.SYS_STATEY) && testEnvtype.equals(Constants.SYSTEM_PRE)) || (ipdata.equals(Constants.SYS_STATEN) && !testEnvtype.equals(Constants.SYSTEM_PRE))){
		
			message = testEnvtype+" 第三个判断执行通过！！！";
		}
		
		data.put("status", status);
		data.put("info", message);
		System.out.println("执行结束 data ："+data);
		return data;

	}
}
