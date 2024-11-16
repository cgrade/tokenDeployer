"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Coins, Settings, Send, Menu, X } from "lucide-react";
import "../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("manageTokens");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    {
      title: "Create Token",
      icon: Coins,
      section: "createToken",
      href: "/create",
    },
    {
      title: "Manage Tokens",
      icon: Settings,
      section: "manageTokens",
      href: "/manage",
    },
    { title: "Airdrop", icon: Send, section: "airdrop", href: "/airdrop" },
  ];

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gradient-to-br from-[#000510] via-[#002030] to-[#001525] text-white">
          <aside className="hidden md:block w-64 bg-gray-900 h-screen">
            <div className="p-6 border-b border-gray-700">
              <Link href="/" className="text-[#0095FF] font-bold text-xl">
                Token Deployer
              </Link>
            </div>
            <nav className="py-4">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ease-in-out
                  ${
                    activeSection === item.section
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => {
                    setActiveSection(item.section);
                    setIsSidebarOpen(false);
                  }}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </aside>
          <motion.aside
            initial={false}
            animate={{ x: isSidebarOpen ? 0 : -300 }}
            transition={{ duration: 0.3 }}
            className={`fixed left-0 top-0 bottom-0 w-64 bg-gray-800 z-50 md:hidden ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-6 flex justify-between items-center">
              <h1 className="text-xl font-bold">Menu</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="px-4 py-2">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
                  ${
                    activeSection === item.section
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => {
                    setActiveSection(item.section);
                    setIsSidebarOpen(false);
                  }}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </motion.aside>

          <main className="flex-1 flex flex-col">
            <nav className="bg-gray-900 text-white">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    className="text-white md:hidden"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    aria-label="Toggle sidebar"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex items-center">
                  <Button className="bg-blue-500 text-white px-8 py-2 rounded transition-all duration-300 hover:bg-blue-600">
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </nav>
            <div className="flex-1 p-8 transition-all duration-300">
              <div className="max-w-5xl mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
