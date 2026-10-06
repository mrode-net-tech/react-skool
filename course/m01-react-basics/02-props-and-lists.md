# 1.2 Props, lists and composition

## Goal

The product card, the product grid, the category list and the product page show data from the fixtures instead of hardcoded text. If you change a value in `products.json`, the page changes.

## Before you start

Lesson 1.1 is done. The gallery works and `Logo` is a component.

## Concepts

### Props

Props are the parameters of a component. React passes them as one object, which you usually destructure in the signature and describe with a `Props` type:

```tsx
type AuthorBadgeProps = {
  name: string
  avatarUrl?: string
}

export function AuthorBadge({ name, avatarUrl }: AuthorBadgeProps) {
  return (
    <span className="flex items-center gap-2">
      {avatarUrl && <img src={avatarUrl} alt="" className="size-6 rounded-full" />}
      {name}
    </span>
  )
}

// usage
<AuthorBadge name="Ann" avatarUrl="/ann.png" />
```

Props are read-only. A component never changes the props it receives. That's the same rule you practiced in 0.2.

### children

What you put between the opening and the closing tag arrives as the `children` prop. Its type is `ReactNode`. `SiteLayout` uses it to wrap a page. It's the same idea as `$slot` in a Blade component.

### How ui/button.tsx is built

Open `src/components/ui/button.tsx` again:

- `ComponentProps<'button'>` is the type of every prop a native `<button>` accepts, so `onClick`, `disabled`, `aria-label` and the rest all work without listing them.
- `...props` collects whatever was not destructured and spreads it onto the `<button>`.
- `type = 'button'` is a default value. The HTML default is `submit`, which would submit any form the button sits in.

Most reusable primitives in React projects look like this, shadcn/ui's included.

### Lists and keys

You render a list with `map`, which returns an array of elements:

```tsx
<ul>
  {authors.map((author) => (
    <li key={author.id}>
      <AuthorBadge name={author.name} />
    </li>
  ))}
</ul>
```

`key` tells React which element is which between renders. It must be unique among siblings and stable over time, so an id from the data is the right choice. It goes on the outermost element that `map` returns, which here is the `<li>`.

The array index (`map((item, index) => ...)`) is a poor key when items can be added, removed or reordered, because React then mixes up the elements. When the data has no unique field and the list never changes order, the index is acceptable. Product 1 has two reviews with the same reviewer and the same date, so you will meet that case below.

### Conditional rendering

```tsx
{isNew && <Badge>New</Badge>}
{stock > 0 ? <Button>Add to cart</Button> : <Badge>Sold out</Badge>}
```

Watch out for numbers with `&&`. `{product.stock && <span>In stock</span>}` renders `0` when the stock is zero, because `&&` returns its left side and React renders numbers. Write `product.stock > 0 && ...`.

A component can also return `null` to render nothing.

### Derived values

Calculate what you can from props directly in the component body, for example `const discount = Math.round(product.discountPercentage)`. You don't need to store it anywhere.

### Where the data comes from

In this lesson the pages import the fixtures and pass them down as props. In module 3 the pages load the same data from the API instead. The components below them don't change at all.

Docs: [Passing props to a component](https://react.dev/learn/passing-props-to-a-component), [Rendering lists](https://react.dev/learn/rendering-lists), [Conditional rendering](https://react.dev/learn/conditional-rendering), [TypeScript with React](https://react.dev/learn/typescript).

## Task

### 1. Typed fixtures in one place

Create `src/fixtures/index.ts`. It imports `products.json` and `categories.json` and exports them with your types from 0.3, for example `export const productList: ProductList = productsJson`. Every other file imports the fixtures from here.

### 2. Product card and grid

1. `ProductCard` takes a `product: Product` prop. Show the real thumbnail, title, category and rating. Show the final price, using `finalPrice` from 0.2, with the list price as `original`. The link goes to `/product/{id}`. The button's `aria-label` contains the product title.
2. Show the discount badge only when the rounded discount is at least 5%. Products 6 and 9 in the fixture are below that.
3. When `stock` is below 10, show a `warning` badge in the top right corner, "Only 4 left". When `stock` is 0, disable the add-to-cart button.
4. `ProductGrid` takes `products: Product[]` and renders one `<li>` per product.
5. `HomePage` passes the first 8 fixture products to the grid.

### 3. Category list

1. `FiltersSidebar` takes `categories: Category[]` and an optional `activeSlug`. "All products" comes first and is active when `activeSlug` is undefined.
2. Only the active link gets `aria-current="page"` and the active styles. Use `cn()` for the conditional classes.
3. `CategoryPage` passes all categories from the fixture.

### 4. Product page

1. `ProductPage` takes `productId: number`, finds the product in the fixtures with `find`, and renders `NotFoundPage` when there is no match. TypeScript makes you handle the `undefined` case.
2. `ProductDetails` takes `product`. Show the brand only when it exists, since groceries have none. Choose the badge variant from `availabilityStatus`: success for "In Stock", warning for "Low Stock", destructive for "Out of Stock". Show the shipping, warranty and return texts from the product.
3. `ReviewsList` takes `reviews: Review[]`. The heading shows the number of reviews. Format the date with a new `formatDate(iso: string): string` in `src/lib/format.ts`, so that `2025-04-30T09:41:02.053Z` gives `Apr 30, 2025`. Write a test for it next to the `formatPrice` tests. Choose a key for the reviews and add a comment explaining your choice.
4. Show the real description and breadcrumb.
5. In `src/dev/gallery.tsx`, render `<ProductPage productId={1} />`. TypeScript reports every place that needs a new prop. Use `pnpm typecheck` as your to-do list.

## Acceptance criteria

- [ ] No component in steps 2 to 4 contains hardcoded product data. All of it arrives through props.
- [ ] Every component has a `Props` type, and no prop is typed as `any`.
- [ ] Lists have stable keys, and the reviews list explains its key.
- [ ] Changing a title or a price in `products.json` changes it on the home page and on the product page.
- [ ] The discount and stock badges follow the rules above, and products without a `brand` don't show an empty line.
- [ ] `formatDate` has a test.
- [ ] `/?gallery&page=product` and `/?gallery&page=category` work.
- [ ] `pnpm typecheck` and `pnpm test:run` pass.

## Check

```bash
pnpm typecheck
pnpm test:run
```

Then edit a title in `src/fixtures/products.json`, look at the page, and undo the change.

## Commit

```bash
git commit -m "feat(catalog): render product card, grid and filters from props"
git commit -m "feat(product): render product page from fixture data"
```

## Extra

- `ProductGallery` takes `images: string[]` and `title`. It shows the first image large and all of them as thumbnails. Choosing a thumbnail needs state, which comes in the next lesson.
- On the home page, render the "Shop by category" chips from the first 8 categories.
- `CatalogToolbar` shows "Showing 1–12 of 194". Make it take `from`, `to` and `total`.
