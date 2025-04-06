"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetUserQuery } from '@/lib/store/mainstackApi'
import { Skeleton } from '@/components/ui/skeleton'

export function UserProfile() {
  const { data: user, isLoading, isError } = useGetUserQuery()

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="size-8 rounded-[100px]" />
      </div>
    )
  }

  if (isError || !user) {
    return <div className="text-red-500">Error loading user data</div>
  }

  const initials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="size-8">
        <AvatarImage 
        className='bg-[linear-gradient(138.98deg,_#5C6670_2.33%,_#131316_96.28%)]'
          src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`} 
          alt={`${user.first_name} ${user.last_name}`}
        />
        <AvatarFallback className="text-sm font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}