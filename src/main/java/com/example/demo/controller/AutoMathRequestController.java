package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.httpClient.HttpPostRequest;
import cn.creditease.util.DataPrepare;
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
public class AutoMathRequestController{

	DataPrepare dataUtil = new DataPrepare();

	private static Logger logger = LoggerFactory.getLogger(AutoMathRequestController.class);
	
	@RequestMapping(value = "/doAutoMatch", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> doAutoMatch(@RequestParam(value="applynos") String applynos, @RequestParam(value="envtype") String envtype){
		//可以通过required=false或者true来要求@RequestParam配置的前端参数是否一定要传
		//required=false表示不传的话，会给参数赋值为null，required=true就是必须要有
		
//		@RequestParam用来处理ContentType: 为 application/x-www-form-urlencoded编码的内容，ajax时，可以不设置ContentType
//		@RequestBody用来处理Content-Type: 不是application/x-www-form-urlencoded编码的内容，例如application/json, application/xml等；
		
		Map<String, Object> data = new HashMap<String, Object>();
		
		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !envtype.equals(Constants.SYSTEM_PRE)) {
			
			data.put("status","fail");
			data.put("info",Constants.isPre);
			
		}
		else if (ipdata.equals(Constants.SYS_STATEN) && envtype.equals(Constants.SYSTEM_PRE)) {
			
			data.put("status","fail");
			data.put("info",Constants.isTest);
			
		}
		else if ((ipdata.equals(Constants.SYS_STATEY) && envtype.equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !envtype.equals(Constants.SYSTEM_PRE))) {	
				
				
				logger.info("applynos: "+applynos+",envtype"+envtype);
				
		
				//获取自动匹配的url
				String url = GetProperty.GetProper(envtype, "matchurl");
				
				logger.info("#######################自动匹配url#######################");
				logger.info("url: "+url);
		
				// 发送 POST 请求
				String str = HttpPostRequest.sendPost(url, "0");
		
				JSONObject jasonObject = JSONObject.fromObject(str);
				
				Map map = (Map) jasonObject;
				
				//存放出资编号信息
				String message = null;
		
				if (map.get("success").toString().equals("true")) {
					
					//如果applynos为空，是单独调匹配，不需要校验入金消息，反之则校验
					if(applynos.equals("")){
						message = "";
					}
					//2017-09-20  入金消息入tz_ta_param_accumulation有延迟，所以去掉校验入金
		//			else{
		//				
		//				Map dataparam = check.CheckTaCAPITAL_IN(applynos,envtype);
		//				
		//				//ta参数表里是否存在入金申请
		//				if(dataparam.get("state").equals("true")){
		//					message = "认购编号： "+applynos;
		//				}
		//				else{
		//					message = ",TA没有收到入金消息，请检查开户信息,出资pkid："+dataparam.get("applylist");
		//				}
		//			}
					
					data.put("status", "ok");
					data.put("info", map.get("msg")+message);
		
				} else {
					
					data.put("status", "fail");
					data.put("info", map.get("msg")+",请自行检查出资的开户信息");
				}
			
			}
		
		return data;

	}
	
	

}
