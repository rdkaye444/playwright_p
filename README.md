# Playwright Test Server

A comprehensive FastAPI webserver designed specifically for Playwright testing with a rich set of UI elements and interactive features.

## Features

### 🚀 FastAPI Web Server
- **FastAPI** with automatic API documentation
- **Uvicorn** ASGI server with hot reload
- **Static file serving** for CSS, JavaScript, and assets
- **Template rendering** with Jinja2
- **Multiple endpoints** for comprehensive testing scenarios

### 🎨 Rich UI Elements
- **Navigation menus** with active states
- **Multiple button types** (primary, secondary, danger, success, warning, info)
- **Comprehensive forms** with validation
- **Data tables** with interactive actions
- **Modal dialogs** (simple, large, small, scrollable)
- **Alert notifications** (success, error, warning, info)
- **Dynamic content loading**
- **Search functionality**
- **Responsive design** for mobile testing

### 📄 Multiple Pages
- **Home page** (`/`) - Main testing dashboard
- **Forms page** (`/forms`) - Comprehensive form testing
- **Modal page** (`/modal`) - Various modal scenarios
- **Dynamic pages** (`/dynamic/{page_id}`) - Dynamic content testing

### 🔌 API Endpoints
- `GET /api/status` - Server status check
- `POST /api/submit` - Form submission endpoint
- `GET /api/users` - Sample user data

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright_p
   ```

2. **Install dependencies**
   ```bash
   pip install -e .
   ```

3. **Run the server**
   ```bash
   python main.py
   ```

The server will start at `http://localhost:8000`

## Usage

### Starting the Server
```bash
python main.py
```

### Accessing the Application
- **Main page**: http://localhost:8000
- **Forms page**: http://localhost:8000/forms
- **Modal page**: http://localhost:8000/modal
- **Dynamic pages**: http://localhost:8000/dynamic/test1, http://localhost:8000/dynamic/test2
- **API documentation**: http://localhost:8000/docs

### API Endpoints

#### GET /api/status
Returns server status information.
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

#### POST /api/submit
Accepts form data and returns confirmation.
```json
{
  "success": true,
  "received": {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
}
```

#### GET /api/users
Returns sample user data.
```json
{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com"
    },
    {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com"
    }
  ]
}
```

## UI Elements for Testing

### Buttons
- **Primary buttons** - Standard action buttons
- **Secondary buttons** - Alternative actions
- **Danger buttons** - Destructive actions
- **Success buttons** - Positive actions
- **Warning buttons** - Caution actions
- **Info buttons** - Informational actions
- **Disabled buttons** - Non-interactive state
- **Loading buttons** - Async operation simulation

### Forms
- **Text inputs** with various types (text, email, password, number, etc.)
- **Select dropdowns** with single and multiple selection
- **Checkboxes** and radio buttons
- **Textareas** for multi-line input
- **File uploads** with type restrictions
- **Date and time inputs**
- **Range sliders**
- **Color pickers**
- **Form validation** with real-time feedback

### Tables
- **Data tables** with sortable columns
- **Action buttons** (Edit, Delete) per row
- **Hover effects** for better UX
- **Responsive design** for mobile

### Modals
- **Simple modals** - Basic content display
- **Large modals** - Wide layout testing
- **Small modals** - Compact dialogs
- **Scrollable modals** - Long content testing
- **Form modals** - Login, signup forms
- **Nested modals** - Modal within modal
- **Loading modals** - Async operation feedback

### Alerts
- **Success alerts** - Positive feedback
- **Error alerts** - Error messages
- **Warning alerts** - Caution messages
- **Info alerts** - Informational messages
- **Auto-dismiss** functionality
- **Manual close** buttons

### Dynamic Content
- **API data loading** - Real API calls
- **Simulated data** - Mock content
- **Error scenarios** - Network failures
- **Loading states** - Spinner animations
- **Content toggling** - Show/hide functionality

### Navigation
- **Sticky header** with navigation menu
- **Active state** highlighting
- **Responsive menu** for mobile
- **Breadcrumb navigation**
- **Back/Forward** button testing

## Testing Scenarios

### Form Testing
- **Input validation** - Required fields, patterns, lengths
- **Real-time validation** - Instant feedback
- **Form submission** - Success/error handling
- **File uploads** - Type restrictions
- **Complex forms** - Multiple input types

### Modal Testing
- **Modal opening/closing** - Various triggers
- **Backdrop clicking** - Outside modal interaction
- **Escape key** - Keyboard navigation
- **Modal stacking** - Multiple modals
- **Form within modals** - Nested interactions

### Dynamic Content Testing
- **API integration** - Real HTTP requests
- **Loading states** - Async operation feedback
- **Error handling** - Network failures
- **Content updates** - DOM manipulation
- **State persistence** - Local storage

### Event Testing
- **Click events** - Single and double clicks
- **Right-click events** - Context menus
- **Keyboard events** - Input handling
- **Mouse events** - Hover, move tracking
- **Form events** - Submit, reset, change

### Responsive Testing
- **Mobile layout** - Small screen adaptation
- **Tablet layout** - Medium screen optimization
- **Desktop layout** - Large screen experience
- **Touch interactions** - Mobile-specific events

## Development

### Project Structure
```
playwright_p/
├── main.py              # FastAPI application
├── pyproject.toml       # Project configuration
├── README.md           # Documentation
├── static/             # Static assets
│   ├── styles.css      # CSS styles
│   └── script.js       # JavaScript functionality
└── templates/          # HTML templates
    ├── index.html      # Home page
    ├── forms.html      # Forms page
    ├── modal.html      # Modal page
    └── dynamic.html    # Dynamic content page
```

### Adding New Features
1. **New endpoints** - Add to `main.py`
2. **New templates** - Create in `templates/` directory
3. **New styles** - Add to `static/styles.css`
4. **New functionality** - Add to `static/script.js`

### Dependencies
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Jinja2** - Template engine
- **aiofiles** - Async file operations

## Playwright Testing Examples

### Basic Navigation Test
```javascript
// Navigate to the home page
await page.goto('http://localhost:8000');

// Check page title
await expect(page).toHaveTitle('Playwright Test Page');

// Click a button
await page.click('#primary-btn');

// Check for alert
await expect(page.locator('.alert-success')).toBeVisible();
```

### Form Testing
```javascript
// Fill out a form
await page.fill('#username', 'testuser');
await page.fill('#email', 'test@example.com');
await page.fill('#password', 'password123');

// Submit the form
await page.click('button[type="submit"]');

// Check for success message
await expect(page.locator('.alert-success')).toBeVisible();
```

### Modal Testing
```javascript
// Open a modal
await page.click('#open-modal');

// Check modal is visible
await expect(page.locator('#modal')).toBeVisible();

// Close modal by clicking outside
await page.click('#modal');

// Check modal is hidden
await expect(page.locator('#modal')).not.toBeVisible();
```

### API Testing
```javascript
// Test API endpoint
const response = await page.request.get('http://localhost:8000/api/status');
expect(response.status()).toBe(200);

const data = await response.json();
expect(data.status).toBe('ok');
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
