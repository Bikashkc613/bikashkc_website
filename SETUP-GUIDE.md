# 🚀 Portfolio Setup Guide

## Quick Start (5 Minutes)

### Step 1: Prepare Your Files

1. **Profile Image**
   - Place your professional photo in `images/` folder
   - Name it: `profile.jpg` or update the path in HTML
   - Recommended size: 800x800px minimum

2. **Documents**
   ```
   assets/
   ├── CV.pdf
   ├── Resume.pdf
   ├── Resume_Template.docx
   └── favicon.png
   ```

3. **Project Images**
   - Add project screenshots to `images/projects/`
   - Use descriptive names: `ecommerce-website.jpg`

### Step 2: Customize Content

Open `index.html` and update:

#### Personal Information
```html
<!-- Find and replace: -->
- Name: "Bijay KC" → "Your Name"
- Email: "kcbikash200030004000@gmail.com" → "your@email.com"
- Phone: "9761550629" → "Your Phone"
- Location: "Sandhikharka-9, Arghakhanchi" → "Your Location"
```

#### Social Media Links
```html
<!-- Update all href attributes: -->
<a href="https://github.com/YourUsername">
<a href="https://linkedin.com/in/YourProfile">
<a href="https://facebook.com/YourProfile">
```

#### Professional Titles
```html
<!-- Update typing animation texts: -->
data-texts="Your Title 1|Your Title 2|Your Title 3"
```

### Step 3: Add Your Skills

In the Skills section, modify:
```html
<div class="skill-card glass hover-lift">
    <div class="skill-icon">
        <i class="fab fa-your-icon"></i>
    </div>
    <h4>Your Skill</h4>
    <div class="progress-bar" data-progress="85">
        <div class="progress-fill"></div>
    </div>
    <span class="progress-text">85%</span>
</div>
```

### Step 4: Add Projects

Use this template for each project:
```html
<div class="project-card glass" data-category="web">
    <div class="project-image">
        <img src="images/projects/your-project.jpg" alt="Project Name">
        <div class="project-overlay">
            <a href="https://github.com/you/project" class="project-link">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://project-demo.com" class="project-link">
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    </div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description here...</p>
        <div class="project-tags">
            <span class="tag">HTML</span>
            <span class="tag">CSS</span>
            <span class="tag">JavaScript</span>
        </div>
    </div>
</div>
```

### Step 5: Update Statistics

Find the counter elements:
```html
<h4 class="counter" data-count="50">0</h4> <!-- Your number -->
```

### Step 6: Color Customization (Optional)

Edit `css/style.css`:
```css
:root {
    --accent-primary: #00E5FF;     /* Your primary color */
    --accent-secondary: #6C63FF;    /* Your secondary color */
    --accent-tertiary: #14F195;     /* Your accent color */
}
```

## 📝 Complete Sections Checklist

- [ ] Home/Hero - Update name, titles, description
- [ ] About - Add bio, details, interests
- [ ] Skills - Add/remove skills with progress
- [ ] Projects - Add project cards with images
- [ ] Experience - Add timeline items
- [ ] Education - Add education history
- [ ] Certificates - Add certificate images
- [ ] Resume - Ensure PDF files are in assets/
- [ ] Services - Update service offerings
- [ ] Contact - Update contact information
- [ ] Footer - Update copyright and links

## 🎨 Adding More Sections

### Projects Section Template
```html
<section class="projects-section section" id="projects">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">My Work</span>
            <h2 class="section-title">Projects</h2>
            <div class="section-line"></div>
        </div>
        
        <!-- Filter Buttons -->
        <div class="project-filters" data-aos="fade-up" data-aos-delay="100">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="web">Web</button>
            <button class="filter-btn" data-filter="blockchain">Blockchain</button>
            <button class="filter-btn" data-filter="ai">AI</button>
        </div>
        
        <!-- Projects Grid -->
        <div class="projects-grid">
            <!-- Add project cards here -->
        </div>
    </div>
</section>
```

### Experience Timeline Template
```html
<section class="experience-section section" id="experience">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">Career</span>
            <h2 class="section-title">Experience</h2>
            <div class="section-line"></div>
        </div>
        
        <div class="timeline">
            <div class="timeline-item" data-aos="fade-up">
                <div class="timeline-dot"></div>
                <div class="timeline-content glass">
                    <span class="timeline-date">2020 - Present</span>
                    <h3>Job Title</h3>
                    <h4>Company Name</h4>
                    <p>Job description and achievements...</p>
                </div>
            </div>
            <!-- Add more timeline items -->
        </div>
    </div>
</section>
```

