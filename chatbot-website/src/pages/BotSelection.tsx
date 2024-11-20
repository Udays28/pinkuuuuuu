import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plane, Car } from 'lucide-react'

interface BotOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  bgColor: string;
  textColor: string;
}

function BotOption({ icon, title, description, link, bgColor, textColor }: BotOptionProps) {
  return (
    <motion.div
      className={`flex-1 flex items-center justify-center ${bgColor} ${textColor} transition-all duration-300`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={link} className="text-center p-12 w-full h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          {icon}
        </motion.div>
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-xl mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {description}
        </motion.p>
        <motion.button
          className={`px-6 py-3 rounded-full ${textColor} border-2 border-current hover:bg-opacity-10 hover:bg-current transition-all duration-300`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </Link>
    </motion.div>
  )
}

export default function BotSelection() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <BotOption
        icon={<Plane className="w-16 h-16" />}
        title="Flight Bot"
        description="Book your flights with ease"
        link="/flight-bot"
        bgColor="bg-blue-100 dark:bg-blue-900"
        textColor="text-blue-800 dark:text-blue-200"
      />
      <BotOption
        icon={<Car className="w-16 h-16" />}
        title="Cab Bot"
        description="Get a ride to your destination"
        link="/cab-bot"
        bgColor="bg-green-100 dark:bg-green-900"
        textColor="text-green-800 dark:text-green-200"
      />
    </div>
  )
}