'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target } from 'lucide-react';
import { learningScenarios } from '@/lib/language-data';
import { useLanguageLearningStore } from '@/store/language-store';

export function ScenarioSelection() {
  const selectedLanguage = useLanguageLearningStore((state) => state.selectedLanguage);
  const selectedCelebrity = useLanguageLearningStore((state) => state.selectedCelebrity);
  const proficiencyLevel = useLanguageLearningStore((state) => state.proficiencyLevel);
  const setSelectedScenario = useLanguageLearningStore((state) => state.setSelectedScenario);

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
      className="w-full max-w-3xl mx-auto px-4"
    >
      <Button
        variant="ghost"
        onClick={() => useLanguageLearningStore.setState({ currentStep: 'celebrity' })}
        className="mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Celebrity Selection
      </Button>

      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white mb-4"
        >
          <Target className="w-8 h-8" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Choose a Scenario
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Learning with <span className="font-semibold">{selectedCelebrity?.image} {selectedCelebrity?.name}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {selectedLanguage?.flag} {selectedLanguage?.name} • {levelEmoji[proficiencyLevel!]} {proficiencyLevel}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {learningScenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group border-2 border-transparent hover:border-cyan-400/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full"
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{scenario.icon}</span>
                  <div>
                    <CardTitle className="text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {scenario.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {scenario.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Preview of Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
      >
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          <span className="font-medium">Ready to start!</span> Select a scenario to begin your conversation with {selectedCelebrity?.name}
        </p>
      </motion.div>
    </motion.div>
  );
}
