module.exports = function(application){

	application.get('/sair', function(req,res){
		application.app.controllers.home.sair_get(application,req,res);
	});

	application.post('/sair', function(req,res){
		application.app.controllers.home.sair_post(application,req,res);
	});

	application.post('/novoItem', function(req,res){
		application.app.controllers.home.novoItem(application,req,res);
	})

}