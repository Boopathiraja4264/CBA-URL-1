// Get DOM elements
const inputDesc = document.getElementById('InputDesc');
const inputLink = document.getElementById('InputLink');
const listItem = document.getElementById('list-item');
const inputFields = document.getElementById('input-fields');
const showInputIcon = document.getElementById('show-input');

// Function to toggle visibility of the input fields
const toggleInput = () => {
    if (inputFields.style.display === 'block') {
        inputFields.style.display = 'none';
        showInputIcon.style.display = 'inline-block';
    } else {
        inputFields.style.display = 'block';
        showInputIcon.style.display = 'none';
    }
};

// Function to save items to Local Storage
const saveToLocalStorage = () => {
    const items = Array.from(listItem.children).map(li => ({
        desc: li.querySelector('a').textContent,
        link: li.querySelector('a').href
    }));
    localStorage.setItem('listItems', JSON.stringify(items));
};

// Function to load items from Local Storage
const loadFromLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem('listItems')) || [];
    items.forEach(item => {
        addListItem(item.desc, item.link);
    });
};

// Function to add list item
const addListItem = (descValue, linkValue) => {
    // Create list item
    const li = document.createElement('li');
    li.innerHTML = `
        <a href="${linkValue}" target="_blank">${descValue}</a>
        <button class="delete-btn" aria-label="Delete item"><i class="fas fa-trash"></i></button>
    `;

    // Add event listener to the delete button
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveToLocalStorage();
    });

    // Append the list item
    listItem.appendChild(li);
};

// Function to handle new list item addition
const addList = () => {
    const descValue = inputDesc.value.trim();
    const linkValue = inputLink.value.trim();

    if (!descValue || !linkValue) {
        alert("Please fill in both fields!");
        return;
    }

    try {
        new URL(linkValue); // Validate URL
    } catch {
        alert("Please enter a valid URL!");
        return;
    }

    addListItem(descValue, linkValue);

    // Save to Local Storage
    saveToLocalStorage();

    // Clear inputs and hide fields
    inputDesc.value = '';
    inputLink.value = '';
    inputFields.style.display = 'none';
    showInputIcon.style.display = 'inline-block';
};

// Attach the event listener for the submit button
document.getElementById('Submit-button').addEventListener('click', addList);

// Load items on page load
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
