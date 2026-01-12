// Campaign Data Storage
let salesCampaigns = [
    {
        id: 'sc-001',
        code: 'SC-DG-TT-250801-TTPaidAd-MY-WSD-SE',
        name: 'Sales Campaign: SC-DG-TT-250801-TTPaidAd-MY-WSD-SE',
        solution: 'WIM SE',
        solutionDescription: 'A work-integrated postgraduate solution designed to prepare learners for AI Application Developer roles through hands-on learning and paid industry experience.',
        channel: 'Digital',
        platforms: ['TikTok'],
        campaignObjective: 'Lead Generation',
        country: 'Malaysia, Philippines, Indonesia',
        startDate: '2025-08-01',
        endDate: '2025-08-01',
        totalBudget: 500
    },
    {
        id: 'sc-002',
        code: 'SC-DG-FB-250801-FBPaidAd-SG-WSD-SE',
        name: 'Sales Campaign: SC-DG-FB-250801-FBPaidAd-SG-WSD-SE',
        solution: 'Web Development Bootcamp',
        solutionDescription: 'Intensive 12-week bootcamp covering full-stack web development with React and Node.js.',
        channel: 'Digital',
        platforms: ['Facebook', 'Instagram'],
        campaignObjective: 'Brand Awareness',
        country: 'Singapore',
        startDate: '2025-08-01',
        endDate: '2025-10-01',
        totalBudget: 1200
    },
    {
        id: 'sc-003',
        code: 'SC-OF-250901-HRConf-KL-DataSci',
        name: 'Sales Campaign: SC-OF-250901-HRConf-KL-DataSci',
        solution: 'Data Science Professional',
        solutionDescription: 'Advanced data science program with industry certifications and capstone projects.',
        channel: 'Offline',
        eventName: 'HR Conference',
        eventLocation: 'Kuala Lumpur',
        country: 'Malaysia',
        startDate: '2025-09-01',
        endDate: '2025-09-03',
        totalBudget: 800
    },
    {
        id: 'sc-004',
        code: 'SC-DB-251001-Apollo-CyberSec',
        name: 'Sales Campaign: SC-DB-251001-Apollo-CyberSec',
        solution: 'Cybersecurity Specialist',
        solutionDescription: 'Comprehensive cybersecurity training with hands-on labs and certification prep.',
        channel: 'Database',
        databaseSource: 'Apollo, Hubspot, Chimpmail',
        databaseSize: 2000,
        country: 'Malaysia, Singapore',
        startDate: '2025-10-01',
        endDate: '2025-10-31',
        totalBudget: 300
    },
    {
        id: 'sc-005',
        code: 'SC-AL-251101-Agent-CloudArch',
        name: 'Sales Campaign: SC-AL-251101-Agent-CloudArch',
        solution: 'Cloud Architecture',
        solutionDescription: 'Enterprise cloud architecture program covering AWS, Azure, and GCP.',
        channel: 'Alliance',
        typeOfAlliance: 'Agent, Influencer',
        partnerName: 'John Doe',
        companyName: 'Tesla',
        country: 'Philippines',
        startDate: '2025-11-01',
        endDate: '2025-12-31',
        totalBudget: 1500
    }
];

let marketingCampaigns = [
    {
        id: 'mc-001',
        salesCampaignCode: 'SC-DG-TT-250801-TTPaidAd-MY-WSD-SE',
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
    },
    {
        id: 'mc-002',
        salesCampaignCode: 'SC-DG-FB-250801-FBPaidAd-SG-WSD-SE',
        actualPlatform: 'Facebook',
        campaignObjective: 'Conversion',
        funnelStage: 'Bottom of Funnel',
        milestone: 'M3 – Conversion',
        audienceType: 'Job seekers, recent graduates',
        targetingApproach: 'Lookalike & retargeting',
        interests: 'Web development, coding bootcamps, tech careers',
        demographics: 'Age: 22–30',
        exclusions: 'Current students',
        primaryCTA: 'Apply Now'
    },
    {
        id: 'mc-003',
        salesCampaignCode: 'SC-DB-251001-Apollo-CyberSec',
        actualPlatform: 'TikTok',
        campaignObjective: 'Engagement',
        funnelStage: 'Middle of Funnel',
        milestone: 'M2 – Lead Nurturing',
        audienceType: 'IT professionals, career changers',
        targetingApproach: 'Database targeting',
        interests: 'Cybersecurity, information security, ethical hacking',
        demographics: 'Age: 25–40',
        exclusions: 'Competitors',
        primaryCTA: 'Download Guide'
    }
];

// Helper function to get sales campaign by code
function getSalesCampaignByCode(code) {
    return salesCampaigns.find(campaign => campaign.code === code);
}

// Helper function to get marketing campaigns by sales campaign code
function getMarketingCampaignsBySalesCode(code) {
    return marketingCampaigns.filter(campaign => campaign.salesCampaignCode === code);
}

// Helper function to add new sales campaign
function addSalesCampaign(campaign) {
    campaign.id = 'sc-' + (salesCampaigns.length + 1).toString().padStart(3, '0');
    salesCampaigns.push(campaign);
    saveToLocalStorage();
    return campaign;
}

// Helper function to add new marketing campaign
function addMarketingCampaign(campaign) {
    campaign.id = 'mc-' + (marketingCampaigns.length + 1).toString().padStart(3, '0');
    marketingCampaigns.push(campaign);
    saveToLocalStorage();
    return campaign;
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
    localStorage.setItem('salesCampaigns', JSON.stringify(salesCampaigns));
    localStorage.setItem('marketingCampaigns', JSON.stringify(marketingCampaigns));
}

function loadFromLocalStorage() {
    const savedSales = localStorage.getItem('salesCampaigns');
    const savedMarketing = localStorage.getItem('marketingCampaigns');

    if (savedSales) {
        salesCampaigns = JSON.parse(savedSales);
    }
    if (savedMarketing) {
        marketingCampaigns = JSON.parse(savedMarketing);
    }
}

// Initialize data from localStorage on page load
loadFromLocalStorage();
