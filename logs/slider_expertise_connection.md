# Hero Slider to Expertise Icon Connection

**Date:** April 20, 2025

## Feature Request
Connect the hero section slider with the "Our Expertise" icons so that:
1. When the image slide is displayed, the "Mobile Apps" icon is highlighted
2. When the video slide is displayed, the "Graphic Design" icon is highlighted
3. The highlight effect should match the hover effect already applied to the icons

## Implementation

### 1. Added CSS Class for Highlighted Icons
Modified the CSS to apply the same hover effect to a new active-expertise class:

```css
.tech-icons i:hover,
.tech-icons i.active-expertise {
    color: var(--accent);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(110, 86, 207, 0.2);
}
```

### 2. Updated the Hero Slider JavaScript
Modified the `initHeroSlider` function to:
- Get references to the expertise icons
- Update the `goToSlide` function to highlight the appropriate icon
- Reset any highlighted icons when changing slides
- Call `goToSlide(0)` initially to ensure the mobile app icon is highlighted on page load

```javascript
function initHeroSlider() {
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-nav-prev');
    const nextBtn = document.querySelector('.slider-nav-next');
    const techIcons = document.querySelectorAll('.tech-icons i');
    const mobileAppIcon = document.querySelector('.tech-icons .fa-mobile-alt');
    const graphicDesignIcon = document.querySelector('.tech-icons .fa-palette');
    let currentIndex = 0;
    let slideInterval;

    // Function to change slide
    function goToSlide(index) {
        // Reset active classes
        sliderItems.forEach(item => item.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        // Reset expertise icons
        techIcons.forEach(icon => icon.classList.remove('active-expertise'));
        
        // Handle index wrapping
        if (index < 0) index = sliderItems.length - 1;
        if (index >= sliderItems.length) index = 0;
        
        // Set new active slide and dot
        currentIndex = index;
        sliderItems[currentIndex].classList.add('active');
        sliderDots[currentIndex].classList.add('active');
        
        // Highlight the appropriate expertise icon based on current slide
        if (currentIndex === 0) {
            // First slide (image) - highlight mobile app icon
            mobileAppIcon.classList.add('active-expertise');
        } else if (currentIndex === 1) {
            // Second slide (video) - highlight graphic design icon
            graphicDesignIcon.classList.add('active-expertise');
        }
    }

    // ... rest of the function ...

    // Set initial slide and highlight correct expertise icon
    goToSlide(0);
    
    // Start the automatic slider
    startSlideTimer();
}
```

## Result
The implementation creates a visual connection between the hero slider content and the expertise section:

1. When the slider shows the image (Rover Design):
   - The "Mobile Apps" expertise icon is highlighted with the hover effect
   - This visually connects the app design image with the corresponding service

2. When the slider shows the video:
   - The "Graphic Design" expertise icon is highlighted with the hover effect
   - This visually connects the design video with the corresponding service

3. The highlighting occurs both during automatic slide transitions and when manually navigating the slider.

This implementation enhances the user experience by creating a clear visual relationship between the showcase content in the hero section and the company's areas of expertise.
