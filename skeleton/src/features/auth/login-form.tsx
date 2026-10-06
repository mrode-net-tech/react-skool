// Static markup. Login is wired in lesson 9.7.
import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  return (
    <div className="w-full max-w-sm rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-6 grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">Use a DummyJSON test account.</p>
      </div>

      {/* Shown after a failed login:
      <Alert variant="destructive" title="Could not sign in" className="mb-4">
        Invalid username or password.
      </Alert> */}

      <form className="grid gap-4" noValidate>
        <Field label="Username" htmlFor="username">
          <Input id="username" name="username" autoComplete="username" />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input id="password" name="password" type="password" autoComplete="current-password" />
        </Field>
        <Button type="submit" className="w-full">
          <LogIn />
          Sign in
        </Button>
      </form>

      <p className="mt-6 rounded-md bg-muted p-3 text-xs text-muted-foreground">
        Test account: <code className="font-mono text-foreground">emilys</code> /{' '}
        <code className="font-mono text-foreground">emilyspass</code>
      </p>
    </div>
  )
}
