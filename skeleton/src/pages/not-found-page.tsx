// Static page. It becomes the catch-all "*" route in lesson 2.1.
import { buttonClasses } from '@/components/ui/button-classes'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist or was moved.
      </p>
      <a href="/" className={buttonClasses({ className: 'mt-2' })}>
        Back to the home page
      </a>
    </div>
  )
}
