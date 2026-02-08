import { Caveat, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "SubPlanr — AI Substitute Teacher Plans",
  description:
    "Generate complete, classroom-ready substitute teacher plans in one click. Powered by AI, designed by teachers, built for peace of mind.",
  keywords: [
    "substitute teacher",
    "sub plans",
    "lesson plans",
    "AI teacher tools",
    "classroom",
    "education",
  ],
  authors: [{ name: "SubPlanr" }],
  openGraph: {
    title: "SubPlanr — AI Substitute Teacher Plans",
    description:
      "One-click substitute teacher plans. Never stress about sick days again.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
