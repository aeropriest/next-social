import "./layout.scss";
import Header from "@/app/components/header";
import { ThemeProvider } from "@/app/contexts/theme";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header>Fixed Header</Header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
