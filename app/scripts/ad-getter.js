define(['lib'], function (lib) {
return {
	getAdBaseUrl: '/api/getAd/{pubId}/{plateId}', // the url to be hit for ads
	defaultErrorHtml:'<strong>Ad not found!</strong>',
	ajax:function (reqObj) {
		var method = reqObj.method || "GET";
		var xmlhttp = new XMLHttpRequest();
	       
	    //success and failure handling
	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == 4 ) {
	           if(xmlhttp.status == 200)
	              	reqObj.success && reqObj.success(xmlhttp);
	           else
	           		reqObj.fail && reqObj.fail(xmlhttp);
	        }
	    }

	    xmlhttp.open(method, reqObj.url, true);
	    xmlhttp.send(JSON.stringify(reqObj.data));
	},
	
	getAd: function(plateId,pubId){
		var adUrl=this.getAdBaseUrl.replace('{pubId}',pubId).replace('{plateId}',plateId);
		this.ajax({
			url:adUrl,
			success:this.getAdSuccess.bind(this,[plateId,pubId]),
			failure:this.getAdFailure.bind(this,[plateId,pubId])	
		});
	},

	getAdFailure:function (plateId,pubId,xmlhttp) {
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
				var apiResponse = JSON.stringify(xmlhttp.responseText);
				if(apiResponse.fault)
					requiredElement.html(apiResponse.fault.html);
			}
			else
				requiredElement.html(this.defaultErrorHtml);
		}
	},

	getAdSuccess:function(plateId,pubId,xmlhttp){
		//handle according to api response
	}
}
});
