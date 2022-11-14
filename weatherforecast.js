var StrJson = "";

function forecast() {
  const xhttp = new XMLHttpRequest();
  var select = document.getElementById('cities');
  var City = select.options[select.selectedIndex].value;
  var CityName = select.options[select.selectedIndex].innerText;
  var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
  var CurrentDate = diaF+"/"+mesF+"/"+anoF;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        StrJson = this.responseText;
        var rJson = JSON.parse(StrJson);
        var Html = localStorage.getItem("htmloriginal") + "<br><br><br><br><br><br><br><br><br><br><br><br><table class=\"box\"><tr><td>Previsão para: "+CityName+"</td><td>Max.</td><td>Min.</td></tr>";
        Html += "<tr><td>"+rJson[City][CurrentDate]["manha"].resumo +"<img src="+rJson[City][CurrentDate]["manha"].icone+"></td>";
        Html += "<td>"+rJson[City][CurrentDate]["manha"].temp_max+"<img src="+rJson[City][CurrentDate]["manha"].temp_max_tende_icone+"></td>";
        Html += "<td>"+rJson[City][CurrentDate]["manha"].temp_min+"<img src="+rJson[City][CurrentDate]["manha"].temp_min_tende_icone+"></td></tr>";
        document.body.innerHTML = Html;
    }
  };
  xhttp.open("GET", "http://localhost:8081/previsao/" + City, true);
  xhttp.send();
}

forecast();