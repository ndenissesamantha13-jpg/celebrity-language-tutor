'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Settings,
  User,
  Bot,
  Loader2,
  Volume2,
  VolumeX,
  MessageCircle,
  Smile,
  ThumbsUp
} from 'lucide-react';
import { useLanguageLearningStore, type VocabularyItem } from '@/store/language-store';
import type { Celebrity } from '@/lib/language-data';

const emotionStyles = {
  neutral: {
    bg: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
    ring: 'ring-gray-300 dark:ring-gray-600',
    emoji: '😊'
  },
  happy: {
    bg: 'from-amber-100 to-yellow-200 dark:from-amber-900/50 dark:to-yellow-900/50',
    ring: 'ring-amber-400 dark:ring-amber-500',
    emoji: '😄'
  },
  thinking: {
    bg: 'from-blue-100 to-indigo-200 dark:from-blue-900/50 dark:to-indigo-900/50',
    ring: 'ring-blue-400 dark:ring-blue-500',
    emoji: '🤔'
  },
  encouraging: {
    bg: 'from-green-100 to-emerald-200 dark:from-green-900/50 dark:to-emerald-900/50',
    ring: 'ring-green-400 dark:ring-green-500',
    emoji: '💪'
  },
  surprised: {
    bg: 'from-rose-100 to-pink-200 dark:from-rose-900/50 dark:to-pink-900/50',
    ring: 'ring-rose-400 dark:ring-rose-500',
    emoji: '😮'
  }
};

export function VideoInterface() {
  const [input, setInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    selectedLanguage,
    selectedCelebrity,
    proficiencyLevel,
    selectedScenario,
    speechStyle,
    messages,
    isTyping,
    isSpeaking,
    callDuration,
    celebrityEmotion,
    vocabularyCollection,
    setSelectedScenario,
    addMessage,
    setIsTyping,
    setIsSpeaking,
    addVocabulary,
    setCelebrityEmotion,
    incrementCallDuration,
    setCallActive,
    switchCelebrity
  } = useLanguageLearningStore();

  // Timer for call duration
  useEffect(() => {
    timerRef.current = setInterval(() => {
      incrementCallDuration();
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Send initial greeting from celebrity
    if (messages.length === 0 && selectedCelebrity) {
      addMessage({
        role: 'assistant',
        content: selectedCelebrity.greeting,
        translation: selectedCelebrity.greetingTranslation
      });
      setCelebrityEmotion('happy');
      setTimeout(() => {
        playAudio(selectedCelebrity.greeting);
      }, 500);
    }
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playAudio = async (text: string) => {
    if (isPlaying || !text) return;
    
    setIsSpeaking(true);
    setIsPlaying(true);
    
    try {
      const cleanText = text
        .replace(/\*[^*]+\*/g, '')
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
          setCelebrityEmotion('neutral');
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

  const endCall = () => {
    stopAudio();
    setCallActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setSelectedScenario(null);
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
    setCelebrityEmotion('thinking');

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
          interactionMode: 'video'
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

      // Set emotion based on response
      if (data.emotion && emotionStyles[data.emotion as keyof typeof emotionStyles]) {
        setCelebrityEmotion(data.emotion);
      } else {
        setCelebrityEmotion('neutral');
      }

      // Add vocabulary to collection
      if (data.vocabulary && data.vocabulary.length > 0) {
        data.vocabulary.forEach((item: VocabularyItem) => {
          addVocabulary(item);
        });
      }

      // Auto-play response
      setTimeout(() => {
        playAudio(data.content);
      }, 300);

    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        role: 'assistant',
        content: "I'm sorry, could you repeat that?"
      });
      setCelebrityEmotion('neutral');
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

  const levelEmoji = {
    beginner: '🌱',
    intermediate: '🌿',
    advanced: '🌳'
  };

  const currentEmotion = emotionStyles[celebrityEmotion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Video Call Header */}
      <div className="flex items-center justify-between p-4 bg-black/30">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={endCall}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Leave
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-white font-medium">{selectedCelebrity?.name}</p>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{formatDuration(callDuration)}</span>
          </div>
        </div>

        <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/50">
          REC
        </Badge>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Celebrity Video "Feed" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: isSpeaking ? [1, 1.02, 1] : 1,
            }}
            transition={{ 
              repeat: isSpeaking ? Infinity : 0,
              duration: 0.6
            }}
            className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center text-8xl md:text-9xl bg-gradient-to-br ${currentEmotion.bg} ring-4 ${currentEmotion.ring} transition-all duration-500`}
          >
            {selectedCelebrity?.image}
            
            {/* Speaking wave overlay */}
            {isSpeaking && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`absolute inset-0 rounded-full ring-2 ${currentEmotion.ring}`}
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              isTyping 
                ? 'bg-blue-500/20 text-blue-300' 
                : isSpeaking 
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-white/10 text-white/70'
            }`}
          >
            {isTyping ? '🤔 Thinking...' : isSpeaking ? '💬 Speaking...' : `AI ${selectedCelebrity?.name}`}
          </motion.div>
        </div>

        {/* Current Message Overlay */}
        {messages.length > 0 && !showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-24 left-4 right-4 max-w-lg mx-auto"
          >
            <Card className="bg-black/60 backdrop-blur-md border-white/10 p-4">
              <p className="text-white text-lg leading-relaxed">
                {messages[messages.length - 1]?.content}
              </p>
              {messages[messages.length - 1]?.translation && (
                <p className="text-white/60 text-sm mt-2 italic">
                  {messages[messages.length - 1]?.translation}
                </p>
              )}
            </Card>
          </motion.div>
        )}

        {/* User Video (Small) */}
        <div className="absolute bottom-4 right-4 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-700 border-2 border-white/20 flex items-center justify-center overflow-hidden">
          <div className="text-4xl">👤</div>
          <div className="absolute bottom-1 right-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-black/40 backdrop-blur-sm">
        {/* Quick Reactions */}
        <div className="flex justify-center gap-2 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInput("Yes! I understand! 👍")}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            Got it!
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInput("Can you repeat that? 🔄")}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            🔄 Repeat
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInput("How do I say...?")}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            ❓ Ask
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChat(!showChat)}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
        </div>

        {/* Input */}
        <div className="flex gap-2 max-w-xl mx-auto">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your response..."
            className="min-h-[44px] max-h-32 resize-none bg-white/10 border-white/20 text-white placeholder:text-white/50"
            rows={1}
          />
          <Button
            onClick={isPlaying ? stopAudio : handleSendMessage}
            disabled={!input.trim() && !isPlaying}
            className="px-4 bg-white/20 hover:bg-white/30 text-white"
            variant="ghost"
          >
            {isPlaying ? (
              <VolumeX className="w-5 h-5" />
            ) : isTyping ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
          <Button
            onClick={endCall}
            className="px-4 bg-red-500 hover:bg-red-600 text-white"
          >
            <PhoneOff className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-xs text-center text-white/40 mt-2">
          Learning {selectedLanguage?.flag} {selectedLanguage?.name} with AI {selectedCelebrity?.name}
        </p>
      </div>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-black/90 backdrop-blur-md border-l border-white/10 z-50 flex flex-col"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-medium">Chat History</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(false)}
                className="text-white/70"
              >
                ✕
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-500/20 ml-8'
                      : 'bg-white/10 mr-8'
                  }`}
                >
                  <p className="text-white text-sm">{msg.content}</p>
                  {msg.translation && (
                    <p className="text-white/50 text-xs mt-1">{msg.translation}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
