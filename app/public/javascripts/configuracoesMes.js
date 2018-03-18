var currentTime = new Date();
var ano = currentTime.getFullYear();
var mes = currentTime.getMonth();

var nomeMes = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

$(document).ready(function() {

    $("#novoPeriodo").click(function(){
        adicionaNovoPeriodo();
    });

    $("#previsao").click(function(){
      
        var valores = [];
        var periodo = [];

        var anoAux = ano;
        var mesAux = mes;

        $('#tblbody').each(function(){
            $(this).find('tr').each(function(){
                var atual = $(this).find('td input').val();
                if(atual === ""){
                    mesAux++;
                }
                else{
                    valores.push(atual);
                    var mesCorreto = mesAux+1;
                    periodo.push("" + anoAux + "-" + mesCorreto + "-01");
                    mesAux++;
                }

                if(mesAux === 12){
                  mesAux = 0;
                  anoAux++;
                }

            })
        });

        if(valores.length <= 3){
            // nao pode eu acho
        }

        gerarGrafico(periodo,valores);
        
    });

    gerarGrafico(0,0,['2015','2017']);

});

function adicionaNovoPeriodo () {

    var ultimoAno = $('#' + ano + "" + mes);

    var valorUltimoAno = ultimoAno.find('td input');

    // undefined ou vazio
    if(valorUltimoAno.val() === undefined || valorUltimoAno.val().toString().length === 0){
        alert('preencha o ultimo ano');
        return;
    }

    mes--;

    if(mes === -1){
      mes = 11;
      ano--;
    }

    var tabela = $('#tblData');

    var corpo = tabela.find('tbody');
        
    var linha = document.createElement("tr");

    linha.setAttribute('id', ano + "" + mes);

    var colAno = document.createElement("td");
    colAno.innerHTML = "" + nomeMes[mes] + " - " + ano;
    linha.appendChild(colAno);

    var colValor = document.createElement("td");
    var inputValor = document.createElement("input");
    inputValor.setAttribute('type', 'number');
    inputValor.setAttribute('step', '0.01');
    inputValor.setAttribute('min', '0');
    inputValor.setAttribute('required', "");

    colValor.append(inputValor);

    linha.appendChild(colValor);

    corpo.prepend(linha);
}


function gerarGrafico(ano, valor){

  Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows){

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }
    
  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'AAPL High',
    x: ano,//[ano-mes-dia],
    y: valor,//[1, 3, 6],
    line: {color: '#17BECF'}
  }

  var data = [trace1];
      
  var layout = {
    title: 'Previsão para os próximos meses', 
    xaxis: {
      autorange: true, 
      range: ['2015', '2019'], 
      // rangeselector: {buttons: [
      //     {
      //       count: 1, 
      //       label: '1y', 
      //       step: 'year', 
      //       stepmode: 'backward'
      //     }, 
      //     {
      //       count: 6, 
      //       label: '1y', 
      //       step: 'year', 
      //       stepmode: 'backward'
      //     }, 
      //     {step: 'all'}
      //   ]}, 
      //rangeslider: {range: ['2015', '2019']}, 
      type: 'date'
    }, 
    yaxis: {
      autorange: true, 
      range: [0, 100], 
      type: 'linear'
    }
  };

  Plotly.newPlot('grafico', data, layout);
  })
}