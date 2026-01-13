// Modal state
let currentStep = 'type-selection';
let currentCampaignType = null;
let selectedCampaignId = null;

// Open modal
function openModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.add('active');
    showCampaignTypeSelection();

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', handleEscKey);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    document.removeEventListener('keydown', handleEscKey);
    currentStep = 'type-selection';
    currentCampaignType = null;
}

// Handle ESC key
function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// Show campaign type selection
function showCampaignTypeSelection() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = 'Select Campaign Type';

    modalBody.innerHTML = `
        <div class="campaign-type-selection">
            <div class="campaign-type-card" onclick="selectCampaignType('sales')">
                <div class="campaign-type-icon">📊</div>
                <div class="campaign-type-title">Sales Campaign</div>
                <div class="campaign-type-description">Add an existing sales campaign to your dashboard</div>
            </div>
            <div class="campaign-type-card" onclick="selectCampaignType('marketing')">
                <div class="campaign-type-icon">🎯</div>
                <div class="campaign-type-title">Marketing Campaign</div>
                <div class="campaign-type-description">Add an existing marketing campaign to your dashboard</div>
            </div>
        </div>
    `;
}

// Select campaign type
function selectCampaignType(type) {
    currentCampaignType = type;

    if (type === 'sales') {
        showSalesCampaignSelector();
    } else if (type === 'marketing') {
        showMarketingCampaignSelector();
    }
}

