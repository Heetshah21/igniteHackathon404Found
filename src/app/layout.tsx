import type { Metadata } from 'next';
import './globals.css';
import { StudentProvider } from '@/context/StudentContext';

export const metadata: Metadata = {
  title: 'CAREERMitra — Personalized Career & Education Navigation for Bharat',
  description:
    'Guiding rural and underserved Indian students with personalized education pathways, career roadmaps, scholarships, free learning resources, ATS resume builder, and AI career assistance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-slate-50 text-slate-900 font-sans">
        <StudentProvider>{children}</StudentProvider>
      </body>
    </html>
  );
}
