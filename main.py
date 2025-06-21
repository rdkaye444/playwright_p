from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
import uvicorn
import os
from pathlib import Path

# Create FastAPI app
app = FastAPI(
    title="Playwright Test Server",
    description="A test server with various UI elements for Playwright testing",
    version="1.0.0"
)

# Create static and templates directories if they don't exist
static_dir = Path("static")
templates_dir = Path("templates")
static_dir.mkdir(exist_ok=True)
templates_dir.mkdir(exist_ok=True)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    """Main page with various UI elements for testing"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/status")
async def status():
    """API endpoint for testing API calls"""
    return {"status": "ok", "message": "Server is running"}

@app.post("/api/submit")
async def submit_form(data: dict):
    """API endpoint for form submission testing"""
    return {"success": True, "received": data}

@app.get("/api/users")
async def get_users():
    """API endpoint returning user data"""
    return {
        "users": [
            {"id": 1, "name": "Alice", "email": "alice@example.com"},
            {"id": 2, "name": "Bob", "email": "bob@example.com"},
            {"id": 3, "name": "Charlie", "email": "charlie@example.com"}
        ]
    }

@app.get("/dynamic/{page_id}")
async def dynamic_page(request: Request, page_id: str):
    """Dynamic page for testing navigation"""
    return templates.TemplateResponse(
        "dynamic.html", 
        {"request": request, "page_id": page_id}
    )

@app.get("/modal")
async def modal_page(request: Request):
    """Page with modal dialogs"""
    return templates.TemplateResponse("modal.html", {"request": request})

@app.get("/forms")
async def forms_page(request: Request):
    """Page with various form elements"""
    return templates.TemplateResponse("forms.html", {"request": request})

def main():
    """Run the FastAPI server"""
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

if __name__ == "__main__":
    main()
