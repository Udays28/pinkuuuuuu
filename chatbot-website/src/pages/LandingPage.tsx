import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plane, Car, MapPin, CreditCard, ChevronRight, Zap } from 'lucide-react'

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="text-blue-400">{icon}</div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-0 opacity-10"
        animate={{
          x: ['0%', '100%'],
          y: ['0%', '50%', '0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Plane className="w-32 h-32 text-blue-400" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-0 opacity-10"
        animate={{
          x: ['100%', '0%'],
          y: ['0%', '30%', '0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Car className="w-24 h-24 text-blue-400" />
      </motion.div>
    </div>
  )
}

const LandingPage: React.FC = () => {
  const features: FeatureProps[] = [
    {
      title: 'AI-Powered Assistance',
      description: 'Get personalized travel recommendations from our advanced AI.',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: 'Smart Flight Booking',
      description: 'Our AI-powered flight bot finds the best deals and books your tickets in minutes, saving you time and money.',
      icon: <Plane className="w-6 h-6" />,
    },
    {
      title: 'Instant Ride Hailing',
      description: 'Get a cab to your destination with just a few taps using our intelligent cab booking bot, available 24/7.',
      icon: <Car className="w-6 h-6" />,
    },
    {
      title: 'Personalized Travel Recommendations',
      description: 'Discover exciting destinations tailored to your preferences, powered by our advanced AI algorithms.',
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      title: 'Secure Global Payments',
      description: 'Book with confidence using our secure payment system, supporting multiple currencies and payment methods.',
      icon: <CreditCard className="w-6 h-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <section className="hero relative mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10 relative"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your AI Travel Assistant, <span className="text-blue-400">Anytime, Anywhere</span>
            </h1>
            <p className="text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
              Experience seamless travel planning with our intelligent chatbots, powered by cutting-edge AI technology
            </p>
            <Link
              to="/bots"
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center group"
            >
              Get Started
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <BackgroundAnimation />
        </section>

        <section className="features">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default LandingPage