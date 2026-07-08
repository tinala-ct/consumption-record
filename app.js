import QR_DEFAULTS from './qr_defaults.js';

// Translation Dictionary
const TRANSLATIONS = {
  en: {
    home_today_total: "Today's Total",
    home_recent_expenses: "Recent Expenses",
    home_search_filter: "Search / Filter",
    home_no_expenses: "No expenses recorded today. Tap the + button to add one!",
    add_title: "Add Expense",
    add_edit_title: "Edit Expense",
    add_category_label: "Category",
    add_desc_label: "Description / Note",
    add_desc_placeholder: "What did you buy?",
    add_method_label: "Payment Method",
    add_date_label: "Date",
    add_time_label: "Time",
    add_cancel_btn: "Cancel",
    add_save_btn: "Save Expense",
    report_title: "Expense Report",
    report_subtitle: "Select date range to view and export reports.",
    report_start_label: "START DATE",
    report_end_label: "END DATE",
    report_search_placeholder: "Search by keyword...",
    report_all_cats: "All Categories",
    report_all_methods: "All Methods",
    report_generate_btn: "Generate Report",
    report_summary_title: "Report Summary",
    report_total_label: "Total",
    report_count_label: "Count",
    report_average_label: "Average",
    report_highest_label: "Highest",
    report_breakdown_title: "Category Breakdown",
    report_items_title: "Transaction Items",
    report_export_btn: "📄 Export PDF Report",
    settings_title: "Settings",
    settings_sheet_title: "Google Sheet Integration",
    settings_sheet_label: "Spreadsheet ID or URL",
    settings_api_label: "Google Apps Script Web App API URL",
    settings_update_btn: "Update Connections",
    settings_pref_title: "Preferences",
    settings_lang_label: "Language",
    settings_dark_label: "Dark Mode",
    settings_currency_label: "Currency Symbol",
    settings_qr_title: "QR Code Payment (PDF)",
    settings_qr_label: "Choose QR Image Source",
    settings_custom_qr_label: "CUSTOM QR CODE IMAGE",
    settings_custom_qr_placeholder: "Drag & Drop or Tap to Upload QR Code",
    settings_cat_title: "Category Management",
    settings_add_cat_label: "ADD NEW CATEGORY",
    settings_cat_name_placeholder: "Category Name",
    settings_cat_icon_placeholder: "Icon (e.g. 🍕)",
    settings_add_cat_btn: "Add",
    settings_version: "Expense App v1.0.0",
    settings_conn_mock: "Mock Mode (Local)",
    settings_conn_live: "Google Sheets (Live)",
    settings_conn_api: "Connected (API Mode)",
    dialog_delete_title: "Delete Expense?",
    dialog_delete_body: "Are you sure you want to delete this expense transaction? This action cannot be undone.",
    dialog_delete_cancel: "Cancel",
    dialog_delete_confirm: "Delete",
    nav_home: "Home",
    nav_add: "Add",
    nav_reports: "Reports",
    nav_settings: "Settings"
  },
  th: {
    home_today_total: "ยอดใช้จ่ายวันนี้",
    home_recent_expenses: "รายการล่าสุด",
    home_search_filter: "ค้นหา / กรอง",
    home_no_expenses: "ยังไม่มีรายการวันนี้ กดปุ่ม + เพื่อเพิ่มรายการ!",
    add_title: "บันทึกรายจ่าย",
    add_edit_title: "แก้ไขรายจ่าย",
    add_category_label: "หมวดหมู่",
    add_desc_label: "รายละเอียด / บันทึก",
    add_desc_placeholder: "ซื้ออะไรมาบ้าง?",
    add_method_label: "ช่องทางการชำระเงิน",
    add_date_label: "วันที่",
    add_time_label: "เวลา",
    add_cancel_btn: "ยกเลิก",
    add_save_btn: "บันทึกรายการ",
    report_title: "รายงานค่าใช้จ่าย",
    report_subtitle: "เลือกช่วงเวลาในการกรองข้อมูลและออกรายงาน PDF",
    report_start_label: "วันที่เริ่มต้น",
    report_end_label: "วันที่สิ้นสุด",
    report_search_placeholder: "ค้นหาด้วยคำค้น...",
    report_all_cats: "ทุกหมวดหมู่",
    report_all_methods: "ทุกช่องทางชำระเงิน",
    report_generate_btn: "สร้างรายงาน",
    report_summary_title: "สรุปผลรายงาน",
    report_total_label: "ยอดรวม",
    report_count_label: "จำนวนรายการ",
    report_average_label: "เฉลี่ยต่อรายการ",
    report_highest_label: "ยอดจ่ายสูงสุด",
    report_breakdown_title: "สัดส่วนแบ่งตามหมวดหมู่",
    report_items_title: "รายละเอียดรายการย่อย",
    report_export_btn: "📄 ดาวน์โหลดรายงาน PDF",
    settings_title: "ตั้งค่า",
    settings_sheet_title: "เชื่อมต่อกับ Google Sheet",
    settings_sheet_label: "Spreadsheet ID หรือ ลิงก์ชีท",
    settings_api_label: "ลิงก์ Google Apps Script API Web App",
    settings_update_btn: "อัปเดตการเชื่อมต่อ",
    settings_pref_title: "การกำหนดค่าตัวเลือก",
    settings_lang_label: "ภาษา (Language)",
    settings_dark_label: "โหมดมืด (Dark Mode)",
    settings_currency_label: "สัญลักษณ์สกุลเงิน",
    settings_qr_title: "รูปภาพ QR Code (บน PDF)",
    settings_qr_label: "เลือกแหล่งที่มาของรูป QR",
    settings_custom_qr_label: "อัปโหลดรูป QR Code ของคุณ",
    settings_custom_qr_placeholder: "วางไฟล์ หรือ คลิกตรงนี้เพื่ออัปโหลด QR Code",
    settings_cat_title: "จัดการหมวดหมู่รายจ่าย",
    settings_add_cat_label: "เพิ่มหมวดหมู่ใหม่",
    settings_cat_name_placeholder: "ชื่อหมวดหมู่",
    settings_cat_icon_placeholder: "ไอคอน (เช่น 🍕)",
    settings_add_cat_btn: "เพิ่ม",
    settings_version: "แอปบันทึกรายจ่าย v1.0.0",
    settings_conn_mock: "ระบบทดลอง (LocalStorage)",
    settings_conn_live: "เชื่อมต่อ Google Sheets โดยตรง",
    settings_conn_api: "เชื่อมต่อผ่านระบบ API เรียบร้อย",
    dialog_delete_title: "ลบรายการนี้?",
    dialog_delete_body: "คุณแน่ใจหรือไม่ว่าต้องการลบรายการจ่ายนี้? การกระทำนี้ไม่สามารถย้อนกลับได้",
    dialog_delete_cancel: "ยกเลิก",
    dialog_delete_confirm: "ลบข้อมูล",
    nav_home: "หน้าหลัก",
    nav_add: "เพิ่ม",
    nav_reports: "รายงาน",
    nav_settings: "ตั้งค่า"
  }
};

