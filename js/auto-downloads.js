/* ===================================
   AUTOMATIC DOWNLOADS SYSTEM
   Any file in assets/ folder becomes downloadable
   ================================== */

'use strict';

// Configuration - Add files you want to be downloadable
const downloadableFiles = [
    // PDFs
    { file: 'CV.pdf', title: 'Download CV', description: 'Comprehensive curriculum vitae', icon: 'fa-file-pdf', category: 'document' },
    { file: 'Resume.pdf', title: 'Download Resume', description: 'Professional resume', icon: 'fa-file-alt', category: 'document' },
    
    // Word Documents
    { file: 'CV_Template.docx', title: 'CV Template', description: 'Editable CV template', icon: 'fa-file-word', category: 'template' },
    { file: 'Resume_Template.docx', title: 'Resume Template', description: 'Editable resume template', icon: 'fa-file-word', category: 'template' },
    
    // Add more files below as you upload them
    // Examples:
    // { file: 'Portfolio.pdf', title: 'Portfolio', description: 'Work portfolio', icon: 'fa-file-pdf', category: 'document' },
    // { file: 'Certificates.pdf', title: 'Certificates', description: 'All certificates', icon: 'fa-certificate', category: 'document' },
    // { file: 'Cover_Letter.docx', title: 'Cover Letter', description: 'Template letter', icon: 'fa-file-word', category: 'template' },
    // { file: 'Presentation.pptx', title: 'Presentation', description: 'Project slides', icon: 'fa-file-powerpoint', category: 'presentation' },
];

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    generateDownloadCards();
    setupDownloadTracking();
});

/* ===================================
   GENERATE DOWNLOAD CARDS
   ================================== */

function generateDownloadCards() {
    const container = document.getElementById('auto-downloads-grid');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create card for each file
    downloadableFiles.forEach((item, index) => {
        const card = createDownloadCard(item, index);
        container.appendChild(card);
    });
    
    // Add "no files" message if empty
    if (downloadableFiles.length === 0) {
        container.innerHTML = `
            <div class="no-files-message">
                <i class="fas fa-inbox"></i>
                <p>No downloadable files yet. Upload files to assets/ folder.</p>
            </div>
        `;
    }
}

/* ===================================
   CREATE DOWNLOAD CARD
   ================================== */

function createDownloadCard(item, index) {
    const card = document.createElement('div');
    card.className = 'resume-card glass hover-lift';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index + 1) * 100);
    
    // Get file extension and info
    const fileExt = item.file.split('.').pop().toUpperCase();
    const fileInfo = getFileInfo(item.file);
    const gradient = getGradientForCategory(item.category, index);
    
    card.innerHTML = `
        <div class="resume-icon" style="${gradient}">
            <i class="fas ${item.icon}"></i>
        </div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="download-info">
            <span><i class="fas fa-file"></i> ${fileExt} Format</span>
            <span><i class="fas ${fileInfo.icon}"></i> ${fileInfo.label}</span>
        </div>
        <a href="assets/${item.file}" download class="btn btn-primary btn-ripple" data-file="${item.file}">
            <i class="fas fa-download"></i>
            <span>Download</span>
        </a>
    `;
    
    return card;
}

/* ===================================
   HELPER FUNCTIONS
   ================================== */

function getFileInfo(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    
    const info = {
        'pdf': { icon: 'fa-lock', label: 'Final' },
        'docx': { icon: 'fa-edit', label: 'Editable' },
        'doc': { icon: 'fa-edit', label: 'Editable' },
        'pptx': { icon: 'fa-presentation', label: 'Slides' },
        'xlsx': { icon: 'fa-table', label: 'Spreadsheet' },
        'zip': { icon: 'fa-archive', label: 'Archive' },
        'jpg': { icon: 'fa-image', label: 'Image' },
        'png': { icon: 'fa-image', label: 'Image' },
    };
    
    return info[ext] || { icon: 'fa-file', label: 'File' };
}

function getGradientForCategory(category, index) {
    const gradients = {
        document: [
            'background: linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)',
            'background: linear-gradient(135deg, #6C63FF 0%, #00E5FF 100%)',
        ],
        template: [
            'background: linear-gradient(135deg, #14F195 0%, #6C63FF 100%)',
            'background: linear-gradient(135deg, #00E5FF 0%, #14F195 100%)',
        ],
        presentation: [
            'background: linear-gradient(135deg, #FF6B6B 0%, #6C63FF 100%)',
        ],
        other: [
            'background: linear-gradient(135deg, #FFD93D 0%, #6C63FF 100%)',
        ]
    };
    
    const categoryGradients = gradients[category] || gradients.other;
    return categoryGradients[index % categoryGradients.length];
}

/* ===================================
   DOWNLOAD TRACKING
   ================================== */

function setupDownloadTracking() {
    document.querySelectorAll('a[data-file]').forEach(link => {
        link.addEventListener('click', function(e) {
            const fileName = this.getAttribute('data-file');
            trackDownload(fileName);
            showDownloadNotification(fileName);
        });
    });
}

function trackDownload(fileName) {
    console.log(`📥 Downloaded: ${fileName}`);
    
    // Store in localStorage
    const downloads = JSON.parse(localStorage.getItem('downloads') || '{}');
    downloads[fileName] = (downloads[fileName] || 0) + 1;
    localStorage.setItem('downloads', JSON.stringify(downloads));
    
    // Send to Google Analytics (if configured)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'file_name': fileName,
            'file_type': fileName.split('.').pop()
        });
    }
}

function showDownloadNotification(fileName) {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Downloading ${fileName}...</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ===================================
   PUBLIC API - Add files dynamically
   ================================== */

window.addDownloadableFile = function(file, title, description, icon = 'fa-file', category = 'other') {
    downloadableFiles.push({ file, title, description, icon, category });
    generateDownloadCards();
};

window.removeDownloadableFile = function(fileName) {
    const index = downloadableFiles.findIndex(item => item.file === fileName);
    if (index > -1) {
        downloadableFiles.splice(index, 1);
        generateDownloadCards();
    }
};

window.getDownloadStats = function() {
    return JSON.parse(localStorage.getItem('downloads') || '{}');
};

/* ===================================
   EXPORT FOR OTHER SCRIPTS
   ================================== */

window.autoDownloads = {
    files: downloadableFiles,
    add: window.addDownloadableFile,
    remove: window.removeDownloadableFile,
    stats: window.getDownloadStats
};
