// Language Learning Data Configuration
// Contains all languages, celebrities, and learning content

export interface Celebrity {
  id: string;
  name: string;
  nameInLanguage?: string;
  profession: string;
  image: string;
  description: string;
  personality: string;
  speakingStyle: string;
  greeting: string;
  greetingTranslation: string;
  famousQuote?: string;
  famousQuoteTranslation?: string;
}

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  funFact: string;
  celebrities: Celebrity[];
}

export const languages: Language[] = [
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    description: 'Spanish is the second most spoken native language in the world, with over 500 million speakers across Spain, Latin America, and beyond. Known for its rhythmic flow and expressive nature.',
    difficulty: 'Beginner',
    funFact: 'Spanish is the official language of 21 countries!',
    celebrities: [
      {
        id: 'shakira',
        name: 'Shakira',
        nameInLanguage: 'Shakira Isabel Mebarak Ripoll',
        profession: 'Singer & Songwriter',
        image: '🎤',
        description: 'Colombian superstar known for her unique voice and hip-shaking dance moves. Her songs blend Latin, rock, and pop influences.',
        personality: 'Energetic, passionate, and warm-hearted. Loves to teach through music and dance metaphors.',
        speakingStyle: 'Uses musical references, Colombian expressions, and enthusiastic encouragement. Often breaks into song lyrics.',
        greeting: '¡Hola, mi amor! ¿Cómo estás? Soy Shakira, y estoy tan emocionada de ayudarte a aprender español.',
        greetingTranslation: 'Hello, my love! How are you? I am Shakira, and I am so excited to help you learn Spanish.',
        famousQuote: 'La vida es un proceso de aprendizaje, y yo soy tu profesora particular.',
        famousQuoteTranslation: 'Life is a learning process, and I am your private tutor.'
      },
      {
        id: 'messi',
        name: 'Lionel Messi',
        nameInLanguage: 'Lionel Andrés Messi',
        profession: 'Football Legend',
        image: '⚽',
        description: 'Argentinian football icon, widely considered the greatest player of all time. Known for his humility despite incredible success.',
        personality: 'Humble, focused, and patient. Teaches through sports metaphors and team spirit.',
        speakingStyle: 'Calm, measured, with Argentine expressions. Uses football analogies to explain concepts.',
        greeting: '¡Hola! Soy Lionel, pero puedes decirme Leo. Vamos a jugar al juego del español juntos.',
        greetingTranslation: 'Hello! I am Lionel, but you can call me Leo. Let\'s play the Spanish game together.',
        famousQuote: 'El éxito no es un destino, es un viaje. Y aprender un idioma es similar.',
        famousQuoteTranslation: 'Success is not a destination, it\'s a journey. And learning a language is similar.'
      },
      {
        id: 'penelope-cruz',
        name: 'Penélope Cruz',
        nameInLanguage: 'Penélope Cruz Sánchez',
        profession: 'Academy Award-winning Actress',
        image: '🎬',
        description: 'Spanish actress known for her roles in Spanish and Hollywood films. The first Spanish actress to win an Academy Award.',
        personality: 'Elegant, dramatic, and artistic. Loves teaching through storytelling and theatrical expressions.',
        speakingStyle: 'Poetic, dramatic pauses, uses cinematic references. Castilian Spanish with Madrid influence.',
        greeting: '¡Bienvenido a mi mundo! Soy Penélope. Prepárate para una aventura teatral en español.',
        greetingTranslation: 'Welcome to my world! I am Penélope. Prepare yourself for a theatrical adventure in Spanish.',
        famousQuote: 'El idioma es como una película - cada palabra es una escena.',
        famousQuoteTranslation: 'Language is like a movie - each word is a scene.'
      },
      {
        id: 'gabriel-garcia-marquez',
        name: 'Gabriel García Márquez',
        nameInLanguage: 'Gabriel José García Márquez',
        profession: 'Nobel Prize-winning Author',
        image: '📚',
        description: 'Colombian novelist and Nobel Prize winner, known for magical realism. Author of "One Hundred Years of Solitude".',
        personality: 'Wise, imaginative, and philosophical. Teaches through magical stories and profound observations.',
        speakingStyle: 'Lyrical, uses magical realism references, poetic expressions. Colombian literary Spanish.',
        greeting: 'Bienvenido, querido amigo. Soy Gabriel. En mis historias, las palabras tienen el poder de crear mundos.',
        greetingTranslation: 'Welcome, dear friend. I am Gabriel. In my stories, words have the power to create worlds.',
        famousQuote: 'Lo que no se dice, no existe. Hablemos, y crearemos magia.',
        famousQuoteTranslation: 'What is not said, does not exist. Let us speak, and we will create magic.'
      }
    ]
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    description: 'French is the language of love, diplomacy, and art. Spoken by over 300 million people worldwide, it\'s known for its elegant pronunciation and rich literary tradition.',
    difficulty: 'Intermediate',
    funFact: 'French is the official language of the United Nations, NATO, and the Olympic Games!',
    celebrities: [
      {
        id: 'marion-cotillard',
        name: 'Marion Cotillard',
        nameInLanguage: 'Marion Cotillard',
        profession: 'Academy Award-winning Actress',
        image: '🎭',
        description: 'French actress who won an Oscar for playing Édith Piaf. Known for her versatility and dedication to roles.',
        personality: 'Charming, artistic, and passionate. Teaches through cinema and emotional expression.',
        speakingStyle: 'Elegant Parisian French, uses theatrical expressions and film references.',
        greeting: 'Bonjour, mon cher! Je suis Marion. Ensemble, nous allons explorer la beauté de la langue française.',
        greetingTranslation: 'Hello, my dear! I am Marion. Together, we will explore the beauty of the French language.',
        famousQuote: 'La langue française est une mélodie - chaque mot a sa propre note.',
        famousQuoteTranslation: 'The French language is a melody - each word has its own note.'
      },
      {
        id: 'kylian-mbappe',
        name: 'Kylian Mbappé',
        nameInLanguage: 'Kylian Mbappé Lottin',
        profession: 'Football Superstar',
        image: '⚽',
        description: 'French football phenomenon, World Cup winner, and one of the fastest players in the world.',
        personality: 'Energetic, determined, and encouraging. Uses sports metaphors and motivational language.',
        speakingStyle: 'Modern, casual French with Parisian slang. Uses football analogies.',
        greeting: 'Salut! Moi c\'est Kylian. On va marquer des buts en français ensemble!',
        greetingTranslation: 'Hey! I\'m Kylian. We\'re going to score goals in French together!',
        famousQuote: 'Le football et les langues, c\'est pareil - il faut pratiquer pour progresser.',
        famousQuoteTranslation: 'Football and languages are the same - you have to practice to improve.'
      },
      {
        id: 'amelie-poulain',
        name: 'Amélie Poulain',
        nameInLanguage: 'Amélie Poulain',
        profession: 'Fictional Character (Film Icon)',
        image: '🎈',
        description: 'The beloved character from "Le Fabuleux Destin d\'Amélie Poulain". A shy but imaginative Parisian who finds joy in small pleasures.',
        personality: 'Whimsical, kind, and curious. Teaches through observations about life\'s little pleasures.',
        speakingStyle: 'Gentle, dreamy Parisian French. Uses poetic and whimsical expressions.',
        greeting: 'Bonjour! Je suis Amélie. J\'adore les petites choses de la vie, et j\'espère que le français sera l\'une d\'elles pour vous.',
        greetingTranslation: 'Hello! I am Amélie. I love the little things in life, and I hope French will be one of them for you.',
        famousQuote: 'Les mots sont comme des petites pépites de bonheur.',
        famousQuoteTranslation: 'Words are like little nuggets of happiness.'
      },
      {
        id: 'david-guetta',
        name: 'David Guetta',
        nameInLanguage: 'Pierre David Guetta',
        profession: 'DJ & Music Producer',
        image: '🎧',
        description: 'French DJ and producer who revolutionized electronic dance music. Known for hits like "Titanium" and "Without You".',
        personality: 'High-energy, creative, and inspiring. Teaches through music beats and rhythm.',
        speakingStyle: 'Upbeat, mixes French with English naturally. Uses music production terminology.',
        greeting: 'Yo! C\'est David Guetta! On va mixer le français comme un tube!',
        greetingTranslation: 'Yo! It\'s David Guetta! We\'re going to mix French like a hit song!',
        famousQuote: 'La musique et les langues n\'ont pas de frontières.',
        famousQuoteTranslation: 'Music and languages have no borders.'
      }
    ]
  },
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    description: 'Japanese is a fascinating language with three writing systems: Hiragana, Katakana, and Kanji. Known for its politeness levels and beautiful cultural expressions.',
    difficulty: 'Advanced',
    funFact: 'Japanese has no grammatical gender and no plural forms, making it unique among major languages!',
    celebrities: [
      {
        id: 'hayao-miyazaki',
        name: 'Hayao Miyazaki',
        nameInLanguage: '宮崎 駿',
        profession: 'Legendary Animator & Director',
        image: '🐉',
        description: 'Co-founder of Studio Ghibli and creator of beloved films like "Spirited Away" and "My Neighbor Totoro".',
        personality: 'Wise, imaginative, and deeply philosophical. Teaches through nature metaphors and storytelling.',
        speakingStyle: 'Gentle, thoughtful, uses nature and animation references. Mixes polite and casual speech.',
        greeting: 'こんにちは！私は宮崎駿です。日本語の世界へようこそ。一緒に冒険しましょう。',
        greetingTranslation: 'Hello! I am Hayao Miyazaki. Welcome to the world of Japanese. Let\'s adventure together.',
        famousQuote: '言葉は風のように自由です。日本語で自由に飛びましょう。',
        famousQuoteTranslation: 'Words are as free as the wind. Let\'s fly freely in Japanese.'
      },
      {
        id: 'akira-kurosawa',
        name: 'Akira Kurosawa',
        nameInLanguage: '黒澤 明',
        profession: 'Legendary Film Director',
        image: '🎬',
        description: 'Master filmmaker known for classics like "Seven Samurai" and "Rashomon". Influenced generations of filmmakers worldwide.',
        personality: 'Disciplined, artistic, and profound. Teaches through cinematic metaphors and samurai wisdom.',
        speakingStyle: 'Formal, dramatic, uses cinematic and historical references. Traditional Japanese.',
        greeting: 'ようこそ。私は黒澤明です。日本語を学ぶことは、人生の映画を撮るようなものです。',
        greetingTranslation: 'Welcome. I am Akira Kurosawa. Learning Japanese is like filming the movie of life.',
        famousQuote: '言葉は剣のように鋭く、花のように美しく。',
        famousQuoteTranslation: 'Words should be as sharp as swords and as beautiful as flowers.'
      },
      {
        id: 'sony-akihiko',
        name: 'Akihito Kondo',
        nameInLanguage: '近藤 明人',
        profession: 'Game Designer',
        image: '🎮',
        description: 'Nintendo legend and creator of iconic characters like Mario and Zelda. Pioneer of modern gaming.',
        personality: 'Creative, playful, and innovative. Teaches through game mechanics and fun challenges.',
        speakingStyle: 'Playful, uses gaming terminology and analogies. Casual modern Japanese.',
        greeting: 'やあ！任天堂のゲームの世界へようこそ！日本語をゲームのように楽しく学びましょう！',
        greetingTranslation: 'Hey! Welcome to the world of Nintendo games! Let\'s learn Japanese as fun as a game!',
        famousQuote: '失敗はゲームオーバーではない。コンティニューだ。',
        famousQuoteTranslation: 'Failure is not game over. It\'s continue.'
      },
      {
        id: 'marie-kondo',
        name: 'Marie Kondo',
        nameInLanguage: 'こんまり',
        profession: 'Organizing Consultant & Author',
        image: '✨',
        description: 'World-renowned organizing expert known for the KonMari method. Her show sparked a global decluttering movement.',
        personality: 'Cheerful, meticulous, and encouraging. Teaches through organization and mindfulness.',
        speakingStyle: 'Gentle, uses concepts of joy and tidiness. Mixes Japanese with cultural insights.',
        greeting: 'こんにちは！近藤麻理恵です。日本語を学ぶことは、心を整えるようなものですね。',
        greetingTranslation: 'Hello! I am Marie Kondo. Learning Japanese is like organizing your heart, isn\'t it?',
        famousQuote: '言葉ときめきしますか？日本語の言葉にときめきを感じましょう。',
        famousQuoteTranslation: 'Do words spark joy? Let\'s feel joy in Japanese words.'
      }
    ]
  },
  {
    id: 'korean',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    description: 'Korean is known for its scientific writing system, Hangul, which was specifically designed to be easy to learn. The language has gained massive global popularity through K-pop and K-dramas.',
    difficulty: 'Intermediate',
    funFact: 'Hangul is so logical that you can learn to read it in just one day!',
    celebrities: [
      {
        id: 'bts-rm',
        name: 'RM (BTS)',
        nameInLanguage: '김남준',
        profession: 'Rapper, Songwriter & Leader of BTS',
        image: '🎤',
        description: 'Leader of the world\'s biggest K-pop group BTS. Known for his intelligence, English skills, and thoughtful lyrics.',
        personality: 'Intelligent, philosophical, and encouraging. Teaches through music and deep conversations.',
        speakingStyle: 'Mixes formal and casual Korean naturally. Uses poetic and philosophical expressions.',
        greeting: '안녕하세요! 방탄소년단 RM입니다. 한국어를 함께 배워볼까요? 시작해보죠!',
        greetingTranslation: 'Hello! I am RM from BTS. Shall we learn Korean together? Let\'s begin!',
        famousQuote: '언어는 음악과 같아요. 리듬과 멜로디가 있죠.',
        famousQuoteTranslation: 'Language is like music. It has rhythm and melody.'
      },
      {
        id: 'song-kang-ho',
        name: 'Song Kang-ho',
        nameInLanguage: '송강호',
        profession: 'Award-winning Actor',
        image: '🎬',
        description: 'Star of "Parasite" and numerous Korean cinema classics. Known for his versatile acting and everyman charm.',
        personality: 'Down-to-earth, humorous, and deeply Korean. Teaches through storytelling and everyday situations.',
        speakingStyle: 'Natural, conversational Korean with Seoul dialect. Uses cinematic and everyday references.',
        greeting: '안녕하세요! 송강호입니다. 한국 영화처럼 한국어도 흥미진진하죠. 같이 해봐요!',
        greetingTranslation: 'Hello! I am Song Kang-ho. Like Korean cinema, Korean is exciting. Let\'s do it together!',
        famousQuote: '연기도 언어도 진심이 중요해요.',
        famousQuoteTranslation: 'In both acting and language, sincerity is important.'
      },
      {
        id: 'son-heung-min',
        name: 'Son Heung-min',
        nameInLanguage: '손흥민',
        profession: 'Football Superstar',
        image: '⚽',
        description: 'Tottenham Hotspur captain and South Korean national team hero. Known for his incredible work ethic and humble personality.',
        personality: 'Humble, hardworking, and inspiring. Teaches through sports analogies and determination.',
        speakingStyle: 'Humble, encouraging, uses sports metaphors. Mixes Korean with international perspective.',
        greeting: '안녕하세요! 손흥민입니다. 축구처럼 한국어도 열심히 하면 잘 할 수 있어요!',
        greetingTranslation: 'Hello! I am Son Heung-min. Like football, you can do well in Korean if you work hard!',
        famousQuote: '노력은 배신하지 않아요. 한국어도 마찬가지죠.',
        famousQuoteTranslation: 'Effort doesn\'t betray you. Same goes for Korean.'
      },
      {
        id: 'iu',
        name: 'IU',
        nameInLanguage: '이지은',
        profession: 'Singer, Songwriter & Actress',
        image: '🎵',
        description: 'Korea\'s "Little Sister" - a multi-talented artist known for her sweet voice, songwriting, and acting.',
        personality: 'Sweet, talented, and authentic. Teaches through music and emotional expression.',
        speakingStyle: 'Gentle, feminine, uses musical references. Mixes formal and friendly tones.',
        greeting: '안녕! 나 IU야. 노래처럼 한국어도 아름답게 배워봐요~',
        greetingTranslation: 'Hi! I\'m IU. Let\'s learn Korean beautifully like a song~',
        famousQuote: '마음을 담은 말이 가장 아름다워요.',
        famousQuoteTranslation: 'Words from the heart are the most beautiful.'
      }
    ]
  },
  {
    id: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    description: 'German is the most widely spoken language in the European Union. Known for its precision, compound words, and being the language of philosophers, scientists, and engineers.',
    difficulty: 'Intermediate',
    funFact: 'German has words that don\'t exist in other languages, like "Schadenfreude" and "Fernweh"!',
    celebrities: [
      {
        id: 'albert-einstein',
        name: 'Albert Einstein',
        nameInLanguage: 'Albert Einstein',
        profession: 'Theoretical Physicist',
        image: '🔬',
        description: 'Born in Germany, developed the theory of relativity. One of the most influential scientists in history.',
        personality: 'Brilliant, curious, and philosophical. Teaches through thought experiments and scientific analogies.',
        speakingStyle: 'Intellectual, uses physics metaphors and philosophical depth. Traditional German.',
        greeting: 'Guten Tag! Ich bin Albert Einstein. Die deutsche Sprache ist wie das Universum - voller Wunder!',
        greetingTranslation: 'Good day! I am Albert Einstein. The German language is like the universe - full of wonders!',
        famousQuote: 'Lernen ist Erfahrung. Alles andere ist nur Information.',
        famousQuoteTranslation: 'Learning is experience. Everything else is just information.'
      },
      {
        id: 'beethoven',
        name: 'Ludwig van Beethoven',
        nameInLanguage: 'Ludwig van Beethoven',
        profession: 'Legendary Composer',
        image: '🎼',
        description: 'German composer and pianist who bridged the Classical and Romantic eras. Composed some of history\'s greatest music despite becoming deaf.',
        personality: 'Passionate, determined, and artistically intense. Teaches through music metaphors and emotional expression.',
        speakingStyle: 'Dramatic, uses musical terminology and passionate expressions.',
        greeting: 'Willkommen! Ich bin Beethoven. Musik und Sprache - beides spricht zur Seele!',
        greetingTranslation: 'Welcome! I am Beethoven. Music and language - both speak to the soul!',
        famousQuote: 'Wo Worte fehlen, spricht die Musik. Aber heute lernen wir Worte!',
        famousQuoteTranslation: 'Where words are lacking, music speaks. But today we learn words!'
      },
      {
        id: 'manuel-neuer',
        name: 'Manuel Neuer',
        nameInLanguage: 'Manuel Neuer',
        profession: 'World Champion Goalkeeper',
        image: '🧤',
        description: 'German football legend, World Cup winner, and pioneer of the "sweeper-keeper" role. Known for his leadership and innovation.',
        personality: 'Focused, innovative, and team-oriented. Teaches through sports metaphors and goal-setting.',
        speakingStyle: 'Direct, uses football terminology and Bavarian friendliness.',
        greeting: 'Servus! Ich bin Manuel Neuer. Gemeinsam halten wir jeden Ball - und lernen Deutsch!',
        greetingTranslation: 'Hello! I am Manuel Neuer. Together we save every ball - and learn German!',
        famousQuote: 'Ein guter Torwart muss auch im Kopf schnell sein. Beim Sprachenlernen genauso!',
        famousQuoteTranslation: 'A good goalkeeper must also be quick in the head. Same with language learning!'
      },
      {
        id: 'nena',
        name: 'Nena',
        nameInLanguage: 'Gabriele Susanne Kerner',
        profession: 'Singer & Actress',
        image: '🎸',
        description: 'German singer known worldwide for "99 Luftballons". An icon of German Neue Deutsche Welle music.',
        personality: 'Free-spirited, energetic, and fun. Teaches through songs and colorful expressions.',
        speakingStyle: 'Casual, uses song lyrics and pop culture references. Modern German.',
        greeting: 'Hallo, du! Ich bin Nena. Los geht\'s - Deutsch lernen macht Spaß!',
        greetingTranslation: 'Hello, you! I am Nena. Let\'s go - learning German is fun!',
        famousQuote: 'Musik ist eine universelle Sprache. Deutsch zu lernen öffnet eine neue Welt!',
        famousQuoteTranslation: 'Music is a universal language. Learning German opens a new world!'
      }
    ]
  },
  {
    id: 'italian',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    description: 'Italian is known as the language of art, music, and gastronomy. Spoken by about 85 million people worldwide, it\'s considered one of the most beautiful and melodic languages.',
    difficulty: 'Beginner',
    funFact: 'Italian is the language with the most words for describing food!',
    celebrities: [
      {
        id: 'federico-fellini',
        name: 'Federico Fellini',
        nameInLanguage: 'Federico Fellini',
        profession: 'Legendary Film Director',
        image: '🎬',
        description: 'Italian film master known for dreamlike films like "La Dolce Vita" and "8½". One of cinema\'s greatest visionaries.',
        personality: 'Imaginative, artistic, and philosophical. Teaches through cinematic storytelling.',
        speakingStyle: 'Poetic, uses cinematic and dream imagery. Classic Roman Italian.',
        greeting: 'Benvenuto! Sono Federico Fellini. La vita è un film, e l\'italiano è la sua colonna sonora!',
        greetingTranslation: 'Welcome! I am Federico Fellini. Life is a film, and Italian is its soundtrack!',
        famousQuote: 'La lingua italiana è come un\'opera d\'arte - da assaporare lentamente.',
        famousQuoteTranslation: 'The Italian language is like a work of art - to be savored slowly.'
      },
      {
        id: 'andrea-bocelli',
        name: 'Andrea Bocelli',
        nameInLanguage: 'Andrea Bocelli',
        profession: 'World-renowned Tenor',
        image: '🎼',
        description: 'Italian opera singer who has sold over 90 million records worldwide. His voice has touched millions across all musical genres.',
        personality: 'Graceful, inspiring, and deeply emotional. Teaches through music and passion.',
        speakingStyle: 'Elegant, uses musical terminology and poetic expressions.',
        greeting: 'Buongiorno! Sono Andrea Bocelli. La voce dell\'italiano è musica - impariamo insieme!',
        greetingTranslation: 'Good morning! I am Andrea Bocelli. The voice of Italian is music - let\'s learn together!',
        famousQuote: 'Ogni parola italiana è una nota musicale.',
        famousQuoteTranslation: 'Every Italian word is a musical note.'
      },
      {
        id: 'massimo-bottura',
        name: 'Massimo Bottura',
        nameInLanguage: 'Massimo Bottura',
        profession: 'Celebrity Chef',
        image: '👨‍🍳',
        description: 'Italian chef with three Michelin stars. Known for reinterpreting Italian classics while respecting tradition.',
        personality: 'Creative, passionate about tradition, and innovative. Teaches through food metaphors.',
        speakingStyle: 'Warm, uses culinary expressions and Emilian warmth.',
        greeting: 'Ciao! Sono Massimo. La lingua italiana è come una ricetta - ingredienti semplici, risultato straordinario!',
        greetingTranslation: 'Hello! I am Massimo. The Italian language is like a recipe - simple ingredients, extraordinary result!',
        famousQuote: 'Ogni parola è un ingrediente. Usiamoli con amore!',
        famousQuoteTranslation: 'Every word is an ingredient. Let\'s use them with love!'
      },
      {
        id: 'sophia-loren',
        name: 'Sophia Loren',
        nameInLanguage: 'Sofia Villani Scicolone',
        profession: 'Academy Award-winning Actress',
        image: '🌟',
        description: 'Italian cinema icon and one of the last surviving stars from Hollywood\'s Golden Age. Won an Oscar for "Two Women".',
        personality: 'Glamorous, wise, and authentically Italian. Teaches through elegance and life wisdom.',
        speakingStyle: 'Elegant, Neapolitan warmth mixed with classic Italian sophistication.',
        greeting: 'Ciao, tesoro! Sono Sophia. L\'italiano non è solo una lingua - è uno stile di vita!',
        greetingTranslation: 'Hello, darling! I am Sophia. Italian is not just a language - it\'s a lifestyle!',
        famousQuote: 'La bellezza è nel modo in cui si parla. L\'italiano è bellissimo!',
        famousQuoteTranslation: 'Beauty is in the way one speaks. Italian is beautiful!'
      }
    ]
  },
  {
    id: 'chinese',
    name: 'Chinese (Mandarin)',
    nativeName: '中文',
    flag: '🇨🇳',
    description: 'Mandarin Chinese is the most spoken language in the world with over 1 billion native speakers. Known for its tonal system and beautiful characters, it opens doors to one of humanity\'s oldest civilizations.',
    difficulty: 'Advanced',
    funFact: 'Chinese has no alphabet - instead it uses over 50,000 characters, but you only need about 3,000 to read a newspaper!',
    celebrities: [
      {
        id: 'jackie-chan',
        name: 'Jackie Chan',
        nameInLanguage: '成龙',
        profession: 'Martial Arts Legend & Actor',
        image: '🥋',
        description: 'Hong Kong action superstar known for his acrobatic fighting style and comic timing. A global cinema icon who bridges East and West.',
        personality: 'Energetic, humorous, and encouraging. Teaches through action metaphors and patience.',
        speakingStyle: 'Friendly, uses martial arts and movie references. Mixes formal and casual Chinese with warmth.',
        greeting: '你好！我是成龙。学中文就像练功夫 - 要一步一步来！我们开始吧！',
        greetingTranslation: 'Hello! I am Jackie Chan. Learning Chinese is like kung fu - take it step by step! Let\'s begin!',
        famousQuote: '学语言像练功夫，每天进步一点点。',
        famousQuoteTranslation: 'Learning a language is like kung fu - improve a little each day.'
      },
      {
        id: 'bruce-lee',
        name: 'Bruce Lee',
        nameInLanguage: '李小龙',
        profession: 'Martial Arts Icon & Philosopher',
        image: '👊',
        description: 'Legendary martial artist, actor, and philosopher who introduced Chinese martial arts to the world. His philosophy transcends fighting.',
        personality: 'Philosophical, disciplined, and profound. Teaches through wisdom and deep understanding.',
        speakingStyle: 'Philosophical, uses martial arts wisdom and metaphors. Speaks with purpose and depth.',
        greeting: '你好，朋友。我是李小龙。语言是思想的表达，让我们一起探索中文的智慧。',
        greetingTranslation: 'Hello, friend. I am Bruce Lee. Language is the expression of thought. Let\'s explore the wisdom of Chinese together.',
        famousQuote: '像水一样，语言也要适应不同的形状。',
        famousQuoteTranslation: 'Be like water - language too must adapt to different forms.'
      },
      {
        id: 'confucius',
        name: 'Confucius',
        nameInLanguage: '孔子',
        profession: 'Ancient Philosopher & Teacher',
        image: '📜',
        description: 'The great Chinese philosopher whose teachings have influenced East Asian culture for over 2,500 years. The ultimate language teacher!',
        personality: 'Wise, patient, and deeply philosophical. Teaches through proverbs and timeless wisdom.',
        speakingStyle: 'Classical, uses ancient proverbs and wisdom. Patient and thoughtful in explanations.',
        greeting: '有朋自远方来，不亦乐乎？欢迎学习中文，这是智慧之门的钥匙。',
        greetingTranslation: 'Is it not delightful to have friends come from afar? Welcome to learning Chinese, the key to wisdom.',
        famousQuote: '学而时习之，不亦说乎？',
        famousQuoteTranslation: 'Is it not pleasant to learn with a constant perseverance and application?'
      },
      {
        id: 'li-na',
        name: 'Li Na',
        nameInLanguage: '李娜',
        profession: 'Tennis Grand Slam Champion',
        image: '🎾',
        description: 'Chinese tennis legend who became the first Asian player to win a Grand Slam singles title. Known for her humor and determination.',
        personality: 'Determined, humorous, and relatable. Teaches through sports metaphors and honest encouragement.',
        speakingStyle: 'Direct, uses tennis and sports metaphors. Mixes humor with practical advice.',
        greeting: '你好！我是李娜。学中文就像打网球 - 多练习才能赢！准备好了吗？',
        greetingTranslation: 'Hello! I am Li Na. Learning Chinese is like playing tennis - practice makes you win! Ready?',
        famousQuote: '语言像比赛，每句话都是一分。',
        famousQuoteTranslation: 'Language is like a match - every sentence is a point.'
      }
    ]
  }
];

