import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './Icons';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, disabled = false }) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [input]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading && !disabled) {
            onSendMessage(input);
            setInput('');
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    const isEffectivelyDisabled = isLoading || disabled;

    return (
        <form onSubmit={handleSubmit} className="p-2 sm:p-4 bg-[#0D1B2A]/50 border-t border-amber-400/30">
            <div className="flex items-end bg-slate-800 rounded-xl p-2 gap-2">
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={disabled ? "My Den Den Mushi isn't working..." : "Ask about Lincoln's adventure..."}
                    disabled={isEffectivelyDisabled}
                    className="w-full max-h-40 bg-transparent focus:outline-none text-slate-100 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                    rows={1}
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={isEffectivelyDisabled || !input.trim()}
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-amber-500 rounded-full text-slate-900 hover:bg-amber-400 transition-colors duration-200 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
                    aria-label="Send message"
                >
                    <SendIcon />
                </button>
            </div>
        </form>
    );
};

export default ChatInput;