document.addEventListener("DOMContentLoaded", () => {
  const shoppingData = {
    trip1: {
      ru: {
        "Овощи и Фрукты": [
          "Лимоны (2 шт)",
          "Помидоры (~500 г)",
          "Огурцы (2 больших)",
          "Листья салата/микс зелени (1-2 упаковки)",
          "Цветная капуста (1 большая головка)",
        ],
        "Мясо/Белок": ["Куриные бедра (~1.5 кг)", "Яйца (1 десяток)"],
        "Молочные продукты": ["Греческий йогурт (1 большая упаковка)"],
        Бакалея: [
          "Гречка (~500 г)",
          "Грецкие орехи (~200 г)",
          "Цельнозерновой хлеб (1 буханка)",
          "Консервированный чечевичный суп (1)",
          "Тахини (1)",
          "Мед (1)",
          "_Проверить наличие дома: Оливковое масло, уксус, специи._",
        ],
      },
      cz: {
        "Ovoce a Zelenina": [
          "Citróny (2 ks)",
          "Rajčata (~500g)",
          "Okurky (2 velké)",
          "Salát/mix salátů (1-2 balení)",
          "Květák (1 velká hlávka)",
        ],
        "Maso/Bílkoviny": ["Kuřecí stehna (~1.5 kg)", "Vejce (10 ks)"],
        "Mléčné výrobky": ["Řecký jogurt (1 velké balení)"],
        "Trvanlivé potraviny": [
          "Pohanka (~500g)",
          "Vlašské ořechy (~200g)",
          "Celozrnný chléb (1 bochník)",
          "Konzervovaná čočková polévka (1)",
          "Tahini (1)",
          "Med (1)",
          "_Zkontrolovat doma: Olivový olej, ocet, koření._",
        ],
      },
    },
    trip2: {
      ru: {
        "Овощи и Фрукты": [
          "Болгарский перец (~2-3 шт для стир-фрая)",
          "Лук (1-2 шт для стир-фрая)",
          "Шампиньоны (~400 г)",
          "Имбирь и Чеснок (если нужно)",
          "Морковь (1 пакет для супа)",
          "Сельдерей (1 пучок для супа)",
          "Ягоды (1-2 упаковки)",
        ],
        "Мясо/Белок": ["Куриная грудка/бедра (~800 г для стир-фрая)"],
        Бакалея: [
          "Овсяные хлопья (~500 г)",
          "Красная чечевица (~400 г)",
          "Курага (~100 г)",
          "Свежий хлеб (для супа)",
          "Соевый соус (если нет)",
        ],
      },
      cz: {
        "Ovoce a Zelenina": [
          "Papriky (~2-3 ks na stir-fry)",
          "Cibule (1-2 ks na stir-fry)",
          "Žampiony (~400g)",
          "Zázvor a Česnek (pokud je potřeba)",
          "Mrkev (1 sáček do polévky)",
          "Celer (1 svazek do polévky)",
          "Bobule (1-2 vaničky)",
        ],
        "Maso/Bílkoviny": ["Kuřecí prsa/stehna (~800g na stir-fry)"],
        "Trvanlivé potraviny": [
          "Ovesné vločky (~500g)",
          "Červená čočka (~400g)",
          "Sušené meruňky (~100g)",
          "Čerstvý chléb (k polévce)",
          "Sójová omáčka (pokud není)",
        ],
      },
    },
  };

  function renderList(tripId, lang) {
    const container = document.getElementById(`${tripId}-${lang}`);
    if (!container) return;

    const tripData =
      tripId === "trip-1" ? shoppingData.trip1 : shoppingData.trip2;
    const langData = tripData[lang];
    let html = "";

    for (const category in langData) {
      html += `<h4>${category}</h4>`;
      html += "<ul>";
      langData[category].forEach((item, index) => {
        const itemId = `${tripId}-${lang}-${category.replace(
          /\s+/g,
          "-"
        )}-${index}`;
        html += `
          <li>
            <input type="checkbox" id="${itemId}">
            <label for="${itemId}">${item}</label>
          </li>
        `;
      });
      html += "</ul>";
    }
    container.innerHTML = html;
  }

  function getCheckboxKey(checkbox) {
    const label = checkbox.nextElementSibling;
    if (!label) return null;
    const itemText = label.textContent;
    const listContainer = checkbox.closest(".list-container");
    if (!listContainer) return null;
    const listId = listContainer.id;
    return `${listId}_${itemText}`;
  }

  function saveCheckboxState(checkbox) {
    const key = getCheckboxKey(checkbox);
    if (key) {
      localStorage.setItem(key, checkbox.checked);
    }
  }

  function loadCheckboxStates() {
    const checkboxes = document.querySelectorAll(
      '#shopping-lists input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      const key = getCheckboxKey(checkbox);
      if (key) {
        const savedState = localStorage.getItem(key);
        if (savedState !== null) {
          checkbox.checked = savedState === "true";
          checkbox.parentElement.classList.toggle("checked", checkbox.checked);
        }
      }
    });
  }

  function setupLanguageSwitcher() {
    const ruButton = document.getElementById("lang-ru");
    const czButton = document.getElementById("lang-cz");

    function switchLanguage(lang) {
      document
        .getElementById("trip-1-ru")
        .classList.toggle("hidden", lang !== "ru");
      document
        .getElementById("trip-1-cz")
        .classList.toggle("hidden", lang !== "cz");
      document
        .getElementById("trip-2-ru")
        .classList.toggle("hidden", lang !== "ru");
      document
        .getElementById("trip-2-cz")
        .classList.toggle("hidden", lang !== "cz");

      ruButton.classList.toggle("active", lang === "ru");
      czButton.classList.toggle("active", lang === "cz");
    }

    ruButton.addEventListener("click", () => switchLanguage("ru"));
    czButton.addEventListener("click", () => switchLanguage("cz"));
  }

  function setupCheckboxInteraction() {
    const shoppingLists = document.getElementById("shopping-lists");
    shoppingLists.addEventListener("change", (event) => {
      if (event.target.type === "checkbox") {
        event.target.parentElement.classList.toggle(
          "checked",
          event.target.checked
        );
        saveCheckboxState(event.target);
      }
    });
  }

  // Initial Render
  renderList("trip-1", "ru");
  renderList("trip-1", "cz");
  renderList("trip-2", "ru");
  renderList("trip-2", "cz");

  setupLanguageSwitcher();
  setupCheckboxInteraction();
  loadCheckboxStates();
});
