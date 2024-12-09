const mockDatabase = {};
let historyStack = [];
let redoStack = [];

// Functions to show login and register forms
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}

function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

// Handle login form submission
document.getElementById('loginFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('loginMilitaryID').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (mockDatabase[id] && mockDatabase[id].password === password) {
        document.getElementById('authPage').classList.add('hidden');
        document.getElementById('trainingPage').classList.remove('hidden');
        saveHistory();
    } else {
        document.getElementById('loginMessage').textContent = "Invalid ID or Password.";
    }
});

// Handle registration form submission
document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('registerMilitaryID').value.trim();
    const name = document.getElementById('registerName').value.trim();
    const password = document.getElementById('registerPassword').value;

    if (!mockDatabase[id]) {
        mockDatabase[id] = { name, password };
        document.getElementById('registerMessage').textContent = "Registration successful! Please login.";
        showLogin();
    } else {
        document.getElementById('registerMessage').textContent = "ID already exists.";
    }
});

// Video sources
const videoSources = {
    defence: 'one_123.mp4',
    fitness: 'two_123.mp4',
    shooting: 'three_123.mp4'
};

// Function to show video
function showVideo(option) {
    const videoContainer = document.getElementById('videoContainer');

    // Clear the existing videoContainer content
    videoContainer.innerHTML = `
        <iframe
            src="${videoSources[option]}"
            frameborder="0"
            allowfullscreen
            style="width: 100%; height: 300px; border-radius: 5px; border: 2px solid #4ca1af;">
        </iframe>
    `;

    videoContainer.style.display = 'block';
    document.getElementById('backButton').classList.remove('hidden');
    document.querySelector('.options-container').style.display = 'none';

    saveHistory();
}

// Function to go back from video
function goBack() {
    const videoContainer = document.getElementById('videoContainer');

    videoContainer.style.display = 'none';
    videoContainer.innerHTML = ''; // Clear the iframe
    document.querySelector('.options-container').style.display = 'flex';
    document.getElementById('backButton').classList.add('hidden');

    saveHistory();
}

// Save current state to history stack
function saveHistory() {
    const state = document.body.innerHTML;
    historyStack.push(state);
    redoStack = [];
}

// Undo function
function undo() {
    if (historyStack.length > 1) {
        redoStack.push(historyStack.pop());
        const previousState = historyStack[historyStack.length - 1];
        document.body.innerHTML = previousState;
        restoreState();
    }
}

// Redo function
function redo() {
    if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        historyStack.push(nextState);
        document.body.innerHTML = nextState;
        restoreState();
    }
}

// Reattach event listeners after restoring state
function restoreState() {
    document.getElementById('loginFormElement').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('loginMilitaryID').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (mockDatabase[id] && mockDatabase[id].password === password) {
            document.getElementById('authPage').classList.add('hidden');
            document.getElementById('trainingPage').classList.remove('hidden');
            saveHistory();
        } else {
            document.getElementById('loginMessage').textContent = "Invalid ID or Password.";
        }
    });

    document.getElementById('registrationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('registerMilitaryID').value.trim();
        const name = document.getElementById('registerName').value.trim();
        const password = document.getElementById('registerPassword').value;

        if (!mockDatabase[id]) {
            mockDatabase[id] = { name, password };
            document.getElementById('registerMessage').textContent = "Registration successful! Please login.";
            showLogin();
        } else {
            document.getElementById('registerMessage').textContent = "ID already exists.";
        }
    });

    // Reattach video and navigation logic
    document.querySelectorAll('.option').forEach((button) => {
        button.addEventListener('click', (e) => showVideo(e.target.dataset.option));
    });

    document.getElementById('backButton').addEventListener('click', goBack);
}

// Attach event listeners to video options
document.querySelectorAll('.option').forEach((button) => {
    button.addEventListener('click', (e) => showVideo(e.target.dataset.option));
});

// Attach event listener to the back button
document.getElementById('backButton').addEventListener('click', goBack);
