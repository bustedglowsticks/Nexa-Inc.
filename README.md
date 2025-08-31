# Nexa, Inc. - Utility Contractor Software Platform

## 🚀 Overview

Nexa, Inc. is a modern, responsive landing page for a utility-centered contractor software company. The website showcases the company's AI/ML-driven platform ecosystem consisting of seven specialized pillars designed to transform utility contractor operations.

## 🌟 Features

### Core Platform Components
- **Nexa Core**: Central platform with shared foundation services
- **Nexa Storm**: Emergency storm deployment and crew management
- **Nexa Design**: Design and estimation with GIS integration
- **Nexa Finance**: Billing, payroll, and financial analytics
- **Nexa Safety**: Safety compliance and incident reporting
- **Nexa Grid**: Drone-based utility grid inspections
- **Nexa Insights**: Executive dashboards and predictive analytics

### Website Features
- ✨ Modern, responsive Bootstrap 5 design
- 🎨 Custom CSS with gradient animations and hover effects
- 📱 Mobile-first responsive layout
- 🔄 Smooth scrolling navigation
- 💫 AOS (Animate On Scroll) animations
- 📝 Interactive contact form with validation
- 🎯 Service-specific demo request options
- 🌊 Parallax scrolling effects
- ⬆️ Scroll-to-top button
- 🔔 Toast notification system

## 📋 Prerequisites

This is a static website that requires:
- A web server (Apache, Nginx, or any static hosting service)
- Modern web browser with JavaScript enabled
- Internet connection (for CDN resources)

## 🛠️ Installation & Deployment

### Option 1: Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select source branch (main/master)
5. Your site will be available at `https://[username].github.io/[repository-name]`

### Option 2: Deploy to Netlify

1. Visit [Netlify](https://www.netlify.com)
2. Drag and drop the project folder to deploy
3. Configure custom domain (optional)
4. Enable form submissions in Netlify settings

### Option 3: Deploy to Traditional Web Hosting

1. Upload all files via FTP/SFTP to your web hosting root directory
2. Ensure index.html is in the root folder
3. No server-side configuration needed (pure static site)

### Option 4: Deploy to Custom Domain (nexa-us.io)

1. **DNS Configuration**:
   ```
   Type: A Record
   Name: @
   Value: [Your hosting IP address]
   
   Type: CNAME
   Name: www
   Value: nexa-us.io
   ```

2. **SSL Certificate**:
   - Use Let's Encrypt for free SSL
   - Or configure through your hosting provider

3. **Upload Files**:
   - Place all files in the public_html or www directory
   - Ensure proper file permissions (644 for files, 755 for directories)

## 📁 Project Structure

```
nexa-website/
│
├── index.html          # Main landing page
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

## 🔧 Configuration

### Contact Form Setup

The contact form currently logs submissions to the console. To enable backend functionality:

1. **Email Service Integration**:
   ```javascript
   // Replace the form submission handler in script.js
   // with your backend API endpoint
   fetch('https://your-api-endpoint.com/contact', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData)
   })
   ```

2. **Third-Party Services**:
   - Formspree: `https://formspree.io`
   - EmailJS: `https://www.emailjs.com`
   - Netlify Forms (if using Netlify hosting)

### Customization

1. **Colors**: Edit CSS variables in `styles.css`:
   ```css
   :root {
       --primary-color: #4361ee;
       --secondary-color: #3f37c9;
       --accent-color: #7209b7;
   }
   ```

2. **Content**: Update text directly in `index.html`

3. **Icons**: Using Bootstrap Icons - browse available icons at [icons.getbootstrap.com](https://icons.getbootstrap.com)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- Mobile: < 576px
- Tablet: 576px - 768px
- Desktop: > 768px

## 🚀 Performance Optimization

1. **Enable Compression**:
   - Gzip/Brotli compression on server
   - Minify CSS and JavaScript for production

2. **Caching Headers**:
   ```apache
   # .htaccess example
   <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType text/css "access plus 1 month"
       ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

3. **CDN Usage**:
   - Bootstrap and libraries loaded from CDN
   - Consider using Cloudflare for additional caching

## 📊 Analytics Integration

Add Google Analytics or similar:
```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security Considerations

1. **Form Validation**: Client-side validation implemented
2. **HTTPS**: Always use SSL certificate in production
3. **Content Security Policy**: Add CSP headers for production
4. **Input Sanitization**: Implement server-side validation for forms

## 📝 License

Copyright © 2024 Nexa, Inc. All rights reserved.

## 📧 Support

For questions or support, contact:
- Email: founder@nexa-us.io
- Website: https://nexa-us.io

## 🎯 Future Enhancements

- [ ] Backend API integration for contact form
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Blog section
- [ ] Customer testimonials
- [ ] Live chat integration
- [ ] Advanced analytics dashboard
- [ ] PWA (Progressive Web App) features

---

**Built with ❤️ by Nexa, Inc. - Transforming Utility Contractor Operations with AI**
