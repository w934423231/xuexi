<template>
  <div class="my-wrapper">
    <my-header/>
    <my-main></my-main>
  </div>
</template>
<script>
import myHeader from '@/components/myHeader'
import myMain from '@/components/myMain'
export default {
  components: {
    myHeader,
    myMain
  }
}
</script>
<style>
.my-wrapper {
  min-height: 100vh;
}
</style>
