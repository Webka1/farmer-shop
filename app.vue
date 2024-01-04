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
    transform: scale(0);
  }

  @keyframes show {
        from {
            transform: scale(0.5);
            opacity: 0.4;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .animka {
        animation: show 0.3s ease-in-out;
    }

    .animka-leave-active {
        animation: show 0.3s ease-in-out reverse;
    }
</style>
