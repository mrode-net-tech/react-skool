// Static page. It becomes the protected "/account" route in lesson 9.8.
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OrderHistory } from '@/features/account/order-history'
import { ProfileCard } from '@/features/account/profile-card'

export function AccountPage() {
  return (
    <div className="grid gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">My account</h1>
        <Button variant="outline">
          <LogOut />
          Sign out
        </Button>
      </div>
      <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
        <ProfileCard />
        <OrderHistory />
      </div>
    </div>
  )
}
