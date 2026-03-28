'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Quote, Users } from 'lucide-react';
import { useLanguageLearningStore } from '@/store/language-store';
import type { Celebrity } from '@/lib/language-data';

export function CelebritySelection() {
  const selectedLanguage = useLanguageLearningStore((state) => state.selectedLanguage);
  const proficiencyLevel = useLanguageLearningStore((state) => state.proficiencyLevel);
  const setSelectedCelebrity = useLanguageLearningStore((state) => state.setSelectedCelebrity);

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    setSelectedCelebrity(celebrity);
  };

  const levelEmoji = {
    beginner: '🌱',
    intermediate: '🌿',
    advanced: '🌳'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-5xl mx-auto px-4"
    >
      <Button
        variant="ghost"
        onClick={() => useLanguageLearningStore.setState({ currentStep: 'proficiency' })}
        className="mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Level Selection
      </Button>

      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white mb-4"
        >
          <Users className="w-8 h-8" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Teacher
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Learning {selectedLanguage?.flag} {selectedLanguage?.name} at {levelEmoji[proficiencyLevel!]} {proficiencyLevel} level
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {selectedLanguage?.celebrities.map((celebrity, index) => (
          <motion.div
            key={celebrity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group border-2 border-transparent hover:border-purple-400/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full"
              onClick={() => handleSelectCelebrity(celebrity)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center text-3xl">
                    {celebrity.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {celebrity.name}
                    </CardTitle>
                    {celebrity.nameInLanguage && (
                      <CardDescription className="text-xs">
                        {celebrity.nameInLanguage}
                      </CardDescription>
                    )}
                    <Badge variant="secondary" className="mt-1">
                      {celebrity.profession}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {celebrity.description}
                </p>
                <div className="pt-2 border-t dark:border-gray-700">
                  <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Quote className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p className="italic line-clamp-2">
                      &ldquo;{celebrity.famousQuote}&rdquo;
                    </p>
                  </div>
                </div>
                <div className="pt-2 text-xs text-gray-400 dark:text-gray-500">
                  <span className="font-medium">Personality:</span> {celebrity.personality.split('.')[0]}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
