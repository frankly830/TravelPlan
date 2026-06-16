// Auto-save to localStorage on any data change with debouncing
let saveTimeout;
let saveDebouncedTimeout;

function saveState() {
  // Clear existing timers
  clearTimeout(saveDebouncedTimeout);
  clearTimeout(saveTimeout);
  
  // Show saving indicator immediately on first change
  if (!document.getElementById('save-indicator').classList.contains('saving')) {
    updateSaveIndicator('saving');
  }
  
  // Debounce the actual save and show "saved" message
  saveDebouncedTimeout = setTimeout(function(){
    localStorage.setItem('travelplan_days', JSON.stringify(window.days));
    localStorage.setItem('travelplan_checklist', JSON.stringify(window.checklist));
    localStorage.setItem('travelplan_budget', window.budget);
    localStorage.setItem('travelplan_title', document.getElementById('trip-title').value);
    
    // Show saved status
    updateSaveIndicator('saved');
  }, 800);
}

function loadState() {
  const savedDays = localStorage.getItem('travelplan_days');
  const savedChecklist = localStorage.getItem('travelplan_checklist');
  const savedBudget = localStorage.getItem('travelplan_budget');
  const savedTitle = localStorage.getItem('travelplan_title');
  
  if (savedDays) window.days = JSON.parse(savedDays);
  if (savedChecklist) window.checklist = JSON.parse(savedChecklist);
  if (savedBudget) window.budget = Number(savedBudget);
  if (savedTitle) document.getElementById('trip-title').value = savedTitle;
}

// Load state when page loads
window.addEventListener('load', function() {
  loadState();
  renderDays();
  updateSidebar();
  populateCheckCats();
  updateSaveIndicator('saved');
});

// Patch the render functions to NOT trigger save (they just update UI)
// We'll let the document event listeners handle saves instead
const originalRenderCosts = window.renderCosts;
window.renderCosts = function() {
  originalRenderCosts.apply(this, arguments);
};

const originalRenderChecklist = window.renderChecklist;
window.renderChecklist = function() {
  originalRenderChecklist.apply(this, arguments);
};

// Save on user actions with debounce
document.addEventListener('change', saveState);
document.addEventListener('input', saveState);
