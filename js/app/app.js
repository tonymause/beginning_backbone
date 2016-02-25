$(function () {
	var timelineView = new com.apress.view.TimelineView();
	var profileView = new com.apress.view.ProfileView({user: 'tonymause'});
	var searchModel = new com.apress.model.Search();
	var searchView = new com.apress.view.SearchView({model: searchModel});
	var appRouter = new com.apress.router.AppRouter({searchModel: searchModel});
	Backbone.history.start();
});