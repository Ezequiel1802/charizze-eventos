"use client"

import { useState } from "react"
import Image from "next/image"

export default function GaleriaPage() {
  const [activeFilter, setActiveFilter] = useState("todos")

  const filters = [
    { id: "todos", name: "Todos" },
    { id: "bodas", name: "Bodas" },
    { id: "xv", name: "XV Años" },
    { id: "corporativos", name: "Corporativos" },
    { id: "sociales", name: "Eventos Sociales" },
  ]

  const gallery = [
    { id: 1, category: "bodas", image: "/elegant-event-venue-garden.jpg", title: "Boda Jardín" },
    { id: 2, category: "bodas", image: "/hacienda-wedding-venue.jpg", title: "Boda Elegante" },
    { id: 3, category: "corporativos", image: "/elegant-ballroom.png", title: "Evento Corporativo" },
    { id: 4, category: "xv", image: "/rooftop-terrace-event-venue.jpg", title: "XV Años Terraza" },
    { id: 5, category: "bodas", image: "/garden-venue-roses.jpg", title: "Ceremonia Jardín" },
    { id: 6, category: "sociales", image: "/elegant-event-venue-garden.jpg", title: "Fiesta Social" },
    { id: 7, category: "bodas", image: "/hacienda-wedding-venue.jpg", title: "Recepción Boda" },
    { id: 8, category: "corporativos", image: "/elegant-ballroom.png", title: "Conferencia" },
    { id: 9, category: "xv", image: "/rooftop-terrace-event-venue.jpg", title: "Celebración XV" },
    { id: 10, category: "sociales", image: "/garden-venue-roses.jpg", title: "Aniversario" },
    { id: 11, category: "bodas", image: "/elegant-event-venue-garden.jpg", title: "Boda al Aire Libre" },
    { id: 12, category: "corporativos", image: "/elegant-ballroom.png", title: "Gala Empresarial" },
  ]

  const filteredGallery = activeFilter === "todos" ? gallery : gallery.filter((item) => item.category === activeFilter)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <Image src="/garden-venue-roses.jpg" alt="Galería Charlizze Eventos" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Galería</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">Descubre la magia de los eventos que hemos creado</p>
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 py-6 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                  activeFilter === filter.id ? "bg-[#D4AF37] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-xl">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-serif text-4xl mb-6">¿Listo para Crear tu Propio Evento?</h2>
          <p className="text-xl text-gray-600 mb-8">Permítenos ser parte de tus momentos más especiales</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reservar"
              className="bg-[#D4AF37] text-white px-8 py-3 rounded hover:bg-[#C9A961] transition-colors font-medium"
            >
              Reservar Ahora
            </a>
            <a
              href="/contacto"
              className="border-2 border-black text-black px-8 py-3 rounded hover:bg-black hover:text-white transition-colors font-medium"
            >
              Agendar Visita
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
