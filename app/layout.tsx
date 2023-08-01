import "./globals.css";
import Nav from "./nav";
import { Poppins } from "next/font/google";
import QueryWrapper from "./QueryWrapper";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} text-black`}>
        <QueryWrapper>
          <div className="mx-6 md:max-w-4xl md:mx-auto ">
            <Nav />
            <Toaster />

            {children}
          </div>
        </QueryWrapper>
        <footer className="py-32"></footer>
      </body>
    </html>
  );
}
