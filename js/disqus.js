/* global require */
require(['jquery'], function($) {
	'use strict';

	var getSiteUrl = function() {
		var url = window.location.protocol + '//' + window.location.hostname;

		if (window.location.port.length > 0) {
			url = url + ":" + window.location.port;
		}

		return url;
	};

	var updateCommentCounters = function(result) {
		for(var index in result.response) {
			var post = result.response[index];

			if (post.posts > 0) {
				var link = 
					post.link.replace(config.siteUrl, '');

				var anchor = $('a[href="' + link + '"][title|="Read more"]');

				var suffix = 
					(post.posts == 1) ? "comment" : "comments";

				anchor.append(' (' + post.posts + ' ' + suffix + ')');
			}
		}
	};

	var config = {
		publicKey:'TXFKGjh2RRspswjQnJnawcGiKGHLnNGgCtNlUTYgu089hbCNLrrCj9DyJNMQ8tKv',
		shortName:'thecodejunkie',
		siteUrl: getSiteUrl()
	};

	$(function() {

		if (window.location.hostname === "localhost") {
			return;
		}

		var permalinks = [];
		
		$('a[title|="Read more"]').each(function() {
			permalinks.push('link:' + this.href);
		});

		if(permalinks.length > 0) {
			$.ajax({
				url: "https://disqus.com/api/3.0/threads/set.json",
				data: {
					api_key: config.publicKey,
					forum: config.shortName,
					thread: permalinks
				},
				cache: false,
				success: function(result) {
					updateCommentCounters(result);
				},
		    });
		}
	});

});