"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Toaster, toast } from "sonner"

// 🔥 Animation variants
const staggerChildren = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.15 },
  },
}

export default function ContactSection() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setLoading(true)
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      setLoading(false)

      if (response.ok) {
        toast.success("✅ Message Sent! We’ll get back to you soon.")
        form.reset()
      } else {
        toast.error(data.message || "❌ Something went wrong.")
      }
    } catch (error) {
      setLoading(false)
      toast.error("⚠️ Network error. Please try again.")
    }
  }

  return (
    <>
      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
        className="px-4 py-12 lg:px-8"
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-green-950">
          Get in touch
        </h2>
        <div className="mx-auto max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Web3Forms hidden fields */}
            <input
              type="hidden"
              name="access_key"
              value="YOUR_ACCESS_KEY_HERE" // 🔑 Replace with your Web3Forms access key
            />
            <input type="hidden" name="subject" value="New Contact Form" />
            <input type="hidden" name="from_name" value="Portfolio Website" />
            <input type="hidden" name="replyto" value="email" />

            {/* Visible fields */}
            <Input
              name="name"
              placeholder="Your name"
              className="border-green-200"
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your email"
              className="border-green-200"
              required
            />
            <Textarea
              name="message"
              placeholder="Message"
              className="border-green-200"
              required
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-950 text-white hover:bg-green-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </motion.section>

      {/* 🔔 Toaster */}
      <Toaster position="top-right" richColors />
    </>
  )
}
