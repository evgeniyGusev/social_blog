<template>
  <div class="guest-wrapper">
    <WelcomeBlock />

    <button type="button" @click="fellMyBalls">FETCH ME</button>
    <button type="button" @click="alert('TEST CLICK')">TEST BUTTON</button>
    <button type="button" onclick="alert('VANILLA JS CLICK')">VANILLA JS</button>
    <AboutBlock />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  console.log('GUEST PAGE MOUNTED')
  console.log('Document ready:', typeof document !== 'undefined')
})

async function fellMyBalls() {
  console.log('BUTTON CLICKED - START')
  try {
    console.log('я тут блядь?')
    console.log('About to call useFetch...')

    const { data, error, status } = await useFetch('/api/auth/current_user', {
      server: false // форсируем выполнение на клиенте
    })

    console.log('useFetch completed')
    console.log('Status:', status.value)
    console.log('Error:', error.value)
    console.log('Data:', data.value)
  } catch (error) {
    console.log('CATCH ERROR:', error)
  }
  console.log('BUTTON CLICKED - END')
}
</script>

<style scoped lang="scss">
.guest-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
