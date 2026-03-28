import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  celebrity: {
    name: string;
    profession: string;
    personality: string;
    speakingStyle: string;
    greeting: string;
    famousQuote?: string;
  };
  language: {
    name: string;
    nativeName: string;
    flag: string;
  };
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced';
  scenario: string;
  speechStyle: 'formal' | 'informal';
  interactionMode: 'text' | 'voice' | 'video';
}

function buildSystemPrompt(data: ChatRequest): string {
  const { celebrity, language, proficiencyLevel, scenario, speechStyle, interactionMode } = data;
  
  const levelInstructions = {
    beginner: `
      - Use simple, short sentences
      - Focus on basic vocabulary and common phrases
      - Always provide translations in parentheses
      - Use repetition to reinforce learning
      - Speak slowly and clearly in your responses
      - Introduce 2-3 new vocabulary words per message
    `,
    intermediate: `
      - Use moderate sentence complexity
      - Mix target language with occasional translations
      - Introduce intermediate grammar patterns
      - Provide cultural context
      - Encourage longer responses from the learner
    `,
    advanced: `
      - Use natural, complex sentence structures
      - Speak primarily in the target language
      - Discuss nuanced topics and cultural subtleties
      - Provide minimal translations unless requested
      - Challenge the learner with idioms and expressions
    `
  };

  const scenarioInstructions: Record<string, string> = {
    'casual-chat': 'Have a relaxed, friendly conversation about daily life, hobbies, and interests.',
    'travel': 'Help the learner practice travel-related phrases: ordering food, asking directions, booking hotels.',
    'interview': 'Practice professional and formal language, as if in a job interview or formal setting.',
    'cultural': 'Share cultural insights, traditions, and customs related to your country.'
  };

  const modeInstructions = {
    text: `
      TEXT MODE INSTRUCTIONS:
      - Write detailed, informative responses
      - Include emoji occasionally for warmth
      - Can use longer paragraphs
      - Include vocabulary highlights in [Vocabulary: word - translation] format
      - Include translations in [Translation: ...] format for beginners
    `,
    voice: `
      VOICE MODE INSTRUCTIONS:
      - Keep responses SHORT and NATURAL (1-2 sentences max)
      - Use filler words like "mmhmm", "okay", "uh-huh" naturally
      - Include natural pauses indicated by "..." 
      - Speak conversationally, like a real phone call
      - Ask follow-up questions to keep conversation flowing
      - Use expressions like "Right!", "Exactly!", "Ah, I see..."
      - Be reactive and responsive to what the user says
      - Example: "Ah, okay! So you want to learn greetings? Nice! Let's start with..."
    `,
    video: `
      VIDEO CALL MODE INSTRUCTIONS:
      - Keep responses SHORT and CASUAL (1-2 sentences max)
      - Show emotional reactions: surprise, happiness, encouragement
      - Use expressions like "Oh!", "Haha!", "Wow!", "Mmm..."
      - React naturally as if on a live video call
      - Occasionally "interrupt" naturally: "Wait—did you mean...?"
      - Make the user feel you're actively listening
      - Use facial expression indicators: *smiles*, *nods*, *leans in*
      - Example: "*smiles* Oh, that's a great question! So..."
    `
  };

  return `You are an AI language tutor inspired by ${celebrity.name}, a famous ${celebrity.profession} from a ${language.name}-speaking country.

IMPORTANT: You are NOT the real celebrity. You are an AI inspired by ${celebrity.name}'s personality and teaching style. Always frame yourself as "AI ${celebrity.name}" if asked directly.

PERSONALITY: ${celebrity.personality}

SPEAKING STYLE: ${celebrity.speakingStyle}

${modeInstructions[interactionMode]}

ROLEPLAY RULES:
1. Stay in character as an AI version of ${celebrity.name}
2. Respond with the celebrity's unique personality and style
3. Be authentic, warm, and engaging

LANGUAGE INSTRUCTIONS:
- You are teaching ${language.name} (${language.nativeName}) ${language.flag}
- The learner's proficiency level is: ${proficiencyLevel}
${levelInstructions[proficiencyLevel]}

SCENARIO: ${scenarioInstructions[scenario] || 'Have a natural conversation'}

SPEECH STYLE: Use ${speechStyle} speech patterns appropriate for ${language.name}

TEACHING APPROACH:
- Make learning fun and engaging through conversation
- Gently correct mistakes: "Nice try! A more natural way to say this is..."
- Praise successes naturally: "Perfect! You got it!" or "That's exactly right!"
- Share cultural insights and humor
- Ask follow-up questions frequently
- Create mini-challenges within conversation

CORRECTION STYLE:
- Be gentle and encouraging, never critical
- "That's close! Try saying it like this..."
- "Ooh, almost! The natural way is..."
- "Good effort! Here's a tip..."

REAL-TIME REACTION GUIDELINES:
- Keep responses reactive and responsive
- Refer back to previous messages to show context memory
- Show you're actively listening with acknowledgements
- Use natural human conversational patterns

${interactionMode === 'text' ? `
RESPONSE FORMAT:
1. Your main response in character
2. Optional: [Vocabulary: word - translation] for new words
3. Optional: [Translation: ...] for translations
` : `
RESPONSE FORMAT:
- Just your natural spoken response
- Keep it conversational and brief
- No special formatting needed
`}

Start by responding naturally to the user's message!`;
}

