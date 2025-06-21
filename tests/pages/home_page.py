from playwright.sync_api import Page


class HomePage:
    """Page object model for the home page."""
    
    def __init__(self, page: Page):
        self.page = page
    
    # URL
    URL = "http://localhost:8000"
    
    # Locators
    HERO_TITLE = "h1.hero-title"
    
    def navigate(self):
        """Navigate to the home page."""
        self.page.goto(self.URL)
    
    def get_title(self):
        """Get the page title."""
        return self.page.title()
    
    def get_hero_title_text(self):
        """Get the hero title text."""
        return self.page.locator(self.HERO_TITLE).text_content() 