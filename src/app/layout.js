import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import { ThemeProvider } from "@/contexts/theme/ThemeContext";
import "./globals.css";

export const metadata = {
  title: "Next Social",
  description: "Show what you see...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider>
          {/* <Header /> */}
          <Main>{children}</Main>
        </ThemeProvider>
      </body>
    </html>
  );
}
