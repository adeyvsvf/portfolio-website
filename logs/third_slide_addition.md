# Adding Third Slide to Hero Section

**Date:** April 20, 2025

## Feature Request
Add a third slide to the hero section slider showing a new video and connect it to the "Video Editing" expertise icon.

## Implementation

### 1. Added New Video Slide to Hero Section
Modified the HTML to add a third slider item with the new video:

```html
<div class="slider-item">
    <video autoplay loop muted playsinline preload="auto" controlsList="nodownload">
        <source src="images/uiuiui.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
```

### 2. Added Third Navigation Dot
Added a third navigation dot to allow users to directly navigate to the new slide:

```html
<div class="slider-dots">
    <span class="slider-dot active" data-index="0"></span>
    <span class="slider-dot" data-index="1"></span>
    <span class="slider-dot" data-index="2"></span>
</div>
```

### 3. Updated the Slider JavaScript
Modified the JavaScript to connect the third slide to the "Video Editing" expertise icon:

```javascript
// Added reference to the video editing icon
const videoEditingIcon = document.querySelector('.tech-icons .fa-video');

// Updated the goToSlide function to handle the third slide
if (currentIndex === 0) {
    // First slide (image) - highlight mobile app icon
    mobileAppIcon.classList.add('active-expertise');
} else if (currentIndex === 1) {
    // Second slide (video) - highlight graphic design icon
    graphicDesignIcon.classList.add('active-expertise');
} else if (currentIndex === 2) {
    // Third slide (video) - highlight video editing icon
    videoEditingIcon.classList.add('active-expertise');
}
```

## Result
The hero section now features three slides:
1. The first slide (Rover image) connected to "Mobile Apps" expertise
2. The second slide (first video) connected to "Graphic Design" expertise
3. The new third slide (new video) connected to "Video Editing" expertise

When each slide is displayed, the corresponding expertise icon is highlighted, creating a visual connection between the showcase content and the company's service offerings.

This enhancement reinforces the connection between the visual content in the hero section and the company's areas of expertise, helping visitors immediately understand the relationship between the displayed work and the services offered.
