"use client"

import { Users, MapPin, Check, Star, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HomePage() {
  const features = [
    {
      title: "Ubicación Privilegiada",
      description: "En el corazón de la ciudad con fácil acceso y amplio estacionamiento",
      icon: MapPin,
    },
    {
      title: "Capacidad Flexible",
      description: "Desde 50 hasta 400 invitados, adaptamos el espacio a tus necesidades",
      icon: Users,
    },
    {
      title: "Servicios Completos",
      description: "Catering, decoración, sonido y más. Todo en un solo lugar",
      icon: Check,
    },
    {
      title: "Experiencia Garantizada",
      description: "Más de 500 eventos exitosos nos respaldan",
      icon: Star,
    },
  ]

  const galleryImages = [
    { src: "/elegant-event-venue-garden.jpg", alt: "Salón principal" },
    { src: "/rooftop-terrace-event-venue.jpg", alt: "Terraza" },
    { src: "/hacienda-wedding-venue.jpg", alt: "Jardín" },
    { src: "/elegant-ballroom.png", alt: "Salón de baile" },
  ]

  const testimonials = [
    {
      name: "María González",
      event: "Boda",
      text: "El lugar perfecto para nuestra boda. El equipo fue increíble y todo salió perfecto.",
      rating: 5,
    },
    {
      name: "Carlos Ramírez",
      event: "Evento Corporativo",
      text: "Profesionalismo y atención al detalle. Nuestros clientes quedaron impresionados.",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      event: "XV Años",
      text: "Superaron todas nuestras expectativas. Mi hija tuvo la fiesta de sus sueños.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-black">
        <div className="absolute inset-0">
          <Image
            src="/elegant-event-venue-garden.jpg"
            alt="Salón Charlizze"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="mb-4 font-serif text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">Salón Charlizze</h1>
          <p className="mb-8 text-xl md:text-2xl text-gray-200">Tu evento perfecto comienza aquí</p>

          {/* Quick Booking Form */}
          <Card className="w-full max-w-4xl border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">
                    Fecha del Evento
                  </Label>
                  <Input id="date" type="date" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-type" className="text-sm font-medium">
                    Tipo de Evento
                  </Label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boda">Boda</SelectItem>
                      <SelectItem value="xv">XV Años</SelectItem>
                      <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
                      <SelectItem value="corporativo">Corporativo</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-sm font-medium">
                    N° de Invitados
                  </Label>
                  <Input id="guests" type="number" placeholder="100" className="h-12" />
                </div>
                <div className="flex items-end">
                  <Button asChild className="h-12 w-full bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold">
                    <Link href="/reservar">Consultar</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-gray-900">¿Por qué elegirnos?</h2>
            <p className="text-lg text-gray-600">Hacemos de tu evento una experiencia inolvidable</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 border-gray-100 transition-all hover:border-[#d4af37] hover:shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/10">
                    <feature.icon className="h-8 w-8 text-[#d4af37]" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-gray-900">Nuestro Salón</h2>
            <p className="text-lg text-gray-600">Espacios elegantes diseñados para tu evento perfecto</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative h-64 overflow-hidden rounded-lg">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-gray-900 hover:bg-gray-900 hover:text-white bg-transparent"
            >
              <Link href="/galeria">Ver Galería Completa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
            <p className="text-lg text-gray-600">Testimonios reales de eventos inolvidables</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-gray-50">
                <CardContent className="p-6">
                  <Quote className="mb-4 h-8 w-8 text-[#d4af37]" />
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-700 italic">{testimonial.text}</p>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.event}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold md:text-5xl">¿Listo para reservar tu fecha?</h2>
          <p className="mb-8 text-xl text-gray-300">Contáctanos hoy y asegura el lugar perfecto para tu evento</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-white text-lg h-14 px-8">
              <Link href="/reservar">Reservar Ahora</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black text-lg h-14 px-8 bg-transparent"
            >
              <Link href="/salon">Ver Paquetes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-face-new-QyRfqUuWTrNLEceTb5TWa3CwQzyZsM.png"
                alt="Charlizze Eventos"
                width={180}
                height={60}
                className="mb-4 h-12 w-auto"
              />
              <p className="text-gray-600">El lugar perfecto para tu evento especial</p>
            </div>
            <div>
              <h3 className="mb-4 font-bold text-gray-900">Contacto</h3>
              <div className="space-y-2 text-gray-600">
                <p>Av. Principal 123, CDMX</p>
                <p>Tel: (55) 1234-5678</p>
                <p>info@charlizze.com</p>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-bold text-gray-900">Horario</h3>
              <div className="space-y-2 text-gray-600">
                <p>Lunes - Viernes: 9:00 - 18:00</p>
                <p>Sábado: 10:00 - 14:00</p>
                <p>Domingo: Cerrado</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-gray-600">
            <p>&copy; 2025 Charlizze Eventos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
