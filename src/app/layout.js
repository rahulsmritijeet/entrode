import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import Cursor from '@/components/Cursor';
import './globals.css';

export const metadata = {
  title: 'Entrode • Digital Bharat Innovation Hub',
  description: 'Where startups meet opportunities in the new India'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Cursor />
            <Navigation />
            <main className="min-h-screen theme-bg theme-text">
              {children}
            </main>
            <Toaster 
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: '12px',
                  padding: '16px',
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-text)'
                }
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}