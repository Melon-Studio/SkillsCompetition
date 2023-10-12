<template>
  <main
    class="v-main"
    style="
      --v-layout-left: 0px;
      --v-layout-right: 0px;
      --v-layout-top: 112px;
      --v-layout-bottom: 0px;
    "
  >
    <div class="v-container v-locale--is-ltr v-theme--dark">
      <div class="v-row">
        <div class="v-col v-col-4" ref="home_data" id="home_data">
          
          <div
            class="v-card v-card--density-default v-card--variant-elevated v-theme--dark"
            style="height: 200px"
          >
            <div class="v-card__loader">
              <div
                class="v-progress-linear v-locale--is-ltr"
                role="progressbar"
                aria-hidden="true"
                aria-valuemin="0"
                aria-valuemax="100"
                style="
                  top: 0px;
                  height: 0px;
                  --v-progress-linear-height: 2px;
                  left: 50%;
                  transform: translateX(-50%);
                "
              >
                <div class="v-progress-linear__background" style="width: 100%"></div>
                <div class="v-progress-linear__indeterminate">
                  <div class="v-progress-linear__indeterminate long"></div>
                  <div class="v-progress-linear__indeterminate short"></div>
                </div>
              </div>
            </div>
            <span class="v-card__underlay"></span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  created() {
    // 页面没有数据时添加缺省图
    this.$nextTick(() => {
      const homeDataElement = this.$refs.home_data
      if (!homeDataElement) {
        const body = document.querySelector('main')
        body.style.backgroundImage = 'url(./assets/blank.svg)'
        body.style.backgroundSize = '300px'
        body.style.backgroundRepeat = 'no-repeat'
        body.style.backgroundPosition = 'center center'
      }
    })
  }
}
</script>


<style>
</style>