document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const recoveryEmailInput = document.getElementById('recovery-email');
    const recoverPasswordForm = document.getElementById('recover-password-form');
    const socialButtons = document.querySelectorAll('.social-btn');

    // Função para exibir mensagens de erro
    function showError(message) {
        if (errorMessage) {
            const errorText = errorMessage.querySelector('.error-text');
            errorText.textContent = message;
            errorMessage.style.display = 'flex';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    }

    // Função para exibir mensagens de sucesso
    function showSuccess(message) {
        if (successMessage) {
            const successText = successMessage.querySelector('.success-text');
            successText.textContent = message;
            successMessage.style.display = 'flex';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    }

    // Evento de submit do formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                showError('Digite seu login e senha.');
                return;
            }

            const formData = new FormData(loginForm);
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    showSuccess(result.message);
                    window.location.href = '/dashboard';  // Redireciona para a página de dashboard
                } else {
                    showError(result.message);
                }
            } catch (error) {
                showError('Erro ao conectar ao servidor.');
            }
        });
    }

    // Evento de submit do formulário de registro
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                showError('As senhas não coincidem.');
                return;
            }

            const formData = new FormData(registerForm);
            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    showSuccess(result.message);
                    window.location.href = '/login';  // Redireciona para a página de login
                } else {
                    showError(result.message);
                }
            } catch (error) {
                showError('Erro ao conectar ao servidor.');
            }
        });

        // Validação de senha em tempo real
        const passwordInput = document.getElementById('password');
        const requirements = {
            uppercase: document.getElementById('req-uppercase'),
            lowercase: document.getElementById('req-lowercase'),
            number: document.getElementById('req-number'),
            symbol: document.getElementById('req-symbol'),
            length: document.getElementById('req-length'),
        };

        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                const password = passwordInput.value;

                // Verifica se há pelo menos uma letra maiúscula
                const hasUppercase = /[A-Z]/.test(password);
                updateRequirement(requirements.uppercase, hasUppercase);

                // Verifica se há pelo menos uma letra minúscula
                const hasLowercase = /[a-z]/.test(password);
                updateRequirement(requirements.lowercase, hasLowercase);

                // Verifica se há pelo menos um número
                const hasNumber = /[0-9]/.test(password);
                updateRequirement(requirements.number, hasNumber);

                // Verifica se há pelo menos um símbolo
                const hasSymbol = /[!@#$%^&*]/.test(password);
                updateRequirement(requirements.symbol, hasSymbol);

                // Verifica se a senha tem pelo menos 12 caracteres
                const hasLength = password.length >= 12;
                updateRequirement(requirements.length, hasLength);
            });
        }

        // Função para atualizar o ícone de verificação
        function updateRequirement(requirementElement, isValid) {
            const icon = requirementElement.querySelector('.check-icon');
            if (icon) {
                icon.textContent = isValid ? '✔' : '✖';
                icon.classList.toggle('valid', isValid);
            }
        }
    }

    // Evento de clique no link "Esqueceu a senha?"
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (loginForm) loginForm.style.display = 'none';
            const forgotPasswordPage = document.getElementById('forgot-password-page');
            if (forgotPasswordPage) forgotPasswordPage.style.display = 'block';
        });
    }

    // Evento de input no campo de email de recuperação
    if (recoveryEmailInput) {
        recoveryEmailInput.addEventListener('input', function() {
            const exampleText = document.querySelector('.example-text');
            if (exampleText) {
                if (this.value.trim() !== '') {
                    exampleText.classList.add('hidden'); // Esconde o exemplo
                } else {
                    exampleText.classList.remove('hidden'); // Mostra o exemplo
                }
            }
        });
    }

    // Evento de submit do formulário de recuperação de senha
    if (recoverPasswordForm) {
        recoverPasswordForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('recovery-email').value;

            try {
                const response = await fetch('/recuperar_senha', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `email=${encodeURIComponent(email)}`,
                });
                const result = await response.json();
                if (result.success) {
                    showSuccess(result.message);
                } else {
                    showError(result.message);
                }
            } catch (error) {
                showError('Erro ao conectar ao servidor.');
            }
        });
    }

    // Eventos dos botões de login social
    if (socialButtons) {
        socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = button.textContent.replace('Entrar com ', ''); // Extrai o nome do provedor
                alert(`Login com ${provider} não está implementado.`);
            });
        });
    }

    // Envia uma requisição ao servidor quando a guia é fechada
    window.addEventListener('beforeunload', () => {
        fetch('/shutdown', { method: 'POST' });
    });

    // Adicionar funcionalidade de mostrar/ocultar senha
    const togglePasswordButton = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    if (togglePasswordButton && passwordInput) {
        togglePasswordButton.addEventListener('click', () => {
            // Alterna entre mostrar e ocultar a senha
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordButton.textContent = '🙈'; // Ícone para ocultar
            } else {
                passwordInput.type = 'password';
                togglePasswordButton.textContent = '👁️'; // Ícone para mostrar
            }
        });
    }
});