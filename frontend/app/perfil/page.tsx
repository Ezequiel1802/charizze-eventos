"use client"

import { Camera, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function PerfilPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfd]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#415444] to-[#338838] px-8 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-4xl font-bold">Mi Perfil</h1>
          <p className="text-lg text-white/90">Administra tu información personal y preferencias</p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Profile Picture Card */}
            <Card className="border-0 shadow-md lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Usuario" />
                      <AvatarFallback className="bg-[#e0e5ce] text-[#415444] text-4xl font-semibold">MG</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-[#415444] hover:bg-[#415444]/90"
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  </div>
                  <h2 className="mb-1 text-2xl font-bold">María García</h2>
                  <p className="mb-4 text-gray-600">maria.garcia@email.com</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Cambiar Foto
                  </Button>
                </div>

                <div className="mt-6 space-y-3 border-t pt-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-[#415444]" />
                    <span>Miembro desde Enero 2024</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-[#415444]" />
                    <span>Ciudad de México</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Information Form */}
            <div className="space-y-6 lg:col-span-2">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" defaultValue="María" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" defaultValue="García" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input id="email" type="email" defaultValue="maria.garcia@email.com" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input id="phone" type="tel" defaultValue="+52 55 1234 5678" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input id="location" defaultValue="Ciudad de México" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Acerca de mí</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      placeholder="Cuéntanos un poco sobre ti..."
                      defaultValue="Organizadora de eventos con pasión por crear experiencias memorables."
                    />
                  </div>

                  <Button className="w-full bg-[#415444] hover:bg-[#415444]/90">Guardar Cambios</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Preferencias de Eventos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Tipo de Eventos Favoritos</Label>
                    <Input id="eventType" placeholder="Bodas, XV años, Corporativos..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Presupuesto Promedio</Label>
                    <Input id="budget" placeholder="$10,000 - $20,000" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guestCount">Número de Invitados Típico</Label>
                    <Input id="guestCount" type="number" placeholder="150" />
                  </div>

                  <Button className="w-full bg-[#415444] hover:bg-[#415444]/90">Guardar Preferencias</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Cambiar Contraseña</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <Input id="currentPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <Input id="newPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>

                  <Button className="w-full bg-[#415444] hover:bg-[#415444]/90">Actualizar Contraseña</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
