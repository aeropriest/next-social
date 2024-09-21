import Header from '@/components/Header/Header';
import Main from '@/components/Main/Main';
import { ThemeProvider } from '@/contexts/theme/ThemeContext';

import './globals.css';

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