### Resume Download Section
```html
<section class="resume-section section" id="resume">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">Documents</span>
            <h2 class="section-title">Resume & CV</h2>
            <div class="section-line"></div>
        </div>
        
        <div class="resume-grid">
            <div class="resume-card glass" data-aos="fade-up" data-aos-delay="100">
                <div class="resume-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <h3>Download CV</h3>
                <p>Comprehensive curriculum vitae</p>
                <a href="assets/CV.pdf" download class="btn btn-primary">
                    <i class="fas fa-download"></i>
                    <span>Download CV</span>
                </a>
            </div>
            
            <div class="resume-card glass" data-aos="fade-up" data-aos-delay="200">
                <div class="resume-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <h3>Download Resume</h3>
                <p>Professional resume document</p>
                <a href="assets/Resume.pdf" download class="btn btn-primary">
                    <i class="fas fa-download"></i>
                    <span>Download Resume</span>
                </a>
            </div>
            
            <div class="resume-card glass" data-aos="fade-up" data-aos-delay="300">
                <div class="resume-icon">
                    <i class="fas fa-file-word"></i>
                </div>
                <h3>Resume Template</h3>
                <p>Editable template document</p>
                <a href="assets/Resume_Template.docx" download class="btn btn-primary">
                    <i class="fas fa-download"></i>
                    <span>Download Template</span>
                </a>
            </div>
        </div>
    </div>
</section>
```

### Contact Form Template
```html
<section class="contact-section section" id="contact">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">Get In Touch</span>
            <h2 class="section-title">Contact Me</h2>
            <div class="section-line"></div>
        </div>
        
        <div class="contact-grid">
            <div class="contact-info" data-aos="fade-right">
                <div class="contact-item glass">
                    <i class="fas fa-envelope"></i>
                    <h4>Email</h4>
                    <a href="mailto:your@email.com">your@email.com</a>
                </div>
                
                <div class="contact-item glass">
                    <i class="fas fa-phone"></i>
                    <h4>Phone</h4>
                    <a href="tel:+1234567890">+123 456 7890</a>
                </div>
                
                <div class="contact-item glass">
                    <i class="fas fa-map-marker-alt"></i>
                    <h4>Location</h4>
                    <p>Your City, Country</p>
                </div>
            </div>
            
            <form class="contact-form glass" data-aos="fade-left">
                <div class="form-group">
                    <input type="text" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Your Email" required>
                </div>
                <div class="form-group">
                    <input type="tel" placeholder="Your Phone">
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Subject" required>
                </div>
                <div class="form-group">
                    <textarea rows="6" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-submit">
                    <i class="fas fa-paper-plane"></i>
                    <span>Send Message</span>
                </button>
            </form>
        </div>
    </div>
</section>
```

### Footer Template
```html
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3 class="gradient-text">Your Name</h3>
                <p>Computer Engineer & Full Stack Developer</p>
            </div>
            
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul class="footer-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4>Follow Me</h4>
                <div class="footer-social">
                    <a href="#" class="social-icon"><i class="fab fa-github"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2026 Your Name. All Rights Reserved.</p>
        </div>
    </div>
</footer>
```

## 🚀 Deployment

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/username/portfolio.git
git push -u origin main

# Then enable GitHub Pages in repository settings
```

### Vercel
1. Sign up at vercel.com
2. Import your GitHub repository
3. Deploy automatically

### Netlify
1. Drag and drop your project folder to netlify.com
2. Or connect your Git repository
3. Deploy instantly

## ✅ Pre-Launch Checklist

- [ ] All images optimized (use TinyPNG.com)
- [ ] All links working
- [ ] All download files uploaded
- [ ] Contact form tested
- [ ] Mobile responsive checked
- [ ] All browsers tested
- [ ] Loading speed optimized
- [ ] SEO meta tags updated
- [ ] Favicon added
- [ ] Copyright year updated

## 🎯 Testing

1. **Desktop**: Chrome, Firefox, Safari, Edge
2. **Mobile**: iPhone, Android devices
3. **Tablets**: iPad, Android tablets
4. **Features**:
   - All navigation links
   - Download buttons
   - Contact form submission
   - Animations smooth
   - No console errors

## 📞 Need Help?

If you encounter any issues:
1. Check browser console for errors (F12)
2. Verify all file paths are correct
3. Ensure all dependencies loaded
4. Clear browser cache

---

**Your premium portfolio is ready to impress! 🎉**
