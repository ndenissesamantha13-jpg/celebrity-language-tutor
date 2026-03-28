'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Sparkles } from 'lucide-react';
import { languages } from '@/lib/language-data';
import { useLanguageLearningStore } from '@/store/language-store';
import type { Language } from '@/lib/language-data';

export function LanguageSelection() {
  const setSelectedLanguage = useLanguageLearningStore((state) => state.setSelectedLanguage);

  const handleSelectLanguage = (language: Language) => {
    setSelectedLanguage(language);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-6xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white mb-4"
        >
          <Globe className="w-8 h-8" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Language
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Select a language to start your learning journey with famous personalities from around the world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {languages.map((language, index) => (
          <motion.div
            key={language.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group border-2 border-transparent hover:border-amber-400/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              onClick={() => handleSelectLanguage(language)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{language.flag}</span>
                    <div>
                      <CardTitle className="text-xl group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {language.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {language.nativeName}
                      </CardDescription>
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {language.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline"
                    className={`
                      ${language.difficulty === 'Beginner' ? 'border-green-500 text-green-600 dark:text-green-400' : ''}
                      ${language.difficulty === 'Intermediate' ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400' : ''}
                      ${language.difficulty === 'Advanced' ? 'border-red-500 text-red-600 dark:text-red-400' : ''}
                    `}
                  >
                    {language.difficulty}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {language.celebrities.length} celebrities
                  </span>
                </div>
                <div className="pt-2 border-t dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    💡 {language.funFact}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
