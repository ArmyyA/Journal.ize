import "./globals.css";
import Nav from "./nav";
import { Poppins } from "next/font/google";

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
      <body
        className={`mx-6 md:max-w-2xl md:mx-auto ${poppins.variable} text-black`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
