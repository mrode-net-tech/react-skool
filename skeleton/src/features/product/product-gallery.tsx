// Static markup. You will replace the hardcoded values with props in lesson 1.2.
export function ProductGallery() {
  return (
    <div className="grid gap-4">
      <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
        <img
          src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
          alt="Essence Mascara Lash Princess"
          width={600}
          height={600}
          className="size-full object-contain p-6"
        />
      </div>
      <ul className="flex gap-3" aria-label="Product images">
        <li>
          <button
            type="button"
            aria-current="true"
            aria-label="Show image 1"
            className="size-20 overflow-hidden rounded-md border-2 border-primary bg-muted"
          >
            <img
              src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
              alt=""
              width={80}
              height={80}
              className="size-full object-contain p-1"
            />
          </button>
        </li>
      </ul>
    </div>
  )
}
