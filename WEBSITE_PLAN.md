# Technical Plan: Interactive Meal Plan Website

This document outlines the technical plan for converting the `meal-plan.md` file into a simple, modern, and interactive static website. The website will be suitable for deployment on GitHub Pages.

---

## 1. Analysis of Source Data

The source `meal-plan.md` file contains three main parts:

1.  **A weekly meal schedule:** Organized by day, detailing breakfast, lunch, and dinner.
2.  **Shopping List 1 (Sunday):** A list of groceries with checkboxes, categorized, and provided in both Russian and Czech.
3.  **Shopping List 2 (Wednesday/Thursday):** A second list of groceries, also with checkboxes, categories, and dual-language versions.

The goal is to represent this information in a user-friendly, interactive web interface.

---

## 2. Proposed File Structure

A minimal file structure is sufficient for this project. All files will be in the root directory.

```
/
|-- index.html       # The main HTML file
|-- style.css        # The stylesheet for design and layout
`-- script.js        # The JavaScript for interactivity
```

---

## 3. HTML Layout (`index.html`)

The HTML will use semantic tags to ensure accessibility and a logical document structure.

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Недельный План Питания</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <header>
      <h1>Недельный План Питания</h1>
      <p>
        Вкусные, энергетические блюда с минимальным ежедневным временем на
        готовку.
      </p>
    </header>

    <main>
      <section id="meal-plan">
        <h2>План Питания</h2>
        <!-- Meal plan content will be hardcoded here -->
        <article>
          <h3>Воскресенье</h3>
          <ul>
            <li>
              <b>Ужин:</b> Запеченные в духовке куриные бедра с гречкой и свежим
              салатом.
            </li>
            <li>
              <b>Задача:</b> Запечь большую партию куриных бедер и сварить
              гречку.
            </li>
          </ul>
        </article>
        <!-- ... other days of the week ... -->
      </section>

      <section id="shopping-lists">
        <h2>Списки Покупок</h2>
        <div class="language-switcher">
          <button id="lang-ru" class="active">Русский</button>
          <button id="lang-cz">Česky</button>
        </div>

        <div id="trip-1" class="shopping-trip">
          <h3>Заход 1 (Воскресенье)</h3>
          <div id="trip-1-ru" class="list-container"></div>
          <div id="trip-1-cz" class="list-container hidden"></div>
        </div>

        <div id="trip-2" class="shopping-trip">
          <h3>Заход 2 (Среда/Четверг)</h3>
          <div id="trip-2-ru" class="list-container"></div>
          <div id="trip-2-cz" class="list-container hidden"></div>
        </div>
      </section>
    </main>

    <footer>
      <p>Создано на основе markdown-файла.</p>
    </footer>

    <script src="script.js"></script>
  </body>
</html>
```

---

## 4. JavaScript Interactivity (`script.js`)

The JavaScript will handle the dynamic creation of shopping lists and user interactions.

- **Data Storage:** The shopping list items will be stored in a structured JavaScript object at the top of the file. This makes the data easy to manage and separate from the presentation logic.

  ```javascript
  const shoppingData = {
    trip1: {
      ru: {
        /* Russian categories and items */
      },
      cz: {
        /* Czech categories and items */
      },
    },
    trip2: {
      ru: {
        /* ... */
      },
      cz: {
        /* ... */
      },
    },
  };
  ```

- **Dynamic List Generation:**

  - A function `renderList(tripId, lang)` will be created.
  - This function will target the appropriate container (e.g., `#trip-1-ru`) and dynamically create the HTML for the categories (`<h4>`) and list items (`<ul>` and `<li>`).
  - Each list item `<li>` will contain an `<input type="checkbox">` and a `<label>`.
  - This function will be called for both trips and both languages when the page loads (`DOMContentLoaded`).

- **Checkbox Interaction:**

  - An event listener will be attached to the parent container for all shopping lists (event delegation).
  - When a checkbox is clicked, a `.checked` class will be toggled on the parent `<li>` element. CSS will then apply a `text-decoration: line-through` and reduced opacity to the label.
  - State does **not** need to persist on page refresh.

- **Language Switcher:**
  - Event listeners on the "Русский" and "Česky" buttons will control which lists are visible.
  - Clicking a language button will add/remove a `.hidden` class to the corresponding list containers (e.g., `#trip-1-ru`, `#trip-1-cz`).
  - An `.active` class on the button itself will provide visual feedback for the selected language.

---

## 5. CSS Design (`style.css`)

The design will be clean, modern, and responsive.

- **Layout:**

  - `display: flex` or `display: grid` will be used on the `main` element to create a two-column layout on desktop screens (e.g., meal plan on the left, shopping lists on the right) and a single-column layout on mobile.
  - A `max-width` on the main container will ensure readability on very wide screens.

- **Typography:**

  - **Font:** `Montserrat` from Google Fonts for headings and body text for a clean, modern feel.
  - **Hierarchy:** Clear differentiation in font size and weight for `h1`, `h2`, `h3`, etc.

- **Color Palette:**

  - **Background:** Soft off-white (`#f7f7f7`)
  - **Text:** Dark gray (`#333333`)
  - **Primary Accent:** A modern teal (`#1abc9c`) for buttons, links, and checkbox highlights.
  - **Container Background:** White (`#ffffff`) with a subtle `box-shadow` for cards/sections to lift them off the page.

- **Component Styling:**
  - **Cards:** The `<article>` and `.shopping-trip` elements will be styled as "cards" with padding, border-radius, and a light box-shadow.
  - **Checkboxes:** Custom-styled checkboxes for a more polished look than the browser default.
  - **Buttons:** The language switcher buttons will have clear hover and active states.

---

## 6. Deployment

The resulting static website (consisting of `index.html`, `style.css`, and `script.js`) can be deployed for free on **GitHub Pages** by pushing the code to a GitHub repository and enabling the Pages feature in the repository settings.
