import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import DevToolbar from '@/components/DevToolbar';
import { FlowProvider } from './context/FlowContext';

const centrano2 = localFont({
  src: [
    {
      path: '../fonts/CentraNo2/CentraNo2-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/CentraNo2/CentraNo2-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/CentraNo2/CentraNo2-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/CentraNo2/CentraNo2-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/CentraNo2/CentraNo2-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/CentraNo2/CentraNo2-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../fonts/CentraNo2/CentraNo2-Reg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/CentraNo2/CentraNo2-RegItalic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-centrano2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sign Up | Vrbo",
  description: "Sign up to list your property on Vrbo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${centrano2.className} min-h-screen bg-gray-50`}>
        <FlowProvider>
          {children}
          <DevToolbar />
        </FlowProvider>
      </body>
    </html>
  );
}
