"""
Comprehensive Smoke Test for The Notebook Café
Tests all main pages, key elements, and basic functionality
"""
from playwright.sync_api import sync_playwright
import sys

def run_smoke_test():
    """Run comprehensive smoke tests on all pages"""

    results = {
        'passed': [],
        'failed': [],
        'warnings': []
    }

    with sync_playwright() as p:
        # Launch browser in headless mode
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        # Capture console messages
        console_messages = []
        page.on('console', lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))

        print("🚀 Starting smoke test for The Notebook Café...\n")

        # Test 1: Homepage
        print("📋 Test 1: Homepage")
        try:
            page.goto('http://localhost:3000')
            page.wait_for_load_state('networkidle')
            page.screenshot(path='/tmp/notebook-homepage.png', full_page=True)

            # Verify key elements
            assert page.locator('nav').count() > 0, "Navigation not found"
            assert page.locator('text=The Notebook').count() > 0, "Logo/title not found"

            # Check for hero section
            hero_visible = page.locator('.hero-title, h1').count() > 0
            if hero_visible:
                results['passed'].append("✓ Homepage loaded with hero section")
            else:
                results['warnings'].append("⚠ Hero section not detected")

            print("  ✓ Homepage loaded successfully")
            results['passed'].append("✓ Homepage navigation present")

        except Exception as e:
            results['failed'].append(f"✗ Homepage failed: {str(e)}")
            print(f"  ✗ Error: {str(e)}")

        # Test 2: Menu Page
        print("\n📋 Test 2: Menu Page")
        try:
            page.goto('http://localhost:3000/menu')
            page.wait_for_load_state('networkidle')
            page.screenshot(path='/tmp/notebook-menu.png', full_page=True)

            # Verify menu tabs
            drinks_tab = page.locator('text=Drinks').count() > 0
            meals_tab = page.locator('text=Meals').count() > 0

            if drinks_tab and meals_tab:
                results['passed'].append("✓ Menu page loaded with tabs")
                print("  ✓ Menu page loaded with tab navigation")
            else:
                results['warnings'].append("⚠ Menu tabs not fully detected")
                print("  ⚠ Menu tabs partially loaded")

        except Exception as e:
            results['failed'].append(f"✗ Menu page failed: {str(e)}")
            print(f"  ✗ Error: {str(e)}")

        # Test 3: Story Page
        print("\n📋 Test 3: Story Page")
        try:
            page.goto('http://localhost:3000/story')
            page.wait_for_load_state('networkidle')
            page.screenshot(path='/tmp/notebook-story.png', full_page=True)

            # Check for content
            has_content = page.locator('main').count() > 0
            if has_content:
                results['passed'].append("✓ Story page loaded")
                print("  ✓ Story page loaded successfully")
            else:
                results['warnings'].append("⚠ Story page content not detected")

        except Exception as e:
            results['failed'].append(f"✗ Story page failed: {str(e)}")
            print(f"  ✗ Error: {str(e)}")

        # Test 4: Events Page
        print("\n📋 Test 4: Events Page")
        try:
            page.goto('http://localhost:3000/events')
            page.wait_for_load_state('networkidle')
            page.screenshot(path='/tmp/notebook-events.png', full_page=True)

            has_content = page.locator('main').count() > 0
            if has_content:
                results['passed'].append("✓ Events page loaded")
                print("  ✓ Events page loaded successfully")
            else:
                results['warnings'].append("⚠ Events page content not detected")

        except Exception as e:
            results['failed'].append(f"✗ Events page failed: {str(e)}")
            print(f"  ✗ Error: {str(e)}")

        # Test 5: Mobile Navigation
        print("\n📋 Test 5: Mobile Responsiveness")
        try:
            mobile_page = context.new_page()
            mobile_page.set_viewport_size({'width': 375, 'height': 667})
            mobile_page.goto('http://localhost:3000')
            mobile_page.wait_for_load_state('networkidle')
            mobile_page.screenshot(path='/tmp/notebook-mobile.png', full_page=True)

            # Check for hamburger menu
            hamburger = mobile_page.locator('button[aria-label*="menu"], .hamburger, [class*="burger"]').count() > 0
            if hamburger:
                results['passed'].append("✓ Mobile navigation detected")
                print("  ✓ Mobile navigation present")
            else:
                results['warnings'].append("⚠ Mobile hamburger menu not detected")

            mobile_page.close()

        except Exception as e:
            results['failed'].append(f"✗ Mobile test failed: {str(e)}")
            print(f"  ✗ Error: {str(e)}")

        # Test 6: Check Console Errors
        print("\n📋 Test 6: Console Log Analysis")
        error_messages = [msg for msg in console_messages if 'error' in msg.lower()]
        if error_messages:
            results['warnings'].append(f"⚠ {len(error_messages)} console errors detected")
            print(f"  ⚠ Found {len(error_messages)} console errors")
            for msg in error_messages[:3]:  # Show first 3
                print(f"    {msg}")
        else:
            results['passed'].append("✓ No console errors")
            print("  ✓ No console errors detected")

        browser.close()

    # Print Summary
    print("\n" + "="*50)
    print("📊 SMOKE TEST SUMMARY")
    print("="*50)

    print(f"\n✅ Passed: {len(results['passed'])}")
    for item in results['passed']:
        print(f"  {item}")

    if results['warnings']:
        print(f"\n⚠️  Warnings: {len(results['warnings'])}")
        for item in results['warnings']:
            print(f"  {item}")

    if results['failed']:
        print(f"\n❌ Failed: {len(results['failed'])}")
        for item in results['failed']:
            print(f"  {item}")
        print("\n🔴 Some tests failed!")
        return 1

    print("\n🟢 All smoke tests passed!")
    print("\n📸 Screenshots saved to /tmp/:")
    print("  - notebook-homepage.png")
    print("  - notebook-menu.png")
    print("  - notebook-story.png")
    print("  - notebook-events.png")
    print("  - notebook-mobile.png")

    return 0

if __name__ == "__main__":
    sys.exit(run_smoke_test())
