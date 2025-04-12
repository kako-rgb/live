import type { Metadata } from "next";
import { FONT_FAMILY } from "@/config";

export const metadata: Metadata = {
  title: "Your App",
  description: "Your app description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={FONT_FAMILY.className}>
      <body>{children}</body>
    </html>
  );
}