const DEFAULT_CATEGORIES_EN = [
  { id: 'food', name: 'Food & Drinks', icon: '🍽️', color: '#10B981' },
  { id: 'travel', name: 'Transport', icon: '🚗', color: '#3B82F6' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#EC4899' },
  { id: 'bills', name: 'Bills & Utilities', icon: '⚡', color: '#F59E0B' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#8B5CF6' },
  { id: 'other', name: 'Others', icon: '📦', color: '#6B7280' }
];

const DEFAULT_CATEGORIES_TH = [
  { id: 'food', name: 'อาหารและเครื่องดื่ม', icon: '🍽️', color: '#10B981' },
  { id: 'travel', name: 'เดินทางและรถยนต์', icon: '🚗', color: '#3B82F6' },
  { id: 'shopping', name: 'ซื้อของ ช้อปปิ้ง', icon: '🛍️', color: '#EC4899' },
  { id: 'bills', name: 'ค่าสาธารณูปโภค', icon: '⚡', color: '#F59E0B' },
  { id: 'entertainment', name: 'ความบันเทิง', icon: '🎬', color: '#8B5CF6' },
  { id: 'other', name: 'อื่นๆ', icon: '📦', color: '#6B7280' }
];

const DEFAULT_GAS_API_URL = 'https://script.google.com/macros/s/AKfycbzsR9LTOl0GlkpA-lgM4qZeUUkFeXLxrwBwEUj2uNizfHkOdiIDiawDmifw85_tfyBg/exec';

// Application State
let state = {
  expenses: [],
  settings: {
    categories: [],
    currency: '฿',
    qr_code_mode: 'default2',
    custom_qr_base64: '',
    language: 'en'
  },
  currentEditingId: null,
  activeTab: 'home',
  isGAS: typeof google !== 'undefined' && google.script && google.script.run
};

// DOM Elements
const elements = {
  toast: document.getElementById('toast'),
  loading: document.getElementById('loading-overlay'),
  contentArea: document.getElementById('content-area'),
  
  // Navigation
  navItems: document.querySelectorAll('.nav-item'),
  tabPages: document.querySelectorAll('.tab-page'),
  homeFab: document.getElementById('home-fab'),
  btnSeeAll: document.getElementById('btn-see-all-expenses'),
  
  // Home Tab
  homeTodayTotal: document.getElementById('home-today-total'),
  homeTodayCount: document.getElementById('home-today-count'),
  homeMonthTotal: document.getElementById('home-month-total'),
  homeTxnList: document.getElementById('home-transaction-list'),
  
  // Add Expense Tab
  addAmount: document.getElementById('add-amount'),
  addCategoryGrid: document.getElementById('add-category-grid'),
  addDesc: document.getElementById('add-desc'),
  addPaymentPicker: document.getElementById('add-payment-picker'),
  addDate: document.getElementById('add-date'),
  addTime: document.getElementById('add-time'),
  btnSaveExpense: document.getElementById('btn-save-expense'),
  btnCancelAdd: document.getElementById('btn-cancel-add'),
  addPageTitle: document.getElementById('add-page-title'),
  
  // Reports Tab
  reportStartDate: document.getElementById('report-start-date'),
  reportEndDate: document.getElementById('report-end-date'),
  reportSearchKeyword: document.getElementById('report-search-keyword'),
  reportFilterCategory: document.getElementById('report-filter-category'),
  reportFilterMethod: document.getElementById('report-filter-method'),
  btnGenerateReport: document.getElementById('btn-generate-report'),
  reportPreviewSection: document.getElementById('report-preview-section'),
  reportStatTotal: document.getElementById('report-stat-total'),
  reportStatCount: document.getElementById('report-stat-count'),
  reportStatAvg: document.getElementById('report-stat-avg'),
  reportStatMax: document.getElementById('report-stat-max'),
  reportCategoryBreakdown: document.getElementById('report-category-breakdown'),
  reportTxnList: document.getElementById('report-transaction-list'),
  btnExportPdf: document.getElementById('btn-export-pdf'),
  
  // Settings Tab
  settingsSheetId: document.getElementById('settings-sheet-id'),
  settingsGasApiUrl: document.getElementById('settings-gas-api-url'),
  btnSaveSheetId: document.getElementById('btn-save-sheet-id'),
  settingsLanguage: document.getElementById('settings-language'),
  settingsDarkMode: document.getElementById('settings-dark-mode'),
  settingsCurrency: document.getElementById('settings-currency'),
  settingsQrMode: document.getElementById('settings-qr-mode'),
  settingsCustomQrContainer: document.getElementById('settings-custom-qr-container'),
  qrUploadArea: document.getElementById('qr-upload-area'),
  qrFileInput: document.getElementById('qr-file-input'),
  qrPreviewImage: document.getElementById('qr-preview-image'),
  qrPreviewPlaceholder: document.getElementById('qr-preview-placeholder'),
  settingsCategoryList: document.getElementById('settings-category-list'),
  newCatName: document.getElementById('new-cat-name'),
  newCatIcon: document.getElementById('new-cat-icon'),
  newCatColor: document.getElementById('new-cat-color'),
  btnAddCategory: document.getElementById('btn-add-category'),
  connectionStatus: document.getElementById('settings-connection-status'),
  
  // Delete Dialog
  deleteDialog: document.getElementById('delete-confirm-dialog'),
  btnConfirmDelete: document.getElementById('btn-confirm-delete')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupAddForm();
  setupSettingsForm();
  setupReportsTab();
  setupDeleteDialog();
  loadThemeAndSettings();
  syncConnectionStatus();
  fetchData();
});

// Toast Helper
function showToast(message, isSuccess = true) {
  elements.toast.textContent = message;
  elements.toast.style.backgroundColor = isSuccess ? 'var(--text-main)' : 'var(--danger)';
  elements.toast.classList.add('show');
  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 2500);
}

// Loading Spinner Helper
function showLoading(show) {
  if (show) {
    elements.loading.classList.add('show');
  } else {
    elements.loading.classList.remove('show');
  }
}

// Navigation Setup
function setupNavigation() {
  elements.navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  elements.homeFab.addEventListener('click', () => {
    prepareAddForm();
    switchTab('add');
  });

  elements.btnSeeAll.addEventListener('click', () => {
    switchTab('reports');
  });
}

