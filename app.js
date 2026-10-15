/**
 * WanderWise Travel Planner Application Logic
 */

// Application State
let currentData = null;
let leafletMap = null;
let markerLayerGroup = null;

// DOM Elements
const searchForm = document.getElementById('search-form');
const inputLocation = document.getElementById('input-location');
const btnClearInput = document.getElementById('btn-clear-input');
const btnSearchSubmit = document.getElementById('btn-search-submit');

const loadingState = document.getElementById('loading-state');
const loadingTitle = document.getElementById('loading-title');
const welcomePlaceholder = document.getElementById('welcome-placeholder');
const itineraryContent = document.getElementById('itinerary-content');

// Content elements
const cityTitle = document.getElementById('city-title');
const cityDescription = document.getElementById('city-description');
const badgeCountry = document.getElementById('badge-country');
const cityWeatherTip = document.getElementById('city-weather-tip');
const cityTransportTip = document.getElementById('city-transport-tip');

const timelineContainer = document.getElementById('timeline-container');
const attractionsContainer = document.getElementById('attractions-container');
const restaurantsContainer = document.getElementById('restaurants-container');

// Actions & Modals
const btnCopyItinerary = document.getElementById('btn-copy-itinerary');
const btnPrintItinerary = document.getElementById('btn-print-itinerary');
const btnOpenSettings = document.getElementById('btn-open-settings');
const btnCloseSettings = document.getElementById('btn-close-settings');
const modalSettings = document.getElementById('modal-settings');
const inputGeminiKey = document.getElementById('input-gemini-key');
const btnSaveSettings = document.getElementById('btn-save-settings');
const btnClearSettings = document.getElementById('btn-clear-settings');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadSavedSettings();
  
  // Default to Taipei on first load if input is empty
  const defaultCity = "台北";
  inputLocation.value = defaultCity;
  triggerSearch(defaultCity);
});

function setupEventListeners() {
  // Search submit
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = inputLocation.value.trim();
    if (query) {
      triggerSearch(query);
    }
  });

  // Input clear button
  inputLocation.addEventListener('input', () => {
    if (inputLocation.value.trim().length > 0) {
      btnClearInput.classList.remove('hidden');
    } else {
      btnClearInput.classList.add('hidden');
    }
  });

  btnClearInput.addEventListener('click', () => {
    inputLocation.value = '';
    btnClearInput.classList.add('hidden');
    inputLocation.focus();
  });

  // Quick city chips
  document.querySelectorAll('.quick-city-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const city = btn.dataset.city;
      inputLocation.value = city;
      btnClearInput.classList.remove('hidden');
      triggerSearch(city);
    });
  });

  // Action buttons
  btnCopyItinerary.addEventListener('click', copyItineraryAsText);
  btnPrintItinerary.addEventListener('click', () => window.print());

  // Settings modal
  btnOpenSettings.addEventListener('click', () => {
    modalSettings.classList.remove('hidden');
  });

  btnCloseSettings.addEventListener('click', () => {
    modalSettings.classList.add('hidden');
  });

  modalSettings.addEventListener('click', (e) => {
    if (e.target === modalSettings) {
      modalSettings.classList.add('hidden');
    }
  });

  btnSaveSettings.addEventListener('click', () => {
    const key = inputGeminiKey.value.trim();
    if (key) {
      localStorage.setItem('wanderwise_gemini_key', key);
      showToast('Gemini API 金鑰已儲存！');
    } else {
      localStorage.removeItem('wanderwise_gemini_key');
      showToast('已恢復預設資料引擎');
    }
    modalSettings.classList.add('hidden');
  });

  btnClearSettings.addEventListener('click', () => {
    inputGeminiKey.value = '';
    localStorage.removeItem('wanderwise_gemini_key');
    showToast('已清除 API 金鑰');
    modalSettings.classList.add('hidden');
  });
}

function loadSavedSettings() {
  const savedKey = localStorage.getItem('wanderwise_gemini_key');
  if (savedKey) {
    inputGeminiKey.value = savedKey;
  }
}

/**
 * Executes destination search and UI rendering
 */
