// Content Generator State
let selectedAssetType = null;
let campaignId = null;
let isEditMode = false;
let abTestEnabled = false;
let currentVersion = 'original';
let originalContent = '';
let variantAContent = '';
let variantBContent = '';

// Mock AI-generated content for each asset type (Version A)
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

// Mock AI-generated content variants for A/B testing (Variant A)
const mockContentVariantA = {
    'single-image': {
        title: 'Social Media Post Copy - Variant A',
        content: `<h3>💼 Your AI Career Starts With Real Experience</h3>
        <p><strong>Headline:</strong> Build Your AI Portfolio While Getting Paid</p>
        <p><strong>Body Copy:</strong></p>
        <p>Traditional education gives you theory. We give you real AI projects, real clients, and real paychecks. Our work-integrated program turns beginners into job-ready AI developers.</p>
        <p><strong>Why Choose Us:</strong></p>
        <ul>
            <li>Work on live AI projects from week one</li>
            <li>Earn monthly income throughout the program</li>
            <li>Graduate with a portfolio employers respect</li>
        </ul>
        <p><strong>Call to Action:</strong> Start Building Your Future → [Link]</p>
        <div class="result-meta">Optimized for: TikTok Feed | Tone: Action-Oriented | Length: 140 words</div>`
    },
    'email-copy': {
        title: 'Email Newsletter Copy - Variant A',
        content: `<h3>Subject Line: Build Your AI Career the Smart Way 🚀</h3>
        <p><strong>Preview Text:</strong> Real projects + Real pay = Real career opportunities</p>
        <p><strong>Email Body:</strong></p>
        <p>Hey [First Name],</p>
        <p>Most AI courses teach you skills. We give you something better: experience.</p>
        <p>Our work-integrated program lets you work on actual AI applications while earning a stipend. By the time you graduate, you'll have a portfolio of shipped products.</p>
        <p><strong>What makes us unique:</strong></p>
        <ul>
            <li>Get assigned to real client projects immediately</li>
            <li>Monthly stipend while you learn and build</li>
            <li>Mentorship from experienced AI developers</li>
            <li>Job placement support with our partner companies</li>
        </ul>
        <p>Start your journey from student to professional AI developer.</p>
        <p><strong>[CTA Button: Discover the Program]</strong></p>
        <p>To your success,<br>The WIM SE Team</p>
        <div class="result-meta">Optimized for: Newsletter | Tone: Aspirational & Practical | Length: 155 words</div>`
    },
    'carousel': {
        title: 'LinkedIn/Instagram Carousel Script - Variant A',
        content: `<h3>5-Slide Carousel: "From Zero to Hired: The Smart Path"</h3>
        <p><strong>Slide 1 (Hook):</strong><br>
        "What if you got paid to learn AI development?"<br>
        Visual: Person coding with money symbols floating</p>
        <p><strong>Slide 2 (Current Problem):</strong><br>
        "Most AI Programs Leave You With:"<br>
        📜 A certificate<br>
        🤷 No real experience<br>
        ❌ No job prospects</p>
        <p><strong>Slide 3 (Better Way):</strong><br>
        "WIM SE Is Different"<br>
        💻 Real client projects<br>
        💰 Monthly stipend<br>
        🎯 Portfolio that matters</p>
        <p><strong>Slide 4 (The Journey):</strong><br>
        "Your Path to Success"<br>
        Month 1: Start on live projects<br>
        Months 2-6: Build & deploy features<br>
        Graduation: Job-ready portfolio + connections</p>
        <p><strong>Slide 5 (CTA):</strong><br>
        "Start Your Smart AI Career Path"<br>
        [Apply Now Button]<br>
        Available in: Malaysia | Philippines | Indonesia</p>
        <div class="result-meta">Optimized for: LinkedIn/Instagram | Format: 5 slides | Strategy: Solution-focused</div>`
    },
    'landing-page': {
        title: 'Landing Page Copy - Variant A',
        content: `<h3>Landing Page Structure - Variant A</h3>
        <p><strong>Hero Section:</strong></p>
        <p>Headline: "Build Your AI Career While Earning Money"<br>
        Subheadline: "Work-integrated learning that pays you to gain the experience employers demand"<br>
        CTA: "Get Started" | "View Programs"</p>
        <p><strong>Value Proposition:</strong></p>
        <p>"Skip the theory-only courses. Our program puts you on real AI projects from day one, with a monthly stipend while you build the portfolio that gets you hired."</p>
        <p><strong>How It Works:</strong></p>
        <ul>
            <li>Apply to our postgraduate AI development program</li>
            <li>Get matched with live client projects in week one</li>
            <li>Earn a stipend while developing real AI solutions</li>
            <li>Build a portfolio that proves your capabilities</li>
            <li>Graduate with job offers from partner companies</li>
        </ul>
        <p><strong>Benefits Section:</strong></p>
        <p>✓ Real experience, not just theory<br>
        ✓ Get paid while you learn<br>
        ✓ Portfolio of shipped projects<br>
        ✓ Industry connections</p>
        <p><strong>Social Proof:</strong><br>
        "Join 200+ graduates now working at leading tech companies"</p>
        <p><strong>Final CTA:</strong><br>
        "Start Your Journey Today [Apply Now]"</p>
        <div class="result-meta">Conversion-optimized | Value-focused | Clear progression</div>`
    }
};

