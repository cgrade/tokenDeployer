import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Coins,
  Wallet,
  Lock,
  Zap,
  Gift,
  Github,
  Twitter,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000510] via-[#002030] to-[#001525] text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-10 lg:pt-50">
        <div className="grid lg:grid-cols-2 gap-12 lg:items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Create <span className="text-[#0095FF]">Tokens</span> easily
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg">
              A No Code Approach to Create, manage and airdrop tokens
              effortlessly for your project.
            </p>
            <Button className="bg-blue-500 text-white px-8 py-2 rounded transition-all duration-300 hover:bg-blue-600">
              <Link href="/create">Launch App</Link>
            </Button>
          </div>

          <div className="relative">
            <div className="animate-float-slow">
              <Image
                src="/hero.png"
                alt="ERC20 Tokens"
                width={500}
                height={500}
                className="w-auto h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything you need to manage tokens
            </h2>
            <p className="text-gray-400 text-lg">
              Powerful features to help you create and manage tokens with ease
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Coins className="h-12 w-12 text-[#0095FF] mb-4" />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Token Creation</h3>
                  <p className="text-gray-400">
                    Create ERC20 and ERC721 tokens with customizable parameters
                    in minutes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Wallet className="h-12 w-12 text-[#0095FF] mb-4" />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Token Management</h3>
                  <p className="text-gray-400">
                    Manage your tokens with features like minting, burning, and
                    transfer restrictions
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Lock className="h-12 w-12 text-[#0095FF] mb-4" />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Security Features</h3>
                  <p className="text-gray-400">
                    Built-in security features including whitelisting and
                    transfer fee management
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Zap className="h-12 w-12 text-[#0095FF] mb-4" />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Fast Deployment</h3>
                  <p className="text-gray-400">
                    Deploy tokens to multiple networks with just a few clicks
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Gift className="h-12 w-12 text-[#0095FF] mb-4" />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Airdrop Tools</h3>
                  <p className="text-gray-400">
                    Easily distribute tokens to multiple addresses with our
                    airdrop feature
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <MessageCircle className="h-12 w-12 text-[#0095FF] mb-4" />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">24/7 Support</h3>
                  <p className="text-gray-400">
                    Get help whenever you need it with our dedicated support
                    team
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
