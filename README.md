# Nexa, Inc. - Agentic AI Software Platform

## 🚀 Overview

This project is the official website for **Nexa, Inc.**, a software company specializing in AI-driven solutions for utility contractors. The site is designed with a high-tech, agentic AI aesthetic, featuring a dark theme with vibrant glowing accents. It serves as a marketing and informational hub, showcasing the company's ecosystem of products and providing an interactive product demonstration.

## 🌟 Features

### Key Website Sections & Functionality
- **High-Tech Dark Theme**: A modern, visually striking design using a dark color palette, glowing text, and animated backgrounds to create an immersive, futuristic feel.
- **Interactive 'Product in Action' Demo**: A step-by-step walkthrough that simulates the core workflow of the Nexa platform, from uploading a job package to receiving AI-powered analysis.
- **Advanced Ecosystem Visualization**: A dynamic canvas animation that visually represents the **NEXA CORE** platform and its seven pillars, complete with a foundational element to show how all pillars are interconnected.
- **Responsive Design**: Fully responsive layout built with Bootstrap 5, ensuring a seamless experience across desktops, tablets, and mobile devices.
- **AOS Animations**: Subtle and engaging animations on scroll, powered by the AOS (Animate On Scroll) library.
- **Interactive Contact Form**: A client-side validated form for user inquiries.
- **Utility Components**: Includes a custom notification system, a scroll-to-top button, and parallax effects.

## 🛠️ Installation & Local Development

This is a static website and requires no complex setup. To run it locally, simply open the `index.html` file in a modern web browser.

For a more robust development experience, you can use a simple local server:

1.  **Using Python's HTTP Server** (if you have Python installed):
    ```bash
    # For Python 3
    python -m http.server
    ```

2.  **Using Node.js `live-server`**:
    ```bash
    # Install live-server globally (if you haven't already)
    npm install -g live-server

    # Run the server in the project directory
    live-server
    ```

## 📁 Project Structure

```
personal-website/
│
├── index.html          # Main HTML file for the website
├── styles.css          # All custom CSS styles
├── script.js           # Core JavaScript for interactivity and animations
└── README.md           # This documentation file
```

## 🔧 Customization

### Color Palette

The color scheme can be easily customized by editing the CSS root variables in `styles.css`:

```css
:root {
    --bg-dark-primary: #0d0d1a;
    --bg-dark-secondary: #1a1a2e;
    --glow-primary: #00f2ff;      /* Primary cyan glow */
    --glow-secondary: #8a2be2;     /* Secondary purple glow */
    --text-primary: #e0e0e0;
    --text-secondary: #a0a0c0;
    --border-color: rgba(0, 242, 255, 0.2);
}
```

### Content
All text and section content can be modified directly within `index.html`.

### Icons
The site uses **Bootstrap Icons**. You can find and choose new icons from the [official Bootstrap Icons library](https://icons.getbootstrap.com).

## 🚀 Deployment

As a static website, this project can be deployed to any static hosting provider.

1.  **Netlify**: Drag and drop the project folder into the Netlify dashboard for an instant, free deployment.
2.  **Vercel**: Connect your Git repository for seamless CI/CD and automated deployments.
3.  **GitHub Pages**: Push the code to a GitHub repository and enable GitHub Pages in the settings.

## 📝 License

Copyright © 2024 Nexa, Inc. All rights reserved.

## 📧 Support

For questions or support, contact:
- **Email**: founder@nexa-us.io
- **Website**: https://nexa-us.io
