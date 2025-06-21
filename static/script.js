// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeModals();
    initializeForms();
    initializeButtons();
    initializeTables();
    initializeSearch();
    initializeDynamicContent();
    initializeAlerts();
    
    console.log('Playwright Test Server initialized');
}

// Modal functionality
function initializeModals() {
    const modal = document.getElementById('modal');
    const confirmDialog = document.getElementById('confirm-dialog');
    const openModalBtn = document.getElementById('open-modal');
    const openConfirmBtn = document.getElementById('open-confirm');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelModalBtn = document.getElementById('cancel-modal');
    const saveModalBtn = document.getElementById('save-modal');
    const cancelConfirmBtn = document.getElementById('cancel-confirm');
    const confirmActionBtn = document.getElementById('confirm-action');

    // Open main modal
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    // Open confirm dialog
    if (openConfirmBtn) {
        openConfirmBtn.addEventListener('click', () => {
            confirmDialog.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal functions
    function closeModal(modalElement) {
        modalElement.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Close main modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => closeModal(modal));
    }

    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', () => closeModal(modal));
    }

    if (saveModalBtn) {
        saveModalBtn.addEventListener('click', () => {
            const modalInput = document.getElementById('modal-input');
            if (modalInput && modalInput.value.trim()) {
                showAlert('success', `Saved: ${modalInput.value}`);
                closeModal(modal);
            } else {
                showAlert('error', 'Please enter some text');
            }
        });
    }

    // Close confirm dialog
    if (cancelConfirmBtn) {
        cancelConfirmBtn.addEventListener('click', () => closeModal(confirmDialog));
    }

    if (confirmActionBtn) {
        confirmActionBtn.addEventListener('click', () => {
            showAlert('success', 'Action confirmed!');
            closeModal(confirmDialog);
        });
    }

    // Close modals when clicking outside
    [modal, confirmDialog].forEach(modalElement => {
        if (modalElement) {
            modalElement.addEventListener('click', (e) => {
                if (e.target === modalElement) {
                    closeModal(modalElement);
                }
            });
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('show')) {
                closeModal(modal);
            }
            if (confirmDialog.classList.contains('show')) {
                closeModal(confirmDialog);
            }
        }
    });
}

// Form functionality
function initializeForms() {
    const testForm = document.getElementById('test-form');
    
    if (testForm) {
        testForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(testForm);
            const data = Object.fromEntries(formData.entries());
            
            // Add checkboxes and radio buttons
            const checkboxes = testForm.querySelectorAll('input[type="checkbox"]:checked');
            const radios = testForm.querySelectorAll('input[type="radio"]:checked');
            
            data.interests = Array.from(checkboxes).map(cb => cb.value);
            data.gender = radios.length > 0 ? radios[0].value : null;
            
            try {
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showAlert('success', 'Form submitted successfully!');
                    testForm.reset();
                } else {
                    showAlert('error', 'Form submission failed');
                }
            } catch (error) {
                showAlert('error', 'Network error occurred');
                console.error('Form submission error:', error);
            }
        });
    }
}

// Button functionality
function initializeButtons() {
    // Primary button
    const primaryBtn = document.getElementById('primary-btn');
    if (primaryBtn) {
        primaryBtn.addEventListener('click', () => {
            showAlert('success', 'Primary button clicked!');
        });
    }

    // Secondary button
    const secondaryBtn = document.getElementById('secondary-btn');
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', () => {
            showAlert('info', 'Secondary button clicked!');
        });
    }

    // Danger button
    const dangerBtn = document.getElementById('danger-btn');
    if (dangerBtn) {
        dangerBtn.addEventListener('click', () => {
            showAlert('error', 'Danger button clicked!');
        });
    }

    // Loading button
    const loadingBtn = document.getElementById('loading-btn');
    if (loadingBtn) {
        loadingBtn.addEventListener('click', async () => {
            loadingBtn.disabled = true;
            loadingBtn.innerHTML = '<span class="loading-spinner"></span> Loading...';
            
            // Simulate async operation
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            loadingBtn.disabled = false;
            loadingBtn.innerHTML = 'Loading Button';
            showAlert('success', 'Loading completed!');
        });
    }

    // Alert buttons
    const showSuccessBtn = document.getElementById('show-success');
    const showErrorBtn = document.getElementById('show-error');
    const showWarningBtn = document.getElementById('show-warning');
    const showInfoBtn = document.getElementById('show-info');

    if (showSuccessBtn) {
        showSuccessBtn.addEventListener('click', () => {
            showAlert('success', 'This is a success message!');
        });
    }

    if (showErrorBtn) {
        showErrorBtn.addEventListener('click', () => {
            showAlert('error', 'This is an error message!');
        });
    }

    if (showWarningBtn) {
        showWarningBtn.addEventListener('click', () => {
            showAlert('warning', 'This is a warning message!');
        });
    }

    if (showInfoBtn) {
        showInfoBtn.addEventListener('click', () => {
            showAlert('info', 'This is an info message!');
        });
    }
}

