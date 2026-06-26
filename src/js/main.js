import { fetchMenuData, fetchParkData, fetchParkSelectorData } from "./api.js";
import { addFavorite } from "./storage.js";
import {
  renderHeaderMenu,
  renderParkMenu,
  renderParkData,
  setActiveSection,
  wireSectionMenus,
  setupMapModalAndPromotions,
  renderFavorites,
  renderParkSelectorUI,
} from "./render.js";
import { initFeedback } from "./feedback.js";
initFeedback();

const DEFAULT_PARK_CODE = "yell";

function getParkCodeFromQuery(defaultParkCode = DEFAULT_PARK_CODE) {
  const params = new URLSearchParams(window.location.search);
  return params.get("park") || defaultParkCode;
}

function buildParkUrl(parkCode) {
  return `${window.location.pathname}?park=${parkCode}`;
}

async function init() {
  const activeParkCode = getParkCodeFromQuery();

  const menuData = await fetchMenuData();
  const park = await fetchParkData(activeParkCode);
  const parks = await fetchParkSelectorData();

  renderHeaderMenu(menuData.menu);
  renderParkMenu(menuData.menu);
  renderParkData(park);
  renderFavorites(buildParkUrl);

  setActiveSection("info");
  wireSectionMenus();
  setupMapModalAndPromotions();
  renderParkSelectorUI(parks, activeParkCode, (parkCode, parkInfo) => {
    if (parkInfo) addFavorite({ name: parkInfo.name, parkCode: parkInfo.parkCode });
    window.location.href = buildParkUrl(parkCode);
  });
}

init();