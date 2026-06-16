// Auto-save to localStorage on any data change
function saveState() {
  updateSaveIndicator('saving');
  localStorage.setItem('travelplan_days', JSON.stringify(window.days));
  localStorage.setItem('travelplan_checklist', JSON.stringify(window.checklist));
  localStorage.setItem('travelplan_budget', window.budget);
  localStorage.setItem('travelplan_title', document.getElementById('trip-title').value);
  // Show saved status
  setTimeout(function(){
    updateSaveIndicator('saved');
  }, 300);
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

// Patch the render functions to auto-save
const originalRenderDays = window.renderDays;
window.renderDays = function() {
  originalRenderDays.apply(this, arguments);
  saveState();
};

const originalRenderChecklist = window.renderChecklist;
window.renderChecklist = function() {
  originalRenderChecklist.apply(this, arguments);
  saveState();
};

// Save on various user actions
document.addEventListener('change', saveState);
document.addEventListener('input', saveState);
