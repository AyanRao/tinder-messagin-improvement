"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample Data
const matchConversionData = [
  { month: "Jan", matches: 150, messages: 80 },
  { month: "Feb", matches: 180, messages: 95 },
  { month: "Mar", matches: 200, messages: 110 },
  { month: "Apr", matches: 170, messages: 90 },
  { month: "May", matches: 220, messages: 120 },
  { month: "Jun", matches: 250, messages: 140 },
]

const responseTimeData = [
  { day: "Mon", avgTime: 30 },
  { day: "Tue", avgTime: 25 },
  { day: "Wed", avgTime: 35 },
  { day: "Thu", avgTime: 28 },
  { day: "Fri", avgTime: 20 },
  { day: "Sat", avgTime: 40 },
  { day: "Sun", avgTime: 32 },
]

const conversationLengthData = [
  { length: "1-5", count: 120 },
  { length: "6-10", count: 90 },
  { length: "11-20", count: 60 },
  { length: "21+", count: 30 },
]

const successfulStartersData = [
  { starter: "Superpower", successRate: 75 },
  { starter: "Adventure", successRate: 60 },
  { starter: "Hiking", successRate: 80 },
  { starter: "Pineapple", successRate: 50 },
  { starter: "AI-Generated", successRate: 90 },
]

export function AnalyticsDashboard() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dating App Analytics</CardTitle>
          <CardDescription>Insights into user engagement and messaging effectiveness.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="conversion" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="conversion">Match Conversion</TabsTrigger>
              <TabsTrigger value="response-time">Response Time</TabsTrigger>
              <TabsTrigger value="conversation-length">Conversation Length</TabsTrigger>
              <TabsTrigger value="starters">Top Starters</TabsTrigger>
            </TabsList>
            <TabsContent value="conversion" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Match-to-Message Conversion Rates</CardTitle>
                  <CardDescription>Track how many matches turn into conversations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      matches: { label: "Matches", color: "hsl(var(--chart-1))" },
                      messages: { label: "Messages", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={matchConversionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="matches" stroke="var(--color-matches)" />
                        <Line type="monotone" dataKey="messages" stroke="var(--color-messages)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="response-time" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Average Response Time</CardTitle>
                  <CardDescription>See how quickly users respond to messages.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      avgTime: { label: "Average Time (min)", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={responseTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="avgTime" fill="var(--color-avgTime)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="conversation-length" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Conversation Length Metrics</CardTitle>
                  <CardDescription>Understand the typical duration of conversations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      count: { label: "Number of Conversations", color: "hsl(var(--chart-4))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={conversationLengthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="length" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="count" fill="var(--color-count)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="starters" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Most Successful Conversation Starters</CardTitle>
                  <CardDescription>Identify which openers lead to the best engagement.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      successRate: { label: "Success Rate (%)", color: "hsl(var(--chart-5))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={successfulStartersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="starter" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="successRate" fill="var(--color-successRate)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Additional Analytics</h3>
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Heatmaps</CardTitle>
                <CardDescription>Visualize user interaction patterns (placeholder).</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-muted flex items-center justify-center rounded-md text-muted-foreground">
                  Placeholder for heatmap visualization
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>A/B Testing Results Visualization</CardTitle>
                <CardDescription>Review the outcomes of A/B tests (placeholder).</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-muted flex items-center justify-center rounded-md text-muted-foreground">
                  Placeholder for A/B testing results
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
