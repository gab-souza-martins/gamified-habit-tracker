import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Quest Tracker",
   description: "Gerenciador de hábitos gamificado",
   keywords: [
      "hábito",
      "hábitos",
      "organização",
      "rpg",
      "gamificação",
      "gamificado",
      "gerenciador de hábitos",
      "gerenciador de hábito",
      "todo list",
      "lista de afazeres",
   ],
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="pt-BR">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            {children}
         </body>
      </html>
   );
}
