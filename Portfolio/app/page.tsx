"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Code2,
  Zap,
  Eye,
  Globe,
  Rocket,
  Cpu,
  Database,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null)

  const texts = [
    "FULL STACK DEVELOPER",
    "LARAVEL",
    "REACT",
    "NEXT.JS",
    "WEB SOLUTIONS",
  ]

  useEffect(() => {
    setMounted(true)
    setIsLoaded(true)

    // Typing animation
    const typingInterval = setInterval(() => {
      const currentFullText = texts[textIndex]

      if (charIndex < currentFullText.length) {
        setCurrentText(currentFullText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else {
        setTimeout(() => {
          setCharIndex(0)
          setCurrentText("")
          setTextIndex((textIndex + 1) % texts.length)
        }, 2000)
      }
    }, 100)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Scroll tracking
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Particle system
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      pulse: number
    }> = []

    const colors = ["#00ffff", "#ff00ff", "#ffff00", "#00ff00", "#ff0080"]

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let animationFrame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      animationFrame++

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.02

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Pulsing effect
        const pulsedSize = particle.size + Math.sin(particle.pulse) * 0.3

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulsedSize, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 8
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.shadowBlur = 0

        // Connect nearby particles
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = 0.08 * (1 - distance / 100)
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        // Mouse interaction
        const mouseDistance = Math.sqrt((particle.x - mousePosition.x) ** 2 + (particle.y - mousePosition.y) ** 2)
        if (mouseDistance < 80) {
          const force = (80 - mouseDistance) / 80
          particle.vx += (particle.x - mousePosition.x) * force * 0.008
          particle.vy += (particle.y - mousePosition.y) * force * 0.008
        }
      })

      ctx.globalAlpha = 1
      requestAnimationFrame(animate)
    }

    animate()

    // Matrix rain effect
    const matrixCanvas = matrixCanvasRef.current
    if (!matrixCanvas) return

    const matrixCtx = matrixCanvas.getContext("2d")
    if (!matrixCtx) return

    const updateMatrixSize = () => {
      matrixCanvas.width = window.innerWidth
      matrixCanvas.height = window.innerHeight
    }

    updateMatrixSize()
    window.addEventListener("resize", updateMatrixSize)

    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>?/|\\~`"
    const fontSize = 12
    const columns = matrixCanvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const drawMatrix = () => {
      matrixCtx.fillStyle = "rgba(0, 0, 0, 0.03)"
      matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height)

      matrixCtx.fillStyle = "#00ff00"
      matrixCtx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const matrixInterval = setInterval(drawMatrix, 40)

    return () => {
      clearInterval(typingInterval)
      clearInterval(matrixInterval)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateCanvasSize)
      window.removeEventListener("resize", updateMatrixSize)
    }
  }, [charIndex, textIndex])

 const skills = [
  { name: "Laravel", level: 90, color: "from-red-400 to-orange-500", icon: "🔥" },
  { name: "Next.js", level: 80, color: "from-purple-400 to-pink-500", icon: "▲" },
  { name: "React", level:80, color: "from-cyan-400 to-blue-500", icon: "⚛️" },
  { name: "Hero UI", level: 80, color: "from-green-400 to-teal-500", icon: "🎨" },
  { name: "Axios", level: 85, color: "from-yellow-400 to-orange-500", icon: "📡" },
  { name: "CodeIgniter 4", level: 85, color: "from-purple-400 to-indigo-500", icon: "🚀" },
  { name: "PHP", level: 90, color: "from-blue-400 to-purple-500", icon: "🐘" },
  { name: "JavaScript", level: 70, color: "from-yellow-400 to-red-500", icon: "⚡" },
  { name: "MySQL", level: 85, color: "from-teal-400 to-blue-500", icon: "💾" }
];


  const projects = [
    {
      title: "ABIC Manpower Solutions",
      description:
        "Comprehensive manpower management system with employee tracking, payroll integration, and client portal functionality.",
      technologies: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript"],
      status: "LIVE",
      color: "from-cyan-500 to-blue-600",
      icon: Globe,
      url: "https://abicmanpower.com",
      metrics: { type: "Business", category: "HR Management", status: "Production" },
    },
    {
      title: "Filinvest Corporate Platform",
      description:
        "Modern corporate website with property listings, investment portfolios, and client management dashboard.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Hero UI", "Axios"],
      status: "LIVE",
      color: "from-purple-500 to-pink-600",
      icon: Cpu,
      url: "https://filinvest-main-frontend.vercel.app/",
      metrics: { type: "Corporate", category: "Real Estate", status: "Production" },
    },
    {
      title: "Le Luxe Clinic",
      description:
        "Premium medical clinic website with appointment booking, service catalog, and patient portal integration.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "API Integration"],
      status: "LIVE",
      color: "from-green-500 to-teal-600",
      icon: Database,
      url: "https://leluxeclinic.vercel.app/",
      metrics: { type: "Healthcare", category: "Medical", status: "Production" },
    },
    {
      title: "Megaworld Corporation",
      description:
        "Enterprise-level real estate platform with property management, user dashboards, and booking systems.",
      technologies: ["Next.js", "React", "Hero UI", "Axios", "Authentication"],
      status: "LIVE",
      color: "from-yellow-500 to-orange-600",
      icon: Code2,
      url: "https://megaworldcorp.vercel.app/user",
      metrics: { type: "Enterprise", category: "Real Estate", status: "Production" },
    },
    {
      title: "S5 Logistics Platform",
      description: "Advanced logistics management system with shipment tracking, inventory control, and client portal.",
      technologies: ["Next.js", "React", "Tailwind CSS", "API Integration", "Dashboard"],
      status: "LIVE",
      color: "from-indigo-500 to-purple-600",
      icon: Rocket,
      url: "https://s5logistic.vercel.app/",
      metrics: { type: "Logistics", category: "Supply Chain", status: "Production" },
    },
    {
      title: "Alveo Corporation",
      description:
        "Corporate real estate platform with property showcases, investment tracking, and client management.",
      technologies: ["Next.js", "React", "Modern UI", "Responsive Design", "Performance"],
      status: "LIVE",
      color: "from-teal-500 to-green-600",
      icon: Globe,
      url: "https://alveocorporation.vercel.app/",
      metrics: { type: "Corporate", category: "Real Estate", status: "Production" },
    },
  ]

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-cyan-400 font-mono">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Matrix Background */}
      <canvas ref={matrixCanvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.08 }} />

      {/* Particle Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" style={{ opacity: 0.4 }} />

      {/* Animated Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.03}px)`,
          opacity: 0.2,
        }}
      />

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full blur-xl animate-pulse"
            style={{
              background: `radial-gradient(circle, ${
                ["#00ffff", "#ff00ff", "#ffff00", "#00ff00"][i % 4]
              }30, transparent)`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
              transform: `translateY(${Math.sin(scrollY * 0.008 + i) * 15}px)`,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower - Hidden on mobile */}
      <div className="fixed pointer-events-none z-50 hidden md:block">
        <div
          className="w-6 h-6 border-2 border-cyan-400 rounded-full mix-blend-difference"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transition: "all 0.1s ease",
            boxShadow: "0 0 15px #00ffff, inset 0 0 15px #00ffff",
          }}
        />
        <div
          className="w-3 h-3 bg-cyan-400 rounded-full mix-blend-difference"
          style={{
            left: mousePosition.x - 6,
            top: mousePosition.y - 6,
            transition: "all 0.15s ease",
          }}
        />
      </div>

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-xl border-b border-cyan-500/30 z-40 shadow-lg shadow-cyan-500/10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 group-hover:text-white transition-all duration-300" />
                <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 bg-cyan-400/20 rounded-full animate-ping group-hover:animate-none" />
                <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 bg-cyan-400/10 rounded-full animate-pulse" />
              </div>
              <span
                className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% 200%",
                  animation: "gradient 3s ease infinite",
                }}
              >
                {"<JUSTIN.DEV />"}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {["About", "Skills", "Projects", "Contact"].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group text-cyan-300 hover:text-cyan-400 transition-all duration-300 font-mono text-sm lg:text-base"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{`${item.toLowerCase()}.exe`}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded" />
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-cyan-400 hover:text-white transition-colors duration-300 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-cyan-500/30">
              <div className="flex flex-col space-y-3 pt-4">
                {["About", "Skills", "Projects", "Contact"].map((item, index) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-cyan-300 hover:text-cyan-400 transition-all duration-300 font-mono text-lg py-2 px-4 rounded hover:bg-cyan-500/10"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {`${item.toLowerCase()}.exe`}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-16 sm:pt-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/15 via-purple-900/15 to-pink-900/15" />

        {/* Scanning Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              top: "30%",
              animation: "scan 4s linear infinite",
            }}
          />
          <div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            style={{
              top: "60%",
              animation: "scan 6s linear infinite reverse",
            }}
          />
        </div>

        <div className="container mx-auto text-center relative z-20">
          <div className="max-w-6xl mx-auto">
            {/* Loading Animation */}
            <div
              className={`mb-6 sm:mb-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="text-cyan-400 font-mono text-xs sm:text-sm mb-3 sm:mb-4">
                {">"} INITIALIZING WEB DEVELOPER INTERFACE...
              </div>
              <div className="w-48 sm:w-64 h-1 bg-black/50 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-2000"
                  style={{ width: isLoaded ? "100%" : "0%" }}
                />
              </div>
            </div>

            {/* Glitch Name */}
            <div className="mb-6 sm:mb-8">
              <h1
                className={`text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 transition-all duration-1000 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  background: "linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff)",
                  backgroundSize: "400% 400%",
                  animation: "gradient 3s ease infinite, glitch 5s infinite",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                }}
              >
                JUSTIN DE CASTRO
              </h1>
            </div>

            {/* Typing Animation */}
            <div className="relative mb-8 sm:mb-12">
              <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light mb-6 sm:mb-8 relative font-mono">
                <span className="text-cyan-400">{">"} </span>
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {currentText || "FULL STACK DEVELOPER"}
                </span>
                <span className="animate-pulse text-cyan-400">|</span>
              </div>
            </div>

            {/* Holographic Terminal */}
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
              <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20 relative">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border-b border-cyan-500/30">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse" />
                    <div
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                  <span className="text-cyan-400 text-xs sm:text-sm font-mono">web_developer_profile.exe</span>
                  <div className="text-cyan-400 text-xs font-mono hidden sm:block">
                    {mounted ? new Date().toLocaleTimeString() : "00:00:00"}
                  </div>
                </div>

                {/* Terminal Content */}
                <div className="p-4 sm:p-6 lg:p-8 font-mono text-left space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400">{"$"}</span>
                    <span className="text-green-400">whoami</span>
                  </div>
                  <div className="text-purple-400 ml-3 sm:ml-4">
                    {">"} Full Stack Web Developer specializing in modern web technologies
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400">{"$"}</span>
                    <span className="text-green-400">cat tech_stack.json</span>
                  </div>
                 <div className="text-yellow-400 ml-3 sm:ml-4">
  {"{"}
  <br />
  {"  "}"backend": "Laravel, CodeIgniter 4, PHP, MySQL",
  <br />
  {"  "}"frontend": "Next.js, React, Hero UI",
  <br />
  {"  "}"tools": "Axios, JavaScript, Tailwind CSS, Bootstrap",
  <br />
  {"  "}"focus": "Modern Web Applications"
  <br />
  {"}"}
</div>


                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400">{"$"}</span>
                    <span className="text-green-400">status --availability</span>
                  </div>
                  <div className="text-green-400 ml-3 sm:ml-4 flex flex-wrap items-center gap-1 sm:gap-2">
                    <span>{">"}</span>
                    <span className="animate-pulse">AVAILABLE FOR PROJECTS</span>
                    <span>•</span>
                    <span className="animate-bounce">READY TO BUILD AMAZING WEBSITES</span>
                  </div>
                </div>

                {/* Scanning Effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-6 sm:h-8 pointer-events-none"
                  style={{ animation: "terminalScan 3s linear infinite" }}
                />
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Button
                size="lg"
                className="relative group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 px-6 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl font-bold overflow-hidden transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link
                  href="#projects"
                  className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3"
                >
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>VIEW MY PROJECTS</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 animate-pulse" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl font-bold relative overflow-hidden group transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="#contact" className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>LET'S WORK TOGETHER</span>
                  <div className="absolute inset-0 bg-cyan-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              DEVELOPMENT EXPERTISE
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {[
                {
                  icon: Code2,
                  title: "FULL STACK MASTERY",
                  desc: "Expert in both frontend and backend development with Laravel, Next.js, and modern web technologies for complete web solutions.",
                  color: "from-cyan-500 to-blue-600",
                  stats: ["6+ Projects Live", "Modern Stack", "Full Cycle"],
                },
                {
                  icon: Zap,
                  title: "PERFORMANCE FOCUSED",
                  desc: "Building fast, responsive applications with optimized code, efficient APIs, and modern development practices.",
                  color: "from-purple-500 to-pink-600",
                  stats: ["Fast Loading", "Optimized", "Responsive"],
                },
                {
                  icon: Globe,
                  title: "PRODUCTION READY",
                  desc: "Delivering enterprise-level applications that are scalable, maintainable, and ready for real-world deployment.",
                  color: "from-green-500 to-teal-600",
                  stats: ["Enterprise Level", "Scalable", "Production"],
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-700 group relative overflow-hidden transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 0.3}s`,
                  }}
                >
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
                  />

                  {/* Scanning Line */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  <CardHeader className="relative z-10 pb-3 sm:pb-4">
                    <div className="mb-4 sm:mb-6 relative">
                      <item.icon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-cyan-400 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12" />
                      <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-cyan-400/20 rounded-full animate-ping group-hover:animate-none" />
                      <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-cyan-400/10 rounded-full animate-pulse" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 group-hover:text-white transition-colors duration-500 mb-3 sm:mb-4">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <p className="text-cyan-300/80 group-hover:text-white/90 transition-colors duration-500 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {item.desc}
                    </p>

                    <div className="space-y-2">
                      {item.stats.map((stat, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                          <span className="text-cyan-300 text-xs sm:text-sm font-mono">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              TECHNOLOGY STACK
            </h2>

            <div className="grid sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group relative"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-xl sm:text-2xl">{skill.icon}</span>
                      <span className="text-cyan-400 font-bold text-lg sm:text-xl">{skill.name}</span>
                    </div>
                    <span className="text-purple-400 font-mono text-base sm:text-lg">{skill.level}%</span>
                  </div>

                  <div className="relative h-3 sm:h-4 bg-black/50 rounded-full overflow-hidden border border-cyan-500/20 group-hover:border-cyan-400/50 transition-all duration-500">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse" />

                    {/* Progress bar */}
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1500 ease-out relative overflow-hidden`}
                      style={{
                        width: `${skill.level}%`,
                        boxShadow: `0 0 15px ${skill.color.includes("cyan") ? "#00ffff" : "#ff00ff"}40`,
                      }}
                    >
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                      {/* Pulsing dots */}
                      <div className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${10 + i * 20}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${1 + i * 0.5}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-8xl mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
              LIVE PROJECTS
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-700 group relative overflow-hidden transform hover:scale-105 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  {/* Holographic Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-15 transition-opacity duration-700`}
                  />

                  {/* Scanning Lines */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  <CardHeader className="relative z-10 pb-4 sm:pb-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <Badge
                        variant="outline"
                        className="bg-green-500/20 border-green-400 text-green-400 animate-pulse font-mono text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
                      >
                        {project.status}
                      </Badge>

                      <div className="flex gap-3 sm:gap-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-cyan-400 hover:text-white hover:bg-cyan-400/20 transition-all duration-300 transform hover:scale-110 w-8 h-8 sm:w-10 sm:h-10"
                          asChild
                        >
                          <Link href={project.url} target="_blank">
                            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      <project.icon className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 group-hover:text-white transition-all duration-500 transform group-hover:scale-110" />
                      <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-400 group-hover:text-white transition-colors duration-500">
                        {project.title}
                      </CardTitle>
                    </div>

                    <CardDescription className="text-cyan-300/80 group-hover:text-white/90 transition-colors duration-500 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {Object.entries(project.metrics).map(([key, value], i) => (
                        <div key={key} className="text-center">
                          <div className="text-cyan-400 font-mono text-sm sm:text-base lg:text-lg font-bold">
                            {value}
                          </div>
                          <div className="text-cyan-300/60 text-xs uppercase tracking-wider">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.technologies.map((tech, i) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono text-xs sm:text-sm hover:bg-cyan-500/20 transition-all duration-300 transform hover:scale-105"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5 animate-pulse" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-pink-400 to-cyan-500 bg-clip-text text-transparent">
              LET'S BUILD TOGETHER
            </h2>

            {/* Enhanced Terminal Interface */}
            <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20 mb-12 sm:mb-16 relative">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border-b border-cyan-500/30">
                <div className="flex space-x-2 sm:space-x-3">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse" />
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
                <span className="text-cyan-400 font-mono text-xs sm:text-sm">contact_developer.exe</span>
                <div className="text-cyan-400 text-xs sm:text-sm font-mono hidden sm:block">
                  AVAILABLE • READY • RESPONSIVE
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 sm:p-8 lg:p-10 font-mono text-left space-y-3 sm:space-y-4 text-xs sm:text-sm lg:text-base">
                <div className="text-cyan-400 mb-2 sm:mb-3">{"$ ./check_availability.sh"}</div>
                <div className="text-green-400 mb-2 sm:mb-3">{">"} Developer status: AVAILABLE FOR NEW PROJECTS</div>
                <div className="text-purple-400 mb-2 sm:mb-3">{">"} Specialization: Full Stack Web Development</div>
                <div className="text-yellow-400 mb-2 sm:mb-3">{">"} Response time: Within 24 hours</div>
                <div className="text-cyan-400 mb-2 sm:mb-3">{"$ cat services.txt"}</div>
                <div className="text-green-400 flex flex-wrap items-center gap-1 sm:gap-2">
  <span>{">"}</span>
  <span className="animate-pulse">CUSTOM WEB APPLICATIONS</span>
  <span>•</span>
  <span className="animate-bounce">MODERN UI/UX DESIGN</span>
  <span>•</span>
  <span className="animate-pulse">SEO OPTIMIZATION</span>
  <span>•</span>
  <span className="animate-bounce">CMS INTEGRATION</span>
</div>

              </div>

              {/* Scanning Effect */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-8 sm:h-12 pointer-events-none"
                style={{ animation: "terminalScan 4s linear infinite" }}
              />
            </div>

            {/* Enhanced Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center">
              {[
                {
                  href: "mailto:decastrojustin321@gmail.com",
                  icon: Mail,
                  text: "SEND_EMAIL",
                  color: "from-cyan-500 to-blue-600",
             
                },
                {
                  href: "https://www.linkedin.com/in/justin-de-castro-381483366?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                  icon: Linkedin,
                  text: "LINKEDIN_CONNECT",
                  color: "from-purple-500 to-pink-600",
           
                },
                
              ].map((contact, index) => (
                <div key={index} className="group">
                  <Button
                    size="lg"
                    className={`relative bg-gradient-to-r ${contact.color} hover:scale-110 text-white border-0 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl font-bold overflow-hidden transition-all duration-500 transform hover:rotate-2 w-full sm:w-auto`}
                    asChild
                  >
                    <Link href={contact.href} className="relative z-10 flex flex-col items-center gap-2">
                      <contact.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      <span className="text-sm sm:text-base lg:text-lg">{contact.text}</span>
                  

                      {/* Multiple animated overlays */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 animate-pulse" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-cyan-500/20 relative">
        <div className="container mx-auto text-center">
          <p className="text-cyan-400/60 font-mono text-sm sm:text-base lg:text-lg">
            {"© 2024 JUSTIN DE CASTRO • FULL STACK WEB DEVELOPER • BUILDING THE FUTURE ONE PROJECT AT A TIME"}
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glitch {
          0%, 100% { 
            text-shadow: 0.05em 0 0 #00ffff, -0.05em -0.025em 0 #ff00ff, 0.025em 0.05em 0 #ffff00;
            transform: translate(0);
          }
          2% { 
            text-shadow: 0.05em 0 0 #00ffff, -0.05em -0.025em 0 #ff00ff, 0.025em 0.05em 0 #ffff00;
            transform: translate(2px, 1px);
          }
          4% { 
            text-shadow: -0.05em -0.025em 0 #00ffff, 0.025em 0.025em 0 #ff00ff, -0.05em -0.05em 0 #ffff00;
            transform: translate(-1px, -1px);
          }
          6% { 
            text-shadow: 0.025em 0.05em 0 #00ffff, 0.05em 0 0 #ff00ff, 0 -0.05em 0 #ffff00;
            transform: translate(1px, 2px);
          }
          8% { 
            text-shadow: 0.05em 0 0 #00ffff, -0.05em -0.025em 0 #ff00ff, 0.025em 0.05em 0 #ffff00;
            transform: translate(0);
          }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes terminalScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
      `}</style>
    </div>
  )
}
