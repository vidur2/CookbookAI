import ThemeRegistry from './ThemeRegistry';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any'></link>
        <link
          rel="icon"
          href="/icon.jpg"
          type="image/jpeg"
          sizes="1500x1500"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon.jpg"
          type="image/jpeg"
          sizes="1500x1500"
        />
      </head>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}