function switchTab(tabName) {
  state.activeTab = tabName;
  
  elements.navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  elements.tabPages.forEach(page => {
    if (page.id === `tab-${tabName}`) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  elements.contentArea.scrollTop = 0;

  if (tabName === 'home') {
    elements.homeFab.style.display = 'flex';
  } else {
    elements.homeFab.style.display = 'none';
  }

  if (tabName === 'reports') {
    if (!elements.reportStartDate.value || !elements.reportEndDate.value) {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      elements.reportStartDate.value = formatDateString(firstDay);
      elements.reportEndDate.value = formatDateString(today);
    }
  }
}

function formatDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Unified Backend Caller
function callBackend(action, data = {}) {
  if (state.isGAS) {
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        [action](data);
    });
  }
  
  const settingsStr = localStorage.getItem('settings');
  let gasApiUrl = settingsStr ? JSON.parse(settingsStr).GAS_API_URL : '';
  
  if (!gasApiUrl) {
    gasApiUrl = DEFAULT_GAS_API_URL;
  }
  
  if (gasApiUrl) {
    return fetch(`${gasApiUrl}?action=${action}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify({ action, data })
    })
    .then(response => response.json())
    .then(res => {
      if (res && (res.success === false || res.error)) {
        throw new Error(res.error || 'Server error');
      }
      return res;
    });
  }
  
  return runMockApi(action, data);
}

function runMockApi(action, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const storedExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
        const storedSettings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : null;
        const currentSettings = storedSettings || state.settings;
        
        switch (action) {
          case 'initDatabase':
            resolve({ success: true, message: 'Database initialized locally' });
            break;
            
          case 'getExpenses':
            resolve(storedExpenses);
            break;
            
          case 'addExpense':
            const newExp = {
              ...data,
              ID: 'exp_' + new Date().getTime() + '_' + Math.floor(Math.random() * 1000)
            };
            storedExpenses.unshift(newExp);
            localStorage.setItem('expenses', JSON.stringify(storedExpenses));
            resolve({ success: true, id: newExp.ID });
            break;
            
          case 'updateExpense':
            const updateIdx = storedExpenses.findIndex(e => e.ID === data.id);
            if (updateIdx !== -1) {
              storedExpenses[updateIdx] = { ...storedExpenses[updateIdx], ...data.expense };
              localStorage.setItem('expenses', JSON.stringify(storedExpenses));
              resolve({ success: true });
            } else {
              reject(new Error('Expense not found'));
            }
            break;
            
          case 'deleteExpense':
            const filtered = storedExpenses.filter(e => e.ID !== data.id);
            localStorage.setItem('expenses', JSON.stringify(filtered));
            resolve({ success: true });
            break;
            
          case 'getSettings':
            resolve(currentSettings);
            break;
            
          case 'saveSettings':
            const newSettings = { ...currentSettings, ...data };
            localStorage.setItem('settings', JSON.stringify(newSettings));
            resolve({ success: true });
            break;
            
          default:
            reject(new Error('Unknown action: ' + action));
        }
      } catch (err) {
        reject(err);
      }
    }, 150);
  });
}

// Sync connection status in Settings footer
function syncConnectionStatus() {
  const settingsStr = localStorage.getItem('settings');
  let gasApiUrl = settingsStr ? JSON.parse(settingsStr).GAS_API_URL : '';
  
  if (!gasApiUrl) {
    gasApiUrl = DEFAULT_GAS_API_URL;
  }
  
  const lang = state.settings.language || 'en';

  if (state.isGAS) {
    elements.connectionStatus.textContent = TRANSLATIONS[lang].settings_conn_live;
    elements.connectionStatus.style.color = 'var(--primary)';
  } else if (gasApiUrl) {
    elements.connectionStatus.textContent = TRANVAL_API_STATUS_CON(lang);
    elements.connectionStatus.style.color = 'var(--primary)';
  } else {
    elements.connectionStatus.textContent = TRANSLATIONS[lang].settings_conn_mock;
    elements.connectionStatus.style.color = 'var(--text-sub)';
  }
}

// Helper to get api text status
function TRANVAL_API_STATUS_CON(lang) {
  return TRANSLATIONS[lang].settings_conn_api;
}

// Translate Page DOM Elements
function applyLanguage() {
  const lang = state.settings.language || 'en';
  
  // Set dropdown language value
  if (elements.settingsLanguage) {
    elements.settingsLanguage.value = lang;
  }

  // Translate standard text tags
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = TRANSLATIONS[lang][key];
    if (text) {
      el.textContent = text;
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = TRANSLATIONS[lang][key];
    if (text) {
      el.placeholder = text;
    }
  });

  // Update dynamic titles based on add/edit states
  if (state.currentEditingId) {
    elements.addPageTitle.textContent = TRANSLATIONS[lang].add_edit_title;
  } else {
    elements.addPageTitle.textContent = TRANSLATIONS[lang].add_title;
  }
}

// Fetch Expenses and Settings from DB/Mock
function fetchData() {
  showLoading(true);
  
  callBackend('getExpenses')
    .then(expenses => {
      state.expenses = Array.isArray(expenses) ? expenses : [];
      return callBackend('getSettings');
    })
    .then(settings => {
      if (settings && typeof settings === 'object') {
        state.settings = { ...state.settings, ...settings };
      }
      
      const lang = state.settings.language || 'en';
      
      // Load default categories depending on language if none exist
      if (!state.settings.categories || state.settings.categories.length === 0) {
        state.settings.categories = lang === 'th' ? [...DEFAULT_CATEGORIES_TH] : [...DEFAULT_CATEGORIES_EN];
      }

      // Update inputs UI in Settings
      const localSettingsStr = localStorage.getItem('settings');
      if (localSettingsStr) {
        const local = JSON.parse(localSettingsStr);
        if (local.GAS_API_URL && elements.settingsGasApiUrl) {
          elements.settingsGasApiUrl.value = local.GAS_API_URL;
        }
      }

      applyLanguage();
      renderAll();
      showLoading(false);
    })
    .catch(err => {
      console.error(err);
      showToast('Error syncing with database. Check API URL.', false);
      
      // Fallback locally
      const storedExpenses = localStorage.getItem('expenses');
      if (storedExpenses) {
        state.expenses = JSON.parse(storedExpenses);
      }
      
      const storedSettings = localStorage.getItem('settings');
      if (storedSettings) {
        state.settings = { ...state.settings, ...JSON.parse(storedSettings) };
      }
      
      if (!state.settings.categories || state.settings.categories.length === 0) {
        state.settings.categories = state.settings.language === 'th' ? [...DEFAULT_CATEGORIES_TH] : [...DEFAULT_CATEGORIES_EN];
      }

      applyLanguage();
      renderAll();
      showLoading(false);
    });
}

// Render dynamic components
function renderAll() {
  updateCurrencySymbols();
  renderDashboard();
  renderRecentExpenses();
  renderCategoryGrid();
  renderSettingsCategories();
  updateQRUploadSection();
}

function updateCurrencySymbols() {
  document.querySelectorAll('.currency-symbol').forEach(el => {
    el.textContent = state.settings.currency || '฿';
  });
  document.querySelectorAll('.currency-symbol-input').forEach(el => {
    el.textContent = state.settings.currency || '฿';
  });
}

// Render Dashboard (Today's Summary)
function renderDashboard() {
  const todayStr = formatDateString(new Date());
  const todayExpenses = state.expenses.filter(e => e.Date === todayStr);
  const lang = state.settings.language || 'en';
  
  const todayTotal = todayExpenses.reduce((sum, e) => sum + parseFloat(e.Amount || 0), 0);
  const todayCount = todayExpenses.length;
  
  elements.homeTodayTotal.textContent = todayTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  const txnLabel = lang === 'th' ? `${todayCount} รายการ` : `${todayCount} transaction${todayCount === 1 ? '' : 's'}`;
  elements.homeTodayCount.textContent = txnLabel;

  // Month Total
  const currentYearMonth = todayStr.substring(0, 7); // "YYYY-MM"
  const monthExpenses = state.expenses.filter(e => e.Date.startsWith(currentYearMonth));
  const monthTotal = monthExpenses.reduce((sum, e) => sum + parseFloat(e.Amount || 0), 0);
  
  const monthLabel = lang === 'th' ? `เดือนนี้ใช้จ่าย ฿${monthTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${state.settings.currency}${monthTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} this month`;
  elements.homeMonthTotal.textContent = monthLabel;
}

// Render Recent Expenses List
function renderRecentExpenses() {
  elements.homeTxnList.innerHTML = '';
  
  const recent = state.expenses.slice(0, 10);
  const lang = state.settings.language || 'en';
  
  if (recent.length === 0) {
    elements.homeTxnList.innerHTML = `
      <div class="card" style="text-align: center; color: var(--text-muted); padding: 30px 10px;">
        ${TRANSLATIONS[lang].home_no_expenses}
      </div>
    `;
    return;
  }
  
  recent.forEach(exp => {
    const categoryObj = state.settings.categories.find(c => c.id === exp.Category) || {
      name: exp.Category,
      icon: '📦',
      color: '#6B7280'
    };
    
    const card = document.createElement('div');
    card.className = 'transaction-card';
    card.setAttribute('data-id', exp.ID);
    
    card.innerHTML = `
      <div class="category-icon-wrapper" style="background-color: ${categoryObj.color}15; color: ${categoryObj.color}">
        ${categoryObj.icon}
      </div>
      <div class="card-details">
        <div class="card-title">${exp.Description || categoryObj.name}</div>
        <div class="card-subtitle">
          <span>${exp.Time || '00:00'}</span>
          <span>•</span>
          <span>${formatDateDisplay(exp.Date)}</span>
        </div>
      </div>
      <div class="card-amount-wrapper">
        <div class="card-amount">${state.settings.currency}${parseFloat(exp.Amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div class="card-method">${exp['Payment Method'] || 'QR Code'}</div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      openTransactionOptions(exp);
    });
    
    elements.homeTxnList.appendChild(card);
  });
}

function formatDateDisplay(dateStr) {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  const lang = state.settings.language || 'en';
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (formatDateString(today) === dateStr) {
    return lang === 'th' ? 'วันนี้' : 'Today';
  }
  if (formatDateString(yesterday) === dateStr) {
    return lang === 'th' ? 'เมื่อวาน' : 'Yesterday';
  }
  
  const options = lang === 'th' 
    ? { month: 'short', day: 'numeric', year: 'numeric' }
    : { month: 'short', day: 'numeric' };
  return date.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', options);
}

// Context Actions for a Transaction (Edit/Delete options)
function openTransactionOptions(expense) {
  const lang = state.settings.language || 'en';
  const confirmMsg = lang === 'th'
    ? `จัดการรายการใช้จ่าย:\n"${expense.Description || expense.Category}" จำนวน ฿${expense.Amount}\n\nกด OK เพื่อแก้ไขรายการ, กด Cancel เพื่อลบรายการ`
    : `Manage Expense:\n"${expense.Description || expense.Category}" for ${state.settings.currency}${expense.Amount}\n\nClick OK to Edit, Cancel to Delete (or close)`;

  const action = confirm(confirmMsg);
  if (action) {
    editExpense(expense);
  } else {
    openDeleteConfirmDialog(expense.ID);
  }
}

// Edit Mode
function editExpense(expense) {
  state.currentEditingId = expense.ID;
  const lang = state.settings.language || 'en';
  elements.addPageTitle.textContent = TRANSLATIONS[lang].add_edit_title;
  elements.addAmount.value = expense.Amount;
  
  const categoryOption = elements.addCategoryGrid.querySelector(`.category-option[data-id="${expense.Category}"]`);
  if (categoryOption) {
    setSelectedCategory(expense.Category);
  }
  
  elements.addDesc.value = expense.Description || '';
  
  elements.addPaymentPicker.querySelectorAll('.payment-method-option').forEach(opt => {
    if (opt.getAttribute('data-value') === expense['Payment Method']) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
    }
  });
  
  elements.addDate.value = expense.Date;
  elements.addTime.value = expense.Time || '12:00';
  
  switchTab('add');
}

