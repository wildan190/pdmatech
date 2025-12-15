import './globals.css';
import { ReactNode } from 'react';

// This is the root layout. The language-specific layout at [lang]/layout.tsx
// will render the main html and body structure.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
