const roomsTableBody = document.querySelector('#roomsTable tbody');
const addRoomForm = document.getElementById('addRoomForm');
const formMessage = document.getElementById('formMessage');

// Sample data
let rooms = [
    { roomNo: '101', type: 'Single', capacity: 1, status: 'Available' },
    { roomNo: '102', type: 'Double', capacity: 2, status: 'Occupied' },
    { roomNo: '201', type: 'Triple', capacity: 3, status: 'Available' },
];

function renderRooms() {
    roomsTableBody.innerHTML = '';
    if (rooms.length === 0) {
        roomsTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#a0aec0;">No rooms found.</td></tr>';
        return;
    }
    rooms.forEach((room, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${room.roomNo}</td>
            <td>${room.type}</td>
            <td>${room.capacity}</td>
            <td class="status ${room.status.toLowerCase()}">${room.status}</td>
            <td>
                <button class="action-btn edit" title="Edit" data-idx="${idx}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" title="Delete" data-idx="${idx}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        roomsTableBody.appendChild(tr);
    });
}

renderRooms();

addRoomForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = '';
    formMessage.className = '';

    const roomNo = document.getElementById('roomNo').value.trim();
    const roomType = document.getElementById('roomType').value;
    const capacity = document.getElementById('capacity').value;
    const status = document.getElementById('status').value;

    if (!roomNo || !roomType || !capacity || !status) {
        showError('Please fill in all fields.');
        return;
    }
    if (rooms.some(r => r.roomNo === roomNo)) {
        showError('Room number already exists.');
        return;
    }
    rooms.push({ roomNo, type: roomType, capacity: parseInt(capacity), status });
    renderRooms();
    showSuccess('Room added successfully!');
    addRoomForm.reset();
});

roomsTableBody.addEventListener('click', function(e) {
    if (e.target.closest('.delete')) {
        const idx = e.target.closest('.delete').dataset.idx;
        if (confirm('Are you sure you want to delete this room?')) {
            rooms.splice(idx, 1);
            renderRooms();
            showSuccess('Room deleted successfully!');
        }
    } else if (e.target.closest('.edit')) {
        // Placeholder for edit functionality
        showError('Edit functionality coming soon!');
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