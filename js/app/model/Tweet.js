var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};

com.apress.model.Tweet = Backbone.Model.extend({
	parse: function(model) {
		//model.created_at "Wed Aug 28 06:32:07 +0000 2013"
		var friendly = moment(model.created_at, "ddd MMM DD HH:mm:ss ZZ YYYY").fromNow();
		model.friendlyDate = friendly;
		return model;
	}
});

com.apress.model.Profile = Backbone.Model.extend({
	urlRoot: 'http://localhost:8080/profile',
	parse: function(model){
		return model;
	}
})

com.apress.model.Search = Backbone.Model.extend({

	url 	: 'http://localhost:8080/search',
	rootUrl : 'http://localhost:8080/search',

    sync: function(method, model, options){
        if(this.get('query')){
            this.url = this.rootUrl + '/' + this.get('query');
            console.log(this.url);
        }
        Backbone.sync.call(this, method, model, options);
    },
});