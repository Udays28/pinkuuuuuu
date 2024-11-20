import { motion } from 'framer-motion'

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export function TestimonialCard({ name, role, quote, image }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col items-center text-center"
    >
      <img src={image} alt={name} className="w-20 h-20 rounded-full mb-4 object-cover" />
      <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{quote}"</p>
      <h4 className="font-semibold text-gray-800 dark:text-white">{name}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
    </motion.div>
  )
}