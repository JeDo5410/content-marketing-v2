// Content Generator State
let selectedAssetType = null;
let campaignId = null;

// Mock AI-generated content for each asset type
const mockContent = {
    'single-image': {
        title: 'Social Media Post Copy',
        content: `<h3>🚀 Ready to Level Up Your AI Career?</h3>
        <p><strong>Headline:</strong> Transform Your Future with AI Application Development</p>
        <p><strong>Body Copy:</strong></p>
        <p>Join our work-integrated postgraduate program designed specifically for aspiring AI developers in Malaysia, Philippines, and Indonesia. Get hands-on experience with real projects while earning paid industry experience.</p>
        <p><strong>Key Benefits:</strong></p>
        <ul>
            <li>Hands-on learning with actual AI projects</li>
            <li>Paid industry experience from day one</li>
            <li>Direct pathway to AI Application Developer roles</li>
        </ul>
        <p><strong>Call to Action:</strong> Learn More → [Link]</p>
        <div class="result-meta">Optimized for: TikTok Feed | Tone: Professional yet Engaging | Length: 150 words</div>`
    },
    'email-copy': {
        title: 'Email Newsletter Copy',
        content: `<h3>Subject Line: Your AI Developer Journey Starts Here 🎯</h3>
        <p><strong>Preview Text:</strong> Hands-on learning + Paid experience = Your dream AI career</p>
        <p><strong>Email Body:</strong></p>
        <p>Hi [First Name],</p>
        <p>Are you ready to bridge the gap between education and your dream AI career?</p>
        <p>Our WIM SE program is designed to solve the biggest challenge facing aspiring AI developers: lack of practical, paid industry experience.</p>
        <p><strong>What makes us different:</strong></p>
        <ul>
            <li>Work on real AI projects from day one</li>
            <li>Get paid while you learn</li>
            <li>Build a portfolio that employers actually want</li>
            <li>Connect directly with hiring companies</li>
        </ul>
        <p>Don't let the experience gap hold you back from your AI career aspirations.</p>
        <p><strong>[CTA Button: Explore the Program]</strong></p>
        <p>Best regards,<br>The WIM SE Team</p>
        <div class="result-meta">Optimized for: Newsletter | Tone: Conversational | Length: 180 words</div>`
    },
    'carousel': {
        title: 'LinkedIn/Instagram Carousel Script',
        content: `<h3>5-Slide Carousel: "Why Traditional AI Education Fails"</h3>
        <p><strong>Slide 1 (Hook):</strong><br>
        "Why 80% of AI graduates struggle to land their first job"<br>
        Visual: Split screen showing certificate vs empty portfolio</p>
        <p><strong>Slide 2 (Problem):</strong><br>
        "The Missing Piece: Real-World Experience"<br>
        ❌ Theory-only courses<br>
        ❌ No industry connections<br>
        ❌ Zero practical projects</p>
        <p><strong>Slide 3 (Solution):</strong><br>
        "Introducing: Work-Integrated Learning"<br>
        ✓ Paid industry projects<br>
        ✓ Hands-on AI development<br>
        ✓ Real portfolio building</p>
        <p><strong>Slide 4 (Benefits):</strong><br>
        "What You Get with WIM SE"<br>
        🎯 Live project experience<br>
        💰 Earn while you learn<br>
        🚀 Direct job placements</p>
        <p><strong>Slide 5 (CTA):</strong><br>
        "Ready to Transform Your AI Career?"<br>
        [Learn More Button]<br>
        Available in: Malaysia | Philippines | Indonesia</p>
        <div class="result-meta">Optimized for: LinkedIn/Instagram | Format: 5 slides | Engagement: High</div>`
    },
    'landing-page': {
        title: 'Landing Page Copy',
        content: `<h3>Landing Page Structure</h3>
        <p><strong>Hero Section:</strong></p>
        <p>Headline: "Launch Your AI Career with Paid Industry Experience"<br>
        Subheadline: "Work-integrated learning that bridges education and employment for aspiring AI developers"<br>
        CTA: "Start Your Journey" | "Learn More"</p>
        <p><strong>Problem Section:</strong></p>
        <p>"The Challenge: Most AI education programs leave you with knowledge but no experience. Employers want proven skills and real project portfolios."</p>
        <p><strong>Solution Section:</strong></p>
        <p>"Our WIM SE program combines postgraduate education with paid industry experience, giving you the practical skills and portfolio employers are looking for."</p>
        <p><strong>Benefits:</strong></p>
        <ul>
            <li>Hands-on learning with real AI projects</li>
            <li>Paid industry experience from day one</li>
            <li>Build a portfolio that stands out</li>
            <li>Direct connections to hiring companies</li>
        </ul>
        <p><strong>Social Proof:</strong><br>
        "Join 200+ graduates now working as AI Application Developers"</p>
        <p><strong>Final CTA:</strong><br>
        "Ready to Transform Your Future? [Apply Now]"</p>
        <div class="result-meta">Conversion-optimized | Above-the-fold CTA | Mobile-responsive</div>`
    }
};

