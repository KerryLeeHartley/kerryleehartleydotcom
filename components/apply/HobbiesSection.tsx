'use client'

import Image from 'next/image'

// Track hobby interactions
const trackHobbyClick = (hobby: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'hobby_click', {
      event_category: 'Engagement',
      event_label: hobby,
    })
  }
}

interface HobbyCardProps {
  title: string
  image: string
  description: string
}

function HobbyCard({ title, image, description }: HobbyCardProps) {
  return (
    <div 
      onClick={() => trackHobbyClick(title)}
      className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-white/10 cursor-pointer"
    >
      <div className="relative h-80">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function HobbiesSection() {
  const hobbies = [
    {
      title: "Saltwater Fishing",
      image: "/images/fishinghobby.png",
      description: "Finding peace and strategy on the open water"
    },
    {
      title: "Golfing",
      image: "/images/golfinghobby.png",
      description: "Precision, patience, and the pursuit of excellence"
    },
    {
      title: "Running",
      image: "/images/runninghobby.png",
      description: "Building endurance, one mile at a time"
    }
  ]

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Beyond the Boardroom
          </h2>
          <p className="text-gray-400 text-lg">
            Balance, discipline, and intentional living
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <HobbyCard key={index} {...hobby} />
          ))}
        </div>
      </div>
    </section>
  )
}
