import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className="clerk-auth-wrapper">
            <SignIn />
        </div>
    )
}
