'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  Send,
  RotateCcw,
  Volume2,
  BookOpen,
  Settings,
  ChevronDown,
  User,
  Bot,
  Loader2,
  MessageCircle,
  Languages,
  Mic,
  Video
} from 'lucide-react';
import { useLanguageLearningStore, type VocabularyItem } from '@/store/language-store';
import type { Celebrity } from '@/lib/language-data';

export function ChatInterface() {
  const [input, setInput] = useState('');
  const [showVocab, setShowVocab] = useState(false);
  const [typingProgress, setTypingProgress] = useState('');
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    selectedLanguage,
    selectedCelebrity,
    proficiencyLevel,
    selectedScenario,
    speechStyle,
    messages,
    isTyping,
    vocabularyCollection,
    setSelectedScenario,
    addMessage,
    setIsTyping,
    addVocabulary,
    setSpeechStyle,
    resetSession,
    switchCelebrity
  } = useLanguageLearningStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing effect
  useEffect(() => {
    if (isTyping && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        // Simulate "thinking" with typing indicators
        const thinkingPhrases = [
          'Thinking',
          'Thinking.',
          'Thinking..',
          'Thinking...',
        ];
        let index = 0;
        const interval = setInterval(() => {
          setTypingProgress(thinkingPhrases[index % thinkingPhrases.length]);
          index++;
        }, 300);
        return () => clearInterval(interval);
      }
    } else {
      setTypingProgress('');
    }
  }, [isTyping, messages]);

  // Generate suggested replies after AI message
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && !isTyping) {
      const lastMessage = messages[messages.length - 1].content;
      
      // Generate contextual suggestions
      if (lastMessage.includes('?')) {
        setSuggestedReplies(['Yes!', 'No, can you explain?', 'How do I say that?']);
      } else if (lastMessage.includes('try') || lastMessage.includes('practice')) {
        setSuggestedReplies(['Okay, let me try!', 'Can you help me?', 'What does that mean?']);
      } else if (lastMessage.includes('Good') || lastMessage.includes('Great') || lastMessage.includes('Perfect')) {
        setSuggestedReplies(['Thank you!', 'What\'s next?', 'Teach me more!']);
      } else {
        setSuggestedReplies([
          'Can you explain that?',
          'How do I say...?',
          'Let\'s practice!'
        ]);
      }
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Send initial greeting from celebrity with delay
    if (messages.length === 0 && selectedCelebrity) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage({
          role: 'assistant',
          content: selectedCelebrity.greeting,
          translation: selectedCelebrity.greetingTranslation
        });
        setIsTyping(false);
      }, 1500);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setSuggestedReplies([]);
    
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
          interactionMode: 'text'
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Add delay to simulate typing
      await new Promise(resolve => setTimeout(resolve, 800));

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

      // Occasionally add follow-up messages to feel "alive"
      if (Math.random() > 0.7 && data.content.length < 100) {
        setTimeout(() => {
          const followUps = [
            "Ready to continue? 😊",
            "What would you like to learn next?",
            "Any questions about that?",
            "Shall we practice more?"
          ];
          addMessage({
            role: 'assistant',
            content: followUps[Math.floor(Math.random() * followUps.length)],
            isFollowUp: true
          });
        }, 2000);
      }

    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        role: 'assistant',
        content: "I'm sorry, I had trouble responding. Could you please try again? 🙏"
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

  const handleSuggestedReply = (reply: string) => {
    setInput(reply);
    textareaRef.current?.focus();
  };

  const handleChangeCelebrity = (celebrity: Celebrity) => {
    switchCelebrity(celebrity);
    setSuggestedReplies([]);
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: celebrity.greeting,
        translation: celebrity.greetingTranslation
      });
    }, 500);
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
      className="w-full max-w-4xl mx-auto px-4 h-full flex flex-col"
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center text-xl">
              {selectedCelebrity?.image}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                AI {selectedCelebrity?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                Text Mode • {selectedLanguage?.flag} {levelEmoji[proficiencyLevel!]} {proficiencyLevel}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Vocabulary Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowVocab(!showVocab)}
            className="hidden sm:flex"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Vocab ({vocabularyCollection.length})
          </Button>

          {/* Switch Celebrity */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-1" />
                Switch
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {selectedLanguage?.celebrities.map((celeb) => (
                <DropdownMenuItem
                  key={celeb.id}
                  onClick={() => handleChangeCelebrity(celeb)}
                  disabled={celeb.id === selectedCelebrity?.id}
                >
                  <span className="mr-2">{celeb.image}</span>
                  {celeb.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="speech-style" className="text-sm">
                    <Languages className="w-4 h-4 inline mr-1" />
                    Formal Speech
                  </Label>
                  <Switch
                    id="speech-style"
                    checked={speechStyle === 'formal'}
                    onCheckedChange={(checked) => setSpeechStyle(checked ? 'formal' : 'informal')}
                  />
                </div>
              </div>
              <DropdownMenuItem onClick={resetSession} className="text-red-500 focus:text-red-500">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Session
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 min-h-0 py-4">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 pb-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: message.isFollowUp ? 0.1 : 0 }}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user'
                          ? 'bg-blue-100 dark:bg-blue-900/50'
                          : 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <span className="text-sm">{selectedCelebrity?.image}</span>
                      )}
                    </div>
                    <div
                      className={`flex-1 max-w-[80%] ${
                        message.role === 'user' ? 'text-right' : ''
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white rounded-br-md'
                            : message.isFollowUp 
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-gray-700 dark:text-gray-300 rounded-bl-md text-sm'
                              : 'bg-gray-100 dark:bg-gray-800 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        {message.translation && (
                          <p className="text-xs mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 opacity-70">
                            📝 {message.translation}
                          </p>
                        )}
                        {message.vocabulary && message.vocabulary.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
                            {message.vocabulary.map((vocab, idx) => (
                              <p key={idx} className="text-xs">
                                💡 <span className="font-medium">{vocab.word}</span> - {vocab.translation}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center">
                    <span className="text-sm">{selectedCelebrity?.image}</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{typingProgress || 'Thinking...'}</p>
                    <div className="flex gap-1 mt-1">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Suggested Replies */}
          {suggestedReplies.length > 0 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mb-2"
            >
              {suggestedReplies.map((reply, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedReply(reply)}
                  className="text-xs"
                >
                  {reply}
                </Button>
              ))}
            </motion.div>
          )}

          {/* Input Area */}
          <div className="mt-2 flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Type in ${selectedLanguage?.name} or English...`}
              className="min-h-[44px] max-h-32 resize-none"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="px-4"
            >
              {isTyping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Vocabulary Sidebar */}
        {showVocab && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="hidden sm:block w-64 flex-shrink-0"
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Vocabulary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100%-60px)]">
                  <div className="p-3 space-y-2">
                    {vocabularyCollection.length === 0 ? (
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">
                        New vocabulary will appear here as you learn!
                      </p>
                    ) : (
                      vocabularyCollection.map((vocab, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm"
                        >
                          <p className="font-medium">{vocab.word}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {vocab.translation}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Mobile Vocab Toggle */}
      {showVocab && (
        <div className="sm:hidden fixed inset-x-0 bottom-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 p-4 z-50">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Vocabulary ({vocabularyCollection.length})
            </span>
            <Button variant="ghost" size="sm" onClick={() => setShowVocab(false)}>
              ×
            </Button>
          </div>
          <ScrollArea className="h-32">
            <div className="flex gap-2 pb-2">
              {vocabularyCollection.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  New vocabulary will appear here!
                </p>
              ) : (
                vocabularyCollection.map((vocab, idx) => (
                  <Badge key={idx} variant="secondary" className="flex-shrink-0">
                    {vocab.word}: {vocab.translation}
                  </Badge>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </motion.div>
  );
}
