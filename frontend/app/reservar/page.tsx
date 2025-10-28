"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

export default function ReservarPage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedPackage, setSelectedPackage] = useState("")
  const [guests, setGuests] = useState(100)
  const [addOns, setAddOns] = useState<string[]>([])

  const packages = [
    { id: "basico", name: "Paquete Básico", price: 45000, description: "Incluye salón y servicios básicos" },
    { id: "premium", name: "Paquete Premium", price: 85000, description: "Incluye salón, catering y decoración" },
    { id: "deluxe", name: "Paquete Deluxe", price: 150000, description: "Experiencia completa todo incluido" },
  ]

  const addOnOptions = [
    { id: "fotografia", name: "Fotografía Profesional", price: 12000 },
    { id: "video", name: "Video Cinematográfico", price: 18000 },
    { id: "musica", name: "DJ Premium", price: 10000 },
    { id: "decoracion-extra", name: "Decoración Extra", price: 15000 },
    { id: "barra-libre", name: "Barra Libre Premium", price: 25000 },
    { id: "photobooth", name: "Photobooth", price: 8000 },
  ]

  const calculateTotal = () => {
    const packagePrice = packages.find((p) => p.id === selectedPackage)?.price || 0
    const addOnsPrice = addOns.reduce((total, addOnId) => {
      const addOn = addOnOptions.find((a) => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)
    return packagePrice + addOnsPrice
  }

  const toggleAddOn = (addOnId: string) => {
    setAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Reserva enviada! Nos pondremos en contacto contigo pronto.")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <Image
          src="/hacienda-wedding-venue.jpg"
          alt="Reservar Charlizze Eventos"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Reserva tu Evento</h1>
          <p className="text-xl md:text-2xl">Completa el formulario y te contactaremos pronto</p>
        </div>
      </section>

      {/* Booking Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="font-serif text-3xl mb-6">Información Personal</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D4AF37]"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D4AF37]"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D4AF37]"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Evento *</label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="">Selecciona...</option>
                      <option value="boda">Boda</option>
                      <option value="xv">XV Años</option>
                      <option value="corporativo">Evento Corporativo</option>
                      <option value="cumpleanos">Cumpleaños</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="font-serif text-3xl mb-6">Detalles del Evento</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Fecha del Evento *</label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Número de Invitados *</label>
                    <input
                      type="number"
                      required
                      min="50"
                      max="300"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="range"
                      min="50"
                      max="300"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Package Selection */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="font-serif text-3xl mb-6">Selecciona tu Paquete</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPackage === pkg.id
                          ? "border-[#D4AF37] bg-[#D4AF37]/5"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <h3 className="font-serif text-xl mb-2">{pkg.name}</h3>
                      <div className="text-2xl font-bold text-[#D4AF37] mb-2">${pkg.price.toLocaleString()}</div>
                      <p className="text-sm text-gray-600">{pkg.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="font-serif text-3xl mb-6">Servicios Adicionales</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {addOnOptions.map((addOn) => (
                    <div
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        addOns.includes(addOn.id)
                          ? "border-[#D4AF37] bg-[#D4AF37]/5"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{addOn.name}</h4>
                          <p className="text-[#D4AF37] font-semibold">+${addOn.price.toLocaleString()}</p>
                        </div>
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                            addOns.includes(addOn.id) ? "bg-[#D4AF37] border-[#D4AF37]" : "border-gray-300"
                          }`}
                        >
                          {addOns.includes(addOn.id) && <span className="text-white text-sm">✓</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Comments */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="font-serif text-3xl mb-6">Comentarios Adicionales</h2>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Cuéntanos más sobre tu evento..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-white py-4 rounded-lg text-lg font-medium hover:bg-[#C9A961] transition-colors"
              >
                Enviar Solicitud de Reserva
              </button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-black text-white p-8 rounded-lg">
              <h3 className="font-serif text-2xl mb-6">Resumen de Reserva</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Fecha:</span>
                  <span>{selectedDate || "No seleccionada"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Invitados:</span>
                  <span>{guests} personas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Paquete:</span>
                  <span>{packages.find((p) => p.id === selectedPackage)?.name || "No seleccionado"}</span>
                </div>
              </div>

              {selectedPackage && (
                <>
                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Paquete Base</span>
                      <span>${packages.find((p) => p.id === selectedPackage)?.price.toLocaleString()}</span>
                    </div>
                    {addOns.length > 0 && (
                      <div className="space-y-2 text-sm text-gray-300">
                        {addOns.map((addOnId) => {
                          const addOn = addOnOptions.find((a) => a.id === addOnId)
                          return (
                            <div key={addOnId} className="flex justify-between">
                              <span>{addOn?.name}</span>
                              <span>+${addOn?.price.toLocaleString()}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total Estimado</span>
                      <span className="text-[#D4AF37]">${calculateTotal().toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      *Precio estimado. El costo final puede variar según disponibilidad y servicios adicionales.
                    </p>
                  </div>
                </>
              )}

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-300 mb-4">¿Tienes preguntas? Contáctanos</p>
                <div className="space-y-2 text-sm">
                  <div>📞 (555) 123-4567</div>
                  <div>📧 info@charlizze.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
