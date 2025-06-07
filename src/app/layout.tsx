import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

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
  title: "Sign Up | Housecall Pro",
  description: "Sign up for Housecall Pro's services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${centrano2.className} min-h-screen bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
