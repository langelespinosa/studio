
import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans'; // Import Geist Sans
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import Navbar from "@/components/navbar"; // Import Navbar

export const metadata: Metadata = {
  title: 'Recipe Generator',
  description: 'Generate recipes based on your ingredients using AI',
  manifest: "/manifest.json", // Link to the manifest file
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} font-sans antialiased`}> {/* Use Geist Sans */}
      <Navbar/>
        {children}
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
