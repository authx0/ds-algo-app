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
    const savedStats = localStorage.getItem('dsaQuizStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dsaQuizStats', JSON.stringify(stats))
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
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to DS&A Master
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Test your knowledge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalPoints}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
          </CardContent>
        </Card>
        <Card className="glass border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.streak}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
          </CardContent>
        </Card>
        <Card className="glass border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">Level {stats.level}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stats.experience % 100}/100 XP</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Level {stats.level}</span>
              <span>Level {stats.level + 1}</span>
            </div>
            <Progress value={(stats.experience % 100)} max={100} className="h-3 bg-gray-200 dark:bg-gray-700" />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {100 - (stats.experience % 100)} XP to next level
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button 
          onClick={() => startQuiz()} 
          size="lg" 
          className="w-full py-6 text-lg font-semibold glass border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-white/30 dark:hover:bg-black/30 hover:from-purple-600 hover:to-pink-600 text-gray-900 dark:text-white transition-all duration-200 rounded-full shadow-lg"
        >
          <Zap className="w-6 h-6 mr-3" />
          Start Quick Quiz
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => startQuiz()} variant="outline" className="w-full py-5 glass border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 rounded">
            <Brain className="w-5 h-5 mr-2 text-purple-500" />
            Easy Mode
          </Button>
          <Button onClick={() => startQuiz()} variant="outline" className="w-full py-5 glass border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 rounded">
            <Target className="w-5 h-5 mr-2 text-orange-500" />
            Medium Mode
          </Button>
          <Button onClick={() => startQuiz()} variant="outline" className="w-full py-5 glass border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 rounded">
            <Trophy className="w-5 h-5 mr-2 text-red-500" />
            Hard Mode
          </Button>
        </div>
      </div>
    </div>
  )

  const renderQuiz = () => (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="glass rounded p-6 border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setMode('menu')}
              className="flex items-center gap-2 glass border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded"
            >
              <Home className="w-4 h-4" />
              Back to Menu
            </Button>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="text-base px-4 py-2 glass border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent">
              <Trophy className="w-4 h-4 mr-1" />
              {sessionPoints} pts
            </Badge>
            {stats.streak > 0 && (
              <Badge className="text-base px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-700 dark:text-orange-300 border border-orange-300/30">
                <Flame className="w-4 h-4 mr-1" />
                {stats.streak} streak
              </Badge>
            )}
          </div>
        </div>
        <Progress 
          value={(currentQuestionIndex + 1) / questions.length * 100} 
          className="h-2 bg-gray-200 dark:bg-gray-700"
        />
      </div>

      {/* Quiz Content */}
      <QuizQuestion
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
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
        <Card className="glass border-gray-200 dark:border-gray-700">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  {percentage >= 70 ? (
                    <Trophy className="w-16 h-16 text-white" />
                  ) : (
                    <Target className="w-16 h-16 text-white" />
                  )}
                </div>
              </div>

              <h2 className="text-6xl font-bold mb-2 text-gray-900 dark:text-white">{percentage}%</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {sessionCorrect} out of {questions.length} correct
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 glass rounded">
                <span className="font-medium text-gray-700 dark:text-gray-300">Base Points</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">{sessionPoints}</span>
              </div>
              {streakBonus > 0 && (
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded border border-orange-300/30">
                  <span className="font-medium flex items-center text-orange-700 dark:text-orange-300">
                    <Flame className="w-4 h-4 mr-2" />
                    Streak Bonus
                  </span>
                  <span className="text-xl font-bold text-orange-700 dark:text-orange-300">+{streakBonus}</span>
                </div>
              )}
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded">
                <span className="font-medium">Total Points</span>
                <span className="text-2xl font-bold">{totalSessionPoints}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button 
                onClick={() => startQuiz()} 
                size="lg"
                className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded shadow-lg"
              >
                <ChevronRight className="w-5 h-5 mr-2" />
                Take Another Quiz
              </Button>
              <Button 
                onClick={() => setMode('menu')} 
                variant="outline"
                size="lg"
                className="w-full py-6 glass border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
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