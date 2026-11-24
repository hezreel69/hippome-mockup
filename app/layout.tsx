import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { HippomeStoreProvider } from "@/context/HippomeStoreProvider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hippome | Form 5 SPM Quiz & Voucher Wallet",
  description:
    "Form 5 SPM quizzes matched to your level with real-life Malaysian student vouchers from TNG eWallet, ZUS Coffee, CHAGEE, Mixue, and 7-Eleven.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f4ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col bg-[var(--ground)] text-[var(--text)]">
        <HippomeStoreProvider>{children}</HippomeStoreProvider>
      </body>
    </html>
  );
}
