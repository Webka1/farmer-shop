<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<!-- TODO: EBANIE ANIMACII FIX NADO -->
<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.3s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(.7rem);
  }
</style>
