"use client"

import { Calendar, MapPin, Users, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ReservasPage() {
  const upcomingBookings = [
    {
      id: "1",
      venueName: "Salón Jardín Imperial",
      date: "15 de Junio, 2025",
      time: "18:00 - 23:00",
      guests: 250,
      status: "confirmed",
      location: "Ciudad de México",
      total: 15000,
    },
    {
      id: "2",
      venueName: "Terraza Vista Hermosa",
      date: "22 de Julio, 2025",
      time: "19:00 - 00:00",
      guests: 180,
      status: "pending",
      location: "Guadalajara",
      total: 12000,
    },
  ]

  const pastBookings = [
    {
      id: "3",
      venueName: "Hacienda Los Olivos",
      date: "10 de Marzo, 2025",
      time: "17:00 - 22:00",
      guests: 300,
      status: "completed",
      location: "Monterrey",
      total: 20000,
    },
    {
      id: "4",
      venueName: "Salón Elegance",
      date: "5 de Febrero, 2025",
      time: "18:00 - 23:00",
      guests: 120,
      status: "completed",
      location: "Puebla",
      total: 10000,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Confirmada
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pendiente
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completada
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelada
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfdfd]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#415444] to-[#338838] px-8 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-4xl font-bold">Mis Reservas</h1>
          <p className="text-lg text-white/90">Administra tus eventos y reservaciones</p>
        </div>
      </section>

      {/* Bookings Content */}
      <section className="px-8 py-12">
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md grid-cols-2 bg-white">
              <TabsTrigger value="upcoming">Próximas</TabsTrigger>
              <TabsTrigger value="past">Pasadas</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="space-y-6">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="mb-2 text-2xl font-semibold">{booking.venueName}</h3>
                              {getStatusBadge(booking.status)}
                            </div>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-5 w-5 text-[#415444]" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-5 w-5 text-[#415444]" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-5 w-5 text-[#415444]" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Users className="h-5 w-5 text-[#415444]" />
                              <span>{booking.guests} invitados</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t pt-4">
                            <div>
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="text-2xl font-bold text-[#338838]">${booking.total.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 md:w-40">
                          <Button className="bg-[#415444] hover:bg-[#415444]/90">Ver Detalles</Button>
                          <Button variant="outline">Modificar</Button>
                          <Button variant="ghost" className="text-red-600 hover:text-red-700">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {upcomingBookings.length === 0 && (
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-12 text-center">
                      <Calendar className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <h3 className="mb-2 text-xl font-semibold">No tienes reservas próximas</h3>
                      <p className="mb-6 text-gray-600">Explora nuestros salones y servicios para tu próximo evento</p>
                      <Button className="bg-[#415444] hover:bg-[#415444]/90">Explorar Salones</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-6">
                {pastBookings.map((booking) => (
                  <Card key={booking.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="mb-2 text-2xl font-semibold">{booking.venueName}</h3>
                              {getStatusBadge(booking.status)}
                            </div>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-5 w-5 text-[#415444]" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-5 w-5 text-[#415444]" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-5 w-5 text-[#415444]" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Users className="h-5 w-5 text-[#415444]" />
                              <span>{booking.guests} invitados</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t pt-4">
                            <div>
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="text-2xl font-bold text-[#338838]">${booking.total.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 md:w-40">
                          <Button className="bg-[#415444] hover:bg-[#415444]/90">Ver Detalles</Button>
                          <Button variant="outline">Reservar de Nuevo</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
