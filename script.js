var StrJson = "";
function loadCities() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        StrJson = this.responseText;
        var rJson = JSON.parse(StrJson);
        var Html =  "<select name=\"select\" id=\"cities\">";

        for(var k in rJson) {
          Html += "<option value=" +rJson[k].id + ">" + rJson[k].nome+"/"+rJson[k].microrregiao.mesorregiao.UF.sigla+"</option>";
        }

        Html +=  "</select>   <input type=\"button\" value=\"Previsão\" onclick=\"forecast();\">";
        localStorage.setItem("htmloriginal",Html);
        document.body.innerHTML = Html;
    }
  };
  xhttp.open("GET", "http://localhost:8081/cidades", true);
  xhttp.send();
}

loadCities();