// Mock AI-generated content variants for A/B testing (Variant B)
const mockContentVariantB = {
    'single-image': {
        title: 'Social Media Post Copy - Variant B',
        content: `<h3>💡 Break Into AI Development Without Experience</h3>
        <p><strong>Headline:</strong> Get Paid While Learning AI Application Development</p>
        <p><strong>Body Copy:</strong></p>
        <p>Stop letting "no experience required" job ads reject you. Our work-integrated program solves the catch-22: earn money while building the real-world AI portfolio that employers demand.</p>
        <p><strong>What You'll Get:</strong></p>
        <ul>
            <li>Real AI projects with actual clients</li>
            <li>Monthly stipend while you develop your skills</li>
            <li>Portfolio that proves you can deliver</li>
        </ul>
        <p><strong>Call to Action:</strong> Start Earning While Learning → [Link]</p>
        <div class="result-meta">Optimized for: TikTok Feed | Tone: Direct & Problem-Focused | Length: 145 words</div>`
    },
    'email-copy': {
        title: 'Email Newsletter Copy - Variant B',
        content: `<h3>Subject Line: Still Applying with No AI Experience? Try This Instead 💼</h3>
        <p><strong>Preview Text:</strong> Break the experience barrier - Get paid to build your AI portfolio</p>
        <p><strong>Email Body:</strong></p>
        <p>Hi [First Name],</p>
        <p>Tired of seeing "2+ years experience required" on every AI developer job?</p>
        <p>Here's the problem: You need experience to get hired, but you need a job to get experience. Our WIM SE program breaks this cycle.</p>
        <p><strong>Here's how it works:</strong></p>
        <ul>
            <li>Join our postgraduate program with live client projects</li>
            <li>Earn a stipend from day one</li>
            <li>Build a portfolio of shipped AI applications</li>
            <li>Graduate with proven experience employers recognize</li>
        </ul>
        <p>No more "entry-level" jobs requiring 3 years of experience.</p>
        <p><strong>[CTA Button: See How It Works]</strong></p>
        <p>Cheers,<br>The WIM SE Team</p>
        <div class="result-meta">Optimized for: Newsletter | Tone: Problem-Solution Focused | Length: 165 words</div>`
    },
    'carousel': {
        title: 'LinkedIn/Instagram Carousel Script - Variant B',
        content: `<h3>5-Slide Carousel: "The Experience Trap (And How to Escape It)"</h3>
        <p><strong>Slide 1 (Hook):</strong><br>
        "Entry-level AI job: Must have 3 years experience 🤔"<br>
        Visual: Screenshot of contradictory job posting</p>
        <p><strong>Slide 2 (Pain Point):</strong><br>
        "The Impossible Catch-22"<br>
        Can't get hired without experience<br>
        Can't get experience without being hired<br>
        Sound familiar?</p>
        <p><strong>Slide 3 (Solution):</strong><br>
        "What If You Could Get Paid to Gain Experience?"<br>
        That's exactly what we offer:<br>
        💰 Monthly stipend<br>
        🚀 Real AI projects<br>
        📈 Actual portfolio</p>
        <p><strong>Slide 4 (How It Works):</strong><br>
        "Work-Integrated Learning = Real Results"<br>
        Week 1: Onboard to live project<br>
        Month 1-6: Build & ship features<br>
        After: Portfolio that gets you hired</p>
        <p><strong>Slide 5 (CTA):</strong><br>
        "Break Free from the Experience Trap"<br>
        [Apply Today Button]<br>
        Programs in: 🇲🇾 🇵🇭 🇮🇩</p>
        <div class="result-meta">Optimized for: LinkedIn/Instagram | Format: 5 slides | Strategy: Pain-point driven</div>`
    },
    'landing-page': {
        title: 'Landing Page Copy - Variant B',
        content: `<h3>Landing Page Structure - Variant B</h3>
        <p><strong>Hero Section:</strong></p>
        <p>Headline: "Get Paid to Build Your AI Career (Yes, Really)"<br>
        Subheadline: "Break the experience catch-22 with work-integrated learning that pays you while you learn"<br>
        CTA: "See How It Works" | "Apply Now"</p>
        <p><strong>Problem Section:</strong></p>
        <p>"Every AI job wants experience. But how do you get experience without a job? You're stuck applying to hundreds of positions with no responses. Sound familiar?"</p>
        <p><strong>Solution Section:</strong></p>
        <p>"Our WIM SE program solves this: You work on real AI projects from day one, earning a monthly stipend while building the exact portfolio employers want to see."</p>
        <p><strong>How It Works:</strong></p>
        <ul>
            <li>Enroll in our postgraduate AI development program</li>
            <li>Get assigned to real client projects immediately</li>
            <li>Earn monthly stipend while learning and building</li>
            <li>Graduate with proven experience and job connections</li>
        </ul>
        <p><strong>Social Proof:</strong><br>
        "Join 200+ graduates who broke into AI development - even without prior experience"</p>
        <p><strong>Final CTA:</strong><br>
        "Ready to Break Free? [Apply Now]"</p>
        <div class="result-meta">Conversion-optimized | Problem-focused messaging | Urgency-driven</div>`
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

            // Try to load saved content for this asset type
            const savedContent = loadContentFromLocalStorage(selectedAssetType);

            if (savedContent) {
                // Content exists - restore it
                restoreContentState(savedContent);
            } else {
                // No saved content - reset state and show placeholder
                document.querySelector('.preview-placeholder').style.display = 'flex';
                document.getElementById('previewResult').style.display = 'none';
                originalContent = '';
                variantAContent = '';
                variantBContent = '';
                currentVersion = 'original';
                abTestEnabled = false;
            }

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

        // Store Original content
        originalContent = content.content;
        currentVersion = 'original';
        abTestEnabled = false;

        previewResult.innerHTML = `
            <div class="result-header">
                <span class="result-type">${content.title}</span>
                <div class="result-actions">
                    <button class="btn-abtest" id="abTestBtn" onclick="generateABTest()">🔬 A/B Test</button>
                    <button class="btn-edit" id="editBtn" onclick="toggleEditMode()">✏️ Edit</button>
                    <button class="btn-copy" onclick="copyContent()">📋 Copy</button>
                    <button class="btn-regenerate" onclick="regenerateContent()">🔄 Regenerate</button>
                </div>
            </div>
            <div class="result-content" id="resultContent">
                ${content.content}
            </div>
        `;

        previewResult.style.display = 'block';

        // Enable placement buttons
        enablePlacementButtons();

        // Reset generate button
        generateBtn.classList.remove('loading');
        generateBtn.innerHTML = '<span class="btn-icon">✨</span> Generate Content';

        // Auto-save generated content
        if (saveContentToLocalStorage()) {
            showAutoSaveNotification();
        }
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

// Toggle edit mode
function toggleEditMode() {
    const resultContent = document.getElementById('resultContent');
    const editBtn = document.getElementById('editBtn');

    if (!isEditMode) {
        // Enter edit mode
        resultContent.contentEditable = true;
        resultContent.classList.add('editable');
        resultContent.focus();
        editBtn.innerHTML = '💾 Save';
        editBtn.classList.add('save-mode');
        isEditMode = true;
    } else {
        // Exit edit mode (save changes)

        // Save edited content to the appropriate state variable
        if (currentVersion === 'original') {
            originalContent = resultContent.innerHTML;
        } else if (currentVersion === 'variantA') {
            variantAContent = resultContent.innerHTML;
        } else if (currentVersion === 'variantB') {
            variantBContent = resultContent.innerHTML;
        }

        resultContent.contentEditable = false;
        resultContent.classList.remove('editable');
        editBtn.innerHTML = '✏️ Edit';
        editBtn.classList.remove('save-mode');
        isEditMode = false;

        // Show save confirmation
        showSaveNotification();

        // Auto-save edited content to localStorage
        saveContentToLocalStorage();
    }
}

// Show save notification
function showSaveNotification() {
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.textContent = '✓ Changes saved';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Generate A/B test variants
function generateABTest() {
    if (!selectedAssetType) return;

    const abTestBtn = document.getElementById('abTestBtn');

    // Show loading state
    abTestBtn.innerHTML = '⏳ Generating Variants...';
    abTestBtn.disabled = true;

    // Simulate AI generation delay
    setTimeout(() => {
        // Get variant A and B content
        const variantAData = mockContentVariantA[selectedAssetType];
        const variantBData = mockContentVariantB[selectedAssetType];
        variantAContent = variantAData.content;
        variantBContent = variantBData.content;
        abTestEnabled = true;

        // Update the result to show tabs
        updateResultWithABTest();

        // Reset button (button will be removed after showing tabs)
        abTestBtn.innerHTML = '🔬 A/B Test';
        abTestBtn.disabled = false;

        // Auto-save A/B test variants
        if (saveContentToLocalStorage()) {
            showAutoSaveNotification();
        }
    }, 2000);
}

// Update result to show A/B test tabs
function updateResultWithABTest() {
    const previewResult = document.getElementById('previewResult');
    const titleOriginal = mockContent[selectedAssetType].title;
    const titleVariantA = mockContentVariantA[selectedAssetType].title;
    const titleVariantB = mockContentVariantB[selectedAssetType].title;

    // Get current title based on selected version
    let currentTitle = titleOriginal;
    if (currentVersion === 'variantA') {
        currentTitle = titleVariantA;
    } else if (currentVersion === 'variantB') {
        currentTitle = titleVariantB;
    }

    previewResult.innerHTML = `
        <div class="result-header">
            <span class="result-type">${currentTitle}</span>
            <div class="result-actions">
                <button class="btn-edit" id="editBtn" onclick="toggleEditMode()">✏️ Edit</button>
                <button class="btn-copy" onclick="copyContent()">📋 Copy</button>
                <button class="btn-regenerate" onclick="regenerateContent()">🔄 Regenerate</button>
            </div>
        </div>
        <div class="ab-test-tabs">
            <button class="ab-tab ${currentVersion === 'original' ? 'active' : ''}" onclick="switchVersion('original')">
                Original
            </button>
            <button class="ab-tab ${currentVersion === 'variantA' ? 'active' : ''}" onclick="switchVersion('variantA')">
                Variant A
            </button>
            <button class="ab-tab ${currentVersion === 'variantB' ? 'active' : ''}" onclick="switchVersion('variantB')">
                Variant B
            </button>
        </div>
        <div class="result-content" id="resultContent">
            ${currentVersion === 'original' ? originalContent : (currentVersion === 'variantA' ? variantAContent : variantBContent)}
        </div>
    `;
}

// Switch between A/B test versions
function switchVersion(version) {
    if (version === currentVersion) return;

    // Save current content if in edit mode
    if (isEditMode) {
        const resultContent = document.getElementById('resultContent');
        if (currentVersion === 'original') {
            originalContent = resultContent.innerHTML;
        } else if (currentVersion === 'variantA') {
            variantAContent = resultContent.innerHTML;
        } else if (currentVersion === 'variantB') {
            variantBContent = resultContent.innerHTML;
        }
        isEditMode = false;

        // Silent save when switching versions (no notification)
        saveContentToLocalStorage();
    }

    // Switch version
    currentVersion = version;
    updateResultWithABTest();
}

// Regenerate content
function regenerateContent() {
    // Clear saved content before regenerating
    clearContentFromLocalStorage(selectedAssetType);

    // Reset edit mode and A/B test
    isEditMode = false;
    abTestEnabled = false;
    originalContent = '';
    variantAContent = '';
    variantBContent = '';
    currentVersion = 'original';
    generateContent();
}

// ===== LocalStorage Functions =====

// Save content to localStorage
function saveContentToLocalStorage() {
    if (!campaignId || !selectedAssetType) {
        console.warn('Cannot save: missing campaignId or assetType');
        return false;
    }

    const storageKey = `content_${campaignId}_${selectedAssetType}`;
    const contentData = {
        campaignId: campaignId,
        assetType: selectedAssetType,
        originalContent: originalContent,
        variantAContent: variantAContent,
        variantBContent: variantBContent,
        currentVersion: currentVersion,
        abTestEnabled: abTestEnabled,
        lastModified: new Date().toISOString()
    };

    try {
        localStorage.setItem(storageKey, JSON.stringify(contentData));
        return true;
    } catch (e) {
        // Handle localStorage quota exceeded
        if (e.name === 'QuotaExceededError') {
            console.error('LocalStorage quota exceeded');
            alert('Storage limit reached. Please clear some old content.');
        }
        return false;
    }
}

// Load content from localStorage
function loadContentFromLocalStorage(assetType) {
    if (!campaignId || !assetType) {
        return null;
    }

    const storageKey = `content_${campaignId}_${assetType}`;
    const savedData = localStorage.getItem(storageKey);

    if (!savedData) {
        return null;
    }

    try {
        return JSON.parse(savedData);
    } catch (e) {
        console.error('Failed to parse saved content:', e);
        return null;
    }
}

// Clear content from localStorage
function clearContentFromLocalStorage(assetType) {
    if (!campaignId || !assetType) {
        return;
    }

    const storageKey = `content_${campaignId}_${assetType}`;
    localStorage.removeItem(storageKey);
}

// Restore content state from saved data
function restoreContentState(contentData) {
    // Restore state variables
    originalContent = contentData.originalContent || '';
    variantAContent = contentData.variantAContent || '';
    variantBContent = contentData.variantBContent || '';
    currentVersion = contentData.currentVersion || 'original';
    abTestEnabled = contentData.abTestEnabled || false;
    isEditMode = false;

    // Hide placeholder
    document.querySelector('.preview-placeholder').style.display = 'none';

    // Get preview result element
    const previewResult = document.getElementById('previewResult');

    // Render content based on A/B test state
    if (abTestEnabled) {
        updateResultWithABTest();
    } else {
        // Render original content only
        const content = mockContent[selectedAssetType];
        previewResult.innerHTML = `
            <div class="result-header">
                <span class="result-type">${content.title}</span>
                <div class="result-actions">
                    <button class="btn-abtest" id="abTestBtn" onclick="generateABTest()">🔬 A/B Test</button>
                    <button class="btn-edit" id="editBtn" onclick="toggleEditMode()">✏️ Edit</button>
                    <button class="btn-copy" onclick="copyContent()">📋 Copy</button>
                    <button class="btn-regenerate" onclick="regenerateContent()">🔄 Regenerate</button>
                </div>
            </div>
            <div class="result-content" id="resultContent">
                ${originalContent}
            </div>
        `;
    }

    previewResult.style.display = 'block';

    // Enable placement buttons
    enablePlacementButtons();

    // Show "loaded" indicator briefly
    showLoadNotification();
}

// Show load notification
function showLoadNotification() {
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.innerHTML = '📂 Saved content loaded';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 1500);
}

// Show auto-save notification
function showAutoSaveNotification() {
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.innerHTML = '💾 Auto-saved';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 1500);
}