// Show Sales Campaign Selector
function showSalesCampaignSelector() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = 'Select Sales Campaign';

    const availableCampaigns = getAvailableSalesCampaigns();

    if (availableCampaigns.length === 0) {
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="color: #7f8c8d; margin-bottom: 20px;">No sales campaigns available to add.</p>
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            </div>
        `;
        return;
    }

    modalBody.innerHTML = `
        <form class="campaign-form" id="selectSalesForm" onsubmit="handleSalesCampaignSelect(event)">
            <p style="color: #7f8c8d; margin-bottom: 20px; font-size: 14px;">
                Select an existing sales campaign from the dropdown below. This campaign has already been created in the Sales Campaign system.
            </p>

            <div class="form-group">
                <label class="form-label required">Select Campaign</label>
                <div class="searchable-dropdown" data-type="sales">
                    <input type="text"
                           class="form-select searchable-input"
                           id="salesSearchInput"
                           placeholder="Type to search or click to select..."
                           autocomplete="off">
                    <input type="hidden" name="campaignId" required>
                    <ul class="dropdown-list">
                        ${availableCampaigns.map(campaign => `
                            <li class="dropdown-item" data-value="${campaign.id}">
                                ${campaign.code} - ${campaign.name}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <div id="campaignPreview" style="display: none; padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #2c3e50;">Campaign Details:</h4>
                <div id="previewContent"></div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="showCampaignTypeSelection()">Back</button>
                <button type="button" class="btn btn-canvas" onclick="navigateToCanvasFromModal()">💡 Solution Marketing Canvas</button>
                <button type="button" class="btn btn-content" onclick="navigateToContentCreationFromModal()">✨ Content Creation</button>
            </div>
        </form>
    `;

    // Initialize searchable dropdown after HTML is inserted
    setTimeout(() => initializeSearchableDropdown(), 0);
}

// Show Marketing Campaign Selector
function showMarketingCampaignSelector() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = 'Select Marketing Campaign';

    const availableCampaigns = getAvailableMarketingCampaigns();

    if (availableCampaigns.length === 0) {
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="color: #7f8c8d; margin-bottom: 20px;">No marketing campaigns available to add.</p>
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            </div>
        `;
        return;
    }

    modalBody.innerHTML = `
        <form class="campaign-form" id="selectMarketingForm" onsubmit="handleMarketingCampaignSelect(event)">
            <p style="color: #7f8c8d; margin-bottom: 20px; font-size: 14px;">
                Select an existing marketing campaign from the dropdown below. This campaign has already been created in the Marketing Campaign system and is linked to a sales campaign.
            </p>

            <div class="form-group">
                <label class="form-label required">Select Campaign</label>
                <div class="searchable-dropdown" data-type="marketing">
                    <input type="text"
                           class="form-select searchable-input"
                           id="marketingSearchInput"
                           placeholder="Type to search or click to select..."
                           autocomplete="off">
                    <input type="hidden" name="campaignId" required>
                    <ul class="dropdown-list">
                        ${availableCampaigns.map(campaign => `
                            <li class="dropdown-item" data-value="${campaign.id}">
                                ${campaign.salesCampaignCode} - ${campaign.campaignName}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <div id="campaignPreview" style="display: none; padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #2c3e50;">Campaign Details:</h4>
                <div id="previewContent"></div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="showCampaignTypeSelection()">Back</button>
                <button type="button" class="btn btn-canvas" onclick="navigateToCanvasFromModal()">💡 Solution Marketing Canvas</button>
                <button type="button" class="btn btn-content" onclick="navigateToContentCreationFromModal()">✨ Content Creation</button>
            </div>
        </form>
    `;

    // Initialize searchable dropdown after HTML is inserted
    setTimeout(() => initializeSearchableDropdown(), 0);
}

// Show campaign preview when selected
function showCampaignPreview(campaignId, type) {
    if (!campaignId) {
        document.getElementById('campaignPreview').style.display = 'none';
        selectedCampaignId = null;
        return;
    }

    // Store the selected campaign ID
    selectedCampaignId = campaignId;

    const previewDiv = document.getElementById('campaignPreview');
    const contentDiv = document.getElementById('previewContent');

    if (type === 'sales') {
        const campaign = availableSalesCampaigns.find(c => c.id === campaignId);
        if (campaign) {
            contentDiv.innerHTML = `
                <div style="display: grid; gap: 10px; font-size: 14px;">
                    <div><strong>Channel:</strong> <span class="badge badge-${campaign.channel.toLowerCase()}">${campaign.channel}</span></div>
                    <div><strong>Social Media Platform:</strong> ${campaign.platforms ? campaign.platforms.join(', ') : 'N/A'}</div>
                    <div><strong>Campaign Objective:</strong> ${campaign.campaignObjective || 'Awareness'}</div>
                </div>
            `;
            previewDiv.style.display = 'block';
        }
    } else if (type === 'marketing') {
        const campaign = availableMarketingCampaigns.find(c => c.id === campaignId);
        if (campaign) {
            const salesCampaign = getSalesCampaignByCode(campaign.salesCampaignCode);
            contentDiv.innerHTML = `
                <div style="display: grid; gap: 10px; font-size: 14px;">
                    <div><strong>Channel:</strong> <span class="badge badge-${salesCampaign ? salesCampaign.channel.toLowerCase() : 'digital'}">${salesCampaign ? salesCampaign.channel : 'Digital'}</span></div>
                    <div><strong>Social Media Platform:</strong> ${campaign.actualPlatform}</div>
                    <div><strong>Campaign Objective:</strong> ${campaign.campaignObjective}</div>
                </div>
            `;
            previewDiv.style.display = 'block';
        }
    }
}

// Handle Sales Campaign Selection
function handleSalesCampaignSelect(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const campaignId = formData.get('campaignId');

    if (!campaignId) {
        alert('Please select a campaign');
        return;
    }

    // Add campaign to dashboard
    const success = addSalesCampaignToDashboard(campaignId);

    if (success) {
        // Refresh dashboard
        refreshDashboard();

        // Close modal
        closeModal();

        // Show success message
        alert('Sales campaign added to dashboard successfully!');
    } else {
        alert('Failed to add campaign. It may already be on the dashboard.');
    }
}

// Handle Marketing Campaign Selection
function handleMarketingCampaignSelect(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const campaignId = formData.get('campaignId');

    if (!campaignId) {
        alert('Please select a campaign');
        return;
    }

    // Add campaign to dashboard
    const success = addMarketingCampaignToDashboard(campaignId);

    if (success) {
        // Refresh dashboard
        refreshDashboard();

        // Close modal
        closeModal();

        // Show success message
        alert('Marketing campaign added to dashboard successfully!');
    } else {
        alert('Failed to add campaign. It may already be on the dashboard.');
    }
}

// Navigate to Canvas from modal
function navigateToCanvasFromModal() {
    if (!selectedCampaignId) {
        alert('Please select a campaign first');
        return;
    }

    // Add campaign to dashboard first
    if (currentCampaignType === 'sales') {
        addSalesCampaignToDashboard(selectedCampaignId);
    } else if (currentCampaignType === 'marketing') {
        addMarketingCampaignToDashboard(selectedCampaignId);
    }

    // Navigate to canvas page
    window.location.href = `solution-marketing-canvas.html?campaign=${encodeURIComponent(selectedCampaignId)}`;
}

// Navigate to Content Creation from modal
function navigateToContentCreationFromModal() {
    if (!selectedCampaignId) {
        alert('Please select a campaign first');
        return;
    }

    // Add campaign to dashboard first
    if (currentCampaignType === 'sales') {
        addSalesCampaignToDashboard(selectedCampaignId);
    } else if (currentCampaignType === 'marketing') {
        addMarketingCampaignToDashboard(selectedCampaignId);
    }

    // Navigate to content generator page
    window.location.href = `content-generator.html?campaign=${encodeURIComponent(selectedCampaignId)}`;
}

// Searchable Dropdown Functions
function initializeSearchableDropdown() {
    const dropdowns = document.querySelectorAll('.searchable-dropdown');

    dropdowns.forEach(dropdown => {
        const searchInput = dropdown.querySelector('.searchable-input');
        const dropdownList = dropdown.querySelector('.dropdown-list');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        const type = dropdown.getAttribute('data-type');
        const allItems = dropdownList.querySelectorAll('.dropdown-item');

        // Show dropdown on focus/click
        searchInput.addEventListener('focus', () => {
            dropdownList.style.display = 'block';
        });

        searchInput.addEventListener('click', () => {
            dropdownList.style.display = 'block';
        });

        // Filter items on input
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
            let hasVisibleItems = false;

            allItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchText)) {
                    item.style.display = 'block';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });

            dropdownList.style.display = hasVisibleItems || searchText === '' ? 'block' : 'none';
        });

        // Handle item selection
        allItems.forEach(item => {
            item.addEventListener('click', () => {
                searchInput.value = item.textContent.trim();
                hiddenInput.value = item.getAttribute('data-value');
                dropdownList.style.display = 'none';

                // Show preview
                showCampaignPreview(item.getAttribute('data-value'), type);
            });
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.searchable-dropdown')) {
            document.querySelectorAll('.dropdown-list').forEach(list => {
                list.style.display = 'none';
            });
        }
    });
}

// Attach close button listener
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('modalClose');
    closeBtn.addEventListener('click', closeModal);
});
