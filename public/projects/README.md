# Project images

One folder per project. Drop images in using this naming convention:

- `cover.<ext>` — the tile thumbnail (small image on the left of the card)
- `1.<ext>` — first gallery image (shown when the card is expanded)
- `2.<ext>` — second gallery image

`<ext>` can be `.png`, `.jpg`, or `.jpeg`.

After adding `1.x` / `2.x` to a folder, wire them into `src/app/projects/page.js`
by setting that project's `gallery` array, e.g.:

```js
gallery: ['/projects/portfolio-website/1.png', '/projects/portfolio-website/2.png'],
```

## Folder → project map

| Folder | Project |
|---|---|
| portfolio-website | Portfolio Website |
| content-creation-agent | Content Creation Agent |
| job-scraper-console | Job Scraper Console |
| airnotes | AIRNotes |
| ai-travel-planner | AI Travel Planner |
| stock-predictor | Stock Predictor |
| employee-performance-reporting | Employee Performance Reporting |
| whatsapp-chatwidget | WhatsApp ChatWidget |
| code-review-assistant | Code Review Assistant |
| healthcare-chatbot | Healthcare Information Chatbot |
| natural-language-data-visualizer | Natural Language Data Visualizer |
| automated-image-generation | Automated Image Generation |
