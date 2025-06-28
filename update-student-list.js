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
let editingIndex = null;

function renderStudents() {
    studentsTableBody.innerHTML = '';
    if (filteredStudents.length === 0) {
        studentsTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#a0aec0;">No students found.</td></tr>';
        return;
    }
    filteredStudents.forEach((student, idx) => {
        if (editingIndex === idx) {
            studentsTableBody.innerHTML += `
                <tr>
                    <td><input type="text" value="${student.name}" id="editName" style="width:95%"></td>
                    <td><input type="email" value="${student.email}" id="editEmail" style="width:95%"></td>
                    <td><input type="tel" value="${student.phone}" id="editPhone" style="width:95%"></td>
                    <td><input type="text" value="${student.room}" id="editRoom" style="width:70px"></td>
                    <td>
                        <button class="action-btn save" title="Save" data-idx="${idx}"><i class="fas fa-save"></i></button>
                        <button class="action-btn cancel" title="Cancel" data-idx="${idx}"><i class="fas fa-times"></i></button>
                    </td>
                </tr>
            `;
        } else {
            studentsTableBody.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.room}</td>
                    <td>
                        <button class="action-btn edit" title="Edit" data-idx="${idx}"><i class="fas fa-edit"></i></button>
                    </td>
                </tr>
            `;
        }
    });
}

renderStudents();

searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.room.toLowerCase().includes(query)
    );
    editingIndex = null;
    renderStudents();
});

studentsTableBody.addEventListener('click', function(e) {
    const editBtn = e.target.closest('.edit');
    const saveBtn = e.target.closest('.save');
    const cancelBtn = e.target.closest('.cancel');

    if (editBtn) {
        editingIndex = parseInt(editBtn.dataset.idx);
        renderStudents();
    } else if (saveBtn) {
        const idx = parseInt(saveBtn.dataset.idx);
        const name = document.getElementById('editName').value.trim();
        const email = document.getElementById('editEmail').value.trim();
        const phone = document.getElementById('editPhone').value.trim();
        const room = document.getElementById('editRoom').value.trim();
        if (!name || !email || !phone || !room) {
            showError('All fields are required.');
            return;
        }
        if (!/^\d{10}$/.test(phone)) {
            showError('Phone number must be 10 digits.');
            return;
        }
        if (!validateEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        // Update in both arrays
        const realIdx = students.findIndex(s => s === filteredStudents[idx]);
        students[realIdx] = filteredStudents[idx] = { name, email, phone, room };
        editingIndex = null;
        renderStudents();
        showSuccess('Student updated successfully!');
    } else if (cancelBtn) {
        editingIndex = null;
        renderStudents();
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
    // Simple email regex
    return /^\S+@\S+\.\S+$/.test(email);
} 