// Delete Flow
let idToDelete = null;
function openDeleteConfirmDialog(id) {
  idToDelete = id;
  elements.deleteDialog.showModal();
}

function setupDeleteDialog() {
  elements.btnConfirmDelete.addEventListener('click', () => {
    if (idToDelete) {
      deleteExpense(idToDelete);
      elements.deleteDialog.close();
      idToDelete = null;
    }
  });

  if (!('closedBy' in HTMLDialogElement.prototype)) {
    elements.deleteDialog.addEventListener('click', (event) => {
      if (event.target !== elements.deleteDialog) return;
      const rect = elements.deleteDialog.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (isDialogContent) return;
      elements.deleteDialog.close();
    });
  }
}

function deleteExpense(id) {
  showLoading(true);
  
  callBackend('deleteExpense', { id })
    .then(res => {
      state.expenses = state.expenses.filter(e => e.ID !== id);
      renderAll();
      showToast(state.settings.language === 'th' ? 'ลบรายการสำเร็จแล้ว' : 'Expense deleted successfully');
      showLoading(false);
    })
    .catch(err => {
      showToast('Failed to delete expense: ' + err.message, false);
      showLoading(false);
    });
}

// Add/Edit Form setup
let selectedCategory = '';
function setupAddForm() {
  elements.addPaymentPicker.querySelectorAll('.payment-method-option').forEach(opt => {
    opt.addEventListener('click', () => {
      elements.addPaymentPicker.querySelectorAll('.payment-method-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  elements.btnSaveExpense.addEventListener('click', () => {
    saveExpense();
  });

  elements.btnCancelAdd.addEventListener('click', () => {
    clearAddForm();
    switchTab('home');
  });

  window.adjustAmount = (val) => {
    const current = parseFloat(elements.addAmount.value) || 0;
    elements.addAmount.value = (current + val).toFixed(2);
  };
}

function prepareAddForm() {
  state.currentEditingId = null;
  const lang = state.settings.language || 'en';
  elements.addPageTitle.textContent = TRANSLATIONS[lang].add_title;
  elements.addAmount.value = '';
  elements.addDesc.value = '';
  
  if (state.settings.categories.length > 0) {
    setSelectedCategory(state.settings.categories[0].id);
  }
  
  elements.addPaymentPicker.querySelectorAll('.payment-method-option').forEach(o => {
    if (o.getAttribute('data-value') === 'QR Code') {
      o.classList.add('selected');
    } else {
      o.classList.remove('selected');
    }
  });

  const now = new Date();
  elements.addDate.value = formatDateString(now);
  
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  elements.addTime.value = `${h}:${m}`;
}

function clearAddForm() {
  elements.addAmount.value = '';
  elements.addDesc.value = '';
  state.currentEditingId = null;
}

function renderCategoryGrid() {
  elements.addCategoryGrid.innerHTML = '';
  const lang = state.settings.language || 'en';
  
  state.settings.categories.forEach(cat => {
    const opt = document.createElement('div');
    opt.className = 'category-option';
    opt.setAttribute('data-id', cat.id);
    opt.innerHTML = `
      <span class="icon">${cat.icon}</span>
      <span class="name">${cat.name}</span>
    `;
    
    opt.addEventListener('click', () => {
      setSelectedCategory(cat.id);
    });
    
    elements.addCategoryGrid.appendChild(opt);
  });

  // Report Categories dropdown
  elements.reportFilterCategory.innerHTML = `<option value="">${TRANSLATIONS[lang].report_all_cats}</option>`;
  state.settings.categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = `${cat.icon} ${cat.name}`;
    elements.reportFilterCategory.appendChild(option);
  });
}

function setSelectedCategory(catId) {
  selectedCategory = catId;
  elements.addCategoryGrid.querySelectorAll('.category-option').forEach(opt => {
    if (opt.getAttribute('data-id') === catId) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
    }
  });
}

