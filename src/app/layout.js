import "./layout.scss";
import Header from "@/app/components/header";
import Main from "@/app/components/main";
import { ThemeProvider, useTheme } from "@/app/contexts/theme";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header>Fixed Header</Header>
          <Main>{children}</Main>
        </ThemeProvider>
      </body>
    </html>
  );
}
