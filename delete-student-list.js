const studentsTableBody = document.querySelector('#studentsTable tbody');
const searchInput = document.getElementById('searchInput');
const formMessage = document.getElementById('formMessage');

// Sample data
let students = [
    { name: 'Amit Kumar', email: 'amit.kumar@email.com', phone: '9876543210', room: '101' },
    { name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '9123456789', room: '102' },
    { name: 'Rahul Singh', email: 'rahul.singh@email.com', phone: '9988776655', room: '201' },
];
let filteredStudents = [...students];

function renderStudents() {
    studentsTableBody.innerHTML = '';
    if (filteredStudents.length === 0) {
        studentsTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#a0aec0;">No students found.</td></tr>';
        return;
    }
    filteredStudents.forEach((student, idx) => {
        studentsTableBody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.room}</td>
                <td>
                    <button class="action-btn delete" title="Delete" data-idx="${idx}"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

renderStudents();

searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.room.toLowerCase().includes(query)
    );
    renderStudents();
});

studentsTableBody.addEventListener('click', function(e) {
    const deleteBtn = e.target.closest('.delete');
    if (deleteBtn) {
        const idx = parseInt(deleteBtn.dataset.idx);
        const student = filteredStudents[idx];
        if (confirm(`Are you sure you want to delete ${student.name}?`)) {
            // Remove from both arrays
            students = students.filter(s => s !== student);
            filteredStudents = filteredStudents.filter((_, i) => i !== idx);
            renderStudents();
            showSuccess('Student deleted successfully!');
        }
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