"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion" // Import AnimatePresence for exit animations
import { Button } from "@/components/ui/button"
import { Heart, X, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation" // Import useRouter for navigation

export function MatchCard() {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0) // Renamed currentMatch to currentMatchIndex
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0) // State for photo carousel
  const router = useRouter() // Initialize useRouter

  const matches = [
    {
      id: 1,
      name: "Alice, 24",
      photos: ["/attractive-woman-profile-picture.jpg", "/diverse-woman-smiling.png", "/woman-hiking.png"],
      interests: ["Hiking", "Photography", "Coffee"],
      mutualInterests: ["Hiking", "Coffee"], // Added mutual interests
      wouldYouRather: {
        // Added Would You Rather mini-game
        question: "Would you rather explore a new city or relax on a beach?",
        option1: "Explore a new city",
        option2: "Relax on a beach",
      },
      conversationStarters: [
        // Added personalized conversation starters
        "What's your favorite hiking trail?",
        "Best coffee shop in town?",
        "Tell me about your photography!",
      ],
    },
    {
      id: 2,
      name: "Bob, 26",
      photos: ["/attractive-man-profile-picture.jpg", "/man-gaming.jpg", "/man-cooking.png"],
      interests: ["Gaming", "Cooking", "Movies"],
      mutualInterests: ["Gaming"],
      wouldYouRather: {
        question: "Would you rather have unlimited sushi or unlimited pizza?",
        option1: "Unlimited Sushi",
        option2: "Unlimited Pizza",
      },
      conversationStarters: [
        "What's your go-to comfort food to cook?",
        "Any movie recommendations?",
        "Favorite video game of all time?",
      ],
    },
    {
      id: 3,
      name: "Charlie, 23",
      photos: ["/attractive-person-profile-picture.jpg", "/person-reading.png", "/person-playing-guitar.jpg"],
      interests: ["Reading", "Art", "Music"],
      mutualInterests: ["Music", "Art"],
      wouldYouRather: {
        question: "Would you rather be able to fly or be invisible?",
        option1: "Fly",
        option2: "Be Invisible",
      },
      conversationStarters: [
        "What book are you currently reading?",
        "Any favorite artists?",
        "What kind of music do you listen to?",
      ],
    },
  ]

  const handleNextMatch = () => {
    setCurrentMatchIndex((prev) => (prev + 1) % matches.length)
    setCurrentPhotoIndex(0) // Reset photo index for new match
  }

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex(
      (prev) => (prev - 1 + matches[currentMatchIndex].photos.length) % matches[currentMatchIndex].photos.length,
    )
  }

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % matches[currentMatchIndex].photos.length)
  }

  const handleConversationStarterClick = (starter: string) => {
    console.log(`[v0] Conversation starter clicked: ${starter}`)
    router.push("/chat")
  }

  const match = matches[currentMatchIndex]

  return (
    <div className="relative w-full max-w-sm mx-auto bg-card rounded-xl shadow-lg overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        {" "}
        {/* AnimatePresence for card transitions */}
        <motion.div
          key={match.id}
          initial={{ opacity: 0, x: 300 }} // Added x for swipe animation
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }} // Added x for swipe animation
          transition={{ duration: 0.3 }}
          className="relative w-full h-[450px]"
        >
          <Image
            src={match.photos[currentPhotoIndex] || "/placeholder.svg"} // Use photos array
            alt={match.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {match.photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white"
                onClick={handlePrevPhoto}
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white"
                onClick={handleNextPhoto}
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h2 className="text-2xl font-bold">{match.name}</h2>
            {match.mutualInterests && match.mutualInterests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {match.mutualInterests.map((interest, index) => (
                  <span key={index} className="bg-primary px-3 py-1 rounded-full text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {match.interests.map((interest, index) => (
                <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="p-4 space-y-4">
        {match.wouldYouRather && (
          <div className="bg-muted p-3 rounded-lg text-center">
            <p className="text-sm font-medium text-muted-foreground">Would You Rather?</p>
            <p className="mt-1 text-lg font-semibold">{match.wouldYouRather.question}</p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" className="flex-1 bg-transparent">
                {match.wouldYouRather.option1}
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                {match.wouldYouRather.option2}
              </Button>
            </div>
          </div>
        )}

        {match.conversationStarters && match.conversationStarters.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Quick Conversation Starters:</p>
            <div className="grid grid-cols-1 gap-2">
              {match.conversationStarters.map((starter, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleConversationStarterClick(starter)} // Add onClick handler
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {starter}
                </Button>
              ))}
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => handleConversationStarterClick("Send a GIF")}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Send a GIF
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => handleConversationStarterClick("Ask a Question")}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Ask a Question
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => handleConversationStarterClick("Share an Interest")}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Share an Interest
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-around items-center pt-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full bg-destructive/20 hover:bg-destructive/30"
            onClick={handleNextMatch}
            aria-label="Pass"
          >
            <X className="h-8 w-8 text-destructive" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 rounded-full bg-blue-500/20 hover:bg-blue-500/30"
            onClick={handleNextMatch}
            aria-label="Super Like"
          >
            <Star className="h-10 w-10 text-blue-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full bg-primary/20 hover:bg-primary/30"
            onClick={handleNextMatch}
            aria-label="Like"
          >
            <Heart className="h-8 w-8 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  )
}
