'use client'

import { useState, useEffect } from 'react'
import { DSAQuiz } from '@/components/DSAQuiz'
import { AppLayout } from '@/components/AppLayout'

interface QuizStats {
  totalPoints: number
  correctAnswers: number
  streak: number
  level: number
  experience: number
}

export default function Home() {
  const [stats, setStats] = useState<QuizStats>({
    totalPoints: 0,
    correctAnswers: 0,
    streak: 0,
    level: 1,
    experience: 0
  })

  useEffect(() => {
    // Load saved stats from localStorage
    const savedStats = localStorage.getItem('dsaQuizStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  return (
    <AppLayout 
      activePage="quiz" 
      userStats={{
        level: stats.level,
        experience: stats.experience,
        streak: stats.streak,
        totalPoints: stats.totalPoints
      }}
    >
      <DSAQuiz onStatsUpdate={setStats} />
    </AppLayout>
  )
}
