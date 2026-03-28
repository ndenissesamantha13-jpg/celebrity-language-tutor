'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  ArrowLeft,
  Settings,
  User,
  Bot,
  Loader2,
  Phone,
  PhoneOff
} from 'lucide-react';
import { useLanguageLearningStore, type VocabularyItem } from '@/store/language-store';
import type { Celebrity } from '@/lib/language-data';

export function VoiceInterface() {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioQueue, setAudioQueue] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    selectedLanguage,
    selectedCelebrity,
    proficiencyLevel,
    selectedScenario,
    speechStyle,
    messages,
    isTyping,
    isSpeaking,
    vocabularyCollection,
    setSelectedScenario,
    addMessage,
    setIsTyping,
    setIsSpeaking,
    addVocabulary,
    setCelebrityEmotion,
    switchCelebrity
  } = useLanguageLearningStore();

  useEffect(() => {
    // Send initial greeting from celebrity
    if (messages.length === 0 && selectedCelebrity) {
      const greeting = selectedCelebrity.greeting;
      addMessage({
        role: 'assistant',
        content: greeting,
        translation: selectedCelebrity.greetingTranslation
      });
      // Auto-play greeting
      playAudio(greeting);
    }
  }, []);

  const playAudio = async (text: string) => {
    if (isPlaying || !text) return;
    
    setIsSpeaking(true);
    setIsPlaying(true);
    
    try {
      // Clean the text for TTS
      const cleanText = text
        .replace(/\*[^*]+\*/g, '') // Remove action indicators
        .replace(/[^\p{L}\p{N}\p{P}\p{Z}\n]/gu, ' ')
        .trim()
        .slice(0, 500);

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          voice: 'tongtong',
          speed: 1.0
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (audioRef.current) {
          audioRef.current.pause();
        }
        
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => {
          setIsPlaying(false);
          setIsSpeaking(false);
        };
        audioRef.current.onerror = () => {
          setIsPlaying(false);
          setIsSpeaking(false);
        };
        
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('TTS error:', error);
      setIsPlaying(false);
      setIsSpeaking(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsSpeaking(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    
    addMessage({
      role: 'user',
      content: userMessage
    });

    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages.map(m => ({
            role: m.role,
            content: m.content
          })).concat([{ role: 'user', content: userMessage }]),
          celebrity: {
            name: selectedCelebrity?.name,
            profession: selectedCelebrity?.profession,
            personality: selectedCelebrity?.personality,
            speakingStyle: selectedCelebrity?.speakingStyle,
            greeting: selectedCelebrity?.greeting,
            famousQuote: selectedCelebrity?.famousQuote
          },
          language: {
            name: selectedLanguage?.name,
            nativeName: selectedLanguage?.nativeName,
            flag: selectedLanguage?.flag
          },
          proficiencyLevel,
          scenario: selectedScenario,
          speechStyle,
          interactionMode: 'voice'
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      addMessage({
        role: 'assistant',
        content: data.content,
        translation: data.translation,
        vocabulary: data.vocabulary
      });

      // Add vocabulary to collection
      if (data.vocabulary && data.vocabulary.length > 0) {
        data.vocabulary.forEach((item: VocabularyItem) => {
          addVocabulary(item);
        });
      }

      // Auto-play response
      setTimeout(() => {
        playAudio(data.content);
      }, 500);

    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        role: 'assistant',
        content: "I'm sorry, I had trouble responding. Could you please try again?"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChangeCelebrity = (celebrity: Celebrity) => {
    stopAudio();
    switchCelebrity(celebrity);
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: celebrity.greeting,
        translation: celebrity.greetingTranslation
      });
      playAudio(celebrity.greeting);
    }, 100);
  };

  const levelEmoji = {
    beginner: '🌱',
    intermediate: '🌿',
    advanced: '🌳'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto px-4 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedScenario(null)}
            className="text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 flex items-center justify-center text-xl">
              {selectedCelebrity?.image}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                {selectedCelebrity?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Voice Call • {selectedLanguage?.flag} {levelEmoji[proficiencyLevel!]} {proficiencyLevel}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
            <Phone className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
      </div>

      {/* Main Voice Interface */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        {/* Celebrity Avatar */}
        <motion.div
          animate={{ 
            scale: isSpeaking ? [1, 1.05, 1] : 1,
          }}
          transition={{ 
            repeat: isSpeaking ? Infinity : 0,
            duration: 0.8
          }}
          className="relative"
        >
          <div className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl ${
            isSpeaking 
              ? 'bg-gradient-to-br from-emerald-200 to-teal-200 dark:from-emerald-800/50 dark:to-teal-800/50' 
              : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'
          } transition-colors`}>
            {selectedCelebrity?.image}
          </div>
          
          {/* Speaking indicator */}
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 rounded-full border-4 border-emerald-400 dark:border-emerald-500"
              style={{
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
              }}
            />
          )}
        </motion.div>

        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          {selectedCelebrity?.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isTyping ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Listening...'}
        </p>

        {/* Current Message */}
        {messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-md text-center"
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {messages[messages.length - 1]?.content}
            </p>
            {messages[messages.length - 1]?.translation && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                {messages[messages.length - 1]?.translation}
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="pb-4 space-y-3">
        {/* Quick reply suggestions */}
        {messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && (
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput("Can you repeat that?")}
              className="text-xs"
            >
              🔄 Repeat
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput("How do I say...?")}
              className="text-xs"
            >
              ❓ Ask
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput("Yes, I understand!")}
              className="text-xs"
            >
              ✅ Got it!
            </Button>
          </div>
        )}

        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type or speak your response..."
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
          />
          <Button
            onClick={isPlaying ? stopAudio : handleSendMessage}
            disabled={!input.trim() && !isPlaying}
            className="px-4"
            variant={isPlaying ? "destructive" : "default"}
          >
            {isPlaying ? (
              <VolumeX className="w-4 h-4" />
            ) : isTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Press Enter to send • AI {selectedCelebrity?.name} is speaking in voice mode
        </p>
      </div>
    </motion.div>
  );
}
