import React from 'react';
import type { ChatMessage } from '../types';
import { MessageRole } from '../types';
import { UserIcon, LuffyIcon } from './Icons';

interface MessageProps {
  message: ChatMessage;
  isLoading?: boolean;
}

const LoadingDots: React.FC = () => (
    <div className="flex space-x-1.5 items-center">
        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
    </div>
);

// Helper component to find and render links and markdown in text
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
    // Regex to match URLs (http, https, www), email addresses, and markdown bold (**text**)
    const formattingRegex = /(\bhttps?:\/\/[^\s]+|\bwww\.[^\s]+|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b)|\*\*(.*?)\*\*/gi;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Create a new RegExp object for each call to avoid issues with `lastIndex`
    const regex = new RegExp(formattingRegex.source, 'gi');
    let match;

    while ((match = regex.exec(text)) !== null) {
        // 1. Add the plain text part before the match
        if (match.index > lastIndex) {
            elements.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>);
        }

        // 2. Add the formatted part (link or bold)
        const [fullMatch, linkMatch, boldContent] = match;

        if (linkMatch) {
            const isEmail = /@/.test(linkMatch);
            let href = linkMatch;
            if (isEmail) href = `mailto:${linkMatch}`;
            else if (linkMatch.startsWith('www.')) href = `https://` + linkMatch;
            elements.push(
                <a key={`link-${match.index}`} href={href} target="_blank" rel="noopener noreferrer" className="text-amber-300 underline hover:text-amber-200 transition-colors">
                    {linkMatch}
                </a>
            );
        } else if (boldContent !== undefined) {
            elements.push(
                <strong key={`bold-${match.index}`} className="font-semibold text-slate-100">
                    {boldContent}
                </strong>
            );
        }
        
        lastIndex = regex.lastIndex;
    }

    // 3. Add any remaining plain text after the last match
    if (lastIndex < text.length) {
        elements.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>);
    }

    return <>{elements}</>;
};


const Message: React.FC<MessageProps> = ({ message, isLoading = false }) => {
    const isModel = message.role === MessageRole.MODEL;

    const containerClasses = isModel
        ? 'flex items-end gap-3 justify-start'
        : 'flex items-end gap-3 justify-end';
    
    // Refined bubble styles with gradients and speech-bubble tails (via border-radius)
    const bubbleClasses = isModel
        ? 'bg-gradient-to-br from-sky-500 to-sky-700 rounded-tr-xl rounded-br-xl rounded-tl-xl' // Sharp bottom-left corner
        : 'bg-gradient-to-br from-slate-600 to-slate-800 rounded-tl-xl rounded-bl-xl rounded-br-xl'; // Sharp top-right corner, changed for style

    // Apply different animations based on the sender
    const animationClass = isModel ? 'animate-pop-in' : 'animate-slide-in-bottom';

    const avatar = isModel ? <LuffyIcon /> : <UserIcon />;
    const name = isModel ? "Luffy" : "Nakama";

    return (
        <div className={`${containerClasses} ${animationClass}`}>
            {isModel && <div className="w-10 h-10 flex-shrink-0 mb-4">{avatar}</div>}
            <div className={`flex flex-col space-y-1 max-w-md ${isModel ? 'items-start' : 'items-end'}`}>
                 <span className="text-xs text-slate-400 font-medium px-2">{name}</span>
                 <div className={`px-4 py-3 text-slate-200 shadow-lg ${bubbleClasses}`}>
                    {isLoading ? <LoadingDots /> : message.content.split('\n').map((line, i) => (
                        <p key={i} className="whitespace-pre-wrap break-words">
                            {line ? <FormattedText text={line} /> : '\u00A0'}
                        </p>
                    ))}
                 </div>
            </div>
            {!isModel && <div className="w-10 h-10 flex-shrink-0 mb-4">{avatar}</div>}
        </div>
    );
};

export default Message;