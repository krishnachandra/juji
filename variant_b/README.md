# Premium BW Editorial Portfolio — Variant B

This is the highly stylized, two-section black and white cinematic variant of the portfolio. 

## Structure
- `index.html`: The main markup featuring an accessible morphing menu, smooth scroll-snap layout, and a semantic video player for the background.
- `styles.css`: Contains the editorial font styling, high-contrast B&W film CSS filtering (`grayscale`, `contrast`, `brightness`), generated noise/grain pseudo elements, and the responsive grid for the biography section.
- `script.js`: Handles slowing down the high-framerate video to 25% speed (`playbackRate: 0.25`), accessible menu toggling state, and parallax calculations for the hero section background.

## Video Asset Instructions (hero_clip.mp4)
To achieve the exact "LiveMe" homepage smooth slow-motion effect described in the requirements, follow these steps to upload and prepare your video.

### 1. Swapping the Video
1. Place your 5-second cinematic clip into the `variant_b/assets/` folder.
2. Name the file `hero_clip.mp4`.
3. (Optional but recommended) Include a high-quality still frame from the video named `poster.jpg` in the same folder. This prevents black flashes while the video loads.

### 2. Best Encoding Practices
For the smoothest playback when forced to 25% speed via JavaScript, your source video needs a high frame rate.

- **Target Framerate**: 120fps or 60fps (120fps is ideal for that ultra-creamy slow motion).
- **Resolution**: Provide a 1920x1080 version out of your editor.
- **Format**: H.264 MP4. (You can also provide a `hero_clip.webm` fallback if desired and uncomment the source line in `index.html`).
- **Bitrate**: Try to keep it under 8Mbps to ensure fast loading on mobile devices without relying on an HLS streaming server.

*If you cannot attach the large 120fps video file here, upload it to Google Drive, Dropbox, or WeTransfer, ensure the link is public, and paste it to the developer!*
