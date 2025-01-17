from flask import Flask, render_template, request, jsonify, redirect, url_for, session
import webbrowser
from threading import Timer
import os
import json

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'  # Chave secreta para gerenciar sessões

# Caminho para o arquivo de usuários
USERS_FILE = 'users.json'

# Variável para controlar se o navegador já foi aberto
browser_opened = False

# Carrega os usuários do arquivo JSON
def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return {}

# Salva os usuários no arquivo JSON
def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)

# Rota para a página de login
# Rota para a página de login
@app.route('/')
def login():
    return render_template('login.html')

# Rota para a página de recuperação de senha
@app.route('/recuperar_senha')
def recuperar_senha():
    return render_template('recuperar_senha.html')

# Rota para a página de registro
@app.route('/register')
def register():
    return render_template('register.html')

# Rota para processar o login
@app.route('/login', methods=['POST'])
def process_login():
    username = request.form.get('username')
    password = request.form.get('password')

    users = load_users()
    if username in users and users[username] == password:
        return jsonify({"success": True, "message": "Login bem-sucedido!"})
    else:
        return jsonify({"success": False, "message": "Usuário ou senha incorretos."})

# Rota para processar o registro
@app.route('/register', methods=['POST'])
def process_register():
    username = request.form.get('username')
    password = request.form.get('password')

    users = load_users()
    if username in users:
        return jsonify({"success": False, "message": "Usuário já existe."})
    else:
        users[username] = password
        save_users(users)
        return jsonify({"success": True, "message": "Registro bem-sucedido!"})

# Rota para encerrar o servidor
@app.route('/shutdown', methods=['POST'])
def shutdown():
    os._exit(0)
    return '', 204

# Função para abrir o navegador
def open_browser():
    global browser_opened
    if not browser_opened:
        webbrowser.open_new('http://127.0.0.1:5000/')
        browser_opened = True

if __name__ == '__main__':
    # Verifica se o servidor está em modo de depuração
    if os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
        # Abre o navegador automaticamente após 1 segundo
        Timer(1, open_browser).start()
    app.run(debug=True)