// Table functionality
function initializeTables() {
    const table = document.getElementById('users-table');
    
    if (table) {
        // Edit buttons
        const editBtns = table.querySelectorAll('.edit-btn');
        editBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                const userId = row.dataset.userId;
                const name = row.cells[1].textContent;
                showAlert('info', `Editing user: ${name} (ID: ${userId})`);
            });
        });

        // Delete buttons
        const deleteBtns = table.querySelectorAll('.delete-btn');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                const userId = row.dataset.userId;
                const name = row.cells[1].textContent;
                
                if (confirm(`Are you sure you want to delete ${name}?`)) {
                    row.remove();
                    showAlert('success', `Deleted user: ${name}`);
                }
            });
        });
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchBtn && searchResults) {
        const performSearch = async () => {
            const query = searchInput.value.trim();
            
            if (!query) {
                searchResults.innerHTML = '<p>Enter a search term to get started</p>';
                return;
            }
            
            searchResults.innerHTML = '<p>Searching...</p>';
            
            try {
                // Simulate API search
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const mockResults = [
                    { id: 1, title: 'Search Result 1', description: `Contains "${query}"` },
                    { id: 2, title: 'Search Result 2', description: `Also contains "${query}"` },
                    { id: 3, title: 'Search Result 3', description: `Another result with "${query}"` }
                ];
                
                if (mockResults.length > 0) {
                    const resultsHtml = mockResults.map(result => `
                        <div class="search-result-item" style="margin-bottom: 12px; padding: 12px; border: 1px solid #e9ecef; border-radius: 4px;">
                            <h4 style="margin: 0 0 4px 0;">${result.title}</h4>
                            <p style="margin: 0; color: #666;">${result.description}</p>
                        </div>
                    `).join('');
                    searchResults.innerHTML = resultsHtml;
                } else {
                    searchResults.innerHTML = '<p>No results found</p>';
                }
            } catch (error) {
                searchResults.innerHTML = '<p>Search failed</p>';
                console.error('Search error:', error);
            }
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Initialize with placeholder
        searchResults.innerHTML = '<p>Enter a search term to get started</p>';
    }
}

// Dynamic content functionality
function initializeDynamicContent() {
    const loadContentBtn = document.getElementById('load-content');
    const toggleContentBtn = document.getElementById('toggle-content');
    const dynamicContent = document.getElementById('dynamic-content');
    
    if (loadContentBtn && dynamicContent) {
        loadContentBtn.addEventListener('click', async () => {
            loadContentBtn.disabled = true;
            loadContentBtn.innerHTML = '<span class="loading-spinner"></span> Loading...';
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Update content
                dynamicContent.innerHTML = `
                    <p>This content was loaded dynamically at ${new Date().toLocaleTimeString()}!</p>
                    <ul>
                        <li>Dynamic item 1 - ${Math.random().toString(36).substr(2, 5)}</li>
                        <li>Dynamic item 2 - ${Math.random().toString(36).substr(2, 5)}</li>
                        <li>Dynamic item 3 - ${Math.random().toString(36).substr(2, 5)}</li>
                    </ul>
                    <button class="btn btn-primary" onclick="showAlert('success', 'Dynamic button clicked!')">
                        Dynamic Button
                    </button>
                `;
                
                dynamicContent.style.display = 'block';
                showAlert('success', 'Content loaded successfully!');
            } catch (error) {
                showAlert('error', 'Failed to load content');
                console.error('Content loading error:', error);
            } finally {
                loadContentBtn.disabled = false;
                loadContentBtn.innerHTML = 'Load Content';
            }
        });
    }
    
    if (toggleContentBtn && dynamicContent) {
        toggleContentBtn.addEventListener('click', () => {
            if (dynamicContent.style.display === 'none') {
                dynamicContent.style.display = 'block';
                toggleContentBtn.textContent = 'Hide Content';
            } else {
                dynamicContent.style.display = 'none';
                toggleContentBtn.textContent = 'Show Content';
            }
        });
    }
}

// Alert functionality
function initializeAlerts() {
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            if (alert.style.display !== 'none') {
                alert.style.opacity = '0';
                setTimeout(() => {
                    alert.style.display = 'none';
                }, 300);
            }
        }, 5000);
    });
}

// Global alert function
function showAlert(type, message) {
    const alertGroup = document.querySelector('.alert-group');
    if (!alertGroup) return;
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <strong>${type.charAt(0).toUpperCase() + type.slice(1)}!</strong> ${message}
        <button class="alert-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    alertGroup.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.style.opacity = '0';
            setTimeout(() => {
                if (alertDiv.parentElement) {
                    alertDiv.remove();
                }
            }, 300);
        }
    }, 5000);
}

// API utility functions
async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Export functions for global access
window.showAlert = showAlert;
window.fetchAPI = fetchAPI; 