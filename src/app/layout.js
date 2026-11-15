import "./globals.css";

export const metadata = {
  title: "Andrew Isaac Raj G | Portfolio",
  description: "Portfolio of Andrew Isaac Raj G, AI Solutions Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        {/* The intro's black cover is in the server HTML and only JavaScript removes it,
            so without JavaScript it would hide the page for good */}
        <noscript>
          <style>{'.loading-screen{display:none!important}'}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