async function triggerSearch(city) {
  // Show loading
  welcomePlaceholder.classList.add('hidden');
  itineraryContent.classList.add('hidden');
  loadingState.classList.remove('hidden');
  loadingTitle.textContent = `正在為「${city}」智慧編排五大景點、五大美食與 09:00-19:00 行程...`;
  
  btnSearchSubmit.disabled = true;
  btnSearchSubmit.classList.add('opacity-70');

  try {
    const apiKey = localStorage.getItem('wanderwise_gemini_key') || '';
    const data = await fetchOrSynthesizeDestination(city, apiKey);
    currentData = data;

    renderCityOverview(data);
    renderTimeline(data.timeline);
    renderAttractions(data.attractions);
    renderRestaurants(data.restaurants);
    renderMap(data);

    // Show results
    loadingState.classList.add('hidden');
    itineraryContent.classList.remove('hidden');

    // Scroll to results on mobile
    if (window.innerWidth < 768) {
      itineraryContent.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (error) {
    console.error('Error generating itinerary:', error);
    loadingState.classList.add('hidden');
    welcomePlaceholder.classList.remove('hidden');
    alert(`規劃行程時遇到問題：${error.message || '請確認地名後重試'}`);
  } finally {
    btnSearchSubmit.disabled = false;
    btnSearchSubmit.classList.remove('opacity-70');
  }
}

/**
 * Render Header and Badges
 */
function renderCityOverview(data) {
  cityTitle.textContent = data.city || '探索目的地';
  badgeCountry.textContent = data.country || '熱門精選';
  cityDescription.textContent = data.description || '';
  cityWeatherTip.textContent = data.weatherTip || '出發前請留意氣溫與天候變化。';
  cityTransportTip.textContent = data.transportTip || '建議搭乘當地大眾捷運、公車或計程車。';
}

/**
 * Render 09:00 - 19:00 Chronological Timeline
 */
function renderTimeline(timeline) {
  timelineContainer.innerHTML = '';

  if (!timeline || timeline.length === 0) {
    timelineContainer.innerHTML = '<p class="text-slate-400">目前尚無時間軸資料</p>';
    return;
  }

  timeline.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'relative timeline-item pb-2';

    // Different icon/badge colors based on step type
    let badgeColor = 'bg-slate-100 text-slate-700';
    let iconBg = 'bg-sky-500 text-white';

    if (item.type === 'attraction') {
      badgeColor = 'bg-indigo-100 text-indigo-700';
      iconBg = 'bg-indigo-600 text-white';
    } else if (item.type === 'dining' || item.type === 'dinner') {
      badgeColor = 'bg-orange-100 text-orange-700';
      iconBg = 'bg-orange-500 text-white';
    } else if (item.type === 'cafe') {
      badgeColor = 'bg-amber-100 text-amber-700';
      iconBg = 'bg-amber-500 text-white';
    } else if (item.type === 'transit') {
      badgeColor = 'bg-emerald-100 text-emerald-700';
      iconBg = 'bg-emerald-500 text-white';
    }

    itemEl.innerHTML = `
      <!-- Timeline Node Circle -->
      <div class="absolute -left-[38px] sm:-left-[44px] top-1.5 w-8 h-8 rounded-full ${iconBg} flex items-center justify-center text-xs font-bold shadow-md z-10 border-2 border-white">
        <i class="fa-solid ${item.icon || 'fa-location-dot'}"></i>
      </div>

      <!-- Timeline Card -->
      <div class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 hover:border-sky-300 transition-all">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div class="flex items-center space-x-2.5">
            <span class="text-base font-extrabold text-sky-700 font-mono tracking-tight">
              ${item.time}
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeColor}">
              ${item.badge}
            </span>
          </div>
          <span class="text-xs text-slate-400 font-medium flex items-center">
            <i class="fa-regular fa-hourglass-half mr-1"></i>預計時長：${item.estimatedTime}
          </span>
        </div>

        <div class="mt-3 space-y-2">
          <h4 class="text-lg font-bold text-slate-800 flex items-center justify-between">
            <span>${item.title}</span>
          </h4>
          
          <p class="text-sm text-slate-600 leading-relaxed">
            ${item.description}
          </p>

          ${item.highlight ? `
            <div class="mt-2 text-xs font-medium text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-2">
              <i class="fa-solid fa-lightbulb text-amber-500 mt-0.5 shrink-0"></i>
              <span>${item.highlight}</span>
            </div>
          ` : ''}

          <div class="mt-2 text-xs text-slate-500 flex items-center space-x-1.5">
            <i class="fa-solid fa-signs-post text-slate-400"></i>
            <span><strong>交通與動線小撇步：</strong>${item.transitTip || '順路步行或搭乘大眾交通工具即可抵達。'}</span>
          </div>
        </div>
      </div>
    `;

    timelineContainer.appendChild(itemEl);
  });
}

/**
 * Render TOP 5 Attractions Grid
 */
