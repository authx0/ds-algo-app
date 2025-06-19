'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Question } from '@/lib/quizData'
import { 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight,
  Lightbulb,
  Code2,
  FileText
} from 'lucide-react'

interface QuizQuestionProps {
  question: Question
  onAnswer: (isCorrect: boolean, points: number) => void
  questionNumber: number
  totalQuestions: number
  showSolution: boolean
  onNext: () => void
  onPrev: () => void
  isLast: boolean
  isFirst: boolean
}

export function QuizQuestion({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  showSolution,
  onNext,
  onPrev,
  isLast,
  isFirst
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [hasAnswered, setHasAnswered] = useState(false)

  const handleSubmit = () => {
    if (!selectedAnswer) return
    
    const isCorrect = selectedAnswer === question.correctAnswer
    const points = isCorrect ? getPointsForDifficulty(question.difficulty) : 0
    
    setHasAnswered(true)
    onAnswer(isCorrect, points)
  }

  const getPointsForDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 10
      case 'medium': return 15
      case 'hard': return 20
      default: return 10
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30'
      case 'hard': return 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30'
    }
  }

  const isCorrectAnswer = (option: string) => option === question.correctAnswer

  return (
    <Card className="glass border-gray-200 dark:border-gray-700">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className={`${getDifficultyColor(question.difficulty)} border`}>
              {question.difficulty}
            </Badge>
            <Badge className="glass border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent">
              {question.subtopic}
            </Badge>
          </div>
          <Badge className="glass border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent">
            {getPointsForDifficulty(question.difficulty)} points
          </Badge>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {question.question}
          </h3>
          {question.code && (
            <div className="mt-4 p-4 glass rounded border-gray-200 dark:border-gray-700 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-800 dark:text-gray-200">{question.code}</pre>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <RadioGroup 
          value={selectedAnswer} 
          onValueChange={setSelectedAnswer}
          disabled={hasAnswered}
          className="space-y-3"
        >
          {(question.options || []).map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index)
            const isCorrect = hasAnswered && isCorrectAnswer(option)
            const isWrong = hasAnswered && selectedAnswer === option && !isCorrect
            
            return (
              <div
                key={index}
                className={`relative rounded transition-all duration-200 ${
                  hasAnswered
                    ? isCorrect
                      ? 'bg-green-500/20 border-green-500/50'
                      : isWrong
                      ? 'bg-red-500/20 border-red-500/50'
                      : 'glass border-gray-200 dark:border-gray-700'
                    : 'glass border-gray-200 dark:border-gray-700 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <Label
                  htmlFor={`option-${index}`}
                  className={`flex items-center gap-4 p-5 cursor-pointer rounded ${
                    hasAnswered ? 'cursor-not-allowed' : ''
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    className="border-gray-400 dark:border-gray-600"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className={`font-semibold text-lg ${
                      hasAnswered
                        ? isCorrect
                          ? 'text-green-700 dark:text-green-300'
                          : isWrong
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {optionLetter}.
                    </span>
                    <span className={`text-base ${
                      hasAnswered
                        ? isCorrect
                          ? 'text-green-700 dark:text-green-300'
                          : isWrong
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {option}
                    </span>
                  </div>
                  {hasAnswered && (
                    <div className="ml-auto">
                      {isCorrect && <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />}
                      {isWrong && <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />}
                    </div>
                  )}
                </Label>
              </div>
            )
          })}
        </RadioGroup>

        {!hasAnswered && (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            size="lg"
            className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded text-lg font-semibold shadow-lg transition-all duration-200"
          >
            Submit Answer
          </Button>
        )}

        {showSolution && hasAnswered && (
          <div className="space-y-4">
            <div className="p-5 glass rounded border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">Explanation</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{question.explanation}</p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={onPrev}
                disabled={isFirst}
                variant="outline"
                size="lg"
                className="flex-1 glass border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded py-6 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>
              <Button
                onClick={onNext}
                size="lg"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded py-6 shadow-lg"
              >
                {isLast ? 'Finish Quiz' : 'Next Question'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 