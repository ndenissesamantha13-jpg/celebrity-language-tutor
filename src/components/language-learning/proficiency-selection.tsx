'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { proficiencyLevels } from '@/lib/language-data';
import { useLanguageLearningStore } from '@/store/language-store';

export function ProficiencySelection() {
  const selectedLanguage = useLanguageLearningStore((state) => state.selectedLanguage);
  const setProficiencyLevel = useLanguageLearningStore((state) => state.setProficiencyLevel);
  const setSelectedLanguage = useLanguageLearningStore((state) => state.setSelectedLanguage);

  const handleBack = () => {
    setSelectedLanguage(selectedLanguage!);
    // Reset to language selection
    useLanguageLearningStore.setState({ currentStep: 'language' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <Button
        variant="ghost"
        onClick={() => useLanguageLearningStore.setState({ currentStep: 'language' })}
        className="mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Languages
      </Button>

      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white mb-4"
        >
          <BookOpen className="w-8 h-8" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          What&apos;s Your Level?
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Learning <span className="font-semibold">{selectedLanguage?.flag} {selectedLanguage?.name}</span> with celebrity teachers
        </p>
      </div>

      <div className="space-y-4">
        {proficiencyLevels.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group border-2 border-transparent hover:border-emerald-400/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              onClick={() => setProficiencyLevel(level.id as 'beginner' | 'intermediate' | 'advanced')}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{level.icon}</span>
                  <div>
                    <CardTitle className="text-xl group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {level.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {level.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