function saveExpense() {
  const amountStr = elements.addAmount.value;
  const lang = state.settings.language || 'en';

  if (!amountStr || parseFloat(amountStr) <= 0) {
    showToast(lang === 'th' ? 'กรุณาระบุจำนวนเงินที่ถูกต้อง' : 'Please enter a valid amount', false);
    return;
  }

  const selectedPaymentMethod = elements.addPaymentPicker.querySelector('.payment-method-option.selected').getAttribute('data-value');
  
  const expenseData = {
    Amount: parseFloat(amountStr),
    Category: selectedCategory || 'other',
    Description: elements.addDesc.value.trim(),
    'Payment Method': selectedPaymentMethod,
    Date: elements.addDate.value,
    Time: elements.addTime.value
  };

  showLoading(true);

  if (state.currentEditingId) {
    const id = state.currentEditingId;
    callBackend('updateExpense', { id, expense: expenseData })
      .then(res => {
        const idx = state.expenses.findIndex(e => e.ID === id);
        if (idx !== -1) {
          state.expenses[idx] = { ...state.expenses[idx], ...expenseData };
        }
        finishSave(lang === 'th' ? 'แก้ไขรายการสำเร็จแล้ว' : 'Expense updated successfully');
      })
      .catch(err => {
        showToast('Failed to update: ' + err.message, false);
        showLoading(false);
      });
  } else {
    callBackend('addExpense', expenseData)
      .then(res => {
        expenseData.ID = res.id;
        state.expenses.unshift(expenseData);
        finishSave(lang === 'th' ? 'บันทึกรายการสำเร็จแล้ว' : 'Expense recorded successfully');
      })
      .catch(err => {
        showToast('Failed to save: ' + err.message, false);
        showLoading(false);
      });
  }
}

function finishSave(message) {
  clearAddForm();
  state.expenses.sort((a, b) => new Date(b.Date + 'T' + (b.Time || '00:00')) - new Date(a.Date + 'T' + (a.Time || '00:00')));
  renderAll();
  showToast(message);
  showLoading(false);
  switchTab('home');
}

// Reports Tab Logic
function setupReportsTab() {
  elements.btnGenerateReport.addEventListener('click', () => {
    generateReport();
  });

  elements.btnExportPdf.addEventListener('click', () => {
    exportPdfReport();
  });
}

let lastReportResult = null;

