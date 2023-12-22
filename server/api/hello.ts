export default defineEventHandler((event) => {
    // console.log('New context from mw (/server/hello.ts): ' + event.context.auth.user)
  if(event.context.is_protected) {
    return {
        error: true,
        reason: 'Неавторизован'
    }
  } else {
    return {
      message: 'Hello, World! This route not protected',
    }
  }
})