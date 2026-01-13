// Modal state
let currentStep = 'type-selection';
let currentCampaignType = null;

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
                <select class="form-select" name="campaignId" required onchange="showCampaignPreview(this.value, 'sales')">
                    <option value="">Choose a sales campaign...</option>
                    ${availableCampaigns.map(campaign => `
                        <option value="${campaign.id}">${campaign.code} - ${campaign.name}</option>
                    `).join('')}
                </select>
            </div>

            <div id="campaignPreview" style="display: none; padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #2c3e50;">Campaign Details:</h4>
                <div id="previewContent"></div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="showCampaignTypeSelection()">Back</button>
                <button type="submit" class="btn btn-submit">Add to Dashboard</button>
            </div>
        </form>
    `;
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
                <select class="form-select" name="campaignId" required onchange="showCampaignPreview(this.value, 'marketing')">
                    <option value="">Choose a marketing campaign...</option>
                    ${availableCampaigns.map(campaign => `
                        <option value="${campaign.id}">${campaign.salesCampaignCode} - ${campaign.campaignName}</option>
                    `).join('')}
                </select>
            </div>

            <div id="campaignPreview" style="display: none; padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #2c3e50;">Campaign Details:</h4>
                <div id="previewContent"></div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="showCampaignTypeSelection()">Back</button>
                <button type="submit" class="btn btn-submit">Add to Dashboard</button>
            </div>
        </form>
    `;
}

// Show campaign preview when selected
function showCampaignPreview(campaignId, type) {
    if (!campaignId) {
        document.getElementById('campaignPreview').style.display = 'none';
        return;
    }

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

// Attach close button listener
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('modalClose');
    closeBtn.addEventListener('click', closeModal);
});
