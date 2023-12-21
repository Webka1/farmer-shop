import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth.store';
import { PrismaClient } from '@prisma/client'

export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie('token'); // get token from cookies

  if (token.value) {
    authenticated.value = true
  }

  // // if token exists and url is /login redirect to homepage
  // if (token.value && to?.name === 'login') {
  //   return navigateTo('/');
  // }

  // // if token doesn't exist redirect to log in
  // if (!token.value && to?.name !== 'login') {
  //   abortNavigation();
  //   return navigateTo('/login');
  // }
  // TODO: ПРОВЕРКУ АВТОРИЗАЦИИ БЛЯ СДЕЛАТЬ

  if(!token.value && to?.name == 'profile') {
    abortNavigation();
    return navigateTo('/login');
  }
});