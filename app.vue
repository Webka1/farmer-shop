<script setup>
  useHead({
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      }
    ]
  })
</script>
<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
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
    .animka-leave {
        animation: show 0.3s ease-in-out reverse;
    }
</style>
