var currentTime = new Date();
var ano = currentTime.getFullYear();

$(document).ready(function() {

    $("#novoPeriodo").click(function(){
        adicionaNovoPeriodo();
    });

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







Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

  
var trace1 = {
  type: "scatter",
  mode: "lines",
  name: 'AAPL High',
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'AAPL.High'),
  line: {color: '#17BECF'}
}

var trace2 = {
  type: "scatter",
  mode: "lines",
  name: 'AAPL Low',
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'AAPL.Low'),
  line: {color: '#7F7F7F'}
}

var data = [trace1,trace2];
    
var layout = {
  title: 'Time Series with Rangeslider', 
  xaxis: {
    autorange: true, 
    range: ['2015-02-17', '2017-02-16'], 
    rangeselector: {buttons: [
        {
          count: 1, 
          label: '1m', 
          step: 'month', 
          stepmode: 'backward'
        }, 
        {
          count: 6, 
          label: '6m', 
          step: 'month', 
          stepmode: 'backward'
        }, 
        {step: 'all'}
      ]}, 
    rangeslider: {range: ['2015-02-17', '2017-02-16']}, 
    type: 'date'
  }, 
  yaxis: {
    autorange: true, 
    range: [86.8700008333, 138.870004167], 
    type: 'linear'
  }
};

Plotly.newPlot('grafico', data, layout);
})