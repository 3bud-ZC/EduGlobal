
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { askAiAssistant, fastAiChat } from '../services/geminiService';
import { SCHOLARSHIPS } from '../constants';
import { MessageSquare, Send, X, Sparkles, User, Bot, Loader2, Zap, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  mode?: 'pro' | 'flash';
}

interface Props {
  forceOpen?: boolean;
  onClose?: () => void;
}

const AiAssistant: React.FC<Props> = ({ forceOpen, onClose }) => {
  const { t, isRtl, user } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState<'pro' | 'flash'>('flash');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: isRtl 
        ? `مرحباً ${user?.name || ''}! أنا مساعدك الأكاديمي. هل يمكنني مساعدتك في العثور على منحة دراسية اليوم؟`
        : `Hello ${user?.name || ''}! I'm your Academic Advisor. How can I help you navigate global scholarships today?`,
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceOpen) setIsOpen(true);
  }, [forceOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const messageText = customText || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const scholarshipContext = `Available Scholarships: ${JSON.stringify(SCHOLARSHIPS.map(s => s.titleEn))}`;
    const userContext = `User: ${user?.name}, Nationality: ${user?.nationality}, Field: ${user?.studyField}. ${scholarshipContext}`;
    
    let responseText: string | undefined;
    if (chatMode === 'pro') {
      responseText = await askAiAssistant(messageText, userContext);
    } else {
      responseText = await fastAiChat(messageText, userContext);
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText || (isRtl ? "عذراً، حدث خطأ ما." : "Sorry, I encountered an error."),
      sender: 'bot',
      timestamp: new Date(),
      mode: chatMode
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const suggestions = isRtl 
    ? ["ما هي متطلبات منحة أكسفورد؟", "ساعدني في كتابة خطاب الغرض", "أرخص دول للدراسة"]
    : ["Oxford Scholarship requirements?", "Help with my SOP", "Best STEM scholarships"];

  const handleToggle = () => {
    if (isOpen && onClose) onClose();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] sm:w-[450px] h-[600px] bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(79,70,229,0.4)] border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-8 flex flex-col gap-6 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                    <BrainCircuit size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg leading-tight">{isRtl ? 'المستشار الذكي' : 'Senior AI Advisor'}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                       <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                       <p className="text-[10px] text-indigo-100 uppercase tracking-widest font-black">
                         {chatMode === 'pro' ? 'Gemini 3 Pro Active' : 'Gemini Flash Lite Active'}
                       </p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleToggle}
                  className="p-3 hover:bg-white/10 rounded-2xl transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mode Selector */}
              <div className="flex bg-indigo-700/50 p-1.5 rounded-2xl relative z-10">
                <button
                  onClick={() => setChatMode('flash')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all ${chatMode === 'flash' ? 'bg-white text-indigo-600 shadow-xl' : 'text-indigo-100 hover:bg-indigo-600/50'}`}
                >
                  <Zap size={14} />
                  {isRtl ? 'سريع' : 'Fast'}
                </button>
                <button
                  onClick={() => setChatMode('pro')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all ${chatMode === 'pro' ? 'bg-white text-indigo-600 shadow-xl' : 'text-indigo-100 hover:bg-indigo-600/50'}`}
                >
                  <Sparkles size={14} />
                  {isRtl ? 'احترافي' : 'Expert'}
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar bg-slate-50 dark:bg-slate-950/50"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border ${msg.sender === 'user' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700'}`}>
                      {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                    </div>
                    <div>
                      <div className={`p-5 rounded-3xl text-sm leading-relaxed shadow-sm font-medium ${
                        msg.sender === 'user' 
                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-100 dark:border-slate-700">
                      <Bot size={20} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
                      <Loader2 size={18} className="animate-spin text-indigo-600" />
                      <span className="text-xs text-slate-400 font-black uppercase tracking-widest">
                        {chatMode === 'flash' ? 'Response imminent...' : 'Reviewing data...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions & Input Area */}
            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(s)}
                    className="whitespace-nowrap px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isRtl ? 'اسأل أي شيء...' : 'Ask me anything...'}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-600 rounded-[1.5rem] py-4 pl-6 pr-14 text-sm font-bold text-slate-900 dark:text-white transition-all shadow-inner"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading}
                  className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all ${isLoading ? 'opacity-50' : 'shadow-lg shadow-indigo-600/20'}`}
                >
                  <ArrowRight size={20} className={isRtl ? 'rotate-180' : ''} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(79,70,229,0.5)] flex items-center justify-center transition-all hover:bg-indigo-700 relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? <X size={32} /> : (
          <div className="relative">
            <Sparkles size={32} className="animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-indigo-600 shadow-sm"></div>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AiAssistant;
