import Navbar from "@/components/Navbar";
import "./globals.css";
import { degular } from "./styles/fonts";
import { Providers } from "@/lib/store/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${degular.className} font-degular px-4 text-black antialiased`}
      >
        <Providers>
          <Navbar />
          <div className="pt-12 md:pt-24">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
