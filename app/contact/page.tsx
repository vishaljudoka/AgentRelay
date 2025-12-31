import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { MapPin, Mail, Clock, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Navigation />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/high-end-luxury-car-wheel-close-up-dark-automotive.jpg"
            alt="Contact"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-900" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">Get In Touch</h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto text-balance leading-relaxed">
            Do you have questions or would you like to make an appointment? We are here for you!
          </p>
        </div>
      </section>

      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                      <p className="text-zinc-300 leading-relaxed">
                        Mockstreet 10
                        <br />
                        1010MM Mocktown
                        <br />
                        Netherlands
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                      <a
                        href="mailto:beautifulrims@outlook.com"
                        className="text-zinc-300 hover:text-orange-600 transition-colors"
                      >
                        beautifulrims@outlook.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Opening Hours</h3>
                      <div className="text-zinc-300 space-y-1">
                        <p>Monday - Friday: 08:00 - 17:00</p>
                        <p>Saturday: By appointment</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Phone Contact</h3>
                      <p className="text-zinc-300 leading-relaxed">
                        Call or email us for questions or to make an appointment. We are happy to help you!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button asChild size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                <Link href="/offerte">Request Quote Directly</Link>
              </Button>
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="bg-zinc-800 border-zinc-700 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square lg:aspect-auto lg:h-[600px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2449.8!2d5.7!3d51.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c7a0e0e0e0e0e0%3A0x0!2sExpeditieweg%208F%2C%206673DV%20Andelst!5e0!3m2!1snl!2snl!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="BeautifulRims Location"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Directions</h2>
                <div className="text-zinc-300 leading-relaxed space-y-3">
                  <p>
                    BeautifulRims is easily accessible from the A15 and A50. Take the Andelst exit and follow the signs
                    towards the industrial area.
                  </p>
                  <p>
                    We are located at Expeditieweg 8F, a modern business location with ample parking for our customers.
                  </p>
                  <p className="font-semibold text-white">
                    Tip: Make an appointment in advance, so we can reserve enough time for you and you can be helped
                    immediately.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">BeautifulRims</h3>
              <p className="text-zinc-400 leading-relaxed">
                Your reliable partner for all wheel services. With years of experience and craftsmanship, we ensure your
                wheels look like new again.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Sitemap</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/diensten" className="text-zinc-400 hover:text-orange-600 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/projecten" className="text-zinc-400 hover:text-orange-600 transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/over-ons" className="text-zinc-400 hover:text-orange-600 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-zinc-400 hover:text-orange-600 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.marktplaats.nl/u/beautifulrims/47376108/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-orange-600 transition-colors"
                  >
                    Marketplace
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
              <div className="space-y-2 text-zinc-400">
                <p>
                  <span className="font-semibold text-white">Address:</span>
                  <br />
                  Mockstreet 10
                  <br />
                  1010MM Mocktown
                </p>
                <p>
                  <span className="font-semibold text-white">Email:</span>
                  <br />
                  <a href="mailto:beautifulrims@outlook.com" className="hover:text-orange-600 transition-colors">
                    beautifulrims@outlook.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500">
            <p>&copy; {new Date().getFullYear()} BeautifulRims. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
