//FINAL 
package com.example.demo.controller;

import cn.creditease.bean.post.RequestEs;
import cn.creditease.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@EnableAutoConfiguration
@RestController
public class EsController{
	private static Logger logger = LoggerFactory.getLogger(EsController.class);
	
	@RequestMapping(value="/audit")
	@ResponseBody
	public Map<String, Object> requestEs(@RequestBody RequestEs requestEs) {
	    
		Map<String, Object> mapresult = new HashMap<String, Object>();
		
		mapresult.put("retCode", "1002");
		
		mapresult.put("retMessage", "接受存储队列成功!");
		
		new Thread(new Task(requestEs)).start();
		
		logger.info("第一次返回-----"+mapresult.toString());
		
	    return mapresult;

	}

}
