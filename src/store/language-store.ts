// Language Learning Session Store
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language, Celebrity } from '@/lib/language-data';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  translation?: string;
  vocabulary?: VocabularyItem[];
  isFollowUp?: boolean;
  audioUrl?: string;
}

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
}

export interface SessionStats {
  messagesExchanged: number;
  vocabularyLearned: number;
  correctionsReceived: number;
  sessionStartTime: Date;
}

interface LanguageLearningState {
  // Session state
  currentStep: 'mode' | 'language' | 'proficiency' | 'celebrity' | 'scenario' | 'chat';
  
  // Interaction mode
  interactionMode: 'text' | 'voice' | 'video' | null;
  
  // Selections
  selectedLanguage: Language | null;
  selectedCelebrity: Celebrity | null;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | null;
  selectedScenario: string | null;
  
  // Chat state
  messages: ChatMessage[];
  isTyping: boolean;
  isSpeaking: boolean;
  
  // Video call state
  callDuration: number;
  isCallActive: boolean;
  celebrityEmotion: 'neutral' | 'happy' | 'thinking' | 'encouraging' | 'surprised';
  
  // Stats
  sessionStats: SessionStats;
  
  // Vocabulary collection
  vocabularyCollection: VocabularyItem[];
  
  // Speech style
  speechStyle: 'formal' | 'informal';
  
  // Actions
  setInteractionMode: (mode: 'text' | 'voice' | 'video') => void;
  setSelectedLanguage: (language: Language) => void;
  setSelectedCelebrity: (celebrity: Celebrity) => void;
  setProficiencyLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  setSelectedScenario: (scenario: string) => void;
  setSpeechStyle: (style: 'formal' | 'informal') => void;
  
  addMessage: (message: Omit<ChatMessage, 'id'>) => void;
  setIsTyping: (isTyping: boolean) => void;
  setIsSpeaking: (isSpeaking: boolean) => void;
  setCelebrityEmotion: (emotion: 'neutral' | 'happy' | 'thinking' | 'encouraging' | 'surprised') => void;
  addVocabulary: (item: VocabularyItem) => void;
  
  incrementCallDuration: () => void;
  setCallActive: (active: boolean) => void;
  
  nextStep: () => void;
  prevStep: () => void;
  
  // Reset
  resetSession: () => void;
  switchCelebrity: (celebrity: Celebrity) => void;
}

const initialStats: SessionStats = {
  messagesExchanged: 0,
  vocabularyLearned: 0,
  correctionsReceived: 0,
  sessionStartTime: new Date()
};

export const useLanguageLearningStore = create<LanguageLearningState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 'mode',
      interactionMode: null,
      selectedLanguage: null,
      selectedCelebrity: null,
      proficiencyLevel: null,
      selectedScenario: null,
      messages: [],
      isTyping: false,
      isSpeaking: false,
      callDuration: 0,
      isCallActive: false,
      celebrityEmotion: 'neutral',
      sessionStats: initialStats,
      vocabularyCollection: [],
      speechStyle: 'informal',
      
      // Actions
      setInteractionMode: (mode) => set({ 
        interactionMode: mode,
        currentStep: 'language'
      }),
      
      setSelectedLanguage: (language) => set({ 
        selectedLanguage: language,
        currentStep: 'proficiency'
      }),
      
      setSelectedCelebrity: (celebrity) => set({ 
        selectedCelebrity: celebrity,
        currentStep: 'scenario'
      }),
      
      setProficiencyLevel: (level) => set({ 
        proficiencyLevel: level,
        currentStep: 'celebrity'
      }),
      
      setSelectedScenario: (scenario) => set({ 
        selectedScenario: scenario,
        currentStep: 'chat',
        isCallActive: true,
        callDuration: 0
      }),
      
      setSpeechStyle: (style) => set({ speechStyle: style }),
      
      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        
        set((state) => ({
          messages: [...state.messages, newMessage],
          sessionStats: {
            ...state.sessionStats,
            messagesExchanged: state.sessionStats.messagesExchanged + 1
          }
        }));
      },
      
      setIsTyping: (isTyping) => set({ isTyping }),
      setIsSpeaking: (isSpeaking) => set({ isSpeaking }),
      setCelebrityEmotion: (emotion) => set({ celebrityEmotion: emotion }),
      
      addVocabulary: (item) => set((state) => {
        // Avoid duplicates
        if (state.vocabularyCollection.some(v => v.word === item.word)) {
          return state;
        }
        return {
          vocabularyCollection: [...state.vocabularyCollection, item],
          sessionStats: {
            ...state.sessionStats,
            vocabularyLearned: state.sessionStats.vocabularyLearned + 1
          }
        };
      }),
      
      incrementCallDuration: () => set((state) => ({
        callDuration: state.callDuration + 1
      })),
      
      setCallActive: (active) => set({ isCallActive: active }),
      
      nextStep: () => {
        const steps: Array<LanguageLearningState['currentStep']> = 
          ['mode', 'language', 'proficiency', 'celebrity', 'scenario', 'chat'];
        const currentIndex = steps.indexOf(get().currentStep);
        if (currentIndex < steps.length - 1) {
          set({ currentStep: steps[currentIndex + 1] });
        }
      },
      
      prevStep: () => {
        const steps: Array<LanguageLearningState['currentStep']> = 
          ['mode', 'language', 'proficiency', 'celebrity', 'scenario', 'chat'];
        const currentIndex = steps.indexOf(get().currentStep);
        if (currentIndex > 0) {
          set({ currentStep: steps[currentIndex - 1] });
        }
      },
      
      resetSession: () => set({
        currentStep: 'mode',
        interactionMode: null,
        selectedLanguage: null,
        selectedCelebrity: null,
        proficiencyLevel: null,
        selectedScenario: null,
        messages: [],
        isTyping: false,
        isSpeaking: false,
        callDuration: 0,
        isCallActive: false,
        celebrityEmotion: 'neutral',
        sessionStats: {
          messagesExchanged: 0,
          vocabularyLearned: 0,
          correctionsReceived: 0,
          sessionStartTime: new Date()
        },
        vocabularyCollection: [],
        speechStyle: 'informal'
      }),
      
      switchCelebrity: (celebrity) => set({ 
        selectedCelebrity: celebrity,
        messages: [], // Clear messages when switching
        callDuration: 0,
        sessionStats: {
          messagesExchanged: 0,
          vocabularyLearned: 0,
          correctionsReceived: 0,
          sessionStartTime: new Date()
        }
      })
    }),
    {
      name: 'language-learning-storage',
      partialize: (state) => ({
        interactionMode: state.interactionMode,
        selectedLanguage: state.selectedLanguage,
        selectedCelebrity: state.selectedCelebrity,
        proficiencyLevel: state.proficiencyLevel,
        vocabularyCollection: state.vocabularyCollection,
        speechStyle: state.speechStyle
      })
    }
  )
);
