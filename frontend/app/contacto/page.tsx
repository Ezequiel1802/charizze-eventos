"use client"

import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfd]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#415444] to-[#338838] px-8 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-4xl font-bold">Contáctanos</h1>
          <p className="text-lg text-white/90">Estamos aquí para ayudarte a planear tu evento perfecto</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-8 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="mb-6 text-2xl font-bold">Envíanos un Mensaje</h2>
                <form className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input id="name" placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" type="email" placeholder="tu@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="+52 55 1234 5678" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventType">Tipo de Evento</Label>
                    <Input id="eventType" placeholder="Boda, XV años, Corporativo..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Fecha del Evento</Label>
                    <Input id="eventDate" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Número de Invitados</Label>
                    <Input id="guests" type="number" placeholder="150" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Cuéntanos más sobre tu evento y cómo podemos ayudarte..."
                    />
                  </div>

                  <Button className="w-full bg-[#415444] hover:bg-[#415444]/90 h-12">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-[#e0e5ce]">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-2xl font-bold text-[#415444]">Información de Contacto</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-white p-3">
                        <Phone className="h-6 w-6 text-[#415444]" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-[#415444]">Teléfono</h3>
                        <p className="text-gray-700">+52 55 1234 5678</p>
                        <p className="text-gray-700">+52 55 8765 4321</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-white p-3">
                        <Mail className="h-6 w-6 text-[#415444]" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-[#415444]">Correo Electrónico</h3>
                        <p className="text-gray-700">info@charlizzeeventos.com</p>
                        <p className="text-gray-700">ventas@charlizzeeventos.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-white p-3">
                        <MapPin className="h-6 w-6 text-[#415444]" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-[#415444]">Dirección</h3>
                        <p className="text-gray-700">Av. Reforma 123, Piso 5</p>
                        <p className="text-gray-700">Col. Juárez, CDMX 06600</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-white p-3">
                        <Clock className="h-6 w-6 text-[#415444]" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-[#415444]">Horario de Atención</h3>
                        <p className="text-gray-700">Lunes a Viernes: 9:00 - 19:00</p>
                        <p className="text-gray-700">Sábados: 10:00 - 15:00</p>
                        <p className="text-gray-700">Domingos: Cerrado</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="mb-4 text-2xl font-bold">¿Por qué elegirnos?</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#338838]">✓</span>
                      <span>Más de 10 años de experiencia en eventos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#338838]">✓</span>
                      <span>Red de proveedores verificados y confiables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#338838]">✓</span>
                      <span>Asesoría personalizada sin costo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#338838]">✓</span>
                      <span>Garantía de satisfacción en todos nuestros servicios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#338838]">✓</span>
                      <span>Atención 24/7 durante tu evento</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100 px-8 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-center text-3xl font-bold">Encuéntranos</h2>
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="h-96 bg-gray-200">
              <div className="flex h-full items-center justify-center text-gray-500">
                <MapPin className="mr-2 h-6 w-6" />
                <span>Mapa interactivo aquí</span>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
