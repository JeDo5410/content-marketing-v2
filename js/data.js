// Available Campaigns (existing in other systems that can be selected)
const availableSalesCampaigns = [
    {
        id: 'sc-001',
        code: 'DG-TT-250801-TTPaidAd-MY-WIM-SE',
        name: 'TikTok Paid Ad Campaign for WIMSE-Aug',
        solution: 'WIM SE',
        solutionDescription: 'A work-integrated postgraduate solution designed to prepare learners for AI Application Developer roles through hands-on learning and paid industry experience.',
        channel: 'Digital',
        platforms: ['TikTok'],
        campaignObjective: 'Lead Generation',
        eventName: 'HR Conference',
        eventLocation: 'Kuala Lumpur',
        databaseSource: 'Apollo, Hubspot, Chimpmail',
        databaseSize: 2000,
        typeOfAlliance: 'Agent, Influencer',
        partnerName: 'John Doe',
        companyName: 'Tesla',
        country: 'Malaysia, Philippines, Indonesia',
        startDate: '2025-08-01',
        endDate: '2025-08-01',
        totalBudget: 500
    }
];

const availableMarketingCampaigns = [
    {
        id: 'DG-TT-250801-TTPaidAd-MY-WIM-SE',
        salesCampaignCode: 'DG-TT-250801-TTPaidAd-MY-WIM-SE',
        campaignName: 'Marketing Campaign: MC-DG-TT-250801-TTPaidAd-MY-WIM-SE',
        actualPlatform: 'TikTok',
        campaignObjective: 'Awareness',
        funnelStage: 'Top of Funnel',
        milestone: 'M1 – Market Education',
        audienceType: 'Early-career professionals & career shifters',
        targetingApproach: 'Interest & demographic-based',
        interests: 'Online learning platforms (Coursera, Udemy, LinkedIn Learning)',
        demographics: 'Age: 21–35',
        exclusions: 'Existing leads (CRM custom audience)',
        primaryCTA: 'Learn More'
    }
];

// Selected Campaigns (campaigns added to the dashboard)
let selectedSalesCampaigns = [];
let selectedMarketingCampaigns = [];

// Helper function to get sales campaign by code
function getSalesCampaignByCode(code) {
    return availableSalesCampaigns.find(campaign => campaign.code === code);
}

// Helper function to get available sales campaigns
function getAvailableSalesCampaigns() {
    // Return campaigns that haven't been selected yet
    return availableSalesCampaigns.filter(campaign =>
        !selectedSalesCampaigns.find(selected => selected.code === campaign.code)
    );
}

// Helper function to get available marketing campaigns
function getAvailableMarketingCampaigns() {
    // Return campaigns that haven't been selected yet
    return availableMarketingCampaigns.filter(campaign =>
        !selectedMarketingCampaigns.find(selected => selected.id === campaign.id)
    );
}

// Helper function to add sales campaign to dashboard
function addSalesCampaignToDashboard(campaignId) {
    const campaign = availableSalesCampaigns.find(c => c.id === campaignId);
    if (campaign && !selectedSalesCampaigns.find(c => c.id === campaignId)) {
        selectedSalesCampaigns.push(campaign);
        saveToLocalStorage();
        return true;
    }
    return false;
}

// Helper function to add marketing campaign to dashboard
function addMarketingCampaignToDashboard(campaignId) {
    const campaign = availableMarketingCampaigns.find(c => c.id === campaignId);
    if (campaign && !selectedMarketingCampaigns.find(c => c.id === campaignId)) {
        selectedMarketingCampaigns.push(campaign);
        saveToLocalStorage();
        return true;
    }
    return false;
}

// Helper function to get platforms as string
function getPlatformsString(campaign) {
    if (campaign.channel === 'Digital' && campaign.platforms) {
        return campaign.platforms.join(', ');
    } else if (campaign.channel === 'Offline') {
        return campaign.eventLocation || 'N/A';
    } else if (campaign.channel === 'Database') {
        return campaign.databaseSource || 'N/A';
    } else if (campaign.channel === 'Alliance') {
        return campaign.companyName || 'N/A';
    }
    return 'N/A';
}

// Local Storage functions
function saveToLocalStorage() {
    localStorage.setItem('selectedSalesCampaigns', JSON.stringify(selectedSalesCampaigns));
    localStorage.setItem('selectedMarketingCampaigns', JSON.stringify(selectedMarketingCampaigns));
}

function loadFromLocalStorage() {
    const savedSales = localStorage.getItem('selectedSalesCampaigns');
    const savedMarketing = localStorage.getItem('selectedMarketingCampaigns');

    if (savedSales) {
        selectedSalesCampaigns = JSON.parse(savedSales);
    }
    if (savedMarketing) {
        selectedMarketingCampaigns = JSON.parse(savedMarketing);
    }
}

// Initialize data from localStorage on page load
loadFromLocalStorage();