function generateReport() {
  const startVal = elements.reportStartDate.value;
  const endVal = elements.reportEndDate.value;
  const lang = state.settings.language || 'en';
  
  if (!startVal || !endVal) {
    showToast(lang === 'th' ? 'กรุณาเลือกวันที่เริ่มต้นและสิ้นสุด' : 'Please select both start and end dates', false);
    return;
  }

  const startDate = new Date(startVal + 'T00:00:00');
  const endDate = new Date(endVal + 'T23:59:59');
  
  if (endDate < startDate) {
    showToast(lang === 'th' ? 'วันที่สิ้นสุดต้องหลังจากวันที่เริ่มต้น' : 'End Date must be after Start Date', false);
    return;
  }

  const catFilter = elements.reportFilterCategory.value;
  const methodFilter = elements.reportFilterMethod.value;
  const keywordFilter = elements.reportSearchKeyword.value.toLowerCase().trim();

  const filtered = state.expenses.filter(exp => {
    const expDate = new Date(exp.Date + 'T00:00:00');
    if (expDate < startDate || expDate > endDate) return false;
    if (catFilter && exp.Category !== catFilter) return false;
    if (methodFilter && exp['Payment Method'] !== methodFilter) return false;
    
    if (keywordFilter) {
      const desc = (exp.Description || '').toLowerCase();
      const catObj = state.settings.categories.find(c => c.id === exp.Category) || { name: '' };
      const catName = catObj.name.toLowerCase();
      if (!desc.includes(keywordFilter) && !catName.includes(keywordFilter)) return false;
    }
    
    return true;
  });

  const count = filtered.length;
  if (count === 0) {
    elements.reportPreviewSection.style.display = 'none';
    showToast(lang === 'th' ? 'ไม่พบข้อมูลที่ตรงกับตัวกรอง' : 'No expenses found for the selected filters', false);
    return;
  }

  const amounts = filtered.map(e => parseFloat(e.Amount || 0));
  const total = amounts.reduce((sum, a) => sum + a, 0);
  const avg = total / count;
  const max = Math.max(...amounts);

  const categoryGroups = {};
  filtered.forEach(exp => {
    categoryGroups[exp.Category] = (categoryGroups[exp.Category] || 0) + parseFloat(exp.Amount);
  });

  const categoryBreakdown = Object.keys(categoryGroups).map(catId => {
    const catObj = state.settings.categories.find(c => c.id === catId) || { name: catId, icon: '📦', color: '#6B7280' };
    const amount = categoryGroups[catId];
    return {
      id: catId,
      name: catObj.name,
      icon: catObj.icon,
      color: catObj.color,
      amount: amount,
      percent: (amount / total) * 100
    };
  }).sort((a, b) => b.amount - a.amount);

  elements.reportStatTotal.textContent = `${state.settings.currency}${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  
  const countLabel = lang === 'th' ? `${count} รายการ` : `${count} txn${count === 1 ? '' : 's'}`;
  elements.reportStatCount.textContent = countLabel;
  
  elements.reportStatAvg.textContent = `${state.settings.currency}${avg.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  elements.reportStatMax.textContent = `${state.settings.currency}${max.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  elements.reportCategoryBreakdown.innerHTML = '';
  categoryBreakdown.forEach(row => {
    const div = document.createElement('div');
    div.className = 'breakdown-row';
    div.innerHTML = `
      <span class="breakdown-label">${row.icon} ${row.name}</span>
      <div class="breakdown-bar-bg">
        <div class="breakdown-bar-fill" style="width: ${row.percent}%; background-color: ${row.color}"></div>
      </div>
      <span class="breakdown-amount">${state.settings.currency}${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      <span class="breakdown-percent">${row.percent.toFixed(0)}%</span>
    `;
    elements.reportCategoryBreakdown.appendChild(div);
  });

  elements.reportTxnList.innerHTML = '';
  filtered.forEach(exp => {
    const catObj = state.settings.categories.find(c => c.id === exp.Category) || { name: exp.Category, icon: '📦', color: '#6B7280' };
    const item = document.createElement('div');
    item.className = 'transaction-card';
    item.style.boxShadow = 'none';
    item.style.border = 'none';
    item.style.borderBottom = '1px solid var(--border)';
    item.style.borderRadius = '0';
    item.style.padding = '10px 0';
    item.innerHTML = `
      <div class="category-icon-wrapper" style="width: 36px; height: 36px; font-size:16px; background-color: ${catObj.color}15; color: ${catObj.color}">
        ${catObj.icon}
      </div>
      <div class="card-details">
        <div class="card-title" style="font-size:14px;">${exp.Description || catObj.name}</div>
        <div class="card-subtitle" style="font-size:11px;">${exp.Date} ${exp.Time || ''}</div>
      </div>
      <div class="card-amount-wrapper">
        <div class="card-amount" style="font-size:14px;">${state.settings.currency}${parseFloat(exp.Amount).toFixed(2)}</div>
        <div class="card-method" style="font-size:10px;">${exp['Payment Method'] || 'QR Code'}</div>
      </div>
    `;
    elements.reportTxnList.appendChild(item);
  });

  elements.reportPreviewSection.style.display = 'block';
  
  lastReportResult = {
    filtered,
    total,
    count,
    avg,
    max,
    categoryBreakdown,
    startDateStr: startVal,
    endDateStr: endVal
  };
  
  showToast(lang === 'th' ? 'สร้างสรุปรายงานแล้ว' : 'Report generated successfully');
  
  setTimeout(() => {
    elements.contentArea.scrollTo({
      top: elements.btnGenerateReport.offsetTop - 10,
      behavior: 'smooth'
    });
  }, 100);
}

// PDF Export Generator
function exportPdfReport() {
  if (!lastReportResult) {
    showToast('Please generate a report first', false);
    return;
  }

  showLoading(true);

  setTimeout(() => {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');
      const data = lastReportResult;
      const lang = state.settings.language || 'en';
      
      let qrBase64 = '';
      if (state.settings.qr_code_mode === 'default1') {
        qrBase64 = QR_DEFAULTS.qr1;
      } else if (state.settings.qr_code_mode === 'default2') {
        qrBase64 = QR_DEFAULTS.qr2;
      } else if (state.settings.qr_code_mode === 'custom' && state.settings.custom_qr_base64) {
        qrBase64 = state.settings.custom_qr_base64;
      } else {
        qrBase64 = QR_DEFAULTS.qr2;
      }
      
      const margin = 20;
      const pageW = doc.internal.pageSize.width;
      const pageH = doc.internal.pageSize.height;
      let y = 25;
      
      const primaryColor = [16, 185, 129];
      const textColorMain = [17, 24, 39];
      const textColorSub = [107, 114, 128];
      const grayLine = [243, 244, 246];

      doc.setFillColor(...primaryColor);
      doc.rect(margin, y, 4, 12, 'F');
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(...textColorMain);
      
      const reportTitleText = lang === 'th' ? 'EXPENSE REPORT' : 'EXPENSE REPORT';
      doc.text(reportTitleText, margin + 8, y + 9.5);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...textColorSub);
      doc.text(`Period: ${data.startDateStr} to ${data.endDateStr}`, pageW - margin, y + 4, { align: 'right' });
      doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageW - margin, y + 9, { align: 'right' });
      
      y += 20;

      doc.line(margin, y, pageW - margin, y);
      y += 12;

      doc.setFillColor(249, 250, 251);
      doc.rect(margin, y, pageW - (margin * 2), 26, 'F');
      doc.setDrawColor(229, 231, 235);
      doc.rect(margin, y, pageW - (margin * 2), 26, 'D');

      const colW = (pageW - (margin * 2)) / 4;
      const pdfCurrency = (state.settings.currency === '฿') ? 'THB ' : state.settings.currency + ' ';
      const formatCurrency = (val) => `${pdfCurrency}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      const summaryStats = [
        { label: lang === 'th' ? 'TOTAL EXPENSES' : 'TOTAL EXPENSES', val: formatCurrency(data.total) },
        { label: lang === 'th' ? 'TRANSACTIONS' : 'TRANSACTIONS', val: `${data.count} items` },
        { label: lang === 'th' ? 'AVERAGE EXPENSE' : 'AVERAGE EXPENSE', val: formatCurrency(data.avg) },
        { label: lang === 'th' ? 'HIGHEST EXPENSE' : 'HIGHEST EXPENSE', val: formatCurrency(data.max) }
      ];

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...textColorSub);
      
      summaryStats.forEach((stat, idx) => {
        const xPos = margin + (colW * idx) + (colW / 2);
        doc.text(stat.label, xPos, y + 8, { align: 'center' });
      });

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...textColorMain);
      
      summaryStats.forEach((stat, idx) => {
        const xPos = margin + (colW * idx) + (colW / 2);
        doc.text(stat.val, xPos, y + 17, { align: 'center' });
      });

      y += 38;

      // Category Summary Table
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(lang === 'th' ? 'Category Summary' : 'Category Summary', margin, y);
      y += 6;

      doc.setFontSize(9);
      doc.setFillColor(243, 244, 246);
      doc.rect(margin, y, pageW - (margin * 2), 8, 'F');
      doc.setTextColor(...textColorMain);
      doc.text('Category', margin + 4, y + 5.5);
      doc.text('Expenses Total', pageW - margin - 40, y + 5.5, { align: 'right' });
      doc.text('Percentage', pageW - margin - 4, y + 5.5, { align: 'right' });
      y += 8;

      doc.setFont('Helvetica', 'normal');
      data.categoryBreakdown.forEach(cat => {
        doc.line(margin, y, pageW - margin, y);
        
        // Remove emoji icons for PDF to prevent formatting issues
        const cleanName = cat.name.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").trim();
        doc.text(cleanName, margin + 4, y + 6);
        doc.text(formatCurrency(cat.amount), pageW - margin - 40, y + 6, { align: 'right' });
        doc.text(`${cat.percent.toFixed(0)}%`, pageW - margin - 4, y + 6, { align: 'right' });
        y += 8;
      });

      y += 10;

      // Transaction Table Details
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(lang === 'th' ? 'Transaction Details' : 'Transaction Details', margin, y);
      y += 6;

      doc.setFillColor(243, 244, 246);
      doc.rect(margin, y, pageW - (margin * 2), 8, 'F');
      doc.setFontSize(9);
      doc.text('Date / Time', margin + 4, y + 5.5);
      doc.text('Category', margin + 40, y + 5.5);
      doc.text('Description', margin + 75, y + 5.5);
      doc.text('Method', pageW - margin - 35, y + 5.5);
      doc.text('Amount', pageW - margin - 4, y + 5.5, { align: 'right' });
      y += 8;

      doc.setFont('Helvetica', 'normal');
      
      data.filtered.forEach((exp, idx) => {
        if (y > pageH - 45) {
          doc.addPage();
          y = 20;
          doc.setFillColor(243, 244, 246);
          doc.rect(margin, y, pageW - (margin * 2), 8, 'F');
          doc.setFont('Helvetica', 'bold');
          doc.text('Date / Time', margin + 4, y + 5.5);
          doc.text('Category', margin + 40, y + 5.5);
          doc.text('Description', margin + 75, y + 5.5);
          doc.text('Method', pageW - margin - 35, y + 5.5);
          doc.text('Amount', pageW - margin - 4, y + 5.5, { align: 'right' });
          doc.setFont('Helvetica', 'normal');
          y += 8;
        }

        doc.line(margin, y, pageW - margin, y);
        
        const catObj = state.settings.categories.find(c => c.id === exp.Category) || { name: exp.Category };
        const cleanCatName = catObj.name.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").trim();
        const timeDisplay = exp.Time ? ` ${exp.Time}` : '';
        
        doc.text(`${exp.Date}${timeDisplay}`, margin + 4, y + 6);
        doc.text(cleanCatName, margin + 40, y + 6);
        
        let desc = exp.Description || '';
        if (desc.length > 24) desc = desc.substring(0, 22) + '...';
        doc.text(desc, margin + 75, y + 6);
        
        doc.text(exp['Payment Method'] || 'QR Code', pageW - margin - 35, y + 6);
        doc.text(formatCurrency(parseFloat(exp.Amount)), pageW - margin - 4, y + 6, { align: 'right' });
        
        y += 8;
      });

      doc.line(margin, y, pageW - margin, y);

      // QR Page
      doc.addPage();
      y = 30;

      if (qrBase64) {
        let qrW = 60;
        let qrH = 60;
        
        if (state.settings.qr_code_mode === 'default1') {
          // CLIOX QR (PNG): 3618x5427 -> 2:3 aspect ratio
          qrW = 50;
          qrH = 75;
        } else if (state.settings.qr_code_mode === 'default2') {
          // PromptPay Default (JPEG): 885x1200 -> 3:4 aspect ratio
          qrW = 55;
          qrH = 74.5;
        } else {
          // Custom upload (often square, default to 1:1)
          qrW = 60;
          qrH = 60;
        }
        
        const xPos = (pageW - qrW) / 2;
        
        doc.setDrawColor(229, 231, 235);
        doc.setFillColor(255, 255, 255);
        doc.rect(xPos - 5, y - 5, qrW + 10, qrH + 10, 'F');
        doc.rect(xPos - 5, y - 5, qrW + 10, qrH + 10, 'D');
        
        const format = (state.settings.qr_code_mode === 'default1') ? 'PNG' : 'JPEG';
        doc.addImage(qrBase64, format, xPos, y, qrW, qrH);
        
        y += qrH + 12;
        
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...textColorMain);
        
        const scanInstructionText = lang === 'th' ? 'Please scan to make payment.' : 'Please scan to make payment.';
        doc.text(scanInstructionText, pageW / 2, y, { align: 'center' });
        
        y += 24;
      }

      // Draw Signatures
      const sigLineW = 60;
      doc.line(margin, y, margin + sigLineW, y);
      doc.line(pageW - margin - sigLineW, y, pageW - margin, y);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...textColorSub);
      doc.text('Prepared By / Signature', margin + (sigLineW / 2), y + 5, { align: 'center' });
      doc.text('Approved By / Signature', pageW - margin - (sigLineW / 2), y + 5, { align: 'center' });
      
      const totalPages = doc.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...textColorSub);
        doc.text(`Page ${i} of ${totalPages}`, pageW / 2, pageH - 10, { align: 'center' });
        doc.text('Confidential - Personal Expense Manager', margin, pageH - 10);
      }

      doc.save(`Expense_Report_${data.startDateStr}_to_${data.endDateStr}.pdf`);
      showToast(lang === 'th' ? 'ส่งออกไฟล์ PDF สำเร็จแล้ว' : 'PDF exported successfully');
      
    } catch (e) {
      console.error(e);
      showToast('Failed to export PDF: ' + e.message, false);
    } finally {
      showLoading(false);
    }
  }, 400);
}

