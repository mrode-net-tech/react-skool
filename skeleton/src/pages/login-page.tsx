// Static page. It becomes the "/login" route in lesson 9.7.
import { LoginForm } from '@/features/auth/login-form'

export function LoginPage() {
  return (
    <div className="flex justify-center py-12">
      <LoginForm />
    </div>
  )
}
