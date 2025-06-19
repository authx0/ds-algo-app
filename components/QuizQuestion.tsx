'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Check, X, Code, Brain, ChevronLeft, ChevronRight } from 'lucide-react'
import { Question } from '@/lib/quizData'

interface QuizQuestionProps {
  question: Question
  onAnswer: (isCorrect: boolean, points: number) => void
  questionNumber: number
  totalQuestions: number
  showSolution?: boolean
  onNext?: () => void
  onPrev?: () => void
  isLast?: boolean
  isFirst?: boolean
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
  const [matchingAnswers, setMatchingAnswers] = useState<Record<string, string>>({})
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    setSelectedAnswer('')
    setMatchingAnswers({})
    setIsCorrect(false)
  }, [question])

  const handleSubmit = () => {
    let correct = false

    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
      case 'code-completion':
        correct = selectedAnswer === question.correctAnswer
        break
      case 'matching':
        const userAnswers = question.matchingPairs?.map(pair => `${pair.left}:${matchingAnswers[pair.left]}`) || []
        correct = JSON.stringify(userAnswers.sort()) === JSON.stringify((question.correctAnswer as string[]).sort())
        break
    }

    setIsCorrect(correct)
    onAnswer(correct, correct ? question.points : 0)
  }

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <div key={index}>
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex items-center space-x-3 p-4 rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <span className="text-base">{option}</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )

      case 'true-false':
        return (
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="flex gap-6 justify-center">
              <div>
                <Label
                  htmlFor="true"
                  className="flex flex-col items-center p-8 rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors min-w-[120px]"
                >
                  <RadioGroupItem value="true" id="true" className="mb-3" />
                  <span className="text-xl font-semibold">True</span>
                </Label>
              </div>
              <div>
                <Label
                  htmlFor="false"
                  className="flex flex-col items-center p-8 rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors min-w-[120px]"
                >
                  <RadioGroupItem value="false" id="false" className="mb-3" />
                  <span className="text-xl font-semibold">False</span>
                </Label>
              </div>
            </div>
          </RadioGroup>
        )

      case 'code-completion':
        return (
          <div className="space-y-4">
            <pre className="p-4 bg-muted text-muted-foreground rounded-lg overflow-x-auto text-sm">
              <code>{question.code}</code>
            </pre>
            <input
              type="text"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="w-full p-4 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-base"
            />
          </div>
        )

      case 'matching':
        return (
          <div className="space-y-4">
            {question.matchingPairs?.map((pair, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1 p-4 bg-muted rounded-lg font-medium text-base">
                  {pair.left}
                </div>
                <select
                  value={matchingAnswers[pair.left] || ''}
                  onChange={(e) => setMatchingAnswers({ ...matchingAnswers, [pair.left]: e.target.value })}
                  className="flex-1 p-4 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-base"
                >
                  <option value="">Select a match...</option>
                  {question.matchingPairs?.map((p, i) => (
                    <option key={i} value={p.right}>{p.right}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-gray-400 text-white'
      case 'medium': return 'bg-gray-600 text-white'
      case 'hard': return 'bg-black text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const isAnswerComplete = () => {
    if (question.type === 'matching') {
      return question.matchingPairs?.every(pair => matchingAnswers[pair.left]) || false
    }
    return selectedAnswer !== ''
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full">
      {/* Left: Question & Answer */}
      <div className="flex-1 bg-card text-card-foreground rounded-xl shadow-sm p-8 border">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge className={getDifficultyColor(question.difficulty)}>
            {question.difficulty.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="border-border">
            {question.topic === 'data-structure' ? 'Data Structure' : 'Algorithm'}
          </Badge>
          <Badge variant="outline" className="border-border">{question.subtopic}</Badge>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {questionNumber} of {totalQuestions}
            </span>
            <Badge variant="secondary">{question.points} pts</Badge>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold leading-relaxed flex items-start gap-3">
            {question.type === 'code-completion' && <Code className="w-6 h-6 mt-1 flex-shrink-0" />}
            {question.question}
          </h2>
        </div>

        <div className="mb-8">
          {renderQuestion()}
        </div>

        {!showSolution && (
          <Button
            onClick={handleSubmit}
            disabled={!isAnswerComplete()}
            className="w-full py-3 text-base"
            size="lg"
          >
            Submit Answer
          </Button>
        )}
      </div>

      {/* Right: Solution/Explanation */}
      <div className="flex-1 bg-card text-card-foreground rounded-xl shadow-sm p-8 border min-h-[400px] flex flex-col">
        {showSolution ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              {isCorrect ? (
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
              )}
              <span className="text-2xl font-semibold">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>

            <div className="mb-6 flex-1">
              <h3 className="text-lg font-semibold mb-3">Explanation</h3>
              <div className="text-base leading-relaxed text-muted-foreground mb-4">
                {question.explanation}
              </div>
              {!isCorrect && (
                <div className="p-4 bg-muted rounded-lg border">
                  <span className="text-sm font-medium text-muted-foreground">Correct answer: </span>
                  <span className="text-base font-semibold">
                    {Array.isArray(question.correctAnswer)
                      ? question.correctAnswer.join(', ')
                      : question.correctAnswer}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-auto">
              <Button 
                onClick={onPrev} 
                variant="outline" 
                disabled={isFirst} 
                className="flex-1 py-3"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button 
                onClick={onNext} 
                className="flex-1 py-3" 
                disabled={isLast}
              >
                {isLast ? 'Finish Quiz' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Brain className="w-16 h-16 mb-4" />
            <span className="text-lg text-center">Submit your answer to see the solution and explanation</span>
          </div>
        )}
      </div>
    </div>
  )
} 