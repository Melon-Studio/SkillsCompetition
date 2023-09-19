<template>
  <iframe ref="webFrame" class="workContent"></iframe>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  created() {
    this.url = this.$route.query.url
  },
  mounted() {
    const iframe = document.querySelector('.workContent')
    iframe.src = this.url
    
  }
}
</script>

<style>
.workContent {
  margin-top: 64px;
  widows: 100%;
  height: 100%;
  border: 0;
}
</style>