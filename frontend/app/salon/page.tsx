"use client"

import { useState } from "react"
import Image from "next/image"

export default function SalonPage() {
  const [activeTab, setActiveTab] = useState("descripcion")

  const amenities = [
    { icon: "👥", title: "Capacidad", description: "Hasta 300 personas" },
    { icon: "🅿️", title: "Estacionamiento", description: "Amplio y seguro" },
    { icon: "❄️", title: "Clima", description: "Aire acondicionado" },
    { icon: "🎵", title: "Audio", description: "Sistema profesional" },
    { icon: "💡", title: "Iluminación", description: "LED personalizable" },
    { icon: "🍽️", title: "Cocina", description: "Equipada completa" },
    { icon: "♿", title: "Accesibilidad", description: "Rampas y elevador" },
    { icon: "📶", title: "WiFi", description: "Alta velocidad" },
  ]

  const spaces = [
    {
      name: "Salón Principal",
      capacity: "200-300 personas",
      size: "450 m²",
      image: "/elegant-ballroom.png",
    },
    {
      name: "Terraza Jardín",
      capacity: "100-150 personas",
      size: "200 m²",
      image: "/garden-venue-roses.jpg",
    },
    {
      name: "Salón VIP",
      capacity: "50-80 personas",
      size: "120 m²",
      image: "/rooftop-terrace-event-venue.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/elegant-event-venue-garden.jpg"
          alt="Charlizze Eventos Salón"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Nuestro Salón</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Un espacio elegante y versátil para hacer realidad tus sueños
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {["descripcion", "espacios", "amenidades"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? "border-[#D4AF37] text-black"
                    : "border-transparent text-gray-500 hover:text-black hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeTab === "descripcion" && (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl mb-6">Elegancia y Sofisticación</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Charlizze Eventos es el escenario perfecto para celebrar los momentos más importantes de tu vida.
                Nuestro salón combina elegancia clásica con comodidades modernas, ofreciendo un ambiente sofisticado y
                acogedor.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Con más de 10 años de experiencia en la industria de eventos, hemos perfeccionado cada detalle para
                garantizar que tu celebración sea inolvidable. Desde bodas íntimas hasta grandes recepciones
                corporativas, nuestro espacio se adapta a tus necesidades.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nuestro equipo de profesionales está comprometido con la excelencia, trabajando contigo en cada paso
                para asegurar que tu visión se convierta en realidad.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-serif text-[#D4AF37] mb-2">10+</div>
                  <div className="text-sm text-gray-600">Años de Experiencia</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-[#D4AF37] mb-2">500+</div>
                  <div className="text-sm text-gray-600">Eventos Realizados</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-[#D4AF37] mb-2">300</div>
                  <div className="text-sm text-gray-600">Capacidad Máxima</div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="/hacienda-wedding-venue.jpg"
                alt="Interior del salón"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        )}

        {activeTab === "espacios" && (
          <div>
            <h2 className="font-serif text-4xl mb-4 text-center">Nuestros Espacios</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Contamos con diferentes áreas que se adaptan perfectamente a cualquier tipo de evento
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {spaces.map((space, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64">
                    <Image src={space.image || "/placeholder.svg"} alt={space.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl mb-3">{space.name}</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <span className="mr-2">👥</span>
                        <span>{space.capacity}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📏</span>
                        <span>{space.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "amenidades" && (
          <div>
            <h2 className="font-serif text-4xl mb-4 text-center">Amenidades</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Todo lo que necesitas para un evento perfecto
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="text-center p-6 border border-gray-200 rounded-lg hover:border-[#D4AF37] transition-colors"
                >
                  <div className="text-4xl mb-3">{amenity.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{amenity.title}</h3>
                  <p className="text-gray-600 text-sm">{amenity.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-serif text-4xl mb-6">¿Listo para Visitarnos?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Agenda una visita guiada y conoce personalmente nuestras instalaciones
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reservar"
              className="bg-[#D4AF37] text-black px-8 py-3 rounded hover:bg-[#C9A961] transition-colors font-medium"
            >
              Reservar Ahora
            </a>
            <a
              href="/contacto"
              className="border border-white px-8 py-3 rounded hover:bg-white hover:text-black transition-colors font-medium"
            >
              Agendar Visita
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
