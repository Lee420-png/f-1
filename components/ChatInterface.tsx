import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { createLuffyChatSession } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { MessageRole } from '../types';
import { INTRO_MESSAGE, API_KEY_ERROR_MESSAGE } from '../constants';
import Message from './Message';
import ChatInput from './ChatInput';
import PredefinedQuestions from './PredefinedQuestions';

const ChatInterface: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showQuestions, setShowQuestions] = useState<boolean>(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const chatSession = createLuffyChatSession();
            setChat(chatSession);
            setMessages([{ role: MessageRole.MODEL, content: INTRO_MESSAGE }]);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            // Fix: Updated the error check to catch the new error thrown by the service
            // when the API_KEY environment variable is missing.
            if (errorMessage.includes("API key is not configured")) {
                setError(API_KEY_ERROR_MESSAGE);
                setMessages([{ role: MessageRole.MODEL, content: API_KEY_ERROR_MESSAGE }]);
            } else {
                const genericError = "Oi! My Den Den Mushi is broken! Something went wrong when starting our adventure.";
                setError(genericError);
                setMessages([{ role: MessageRole.MODEL, content: genericError }]);
            }
            console.error(e);
        }
    }, []);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (input: string) => {
        if (!chat || isLoading || !input.trim() || error) return;

        setShowQuestions(false); // Hide questions on first message

        const userMessage: ChatMessage = { role: MessageRole.USER, content: input };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const stream = await chat.sendMessageStream({ message: input });
            let modelResponse = '';
            setMessages(prev => [...prev, { role: MessageRole.MODEL, content: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = modelResponse;
                    return newMessages;
                });
            }
        } catch (e) {
            const errorMessage = "Oi! Something went wrong with my Den Den Mushi! Try asking again.";
            setMessages(prev => {
                 const newMessages = [...prev];
                 if(newMessages[newMessages.length -1].role === MessageRole.MODEL && newMessages[newMessages.length -1].content === ''){
                    newMessages.pop();
                 }
                 return [...newMessages, { role: MessageRole.MODEL, content: errorMessage }];
            });
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-[#1B263B]/60 backdrop-blur-sm border border-amber-400/30 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden">
            <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
                {messages.map((msg, index) => (
                    <Message key={index} message={msg} />
                ))}
                {isLoading && messages[messages.length-1].role === MessageRole.USER && (
                     <Message message={{role: MessageRole.MODEL, content: ''}} isLoading={true} />
                )}
                <div ref={messagesEndRef} />
            </div>
            {showQuestions && <PredefinedQuestions onQuestionClick={handleSendMessage} disabled={!!error} />}
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} disabled={!!error} />
        </div>
    );
};

export default ChatInterface;