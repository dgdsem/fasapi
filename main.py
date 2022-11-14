#Importa os métodos da FASTAPI, do FORM e Request necessários para iniciar a aplicação pegar dados do formulário e devolver o template html
from fastapi import FastAPI, Form, Request 
#Importa os métodos do HTMLRESPONSE e RedirectResponse, necessário para informar que o retorno é HTML e para redirecionar para outra página html
from fastapi.responses import HTMLResponse, RedirectResponse
#Importa os métodos do StaticFiles, necessário para ler arquivos CSS, imagem, etc...
from fastapi.staticfiles import StaticFiles
#Importa os métodos do Jinja2templates, necessários para pegar o template HTML
from fastapi.templating import Jinja2Templates
import xml.etree.ElementTree as ET
import requests

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/img", StaticFiles(directory="img"), name="img")
app.mount("/js", StaticFiles(directory="js"), name="js")
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def read_root():
    return RedirectResponse("/html/")

@app.get("/html", response_class=HTMLResponse)
async def generate_html_response(request: Request): #É necessário/obrigatório passar um objeto request, caso contrário não funciona a exibição do template/página html
    return templates.TemplateResponse("login.html", {"request": request})

@app.post("/login/", response_class=HTMLResponse)
async def login(request: Request, user: str = Form(...), password: str = Form(...)):
    if  user.upper() == "DIEGO" and password.upper() == "12345" :
           return templates.TemplateResponse("forecast.html", {"request": request})
    else:
        return """
                    <html>
                        <head>
                            <title>Weather Forecast | Login</title>
                            <meta http-equiv="refresh" content="5; URL='/html/'"/>
                        </head>
                        <body>
                            <h1>Login Failed!</h1>
                        </body>
                    </html>
                  """

@app.get("/cidades")
async def read_root():
    r = requests.get("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
    return r.json()

@app.get("/previsao/{cidade}")
async def read_root(cidade:str):
    r = requests.get("https://apiprevmet3.inmet.gov.br/previsao/" + cidade)
    return r.json()