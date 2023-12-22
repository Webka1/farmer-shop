import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth.store';
import { PrismaClient } from '@prisma/client'
import { client_protected_routes } from '@/utils/protected_routes';

export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated, getSession, user_id } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const session = await getSession.value

  if(!session) {
    authenticated.value = false
    user_id.value = 0
  }

  if(!session?.is_active) {
    authenticated.value = false
    user_id.value = 0
  }

  if(session?.is_active) {
    authenticated.value = true
    user_id.value = session?.user_id
  }

  if(session?.is_active == false) {
    authenticated.value = false
    user_id.value = 0
  }

  // CHECK IF PROTECTED ROUTES
  // @ts-ignore
  if(!session && client_protected_routes.includes(to?.name) || !session?.is_active && client_protected_routes.includes(to?.name)) {
    abortNavigation()
    return navigateTo('/login')
  }
});