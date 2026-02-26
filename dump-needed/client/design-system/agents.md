# CodeSignal Design System - Agent Reference Guide

This document provides comprehensive information for agentic code generators to effectively use the CodeSignal Design System.

## Table of Contents

1. [System Overview](#system-overview)
2. [Installation & Setup](#installation--setup)
3. [Design Tokens](#design-tokens)
4. [Components](#components)
5. [Usage Patterns](#usage-patterns)
6. [Best Practices](#best-practices)
7. [File Structure](#file-structure)

---

## System Overview

The CodeSignal Design System is a CSS-based design system organized into **Foundations** (design tokens) and **Components** (reusable UI elements). All components are built using CSS custom properties (CSS variables) for theming and consistency.

### Key Principles

- **Semantic over Primitive**: Always prefer semantic tokens (e.g., `--Colors-Text-Body-Default`) over base scale tokens
- **Dark Mode Support**: All components automatically adapt to dark mode via `@media (prefers-color-scheme: dark)`
- **CSS-First**: Components are primarily CSS-based with minimal JavaScript (Dropdown, Numeric Slider, and Modal use JS)
- **Accessibility**: Components follow WCAG guidelines and support keyboard navigation

---

## Installation & Setup

### Required CSS Files (Load in Order)

```html
<!-- 1. Fonts (Work Sans) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- 2. Foundations (Required for all components) -->
<link rel="stylesheet" href="/design-system/colors/colors.css">
<link rel="stylesheet" href="/design-system/spacing/spacing.css">
<link rel="stylesheet" href="/design-system/typography/typography.css">

<!-- 3. Components (Include only what you need) -->
<link rel="stylesheet" href="/design-system/components/button/button.css">
<link rel="stylesheet" href="/design-system/components/boxes/boxes.css">
<link rel="stylesheet" href="/design-system/components/dropdown/dropdown.css">
<link rel="stylesheet" href="/design-system/components/horizontal-cards/horizontal-cards.css">
<link rel="stylesheet" href="/design-system/components/icons/icons.css">
<link rel="stylesheet" href="/design-system/components/input/input.css">
<link rel="stylesheet" href="/design-system/components/modal/modal.css">
<link rel="stylesheet" href="/design-system/components/numeric-slider/numeric-slider.css">
<link rel="stylesheet" href="/design-system/components/split-panel/split-panel.css">
<link rel="stylesheet" href="/design-system/components/tags/tags.css">
```

### Alternative: CSS Import

```css
@import url('/design-system/colors/colors.css');
@import url('/design-system/spacing/spacing.css');
@import url('/design-system/typography/typography.css');
@import url('/design-system/components/button/button.css');
```

### JavaScript (For JS Components)

```html
<script type="module">
  import Dropdown from '/design-system/components/dropdown/dropdown.js';
  import HorizontalCards from '/design-system/components/horizontal-cards/horizontal-cards.js';
  import Modal from '/design-system/components/modal/modal.js';
  import NumericSlider from '/design-system/components/numeric-slider/numeric-slider.js';
  import SplitPanel from '/design-system/components/split-panel/split-panel.js';
</script>
```

---

## Design Tokens

### Colors

#### Base Scales (Primitive Tokens)
**Avoid using these directly** - use semantic tokens instead for theming support.

Pattern: `--Colors-Base-[Family]-[Step]`

**Families:**
- `Primary`: Brand blue colors (20-1400 scale)
- `Neutral`: Grays, white, black (00-1400 scale)
- `Accent-Green`: Success states
- `Accent-Sky-Blue`: Info states
- `Accent-Yellow`: Warning states
- `Accent-Orange`: Warning states
- `Accent-Red`: Error/Danger states

**Example:**
```css
--Colors-Base-Primary-700: #1062FB;
--Colors-Base-Neutral-600: #ACB4C7;
--Colors-Base-Accent-Green-600: #10B981;
```

#### Semantic Tokens (Preferred)
**Always use these** for automatic dark mode support and consistency.

**Categories:**

1. **Primary Colors**
   - `--Colors-Primary-Default`
   - `--Colors-Primary-Medium`
   - `--Colors-Primary-Strong`

2. **Backgrounds**
   - `--Colors-Backgrounds-Main-Default`
   - `--Colors-Backgrounds-Main-Top`
   - `--Colors-Backgrounds-Main-Medium`
   - `--Colors-Backgrounds-Main-Strong`

3. **Text Colors**
   - `--Colors-Text-Body-Default`
   - `--Colors-Text-Body-Secondary`
   - `--Colors-Text-Body-Medium`
   - `--Colors-Text-Body-Strong`
   - `--Colors-Text-Body-Strongest`

4. **Icon Colors**
   - `--Colors-Icon-Default`
   - `--Colors-Icon-Primary`
   - `--Colors-Icon-Secondary`

5. **Stroke/Border Colors**
   - `--Colors-Stroke-Default`
   - `--Colors-Stroke-Strong`
   - `--Colors-Stroke-Strongest`

6. **Alert Colors**
   - `--Colors-Alert-Success-Default`, `--Colors-Alert-Success-Medium`
   - `--Colors-Alert-Error-Default`, `--Colors-Alert-Error-Medium`
   - `--Colors-Alert-Warning-Default`, `--Colors-Alert-Warning-Medium`
   - `--Colors-Alert-Info-Default`, `--Colors-Alert-Info-Medium`

### Spacing

Pattern: `--UI-Spacing-spacing-[size]`

**Available Sizes:**
- `none`: 0
- `min`: 2px
- `xxs`: 4px
- `xs`: 6px
- `s`: 8px
- `mxs`: 12px
- `ms`: 16px
- `m`: 18px
- `ml`: 20px
- `mxl`: 24px
- `l`: 28px
- `xl`: 32px
- `xxl`: 36px
- `xxxl`: 48px
- `4xl`: 60px
- `max`: 90px

**Usage:**
```css
padding: var(--UI-Spacing-spacing-m);
margin: var(--UI-Spacing-spacing-s);
gap: var(--UI-Spacing-spacing-mxl);
```

### Border Radius

Pattern: `--UI-Radius-radius-[size]`

**Available Sizes:**
- `none`: 0
- `min`: 2px
- `xxs`: 4px
- `xs`: 6px
- `s`: 8px
- `m`: 12px
- `ml`: 16px
- `mxl`: 20px
- `l`: 24px
- `xl`: 32px

**Usage:**
```css
border-radius: var(--UI-Radius-radius-m);
```

### Input Heights

Pattern: `--UI-Input-[size]`

**Available Sizes:**
- `min`: 26px
- `xs`: 32px
- `sm`: 40px
- `md`: 48px (default)
- `lg`: 60px

**Usage:**
```css
height: var(--UI-Input-md);
```

### Typography

#### Font Families
- **Body & Labels**: `Work Sans` (sans-serif) - Must be loaded from Google Fonts
- **Headings**: `Founders Grotesk` (sans-serif) - Included via `@font-face`
- **Code**: `JetBrains Mono` (monospace) - Included via `@font-face`

#### Typography Classes

**Body Text** (Work Sans):
- `.body-xxsmall` (13px)
- `.body-xsmall` (14px)
- `.body-small` (15px)
- `.body-medium` (16px)
- `.body-large` (17px)
- `.body-xlarge` (19px)
- `.body-xxlarge` (21px)
- `.body-xxxlarge` (24px)

**Body Elegant** (Founders Grotesk):
- `.body-elegant-xxsmall` (22px)
- `.body-elegant-xsmall` (26px)
- `.body-elegant-small` (32px)
- `.body-elegant-medium` (38px)

**Headings** (Founders Grotesk, 500 weight):
- `.heading-xxxsmall` (16px)
- `.heading-xxsmall` (22px)
- `.heading-xsmall` (22px)
- `.heading-small` (24px)
- `.heading-medium` (32px)
- `.heading-large` (38px)
- `.heading-xlarge` (48px)
- `.heading-xxlarge` (64px)

**Labels** (Work Sans, 600 weight, uppercase):
- `.label-small` (10px)
- `.label-medium` (11px)
- `.label-large` (14px)

**Label Numbers** (Work Sans, 500 weight):
- `.label-number-xsmall` (11px)
- `.label-number-small` (12px)
- `.label-number-medium` (14px)
- `.label-number-large` (15px)

---

## Components

### Button

**Base Class:** `.button` (required)

**Variants:**
- `.button-primary`: Primary action (Brand Blue background)
- `.button-secondary`: Secondary action (Outlined style)
- `.button-tertiary`: Tertiary/Ghost (Subtle background)
- `.button-danger`: Destructive action (Red)
- `.button-success`: Positive action (Green)
- `.button-text`: Text button (Neutral text, no background)
- `.button-text-primary`: Primary text button (Brand color text)

**Sizes:**
- `.button-xsmall`: 32px height
- `.button-small`: 40px height
- Default: 48px height (medium)
- `.button-large`: 60px height

**States:**
- Standard pseudo-classes: `:hover`, `:focus`, `:active`, `:disabled`
- Utility classes: `.hover`, `.focus`, `.active`, `.disabled`

**Example:**
```html
<button class="button button-primary button-large">Submit</button>
<button class="button button-secondary button-small">Cancel</button>
<button class="button button-danger" disabled>Delete</button>
```

**Dependencies:** colors.css, spacing.css, typography.css

---

### Box

**Base Class:** `.box` (required)

**Variants:**
- `.box.selected`: Selected state (Primary border)
- `.box.emphasized`: Emphasized state (Neutral border)
- `.box.shadowed`: Soft shadow
- `.box.card`: Card-style shadow
- `.box.non-interactive`: Disables hover, focus, and active state changes. Useful for containers that are not clickable/interactive. Can be combined with other variants (e.g., `.box.card.non-interactive`)

**States:**
- Standard pseudo-classes: `:hover`, `:focus`, `:active`
- Utility classes: `.hover`, `.focus`, `.selected`
- **Note**: The `.non-interactive` class overrides all interactive states, preventing visual changes on hover, focus, or active while preserving base styling (shadows, borders, etc.)

**Example:**
```html
<div class="box">Default content</div>
<div class="box selected">Selected content</div>
<div class="box card">Card content</div>
<div class="box card non-interactive">Non-interactive card (no hover/focus effects)</div>
```

**Dependencies:** colors.css, spacing.css

---

### Input

**Base Class:** `.input` (required)

**Input Types:**
- `type="text"`: Standard text input (default)
- `type="number"`: Numeric input with styled spinner buttons

**States:**
- Standard pseudo-classes: `:hover`, `:focus`, `:disabled`
- Utility classes: `.hover`, `.focus`

**Features:**
- Automatic focus ring (primary color with reduced opacity)
- Styled number input spinners
- Dark mode support

**Example:**
```html
<input type="text" class="input" placeholder="Enter text...">
<input type="number" class="input" placeholder="Enter number...">
<input type="text" class="input" disabled placeholder="Disabled">
```

**Dependencies:** colors.css, spacing.css, typography.css

---

### Checkbox Input

**Base Class:** `.input-checkbox` (required wrapper)

**Structure:**
Checkboxes require a specific HTML structure with a label wrapper:

```html
<label class="input-checkbox">
  <input type="checkbox">
  <span class="input-checkbox-box">
    <span class="input-checkbox-checkmark"></span>
  </span>
  <span class="input-checkbox-label">Checkbox Label</span>
</label>
```

**Sizes:**
- Default: 32px checkbox box, large label text (17px)
- `.input-checkbox-small`: 26px checkbox box, medium label text (16px)
- `.input-checkbox-xsmall`: 20px checkbox box, small label text (14px)

**States:**
- **Default**: White background with gray border
- **Hover**: Blue border (primary color)
- **Checked**: Blue background with white checkmark icon
- **Disabled**: Reduced opacity (0.45 for box, 0.2 for label)

**Example:**
```html
<!-- Default Checkbox -->
<label class="input-checkbox">
  <input type="checkbox">
  <span class="input-checkbox-box">
    <span class="input-checkbox-checkmark"></span>
  </span>
  <span class="input-checkbox-label">Checkbox Label</span>
</label>

<!-- Checked Checkbox -->
<label class="input-checkbox">
  <input type="checkbox" checked>
  <span class="input-checkbox-box">
    <span class="input-checkbox-checkmark"></span>
  </span>
  <span class="input-checkbox-label">Checkbox Label</span>
</label>

<!-- Small Checkbox -->
<label class="input-checkbox input-checkbox-small">
  <input type="checkbox">
  <span class="input-checkbox-box">
    <span class="input-checkbox-checkmark"></span>
  </span>
  <span class="input-checkbox-label">Checkbox Label</span>
</label>
```

**Dependencies:** colors.css, spacing.css, typography.css

---

### Radio Input

**Base Class:** `.input-radio` (required wrapper)

**Structure:**
Radio buttons require a specific HTML structure and must share the same `name` attribute to function as a group:

```html
<label class="input-radio">
  <input type="radio" name="group-name">
  <span class="input-radio-circle">
    <span class="input-radio-dot"></span>
  </span>
  <span class="input-radio-label">Radio Label</span>
</label>
```

**Sizes:**
- Default: 32px radio circle, large label text (17px)
- `.input-radio-small`: 26px radio circle, medium label text (16px)
- `.input-radio-xsmall`: 20px radio circle, small label text (14px)

**States:**
- **Default**: White background with gray border
- **Hover**: Blue border (primary color)
- **Checked**: Blue-filled circle with white inner dot (ellipse icon)
- **Disabled**: Reduced opacity (0.45 for circle, 0.2 for label)

**Example:**
```html
<!-- Default Radio -->
<label class="input-radio">
  <input type="radio" name="option">
  <span class="input-radio-circle">
    <span class="input-radio-dot"></span>
  </span>
  <span class="input-radio-label">Radio Label</span>
</label>

<!-- Checked Radio -->
<label class="input-radio">
  <input type="radio" name="option" checked>
  <span class="input-radio-circle">
    <span class="input-radio-dot"></span>
  </span>
  <span class="input-radio-label">Radio Label</span>
</label>

<!-- Radio Group -->
<div>
  <label class="input-radio">
    <input type="radio" name="size" value="small">
    <span class="input-radio-circle">
      <span class="input-radio-dot"></span>
    </span>
    <span class="input-radio-label">Small</span>
  </label>
  <label class="input-radio">
    <input type="radio" name="size" value="medium" checked>
    <span class="input-radio-circle">
      <span class="input-radio-dot"></span>
    </span>
    <span class="input-radio-label">Medium</span>
  </label>
</div>
```

**Features:**
- Custom-styled circular buttons with blue-filled checked state
- White inner ellipse icon when checked
- Group behavior (radio buttons with same `name` work as a group)
- Focus ring for accessibility
- Dark mode support

**Dependencies:** colors.css, spacing.css, typography.css, icons/icons.css (for ellipse icon)

---

### Tag

**Base Class:** `.tag` or `.tag.default` (required)

**Variants:**
- `.tag` / `.tag.default`: Primary tag (Brand Blue background)
- `.tag.secondary`: Secondary tag (Neutral gray background)
- `.tag.outline`: Outline tag (Transparent with border)
- `.tag.success`: Success tag (Green background)
- `.tag.error`: Error tag (Red background)
- `.tag.warning`: Warning tag (Yellow background)
- `.tag.info`: Info tag (Sky Blue background)

**States:**
- Standard pseudo-classes: `:hover`, `:focus`, `:active`
- Utility classes: `.hover`, `.focus`, `.active`

**Example:**
```html
<div class="tag">Default</div>
<div class="tag success">Completed</div>
<div class="tag error">Failed</div>
<div class="tag outline">Filter</div>
```

**Dependencies:** colors.css, spacing.css, typography.css

---

### Icon

**Base Class:** `.icon` (required)

**Icon Names:**
Use `.icon-[name]` where `[name]` is derived from SVG filename (e.g., `Icon=Academy.svg` → `.icon-academy`)

**Available Icons** (80+ icons):
- `.icon-academy`
- `.icon-assessment`
- `.icon-interview`
- `.icon-jobs`
- `.icon-course`
- ... (see `icons.css` for full list)

**Sizes:**
- `.icon-small`: 16px
- `.icon-medium`: 24px (default)
- `.icon-large`: 32px
- `.icon-xlarge`: 48px

**Colors:**
- Default: Uses `currentColor` (inherits text color)
- `.icon-primary`: Primary brand color
- `.icon-secondary`: Secondary neutral color
- `.icon-success`: Success green color
- `.icon-danger`: Danger red color
- `.icon-warning`: Warning yellow color

**Implementation Note:**
Icons use `mask-image` with `background-color` for color control. SVGs in data URIs use black fills (black = visible in mask).

**Example:**
```html
<span class="icon icon-jobs"></span>
<span class="icon icon-jobs icon-large icon-primary"></span>
<span class="icon icon-academy icon-small icon-success"></span>
```

**Dependencies:** colors.css, spacing.css

---

### Dropdown (JavaScript Component)

**Import:**
```javascript
import Dropdown from '/design-system/components/dropdown/dropdown.js';
```

**Initialization:**
```javascript
const dropdown = new Dropdown(selector, options);
```

**Configuration Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `items` | Array | `[]` | Array of `{value, label}` objects |
| `placeholder` | String | `'Select option'` | Placeholder text |
| `selectedValue` | String | `null` | Initial selected value |
| `width` | String/Number | `'auto'` | Fixed width (ignored if `growToFit` is true) |
| `growToFit` | Boolean | `false` | Auto-resize to fit content |
| `onSelect` | Function | `null` | Callback `(value, item)` on selection |

**API Methods:**
- `getValue()`: Returns current selected value
- `setValue(value)`: Sets selected value programmatically
- `open()`: Opens dropdown menu
- `close()`: Closes dropdown menu
- `toggleOpen()`: Toggles open state
- `destroy()`: Removes event listeners and clears container

**Example:**
```javascript
const dropdown = new Dropdown('#my-dropdown', {
  placeholder: 'Choose an option',
  items: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ],
  onSelect: (value, item) => {
    console.log('Selected:', value, item);
  }
});

// Later...
dropdown.setValue('2');
const currentValue = dropdown.getValue();
```

**Dependencies:** colors.css, spacing.css, typography.css

---

### Numeric Slider (JavaScript Component)

**Import:**
```javascript
import NumericSlider from '/design-system/components/numeric-slider/numeric-slider.js';
```

**Initialization:**
```javascript
const slider = new NumericSlider(selector, options);
```

**Configuration Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | String | `'single'` | Slider type: `'single'` (one handle) or `'range'` (two handles) |
| `min` | Number | `0` | Minimum value (must be less than `max`) |
| `max` | Number | `100` | Maximum value (must be greater than `min`) |
| `step` | Number | `1` | Step increment for value changes |
| `value` | Number/Array | `null` | Initial value. For single: number. For range: `[minValue, maxValue]` array |
| `showInputs` | Boolean | `false` | If `true`, displays input fields for direct value entry |
| `theme` | String | `'default'` | Theme preset: `'default'` (neutral track, primary filled/handles) or `'primary'` (all primary) |
| `trackTheme` | String | `null` | Override track color: `'neutral'` or `'primary'` |
| `filledTheme` | String | `null` | Override filled track color: `'neutral'` or `'primary'` |
| `handleTheme` | String | `null` | Override handle color: `'neutral'` or `'primary'` |
| `continuousUpdates` | Boolean | `false` | If `true`, fires `onChange` continuously during drag (throttled by `throttleMs`). Final value always sent on drag end. |
| `throttleMs` | Number | `16` | Throttle interval in ms for continuous updates (~60fps at 16ms). Only applies when `continuousUpdates` is `true`. |
| `disabled` | Boolean | `false` | If `true`, disables the slider |
| `onChange` | Function | `null` | Callback `(value, source)` when value changes. Fires on drag end (always), track click, keyboard, and during drag if `continuousUpdates` is `true`. |
| `onInputChange` | Function | `null` | Callback `(value, source)` when value changes via input field |

**API Methods:**
- `getValue()`: Returns current value(s). For single: number. For range: `[min, max]` array
- `setValue(value, source, triggerCallback)`: Sets value programmatically. Values are clamped and validated
- `setDisabled(disabled)`: Enables or disables the slider
- `destroy()`: Removes event listeners and cleans up DOM

**Features:**
- Single value mode (one handle) or range mode (two handles)
- Optional input fields (positioned on either side for range sliders)
- Mouse, touch, and keyboard interaction
- Automatic value clamping and step snapping
- Customizable themes (track, filled track, and handles can be themed separately)
- Full accessibility support (ARIA attributes, keyboard navigation)

**Example:**
```javascript
// Single value slider
const slider = new NumericSlider('#slider', {
  type: 'single',
  min: 0,
  max: 100,
  value: 50,
  showInputs: true,
  onChange: (value) => {
    console.log('Value:', value);
  }
});

// Range slider with custom theme
const rangeSlider = new NumericSlider('#range-slider', {
  type: 'range',
  min: 0,
  max: 100,
  value: [20, 60],
  showInputs: true,
  trackTheme: 'neutral',
  filledTheme: 'primary',
  handleTheme: 'primary',
  onChange: (values) => {
    console.log('Range:', values[0], '-', values[1]);
  }
});

// Continuous updates during drag (for live previews)
const liveSlider = new NumericSlider('#live-slider', {
  type: 'single',
  value: 50,
  continuousUpdates: true, // Fire onChange during drag
  throttleMs: 16, // ~60fps (default)
  onChange: (value) => {
    // Fires continuously while dragging (throttled) AND on drag end
    updatePreview(value);
  }
});

// Later...
slider.setValue(75);
rangeSlider.setValue([30, 70]);
const currentValue = slider.getValue(); // 75
const currentRange = rangeSlider.getValue(); // [30, 70]
```

**Dependencies:** colors.css, spacing.css, typography.css, input/input.css

---

### Split Panel (JavaScript Component)

**Import:**
```javascript
import SplitPanel from '/design-system/components/split-panel/split-panel.js';
```

**Initialization:**
```javascript
const splitPanel = new SplitPanel(selector, options);
```

**Configuration Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `orientation` | String | `'horizontal'` | Panel orientation: `'horizontal'` (left/right) or `'vertical'` (top/bottom) |
| `initialSplit` | Number | `50` | Initial split percentage (0-100) for left/top panel |
| `minLeft` | Number | `10` | Minimum percentage (0-100) allowed for left/top panel |
| `minRight` | Number | `10` | Minimum percentage (0-100) allowed for right/bottom panel |
| `disabled` | Boolean | `false` | If `true`, disables resizing of the split panel |
| `onChange` | Function | `null` | Callback `(percent)` when split changes |

**API Methods:**
- `getSplit()`: Returns current split percentage (0-100)
- `setSplit(percent, skipCallback)`: Sets split percentage programmatically. Values are clamped to min/max constraints
- `getLeftPanel()`: Returns the left/top panel element
- `getRightPanel()`: Returns the right/bottom panel element
- `setDisabled(disabled)`: Enables or disables the split panel
- `destroy()`: Removes event listeners and cleans up DOM

**Features:**
- Resizable panels with draggable divider
- Mouse, touch, and keyboard interaction (arrow keys, Home, End)
- Configurable minimum panel sizes
- Automatic resize handling when container resizes
- Visual feedback: divider line expands to 4px and turns primary blue when focused/dragging
- Dark mode support
- Full accessibility support (ARIA attributes, keyboard navigation)

**Example:**
```javascript
// Basic split panel
const splitPanel = new SplitPanel('#my-split-panel', {
  initialSplit: 40,
  minLeft: 20,
  minRight: 30,
  onChange: (percent) => {
    console.log('Split changed to:', percent + '%');
  }
});

// Add content to panels
splitPanel.getLeftPanel().innerHTML = '<p>Left Panel Content</p>';
splitPanel.getRightPanel().innerHTML = '<p>Right Panel Content</p>';

// Vertical orientation
const verticalPanel = new SplitPanel('#vertical-panel', {
  orientation: 'vertical',
  initialSplit: 50,
  minLeft: 25,
  minRight: 25
});

// Later...
splitPanel.setSplit(60);
const currentSplit = splitPanel.getSplit(); // 60
splitPanel.setDisabled(true);
splitPanel.destroy();
```

**Dependencies:** colors.css, spacing.css

---

### Modal (JavaScript Component)

**Import:**
```javascript
import Modal from '/design-system/components/modal/modal.js';
```

**Initialization:**
```javascript
const modal = new Modal(options);
```

**Configuration Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | String | `'medium'` | Modal size: `'small'` (400px), `'medium'` (600px), `'large'` (900px), `'xlarge'` (1200px) |
| `title` | String | `null` | Modal title text. If `null`, header is hidden |
| `content` | String/Element | `null` | Modal content. Can be HTML string, DOM element, CSS selector (e.g., `'#my-content'`), or template content |
| `showCloseButton` | Boolean | `true` | If `true`, displays close button (X) in header |
| `footerButtons` | Array | `null` | Array of button configs `[{label, type, onClick}]`. If `null`, footer is hidden |
| `closeOnOverlayClick` | Boolean | `true` | If `true`, clicking overlay closes modal |
| `closeOnEscape` | Boolean | `true` | If `true`, pressing Escape closes modal |
| `onOpen` | Function | `null` | Callback triggered when modal opens. Receives `(modal)` instance |
| `onClose` | Function | `null` | Callback triggered when modal closes. Receives `(modal)` instance |

**API Methods:**
- `open()`: Opens the modal and locks body scroll
- `close()`: Closes the modal and restores body scroll
- `updateContent(content)`: Updates the modal content dynamically. Accepts same content types as constructor
- `updateTitle(title)`: Updates the modal title. Creates title element if it doesn't exist
- `destroy()`: Removes the modal from DOM and cleans up event listeners

**Content Types:**
- **HTML String**: `content: '<p>HTML content</p>'`
- **DOM Element**: `content: document.createElement('div')`
- **CSS Selector**: `content: '#my-content'` or `content: '.my-class'` (clones the element)
- **Template Content**: `content: template.content.cloneNode(true)`

**Help Modal Variant:**
- **Static Method**: `Modal.createHelpModal(options)` - Convenience method optimized for help/documentation content
- **Defaults**: xlarge size, footer with close button
- **Recommended**: Use HTML `<template>` elements for help content
- **Styled Elements**: Automatically styles `.toc` (table of contents), `<section>`, `<details>` (FAQ), `<code>`, and images
- **Example**: `const helpModal = Modal.createHelpModal({ title: 'Help', content: template.content.cloneNode(true) })`

**Features:**
- Multiple content insertion methods (HTML string, DOM element, CSS selector, template)
- Flexible sizing (small, medium, large, xlarge)
- Optional header and footer
- Customizable footer buttons with click handlers
- Body scroll locking when open
- Focus management for accessibility
- Keyboard navigation (Escape to close)
- ARIA attributes for screen readers
- Help modal variant with specialized styling for documentation content

**Example:**
```javascript
// Basic modal with HTML string
const modal = new Modal({
  title: 'Basic Modal',
  content: '<p class="body-medium">This is a basic modal.</p>',
  footerButtons: [
    { label: 'Close', type: 'primary' }
  ]
});
modal.open();

// Modal with CSS selector content
const modal2 = new Modal({
  title: 'Selector Modal',
  content: '#my-hidden-content',
  footerButtons: [
    { label: 'Cancel', type: 'secondary' },
    { label: 'Save', type: 'primary', onClick: () => console.log('Saved!') }
  ]
});
modal2.open();

// Modal with form content
const formHTML = `
  <form>
    <input type="text" class="input" placeholder="Name">
    <input type="email" class="input" placeholder="Email">
  </form>
`;

const formModal = new Modal({
  size: 'large',
  title: 'User Information',
  content: formHTML,
  footerButtons: [
    { label: 'Cancel', type: 'secondary', onClick: () => formModal.close() },
    { label: 'Submit', type: 'primary', onClick: () => { alert('Submitted!'); formModal.close(); } }
  ]
});
formModal.open();

// Help modal with template
const template = document.querySelector('#help-template');
const helpModal = Modal.createHelpModal({
  title: 'Help',
  content: template.content.cloneNode(true)
});
helpModal.open();

// Later...
modal.close();
modal.updateContent('<p>Updated content</p>');
modal.destroy();
```

**Dependencies:** colors.css, spacing.css, typography.css, button/button.css

---

### Horizontal Cards (JavaScript Component)

**Import:**
```javascript
import HorizontalCards from '/design-system/components/horizontal-cards/horizontal-cards.js';
```

**Initialization:**
```javascript
const horizontalCards = new HorizontalCards(container, options);
```

**Configuration Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `cards` | Array | `[]` | Array of card objects. Each card can have `title` (HTML), `description` (HTML), `actionPlaceholder`, or `actionHtml`. |
| `cardWidth` | Number | `480` | Width of each card in pixels. |
| `cardGap` | Number | `24` | Gap between cards in pixels (matches `--UI-Spacing-spacing-mxl`). |
| `scrollOffset` | Number | `520` | Number of pixels to scroll per navigation action (typically `cardWidth + cardGap`). |
| `showNavigation` | Boolean | `true` | If `true`, displays previous/next navigation buttons. |
| `onCardChange` | Function | `null` | Callback function triggered when the visible card changes. Receives `(index, card)`. |

**Card Object Structure:**

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | No | Card title displayed as a heading. Supports HTML content (e.g., `<strong>`, `<em>`, `<code>`, links, etc.). |
| `description` | String | No | Card description text. Supports HTML content (e.g., `<strong>`, `<em>`, `<code>`, links, spans with styling, etc.). |
| `actionPlaceholder` | String | No | Placeholder text for the action area (displays in a dashed border box). |
| `actionHtml` | String | No | Custom HTML content for the action area. If provided, `actionPlaceholder` is ignored. |

**API Methods:**
- `getCurrentIndex()`: Returns the current visible card index (0-based).
- `getCurrentCard()`: Returns the current visible card object.
- `scrollToNext()`: Scrolls to the next card.
- `scrollToPrevious()`: Scrolls to the previous card.
- `scrollToIndex(index)`: Scrolls to a specific card by index.
- `destroy()`: Removes event listeners and clears the container.

**Features:**
- Smooth horizontal scrolling with card centering
- Optional navigation buttons (previous/next)
- Keyboard navigation (arrow keys)
- Touch/swipe support for mobile devices
- Automatic card centering in viewport
- HTML support in title and description fields
- Responsive design
- Dark mode support
- Accessibility (ARIA attributes, keyboard support)

**Example:**
```javascript
const cards = new HorizontalCards('#my-cards', {
  cards: [
    {
      title: 'Boss 1',
      description: 'You start your presentation with a bold vision and a simple chart showing the potential for rapid market growth.',
      actionPlaceholder: 'Add label'
    },
    {
      title: 'Card with <strong>HTML</strong>',
      description: 'This description has <strong>bold text</strong> and <em>italic text</em>.',
      actionHtml: '<button class="button button-primary">Click Me</button>'
    }
  ],
  onCardChange: (index, card) => {
    console.log('Current card:', index, card);
  }
});

// Later...
cards.scrollToIndex(2);
const currentCard = cards.getCurrentCard();
```

**Dependencies:** colors.css, spacing.css, typography.css

---

## Usage Patterns

### Component Composition

Components can be combined and nested:

```html
<!-- Button with icon -->
<button class="button button-primary">
  <span class="icon icon-jobs icon-small"></span>
  Submit
</button>

<!-- Tag with icon -->
<div class="tag success">
  <span class="icon icon-check icon-small"></span>
  Completed
</div>

<!-- Box with input and button -->
<div class="box">
  <input type="text" class="input" placeholder="Search...">
  <button class="button button-primary button-small">Search</button>
</div>
```

### Custom Styling

You can extend components using CSS custom properties:

```css
.my-custom-button {
  /* Inherit button styles */
  composes: button button-primary;

  /* Override with custom properties */
  --Colors-Base-Primary-700: #custom-color;
}
```

### Responsive Design

Use standard CSS media queries with design tokens:

```css
@media (max-width: 768px) {
  .responsive-box {
    padding: var(--UI-Spacing-spacing-s);
  }
}
```

---

## Best Practices

### 1. Token Usage

✅ **DO:**
```css
color: var(--Colors-Text-Body-Default);
padding: var(--UI-Spacing-spacing-m);
border-radius: var(--UI-Radius-radius-m);
```

❌ **DON'T:**
```css
color: #333;
padding: 16px;
border-radius: 8px;
```

### 2. Component Classes

✅ **DO:**
```html
<button class="button button-primary">Click</button>
```

❌ **DON'T:**
```html
<button class="btn btn-primary">Click</button>
```

### 3. Dark Mode

✅ **DO:** Use semantic tokens (automatic dark mode)
```css
background: var(--Colors-Backgrounds-Main-Default);
```

❌ **DON'T:** Use hardcoded colors
```css
background: #ffffff;
```

### 4. File Loading Order

✅ **DO:** Load foundations before components
```html
<!-- Foundations first -->
<link rel="stylesheet" href="colors/colors.css">
<link rel="stylesheet" href="spacing/spacing.css">
<link rel="stylesheet" href="typography/typography.css">

<!-- Then components -->
<link rel="stylesheet" href="components/button/button.css">
```

### 5. Icon Usage

✅ **DO:**
```html
<span class="icon icon-jobs icon-large icon-primary"></span>
```

❌ **DON'T:** Use inline SVG or img tags for icons
```html
<img src="icon.svg" alt="icon">
```

### 6. Accessibility

- Always include proper `alt` text for images
- Use semantic HTML (`<button>`, `<input>`, etc.)
- Ensure keyboard navigation works
- Test with screen readers

---

## File Structure

```
design-system/
├── colors/
│   ├── colors.css          # Color tokens (base + semantic)
│   ├── README.md
│   └── test.html
├── spacing/
│   ├── spacing.css          # Spacing, radius, input height tokens
│   ├── README.md
│   └── test.html
├── typography/
│   ├── typography.css        # Typography classes and font definitions
│   ├── README.md
│   └── test.html
├── fonts/
│   └── FoundersGrotesk-*.woff2
├── components/
│   ├── button/
│   │   ├── button.css
│   │   ├── README.md
│   │   └── test.html
│   ├── boxes/
│   │   ├── boxes.css
│   │   ├── README.md
│   │   └── test.html
│   ├── dropdown/
│   │   ├── dropdown.css
│   │   ├── dropdown.js
│   │   ├── README.md
│   │   └── test.html
│   ├── horizontal-cards/
│   │   ├── horizontal-cards.css
│   │   ├── horizontal-cards.js
│   │   ├── README.md
│   │   └── test.html
│   ├── icons/
│   │   ├── icons.css         # 80+ icon definitions
│   │   ├── README.md
│   │   └── test.html
│   ├── input/
│   │   ├── input.css
│   │   ├── README.md
│   │   └── test.html
│   ├── modal/
│   │   ├── modal.css
│   │   ├── modal.js
│   │   ├── README.md
│   │   └── test.html
│   ├── numeric-slider/
│   │   ├── numeric-slider.css
│   │   ├── numeric-slider.js
│   │   ├── README.md
│   │   └── test.html
│   ├── split-panel/
│   │   ├── split-panel.css
│   │   ├── split-panel.js
│   │   ├── README.md
│   │   └── test.html
│   └── tags/
│       ├── tags.css
│       ├── README.md
│       └── test.html
├── test.html                 # Test bed navigation
├── README.md
├── llms.txt                  # Quick reference for LLMs
└── agents.md                 # This file
```

---

## Testing

Each component includes a `test.html` file demonstrating usage. The main test bed is available at:

```
http://[your-server]/design-system/test.html
```

This provides:
- Sidebar navigation to all components
- Interactive examples
- Code snippets
- Visual regression testing

---

## Version Information

- **Design System Version**: Current
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **CSS Features Used**: CSS Custom Properties, CSS Grid, Flexbox, CSS Masks
- **JavaScript**: ES6 Modules (Dropdown, Numeric Slider, and Modal components)

---

## Additional Resources

- **Main README**: See `README.md` for overview
- **Component READMEs**: Each component has detailed documentation
- **Test Files**: See `test.html` files for examples
- **Demo Site**: https://codesignal.github.io/learn_bespoke-design-system/test.html

---

## Support & Contribution

For questions or issues:
1. Check component-specific README files
2. Review test.html examples
3. Inspect CSS files for available tokens and classes

