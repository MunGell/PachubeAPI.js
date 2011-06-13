var Pachube = 
{
	conf_pachube_url: "http://api.pachube.com/v2",
	conf_pachube_apps: "http://beta.apps.pachube.com",
	params: {}, params_control: false,
	appConf: {}, appConf_control: false,
	token: "",
	key: "KX72x8KdR07Zbt9xfETIhFmYK07LYGa17V1-mCQ0iUI",
	//key: "",
	
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
		this.params_control = true;
	},
	getToken: function()
	{
		if(!this.params_control) this.parseURL();
		this.token = this.params['token'];
		return this.token;
	},
	getAppConf: function()
	{
		if(this.token == "") this.getToken();
		url = this.conf_pachube_apps + "/conf/" + this.token;
		
		this.appConf = $.ajax({
			url: url,
			dataType: "json",
			type: "GET",
			success: function()
			{
				this.appConf_control = true;
			},
			async: false
		}).responseText;
	},
	getKey: function()
	{
		if(!this.appConf_control) this.getAppConf();
		this.key = this.appConf.system.data[0].key;
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



/*
$.ajax('conf_url',{
  dataType: 'jsonp',
  success: function(data) {
     var elect=data.system.electricity[0];
     var gas=data.system.gas[0];
     // save ids and key
     var js={"electricity" : elect, "gas": gas};
     var saveto="http://www.virtual-techno.com/vtl/pages/average_register.php?token=df0dcc9a4372dbf72a18350a2a18ad000907f07b";
     $.post(saveto, js, function (d) {
       var x=$.parseJSON(d);
       //alert('got back:'+x.result);
       window.location.href='http://www.virtual-techno.com/vtl/pages/average_config.php?node_id='+x.node_id;
     });
  },
  type: 'get'
}); // end of outer call
*/