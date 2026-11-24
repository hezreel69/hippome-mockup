import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { MnemoStoreProvider } from "@/context/MnemoStoreProvider";
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
  title: "Mnemo | Quizzes & Voucher Wallet",
  description:
    "Quick quizzes matched to your level with vouchers from TNG eWallet, ZUS Coffee, CHAGEE, Mixue, and 7-Eleven.",
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
        <MnemoStoreProvider>{children}</MnemoStoreProvider>
      </body>
    </html>
  );
}
