"use client";
import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";
import Switch from "./ui/Switch";
import { Coins, ImageIcon, Settings, Send, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
// import Link from "next/link";

export default function TokenDeployer() {
  const [activeSection, setActiveSection] = useState("createToken");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderCreateToken = () => (
    <Card className="bg-gray-900 border-gray-800 shadow-lg">
      <CardContent className="p-8 space-y-8">
        <h2 className="text-2xl font-bold text-white mb-6">Create Token</h2>

        <div className="space-y-4">
          {[
            "Simple token generator",
            "No programming required",
            "100% ownership",
            "Custom parameters",
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-blue-400"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tokenName" className="text-gray-300">
                Token Name
              </Label>
              <Input
                id="tokenName"
                placeholder="e.g. Galactic Coin"
                className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenSymbol" className="text-gray-300">
                Token Symbol
              </Label>
              <Input
                id="tokenSymbol"
                placeholder="e.g. GLC"
                className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="initialSupply" className="text-gray-300">
                Initial Supply
              </Label>
              <Input
                id="initialSupply"
                type="number"
                placeholder="e.g. 1,000,000,000"
                className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="decimals" className="text-gray-300">
                Decimals (0-18)
              </Label>
              <Input
                id="decimals"
                type="number"
                placeholder="e.g. 18"
                className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            "Mintable",
            "Burnable",
            "Enable Transfer Fee",
            "Enable Whitelisting",
          ].map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
            >
              <Label
                htmlFor={option.toLowerCase().replace(" ", "-")}
                className="text-gray-300"
              >
                {option}
              </Label>
              <Switch id={option.toLowerCase().replace(" ", "-")} />
            </div>
          ))}
        </div>

        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Deploy Token
        </button>
      </CardContent>
    </Card>
  );

  function renderCreateNFT() {
    return (
      <Card className="bg-gray-900 border-gray-800 shadow-lg">
        <CardContent className="p-8 space-y-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Create NFT Collection
          </h2>

          <div className="space-y-4">
            {[
              "Simple NFT generator",
              "No programming required",
              "100% ownership",
              "Custom collection",
              "IPFS metadata hosting",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-blue-400"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800 p-1 rounded-lg">
              <TabsTrigger
                value="basic"
                className="text-white data-[state=active]:bg-blue-600"
              >
                Basic Settings
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="text-white data-[state=active]:bg-blue-600"
              >
                Advanced Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-6 mt-6">
              <div className="space-y-4">
                {[
                  {
                    label: "Collection Name",
                    id: "collectionName",
                    placeholder: "e.g. Cosmic Creatures",
                  },
                  { label: "Symbol", id: "symbol", placeholder: "e.g. CSMC" },
                  {
                    label: "Base URI",
                    id: "baseURI",
                    placeholder: "e.g. ipfs://",
                  },
                  {
                    label: "Max Supply",
                    id: "maxSupply",
                    type: "number",
                    placeholder: "e.g. 10000",
                  },
                  {
                    label: "Mint Price",
                    id: "mintPrice",
                    type: "number",
                    placeholder: "e.g. 0.08",
                  },
                ].map((field, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={field.id} className="text-gray-300">
                      {field.label} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={field.id}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="advanced" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <Label htmlFor="customContract" className="text-gray-300">
                    Set Custom Contract Name
                  </Label>
                  <Switch id="customContract" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractName" className="text-gray-300">
                    Contract Name
                  </Label>
                  <Input
                    id="contractName"
                    placeholder="e.g. CosmicCreaturesNFT"
                    className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {[
                  "Public Minting",
                  "Enable Presale",
                  "Delayed Reveal",
                  "Enable Whitelisting",
                ].map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                  >
                    <Label
                      htmlFor={option.toLowerCase().replace(" ", "-")}
                      className="text-gray-300"
                    >
                      {option}
                    </Label>
                    <Switch id={option.toLowerCase().replace(" ", "-")} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Deploy Collection
          </Button>
        </CardContent>
      </Card>
    );
  }

  const renderManageTokens = (): JSX.Element => {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Manage Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Mint New Tokens",
              action: "Mint Tokens",
              fields: ["Token Address", "Amount to Mint"],
            },
            {
              title: "Burn Tokens",
              action: "Burn Tokens",
              fields: ["Token Address", "Amount to Burn"],
            },
            {
              title: "Set Transfer Fee",
              action: "Set Fee",
              fields: ["Token Address", "Fee Percentage"],
            },
            {
              title: "Manage Whitelist",
              action: ["Add to Whitelist", "Remove from Whitelist"],
              fields: ["Token Address", "Address to Add/Remove"],
            },
          ].map((section, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {section.title}
                </h3>
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-2">
                    <Label
                      htmlFor={`${section.title}-${field}`}
                      className="text-gray-300"
                    >
                      {field}
                    </Label>
                    <Input
                      id={`${section.title}-${field}`}
                      placeholder={field}
                      className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ))}
                {Array.isArray(section.action) ? (
                  <div className="flex gap-4 mt-4">
                    {section.action.map((act, actIndex) => (
                      <Button
                        key={actIndex}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        {act}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    {section.action}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderAirdrop = () => (
    <Card className="bg-gray-800 border-gray-700 max-w-md mx-auto">
      <CardContent className="p-6 space-y-8">
        <h3 className="text-2xl font-semibold text-center text-white">
          Airdrop Tokens
        </h3>
        <div className="space-y-4">
          <Input
            placeholder="Token Address"
            className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          />
          <textarea
            className="w-full h-40 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter recipient addresses (one per line)"
          ></textarea>
          <Input
            type="number"
            placeholder="Amount per Address"
            className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105">
            Start Airdrop
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#000510] via-[#002030] to-[#001525] text-white">
      <aside className="hidden md:block w-64 bg-gray-900 h-screen">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
        </div>
        <nav className="py-4">
          {[
            { title: "Create Token", icon: Coins, section: "createToken" },
            { title: "Create NFT", icon: ImageIcon, section: "createNFT" },
            {
              title: "Manage Tokens",
              icon: Settings,
              section: "manageTokens",
            },
            { title: "Airdrop", icon: Send, section: "airdrop" },
          ].map((item, index) => (
            <button
              key={index}
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
            </button>
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
          {[
            { title: "Create Token", icon: Coins, section: "createToken" },
            { title: "Create NFT", icon: ImageIcon, section: "createNFT" },
            {
              title: "Manage Tokens",
              icon: Settings,
              section: "manageTokens",
            },
            { title: "Airdrop", icon: Send, section: "airdrop" },
          ].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start gap-3 text-white hover:bg-gray-700 mb-1 ${
                activeSection === item.section ? "bg-gray-700" : ""
              }`}
              onClick={() => {
                setActiveSection(item.section);
                setIsSidebarOpen(false);
              }}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Button>
          ))}
        </nav>
      </motion.aside>

      <main className="flex-1 p-8 transition-all duration-300">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-8 md:p-8">
            <div className="flex items-center gap-4 md:hidden">
              <Button
                className="bg-blue-500 text-white px-8 py-2 rounded transition-all duration-300 hover:bg-blue-600"
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            <div className="hidden md:flex justify-center items-center w-full">
              <h2 className="text-2xl font-semibold">
                {activeSection === "createToken" && "Create an ERC20 Token"}
                {activeSection === "createNFT" && "Create NFT"}
                {activeSection === "manageTokens" && "Manage Your Tokens"}
                {activeSection === "airdrop" && "Airdrop Tokens to Community"}
              </h2>
            </div>
          </header>

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === "createToken" && renderCreateToken()}
            {activeSection === "createNFT" && renderCreateNFT()}
            {activeSection === "manageTokens" && renderManageTokens()}
            {activeSection === "airdrop" && renderAirdrop()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
