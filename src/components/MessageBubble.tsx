import ReactMarkdown from 'react-markdown'

interface MessageBubbleProps {
    role: 'user' | 'ai'
    content: string
    userInitial?: string
}

export default function MessageBubble({ role, content, userInitial = 'U' }: MessageBubbleProps) {
    return (
        <div className={`message message-${role}`}>
            <div className="message-avatar">
                {role === 'ai' ? '✦' : userInitial}
            </div>
            <div className="message-bubble">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    )
}
