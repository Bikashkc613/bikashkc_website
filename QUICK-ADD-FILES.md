# ⚡ Quick Reference - Add Downloadable Files

## 🎯 Super Quick (30 Seconds)

### **Step 1: Upload File**
Put file in `assets/` folder

### **Step 2: Add to Config**
Open `js/auto-downloads.js` → Add this line:

```javascript
{ file: 'YourFile.pdf', title: 'Title', description: 'Description', icon: 'fa-file-pdf', category: 'document' },
```

### **Step 3: Refresh**
Reload page → File appears! ✅

---

## 📋 Copy-Paste Templates

### **PDF Document**
```javascript
{ file: 'Document.pdf', title: 'Document Title', description: 'Brief description', icon: 'fa-file-pdf', category: 'document' },
```

### **Word Template**
```javascript
{ file: 'Template.docx', title: 'Template Name', description: 'Brief description', icon: 'fa-file-word', category: 'template' },
```

### **Certificate**
```javascript
{ file: 'Certificate.pdf', title: 'Certificate Name', description: 'Brief description', icon: 'fa-certificate', category: 'document' },
```

### **Portfolio**
```javascript
{ file: 'Portfolio.pdf', title: 'Portfolio', description: 'Work samples', icon: 'fa-briefcase', category: 'document' },
```

### **PowerPoint**
```javascript
{ file: 'Presentation.pptx', title: 'Presentation', description: 'Slides', icon: 'fa-file-powerpoint', category: 'presentation' },
```

### **ZIP Archive**
```javascript
{ file: 'Files.zip', title: 'Project Files', description: 'Source code', icon: 'fa-archive', category: 'other' },
```

---

## 🎨 Icon Reference

Common icons to use:

| File Type | Icon Code |
|-----------|-----------|
| PDF | `'fa-file-pdf'` |
| Word | `'fa-file-word'` |
| Excel | `'fa-file-excel'` |
| PowerPoint | `'fa-file-powerpoint'` |
| Certificate | `'fa-certificate'` |
| Portfolio | `'fa-briefcase'` |
| Code | `'fa-code'` |
| Image | `'fa-image'` |
| Archive | `'fa-archive'` |
| Document | `'fa-file-alt'` |

More icons: https://fontawesome.com/icons

---

## 🎯 Categories (Colors)

- `'document'` = Blue/Cyan gradient
- `'template'` = Green/Purple gradient  
- `'presentation'` = Red/Purple gradient
- `'other'` = Yellow/Purple gradient

---

## 📝 Complete Example

```javascript
const downloadableFiles = [
    // Your current files
    { file: 'CV.pdf', title: 'Download CV', description: 'Curriculum vitae', icon: 'fa-file-pdf', category: 'document' },
    { file: 'Resume.pdf', title: 'Download Resume', description: 'Professional resume', icon: 'fa-file-alt', category: 'document' },
    
    // Add new files below:
    { file: 'Certificate.pdf', title: 'AWS Certificate', description: 'Cloud certification', icon: 'fa-certificate', category: 'document' },
    { file: 'Portfolio.pdf', title: 'Portfolio', description: 'Work samples', icon: 'fa-briefcase', category: 'document' },
];
```

---

## ✅ Checklist

- [ ] File uploaded to `assets/`
- [ ] Filename matches exactly
- [ ] Added to `downloadableFiles` array
- [ ] No missing commas
- [ ] Page refreshed
- [ ] Download works

---

## 🚀 That's It!

**Remember:**
1. Upload to `assets/`
2. Add to config
3. Refresh page

**File instantly becomes downloadable! 🎉**

---

## 📞 Full Documentation

For detailed instructions, see:
- `ADD-NEW-FILES.md` - Complete guide
- `js/auto-downloads.js` - The configuration file
