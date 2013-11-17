define("jquery",[], function(){
    return window.jQuery;
});

requirejs.config({
    'baseUrl': '/js',
});

require([
	'disqus'
]);