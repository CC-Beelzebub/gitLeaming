/**
 * 工具包
 * yangtang
 * 2016-09-08 17:54:34
 *CInsuredPhone,${clmPayVisit.CInsuredPhone } 
 */
Utils={
	version:"1.0.0",
	
	/**
	 * 非空校验
	 */
	isEmpty: function(value, allowEmptyString) { //判断 null undefined 空字符串或者数组
    	return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false);
	},
	
	/**
	 * 号码校验
	 */
	checkPhone: function(val,objId,objVal){
		
		if(Utils.isEmpty(val)){
			return;
		}
		
		//var regex1=/^[0][0-9]{2,3}-?[0-9]{5,10}$/;// 验证带区号的  
		var regex1 = /^0\d{2,3}-?\d{7,8}$/;
		var regex2=/^[1-9]{1}[0-9]{5,8}$/; // 验证没有区号的  
		var regex3=/^1[3,4,5,7,8,9]{1}[0-9]{9}$/;// 验证手机号  
		var regex4=/^((0\d{2,3}-?\d{7,8})|(1[3584]\d{9}))$/;// 
		//var regex5=/^([0-9]{3,4})?-?[0-9]{7,8}$/; 
			if(!regex4.test(val)){
				alert("您输入的电话号码格式不正确!");
				$("#"+objId).val(objVal);
			}

		/*if(val.length>9){
			if(val.length==11){
				if(!regex1.test(val)&&!regex3.test(val)){
					alert("您输入的电话号码格式不正确!");
					$("#"+objId).val(objVal);
				}
			}else
			{
				if(!regex1.test(val)){
					alert("您输入的电话号码格式不正确!");
					$("#"+objId).val(objVal);
				}
			}
		}
		else{
			if(!regex2.test(val)){
				alert("您输入的电话号码格式不正确!");
				$("#"+objId).val(objVal);
			}
		}*/
	}

};

