"use client"

import { useState } from "react"
import Image from "next/image"

export default function ServiciosPage() {
  const [activeCategory, setActiveCategory] = useState("catering")

  const services = [
    {
      id: "catering",
      name: "Catering",
      icon: "🍽️",
      description: "Menús personalizados y servicio de alta calidad",
      packages: [
        { name: "Paquete Básico", price: "$350/persona", items: ["Entrada", "Plato fuerte", "Postre", "Bebidas"] },
        {
          name: "Paquete Premium",
          price: "$550/persona",
          items: [
            "Cocktail de bienvenida",
            "Entrada gourmet",
            "Plato fuerte premium",
            "Postre especial",
            "Barra libre 4 hrs",
          ],
        },
        {
          name: "Paquete Deluxe",
          price: "$750/persona",
          items: [
            "Cocktail premium",
            "Estación de canapés",
            "Entrada gourmet",
            "Plato fuerte de autor",
            "Postre personalizado",
            "Barra libre ilimitada",
          ],
        },
      ],
    },
    {
      id: "decoracion",
      name: "Decoración",
      icon: "🎨",
      description: "Ambientación y diseño floral personalizado",
      packages: [
        {
          name: "Decoración Básica",
          price: "$15,000",
          items: ["Arreglos florales básicos", "Centros de mesa", "Mantelería", "Iluminación básica"],
        },
        {
          name: "Decoración Premium",
          price: "$30,000",
          items: [
            "Arreglos florales premium",
            "Centros de mesa elaborados",
            "Mantelería de lujo",
            "Iluminación ambiental",
            "Backdrop personalizado",
          ],
        },
        {
          name: "Decoración Deluxe",
          price: "$50,000",
          items: [
            "Diseño floral de autor",
            "Centros de mesa únicos",
            "Mantelería importada",
            "Iluminación arquitectónica",
            "Backdrop premium",
            "Instalaciones especiales",
          ],
        },
      ],
    },
    {
      id: "fotografia",
      name: "Fotografía",
      icon: "📸",
      description: "Captura profesional de tus momentos especiales",
      packages: [
        {
          name: "Paquete Básico",
          price: "$8,000",
          items: ["4 horas de cobertura", "200 fotos editadas", "Álbum digital", "1 fotógrafo"],
        },
        {
          name: "Paquete Premium",
          price: "$15,000",
          items: [
            "6 horas de cobertura",
            "400 fotos editadas",
            "Álbum digital y físico",
            "2 fotógrafos",
            "Video highlights",
          ],
        },
        {
          name: "Paquete Deluxe",
          price: "$25,000",
          items: [
            "Cobertura completa",
            "600+ fotos editadas",
            "Álbum premium",
            "2 fotógrafos + videógrafo",
            "Video cinematográfico",
            "Drone",
          ],
        },
      ],
    },
    {
      id: "musica",
      name: "Música",
      icon: "🎵",
      description: "Entretenimiento musical para todos los gustos",
      packages: [
        { name: "DJ Básico", price: "$6,000", items: ["4 horas de música", "Equipo de sonido", "Iluminación básica"] },
        {
          name: "DJ Premium",
          price: "$12,000",
          items: ["6 horas de música", "Equipo de sonido profesional", "Iluminación LED", "Pantallas LED"],
        },
        {
          name: "Banda en Vivo",
          price: "$25,000",
          items: [
            "4 horas de música en vivo",
            "Banda de 8 integrantes",
            "Equipo profesional",
            "Repertorio personalizado",
          ],
        },
      ],
    },
    {
      id: "coordinacion",
      name: "Coordinación",
      icon: "📋",
      description: "Organización profesional de tu evento",
      packages: [
        {
          name: "Coordinación Día del Evento",
          price: "$8,000",
          items: ["Coordinación el día del evento", "Timeline detallado", "Supervisión de proveedores"],
        },
        {
          name: "Coordinación Parcial",
          price: "$15,000",
          items: [
            "2 meses de planeación",
            "Coordinación día del evento",
            "Selección de proveedores",
            "Diseño de timeline",
          ],
        },
        {
          name: "Coordinación Completa",
          price: "$30,000",
          items: [
            "Planeación completa",
            "Selección y negociación con proveedores",
            "Diseño conceptual",
            "Coordinación total",
            "Asistente adicional",
          ],
        },
      ],
    },
  ]

  const currentService = services.find((s) => s.id === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <Image src="/elegant-ballroom.png" alt="Servicios Charlizze Eventos" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Nuestros Servicios</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">Paquetes personalizados para hacer tu evento perfecto</p>
        </div>
      </section>

      {/* Services Navigation */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-8 py-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveCategory(service.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === service.id
                    ? "bg-[#D4AF37] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl">{service.icon}</span>
                <span className="font-medium">{service.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {currentService && (
          <div>
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">{currentService.icon}</div>
              <h2 className="font-serif text-4xl mb-4">{currentService.name}</h2>
              <p className="text-gray-600 text-lg">{currentService.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {currentService.packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-8 transition-all hover:shadow-xl ${
                    index === 1 ? "border-[#D4AF37] relative" : "border-gray-200"
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </div>
                  )}
                  <h3 className="font-serif text-2xl mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-[#D4AF37] mb-6">{pkg.price}</div>
                  <ul className="space-y-3 mb-8">
                    {pkg.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#D4AF37] mr-2">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/reservar"
                    className={`block text-center py-3 rounded font-medium transition-colors ${
                      index === 1
                        ? "bg-[#D4AF37] text-white hover:bg-[#C9A961]"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    Seleccionar
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl mb-6">Servicios Personalizados</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                En Charlizze Eventos entendemos que cada celebración es única. Por eso, todos nuestros paquetes son
                completamente personalizables según tus necesidades y presupuesto.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Nuestro equipo de expertos trabajará contigo para crear la combinación perfecta de servicios que haga
                realidad la visión de tu evento soñado.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded hover:bg-[#C9A961] transition-colors font-medium"
              >
                Solicitar Cotización Personalizada
              </a>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/elegant-event-venue-garden.jpg"
                alt="Servicios personalizados"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
