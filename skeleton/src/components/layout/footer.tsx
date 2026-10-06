import { ShoppingBag } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <ShoppingBag aria-hidden="true" className="size-5 text-primary" />
          Kramik
        </a>
        <p>
          Product data from{' '}
          <a
            href="https://dummyjson.com"
            className="underline underline-offset-4 hover:text-foreground"
          >
            DummyJSON
          </a>
          . This is a learning project, not a real shop.
        </p>
      </div>
    </footer>
  )
}
