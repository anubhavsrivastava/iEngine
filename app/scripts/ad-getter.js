define(['lib'], function (lib) {
return {
	//getAdBaseUrl: '/api/getAd/{pubId}/{plateId}', // the url to be hit for ads
	getAdBaseUrl: 'http://store.theadplate.com/store/get/{plateId}',
	defaultErrorHtml:'<strong>Ad not found!</strong>',
	ajax:function (reqObj) {
		var method = reqObj.method || "GET";
		var xmlhttp = new XMLHttpRequest();
	       
	    //success and failure handling
	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == 4 ) {
	           if(xmlhttp.status == 200 || xmlhttp.status == 304)
	              	reqObj.success && reqObj.success(xmlhttp);
	           else
	           		reqObj.fail && reqObj.fail(xmlhttp);
	        }
	    }

	    xmlhttp.open(method, reqObj.url, true);
	    xmlhttp.send(JSON.stringify(reqObj.data));
	},
	
	getAd: function(plate){
		var plateId=plate.getAttribute("plateId");
		var pubId =plate.getAttribute("pubId");
		var adUrl=this.getAdBaseUrl.replace('{pubId}',pubId).replace('{plateId}',plateId);
		this.ajax({
			url:adUrl,
			success:this.getAdSuccess.bind(this,plate),
			failure:this.getAdFailure.bind(this,plate)	
		});
	},

	getAdFailure:function (plateId,pubId,xmlhttp) {
		console.log("get ad call failed");
		var aplates=document.getElementsByTagName("aplate");
		var requiredElement=null;

		//TODO: replace by filter function
		for (var i = aplate.length - 1; i >= 0; i--) {
			if(aplate[i].getAttribute("plateId")===plateId){
				requiredElement = aplate[i];
				return;
			}
		};

		if(requiredElement){
			if(xmlhttp && xmlhttp.responseText){
				var apiResponse = JSON.parse(xmlhttp.responseText);
				if(apiResponse.fault)
					requiredElement.html(apiResponse.fault.html);
			}
			else
				requiredElement.html(this.defaultErrorHtml);
		}
	},

	getAdSuccess:function(plate,xmlhttp){
		console.log("getad call succeeded");
		//for the time being consider all are image link ads
		var apiResponse = JSON.parse(xmlhttp.responseText);
		plate.innerHTML = "<a href='"+apiResponse.redirectUrl+"'><img src='"+apiResponse.imgUrl+"'/></a>"
	}
}
});
