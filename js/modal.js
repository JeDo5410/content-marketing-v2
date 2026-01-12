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
                <div class="campaign-type-description">Create a new sales campaign with channel-specific details</div>
            </div>
            <div class="campaign-type-card" onclick="selectCampaignType('marketing')">
                <div class="campaign-type-icon">🎯</div>
                <div class="campaign-type-title">Marketing Campaign</div>
                <div class="campaign-type-description">Add a marketing campaign linked to an existing sales campaign</div>
            </div>
        </div>
    `;
}

// Select campaign type
function selectCampaignType(type) {
    currentCampaignType = type;

    if (type === 'sales') {
        showSalesCampaignForm();
    } else if (type === 'marketing') {
        showMarketingCampaignForm();
    }
}

// Show Sales Campaign Form
function showSalesCampaignForm() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = 'Add Sales Campaign';

    modalBody.innerHTML = `
        <form class="campaign-form" id="salesCampaignForm" onsubmit="handleSalesCampaignSubmit(event)">
            <div class="form-group">
                <label class="form-label required">Sales Campaign Code</label>
                <input type="text" class="form-input" name="code" required placeholder="e.g., SC-DG-TT-250801">
            </div>

            <div class="form-group">
                <label class="form-label required">Campaign Name</label>
                <input type="text" class="form-input" name="name" required placeholder="Enter campaign name">
            </div>

            <div class="form-group">
                <label class="form-label required">Solution</label>
                <input type="text" class="form-input" name="solution" required placeholder="e.g., WIM SE">
            </div>

            <div class="form-group">
                <label class="form-label required">Solution Description</label>
                <textarea class="form-textarea" name="solutionDescription" required placeholder="Describe the solution"></textarea>
            </div>

            <div class="form-group">
                <label class="form-label required">Channel</label>
                <select class="form-select" name="channel" required onchange="handleChannelChange(this.value)">
                    <option value="">Select channel</option>
                    <option value="Digital">Digital</option>
                    <option value="Offline">Offline</option>
                    <option value="Database">Database</option>
                    <option value="Alliance">Alliance</option>
                </select>
            </div>

            <!-- Conditional Fields -->
            <div class="conditional-field" id="digitalFields">
                <div class="form-group">
                    <label class="form-label">Social Media Platforms</label>
                    <div class="form-checkboxes">
                        <label class="form-checkbox-label">
                            <input type="checkbox" name="platforms" value="TikTok">
                            <span>TikTok</span>
                        </label>
                        <label class="form-checkbox-label">
                            <input type="checkbox" name="platforms" value="Facebook">
                            <span>Facebook</span>
                        </label>
                        <label class="form-checkbox-label">
                            <input type="checkbox" name="platforms" value="Instagram">
                            <span>Instagram</span>
                        </label>
                        <label class="form-checkbox-label">
                            <input type="checkbox" name="platforms" value="LinkedIn">
                            <span>LinkedIn</span>
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Campaign Objective</label>
                    <input type="text" class="form-input" name="campaignObjective" placeholder="e.g., Lead Generation">
                </div>
            </div>

            <div class="conditional-field" id="offlineFields">
                <div class="form-group">
                    <label class="form-label required">Event Name</label>
                    <input type="text" class="form-input" name="eventName" placeholder="e.g., HR Conference">
                </div>
                <div class="form-group">
                    <label class="form-label required">Event Location</label>
                    <input type="text" class="form-input" name="eventLocation" placeholder="e.g., Kuala Lumpur">
                </div>
            </div>

            <div class="conditional-field" id="databaseFields">
                <div class="form-group">
                    <label class="form-label required">Database Source</label>
                    <input type="text" class="form-input" name="databaseSource" placeholder="e.g., Apollo, Hubspot">
                </div>
                <div class="form-group">
                    <label class="form-label required">Database Size</label>
                    <input type="number" class="form-input" name="databaseSize" placeholder="e.g., 2000">
                </div>
            </div>

            <div class="conditional-field" id="allianceFields">
                <div class="form-group">
                    <label class="form-label required">Type of Alliance</label>
                    <input type="text" class="form-input" name="typeOfAlliance" placeholder="e.g., Agent, Influencer">
                </div>
                <div class="form-group">
                    <label class="form-label required">Partner Name</label>
                    <input type="text" class="form-input" name="partnerName" placeholder="e.g., John Doe">
                </div>
                <div class="form-group">
                    <label class="form-label required">Company Name</label>
                    <input type="text" class="form-input" name="companyName" placeholder="e.g., Tesla">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label required">Country</label>
                <input type="text" class="form-input" name="country" required placeholder="e.g., Malaysia, Singapore">
            </div>

            <div class="form-group">
                <label class="form-label required">Campaign Start Date</label>
                <input type="date" class="form-input" name="startDate" required>
            </div>

            <div class="form-group">
                <label class="form-label required">Campaign End Date</label>
                <input type="date" class="form-input" name="endDate" required>
            </div>

            <div class="form-group">
                <label class="form-label required">Total Budget ($)</label>
                <input type="number" class="form-input" name="totalBudget" required placeholder="e.g., 500">
            </div>

            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-submit">Add Campaign</button>
            </div>
        </form>
    `;
}

// Handle channel change
function handleChannelChange(channel) {
    // Hide all conditional fields
    document.querySelectorAll('.conditional-field').forEach(field => {
        field.classList.remove('active');
    });

    // Show relevant conditional field
    if (channel === 'Digital') {
        document.getElementById('digitalFields').classList.add('active');
    } else if (channel === 'Offline') {
        document.getElementById('offlineFields').classList.add('active');
    } else if (channel === 'Database') {
        document.getElementById('databaseFields').classList.add('active');
    } else if (channel === 'Alliance') {
        document.getElementById('allianceFields').classList.add('active');
    }
}

// Show Marketing Campaign Form
function showMarketingCampaignForm() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = 'Add Marketing Campaign';

    modalBody.innerHTML = `
        <form class="campaign-form" id="marketingCampaignForm" onsubmit="handleMarketingCampaignSubmit(event)">
            <div class="form-group">
                <label class="form-label required">Sales Campaign Code</label>
                <input type="text" class="form-input" name="salesCampaignCode" required
                       placeholder="e.g., SC-DG-TT-250801-TTPaidAd-MY-WSD-SE"
                       onblur="fetchLinkedSalesCampaign(this.value)">
                <small style="color: #7f8c8d;">Enter the code of the existing sales campaign to link</small>
            </div>

            <div id="linkedCampaignInfo" style="display: none; padding: 16px; background: #f8f9fa; border-radius: 8px; margin-bottom: 16px;">
                <strong style="color: #27ae60;">✓ Linked Sales Campaign Found:</strong>
                <div id="linkedCampaignDetails" style="margin-top: 8px; font-size: 14px; color: #2c3e50;"></div>
            </div>

            <div class="form-group">
                <label class="form-label required">Actual Platform Used</label>
                <select class="form-select" name="actualPlatform" required>
                    <option value="">Select platform</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label required">Campaign Objective</label>
                <input type="text" class="form-input" name="campaignObjective" required placeholder="e.g., Awareness">
            </div>

            <div class="form-group">
                <label class="form-label required">Funnel Stage</label>
                <select class="form-select" name="funnelStage" required>
                    <option value="">Select funnel stage</option>
                    <option value="Top of Funnel">Top of Funnel</option>
                    <option value="Middle of Funnel">Middle of Funnel</option>
                    <option value="Bottom of Funnel">Bottom of Funnel</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label required">Milestone</label>
                <input type="text" class="form-input" name="milestone" required placeholder="e.g., M1 – Market Education">
            </div>

            <div class="form-group">
                <label class="form-label required">Audience Type</label>
                <input type="text" class="form-input" name="audienceType" required placeholder="e.g., Early-career professionals">
            </div>

            <div class="form-group">
                <label class="form-label required">Targeting Approach</label>
                <input type="text" class="form-input" name="targetingApproach" required placeholder="e.g., Interest & demographic-based">
            </div>

            <div class="form-group">
                <label class="form-label required">Interests</label>
                <textarea class="form-textarea" name="interests" required placeholder="e.g., Online learning platforms"></textarea>
            </div>

            <div class="form-group">
                <label class="form-label required">Demographics</label>
                <input type="text" class="form-input" name="demographics" required placeholder="e.g., Age: 21–35">
            </div>

            <div class="form-group">
                <label class="form-label required">Exclusions</label>
                <input type="text" class="form-input" name="exclusions" required placeholder="e.g., Existing leads">
            </div>

            <div class="form-group">
                <label class="form-label required">Primary CTA</label>
                <input type="text" class="form-input" name="primaryCTA" required placeholder="e.g., Learn More">
            </div>

            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-submit">Add Campaign</button>
            </div>
        </form>
    `;
}

// Fetch linked sales campaign (simulate fetching from backend)
function fetchLinkedSalesCampaign(code) {
    if (!code) return;

    const salesCampaign = getSalesCampaignByCode(code);
    const infoDiv = document.getElementById('linkedCampaignInfo');
    const detailsDiv = document.getElementById('linkedCampaignDetails');

    if (salesCampaign) {
        infoDiv.style.display = 'block';
        detailsDiv.innerHTML = `
            <div><strong>Name:</strong> ${salesCampaign.name}</div>
            <div><strong>Solution:</strong> ${salesCampaign.solution}</div>
            <div><strong>Channel:</strong> ${salesCampaign.channel}</div>
            <div><strong>Budget:</strong> $${salesCampaign.totalBudget.toLocaleString()}</div>
        `;
    } else {
        infoDiv.style.display = 'block';
        infoDiv.style.background = '#fee';
        detailsDiv.innerHTML = '<span style="color: #e74c3c;">Sales campaign not found. Please check the code.</span>';
    }
}

// Handle Sales Campaign Form Submit
function handleSalesCampaignSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Create campaign object
    const campaign = {
        code: formData.get('code'),
        name: formData.get('name'),
        solution: formData.get('solution'),
        solutionDescription: formData.get('solutionDescription'),
        channel: formData.get('channel'),
        country: formData.get('country'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        totalBudget: parseFloat(formData.get('totalBudget'))
    };

    // Add channel-specific fields
    if (campaign.channel === 'Digital') {
        campaign.platforms = formData.getAll('platforms');
        campaign.campaignObjective = formData.get('campaignObjective');
    } else if (campaign.channel === 'Offline') {
        campaign.eventName = formData.get('eventName');
        campaign.eventLocation = formData.get('eventLocation');
    } else if (campaign.channel === 'Database') {
        campaign.databaseSource = formData.get('databaseSource');
        campaign.databaseSize = parseInt(formData.get('databaseSize'));
    } else if (campaign.channel === 'Alliance') {
        campaign.typeOfAlliance = formData.get('typeOfAlliance');
        campaign.partnerName = formData.get('partnerName');
        campaign.companyName = formData.get('companyName');
    }

    // Validate
    if (!validateSalesCampaign(campaign)) {
        return;
    }

    // Add campaign
    addSalesCampaign(campaign);

    // Refresh dashboard
    refreshDashboard();

    // Close modal
    closeModal();

    // Show success message
    alert('Sales campaign added successfully!');
}

// Handle Marketing Campaign Form Submit
function handleMarketingCampaignSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Validate that sales campaign exists
    const salesCampaignCode = formData.get('salesCampaignCode');
    const linkedSalesCampaign = getSalesCampaignByCode(salesCampaignCode);

    if (!linkedSalesCampaign) {
        alert('Error: Sales campaign not found. Please check the code.');
        return;
    }

    // Create campaign object
    const campaign = {
        salesCampaignCode: salesCampaignCode,
        actualPlatform: formData.get('actualPlatform'),
        campaignObjective: formData.get('campaignObjective'),
        funnelStage: formData.get('funnelStage'),
        milestone: formData.get('milestone'),
        audienceType: formData.get('audienceType'),
        targetingApproach: formData.get('targetingApproach'),
        interests: formData.get('interests'),
        demographics: formData.get('demographics'),
        exclusions: formData.get('exclusions'),
        primaryCTA: formData.get('primaryCTA')
    };

    // Add campaign
    addMarketingCampaign(campaign);

    // Refresh dashboard
    refreshDashboard();

    // Close modal
    closeModal();

    // Show success message
    alert('Marketing campaign added successfully!');
}

// Validate Sales Campaign
function validateSalesCampaign(campaign) {
    // Check channel-specific required fields
    if (campaign.channel === 'Digital' && (!campaign.platforms || campaign.platforms.length === 0)) {
        alert('Please select at least one social media platform for Digital channel.');
        return false;
    }

    if (campaign.channel === 'Offline' && (!campaign.eventName || !campaign.eventLocation)) {
        alert('Please fill in Event Name and Event Location for Offline channel.');
        return false;
    }

    if (campaign.channel === 'Database' && (!campaign.databaseSource || !campaign.databaseSize)) {
        alert('Please fill in Database Source and Database Size for Database channel.');
        return false;
    }

    if (campaign.channel === 'Alliance' && (!campaign.typeOfAlliance || !campaign.partnerName || !campaign.companyName)) {
        alert('Please fill in all Alliance fields.');
        return false;
    }

    return true;
}

// Attach close button listener
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('modalClose');
    closeBtn.addEventListener('click', closeModal);
});
