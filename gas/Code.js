const SPREADSHEET_ID = '14vA-VMYjO-G-ysHJ6kcUEbA3UB6dk3vm2SlC_txSzCU';

function doGet(e) {
  // Check if it's an API action request
  if (e && e.parameter && e.parameter.action) {
    return handleCorsResponse(handleApiRequest(e));
  }
  
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Expense Tracker')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  return handleCorsResponse(handleApiRequest(e));
}

function handleCorsResponse(result) {
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleApiRequest(e) {
  if (!e) {
    return { success: false, error: 'No request context provided' };
  }
  let action = '';
  let data = {};
  
  try {
    if (e.postData && e.postData.contents) {
      const payload = JSON.parse(e.postData.contents);
      action = payload.action;
      data = payload.data || {};
    } else {
      action = e.parameter.action;
      if (e.parameter.data) {
        data = JSON.parse(e.parameter.data);
      }
    }
  } catch (err) {
    return { success: false, error: 'Payload parse error: ' + err.message };
  }
  
  try {
    switch (action) {
      case 'initDatabase':
        return initDatabase();
      case 'getExpenses':
        // Wrap array in success response for unified format
        return getExpenses(); 
      case 'addExpense':
        return addExpense(data);
      case 'updateExpense':
        return updateExpense(data.id, data.expense);
      case 'deleteExpense':
        return deleteExpense(data.id);
      case 'getSettings':
        return getSettings();
      case 'saveSettings':
        return saveSettings(data);
      default:
        return { success: false, error: 'Unknown action: ' + action };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function getSpreadsheet() {
  if (SPREADSHEET_ID) {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      Logger.log("Failed to open by ID: " + e.message);
    }
  }
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    throw new Error("Could not access spreadsheet. Please check permission and Spreadsheet ID.");
  }
}

function initDatabase() {
  const ss = getSpreadsheet();
  
  // 1. Initialize Expenses Sheet
  let expensesSheet = ss.getSheetByName('Expenses');
  if (!expensesSheet) {
    expensesSheet = ss.insertSheet('Expenses');
    const headers = [
      'ID', 
      'Timestamp', 
      'Date', 
      'Time', 
      'Amount', 
      'Category', 
      'Description', 
      'Payment Method', 
      'Created At'
    ];
    expensesSheet.appendRow(headers);
    expensesSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  
  // 2. Initialize Settings Sheet
  let settingsSheet = ss.getSheetByName('Settings');
  if (!settingsSheet) {
    settingsSheet = ss.insertSheet('Settings');
    const headers = ['Key', 'Value'];
    settingsSheet.appendRow(headers);
    settingsSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    
    // Add default settings
    const defaultCategories = [
      { id: 'food', name: 'Food & Drinks', icon: '🍽️', color: '#10B981' },
      { id: 'travel', name: 'Transport', icon: '🚗', color: '#3B82F6' },
      { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#EC4899' },
      { id: 'bills', name: 'Bills & Utilities', icon: '⚡', color: '#F59E0B' },
      { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#8B5CF6' },
      { id: 'other', name: 'Others', icon: '📦', color: '#6B7280' }
    ];
    
    const defaultSettings = [
      ['categories', JSON.stringify(defaultCategories)],
      ['currency', '฿'],
      ['qr_code_mode', 'default2'], // Default to PromptPay default (img2)
      ['custom_qr_base64', '']
    ];
    
    defaultSettings.forEach(function(row) {
      settingsSheet.appendRow(row);
    });
  }
  
  return { success: true, message: 'Database initialized successfully' };
}

function getExpenses() {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('Expenses');
  if (!sheet) {
    initDatabase();
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  const headers = data[0];
  const expenses = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const expense = {};
    headers.forEach(function(header, idx) {
      // Format dates and times nicely for JSON response
      let val = row[idx];
      if (val instanceof Date) {
        if (header === 'Date') {
          val = Utilities.formatDate(val, Session.getScriptTimeZone(), 'yyyy-MM-dd');
        } else if (header === 'Time') {
          val = Utilities.formatDate(val, Session.getScriptTimeZone(), 'HH:mm');
        } else {
          val = val.toISOString();
        }
      }
      expense[header] = val;
    });
    expenses.push(expense);
  }
  
  // Sort by date/time descending (newest first)
  expenses.sort(function(a, b) {
    const dateTimeA = new Date(a.Date + 'T' + (a.Time || '00:00') + ':00');
    const dateTimeB = new Date(b.Date + 'T' + (b.Time || '00:00') + ':00');
    return dateTimeB - dateTimeA;
  });
  
  return expenses;
}

function addExpense(expense) {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName('Expenses');
  if (!sheet) {
    initDatabase();
    sheet = ss.getSheetByName('Expenses');
  }
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const newRow = new Array(headers.length);
  
  const id = 'exp_' + new Date().getTime() + '_' + Math.floor(Math.random() * 1000);
  const now = new Date();
  
  headers.forEach(function(header, idx) {
    switch (header) {
      case 'ID':
        newRow[idx] = id;
        break;
      case 'Timestamp':
        newRow[idx] = now;
        break;
      case 'Date':
        newRow[idx] = expense.Date || Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd');
        break;
      case 'Time':
        newRow[idx] = expense.Time || Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm');
        break;
      case 'Amount':
        newRow[idx] = parseFloat(expense.Amount);
        break;
      case 'Category':
        newRow[idx] = expense.Category;
        break;
      case 'Description':
        newRow[idx] = expense.Description || '';
        break;
      case 'Payment Method':
        newRow[idx] = expense.PaymentMethod || 'QR Code';
        break;
      case 'Created At':
        newRow[idx] = now;
        break;
      default:
        newRow[idx] = expense[header] || '';
    }
  });
  
  sheet.appendRow(newRow);
  return { success: true, id: id };
}

function updateExpense(id, updatedExpense) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('Expenses');
  if (!sheet) throw new Error("Expenses sheet not found.");
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idColIdx = headers.indexOf('ID');
  
  if (idColIdx === -1) throw new Error("ID column not found in spreadsheet.");
  
  let targetRowIdx = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][idColIdx] === id) {
      targetRowIdx = i + 1; // 1-indexed and accounts for header
      break;
    }
  }
  
  if (targetRowIdx === -1) throw new Error("Expense not found.");
  
  // Update fields
  headers.forEach(function(header, idx) {
    if (header === 'ID' || header === 'Timestamp' || header === 'Created At') return;
    
    if (header in updatedExpense) {
      let val = updatedExpense[header];
      if (header === 'Amount') val = parseFloat(val);
      sheet.getRange(targetRowIdx, idx + 1).setValue(val);
    }
  });
  
  return { success: true };
}

function deleteExpense(id) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('Expenses');
  if (!sheet) throw new Error("Expenses sheet not found.");
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idColIdx = headers.indexOf('ID');
  
  if (idColIdx === -1) throw new Error("ID column not found in spreadsheet.");
  
  let targetRowIdx = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][idColIdx] === id) {
      targetRowIdx = i + 1;
      break;
    }
  }
  
  if (targetRowIdx === -1) throw new Error("Expense not found.");
  
  sheet.deleteRow(targetRowIdx);
  return { success: true };
}

function getSettings() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName('Settings');
  if (!sheet) {
    initDatabase();
    sheet = ss.getSheetByName('Settings');
  }
  
  const data = sheet.getDataRange().getValues();
  const settings = {};
  
  for (let i = 1; i < data.length; i++) {
    const key = data[i][0];
    let val = data[i][1];
    
    // Parse JSON keys
    if (key === 'categories') {
      try {
        val = JSON.parse(val);
      } catch (e) {
        // use fallback if parse fails
      }
    }
    settings[key] = val;
  }
  
  return settings;
}

function saveSettings(settings) {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName('Settings');
  if (!sheet) {
    initDatabase();
    sheet = ss.getSheetByName('Settings');
  }
  
  const data = sheet.getDataRange().getValues();
  const keys = data.map(function(row) { return row[0]; });
  
  for (let key in settings) {
    let val = settings[key];
    if (typeof val === 'object') {
      val = JSON.stringify(val);
    }
    
    const keyIdx = keys.indexOf(key);
    if (keyIdx !== -1) {
      sheet.getRange(keyIdx + 1, 2).setValue(val);
    } else {
      sheet.appendRow([key, val]);
      keys.push(key);
    }
  }
  
  return { success: true };
}
