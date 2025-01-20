document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const recoveryEmailInput = document.getElementById('recovery-email');
    const recoverPasswordForm = document.getElementById('recover-password-form');
    const socialButtons = document.querySelectorAll('.social-btn');

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
                    window.location.href = '/dashboard';  
                } else {
                    showError(result.message);
                }
            } catch (error) {
                showError('Erro ao conectar ao servidor.');
            }
        });
    }

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
                    window.location.href = 'http://127.0.0.1:5000';  
                } else {
                    showError(result.message);
                }
            } catch (error) {
                showError('Erro ao conectar ao servidor.');
            }
        });

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

                const hasUppercase = /[A-Z]/.test(password);
                updateRequirement(requirements.uppercase, hasUppercase);

                const hasLowercase = /[a-z]/.test(password);
                updateRequirement(requirements.lowercase, hasLowercase);

                const hasNumber = /[0-9]/.test(password);
                updateRequirement(requirements.number, hasNumber);

                const hasSymbol = /[!@#$%^&*]/.test(password);
                updateRequirement(requirements.symbol, hasSymbol);

                const hasLength = password.length >= 12;
                updateRequirement(requirements.length, hasLength);
            });
        }

        function updateRequirement(requirementElement, isValid) {
            const icon = requirementElement.querySelector('.check-icon');
            if (icon) {
                icon.textContent = isValid ? '✔' : '✖';
                icon.classList.toggle('valid', isValid);
            }
        }
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (loginForm) loginForm.style.display = 'none';
            const forgotPasswordPage = document.getElementById('forgot-password-page');
            if (forgotPasswordPage) forgotPasswordPage.style.display = 'block';
        });
    }

    if (recoveryEmailInput) {
        recoveryEmailInput.addEventListener('input', function() {
            const exampleText = document.querySelector('.example-text');
            if (exampleText) {
                if (this.value.trim() !== '') {
                    exampleText.classList.add('hidden'); 
                } else {
                    exampleText.classList.remove('hidden'); 
                }
            }
        });
    }

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

    if (socialButtons) {
        socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = button.textContent.replace('Entrar com ', ''); 
                alert(`Login com ${provider} não está implementado.`);
            });
        });
    }

    window.addEventListener('beforeunload', () => {
        fetch('/shutdown', { method: 'POST' });
    });

    const togglePasswordButton = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    if (togglePasswordButton && passwordInput) {
        togglePasswordButton.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordButton.textContent = '🙈'; 
            } else {
                passwordInput.type = 'password';
                togglePasswordButton.textContent = '👁️'; 
            }
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        const recoverPasswordForm = document.getElementById('recover-password-form');
    
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
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                alert('Por favor, preencha todos os campos.');
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
                    successMessage.style.display = 'block';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 3000); 
                } else {
                    errorMessage.style.display = 'block';
                    setTimeout(() => {
                        errorMessage.style.display = 'none';
                    }, 3000); 
                }
            } catch (error) {
                console.error('Erro ao conectar ao servidor:', error);
                alert('Erro ao conectar ao servidor.');
            }
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
        const rememberMeCheckbox = document.getElementById('remember-me');
        const usernameInput = document.getElementById('username');
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            usernameInput.value = savedUsername; 
            rememberMeCheckbox.checked = true; 
        }
    
        document.getElementById('login-form').addEventListener('submit', function (event) {
            event.preventDefault(); 
    
            const username = usernameInput.value;
            const password = document.getElementById('password').value;
            const rememberMe = rememberMeCheckbox.checked;
    
            if (username === "usuario" && password === "senha") { 
                if (rememberMe) {
                    localStorage.setItem('username', username);
                } else {
                    localStorage.removeItem('username'); 
                }
    
                alert('Login realizado com sucesso!');
                window.location.href = "/"; 
            } else {
                alert('Usuário ou senha incorretos.'); 
            }
        });
    
        document.getElementById('toggle-password').addEventListener('click', function () {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    });
});