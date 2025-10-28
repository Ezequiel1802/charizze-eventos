"use client"

import { MapPin, Search, Star, Users, Filter } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SalonesPage() {
  const [priceRange, setPriceRange] = useState([0, 50000])

  const venues = [
    {
      id: "1",
      name: "Salón Jardín Imperial",
      location: "Ciudad de México",
      rating: 4.9,
      reviews: 127,
      price: 15000,
      capacity: "200-300 personas",
      image: "/elegant-event-venue-garden.jpg",
      features: ["Jardín", "Estacionamiento", "Cocina"],
    },
    {
      id: "2",
      name: "Terraza Vista Hermosa",
      location: "Guadalajara",
      rating: 4.8,
      reviews: 98,
      price: 12000,
      capacity: "150-200 personas",
      image: "/rooftop-terrace-event-venue.jpg",
      features: ["Terraza", "Vista panorámica", "Bar"],
    },
    {
      id: "3",
      name: "Hacienda Los Olivos",
      location: "Monterrey",
      rating: 5.0,
      reviews: 156,
      price: 20000,
      capacity: "300-400 personas",
      image: "/hacienda-wedding-venue.jpg",
      features: ["Hacienda", "Jardín", "Capilla"],
    },
    {
      id: "4",
      name: "Salón Elegance",
      location: "Puebla",
      rating: 4.7,
      reviews: 84,
      price: 10000,
      capacity: "100-150 personas",
      image: "/elegant-ballroom.png",
      features: ["Salón cerrado", "Aire acondicionado", "Audio"],
    },
    {
      id: "5",
      name: "Quinta Las Rosas",
      location: "Querétaro",
      rating: 4.9,
      reviews: 112,
      price: 18000,
      capacity: "250-350 personas",
      image: "/garden-venue-roses.jpg",
      features: ["Quinta", "Alberca", "Jardín"],
    },
    {
      id: "6",
      name: "Salón Crystal",
      location: "Cancún",
      rating: 4.8,
      reviews: 93,
      price: 25000,
      capacity: "200-250 personas",
      image: "/luxury-crystal-ballroom.jpg",
      features: ["Vista al mar", "Playa privada", "Lujo"],
    },
  ]

  return (
    <div className="min-h-screen bg-[#fcfdfd]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#415444] to-[#338838] px-8 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-4xl font-bold">Encuentra tu Salón Ideal</h1>
          <p className="mb-8 text-lg text-white/90">Explora nuestra selección de salones para eventos en todo México</p>

          {/* Search Bar */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Buscar por nombre o ubicación..." className="pl-10 h-12" />
                </div>
                <Button className="bg-[#415444] hover:bg-[#415444]/90 h-12 px-8">Buscar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-20 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Filtros</h3>
                    <Button variant="ghost" size="sm" className="text-[#338838]">
                      Limpiar
                    </Button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <Label className="mb-3 block font-semibold">Rango de Precio</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="price1" />
                        <label htmlFor="price1" className="text-sm">
                          Menos de $10,000
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="price2" />
                        <label htmlFor="price2" className="text-sm">
                          $10,000 - $20,000
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="price3" />
                        <label htmlFor="price3" className="text-sm">
                          Más de $20,000
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="mb-6">
                    <Label className="mb-3 block font-semibold">Capacidad</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="cap1" />
                        <label htmlFor="cap1" className="text-sm">
                          Menos de 100
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="cap2" />
                        <label htmlFor="cap2" className="text-sm">
                          100 - 200
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="cap3" />
                        <label htmlFor="cap3" className="text-sm">
                          200 - 300
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="cap4" />
                        <label htmlFor="cap4" className="text-sm">
                          Más de 300
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-6">
                    <Label className="mb-3 block font-semibold">Ubicación</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="loc1" />
                        <label htmlFor="loc1" className="text-sm">
                          Ciudad de México
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="loc2" />
                        <label htmlFor="loc2" className="text-sm">
                          Guadalajara
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="loc3" />
                        <label htmlFor="loc3" className="text-sm">
                          Monterrey
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <Label className="mb-3 block font-semibold">Características</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="feat1" />
                        <label htmlFor="feat1" className="text-sm">
                          Jardín
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="feat2" />
                        <label htmlFor="feat2" className="text-sm">
                          Estacionamiento
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="feat3" />
                        <label htmlFor="feat3" className="text-sm">
                          Terraza
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Venues Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  Mostrando <span className="font-semibold">{venues.length}</span> salones
                </p>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Ordenar por
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {venues.map((venue) => (
                  <Card
                    key={venue.id}
                    className="group overflow-hidden border-0 shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={venue.image || "/placeholder.svg"}
                        alt={venue.name}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-2 flex items-start justify-between">
                        <h3 className="text-xl font-semibold">{venue.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{venue.rating}</span>
                        </div>
                      </div>
                      <div className="mb-2 flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{venue.location}</span>
                      </div>
                      <div className="mb-3 flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{venue.capacity}</span>
                      </div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {venue.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full bg-[#e0e5ce] px-3 py-1 text-xs font-medium text-[#415444]"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Desde</p>
                          <p className="text-2xl font-bold text-[#338838]">${venue.price.toLocaleString()}</p>
                        </div>
                        <Button className="bg-[#415444] hover:bg-[#415444]/90">Ver Detalles</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
