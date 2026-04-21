import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import BottomNav from '@/components/BottomNav';
import Cursor from '@/components/Cursor';
import './globals.css';

export const metadata = {
  title: 'Entrode • Build. Launch. Fund.',
  description: 'Where founders and investors meet.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Cursor />
            <Navigation />
            <main className="min-h-screen theme-bg theme-text" style={{ paddingBottom: 80 }}>
              {children}
            </main>
            <BottomNav />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: '12px',
                  padding: '14px',
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
