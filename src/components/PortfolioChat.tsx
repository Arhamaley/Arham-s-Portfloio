import { useEffect, useRef, useState } from 'react';
import { Check, Copy, MessageSquare, RotateCcw, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

type ChatMode = 'general' | 'quick';

const STARTER_PROMPTS = [
  "What is Arham's tech stack?",
  'Tell me about the Forma Design System',
  'How does he approach accessibility?',
];

export function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<ChatMode>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const threadEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        requestAnimationFrame(() => {
          toggleButtonRef.current?.focus();
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInputValue('');
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          messages: nextHistory.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) {
        throw new Error(data.error || 'Unable to get a response right now.');
      }

      const assistantMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error
          ? error.message
          : 'Unable to reach the assistant right now.';
      setErrorMessage(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyReply = async (msg: ChatMessage) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(msg.text);
      }
      setCopiedMessageId(msg.id);
      window.setTimeout(() => {
        setCopiedMessageId((curr) => (curr === msg.id ? null : curr));
      }, 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(inputValue);
  };

  const handleReset = () => {
    setMessages([]);
    setErrorMessage(null);
    inputRef.current?.focus();
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Open portfolio assistant chat"
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 items-center gap-2 rounded-xl border border-[#232732] bg-[#13161C]/95 px-4 text-sm font-medium text-[#F4F5F7] shadow-lg backdrop-blur-md transition-colors duration-150 hover:border-[#60A5FA] hover:text-[#60A5FA] whitespace-nowrap cursor-pointer"
        >
          <MessageSquare className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
          <span>Ask Assistant</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="portfolio-chat-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 flex h-[min(560px,calc(100vh-3rem))] w-[min(410px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#232732] bg-[#13161C] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[#232732] bg-[#0E1015] px-4 py-3.5">
              <div className="min-w-0">
                <h2
                  id="portfolio-chat-title"
                  className="font-display text-sm font-semibold tracking-tight text-[#F4F5F7] truncate"
                >
                  Portfolio Assistant
                </h2>
                <p className="text-xs text-[#9CA3AF] truncate">
                  Ask about Arham&apos;s projects, stack &amp; UX work
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    aria-label="Clear conversation history"
                    title="Clear conversation"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#232732] bg-[#13161C] text-[#9CA3AF] transition-colors duration-150 hover:border-[#313644] hover:text-[#F4F5F7] cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    requestAnimationFrame(() => {
                      toggleButtonRef.current?.focus();
                    });
                  }}
                  aria-label="Close portfolio assistant"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#232732] bg-[#13161C] text-[#F4F5F7] transition-colors duration-150 hover:border-[#313644] hover:bg-[#1A1E26] cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Model Speed Selector */}
            <div className="flex items-center justify-between gap-3 border-b border-[#232732] bg-[#090A0D] px-4 py-2">
              <span className="text-xs text-[#9CA3AF]">Response mode</span>
              <div
                role="group"
                aria-label="Assistant response mode"
                className="flex items-center gap-1 rounded-lg border border-[#232732] bg-[#13161C] p-0.5"
              >
                {(['general', 'quick'] as const).map((option) => {
                  const isActive = mode === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setMode(option)}
                      className={`relative rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-[#9CA3AF] hover:text-[#F4F5F7]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="chat-mode-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          aria-hidden="true"
                          className="absolute inset-0 rounded-md bg-[#2563EB]"
                        />
                      )}
                      <span className="relative z-10">
                        {option === 'general' ? 'Balanced' : 'Fast'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Thread */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
              aria-live="polite"
            >
              {messages.length === 0 ? (
                <div className="space-y-4 py-2">
                  <p className="text-sm leading-relaxed text-[#9CA3AF]">
                    Ask anything about Arham Ali&apos;s four years across full-stack web
                    engineering, UI/UX systems, graphic design, or accessibility standards.
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[#9CA3AF]">Suggested questions</p>
                    <div className="flex flex-col gap-2">
                      {STARTER_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => void sendMessage(prompt)}
                          className="rounded-xl border border-[#232732] bg-[#0E1015] px-3.5 py-2.5 text-left text-xs font-medium text-[#F4F5F7] transition-colors duration-150 hover:border-[#60A5FA]/70 hover:bg-[#1A1E26] cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-[11px] font-medium text-[#9CA3AF]">
                        {msg.role === 'user' ? 'You' : 'Assistant'}
                      </span>
                      {msg.role === 'model' && (
                        <button
                          type="button"
                          onClick={() => void handleCopyReply(msg)}
                          aria-label="Copy assistant response"
                          className="inline-flex items-center gap-1 text-[11px] text-[#6B7280] transition-colors duration-150 hover:text-[#60A5FA] cursor-pointer"
                        >
                          {copiedMessageId === msg.id ? (
                            <>
                              <Check className="h-3 w-3 text-[#60A5FA]" aria-hidden="true" />
                              <span className="text-[#60A5FA]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" aria-hidden="true" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-[#2563EB] text-white font-medium'
                          : 'border border-[#232732] bg-[#0E1015] text-[#F4F5F7]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))
              )}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <span className="mb-1 text-[11px] font-medium text-[#9CA3AF]">
                    Assistant
                  </span>
                  <div className="rounded-2xl border border-[#232732] bg-[#0E1015] px-3.5 py-2.5 text-sm text-[#9CA3AF]">
                    Thinking...
                  </div>
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-xl border border-[#E11D48]/40 bg-[#E11D48]/10 px-3.5 py-2.5 text-xs text-[#FCA5A5]"
                >
                  {errorMessage}
                </div>
              )}

              <div ref={threadEndRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-[#232732] bg-[#0E1015] p-3"
            >
              <label htmlFor="portfolio-chat-input" className="sr-only">
                Ask a question about Arham Ali&apos;s portfolio
              </label>
              <input
                ref={inputRef}
                id="portfolio-chat-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about projects, stack, or availability..."
                disabled={isLoading}
                className="min-h-[42px] flex-1 rounded-lg border border-[#232732] bg-[#13161C] px-3.5 py-2 text-sm text-[#F4F5F7] placeholder:text-[#6B7280] focus:border-[#60A5FA] focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || inputValue.trim().length === 0}
                aria-label="Send message"
                className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-[#2563EB] text-white transition-colors duration-150 hover:bg-[#3B82F6] disabled:cursor-not-allowed disabled:opacity-45 shrink-0 cursor-pointer"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
