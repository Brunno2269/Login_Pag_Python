from flask import Flask, render_template, request, jsonify, redirect, url_for, session
import webbrowser
from threading import Timer
import os
import json

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'  

USERS_FILE = 'users.json'

browser_opened = False

def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/recuperar_senha')
def recuperar_senha():
    return render_template('recuperar_senha.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login', methods=['POST'])
def process_login():
    username = request.form.get('username')
    password = request.form.get('password')

    users = load_users()
    if username in users and users[username] == password:
        return jsonify({"success": True, "message": "Login bem-sucedido!"})
    else:
        return jsonify({"success": False, "message": "Usuário ou senha incorretos."})

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

@app.route('/shutdown', methods=['POST'])
def shutdown():
    os._exit(0)
    return '', 204

def open_browser():
    global browser_opened
    if not browser_opened:
        webbrowser.open_new('http://127.0.0.1:5000/')
        browser_opened = True

if __name__ == '__main__':
    if os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
        Timer(1, open_browser).start()
    app.run(debug=True)