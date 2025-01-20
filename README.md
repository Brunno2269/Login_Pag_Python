# Sistema de Autenticação

Este projeto é um sistema de autenticação simples que inclui funcionalidades de login, registro e recuperação de senha. Ele foi desenvolvido usando HTML, CSS e JavaScript, com integração ao Flask para o backend.

## Funcionalidades

1. **Login**:
   - Autenticação de usuário.
   - Opção de "Manter o acesso" para lembrar o nome de usuário.
   - Validação de senha em tempo real.

2. **Registro**:
   - Criação de nova conta de usuário.
   - Validação de senha com requisitos específicos (maiúsculas, minúsculas, números, símbolos e mínimo de 12 caracteres).
   - Confirmação de senha.

3. **Recuperação de Senha**:
   - Solicitação de recuperação de senha via e-mail.
   - Validação de e-mail.

## Como Usar

1. **Login**:
   - Acesse a página de login.
   - Insira seu nome de usuário e senha.
   - Marque a opção "Manter o acesso" se desejar que o nome de usuário seja lembrado.

2. **Registro**:
   - Acesse a página de registro.
   - Preencha os campos de nome de usuário, senha e confirmação de senha.
   - Certifique-se de que a senha atenda aos requisitos.

3. **Recuperação de Senha**:
   - Acesse a página de recuperação de senha.
   - Insira seu e-mail cadastrado.
   - Siga as instruções enviadas para o e-mail.

## Estrutura do Projeto

- **Páginas**:
  - `login.html`: Página de login.
  - `register.html`: Página de registro.
  - `recuperar_senha.html`: Página de recuperação de senha.

- **Arquivos Estáticos**:
  - `styles.css`: Estilos CSS para todas as páginas.
  - `script.js`: Lógica JavaScript para validação e interatividade.

- **Backend**:
  - Integração com Flask para gerenciamento de rotas e autenticação.

## Requisitos

- Navegador moderno (Chrome, Firefox, Edge, etc.).
- Flask (para o backend, se aplicável).

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-autenticacao.git