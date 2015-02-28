(function()  {
  if(!document.getElementById('tap-starter')){ 
      var tapStarter= document.createElement('script');
      tapStarter.src = '//theadplate.com/123/23/4555/'; // the url will be set from server side
      tapStarter.setAttribute('id', 'tap-starter');
      document.documentElement.firstChild.appendChild(tapStarter);
	}
})();