package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author chendi
 */
@Controller
public class PageController {

    @RequestMapping(value = "/")
    public String index() {

        return "index";

    }

}