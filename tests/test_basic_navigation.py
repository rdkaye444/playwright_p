import pytest
from playwright.sync_api import Page, expect


def test_page_opens_in_chrome(page: Page):
    """Test that the main page opens successfully in Chrome."""
    # Navigate to the home page
    page.goto("http://localhost:8000")
    
    # Verify the page title
    expect(page).to_have_title("Playwright Test Page")
    
    # Verify the page loaded by checking for a key element
    expect(page.locator("h1.hero-title")).to_be_visible()
    expect(page.locator("h1.hero-title")).to_contain_text("Welcome to Playwright Testing") 