// Settings Tab Logic
function setupSettingsForm() {
  // Update Connections Button
  elements.btnSaveSheetId.addEventListener('click', () => {
    const sheetVal = elements.settingsSheetId.value.trim();
    const gasApiVal = elements.settingsGasApiUrl.value.trim();
    const lang = state.settings.language || 'en';
    
    let sheetId = sheetVal;
    if (sheetVal && sheetVal.includes('docs.google.com/spreadsheets')) {
      const match = sheetVal.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match) sheetId = match[1];
    }

    const updates = {};
    if (sheetId) updates.SPREADSHEET_ID = sheetId;
    updates.GAS_API_URL = gasApiVal;

    saveSettingsLocally(updates);
    showToast(lang === 'th' ? 'บันทึกการเชื่อมต่อเรียบร้อยแล้ว' : 'Connections updated!');
    fetchData();
  });

  // Language Dropdown Selector
  if (elements.settingsLanguage) {
    elements.settingsLanguage.addEventListener('change', (e) => {
      const lang = e.target.value;
      state.settings.language = lang;
      
      // Update default categories to language equivalents if they were defaults
      const hasCustomCategories = checkCustomCategories();
      if (!hasCustomCategories) {
        state.settings.categories = lang === 'th' ? [...DEFAULT_CATEGORIES_TH] : [...DEFAULT_CATEGORIES_EN];
      }
      
      saveSettingsLocally({ 
        language: lang,
        categories: state.settings.categories 
      });
      
      applyLanguage();
      renderAll();
      showToast(lang === 'th' ? 'เปลี่ยนภาษาสำเร็จแล้ว' : 'Language updated');
    });
  }

  // Dark Mode Toggle
  elements.settingsDarkMode.addEventListener('change', (e) => {
    const isDark = e.target.checked;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    elements.contentArea.closest('#app-container').setAttribute('data-theme', isDark ? 'dark' : 'light');
    saveSettingsLocally({ dark_mode: isDark });
  });

  // Currency
  elements.settingsCurrency.addEventListener('change', (e) => {
    const symbol = e.target.value.trim() || '฿';
    saveSettingsLocally({ currency: symbol });
    state.settings.currency = symbol;
    updateCurrencySymbols();
    showToast(state.settings.language === 'th' ? 'อัปเดตสกุลเงินแล้ว' : 'Currency updated');
  });

  // QR Mode
  elements.settingsQrMode.addEventListener('change', (e) => {
    const mode = e.target.value;
    state.settings.qr_code_mode = mode;
    saveSettingsLocally({ qr_code_mode: mode });
    updateQRUploadSection();
    showToast(state.settings.language === 'th' ? 'อัปเดตตัวเลือก QR สำเร็จ' : 'QR Code preference updated');
  });

  elements.qrUploadArea.addEventListener('click', () => {
    elements.qrFileInput.click();
  });

  elements.qrFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      handleQRFileSelect(file);
    }
  });

  elements.qrUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    elements.qrUploadArea.classList.add('dragover');
  });

  elements.qrUploadArea.addEventListener('dragleave', () => {
    elements.qrUploadArea.classList.remove('dragover');
  });

  elements.qrUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    elements.qrUploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleQRFileSelect(file);
    }
  });

  elements.btnAddCategory.addEventListener('click', () => {
    addNewCategory();
  });
}

