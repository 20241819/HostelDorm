const registrationForm = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

registrationForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    formMessage.textContent = '';
    formMessage.className = '';

    // Get form values
    const formData = {
        username: document.getElementById('fullname').value.trim().toLowerCase().replace(/\s+/g, '_'),
        password: document.getElementById('password').value,
        email: document.getElementById('email').value.trim(),
        fullname: document.getElementById('fullname').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        gender: document.getElementById('gender').value,
        dob: document.getElementById('dob').value,
        address: document.getElementById('address').value.trim(),
        room: document.getElementById('room').value
    };

    // Basic client-side validation
    if (!formData.fullname || !formData.email || !formData.phone || !formData.gender || 
        !formData.dob || !formData.address || !formData.room || !formData.password) {
        showError('Please fill in all fields.');
        return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
        showError('Phone number must be 10 digits.');
        return;
    }
    if (formData.password.length < 6) {
        showError('Password must be at least 6 characters.');
        return;
    }
    if (formData.password !== document.getElementById('confirmPassword').value) {
        showError('Passwords do not match.');
        return;
    }
    if (!validateEmail(formData.email)) {
        showError('Please enter a valid email address.');
        return;
    }

    try {
        // Send registration request to API
        const response = await fetch('api/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            showSuccess(result.message);
            registrationForm.reset();
        } else {
            showError(result.message);
        }
    } catch (error) {
        showError('Network error. Please try again.');
        console.error('Error:', error);
    }
});

function showError(msg) {
    formMessage.textContent = msg;
    formMessage.className = 'error-message';
}

function showSuccess(msg) {
    formMessage.textContent = msg;
    formMessage.className = 'success-message';
}

function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
} 