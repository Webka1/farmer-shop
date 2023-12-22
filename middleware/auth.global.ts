import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth.store';
import { PrismaClient } from '@prisma/client'

export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated, getSession } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const session = await getSession.value

  const protected_routes = [
    'profile',
  ]


  if(!session) {
    authenticated.value = false
  }

  if(!session?.is_active) {
    authenticated.value = false
  }

  if(session?.is_active) {
    authenticated.value = true
  }

  if(session?.is_active == false) {
    authenticated.value = false
  }

  // CHECK IF PROTECTED ROUTES

  // @ts-ignore
  if(!session && protected_routes.includes(to?.name) || !session?.is_active && protected_routes.includes(to?.name)) {
    abortNavigation()
    return navigateTo('/login')
  }
});