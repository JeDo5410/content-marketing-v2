// Dashboard initialization
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    attachEventListeners();
});

// Initialize dashboard
function initDashboard() {
    updateCampaignCounts();
    renderSalesCampaignsTable(selectedSalesCampaigns);
    renderMarketingCampaignsTable(selectedMarketingCampaigns);
}

// Update campaign counts
function updateCampaignCounts() {
    document.getElementById('salesCount').textContent = `(${selectedSalesCampaigns.length})`;
    document.getElementById('marketingCount').textContent = `(${selectedMarketingCampaigns.length})`;
}

// Render Sales Campaigns Table
function renderSalesCampaignsTable(campaigns) {
    const tableBody = document.getElementById('salesCampaignsTable');

    if (campaigns.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="no-campaigns">No sales campaigns added yet. Click "Search Campaign" to add one.</td>
            </tr>
        `;
        return;
    }

    const rows = campaigns.map(campaign => {
        const platforms = getPlatformsString(campaign);
        const channelBadgeClass = `badge-${campaign.channel.toLowerCase()}`;
        const campaignId = campaign.id || campaign.code;

        return `
            <tr class="campaign-row" data-campaign-id="${campaignId}" style="cursor: pointer;">
                <td>${campaign.code}</td>
                <td>${campaign.name}</td>
                <td><span class="badge ${channelBadgeClass}">${campaign.channel}</span></td>
                <td>${platforms}</td>
            </tr>
        `;
    }).join('');

    tableBody.innerHTML = rows;

    // Add click handlers to rows
    tableBody.querySelectorAll('.campaign-row').forEach(row => {
        row.addEventListener('click', () => {
            const campaignId = row.getAttribute('data-campaign-id');
            navigateToCanvas(campaignId);
        });
    });
}

// Render Marketing Campaigns Table
function renderMarketingCampaignsTable(campaigns) {
    const tableBody = document.getElementById('marketingCampaignsTable');

    if (campaigns.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="no-campaigns">No marketing campaigns added yet. Click "Search Campaign" to add one.</td>
            </tr>
        `;
        return;
    }

    const rows = campaigns.map(campaign => {
        // Get linked sales campaign data
        const salesCampaign = getSalesCampaignByCode(campaign.salesCampaignCode);

        if (!salesCampaign) {
            return '';
        }

        const platforms = campaign.actualPlatform || 'N/A';
        const channelBadgeClass = `badge-${salesCampaign.channel.toLowerCase()}`;
        const campaignId = campaign.id;

        return `
            <tr class="campaign-row" data-campaign-id="${campaignId}" style="cursor: pointer;">
                <td>${campaign.salesCampaignCode}</td>
                <td>${salesCampaign.name}</td>
                <td><span class="badge ${channelBadgeClass}">${salesCampaign.channel}</span></td>
                <td>${platforms}</td>
            </tr>
        `;
    }).join('');

    tableBody.innerHTML = rows;

    // Add click handlers to rows
    tableBody.querySelectorAll('.campaign-row').forEach(row => {
        row.addEventListener('click', () => {
            const campaignId = row.getAttribute('data-campaign-id');
            navigateToCanvas(campaignId);
        });
    });
}

// Filter campaigns based on selected filters
function filterCampaigns() {
    const selectedChannels = getSelectedFilters('channel-filter');
    const selectedPlatforms = getSelectedFilters('platform-filter');

    // Filter sales campaigns
    let filteredSales = selectedSalesCampaigns;
    if (selectedChannels.length > 0 || selectedPlatforms.length > 0) {
        filteredSales = selectedSalesCampaigns.filter(campaign => {
            const channelMatch = selectedChannels.length === 0 || selectedChannels.includes(campaign.channel);
            let platformMatch = selectedPlatforms.length === 0;

            if (selectedPlatforms.length > 0) {
                if (campaign.channel === 'Digital' && campaign.platforms) {
                    platformMatch = campaign.platforms.some(p => selectedPlatforms.includes(p));
                }
            }

            return channelMatch && (selectedPlatforms.length === 0 || platformMatch);
        });
    }

    // Filter marketing campaigns based on their linked sales campaigns
    let filteredMarketing = selectedMarketingCampaigns;
    if (selectedChannels.length > 0 || selectedPlatforms.length > 0) {
        filteredMarketing = selectedMarketingCampaigns.filter(campaign => {
            const salesCampaign = getSalesCampaignByCode(campaign.salesCampaignCode);
            if (!salesCampaign) return false;

            const channelMatch = selectedChannels.length === 0 || selectedChannels.includes(salesCampaign.channel);
            let platformMatch = selectedPlatforms.length === 0;

            if (selectedPlatforms.length > 0) {
                // Check if marketing campaign's actual platform matches
                platformMatch = selectedPlatforms.includes(campaign.actualPlatform);
            }

            return channelMatch && (selectedPlatforms.length === 0 || platformMatch);
        });
    }

    // Update tables
    renderSalesCampaignsTable(filteredSales);
    renderMarketingCampaignsTable(filteredMarketing);

    // Update counts
    document.getElementById('salesCount').textContent = `(${filteredSales.length})`;
    document.getElementById('marketingCount').textContent = `(${filteredMarketing.length})`;
}

// Get selected filter values
function getSelectedFilters(className) {
    const checkboxes = document.querySelectorAll(`.${className}:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

// Toggle collapsible sections
function toggleCollapsible(section) {
    const collapsibleSection = section.closest('.collapsible-section');
    collapsibleSection.classList.toggle('collapsed');
}

// Attach event listeners
function attachEventListeners() {
    // Filter checkboxes
    const channelFilters = document.querySelectorAll('.channel-filter');
    const platformFilters = document.querySelectorAll('.platform-filter');

    channelFilters.forEach(filter => {
        filter.addEventListener('change', filterCampaigns);
    });

    platformFilters.forEach(filter => {
        filter.addEventListener('change', filterCampaigns);
    });

    // Collapsible headers
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', () => toggleCollapsible(header));
    });

    // Select Campaign button
    const selectCampaignBtn = document.getElementById('sweepCampaignBtn');
    selectCampaignBtn.addEventListener('click', openModal);

    // Filters toggle button
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersSidebar = document.getElementById('filtersSidebar');

    filtersToggle.addEventListener('click', () => {
        filtersSidebar.classList.toggle('collapsed');
    });
}

// Refresh dashboard (called after adding new campaigns)
function refreshDashboard() {
    updateCampaignCounts();
    filterCampaigns(); // This will re-render tables with current filters
}

// Navigate to canvas page
function navigateToCanvas(campaignId) {
    window.location.href = `solution-marketing-canvas.html?campaign=${encodeURIComponent(campaignId)}`;
}
