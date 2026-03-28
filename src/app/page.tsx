'use client';

import { AnimatePresence } from 'framer-motion';
import { useLanguageLearningStore } from '@/store/language-store';
import { ModeSelection } from '@/components/language-learning/mode-selection';
import { LanguageSelection } from '@/components/language-learning/language-selection';
import { ProficiencySelection } from '@/components/language-learning/proficiency-selection';
import { CelebritySelection } from '@/components/language-learning/celebrity-selection';
import { ScenarioSelection } from '@/components/language-learning/scenario-selection';
import { ChatInterface } from '@/components/language-learning/chat-interface';
import { VoiceInterface } from '@/components/language-learning/voice-interface';
import { VideoInterface } from '@/components/language-learning/video-interface';

export default function Home() {
  const currentStep = useLanguageLearningStore((state) => state.currentStep);
  const interactionMode = useLanguageLearningStore((state) => state.interactionMode);

  const renderInterface = () => {
    if (currentStep !== 'chat') return null;
    
    switch (interactionMode) {
      case 'voice':
        return (
          <div key="voice" className="w-full h-[calc(100vh-4rem)]">
            <VoiceInterface />
          </div>
        );
      case 'video':
        return (
          <div key="video" className="w-full h-screen fixed inset-0 -m-8">
            <VideoInterface />
          </div>
        );
      case 'text':
      default:
        return (
          <div key="chat" className="w-full h-[calc(100vh-4rem)]">
            <ChatInterface />
          </div>
        );
    }
  };

  // Special styling for video mode (full screen)
  const isVideoMode = currentStep === 'chat' && interactionMode === 'video';

  return (
    <main className={`min-h-screen ${
      isVideoMode 
        ? '' 
        : 'bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800'
    }`}>
      <div className={`container mx-auto ${
        isVideoMode ? '' : 'py-8 px-4'
      } min-h-screen flex items-center justify-center`}>
        <AnimatePresence mode="wait">
          {currentStep === 'mode' && (
            <ModeSelection key="mode" />
          )}
          {currentStep === 'language' && (
            <LanguageSelection key="language" />
          )}
          {currentStep === 'proficiency' && (
            <ProficiencySelection key="proficiency" />
          )}
          {currentStep === 'celebrity' && (
            <CelebritySelection key="celebrity" />
          )}
          {currentStep === 'scenario' && (
            <ScenarioSelection key="scenario" />
          )}
          {currentStep === 'chat' && renderInterface()}
        </AnimatePresence>
      </div>
    </main>
  );
}
