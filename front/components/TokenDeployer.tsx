"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";
import Switch from "./ui/Switch";
import { Coins, Settings, Send, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TokenDeployer({ initialSection = "createToken" }) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [selectedToken, setSelectedToken] = useState<string | undefined>(
    undefined
  );

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

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Deploy Token
        </Button>
      </CardContent>
    </Card>
  );

  const renderManageTokens = () => {
    const mockTokens = [
      {
        id: 1,
        name: "Galaxy Token",
        ticker: "GL",
        address: "0x1234...5678",
        dateCreated: "2024-01-15",
        isMintable: true,
        isBurnable: true,
        hasWhitelist: true,
      },
      {
        id: 2,
        name: "Star Token",
        ticker: "STR",
        address: "0x8765...4321",
        dateCreated: "2024-01-16",
        isMintable: false,
        isBurnable: true,
        hasWhitelist: false,
      },
    ];
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Manage Tokens</h2>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Your Tokens</CardTitle>
            <CardDescription className="text-gray-400">
              Manage and monitor all your deployed tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-800/50">
                <TableRow>
                  <TableHead className="text-gray-400">Token Name</TableHead>
                  <TableHead className="text-gray-400">Ticker</TableHead>
                  <TableHead className="text-gray-400">
                    Contract Address
                  </TableHead>
                  <TableHead className="text-gray-400">Date Created</TableHead>
                  <TableHead className="text-gray-400 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* // Maps the List of tokens to render them in the Table. */}
                {mockTokens.map((token) => (
                  // Table Row starts Here
                  <TableRow key={token.id} className="border-gray-800">
                    {/* // Table Cell for Name */}
                    <TableCell>
                      <Link
                        href={`/tokens/${token.id}`}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        {token.name}
                      </Link>
                    </TableCell>
                    {/* // Table Cell for Ticker */}
                    <TableCell className="text-gray-300">
                      {token.ticker}
                    </TableCell>
                    {/* // Table Cell for Contract Address */}
                    <TableCell className="font-mono text-gray-300">
                      {token.address}
                    </TableCell>
                    {/* // Table Cell for Date Created */}
                    <TableCell className="text-gray-300">
                      {new Date(token.dateCreated).toLocaleDateString()}
                    </TableCell>
                    {/* // Table Cell for Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-gray-900 border-gray-800"
                        >
                          <DropdownMenuItem
                            className="text-gray-300 hover:text-white focus:text-white"
                            onClick={() =>
                              (window.location.href = `/tokens/${token.id}`)
                            }
                          >
                            Manage Token
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-gray-300 hover:text-white focus:text-white"
                            onClick={() =>
                              (window.location.href = `/airdrop?token=${token.id}`)
                            }
                          >
                            Airdrop Token
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAirdrop = () => {
    const mockTokens = [
      {
        id: 1,
        name: "Galaxy Token",
        ticker: "GLX",
        address: "0x1234...5678",
        dateCreated: "2024-01-15",
        isMintable: true,
        isBurnable: true,
        hasWhitelist: true,
      },
      {
        id: 2,
        name: "Star Token",
        ticker: "STR",
        address: "0x8765...4321",
        dateCreated: "2024-01-16",
        isMintable: false,
        isBurnable: true,
        hasWhitelist: false,
      },
    ];
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Airdrop Tokens</CardTitle>
          <CardDescription className="text-gray-400">
            Distribute tokens to multiple addresses at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Select Token</label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select a token to airdrop" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                // Render The Queried List
                {mockTokens.map((token) => (
                  <SelectItem
                    key={token.id}
                    value={token.id.toString()}
                    className="text-gray-300 focus:text-white focus:bg-gray-800"
                  >
                    {token.name} ({token.ticker})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <textarea
            className="w-full h-32 p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-blue-500"
            placeholder="Enter recipient addresses (one per line)"
          />

          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Amount per address"
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Start Airdrop
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    // This Toggles Between the page to Render.
    <motion.div
      key={activeSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {activeSection === "createToken" && renderCreateToken()}
      {activeSection === "manageTokens" && renderManageTokens()}
      {activeSection === "airdrop" && renderAirdrop()}
    </motion.div>
  );
}
