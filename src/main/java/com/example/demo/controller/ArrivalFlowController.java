package com.example.demo.controller;

import cn.creditease.common.support.Constants;
import cn.creditease.controller.vo.ArrivalFlowVo;
import cn.creditease.send.trade.flow.GenerateArrivalFlow;
import cn.creditease.send.trade.flow.GenerateEnjoyAccountArrivalFlow;
import cn.creditease.util.DataPrepare;
import cn.creditease.util.GetLocalhostIP;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@EnableAutoConfiguration
@RestController
public class ArrivalFlowController {

	private static Logger logger = LoggerFactory.getLogger(ArrivalFlowController.class);

	GenerateArrivalFlow arrivalFlow = new GenerateArrivalFlow();

	GenerateEnjoyAccountArrivalFlow enjoyAccountArrivalFlow = new GenerateEnjoyAccountArrivalFlow();

	@Autowired
	static DataPrepare dataUtil = new DataPrepare();

	@RequestMapping(value = "/arrivalFlow", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> ArrivalFlow(ArrivalFlowVo arrivalflowvo) throws Exception {

		Map<String, Object> data = new HashMap<String, Object>();
		
		String ipdata = GetLocalhostIP.AssertOSIP();

		if (ipdata.equals(Constants.SYS_STATEY) && !arrivalflowvo.getFlowenvtype().equals(Constants.SYSTEM_PRE)) {
			
			data.put("status","fail");
			data.put("info",Constants.isPre);
			
		}
		else if (ipdata.equals(Constants.SYS_STATEN) && arrivalflowvo.getFlowenvtype().equals(Constants.SYSTEM_PRE)) {
			
			data.put("status","fail");
			data.put("info",Constants.isTest);
			
		}
		else if ((ipdata.equals(Constants.SYS_STATEY) && arrivalflowvo.getFlowenvtype().equals(Constants.SYSTEM_PRE))
				|| (ipdata.equals(Constants.SYS_STATEN) && !arrivalflowvo.getFlowenvtype().equals(Constants.SYSTEM_PRE))) {

			
			logger.info("流水信息 ：flowinvestapplyno:" + arrivalflowvo.getFlowinvestapplyno() + ", 流水金额:"
					+ arrivalflowvo.getFlowamount() + ", 流水笔数:" + arrivalflowvo.getFlownum() + " ,流水类型:"
					+ arrivalflowvo.getFlowtype() + " , 到帐日:" + arrivalflowvo.getFlowtranstime() + " , 流水是否一致:"
					+ arrivalflowvo.getFlowAmountType() + ",环境：" + arrivalflowvo.getFlowenvtype()
					+"标的付款账户ID:"+arrivalflowvo.getPayTargetsBankAccountId()+"接收标的回款账号id:"
					+arrivalflowvo.getReturnAccountId()+"标的回款金额："+arrivalflowvo.getFlowReturnAmount());

			

			String[] applyno = arrivalflowvo.getFlowinvestapplyno().split(",");

			BigDecimal flowAmount = new BigDecimal(0);


			// 循环多次发送流水
			for (int i = 0; i < applyno.length; i++) {

				logger.info("第" + (i + 1) + "次发送流水申请 ,申请编号：" + applyno[i]);

				/**
				 * 判断流水金额是否和打款金额一致，1是2否，否则使用打款金额+录入金额 param flowtype 0认购,1退款,2贴息
				 * flowAmountType 1是2否 return flowAmount
				 */

				if (arrivalflowvo.getFlowtype().equals(Constants.sub_Flow)) {
					if (("1").equals(arrivalflowvo.getFlowAmountType())) {
						flowAmount = new BigDecimal(
								dataUtil.getInvestPayAmt(applyno[i], arrivalflowvo.getFlowenvtype()).get("pay_amt"));
					} else {
						flowAmount = (arrivalflowvo.getFlowamount().setScale(2, BigDecimal.ROUND_HALF_UP))
								.add(new BigDecimal(dataUtil.getInvestPayAmt(applyno[i], arrivalflowvo.getFlowenvtype())
										.get("pay_amt")));
					}
				}

				if (arrivalflowvo.getFlowtype().equals(Constants.refund_Flow)) {
					if (arrivalflowvo.getFlowAmountType().equals("1")) {
						flowAmount = new BigDecimal(
								dataUtil.getRefundFlow_info(applyno[i], arrivalflowvo.getFlowenvtype()).get("pay_amt"));
					} else {
						flowAmount = (arrivalflowvo.getFlowamount().setScale(2, BigDecimal.ROUND_HALF_UP)).add(
								new BigDecimal(dataUtil.getRefundFlow_info(applyno[i], arrivalflowvo.getFlowenvtype())
										.get("pay_amt")));
					}
				}

				if (arrivalflowvo.getFlowtype().equals(Constants.sidy_Flow)) {
					if (arrivalflowvo.getFlowAmountType().equals("1")) {
						flowAmount = new BigDecimal(dataUtil.getSubsidy_info(applyno[i], arrivalflowvo.getFlowenvtype())
								.get("subsidy_amt"));
					} else {
						flowAmount = (arrivalflowvo.getFlowamount().setScale(2, BigDecimal.ROUND_HALF_UP))
								.add(new BigDecimal(dataUtil.getSubsidy_info(applyno[i], arrivalflowvo.getFlowenvtype())
										.get("subsidy_amt")));
					}
				}

				if (arrivalflowvo.getFlowtype().equals(Constants.trust_Flow)) {
					if (arrivalflowvo.getFlowAmountType().equals("1")) {
						flowAmount = new BigDecimal(
								dataUtil.getTrustToRaiseArrivalFlow_info(applyno[i], arrivalflowvo.getFlowenvtype())
										.get("amount"));
					} else {
						flowAmount = (arrivalflowvo.getFlowamount().setScale(2, BigDecimal.ROUND_HALF_UP))
								.add(new BigDecimal(dataUtil
										.getTrustToRaiseArrivalFlow_info(applyno[i], arrivalflowvo.getFlowenvtype())
										.get("amount")));
					}
				}

				if (arrivalflowvo.getFlowtype().equals(Constants.raise_Flow)) {
					if (arrivalflowvo.getFlowAmountType().equals("1")) {
						flowAmount = new BigDecimal(
								dataUtil.getTrustToRaiseArrivalFlow_info(applyno[i], arrivalflowvo.getFlowenvtype())
										.get("amount"));
					} else {
						flowAmount = (arrivalflowvo.getFlowamount().setScale(2, BigDecimal.ROUND_HALF_UP))
								.add(new BigDecimal(dataUtil
										.getTrustToRaiseArrivalFlow_info(applyno[i], arrivalflowvo.getFlowenvtype())
										.get("amount")));
					}
				}
				if (arrivalflowvo.getFlowtype().equals(Constants.targetsReturn_Flow)) {
						flowAmount = arrivalflowvo.getFlowReturnAmount();
				}

				logger.info("流水信息 ：invest_apply_no:" + arrivalflowvo.getFlowinvestapplyno() + ", 流水金额:" + flowAmount
						+ ", 流水笔数:" + arrivalflowvo.getFlownum() + " ,flowtype:" + arrivalflowvo.getFlowtype()
						+ " , 到帐日:" + arrivalflowvo.getFlowtranstime() + " , 流水是否一致:"
						+ arrivalflowvo.getFlowAmountType() + ",环境：" + arrivalflowvo.getFlowenvtype()
						+"标的付款账户ID:"+arrivalflowvo.getPayTargetsBankAccountId()+"接收标的回款账号id:"
						+arrivalflowvo.getReturnAccountId());
				// 发送认购流水
				data = GenerateArrivalFlow.runGenerateArrivalFlow(flowAmount, arrivalflowvo.getFlowinvestapplyno(),
						arrivalflowvo.getFlownum(), arrivalflowvo.getFlowtype(), arrivalflowvo.getFlowtranstime(),
						arrivalflowvo.getFlowenvtype());

				if (arrivalflowvo.getFlowtype().equals(Constants.enjoyAccount_Flow)) {
					logger.info("安享账户流水信息 ：" + "到帐日customer_arrive_date:" + arrivalflowvo.getFlowtranstime() + ",环境："
							+ arrivalflowvo.getFlowenvtype());
					// 发送认购流水
					data = GenerateEnjoyAccountArrivalFlow.runGenerateEnjoyAccountArrivalFlow(
							arrivalflowvo.getFlowtype(), arrivalflowvo.getFlowtranstime(),
							arrivalflowvo.getFlowenvtype());
				}

			}
		}

		return data;

	}
}
