# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Application

This is a zero-dependency vanilla JavaScript application. No build process or package manager required.

**Method 1: Direct Browser Open**
- Simply open `index.html` in any modern browser

**Method 2: VS Code Live Server**
- Right-click `index.html` → "Open with Live Server"

**Method 3: Python HTTP Server**
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

## Architecture Overview

This is a client-side bucket list application with a **two-layer architecture**:

### Data Layer: `js/storage.js`
- **BucketStorage object** - Module pattern for all LocalStorage operations
- Single source of truth for data persistence
- All CRUD operations go through this layer
- Data model:
  ```javascript
  {
    id: "timestamp_string",
    title: "string",
    completed: boolean,
    createdAt: "ISO_date",
    completedAt: "ISO_date|null"
  }
  ```

### Presentation Layer: `js/app.js`
- **BucketListApp class** - OOP approach for UI logic
- DOM manipulation and event handling
- Renders filtered lists based on current state
- Global `app` instance created on DOMContentLoaded

### Critical Separation
- `storage.js` never touches the DOM
- `app.js` never directly accesses LocalStorage
- All data flows: `app.js` → `BucketStorage` methods → LocalStorage

## Key Implementation Details

### Rendering Flow
1. User action triggers event handler in `app.js`
2. Event handler calls appropriate `BucketStorage` method
3. Handler calls `this.render()`
4. `render()` calls `BucketStorage.getFilteredList()` with current filter
5. DOM is updated with new HTML

### Filter System
- `currentFilter` property tracks state: 'all' | 'active' | 'completed'
- Filtering happens in data layer via `getFilteredList()`
- Filter changes re-render entire list

### Modal Management
- Edit functionality uses a single modal (`#editModal`)
- `editingId` property tracks which item is being edited
- Modal shown/hidden via Tailwind's `flex`/`hidden` utility classes

### Security
- XSS prevention via `escapeHtml()` method used in `createBucketItemHTML()`
- User input is always escaped before rendering to DOM

### Event Handling Pattern
- Methods bound to `app` instance via inline `onclick` attributes in generated HTML
- Global `app` variable exposed on `window` for this purpose
- Alternative would be event delegation from container, but current pattern is used

## UI Dependencies

- **Tailwind CSS**: Loaded via CDN in `index.html` - do not add npm dependencies
- **Custom CSS**: `css/styles.css` contains animations and filter button states
- Korean language is used throughout the UI

## Testing & Development

No automated tests exist. To verify changes:
1. Open in browser
2. Test CRUD operations manually
3. Check browser console for errors
4. Verify LocalStorage persistence (DevTools → Application → Local Storage)

## Common Modification Patterns

**Adding a new field to data model:**
1. Update object structure in `storage.js` `addItem()` method
2. Modify `createBucketItemHTML()` in `app.js` to display the field
3. Update edit modal if field should be editable

**Adding a new storage operation:**
1. Add method to `BucketStorage` object in `storage.js`
2. Call from appropriate event handler in `app.js`
3. Follow existing error handling patterns (try/catch)

**Changing styles:**
- Tailwind utilities: Edit inline classes in `index.html` or `app.js` HTML strings
- Custom styles: Edit `css/styles.css`
- Animations defined in `styles.css`: `.slideIn`, `.fadeIn`, `.scaleIn`

## Browser Compatibility

Requires modern browser with LocalStorage support. Uses ES6+ features (classes, arrow functions, template literals, destructuring).
