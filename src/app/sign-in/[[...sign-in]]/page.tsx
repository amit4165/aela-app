import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className="auth-split">
            {/* Left — hero image */}
            <div className="auth-split-image">
                <div className="auth-split-image-overlay" />
                <div className="auth-split-brand">
                    <span className="auth-split-logo">Aela</span>
                    <p className="auth-split-tagline">Your world. Your journey.</p>
                </div>
            </div>

            {/* Right — sign-in card */}
            <div className="auth-split-form">
                <SignIn />
            </div>
        </div>
    )
}
