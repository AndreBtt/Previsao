var firebase = require('firebase');

module.exports.sair_get = function(app,req,res){

    if(req.session.logado){
        // carregar os itens do banco de dados
        res.render('home', {receita : [], despesa : []});
    }
    else {
        res.render('login');
    }
}

module.exports.sair_post = function(app,req,res){

	firebase.auth().signOut().then(function() {
        req.session.destroy(function(){
            res.render('login');
        });
    }).catch(function(error) {
    	// erro
    });
}

module.exports.novoItem = function(app,req,res){

    var nome = req.body.nomeItem;
    var periodo = req.body.periodoSelecionado; // mes e ano
    var tipo = req.body.tipoSelecionado; // receita e despesa

    // verifica se o nome ja existe !!

    // acessa o banco e adiciona esse novo item de alguma forma

    var item = {
        nome : nome,
        periodo : periodo,
        tipo : tipo,
        historico : []
    };

    if(periodo === "mes"){
        res.render('configuracoesMes', {item : item});
    }
    else{
        res.render('configuracoesAno', {item : item});
    }
}
