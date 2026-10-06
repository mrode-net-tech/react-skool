// Static markup. The numbers come from the API response in lesson 3.5.
export function CatalogToolbar() {
  return (
    <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>
        Showing <span className="font-medium text-foreground">1–12</span> of{' '}
        <span className="font-medium text-foreground">194</span> products
      </p>
    </div>
  )
}
