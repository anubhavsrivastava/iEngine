(function()  {
  if(!document.getElementById('tap-starter')){ 
      var tapStarter= document.createElement('script');
      tapStarter.src = 'http://localhost:8080/scripts/bundle?modules=ad-getter,kickstarter'; // the url will be set from server side
      tapStarter.setAttribute('id', 'tap-starter');
      document.documentElement.firstChild.appendChild(tapStarter);

      //adding kickstarter code
      document.addEventListener("TAPkickstart", function(event) {
      	require(['ad-getter'], function  (adgetter) {
			var allPlates = document.getElementsByTagName('ad-plate');
			for (var i = allPlates.length - 1; i >= 0; i--) {
				adgetter.getAd(allPlates[i]);
			};
			
		});
      });
	}
})();