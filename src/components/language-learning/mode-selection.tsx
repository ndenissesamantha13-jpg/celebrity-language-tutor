'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mic, Video, Sparkles } from 'lucide-react';
import { interactionModes } from '@/lib/language-data';
import { useLanguageLearningStore } from '@/store/language-store';

const modeIcons = {
  text: MessageCircle,
  voice: Mic,
  video: Video
};

export function ModeSelection() {
  const setInteractionMode = useLanguageLearningStore((state) => state.setInteractionMode);

  const handleSelectMode = (mode: 'text' | 'voice' | 'video') => {
    setInteractionMode(mode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white mb-4"
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          How Would You Like to Learn?
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Choose your preferred interaction style. Each mode offers a unique learning experience with celebrity-inspired AI tutors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {interactionModes.map((mode, index) => {
          const IconComponent = modeIcons[mode.id as keyof typeof modeIcons];
          return (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group border-2 border-transparent hover:border-violet-400/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full"
                onClick={() => handleSelectMode(mode.id as 'text' | 'voice' | 'video')}
              >
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-3">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110 ${
                      mode.id === 'text' ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50' :
                      mode.id === 'voice' ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50' :
                      'bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/50 dark:to-rose-800/50'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${
                        mode.id === 'text' ? 'text-blue-600 dark:text-blue-400' :
                        mode.id === 'voice' ? 'text-emerald-600 dark:text-emerald-400' :
                        'text-rose-600 dark:text-rose-400'
                      }`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {mode.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {mode.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {mode.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 You can switch modes anytime during your session
        </p>
      </motion.div>
    </motion.div>
  );
}
