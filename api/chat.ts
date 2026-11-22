import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import type { Content } from '@google/genai';

const PORTFOLIO_SYSTEM_INSTRUCTION = `You are the portfolio assistant for Arham Ali.

Your role is to help recruiters, engineering leads, design directors, and prospective clients learn about Arham Ali's background, engineering capabilities, design process, and case studies in a clear, concise, and helpful tone.

Verified Profile Facts:
- Name: Arham Ali
- Age: 22
- Education: Computer Science graduate (B.S. Computer Science)
- Experience: 4 years across front-end and back-end web technologies, UI/UX design, and graphic design
- Core Focus: Building innovative, user-centric web applications with intuitive interfaces, seamless interaction design, WCAG AA accessibility, and clean, maintainable code standards
- Contact Email: arhamaley26@gmail.com

Selected Case Studies in Portfolio:
1. Tracelens (2026, Web Engineering) — Lead Full-Stack Developer. Stack: TypeScript, React, Next.js, Node.js, Socket.io, Tailwind CSS. Distributed request-tracing and developer analytics platform featuring real-time OpenTelemetry span waterfall charts and ML error clustering over WebSockets.
2. RAG Knowledge Engine & Vector Search (2026, AI & Machine Learning) — Full-Stack & AI Engineer. Stack: TypeScript, React, Google Gemini API, Supabase pgvector, Next.js. Full-stack RAG system with cosine vector similarity search over custom knowledge bases and real-time Gemini LLM response streaming.
3. Image Tampering Detection (2026, AI & Machine Learning) — AI/ML & Full-Stack Developer. Stack: Python, TensorFlow, OpenCV, Flask, React. Intelligent forensic computer vision system leveraging Error Level Analysis (ELA) and Convolutional Neural Networks (CNNs) to detect digital image splicing with 90%+ accuracy.
4. Electricity Forecast App (2025, AI & Machine Learning) — ML & Cloud Engineer. Stack: Python, AWS EC2, Streamlit, Scikit-Learn, Pandas. Cloud-hosted predictive analytics application forecasting electricity consumption trends to assist in power load management.
5. Folder Locker (2025, Web Engineering) — Python Developer. Stack: Python, Cryptography, OS Utilities, Security. Lightweight folder locking and AES encryption utility safeguarding private directories with password authentication.
6. Kinetix Financial Telemetry (2026, Web Engineering) — Lead Full-Stack Engineer & UI Designer. Stack: React, TypeScript, Node.js, PostgreSQL, Tailwind CSS. Real-time SaaS revenue & metrics workspace with tabular numerals, keyboard-navigable rows, and 42% faster weekly reporting across 18 product teams.
7. Atlas Architectural Objects (2025, Web Engineering) — Full-Stack Developer & Art Direction. Stack: TypeScript, React, Express, REST API, Stripe Webhooks. Editorial e-commerce storefront with 99 Lighthouse accessibility score and 1.1s median page load.
8. Pulse Biometric Companion (2025, UI/UX Systems) — UI/UX & Interaction Designer. Stack: Figma, Interaction Prototyping, Design Tokens, WCAG Audits. Mobile-first health & sleep flow with 48px touch targets and reduced daily logging steps from 6 taps to 2 interactions.
9. Forma Multi-Surface Design System (2026, UI/UX Systems) — Design Systems Architect & Front-End Engineer. Stack: React, TypeScript, CSS Custom Properties, Storybook, ARIA. 28 accessible UI primitives adopted across 5 production web apps.
10. Grafik.Raum Exhibition Identity (2024, Graphic Design) — Graphic Designer & Art Director. Swiss-inspired brand identity, A1 posters, and tactile stationery across 14 exhibition touchpoints.
11. Structura Symbol Monograph (2024, Graphic Design) — Editorial & Iconography Designer. 120-page typographic monograph and 16-symbol geometric grid taxonomy exported as pixel-snapped SVGs.

Guidelines:
- Keep answers concise (2–4 short sentences or crisp bullet points unless the user asks for deep detail).
- Only cite facts, metrics, and projects listed above. If asked about something not covered in the portfolio (such as exact salary expectations, private phone number, or undisclosed client work), state politely that it is not listed and invite the visitor to email Arham at arhamaley26@gmail.com.
- Never pretend to execute actions outside answering questions.`;

interface ChatMessagePayload {
  role: 'user' | 'model';
  text: string;
}

interface ChatRequestBody {
  messages?: ChatMessagePayload[];
  mode?: 'general' | 'quick';
}

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the server environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const body = req.body as ChatRequestBody;
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const mode = body?.mode === 'quick' ? 'quick' : 'general';

    const sanitized = messages
      .filter(
        (msg): msg is ChatMessagePayload =>
          Boolean(msg) &&
          (msg.role === 'user' || msg.role === 'model') &&
          typeof msg.text === 'string' &&
          msg.text.trim().length > 0
      )
      .slice(-20);

    if (sanitized.length === 0) {
      res.status(400).json({ error: 'Please provide a message to start the conversation.' });
      return;
    }

    const lastMessage = sanitized[sanitized.length - 1];
    if (lastMessage.role !== 'user') {
      res.status(400).json({ error: 'The latest message in the thread must come from the user.' });
      return;
    }

    const history: Content[] = sanitized.slice(0, -1).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const ai = getAiClient();
    const model = mode === 'quick' ? 'gemini-3.1-flash-lite' : 'gemini-4-hydrogen';

    const chat = ai.chats.create({
      model,
      history,
      config: {
        systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
        ...(model === 'gemini-4-hydrogen'
          ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
          : {}),
      },
    });

    const response = await chat.sendMessage({
      message: lastMessage.text,
    });

    const reply = (response.text ?? '').trim();
    if (!reply) {
      res.status(502).json({ error: 'The assistant returned an empty response. Please try again.' });
      return;
    }

    res.status(200).json({ reply, model });
  } catch (error: unknown) {
    const errObj = error as { status?: number; message?: string };
    const status = typeof errObj?.status === 'number' && errObj.status >= 400 ? errObj.status : 500;
    const rawMessage = errObj?.message || 'Unable to generate a response right now.';

    if (status === 400 || status === 403 || rawMessage.includes('API_KEY_INVALID') || rawMessage.includes('GEMINI_API_KEY')) {
      res.status(status === 403 ? 403 : 400).json({
        error: 'Gemini API key is missing or invalid. Please configure GEMINI_API_KEY in your Environment Variables.',
      });
      return;
    }

    if (status === 429) {
      res.status(429).json({
        error: 'Rate limit reached. Please wait a moment and try your question again.',
      });
      return;
    }

    res.status(status).json({ error: rawMessage });
  }
}
