package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author chendi
 */
@Controller
public class PageController {

    private static Logger logger = LoggerFactory.getLogger(PageController.class);


    @RequestMapping(value = "/test", method = RequestMethod.GET)

    @ResponseBody

    public String index() {

        logger.info("请求正确");

        return "请求正确";

    }

}