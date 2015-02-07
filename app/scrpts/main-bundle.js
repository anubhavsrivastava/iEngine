// can be AMD or non-AMD library
;
define("lib", function(){});

require(['lib'], function (lib) {
    console.log('lib loaded successfully');
});

define("main", function(){});

define('modone',['lib'], function (lib) {
    console.log('mod one running');
});

