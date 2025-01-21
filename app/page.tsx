"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dumbbell, SpaceIcon as Yoga, Waves, Menu, X, Star, Heart, Trophy, Target } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeInVariants, staggerChildren } from "@/utils/animations"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const scrollToSection = useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false) // Close the mobile menu
    setTimeout(() => {
      scrollToSection(href.slice(1))
    }, 300) // Delay scrolling to allow sheet to close
  }

  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f4]">
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-green-950 shadow-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <span
              className={`text-xl font-semibold transition-colors duration-300 ${isScrolled ? "text-white" : "text-green-950"}`}
            >
              Fitnoss™
            </span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-green-400 ${isScrolled ? "text-white" : "text-green-950"}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href.slice(1))
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className={`hidden md:inline-flex transition-colors duration-300 ${
                isScrolled ? "bg-white text-green-950 hover:bg-green-100" : "bg-green-950 text-white hover:bg-green-900"
              } transform hover:scale-105 hover:shadow-lg`}
            >
              Sign In
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`md:hidden transition-colors duration-300 ${
                    isScrolled
                      ? "bg-white text-green-950 hover:bg-green-100"
                      : "bg-green-950 text-white hover:bg-green-900"
                  }`}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-green-950 hover:text-green-700 transition-colors duration-300"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button className="mt-4 bg-green-950 text-white hover:bg-green-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Sign In
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {/* Add padding-top to account for fixed header */}
        {/* Hero Section */}
        <motion.section
          id="hero"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="px-4 py-12 lg:px-8 lg:py-20"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div variants={fadeInVariants} className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter text-green-950 sm:text-5xl xl:text-6xl/none">
                Transform Your <span className="italic">Body and Mind</span>
              </h1>
              <p className="max-w-[600px] text-gray-600">
                Join our community of wellness enthusiasts and embark on a journey to better health and fitness.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="bg-green-950 text-white hover:bg-green-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Join Member
                </Button>
                <Button
                  variant="outline"
                  className="border-green-950 text-green-950 hover:bg-green-50 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Start for Free
                </Button>
              </div>
            </motion.div>
            <motion.div variants={fadeInVariants} className="relative w-full aspect-[4/3] lg:aspect-square">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1med.jpg-duLFRoruyfGzdWWTsAyVr7SodiS5wj.jpeg"
                alt="Woman in green athletic wear meditating in a serene indoor garden setting"
                fill
                className="rounded-2xl object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </motion.section>
        {/* Stats Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="bg-green-950 px-4 py-12 text-white lg:px-8"
        >
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-4xl font-bold">3.2k</p>
              <p className="text-sm text-gray-300">World champions</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">1.8k</p>
              <p className="text-sm text-gray-300">Runner-up champions</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">4.5M</p>
              <p className="text-sm text-gray-300">Regular participants</p>
            </div>
          </div>
        </motion.section>
        {/* Services Section */}
        <motion.section
          id="services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="px-4 py-12 lg:px-8 lg:py-20"
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-green-950">Our Services</h2>
            <p className="mt-4 text-gray-600">Comprehensive wellness solutions tailored to your needs</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <motion.div
              variants={fadeInVariants}
              className="rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white hover:bg-green-50"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Yoga className="h-6 w-6 text-green-950" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-green-950">Yoga Classes</h3>
              <p className="text-sm text-gray-600">
                Expert-led sessions combining physical postures, breathing techniques, and meditation
              </p>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              className="rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white hover:bg-green-50"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Dumbbell className="h-6 w-6 text-green-950" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-green-950">Fitness Training</h3>
              <p className="text-sm text-gray-600">
                Personalized workout programs designed to help you achieve your fitness goals
              </p>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              className="rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white hover:bg-green-50"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Waves className="h-6 w-6 text-green-950" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-green-950">Wellness Laps</h3>
              <p className="text-sm text-gray-600">
                Holistic wellness sessions focusing on mental and physical balance
              </p>
            </motion.div>
          </div>
        </motion.section>
        {/* Team Section */}
        <motion.section
          id="team"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="bg-green-50 px-4 py-12 lg:px-8 lg:py-20"
        >
          <h2 className="mb-12 text-3xl font-bold text-green-950 text-center">Meet Our Team</h2>
          <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
  variants={fadeInVariants}
  className="flex flex-col justify-center items-center rounded-2xl bg-green-950 p-8 text-white text-center h-full"
>
  <h3 className="mb-4 text-2xl font-semibold">Personalized Coaching</h3>
  <p className="mb-6">
    Our expert trainers offer tailored fitness plans designed to meet your specific goals and needs. With one-on-one
    guidance, we help you stay motivated and on track throughout your fitness journey. Whether you're looking to lose
    weight, build strength, or improve overall wellness, we are here to support you every step of the way. Achieve
    lasting results with personalized coaching that adapts to your progress.
  </p>
  <Button className="bg-green-950 text-white hover:bg-green-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
    Learn More
  </Button>
</motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div variants={fadeInVariants} className="relative aspect-[3/4] overflow-hidden rounded-xl group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2med.jpg-yx6hxgERsNiAWMqryCjlqUguS5jZCt.jpeg"
                  alt="Yoga instructor sitting comfortably with a yoga mat"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
              <motion.div variants={fadeInVariants} className="relative aspect-[3/4] overflow-hidden rounded-xl group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yoga%20Instructor%20Lifestyle%20Branding%20Session%20-%20Sandra%20Herrero%20Photography.jpg-QGHsvSlqlJN46oXR3rpMm0jsp1TZ3v.jpeg"
                  alt="Yoga instructor holding a yoga mat with a welcoming smile"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
        {/* Reviews Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="px-4 py-12 lg:px-8"
        >
          <h2 className="mb-8 text-center text-2xl font-bold text-green-950">Over 200+ reviews from our clients</h2>
          <div className="grid gap-4 sm:grid-cols-5">
            {[
              {
                name: "Jane Smith",
                role: "Fitness Enthusiast",
                text: "Amazing experience with the trainers. Highly recommended!",
                icon: Star,
              },
              {
                name: "John Doe",
                role: "Weight Loss Champion",
                text: "Lost 30 pounds in 3 months. The support here is unmatched!",
                icon: Dumbbell,
              },
              {
                name: "Emily Johnson",
                role: "Yoga Practitioner",
                text: "The yoga classes have transformed my flexibility and peace of mind.",
                icon: Heart,
              },
              {
                name: "Michael Brown",
                role: "Bodybuilding Competitor",
                text: "Excellent equipment and knowledgeable staff. Perfect for serious lifters.",
                icon: Trophy,
              },
              {
                name: "Sarah Lee",
                role: "Busy Professional",
                text: "The 24/7 access fits perfectly with my hectic schedule. Love it!",
                icon: Target,
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                variants={fadeInVariants}
                className="rounded-xl bg-green-50 p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-100"
              >
                <div className="mb-4 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center">
                    <review.icon className="h-6 w-6 text-green-950" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-950">{review.name}</p>
                    <p className="text-xs text-gray-600">{review.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* App Promo Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="bg-green-50 px-4 py-12 lg:px-8 lg:py-20"
        >
          <div className="flex justify-center items-center">
            <motion.div variants={fadeInVariants} className="max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-green-950">
                Clearmind, your <span className="italic">partner in mental wellness</span>
              </h2>
              <p className="mb-6 text-gray-600">
                Download our app to access personalized workout plans and track your progress
              </p>
              <div className="flex justify-center items-center space-x-4">
              <Button
              variant="outline"
             className="border-green-950 text-green-950 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
             >
             App Store
             </Button>
             <Button
             variant="outline"
             className="border-green-950 text-green-950 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
             >
             Play Store
            </Button>
             </div>

            </motion.div>
          </div>
        </motion.section>
        {/* Pricing Section */}
        <motion.section
          id="pricing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="px-4 py-12 lg:px-8 lg:py-20"
        >
          <h2 className="mb-12 text-center text-3xl font-bold text-green-950">Community social classes</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <motion.div
              variants={fadeInVariants}
              className="text-center rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white hover:bg-green-50"
            >
              <h3 className="mb-2 text-xl font-semibold text-green-950">Starter Plan</h3>
              <p className="mb-4 text-4xl font-bold text-green-950 ">$14</p>
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                <li>Access to basic classes</li>
                <li>Community support</li>
                <li>Basic workout plans</li>
              </ul>
              <Button className="w-full bg-green-950 text-white hover:bg-green-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started
              </Button>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              className="text-center rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white hover:bg-green-50"
            >
              <h3 className="mb-2 text-xl font-semibold text-green-950">Basic Plan</h3>
              <p className="mb-4 text-4xl font-bold text-green-950 ">$29</p>
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                <li>All Starter features</li>
                <li>Personal trainer</li>
                <li>Custom workout plans</li>
              </ul>
              <Button className="w-full bg-green-950 text-white hover:bg-green-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started
              </Button>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              className="text-center rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white hover:bg-green-50"
            >
              <h3 className="mb-2 text-xl font-semibold text-green-950">Premium Plan</h3>
              <p className="mb-4 text-4xl font-bold text-green-950 ">$139</p>
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                <li>All Basic features</li>
                <li>Priority support</li>
                <li>Exclusive workshops</li>
              </ul>
              <Button className="w-full bg-green-950 text-white hover:bg-green-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.section>
        {/* Contact Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="px-4 py-12 lg:px-8"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-green-950">Get in touch</h2>
          <div className="mx-auto max-w-md">
            <form className="space-y-4">
              <Input placeholder="Your name" className="border-green-200" />
              <Input type="email" placeholder="Your email" className="border-green-200" />
              <Textarea placeholder="Message" className="border-green-200" />
              <Button className="w-full bg-green-950 text-white hover:bg-green-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Send Message
              </Button>
            </form>
          </div>
        </motion.section>
        {/* FAQ Section */}
        <motion.section
          id="faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="bg-green-950 px-4 py-12 text-white lg:px-8 lg:py-20"
        >
          <h2 className="mb-8 text-center text-3xl font-bold">Frequently asked questions</h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What kind of equipment do you have?</AccordionTrigger>
                <AccordionContent>
                  We have state-of-the-art equipment for all your fitness needs, including cardio machines, free
                  weights, and specialized training equipment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I book a personal training session?</AccordionTrigger>
                <AccordionContent>
                  You can book a personal training session through our app or by contacting our front desk directly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What are your operating hours?</AccordionTrigger>
                <AccordionContent>
                  We are open 24/7 for our members. Staffed hours are from 6am to 10pm daily.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-green-950 px-4 py-12 text-white lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Fitnoss™</h3>
            <p className="text-sm text-gray-300">
              Transform your body and mind with our comprehensive fitness programs
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Features
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-green-900 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-green-950 text-white hover:bg-green-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-green-900 pt-8 text-center text-sm text-gray-300">
          © 2024 Fitnoss™. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

