// Canvas data storage
let canvasData = {
    campaignId: null,
    customerProblem: '',
    productService: '',
    marketSegment: '',
    solutionValue: '',
    keyBenefits: ''
};

// Initialize canvas
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    attachCanvasEventListeners();
});

// Initialize canvas with data
function initCanvas() {
    // Get campaign ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const campaignId = urlParams.get('campaign');

    if (campaignId) {
        canvasData.campaignId = campaignId;
        loadCanvasData(campaignId);
        updateCampaignHeader(campaignId);
    } else {
        // If no campaign ID, redirect to dashboard
        console.warn('No campaign ID provided');
    }
}

// Load canvas data from localStorage
function loadCanvasData(campaignId) {
    const savedCanvasData = localStorage.getItem(`canvas_${campaignId}`);

    if (savedCanvasData) {
        const data = JSON.parse(savedCanvasData);
        canvasData = data;

        // Populate form fields
        document.getElementById('customerProblem').value = data.customerProblem || '';
        document.getElementById('productService').value = data.productService || '';
        document.getElementById('marketSegment').value = data.marketSegment || '';
        document.getElementById('solutionValue').value = data.solutionValue || '';
        document.getElementById('keyBenefits').value = data.keyBenefits || '';
    } else {
        // Auto-populate with campaign data if available
        autoPopulateFromCampaign(campaignId);
    }
}

// Auto-populate canvas from campaign data
function autoPopulateFromCampaign(campaignId) {
    // Get campaign data from localStorage
    const salesCampaigns = JSON.parse(localStorage.getItem('selectedSalesCampaigns') || '[]');
    const campaign = salesCampaigns.find(c => c.id === campaignId || c.code === campaignId);

    if (campaign) {
        // Auto-populate fields based on campaign data
        const customerProblem = `Target audience needs AI Application Developer skills but lacks hands-on experience and industry connections.`;
        const productService = campaign.solutionDescription || campaign.solution;
        const marketSegment = campaign.country || 'Malaysia, Philippines, Indonesia';
        const solutionValue = `${campaign.solution} provides work-integrated learning with paid industry experience, bridging the gap between education and employment.`;
        const keyBenefits = `1. Hands-on learning with real projects\n2. Paid industry experience\n3. Direct pathway to AI Application Developer roles`;

        // Set the values
        document.getElementById('customerProblem').value = customerProblem;
        document.getElementById('productService').value = productService;
        document.getElementById('marketSegment').value = marketSegment;
        document.getElementById('solutionValue').value = solutionValue;
        document.getElementById('keyBenefits').value = keyBenefits;

        // Update canvas data object
        canvasData.customerProblem = customerProblem;
        canvasData.productService = productService;
        canvasData.marketSegment = marketSegment;
        canvasData.solutionValue = solutionValue;
        canvasData.keyBenefits = keyBenefits;
    }
}

// Update campaign header in sidebar
function updateCampaignHeader(campaignId) {
    const salesCampaigns = JSON.parse(localStorage.getItem('selectedSalesCampaigns') || '[]');
    const marketingCampaigns = JSON.parse(localStorage.getItem('selectedMarketingCampaigns') || '[]');

    let campaign = salesCampaigns.find(c => c.id === campaignId || c.code === campaignId);
    let campaignType = 'Sales';

    if (!campaign) {
        campaign = marketingCampaigns.find(c => c.id === campaignId);
        campaignType = 'Marketing';
    }

    if (campaign) {
        const headerElement = document.getElementById('campaignHeader');
        const code = campaign.code || campaign.salesCampaignCode;
        const truncatedCode = code.length > 20 ? code.substring(0, 20) + '...' : code;

        headerElement.innerHTML = `
            <span class="campaign-title">${campaignType} Campaign: ${truncatedCode}</span>
            <span class="campaign-label">${campaignType}</span>
        `;
    }
}

// Save canvas data
function saveCanvasData() {
    // Get current values from form
    canvasData.customerProblem = document.getElementById('customerProblem').value;
    canvasData.productService = document.getElementById('productService').value;
    canvasData.marketSegment = document.getElementById('marketSegment').value;
    canvasData.solutionValue = document.getElementById('solutionValue').value;
    canvasData.keyBenefits = document.getElementById('keyBenefits').value;

    // Save to localStorage
    if (canvasData.campaignId) {
        localStorage.setItem(`canvas_${canvasData.campaignId}`, JSON.stringify(canvasData));
        showSaveSuccess();
    } else {
        alert('Error: No campaign ID found');
    }
}

// Show save success message
function showSaveSuccess() {
    const btn = document.getElementById('saveCanvasBtn');
    const originalText = btn.innerHTML;

    btn.innerHTML = '✓ Saved!';
    btn.style.backgroundColor = '#27ae60';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
    }, 2000);
}

// Attach event listeners
function attachCanvasEventListeners() {
    // Save button
    const saveBtn = document.getElementById('saveCanvasBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveCanvasData);
    }

    // Auto-save on blur for each textarea
    const textareas = document.querySelectorAll('.canvas-textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('blur', () => {
            saveCanvasData();
        });
    });

    // Content Generator link
    const contentGeneratorLink = document.getElementById('contentGeneratorLink');
    if (contentGeneratorLink) {
        contentGeneratorLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (canvasData.campaignId) {
                window.location.href = `content-generator.html?campaign=${encodeURIComponent(canvasData.campaignId)}`;
            }
        });
    }
}
