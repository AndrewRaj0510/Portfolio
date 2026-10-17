import "./globals.css";

export const metadata = {
  title: "Andrew Isaac Raj G | Portfolio",
  description: "Portfolio of Andrew Isaac Raj G, AI Solutions Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
      </body>
    </html>
  );
}
