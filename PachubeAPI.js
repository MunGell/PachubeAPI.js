var Pachube = 
{
	conf_pachube_url: "http://api.pachube.com/v2",
	conf_pachube_apps: "http://beta.apps.pachube.com",
	params: {},
	appConf: {},
	token: "",
	keys: "",
	
	parseURL: function () 
	{
		var e,
		a = /\+/g,  // Regex for replacing addition symbol with a space
		r = /([^&=]+)=?([^&]*)/g,
		decompiled = function (s) 
		{
			return decodeURIComponent(s.replace(a, " "));
		},
		q = window.location.search.substring(1);

		while (e = r.exec(q)) 
		{
			this.params[decompiled(e[1])] = decompiled(e[2]);
		}
	},
	getToken: function()
	{
		this.token = this.params['token'];
		return this.token;
	},
	getAppConf: function()
	{
		url = this.conf_pachube_apps + "/conf/" + this.token;
		
		this.appConf = $.ajax({
			url: url,
			dataType: "json",
			type: "GET",
			async: false
		}).responseText;
	},
	getKeys: function()
	{
		this.keys = this.appConf.system;
	},
	getDatastreamHistory: function(feed, datastream, start, end, interval)
	{
		url = this.conf_pachube_url + "/feeds/" + feed + "/datastreams/" + datastream + ".json?start=" + start + "&end=" + end + "&interval=" + interval;
		return this._get(url);
	},
	_get: function(url, data, dataType)
	{
		if(!data) data = {};
		if(!dataType) dataType = "json";

		$.extend(data, {"key": this.key});
		
		return $.ajax({
			url: url,
			dataType: dataType,
			data: data,
			type: "GET",
			async: false
		}).responseText;
	}
}