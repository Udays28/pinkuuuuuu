import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Car, MapPin, User, CreditCard } from 'lucide-react'

interface Message {
  text: string;
  isBot: boolean;
}

interface CabOption {
  value: string;
  text: string;
}

const cabOptions: CabOption[] = [
  { value: 'Mahindra Thar Roxx', text: 'Mahindra Thar Roxx (₹1500/day)' },
  { value: 'XUV 700', text: 'XUV 700 (₹1550/day)' },
  { value: 'Scorpio N', text: 'Scorpio N (₹1300/day)' },
  { value: 'Grand Vitara', text: 'Grand Vitara (₹1250/day)' },
  { value: 'Hyundai Creta', text: 'Hyundai Creta (₹1200/day)' },
  { value: 'Kia Seltos', text: 'Kia Seltos (₹1200/day)' },
  { value: 'Honda Amaze', text: 'Honda Amaze (₹1200/day)' },
  { value: 'Hyundai Verna', text: 'Hyundai Verna (₹1250/day)' },
  { value: 'Honda City', text: 'Honda City (₹1200/day)' },
  { value: 'Toyota Etios', text: 'Toyota Etios (₹1100/day)' },
  { value: 'Maruti Swift Dezire', text: 'Maruti Swift Dezire (₹1000/day)' },
  { value: 'Tata Tiago', text: 'Tata Tiago (₹700/day)' },
  { value: 'Maruti Suzuki Baleno', text: 'Maruti Suzuki Baleno (₹800/day)' },
  { value: 'Wagon R', text: 'Wagon R (₹800/day)' },
  { value: 'Tata Altroz', text: 'Tata Altroz (₹750/day)' },
  { value: 'Toyota Glanza', text: 'Toyota Glanza (₹750/day)' },
  { value: 'Celerio', text: 'Celerio (₹800/day)' },
  { value: 'Alto', text: 'Alto (₹700/day)' }
]

export default function CabBot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your Cab Booking Assistant. How can I help you today?", isBot: true },
  ])
  const [input, setInput] = useState('')
  const [currentIntent, setCurrentIntent] = useState('')
  const [selectedCab, setSelectedCab] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [bookingAmount, setBookingAmount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() === '') return

    setMessages(prev => [...prev, { text: input, isBot: false }])
    processMessage(input)
    setInput('')
  }

  const processMessage = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    switch (currentIntent) {
      case 'destination':
        addBotMessage("Where would you like to board?")
        setCurrentIntent('boardingPoint')
        break
      case 'boardingPoint':
        addBotMessage("Which date would you like to go?")
        setCurrentIntent('goingdate')
        break
      case 'goingdate':
        if (/^\d{2}-\d{2}-\d{4}$/.test(message)) {
          setTravelDate(message)
          addBotMessage(`Thank you! Your travel date is ${message}.`)
          addBotMessage("Please choose a cab option:")
          setCurrentIntent('selectCab')
        } else {
          addBotMessage("Please enter a valid date (DD-MM-YYYY).")
        }
        break
      case 'confirmation':
        if (lowerMessage === 'yes') {
          addBotMessage("Your booking is confirmed!")
          addBotMessage(`You have booked a ${selectedCab} for ₹${bookingAmount} per day on ${travelDate}.`)
          addBotMessage("Please make the payment using the QR code below.")
          setCurrentIntent('')
        } else if (lowerMessage === 'no') {
          addBotMessage("Booking canceled. You can start again.")
          setCurrentIntent('')
        } else {
          addBotMessage("Please reply with 'yes' to confirm or 'no' to cancel.")
        }
        break
      default:
        if (lowerMessage === 'book a cab') {
          addBotMessage("Where would you like to go?")
          setCurrentIntent('destination')
        } else {
          addBotMessage("I'm here to help! Type 'book a cab' to get started.")
        }
    }
  }

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, { text, isBot: true }])
  }

  const handleCabSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCab = e.target.value
    setSelectedCab(selectedCab)
    const price = getCabPrice(selectedCab)
    setBookingAmount(price)
    addBotMessage(`You have selected the ${selectedCab} option.`)
    addBotMessage(`Your travel date is ${travelDate}.`)
    addBotMessage(`The price for ${selectedCab} is ₹${price} per day.`)
    addBotMessage("Do you want to confirm this booking? (yes/no)")
    setCurrentIntent('confirmation')
  }

  const getCabPrice = (cabType: string): number => {
    const prices: { [key: string]: number } = {
      'Mahindra Thar Roxx': 1500,
      'XUV 700': 1550,
      'Scorpio N': 1300,
      'Grand Vitara': 1250,
      'Hyundai Creta': 1200,
      'Kia Seltos': 1200,
      'Honda Amaze': 1200,
      'Hyundai Verna': 1250,
      'Honda City': 1200,
      'Toyota Etios': 1100,
      'Maruti Swift Dezire': 1000,
      'Tata Tiago': 700,
      'Maruti Suzuki Baleno': 800,
      'Wagon R': 800,
      'Tata Altroz': 750,
      'Toyota Glanza': 750,
      'Celerio': 800,
      'Alto': 700
    }
    return prices[cabType] || 0
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-green-600 p-6 flex items-center">
            <Car className="w-8 h-8 text-white mr-3" />
            <h2 className="text-2xl font-bold text-white">Cab Booking Assistant</h2>
          </div>
          <div className="h-[calc(100vh-300px)] overflow-y-auto p-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`mb-4 ${message.isBot ? 'text-left' : 'text-right'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}
                  >
                    {message.text}
                  </div>
                  {currentIntent === 'selectCab' && message.isBot && message.text.includes("Please choose a cab option:") && (
                    <select
                      onChange={handleCabSelection}
                      className="mt-2 p-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a cab</option>
                      {cabOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.text}</option>
                      ))}
                    </select>
                  )}
                  {currentIntent === '' && message.text.includes("Please make the payment using the QR code below.") && (
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?data=https://paymentgateway.com/pay&size=150x150"
                      alt="QR Code for Payment"
                      className="mt-2"
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-white"
                aria-label="Type your message"
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-3 rounded-r-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}