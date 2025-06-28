const studentForm = document.getElementById('studentForm');
const formMessage = document.getElementById('formMessage');

studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = '';
    formMessage.className = '';

    // Get form values
    const studentName = document.getElementById('studentName').value.trim();
    const studentEmail = document.getElementById('studentEmail').value.trim();
    const studentPhone = document.getElementById('studentPhone').value.trim();
    const studentGender = document.getElementById('studentGender').value;
    const studentDob = document.getElementById('studentDob').value;
    const studentAddress = document.getElementById('studentAddress').value.trim();
    const roomAssignment = document.getElementById('roomAssignment').value.trim();
    const admissionDate = document.getElementById('admissionDate').value;
    const guardianName = document.getElementById('guardianName').value.trim();
    const guardianContact = document.getElementById('guardianContact').value.trim();

    // Basic validation
    if (!studentName || !studentEmail || !studentPhone || !studentGender || !studentDob || !studentAddress || !roomAssignment || !admissionDate || !guardianName || !guardianContact) {
        showError('Please fill in all fields.');
        return;
    }
    if (!/^\d{10}$/.test(studentPhone)) {
        showError('Student phone number must be 10 digits.');
        return;
    }
    if (!/^\d{10}$/.test(guardianContact)) {
        showError('Guardian contact must be 10 digits.');
        return;
    }
    if (!validateEmail(studentEmail)) {
        showError('Please enter a valid email address.');
        return;
    }

    // Simulate add student success
    showSuccess('Student added successfully!');
    studentForm.reset();
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
    // Simple email regex
    return /^\S+@\S+\.\S+$/.test(email);
} 