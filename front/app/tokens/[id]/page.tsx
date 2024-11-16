"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Coins, Flame, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export default function TokenPage() {
  const params = useParams();
  const tokenId = params.id as string;

  // Mock data - replace with your API call
  const token = {
    name: "Grade",
    ticker: "GD",
    address: "0x35165465546876868846464s6d8468d6",
    totalSupply: "20000000",
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {token.name}
          </h1>
          <p className="text-sm text-gray-400 break-all">
            {token.ticker} • {token.address}
          </p>
        </div>
        <Button
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => (window.location.href = `/airdrop?token=${tokenId}`)}
        >
          Airdrop Token
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800 h-full">
          <CardHeader>
            <CardTitle className="text-gray-400">Total Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl sm:text-3xl font-bold text-white break-all">
              {token.totalSupply}
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-gray-900/50 border-gray-800">
          <CardContent className="p-0">
            <Tabs defaultValue="mint" className="w-full">
              <TabsList className="w-full bg-gray-800/50 p-1 rounded-t-lg">
                <TabsTrigger
                  value="mint"
                  className="flex-1 data-[state=active]:bg-gray-900"
                >
                  Mint
                </TabsTrigger>
                <TabsTrigger
                  value="burn"
                  className="flex-1 data-[state=active]:bg-gray-900"
                >
                  Burn
                </TabsTrigger>
                <TabsTrigger
                  value="whitelist"
                  className="flex-1 data-[state=active]:bg-gray-900"
                >
                  Whitelist
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mint" className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-white">
                      Mint New Tokens
                    </h2>
                  </div>
                  <CardDescription>
                    Create new tokens and add them to the total supply
                  </CardDescription>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Amount to Mint
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter amount"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Mint Tokens
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="burn" className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-red-500" />
                    <h2 className="text-lg font-semibold text-white">
                      Burn Tokens
                    </h2>
                  </div>
                  <CardDescription>
                    Remove tokens from the total supply
                  </CardDescription>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Amount to Burn
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter amount"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Burn Tokens
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="whitelist" className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <h2 className="text-lg font-semibold text-white">
                      Manage Whitelist
                    </h2>
                  </div>
                  <CardDescription>
                    Control which addresses can interact with the token
                  </CardDescription>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Address to Add/Remove
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter address"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      Add to Whitelist
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                      Remove from Whitelist
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
