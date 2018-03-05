$(document).ready(function() {

    $("#novoItem").click(function(){
        mostrarTela();
    });

    $("#enviarNovoItem").click(function(){
        mandarDados();
    })

});

function mostrarTela () {

    $("#formularioNovoItem").show();
}

function mandarDados(){

    var periodo = $("#periodo").val();
    var tipo = $("#tipo").val();

    $("#periodoSelecionado").val(periodo);
    $("#tipoSelecionado").val(tipo);
}
