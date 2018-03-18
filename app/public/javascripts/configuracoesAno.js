var currentTime = new Date();
var ano = currentTime.getFullYear();

$(document).ready(function() {

    $("#novoPeriodo").click(function(){
        adicionaNovoPeriodo();
    });

    $("#previsao").click(function(){
      
        var valores = [];
        var anos = [];

        var anoAux = ano;

        $('#tblbody').each(function(){
            $(this).find('tr').each(function(){
                var atual = $(this).find('td input').val();
                if(atual === ""){
                    anoAux++;
                }
                else{
                    valores.push(atual);
                    anos.push(anoAux++);
                }
            })
        });

        if(valores.length <= 3){
            // nao pode eu acho 
        }

        gerarGrafico(anos,valores, [ano,anoAux]);
        
    });

    gerarGrafico(0,0,['2015','2025']);

});

function adicionaNovoPeriodo () {

    var ultimoAno = $('#' + ano);

    var valorUltimoAno = ultimoAno.find('td input');

    // undefined ou vazio
    if(valorUltimoAno.val() === undefined || valorUltimoAno.val().toString().length === 0){
        alert('preencha o ultimo ano');
        return;
    }

    ano--;

    var tabela = $('#tblData');

    var corpo = tabela.find('tbody');
        
    var linha = document.createElement("tr");

    linha.setAttribute('id', ano);

    var colAno = document.createElement("td");
    colAno.innerHTML = ano;
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


function gerarGrafico(ano, valor, alcance){

  Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows){

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }
    
  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'AAPL High',
    x: ano,//[2013, 2014, 2015],
    y: valor,//[1, 3, 6],
    line: {color: '#17BECF'}
  }

  var data = [trace1];
      
  var layout = {
    title: 'Previsão para os próximos anos', 
    xaxis: {
      autorange: true, 
      range: alcance, //['2015', '2019'], 
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