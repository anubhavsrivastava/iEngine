(function()  {
  if(!document.getElementById('tap-starter')){ 
      var tapStarter= document.createElement('script');
      tapStarter.src = 'http://localhost:8080/scripts/bundle?modules=ad-getter,kickstarter'; // the url will be set from server side
      tapStarter.setAttribute('id', 'tap-starter');
      document.documentElement.firstChild.appendChild(tapStarter);
	}
})();