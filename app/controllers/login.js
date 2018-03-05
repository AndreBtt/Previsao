var firebase = require('firebase');

module.exports.index = function(app,req,res){

    if(req.session.logado){
        // carregar os itens do banco de dados
        res.render('home', {receita : [], despesa : []});
    }
    else {
        res.render('login');
    }
}

module.exports.logar = function(app,req,res){
	
	var email = req.body.email_login;
    var password = req.body.senha_login;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    }).then(function () {

        req.session.logado = true;

        // preencher a proxima pagina com os itens de receita e despesas ja adicionados 
                


        res.render('home', {receita : [], despesa : []});

    });
}