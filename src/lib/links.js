// External links for the whole site, kept on the server. Components link to /go/<name>
// and app/go/[...path]/route.js redirects there, so these URLs never appear in the HTML
// or in the JavaScript sent to the browser. Only import this from server code (the
// route); importing it into a 'use client' component would ship every URL to the browser.
//
// To add a link: add it here, then use href="/go/<name>" in the component.
export const siteLinks = {
  resume: 'https://drive.google.com/file/d/1ppp3umqwBcgmNxI_tIcgqQuKKhyFBLWA/view?usp=sharing',
  github: 'https://github.com/AndrewRaj0510',
  linkedin: 'https://www.linkedin.com/in/andrew-isaac-raj-g-970648334/',
  instagram: 'https://www.instagram.com/andrew_raj_0510/',
}
