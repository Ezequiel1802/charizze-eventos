"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import Image from "next/image"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Nuestro Salón", href: "/salon" },
    { name: "Servicios", href: "/servicios" },
    { name: "Galería", href: "/galeria" },
    { name: "Reservar", href: "/reservar" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-face-new-QyRfqUuWTrNLEceTb5TWa3CwQzyZsM.png"
              alt="Charlizze Eventos"
              width={180}
              height={60}
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#d4af37] ${
                  pathname === item.href ? "text-[#d4af37]" : "text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+525512345678" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#d4af37]">
              <Phone className="h-4 w-4" />
              <span>(55) 1234-5678</span>
            </a>
            <Button asChild className="bg-[#d4af37] hover:bg-[#b8941f] text-white">
              <Link href="/reservar">Reservar Ahora</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 pt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-[#d4af37] ${
                        pathname === item.href ? "text-[#d4af37]" : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="my-4 border-t" />
                  <a href="tel:+525512345678" className="flex items-center gap-2 text-lg font-medium text-gray-900">
                    <Phone className="h-5 w-5" />
                    <span>(55) 1234-5678</span>
                  </a>
                  <Button asChild className="bg-[#d4af37] hover:bg-[#b8941f] text-white w-full">
                    <Link href="/reservar">Reservar Ahora</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
