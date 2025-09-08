import React from 'react';
import { PREDEFINED_QUESTIONS } from '../constants';
import { CompassIcon } from './Icons';

interface PredefinedQuestionsProps {
    onQuestionClick: (question: string) => void;
    disabled?: boolean;
}

const PredefinedQuestions: React.FC<PredefinedQuestionsProps> = ({ onQuestionClick, disabled = false }) => {
    return (
        <div className="p-4 border-t border-amber-400/30 animate-slide-in-bottom">
            <h3 className="text-sm font-medium text-amber-300 mb-3 text-center" style={{fontFamily: "'Pirata One', cursive", fontSize: '1.2rem'}}>Chart Your Course!</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PREDEFINED_QUESTIONS.map((question, index) => (
                    <button
                        key={index}
                        onClick={() => onQuestionClick(question)}
                        disabled={disabled}
                        className="flex items-center text-left p-3 border border-amber-500/20 bg-slate-800/50 hover:bg-amber-500/10 transition-colors duration-200 rounded-lg text-slate-200 text-sm group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-slate-800/50"
                        aria-label={`Ask: ${question}`}
                    >
                        <CompassIcon />
                        <span className="ml-3 group-hover:text-amber-300 transition-colors group-disabled:text-slate-200">{question}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PredefinedQuestions;