// Check if current categories in settings are customized or match defaults
function checkCustomCategories() {
  if (state.settings.categories.length !== DEFAULT_CATEGORIES_EN.length) return true;
  
  // Check if every category matches default IDs
  const defaultIds = DEFAULT_CATEGORIES_EN.map(c => c.id);
  const currentIds = state.settings.categories.map(c => c.id);
  
  return !currentIds.every(id => defaultIds.includes(id));
}

function updateQRUploadSection() {
  if (state.settings.qr_code_mode === 'custom') {
    elements.settingsCustomQrContainer.style.display = 'block';
    if (state.settings.custom_qr_base64) {
      elements.qrPreviewImage.src = state.settings.custom_qr_base64;
      elements.qrPreviewImage.style.display = 'block';
      elements.qrPreviewPlaceholder.style.display = 'none';
    } else {
      elements.qrPreviewImage.style.display = 'none';
      elements.qrPreviewPlaceholder.style.display = 'flex';
    }
  } else {
    elements.settingsCustomQrContainer.style.display = 'none';
  }
}

function handleQRFileSelect(file) {
  const reader = new FileReader();
  const lang = state.settings.language || 'en';
  reader.onload = function(event) {
    const b64 = event.target.result;
    state.settings.custom_qr_base64 = b64;
    saveSettingsLocally({ custom_qr_base64: b64 });
    updateQRUploadSection();
    showToast(lang === 'th' ? 'อัปโหลด QR Code สำเร็จแล้ว' : 'Custom QR Code uploaded successfully');
  };
  reader.readAsDataURL(file);
}

function loadThemeAndSettings() {
  const stored = localStorage.getItem('settings');
  if (stored) {
    const settings = JSON.parse(stored);
    
    if (settings.dark_mode) {
      elements.settingsDarkMode.checked = true;
      document.body.setAttribute('data-theme', 'dark');
      elements.contentArea.closest('#app-container').setAttribute('data-theme', 'dark');
    }
    
    if (settings.SPREADSHEET_ID) {
      elements.settingsSheetId.value = settings.SPREADSHEET_ID;
    }
    
    if (settings.GAS_API_URL && elements.settingsGasApiUrl) {
      elements.settingsGasApiUrl.value = settings.GAS_API_URL;
    }

    if (settings.language) {
      state.settings.language = settings.language;
    }
  }
}

function saveSettingsLocally(updateObj) {
  const current = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : {};
  const merged = { ...current, ...updateObj };
  localStorage.setItem('settings', JSON.stringify(merged));
  
  callBackend('saveSettings', updateObj)
    .then(res => {
      console.log('Settings synced with backend');
    })
    .catch(err => {
      console.warn('Failed to sync settings with backend:', err.message);
    });
}

function renderSettingsCategories() {
  elements.settingsCategoryList.innerHTML = '';
  
  state.settings.categories.forEach(cat => {
    const item = document.createElement('div');
    item.className = 'settings-category-item';
    item.innerHTML = `
      <div class="settings-category-info">
        <span class="settings-category-color-dot" style="background-color: ${cat.color}"></span>
        <span class="settings-category-icon">${cat.icon}</span>
        <span class="settings-category-name">${cat.name}</span>
      </div>
      <button class="settings-category-delete" data-id="${cat.id}">🗑️</button>
    `;
    
    item.querySelector('.settings-category-delete').addEventListener('click', () => {
      deleteCategory(cat.id);
    });
    
    elements.settingsCategoryList.appendChild(item);
  });
}

function deleteCategory(catId) {
  const lang = state.settings.language || 'en';
  if (state.settings.categories.length <= 1) {
    showToast(lang === 'th' ? 'ต้องมีอย่างน้อยหนึ่งหมวดหมู่' : 'You must have at least one category', false);
    return;
  }
  state.settings.categories = state.settings.categories.filter(c => c.id !== catId);
  saveSettingsLocally({ categories: state.settings.categories });
  renderAll();
  showToast(lang === 'th' ? 'ลบหมวดหมู่แล้ว' : 'Category deleted');
}

function addNewCategory() {
  const name = elements.newCatName.value.trim();
  const icon = elements.newCatIcon.value.trim() || '🍕';
  const color = elements.newCatColor.value;
  const lang = state.settings.language || 'en';

  if (!name) {
    showToast(lang === 'th' ? 'กรุณากรอกชื่อหมวดหมู่' : 'Please enter a category name', false);
    return;
  }

  const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  if (state.settings.categories.some(c => c.id === id)) {
    showToast(lang === 'th' ? 'หมวดหมู่นี้มีอยู่แล้ว' : 'Category already exists', false);
    return;
  }

  const newCat = { id, name, icon, color };
  state.settings.categories.push(newCat);
  saveSettingsLocally({ categories: state.settings.categories });
  
  elements.newCatName.value = '';
  elements.newCatIcon.value = '';
  
  renderAll();
  showToast(lang === 'th' ? 'เพิ่มหมวดหมู่ใหม่แล้ว' : 'New category added');
}
