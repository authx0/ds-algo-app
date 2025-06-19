'use client'

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { QuizQuestion } from './QuizQuestion'
import { getRandomQuestions, Question } from '@/lib/quizData'
import { 
  Trophy, 
  Flame, 
  Target, 
  Brain, 
  ChevronRight, 
  Home,
  BarChart3,
  Award,
  Zap
} from 'lucide-react'

type QuizMode = 'menu' | 'quiz' | 'results'

interface QuizStats {
  totalPoints: number
  correctAnswers: number
  streak: number
  level: number
  experience: number
}

interface DSAQuizProps {
  onStatsUpdate?: (stats: QuizStats) => void
}

export function DSAQuiz({ onStatsUpdate }: DSAQuizProps) {
  const [mode, setMode] = useState<QuizMode>('menu')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [stats, setStats] = useState<QuizStats>({
    totalPoints: 0,
    correctAnswers: 0,
    streak: 0,
    level: 1,
    experience: 0
  })
  const [sessionPoints, setSessionPoints] = useState(0)
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    // Load saved stats from localStorage
    const savedStats = localStorage.getItem('dsaQuizStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  useEffect(() => {
    // Save stats to localStorage
    localStorage.setItem('dsaQuizStats', JSON.stringify(stats))
    // Notify parent component of stats update
    onStatsUpdate?.(stats)
  }, [stats, onStatsUpdate])

  const startQuiz = () => {
    const questionCount = 10
    const newQuestions = getRandomQuestions(questionCount)
    setQuestions(newQuestions)
    setCurrentQuestionIndex(0)
    setSessionPoints(0)
    setSessionCorrect(0)
    setShowSolution(false)
    setMode('quiz')
  }

  const handleAnswer = (isCorrect: boolean, points: number) => {
    if (isCorrect) {
      setSessionCorrect(prev => prev + 1)
      setSessionPoints(prev => prev + points)
      setStats(prev => ({ ...prev, streak: prev.streak + 1 }))
    } else {
      setStats(prev => ({ ...prev, streak: 0 }))
    }
    setShowSolution(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setShowSolution(false)
    } else {
      finishQuiz()
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setShowSolution(false)
    }
  }

  const finishQuiz = () => {
    const experienceGained = sessionPoints
    const newExperience = stats.experience + experienceGained
    const newLevel = Math.floor(newExperience / 100) + 1
    const leveledUp = newLevel > stats.level

    setStats(prev => ({
      totalPoints: prev.totalPoints + sessionPoints,
      correctAnswers: prev.correctAnswers + sessionCorrect,
      streak: prev.streak,
      level: newLevel,
      experience: newExperience
    }))

    if (sessionCorrect >= 7 || leveledUp) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }

    setMode('results')
  }

  const getStreakBonus = () => {
    if (stats.streak >= 7) return 50
    if (stats.streak >= 3) return 20
    return 0
  }

  const renderMenu = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to DS&A Master
        </h1>
        <p className="text-xl text-muted-foreground">Test your knowledge of Data Structures & Algorithms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-3xl font-bold">{stats.totalPoints}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Flame className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-3xl font-bold">{stats.streak}</p>
            <p className="text-sm text-muted-foreground">Current Streak</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Award className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-3xl font-bold">Level {stats.level}</p>
            <p className="text-sm text-muted-foreground">{stats.experience % 100}/100 XP</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Level {stats.level}</span>
              <span>Level {stats.level + 1}</span>
            </div>
            <Progress value={(stats.experience % 100)} max={100} className="h-3" />
            <p className="text-sm text-muted-foreground text-center">
              {100 - (stats.experience % 100)} XP to next level
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Button 
          onClick={() => startQuiz()} 
          size="lg" 
          className="w-full py-6 text-lg"
        >
          <Zap className="w-5 h-5 mr-2" />
          Start Quick Quiz
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => startQuiz()} variant="outline" className="w-full py-4">
            <Brain className="w-4 h-4 mr-2" />
            Easy Mode
          </Button>
          <Button onClick={() => startQuiz()} variant="outline" className="w-full py-4">
            <Target className="w-4 h-4 mr-2" />
            Medium Mode
          </Button>
          <Button onClick={() => startQuiz()} variant="outline" className="w-full py-4">
            <Trophy className="w-4 h-4 mr-2" />
            Hard Mode
          </Button>
        </div>
      </div>
    </div>
  )

  const renderQuiz = () => (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="bg-card text-card-foreground rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setMode('menu')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Menu
            </Button>
            <span className="text-xl font-bold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-base px-3 py-1">
              <Trophy className="w-4 h-4 mr-1" />
              {sessionPoints} pts
            </Badge>
            {stats.streak > 0 && (
              <Badge variant="destructive" className="text-base px-3 py-1">
                <Flame className="w-4 h-4 mr-1" />
                {stats.streak} streak
              </Badge>
            )}
          </div>
        </div>
        <Progress 
          value={(currentQuestionIndex + 1) / questions.length * 100} 
          className="h-2"
        />
      </div>

      {/* Quiz Content */}
      <QuizQuestion
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        showSolution={showSolution}
        onNext={handleNext}
        onPrev={handlePrev}
        isLast={currentQuestionIndex === questions.length - 1}
        isFirst={currentQuestionIndex === 0}
      />
    </div>
  )

  const renderResults = () => {
    const percentage = Math.round((sessionCorrect / questions.length) * 100)
    const streakBonus = getStreakBonus()
    const totalSessionPoints = sessionPoints + streakBonus

    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="mb-6">
                {percentage >= 70 ? (
                  <Trophy className="w-24 h-24 mx-auto text-muted-foreground" />
                ) : (
                  <Target className="w-24 h-24 mx-auto text-muted-foreground" />
                )}
              </div>

              <h2 className="text-5xl font-bold mb-2">{percentage}%</h2>
              <p className="text-xl text-muted-foreground">
                {sessionCorrect} out of {questions.length} correct
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="font-medium">Base Points</span>
                <span className="text-xl font-bold">{sessionPoints}</span>
              </div>
              {streakBonus > 0 && (
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="font-medium flex items-center">
                    <Flame className="w-4 h-4 mr-2 text-muted-foreground" />
                    Streak Bonus
                  </span>
                  <span className="text-xl font-bold">+{streakBonus}</span>
                </div>
              )}
              <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground rounded-lg">
                <span className="font-medium">Total Points</span>
                <span className="text-2xl font-bold">{totalSessionPoints}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button 
                onClick={() => startQuiz()} 
                size="lg"
                className="w-full"
              >
                <ChevronRight className="w-4 h-4 mr-2" />
                Take Another Quiz
              </Button>
              <Button 
                onClick={() => setMode('menu')} 
                variant="outline"
                size="lg"
                className="w-full"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full">
      {mode === 'menu' && renderMenu()}
      {mode === 'quiz' && renderQuiz()}
      {mode === 'results' && renderResults()}
      {showConfetti && <Confetti />}
    </div>
  )
} 