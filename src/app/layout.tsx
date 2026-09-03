import type { Metadata } from 'next';
import './globals.css';
import { StudentProvider } from '@/context/StudentContext';
import { SpeechProvider } from '@/context/SpeechContext';
import { TextSelectionReader } from '@/components/common/TextSelectionReader';

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
      <body className="antialiased bg-[#F7F9FE] text-[#101D35] font-sans">

        <StudentProvider>
          <SpeechProvider>
            {children}
            <TextSelectionReader />
          </SpeechProvider>
        </StudentProvider>
      </body>
    </html>
  );
}