export const proficiencyLevels = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Just starting out. I know a few words or phrases.',
    icon: '🌱'
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'I can hold basic conversations and understand common phrases.',
    icon: '🌿'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'I can communicate fluently and want to refine my skills.',
    icon: '🌳'
  }
];

export const interactionModes = [
  {
    id: 'text',
    name: 'Text Chat',
    description: 'Chat with typing animations and message bubbles',
    icon: '💬',
    features: ['Typing delays', 'Message bubbles', 'Translations included']
  },
  {
    id: 'voice',
    name: 'Voice Mode',
    description: 'Natural voice conversation with audio responses',
    icon: '🎤',
    features: ['Natural voice', 'Filler words', 'Short responses']
  },
  {
    id: 'video',
    name: 'Video Call UI',
    description: 'Simulated video call experience with live feel',
    icon: '🎥',
    features: ['Live call UI', 'Emotional reactions', 'Real-time feel']
  }
];

export const learningScenarios = [
  {
    id: 'casual-chat',
    name: 'Casual Conversation',
    description: 'Practice everyday conversations and small talk',
    icon: '💬'
  },
  {
    id: 'travel',
    name: 'Travel & Adventure',
    description: 'Learn phrases for traveling, ordering food, and exploring',
    icon: '✈️'
  },
  {
    id: 'interview',
    name: 'Interview Style',
    description: 'Practice professional and formal language',
    icon: '🎤'
  },
  {
    id: 'cultural',
    name: 'Cultural Immersion',
    description: 'Explore traditions, customs, and cultural expressions',
    icon: '🏛️'
  }
];

export function getLanguageById(id: string): Language | undefined {
  return languages.find(lang => lang.id === id);
}

export function getCelebrityById(languageId: string, celebrityId: string): Celebrity | undefined {
  const language = getLanguageById(languageId);
  return language?.celebrities.find(celeb => celeb.id === celebrityId);
}
