import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Plane, Calendar, MapPin, User, CreditCard } from 'lucide-react'
import axios from 'axios'

interface Message {
  text: string;
  isBot: boolean;
}

interface Flight {
  id: string;
  callsign: string;
  origin_country: string;
  longitude: number;
  latitude: number;
  altitude: number;
  velocity: number;
  true_track: number;
  departureTime: string;
  arrivalTime: string;
  price: number;
  currency: string;
}

export default function FlightBot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your Flight Booking Assistant. How can I help you today?", isBot: true },
  ])
  const [input, setInput] = useState('')
  const [currentIntent, setCurrentIntent] = useState('')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [flights, setFlights] = useState<Flight[]>([])
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
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

  const processMessage = async (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    switch (currentIntent) {
      case 'origin':
        setOrigin(message.toUpperCase())
        addBotMessage("Great! Where would you like to fly to? (Please use the 3-letter airport code)")
        setCurrentIntent('destination')
        break
      case 'destination':
        setDestination(message.toUpperCase())
        addBotMessage("On which date would you like to travel? (Please use YYYY-MM-DD format)")
        setCurrentIntent('date')
        break
      case 'date':
        if (/^\d{4}-\d{2}-\d{2}$/.test(message)) {
          setDate(message)
          addBotMessage(`Thank you! I'll search for flights from ${origin} to ${destination} on ${message}.`)
          await searchFlights(origin, destination, message)
        } else {
          addBotMessage("Please enter a valid date in YYYY-MM-DD format.")
        }
        break
      case 'selectFlight':
        const flightIndex = parseInt(message) - 1
        if (flightIndex >= 0 && flightIndex < flights.length) {
          setSelectedFlight(flights[flightIndex])
          addBotMessage(`You've selected flight ${flights[flightIndex].callsign}. The total price is ₹${flights[flightIndex].price.toLocaleString('en-IN')}. Would you like to confirm this booking? (yes/no)`)
          setCurrentIntent('confirmation')
        } else {
          addBotMessage("Please select a valid flight number from the list.")
        }
        break
      case 'confirmation':
        if (lowerMessage === 'yes') {
          addBotMessage("Great! Your flight has been booked. Here's your confirmation:")
          addBotMessage(`Flight: ${selectedFlight?.callsign}`)
          addBotMessage(`Origin Country: ${selectedFlight?.origin_country}`)
          addBotMessage(`Departure: ${new Date(selectedFlight?.departureTime || '').toLocaleString()}`)
          addBotMessage(`Arrival: ${new Date(selectedFlight?.arrivalTime || '').toLocaleString()}`)
          addBotMessage(`Price: ₹${selectedFlight?.price.toLocaleString('en-IN')}`)
          addBotMessage("Thank you for booking with us!")
          setCurrentIntent('')
        } else if (lowerMessage === 'no') {
          addBotMessage("No problem. Would you like to search for different flights?")
          setCurrentIntent('')
        } else {
          addBotMessage("Please reply with 'yes' to confirm or 'no' to cancel.")
        }
        break
      default:
        if (lowerMessage === 'book a flight') {
          addBotMessage("Where would you like to fly from? (Please use the 3-letter airport code)")
          setCurrentIntent('origin')
        } else {
          addBotMessage("I'm here to help you book a flight. Type 'book a flight' to get started.")
        }
    }
  }

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, { text, isBot: true }])
  }

  const searchFlights = async (origin: string, destination: string, date: string) => {
    try {
      const response = await axios.get('http://localhost:3000/api/flights', {
        params: { origin, destination, date }
      })
      setFlights(response.data)
      displayFlightOptions(response.data)
    } catch (error) {
      console.error('Error fetching flights:', error)
      addBotMessage("I'm sorry, I couldn't fetch flight information at the moment. Please try again later.")
    }
  }

  const displayFlightOptions = (flights: Flight[]) => {
    addBotMessage("Here are the available flights:")
    flights.forEach((flight, index) => {
      addBotMessage(`${index + 1}. ${flight.callsign} - Departure: ${new Date(flight.departureTime).toLocaleString()}, Arrival: ${new Date(flight.arrivalTime).toLocaleString()}, Price: ₹${flight.price.toLocaleString('en-IN')}`)
    })
    addBotMessage("Please select a flight by typing its number.")
    setCurrentIntent('selectFlight')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-blue-600 p-6 flex items-center">
            <Plane className="w-8 h-8 text-white mr-3" />
            <h2 className="text-2xl font-bold text-white">Flight Booking Assistant</h2>
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
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    }`}
                  >
                    {message.text}
                  </div>
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
                className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                aria-label="Type your message"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
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