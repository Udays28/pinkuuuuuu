import { motion } from 'framer-motion'
import { Users, Zap, Globe, Shield } from 'lucide-react'


const teamMembers = [
  {
    name: "Aarav Patel",
    role: "Frontend Developer",
    bio: "Passionate about creating intuitive user interfaces and seamless user experiences.",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    name: "Diya Sharma",
    role: "Backend Developer",
    bio: "Experienced in building robust and scalable server-side applications.",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    name: "Arjun Singh",
    role: "UI/UX Designer",
    bio: "Dedicated to crafting beautiful and functional designs that delight users.",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    name: "Ananya Gupta",
    role: "Project Manager",
    bio: "Skilled in coordinating team efforts and ensuring project success.",
    image: "/placeholder.svg?height=200&width=200"
  }
]

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white"
      >
        About TravelBot
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl mb-12 text-center text-gray-600 dark:text-gray-300"
      >
        We're revolutionizing travel planning with AI-powered chatbots
      </motion.p>
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300">
            At TravelBot, our mission is to simplify travel planning and booking through innovative AI technology. We aim to provide travelers with a seamless, personalized experience that saves time and reduces stress.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We envision a future where planning a trip is as easy as having a conversation with a friend. Our AI-powered chatbots are constantly learning and evolving to provide the best possible travel recommendations and booking services.
          </p>
        </motion.div>
      </div>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Why Choose TravelBot?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          { icon: <Users className="w-12 h-12 text-blue-500" />, title: "Personalized Experience", description: "Our AI learns your preferences to offer tailored travel suggestions." },
          { icon: <Zap className="w-12 h-12 text-yellow-500" />, title: "Lightning Fast", description: "Get instant responses and quick bookings, saving you time and effort." },
          { icon: <Globe className="w-12 h-12 text-green-500" />, title: "Global Coverage", description: "Access a wide range of travel options from around the world." },
          { icon: <Shield className="w-12 h-12 text-red-500" />, title: "Secure Bookings", description: "Your data and transactions are protected with state-of-the-art security." },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Meet Our Team</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
          >

            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{member.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{member.role}</p>
            <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}