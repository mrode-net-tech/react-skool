// Static markup. The profile comes from /auth/me in lesson 9.8.
import { Mail, MapPin, Phone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function ProfileCard() {
  return (
    <section
      aria-labelledby="profile-heading"
      className="grid content-start gap-4 rounded-lg border bg-card p-6 text-card-foreground"
    >
      <div className="flex items-center gap-4">
        <img
          src="https://dummyjson.com/icon/emilys/128"
          alt=""
          width={64}
          height={64}
          className="size-16 rounded-full border bg-muted"
        />
        <div className="grid gap-1">
          <h2 id="profile-heading" className="text-lg font-semibold">
            Emily Johnson
          </h2>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            @emilys <Badge variant="secondary">admin</Badge>
          </p>
        </div>
      </div>
      <ul className="grid gap-2 text-sm">
        <li className="flex items-center gap-3">
          <Mail aria-hidden="true" className="size-4 text-muted-foreground" />
          emily.johnson@x.dummyjson.com
        </li>
        <li className="flex items-center gap-3">
          <Phone aria-hidden="true" className="size-4 text-muted-foreground" />
          +81 965-431-3024
        </li>
        <li className="flex items-center gap-3">
          <MapPin aria-hidden="true" className="size-4 text-muted-foreground" />
          626 Main Street, Phoenix, MS 29112, United States
        </li>
      </ul>
    </section>
  )
}
