import QR_DEFAULTS from './qr_defaults.js';

// Application State
let state = {
  expenses: [],
  settings: {
    categories: [
      { id: 'food', name: 'Food & Drinks', icon: '🍽️', color: '#10B981' },
      { id: 'travel', name: 'Transport', icon: '🚗', color: '#3B82F6' },
      { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#EC4899' },
      { id: 'bills', name: 'Bills & Utilities', icon: '⚡', color: '#F59E0B' },
      { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#8B5CF6' },
      { id: 'other', name: 'Others', icon: '📦', color: '#6B7280' }
    ],
    currency: '฿',
    qr_code_mode: 'default2',
    custom_qr_base64: ''
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
  // Navigation Tabs switching
  elements.navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  // FAB Click
  elements.homeFab.addEventListener('click', () => {
    prepareAddForm();
    switchTab('add');
  });

  // See All Button -> Redirects to Reports
  elements.btnSeeAll.addEventListener('click', () => {
    switchTab('reports');
  });
}

function switchTab(tabName) {
  state.activeTab = tabName;
  
  // Update nav items UI
  elements.navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update tab pages visibility
  elements.tabPages.forEach(page => {
    if (page.id === `tab-${tabName}`) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  // Scroll content area back to top on tab switch
  elements.contentArea.scrollTop = 0;

  // Toggle FAB visibility
  if (tabName === 'home') {
    elements.homeFab.style.display = 'flex';
  } else {
    elements.homeFab.style.display = 'none';
  }

  // Auto-fill dates in Reports if switched
  if (tabName === 'reports') {
    if (!elements.reportStartDate.value || !elements.reportEndDate.value) {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      elements.reportStartDate.value = formatDateString(firstDay);
      elements.reportEndDate.value = formatDateString(today);
    }
  }
}

// Format date utility (YYYY-MM-DD)
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
  const gasApiUrl = settingsStr ? JSON.parse(settingsStr).GAS_API_URL : '';
  
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
  const gasApiUrl = settingsStr ? JSON.parse(settingsStr).GAS_API_URL : '';

  if (state.isGAS) {
    elements.connectionStatus.textContent = 'Google Sheets (Live)';
    elements.connectionStatus.style.color = 'var(--primary)';
  } else if (gasApiUrl) {
    elements.connectionStatus.textContent = 'Connected (API Mode)';
    elements.connectionStatus.style.color = 'var(--primary)';
  } else {
    elements.connectionStatus.textContent = 'Mock Mode (LocalStorage)';
    elements.connectionStatus.style.color = 'var(--text-sub)';
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
        // Load settings into active state
        state.settings = { ...state.settings, ...settings };
        
        // Merge category defaults if empty
        if (!state.settings.categories || state.settings.categories.length === 0) {
          state.settings.categories = [
            { id: 'food', name: 'Food & Drinks', icon: '🍽️', color: '#10B981' },
            { id: 'travel', name: 'Transport', icon: '🚗', color: '#3B82F6' },
            { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#EC4899' },
            { id: 'bills', name: 'Bills & Utilities', icon: '⚡', color: '#F59E0B' },
            { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#8B5CF6' },
            { id: 'other', name: 'Others', icon: '📦', color: '#6B7280' }
          ];
        }
      }
      
      // Update inputs UI in Settings
      const localSettingsStr = localStorage.getItem('settings');
      if (localSettingsStr) {
        const local = JSON.parse(localSettingsStr);
        if (local.GAS_API_URL && elements.settingsGasApiUrl) {
          elements.settingsGasApiUrl.value = local.GAS_API_URL;
        }
      }

      syncConnectionStatus();
      renderAll();
      showLoading(false);
    })
    .catch(err => {
      console.error(err);
      showToast('Error syncing with database. Check API URL.', false);
      
      // Load fallback mock data locally
      const storedExpenses = localStorage.getItem('expenses');
      if (storedExpenses) {
        state.expenses = JSON.parse(storedExpenses);
      }
      
      syncConnectionStatus();
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
  
  const todayTotal = todayExpenses.reduce((sum, e) => sum + parseFloat(e.Amount || 0), 0);
  const todayCount = todayExpenses.length;
  
  elements.homeTodayTotal.textContent = todayTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  elements.homeTodayCount.textContent = `${todayCount} transaction${todayCount === 1 ? '' : 's'}`;

  // Month Total
  const currentYearMonth = todayStr.substring(0, 7); // "YYYY-MM"
  const monthExpenses = state.expenses.filter(e => e.Date.startsWith(currentYearMonth));
  const monthTotal = monthExpenses.reduce((sum, e) => sum + parseFloat(e.Amount || 0), 0);
  elements.homeMonthTotal.textContent = `${state.settings.currency}${monthTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} this month`;
}

// Render Recent Expenses List
function renderRecentExpenses() {
  elements.homeTxnList.innerHTML = '';
  
  // Show last 10 expenses
  const recent = state.expenses.slice(0, 10);
  
  if (recent.length === 0) {
    elements.homeTxnList.innerHTML = `
      <div class="card" style="text-align: center; color: var(--text-muted); padding: 30px 10px;">
        No expenses recorded yet.<br>Tap the + button to add one!
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
    
    // Add touch handler for edit/delete actions (swipe or long press or double-tap)
    // For simplicity and accessibility, we allow tap to open details or edit, and provide inline buttons if needed.
    // Let's implement a clean context menu sheet or just standard edit flow on tap.
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
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (formatDateString(today) === dateStr) return 'Today';
  if (formatDateString(yesterday) === dateStr) return 'Yesterday';
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Context Actions for a Transaction (Edit/Delete options)
function openTransactionOptions(expense) {
  // We can open a dialog modal or simply reuse the add sheet in edit mode.
  // Let's open a native dialog confirm sheet or edit sheet
  const action = confirm(`Manage Expense:\n"${expense.Description || expense.Category}" for ${state.settings.currency}${expense.Amount}\n\nClick OK to Edit, Cancel to Delete (or close)`);
  if (action) {
    // Edit
    editExpense(expense);
  } else {
    // Prompt confirmation dialog for delete
    openDeleteConfirmDialog(expense.ID);
  }
}

// Edit Mode
function editExpense(expense) {
  state.currentEditingId = expense.ID;
  elements.addPageTitle.textContent = 'Edit Expense';
  elements.addAmount.value = expense.Amount;
  
  // Set category active
  const categoryOption = elements.addCategoryGrid.querySelector(`.category-option[data-id="${expense.Category}"]`);
  if (categoryOption) {
    setSelectedCategory(expense.Category);
  }
  
  elements.addDesc.value = expense.Description || '';
  
  // Set payment method
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

  // Fallback backdrop click to close
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
      showToast('Expense deleted successfully');
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
  // Category Selection click handler is delegated in renderCategoryGrid
  // Payment Method selection toggle
  elements.addPaymentPicker.querySelectorAll('.payment-method-option').forEach(opt => {
    opt.addEventListener('click', () => {
      elements.addPaymentPicker.querySelectorAll('.payment-method-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // Save Button Click
  elements.btnSaveExpense.addEventListener('click', () => {
    saveExpense();
  });

  // Cancel Button Click
  elements.btnCancelAdd.addEventListener('click', () => {
    clearAddForm();
    switchTab('home');
  });

  // Bind Adjust Amount shortcut functions globally
  window.adjustAmount = (val) => {
    const current = parseFloat(elements.addAmount.value) || 0;
    elements.addAmount.value = (current + val).toFixed(2);
  };
}

function prepareAddForm() {
  state.currentEditingId = null;
  elements.addPageTitle.textContent = 'Add Expense';
  elements.addAmount.value = '';
  elements.addDesc.value = '';
  
  // Set default category to first category if available
  if (state.settings.categories.length > 0) {
    setSelectedCategory(state.settings.categories[0].id);
  }
  
  // Reset payment method to QR Code
  elements.addPaymentPicker.querySelectorAll('.payment-method-option').forEach(o => {
    if (o.getAttribute('data-value') === 'QR Code') {
      o.classList.add('selected');
    } else {
      o.classList.remove('selected');
    }
  });

  // Set today's date and current time
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

  // Build report category drop-down options as well
  elements.reportFilterCategory.innerHTML = '<option value="">All Categories</option>';
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
  if (!amountStr || parseFloat(amountStr) <= 0) {
    showToast('Please enter a valid amount', false);
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
    // Edit existing transaction
    const id = state.currentEditingId;
    callBackend('updateExpense', { id, expense: expenseData })
      .then(res => {
        const idx = state.expenses.findIndex(e => e.ID === id);
        if (idx !== -1) {
          state.expenses[idx] = { ...state.expenses[idx], ...expenseData };
        }
        finishSave('Expense updated successfully');
      })
      .catch(err => {
        showToast('Failed to update expense: ' + err.message, false);
        showLoading(false);
      });
  } else {
    // Create new transaction
    callBackend('addExpense', expenseData)
      .then(res => {
        expenseData.ID = res.id;
        state.expenses.unshift(expenseData);
        finishSave('Expense recorded successfully');
      })
      .catch(err => {
        showToast('Failed to save: ' + err.message, false);
        showLoading(false);
      });
  }
}

function finishSave(message) {
  clearAddForm();
  // Sort expenses in state just in case
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

let lastReportResult = null; // Stores currently generated report statistics

function generateReport() {
  const startVal = elements.reportStartDate.value;
  const endVal = elements.reportEndDate.value;
  
  if (!startVal || !endVal) {
    showToast('Please select both start and end dates', false);
    return;
  }

  const startDate = new Date(startVal + 'T00:00:00');
  const endDate = new Date(endVal + 'T23:59:59');
  
  if (endDate < startDate) {
    showToast('End Date must be after Start Date', false);
    return;
  }

  const catFilter = elements.reportFilterCategory.value;
  const methodFilter = elements.reportFilterMethod.value;
  const keywordFilter = elements.reportSearchKeyword.value.toLowerCase().trim();

  // Filter transactions
  const filtered = state.expenses.filter(exp => {
    const expDate = new Date(exp.Date + 'T00:00:00');
    
    // Check Date Range
    if (expDate < startDate || expDate > endDate) return false;
    
    // Check Category Filter
    if (catFilter && exp.Category !== catFilter) return false;
    
    // Check Payment Method Filter
    if (methodFilter && exp['Payment Method'] !== methodFilter) return false;
    
    // Check Keyword search (in description or category name)
    if (keywordFilter) {
      const desc = (exp.Description || '').toLowerCase();
      const catObj = state.settings.categories.find(c => c.id === exp.Category) || { name: '' };
      const catName = catObj.name.toLowerCase();
      if (!desc.includes(keywordFilter) && !catName.includes(keywordFilter)) return false;
    }
    
    return true;
  });

  // Calculate Stats
  const count = filtered.length;
  if (count === 0) {
    elements.reportPreviewSection.style.display = 'none';
    showToast('No expenses found for the selected filters', false);
    return;
  }

  const amounts = filtered.map(e => parseFloat(e.Amount || 0));
  const total = amounts.reduce((sum, a) => sum + a, 0);
  const avg = total / count;
  const max = Math.max(...amounts);
  const min = Math.min(...amounts);

  // Group by category
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

  // Update UI Stats
  elements.reportStatTotal.textContent = `${state.settings.currency}${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  elements.reportStatCount.textContent = `${count} txn${count === 1 ? '' : 's'}`;
  elements.reportStatAvg.textContent = `${state.settings.currency}${avg.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  elements.reportStatMax.textContent = `${state.settings.currency}${max.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Render Breakdown List
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

  // Render items list inside reports preview
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
  
  // Store report details for exporting
  lastReportResult = {
    filtered,
    total,
    count,
    avg,
    max,
    min,
    categoryBreakdown,
    startDateStr: startVal,
    endDateStr: endVal
  };
  
  showToast('Report generated successfully');
  
  // Smooth scroll down to preview
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
      
      // Determine QR Code Base64 Image
      let qrBase64 = '';
      if (state.settings.qr_code_mode === 'default1') {
        qrBase64 = QR_DEFAULTS.qr1;
      } else if (state.settings.qr_code_mode === 'default2') {
        qrBase64 = QR_DEFAULTS.qr2;
      } else if (state.settings.qr_code_mode === 'custom' && state.settings.custom_qr_base64) {
        qrBase64 = state.settings.custom_qr_base64;
      } else {
        // Fallback default
        qrBase64 = QR_DEFAULTS.qr2;
      }
      
      // Document Settings
      const margin = 20;
      const pageW = doc.internal.pageSize.width;
      const pageH = doc.internal.pageSize.height;
      let y = 25;
      
      // Color Palettes (Emerald Theme)
      const primaryColor = [16, 185, 129]; // Emerald Green RGB
      const textColorMain = [17, 24, 39];
      const textColorSub = [107, 114, 128];
      const grayLine = [243, 244, 246];

      // Draw Title & Header Accent
      doc.setFillColor(...primaryColor);
      doc.rect(margin, y, 4, 12, 'F');
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(...textColorMain);
      doc.text('EXPENSE REPORT', margin + 8, y + 9.5);
      
      // Right-aligned report dates
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...textColorSub);
      doc.text(`Period: ${data.startDateStr} to ${data.endDateStr}`, pageW - margin, y + 4, { align: 'right' });
      doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageW - margin, y + 9, { align: 'right' });
      
      y += 20;

      // Draw Horizontal Line
      doc.setDrawColor(...grayLine);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageW - margin, y);
      
      y += 12;

      // Summary Dashboard Panel
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, y, pageW - (margin * 2), 26, 'F');
      doc.setDrawColor(229, 231, 235);
      doc.rect(margin, y, pageW - (margin * 2), 26, 'D');

      const colW = (pageW - (margin * 2)) / 4;
      const formatCurrency = (val) => `${state.settings.currency}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // Grid items
      const summaryStats = [
        { label: 'TOTAL EXPENSES', val: formatCurrency(data.total) },
        { label: 'TRANSACTIONS', val: `${data.count} items` },
        { label: 'AVERAGE EXPENSE', val: formatCurrency(data.avg) },
        { label: 'HIGHEST EXPENSE', val: formatCurrency(data.max) }
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
      doc.text('Category Summary', margin, y);
      y += 6;

      doc.setFontSize(9);
      // Table Header
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
        doc.text(`${cat.icon}  ${cat.name}`, margin + 4, y + 6);
        doc.text(formatCurrency(cat.amount), pageW - margin - 40, y + 6, { align: 'right' });
        doc.text(`${cat.percent.toFixed(0)}%`, pageW - margin - 4, y + 6, { align: 'right' });
        y += 8;
      });

      y += 10;

      // Transaction Table Details
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Transaction Details', margin, y);
      y += 6;

      // Table Headers
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
      
      // Loop transactions & add page if needed
      data.filtered.forEach((exp, idx) => {
        // Height check to add page
        if (y > pageH - 45) {
          doc.addPage();
          y = 20;
          // Re-draw headers on new page
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
        const timeDisplay = exp.Time ? ` ${exp.Time}` : '';
        
        doc.text(`${exp.Date}${timeDisplay}`, margin + 4, y + 6);
        doc.text(catObj.name, margin + 40, y + 6);
        
        // Truncate long descriptions
        let desc = exp.Description || '';
        if (desc.length > 24) desc = desc.substring(0, 22) + '...';
        doc.text(desc, margin + 75, y + 6);
        
        doc.text(exp['Payment Method'] || 'QR Code', pageW - margin - 35, y + 6);
        doc.text(formatCurrency(parseFloat(exp.Amount)), pageW - margin - 4, y + 6, { align: 'right' });
        
        y += 8;
      });

      doc.line(margin, y, pageW - margin, y);

      // Force QR Code to Last Page
      doc.addPage();
      y = 30;

      // Draw QR Code Centered on page
      if (qrBase64) {
        const qrSize = 65;
        const xPos = (pageW - qrSize) / 2;
        
        // QR Code Box Wrapper
        doc.setDrawColor(229, 231, 235);
        doc.setFillColor(255, 255, 255);
        doc.rect(xPos - 5, y - 5, qrSize + 10, qrSize + 10, 'F');
        doc.rect(xPos - 5, y - 5, qrSize + 10, qrSize + 10, 'D');
        
        // Add QR Image
        // Check image format (default1 is PNG, default2 is JPEG)
        const format = (state.settings.qr_code_mode === 'default1') ? 'PNG' : 'JPEG';
        doc.addImage(qrBase64, format, xPos, y, qrSize, qrSize);
        
        y += qrSize + 12;
        
        // Scan Instruction Text below QR
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...textColorMain);
        doc.text('Please scan to make payment.', pageW / 2, y, { align: 'center' });
        
        y += 24;
      }

      // Draw Signature & Approval Line
      const sigLineW = 60;
      doc.line(margin, y, margin + sigLineW, y);
      doc.line(pageW - margin - sigLineW, y, pageW - margin, y);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...textColorSub);
      doc.text('Prepared By / Signature', margin + (sigLineW / 2), y + 5, { align: 'center' });
      doc.text('Approved By / Signature', pageW - margin - (sigLineW / 2), y + 5, { align: 'center' });
      
      // Footer page numbers
      const totalPages = doc.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...textColorSub);
        doc.text(`Page ${i} of ${totalPages}`, pageW / 2, pageH - 10, { align: 'center' });
        doc.text('Confidential - Personal Expense Manager', margin, pageH - 10);
      }

      // Save PDF in Browser
      doc.save(`Expense_Report_${data.startDateStr}_to_${data.endDateStr}.pdf`);
      showToast('PDF exported successfully');
      
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
  // Update Sheet ID Button
  elements.btnSaveSheetId.addEventListener('click', () => {
    const sheetVal = elements.settingsSheetId.value.trim();
    const gasApiVal = elements.settingsGasApiUrl.value.trim();
    
    let sheetId = sheetVal;
    if (sheetVal && sheetVal.includes('docs.google.com/spreadsheets')) {
      const match = sheetVal.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match) sheetId = match[1];
    }

    const updates = {};
    if (sheetId) updates.SPREADSHEET_ID = sheetId;
    updates.GAS_API_URL = gasApiVal;

    saveSettingsLocally(updates);
    showToast('Connections updated!');
    fetchData();
  });

  // Dark Mode Toggle
  elements.settingsDarkMode.addEventListener('change', (e) => {
    const isDark = e.target.checked;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    elements.contentArea.closest('#app-container').setAttribute('data-theme', isDark ? 'dark' : 'light');
    saveSettingsLocally({ dark_mode: isDark });
  });

  // Currency input settings
  elements.settingsCurrency.addEventListener('change', (e) => {
    const symbol = e.target.value.trim() || '฿';
    saveSettingsLocally({ currency: symbol });
    state.settings.currency = symbol;
    updateCurrencySymbols();
    showToast('Currency updated');
  });

  // QR Mode Picker Settings
  elements.settingsQrMode.addEventListener('change', (e) => {
    const mode = e.target.value;
    state.settings.qr_code_mode = mode;
    saveSettingsLocally({ qr_code_mode: mode });
    updateQRUploadSection();
    showToast('QR Code preference updated');
  });

  // Custom QR upload drag/drop and click listener
  elements.qrUploadArea.addEventListener('click', () => {
    elements.qrFileInput.click();
  });

  elements.qrFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      handleQRFileSelect(file);
    }
  });

  // Drag and Drop
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

  // Add Category settings form
  elements.btnAddCategory.addEventListener('click', () => {
    addNewCategory();
  });
}

function updateQRUploadSection() {
  if (state.settings.qr_code_mode === 'custom') {
    elements.settingsCustomQrContainer.style.display = 'block';
    
    // Check if custom qr already uploaded
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
  reader.onload = function(event) {
    const b64 = event.target.result;
    
    // If the file is too big, let's warning but proceed. Or compress it.
    state.settings.custom_qr_base64 = b64;
    saveSettingsLocally({ custom_qr_base64: b64 });
    updateQRUploadSection();
    showToast('Custom QR Code uploaded successfully');
  };
  reader.readAsDataURL(file);
}

function loadThemeAndSettings() {
  const stored = localStorage.getItem('settings');
  if (stored) {
    const settings = JSON.parse(stored);
    
    // Dark mode
    if (settings.dark_mode) {
      elements.settingsDarkMode.checked = true;
      document.body.setAttribute('data-theme', 'dark');
      elements.contentArea.closest('#app-container').setAttribute('data-theme', 'dark');
    }
    
    // Sheet ID
    if (settings.SPREADSHEET_ID) {
      elements.settingsSheetId.value = settings.SPREADSHEET_ID;
    }
    
    // GAS API Web App URL
    if (settings.GAS_API_URL && elements.settingsGasApiUrl) {
      elements.settingsGasApiUrl.value = settings.GAS_API_URL;
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
  if (state.settings.categories.length <= 1) {
    showToast('You must have at least one category', false);
    return;
  }
  state.settings.categories = state.settings.categories.filter(c => c.id !== catId);
  saveSettingsLocally({ categories: state.settings.categories });
  renderAll();
  showToast('Category deleted');
}

function addNewCategory() {
  const name = elements.newCatName.value.trim();
  const icon = elements.newCatIcon.value.trim() || '🍕';
  const color = elements.newCatColor.value;

  if (!name) {
    showToast('Please enter a category name', false);
    return;
  }

  const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  // Duplicate check
  if (state.settings.categories.some(c => c.id === id)) {
    showToast('Category already exists', false);
    return;
  }

  const newCat = { id, name, icon, color };
  state.settings.categories.push(newCat);
  saveSettingsLocally({ categories: state.settings.categories });
  
  // Reset input fields
  elements.newCatName.value = '';
  elements.newCatIcon.value = '';
  
  renderAll();
  showToast('New category added');
}