// Initialize content generator
document.addEventListener('DOMContentLoaded', () => {
    initContentGenerator();
    attachContentGeneratorListeners();
});

// Initialize
function initContentGenerator() {
    // Get campaign ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    campaignId = urlParams.get('campaign');

    if (campaignId) {
        updateCampaignHeader(campaignId);
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

// Attach event listeners
function attachContentGeneratorListeners() {
    // Asset card selection
    const assetCards = document.querySelectorAll('.asset-card');
    assetCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            assetCards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');

            // Store selected asset type
            selectedAssetType = card.getAttribute('data-asset-type');

            // Enable generate button
            document.getElementById('generateBtn').disabled = false;
        });
    });

    // Generate button
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', generateContent);

    // Placement buttons (initially disabled, will be enabled after generation)
    const placementButtons = document.querySelectorAll('.btn-placement');
    placementButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!button.disabled) {
                const placement = button.getAttribute('data-placement');
                openCanvaTemplate(placement);
            }
        });
    });

    // Canvas link
    const canvasLink = document.getElementById('canvasLink');
    if (canvasLink) {
        canvasLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (campaignId) {
                window.location.href = `solution-marketing-canvas.html?campaign=${encodeURIComponent(campaignId)}`;
            }
        });
    }
}

// Generate content
function generateContent() {
    if (!selectedAssetType) {
        alert('Please select an asset type first');
        return;
    }

    const generateBtn = document.getElementById('generateBtn');

    // Show loading state
    generateBtn.classList.add('loading');
    generateBtn.innerHTML = '<span class="btn-icon">⏳</span> Generating...';

    // Simulate AI generation delay
    setTimeout(() => {
        // Hide placeholder
        document.querySelector('.preview-placeholder').style.display = 'none';

        // Show generated content
        const previewResult = document.getElementById('previewResult');
        const content = mockContent[selectedAssetType];

        previewResult.innerHTML = `
            <div class="result-header">
                <span class="result-type">${content.title}</span>
                <div class="result-actions">
                    <button class="btn-copy" onclick="copyContent()">📋 Copy</button>
                    <button class="btn-regenerate" onclick="regenerateContent()">🔄 Regenerate</button>
                </div>
            </div>
            <div class="result-content">
                ${content.content}
            </div>
        `;

        previewResult.style.display = 'block';

        // Enable placement buttons
        enablePlacementButtons();

        // Reset generate button
        generateBtn.classList.remove('loading');
        generateBtn.innerHTML = '<span class="btn-icon">✨</span> Generate Content';
    }, 2000);
}

// Enable placement buttons after content generation
function enablePlacementButtons() {
    const placementButtons = document.querySelectorAll('.btn-placement');
    placementButtons.forEach(button => {
        button.disabled = false;
    });
}

// Open Canva template (redirect to Canva)
function openCanvaTemplate(placement) {
    const canvaUrl = 'https://www.canva.com/';
    window.open(canvaUrl, '_blank');
}

// Copy content to clipboard
function copyContent() {
    const resultContent = document.querySelector('.result-content');
    const text = resultContent.innerText;

    navigator.clipboard.writeText(text).then(() => {
        alert('Content copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Regenerate content
function regenerateContent() {
    generateContent();
}
