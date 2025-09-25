"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ConversationStarter {
  id: number
  text: string
  category: "Funny" | "Deep" | "Interests" | "Random" | "AI-Generated"
  successRate: number // Percentage
  favorited: boolean
}

export function ConversationStarterDashboard() {
  const [starters, setStarters] = useState<ConversationStarter[]>([
    {
      id: 1,
      text: "If you could have any superpower, what would it be and why?",
      category: "Funny",
      successRate: 75,
      favorited: false,
    },
    {
      id: 2,
      text: "What's the most adventurous thing you've ever done?",
      category: "Deep",
      successRate: 60,
      favorited: true,
    },
    {
      id: 3,
      text: "I saw you like hiking! What's your favorite trail around here?",
      category: "Interests",
      successRate: 80,
      favorited: false,
    },
    {
      id: 4,
      text: "Pineapple on pizza: yay or nay?",
      category: "Random",
      successRate: 50,
      favorited: false,
    },
    {
      id: 5,
      text: "Based on your profile, you seem to love [shared interest]. What got you into that?",
      category: "AI-Generated",
      successRate: 90,
      favorited: true,
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredStarters = starters.filter((starter) => {
    const matchesSearch = starter.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || starter.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id: number) => {
    setStarters((prev) =>
      prev.map((starter) => (starter.id === id ? { ...starter, favorited: !starter.favorited } : starter)),
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conversation Starters</CardTitle>
          <CardDescription>Find and manage engaging openers for your matches.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search starters..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none pl-9"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Funny">Funny</option>
                <option value="Deep">Deep</option>
                <option value="Interests">Interests</option>
                <option value="Random">Random</option>
                <option value="AI-Generated">AI-Generated</option>
              </select>
            </div>
          </div>

          <Tabs defaultValue="AI-Generated" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="AI-Generated">AI</TabsTrigger>
              <TabsTrigger value="Funny">Funny</TabsTrigger>
              <TabsTrigger value="Deep">Deep</TabsTrigger>
              <TabsTrigger value="Interests">Interests</TabsTrigger>
              <TabsTrigger value="Random">Random</TabsTrigger>
            </TabsList>
            <TabsContent value="AI-Generated" className="mt-4">
              <h3 className="text-lg font-semibold mb-2">AI-Generated Personalized Openers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                These starters are tailored to your match&apos;s profile for higher success rates.
              </p>
              <div className="space-y-3">
                {filteredStarters
                  .filter((s) => s.category === "AI-Generated")
                  .map((starter) => (
                    <div key={starter.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <p className="text-sm">{starter.text}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{starter.successRate}% Success</Badge>
                        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(starter.id)}>
                          <Heart
                            className={`h-4 w-4 ${starter.favorited ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="Funny" className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Funny Conversation Starters</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Lighten the mood and get a laugh with these witty openers.
              </p>
              <div className="space-y-3">
                {filteredStarters
                  .filter((s) => s.category === "Funny")
                  .map((starter) => (
                    <div key={starter.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <p className="text-sm">{starter.text}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{starter.successRate}% Success</Badge>
                        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(starter.id)}>
                          <Heart
                            className={`h-4 w-4 ${starter.favorited ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="Deep" className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Deep Conversation Starters</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Spark meaningful connections with thought-provoking questions.
              </p>
              <div className="space-y-3">
                {filteredStarters
                  .filter((s) => s.category === "Deep")
                  .map((starter) => (
                    <div key={starter.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <p className="text-sm">{starter.text}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{starter.successRate}% Success</Badge>
                        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(starter.id)}>
                          <Heart
                            className={`h-4 w-4 ${starter.favorited ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="Interests" className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Interests-Based Conversation Starters</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect over shared hobbies and passions with these tailored openers.
              </p>
              <div className="space-y-3">
                {filteredStarters
                  .filter((s) => s.category === "Interests")
                  .map((starter) => (
                    <div key={starter.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <p className="text-sm">{starter.text}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{starter.successRate}% Success</Badge>
                        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(starter.id)}>
                          <Heart
                            className={`h-4 w-4 ${starter.favorited ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="Random" className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Random Conversation Starters</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Break the ice with a completely unexpected and fun question.
              </p>
              <div className="space-y-3">
                {filteredStarters
                  .filter((s) => s.category === "Random")
                  .map((starter) => (
                    <div key={starter.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <p className="text-sm">{starter.text}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{starter.successRate}% Success</Badge>
                        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(starter.id)}>
                          <Heart
                            className={`h-4 w-4 ${starter.favorited ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
