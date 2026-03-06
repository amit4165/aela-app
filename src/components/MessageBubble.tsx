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
                {content.split('\n').map((line, i) => (
                    <span key={i}>
                        {line}
                        {i < content.split('\n').length - 1 && <br />}
                    </span>
                ))}
            </div>
        </div>
    )
}
