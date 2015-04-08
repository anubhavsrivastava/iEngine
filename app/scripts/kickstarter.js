alert('Kickstarted');

//document.addEventListener("DOMContentLoaded", function(event) {
	setTimeout(function  (argument) {
		require(['ad-getter'], function  (ad-getter) {
			var allPlates = document.getElementsByTagName('ad-plate');
			allPlates.forEach(function (plate) {
				ad-getter.getAd(plate);
			});
		});
	},100)
	
//});
