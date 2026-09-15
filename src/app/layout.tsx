import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://labourchowk.example"),
  title: {
    default: "Labour Chowk | Find Trusted Workers Near You",
    template: "%s | Labour Chowk",
  },
  description:
    "Find electricians, plumbers, carpenters, painters, construction workers and other professionals near you with Labour Chowk. Har Kaam Ke Liye, Sahi Insaan.",
  keywords: [
    "labour chowk",
    "hire workers",
    "electrician near me",
    "plumber",
    "carpenter",
    "painter",
    "mason",
    "construction labour",
    "service marketplace india",
  ],
  authors: [{ name: "Labour Chowk" }],
  openGraph: {
    title: "Labour Chowk | Find Trusted Workers Near You",
    description:
      "Find trusted workers near you. Get the job done right. Electrician se plumber tak, painter se construction worker tak.",
    type: "website",
    locale: "en_IN",
    siteName: "Labour Chowk",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labour Chowk | Find Trusted Workers Near You",
    description: "Find trusted workers near you. Get the job done right.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#171412",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
