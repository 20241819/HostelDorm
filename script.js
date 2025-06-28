// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginBtn = document.querySelector('.login-btn');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Password Toggle Functionality
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle icon
    this.classList.toggle('show');
    
    // Add visual feedback
    this.style.transform = 'scale(1.1)';
    setTimeout(() => {
        this.style.transform = 'translateY(-50%)';
    }, 150);
});

// Form Validation
function validateForm() {
    let isValid = true;
    const errors = [];
    
    // Clear previous errors
    clearErrors();
    
    // Username validation
    if (!usernameInput.value.trim()) {
        showError(usernameInput, 'Username is required');
        isValid = false;
    } else if (usernameInput.value.trim().length < 3) {
        showError(usernameInput, 'Username must be at least 3 characters');
        isValid = false;
    }
    
    // Password validation
    if (!passwordInput.value.trim()) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}

// Show error for input field
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
    
    formGroup.appendChild(errorDiv);
    
    // Add shake animation
    formGroup.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        formGroup.style.animation = '';
    }, 500);
}

// Clear all errors
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorGroups = document.querySelectorAll('.form-group.error');
    
    errorMessages.forEach(msg => msg.remove());
    errorGroups.forEach(group => group.classList.remove('error'));
}

// Add shake animation CSS
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;

const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);

// Loading state management
function setLoadingState(loading) {
    if (loading) {
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
    } else {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
    }
}

// Handle form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    
    setLoadingState(true);
    
    try {
        // Send login request to API
        const response = await fetch('api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();
        
        if (result.success) {
            // Success animation
            document.querySelector('.login-container').classList.add('success');
            
            // Show success message
            showSuccessMessage(`Welcome back, ${result.user.full_name}!`);
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        } else {
            showError(passwordInput, result.message);
        }
    } catch (error) {
        showError(passwordInput, 'Network error. Please try again.');
        console.error('Error:', error);
    } finally {
        setLoadingState(false);
    }
});

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 3000);
}

// Add success message animations
const successAnimations = `
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;

const successStyle = document.createElement('style');
successStyle.textContent = successAnimations;
document.head.appendChild(successStyle);

// Input focus effects
[usernameInput, passwordInput].forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
    
    // Real-time validation
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearErrors();
        }
    });
});

// Remember me functionality
rememberMeCheckbox.addEventListener('change', function() {
    if (this.checked) {
        // In a real app, you might want to set a cookie or localStorage
        console.log('Remember me enabled');
    }
});

// Forgot password link
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Password reset functionality would be implemented here.\nPlease contact your system administrator.');
});

// Signup link
document.querySelector('.signup-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Account creation is handled by administrators.\nPlease contact your hostel management for account setup.');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form
    if (e.key === 'Enter' && (document.activeElement === usernameInput || document.activeElement === passwordInput)) {
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Ctrl/Cmd + Enter to submit from anywhere
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Auto-focus username field on page load
window.addEventListener('load', function() {
    usernameInput.focus();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        group.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add ripple effect to login button
    loginBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleAnimation = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const rippleStyle = document.createElement('style');
rippleStyle.textContent = rippleAnimation;
document.head.appendChild(rippleStyle); 