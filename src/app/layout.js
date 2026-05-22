import "./globals.css";
import ClientLayout from "@/components/providers/ClientLayout";
import { ViewTransitions } from "next-view-transitions";

const siteConfig = {
  name: "Edward Bowie",
  title: "Edward Bowie | Full-Stack Developer & Creative Technologist",
  description:
    "Full-stack developer specializing in web platforms, mobile apps, and Web3 solutions. Crafting digital experiences that blend art and technology.",
  url: "https://portfolio.kydek.com",
  ogImage: "/profile/profile-1.png",
  keywords: [
    "Edward Bowie",
    "Full-Stack Developer",
    "Web Developer",
    "Mobile Apps",
    "Web3",
    "Blockchain",
    "React",
    "Next.js",
    "Portfolio",
    "Kydek Studio",
  ],
};

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  icons: {
    icon: "/Core/logo.svg",
    shortcut: "/Core/logo.svg",
    apple: "/Core/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@EduShed",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