function renderAttractions(attractions) {
  attractionsContainer.innerHTML = '';

  attractions.forEach((att, index) => {
    const card = document.createElement('div');
    card.id = `card-${att.id}`;
    card.className = 'travel-card bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col';

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(att.name + ' ' + (currentData.city || ''))}`;

    card.innerHTML = `
      <div class="relative h-48 w-full overflow-hidden bg-slate-100">
        <img 
          src="${att.image}" 
          alt="${att.name}" 
          loading="lazy"
          class="w-full h-full object-cover transition duration-300 hover:scale-105"
          onerror="this.src='https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=600&auto=format&fit=crop'"
        />
        <div class="absolute top-3 left-3 bg-sky-600 text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shadow-md">
          ${index + 1}
        </div>
        <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow">
          <i class="fa-solid fa-star text-amber-400 mr-1"></i>${att.rating}
        </div>
        <div class="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-medium text-white">
          <i class="fa-solid fa-tag mr-1 text-sky-400"></i>${att.category}
        </div>
      </div>

      <div class="p-5 flex-grow flex flex-col justify-between space-y-3">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-bold text-slate-900 line-clamp-1">${att.name}</h4>
          </div>
          
          <div class="flex items-center space-x-3 text-xs text-slate-500 font-medium">
            <span><i class="fa-regular fa-clock mr-1 text-sky-500"></i>停留 ${att.stayTime}</span>
            <span><i class="fa-solid fa-door-open mr-1 text-indigo-500"></i>${att.openHours}</span>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            ${att.description}
          </p>

          <div class="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-900 leading-normal">
            <strong><i class="fa-solid fa-camera mr-1 text-sky-600"></i>必玩重點：</strong>${att.tips}
          </div>
        </div>

        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span class="truncate max-w-[170px]" title="${att.address}">
            <i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>${att.address}
          </span>
          <a 
            href="${googleMapsUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-sky-600 hover:text-sky-800 font-bold inline-flex items-center space-x-1 shrink-0 hover:underline">
            <span>導航</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>
      </div>
    `;

    attractionsContainer.appendChild(card);
  });
}

/**
 * Render TOP 5 Restaurants Grid
 */
function renderRestaurants(restaurants) {
  restaurantsContainer.innerHTML = '';

  restaurants.forEach((res, index) => {
    const card = document.createElement('div');
    card.id = `card-${res.id}`;
    card.className = 'travel-card bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col';

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(res.name + ' ' + (currentData.city || ''))}`;

    card.innerHTML = `
      <div class="relative h-48 w-full overflow-hidden bg-slate-100">
        <img 
          src="${res.image}" 
          alt="${res.name}" 
          loading="lazy"
          class="w-full h-full object-cover transition duration-300 hover:scale-105"
          onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop'"
        />
        <div class="absolute top-3 left-3 bg-orange-600 text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shadow-md">
          ${index + 1}
        </div>
        <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow">
          <i class="fa-solid fa-star text-amber-400 mr-1"></i>${res.rating}
        </div>
        <div class="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-medium text-white flex items-center space-x-2">
          <span><i class="fa-solid fa-bowl-food mr-1 text-orange-400"></i>${res.category}</span>
          <span class="text-amber-300 font-bold font-mono">${res.priceRange || '$$'}</span>
        </div>
      </div>

      <div class="p-5 flex-grow flex flex-col justify-between space-y-3">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-bold text-slate-900 line-clamp-1">${res.name}</h4>
          </div>
          
          <div class="flex items-center space-x-3 text-xs text-slate-500 font-medium">
            <span><i class="fa-solid fa-clock mr-1 text-orange-500"></i>${res.openHours}</span>
            <span><i class="fa-solid fa-comment-dots mr-1 text-slate-400"></i>${res.reviews || '老饕盛讚'}</span>
          </div>

          <div class="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-xs text-orange-900 leading-normal">
            <strong><i class="fa-solid fa-utensils mr-1 text-orange-600"></i>招牌必點：</strong>${res.signature}
          </div>

          <p class="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            ${res.vibe}
          </p>
        </div>

        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span class="truncate max-w-[170px]" title="${res.address}">
            <i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>${res.address}
          </span>
          <a 
            href="${googleMapsUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-orange-600 hover:text-orange-800 font-bold inline-flex items-center space-x-1 shrink-0 hover:underline">
            <span>導航</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>
      </div>
    `;

    restaurantsContainer.appendChild(card);
  });
}

/**
 * Initialize / Update Leaflet Interactive Map
 */