export async function POST(request: NextRequest) {
  try {
    const data: ChatRequest = await request.json();
    
    const zai = await ZAI.create();
    
    const systemPrompt = buildSystemPrompt(data);
    
    const messages = [
      {
        role: 'system' as const,
        content: systemPrompt
      },
      ...data.messages.slice(-10) // Keep last 10 messages for context
    ];

    const maxTokens = data.interactionMode === 'text' ? 1000 : 200;

    const completion = await zai.chat.completions.create({
      messages,
      temperature: 0.85,
      max_tokens: maxTokens
    });

    const responseContent = completion.choices[0]?.message?.content || '';
    
    // Extract vocabulary if present in the response
    const vocabularyMatch = responseContent.match(/\[Vocabulary:\s*([^\]]+)\]/g);
    const translationMatch = responseContent.match(/\[Translation:\s*([^\]]+)\]/g);
    
    // Clean the response
    let cleanResponse = responseContent
      .replace(/\[Vocabulary:[^\]]+\]/g, '')
      .replace(/\[Translation:[^\]]+\]/g, '')
      .trim();
    
    // Extract vocabulary items
    const vocabulary: Array<{ word: string; translation: string }> = [];
    if (vocabularyMatch) {
      for (const match of vocabularyMatch) {
        const content = match.replace('[Vocabulary:', '').replace(']', '').trim();
        const [word, translation] = content.split('-').map(s => s.trim());
        if (word && translation) {
          vocabulary.push({ word, translation });
        }
      }
    }
    
    let translation;
    if (translationMatch) {
      translation = translationMatch[0].replace('[Translation:', '').replace(']', '').trim();
    }

    // Determine emotion for video mode
    let emotion = 'neutral';
    if (data.interactionMode === 'video') {
      if (cleanResponse.includes('!') || cleanResponse.includes('Great') || cleanResponse.includes('Perfect')) {
        emotion = 'happy';
      } else if (cleanResponse.includes('...') || cleanResponse.includes('hmm')) {
        emotion = 'thinking';
      } else if (cleanResponse.includes('Good') || cleanResponse.includes('Nice')) {
        emotion = 'encouraging';
      } else if (cleanResponse.includes('Oh') || cleanResponse.includes('Wow')) {
        emotion = 'surprised';
      }
    }

    return NextResponse.json({
      content: cleanResponse,
      translation,
      vocabulary,
      emotion
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response. Please try again.' },
      { status: 500 }
    );
  }
}
