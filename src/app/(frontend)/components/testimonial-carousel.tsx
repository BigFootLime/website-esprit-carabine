'use client'

import { useState, useEffect } from 'react'
import TestimonialCard from './testimonial-card'

const cards = [
  {
    id: 1,
    description: "I love the product! It's the best thing since sliced bread!",
    author: 'Jane Doe',
    stars: 5,
  },
  {
    id: 2,
    description: "I love the product! It's the best thing since sliced bread!",
    author: 'Jane Doe',
    stars: 5,
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Testimonial card container with animation */}
      <div
        className="transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="flex">
          {cards.map((card) => (
            <div key={card.id} className="w-full flex-shrink-0">
              <TestimonialCard {...card} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-200 ${
              currentIndex === index ? 'bg-accent-principle' : 'bg-accent-secondary'
            }`}
            style={{
              width: currentIndex === index ? '20px' : '10px',
            }}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Previous/Next buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
        aria-label="Previous testimonial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
        aria-label="Next testimonial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