function renderMap(data) {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  const center = data.center || [25.0330, 121.5654];
  const zoom = data.zoom || 13;

  if (!leafletMap) {
    leafletMap = L.map('map').setView(center, zoom);

    // OpenStreetMap standard tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(leafletMap);

    markerLayerGroup = L.layerGroup().addTo(leafletMap);
  } else {
    markerLayerGroup.clearLayers();
    leafletMap.setView(center, zoom);
  }

  const bounds = [];

  // Add Top 5 Attractions (Blue markers 1-5)
  data.attractions.forEach((att, idx) => {
    if (att.lat && att.lng) {
      bounds.push([att.lat, att.lng]);
      const customIcon = L.divIcon({
        className: 'custom-map-marker marker-attraction',
        html: `<span>${idx + 1}</span>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
          <b style="font-size: 14px; color: #0284c7;">${idx + 1}. ${att.name}</b><br/>
          <span style="color: #64748b;">${att.category} · ★ ${att.rating}</span><br/>
          <p style="margin: 4px 0; color: #334155;">${att.tips}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(att.name)}" target="_blank" style="color: #0284c7; font-weight: bold; text-decoration: underline;">在 Google 地圖開啟 ➔</a>
        </div>
      `;

      L.marker([att.lat, att.lng], { icon: customIcon })
        .bindPopup(popupContent)
        .addTo(markerLayerGroup);
    }
  });

  // Add Top 5 Restaurants (Orange markers 1-5)
  data.restaurants.forEach((res, idx) => {
    if (res.lat && res.lng) {
      bounds.push([res.lat, res.lng]);
      const customIcon = L.divIcon({
        className: 'custom-map-marker marker-restaurant',
        html: `<span>${idx + 1}</span>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
          <b style="font-size: 14px; color: #ea580c;">${idx + 1}. ${res.name}</b><br/>
          <span style="color: #64748b;">${res.category} · ★ ${res.rating} · ${res.priceRange}</span><br/>
          <p style="margin: 4px 0; color: #334155;"><b>必點：</b>${res.signature}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(res.name)}" target="_blank" style="color: #ea580c; font-weight: bold; text-decoration: underline;">在 Google 地圖開啟 ➔</a>
        </div>
      `;

      L.marker([res.lat, res.lng], { icon: customIcon })
        .bindPopup(popupContent)
        .addTo(markerLayerGroup);
    }
  });

  // Fit view to markers
  if (bounds.length > 0) {
    try {
      leafletMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    } catch (e) {
      console.warn("fitBounds notice:", e);
    }
  }

  // Force map resize check in case container was hidden
  setTimeout(() => {
    if (leafletMap) leafletMap.invalidateSize();
  }, 250);
}

/**
 * Copy formatted text itinerary to clipboard
 */
function copyItineraryAsText() {
  if (!currentData) return;

  let text = `========================================\n`;
  text += `🎒 智遊日誌 WanderWise · 【${currentData.city}】09:00 - 19:00 一日行程規劃\n`;
  text += `========================================\n\n`;
  text += `📍 概述：${currentData.description}\n`;
  text += `🌤️ 氣候穿著：${currentData.weatherTip}\n`;
  text += `🚇 交通建議：${currentData.transportTip}\n\n`;

  text += `----------------------------------------\n`;
  text += `⏰ 09:00 - 19:00 一日精華時間軸\n`;
  text += `----------------------------------------\n`;
  currentData.timeline.forEach((item) => {
    text += `【${item.time}】${item.title}\n`;
    text += `· 地點/活動：${item.location}\n`;
    text += `· 內容安排：${item.description}\n`;
    if (item.highlight) text += `· 亮點建議：${item.highlight}\n`;
    text += `· 交通動線：${item.transitTip}\n\n`;
  });

  text += `----------------------------------------\n`;
  text += `🏛️ TOP 5 最熱門觀光景點\n`;
  text += `----------------------------------------\n`;
  currentData.attractions.forEach((att, idx) => {
    text += `${idx + 1}. ${att.name}（★ ${att.rating} | ${att.category}）\n`;
    text += `   - 建議停留：${att.stayTime} | 開放時間：${att.openHours}\n`;
    text += `   - 特色簡介：${att.description}\n`;
    text += `   - 必玩重點：${att.tips}\n`;
    text += `   - 地址：${att.address}\n\n`;
  });

  text += `----------------------------------------\n`;
  text += `🍽️ TOP 5 必吃口碑名店\n`;
  text += `----------------------------------------\n`;
  currentData.restaurants.forEach((res, idx) => {
    text += `${idx + 1}. ${res.name}（★ ${res.rating} | ${res.priceRange} | ${res.category}）\n`;
    text += `   - 必點招牌：${res.signature}\n`;
    text += `   - 用餐氛圍：${res.vibe}\n`;
    text += `   - 營業時間：${res.openHours}\n`;
    text += `   - 地址：${res.address}\n\n`;
  });

  text += `祝您旅途平安愉快！由 WanderWise 智慧規劃`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('一日行程清單已成功複製至剪貼簿！');
  }).catch(() => {
    showToast('複製失敗，請手動複製');
  });
}

/**
 * Toast helper
 */
function showToast(msg) {
  toastMessage.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}
