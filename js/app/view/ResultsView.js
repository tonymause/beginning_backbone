var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.ResultsView = Backbone.View.extend({

    el: '#results',

    model: null,

    template: Handlebars.compile($("#timeline-template").html()),

    initialize:  function(options){
        var self = this;
        self.model = options.model;
        self.model.fetch();
        self.listenTo(self.model,'change', self.render);
        self.render();
    },

    render: function(){

        var self = this,
             output = self.template({tweet: self.model.get('statuses')});

            $.Dialog({
                'title'       : 'Search Results',
                'content'     : output,
                'draggable'   : true,
                'overlay'     : true,
                'closeButton' : true,
                'buttonsAlign': 'center',
                'keepOpened'  : true,
                'position'    : {
                    'zone'    : 'left'
                },
                'buttons'     : {
                    'OK'      : {
                'action'      : function(){}
                    }
                }
            });
    }
});