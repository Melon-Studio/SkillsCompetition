<template>
  <main
    class="v-main"
    style="
      --v-layout-left: 0px;
      --v-layout-right: 0px;
      --v-layout-top: 112px;
      --v-layout-bottom: 0px;
    "
    :style="mainStyles"
  >
    <div class="v-container v-locale--is-ltr v-theme--dark">
      <div class="v-row">
        <div class="v-col v-col-4">
          <div
            class="v-card v-card--density-default v-card--variant-elevated v-theme--dark"
            style="height: 200px"
            id="home-data"
          >
            <!---->
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
                <!---->
                <div class="v-progress-linear__background" style="width: 100%"></div>
                <div class="v-progress-linear__indeterminate">
                  <div class="v-progress-linear__indeterminate long"></div>
                  <div class="v-progress-linear__indeterminate short"></div>
                </div>
                <!---->
              </div>
            </div>
            <!----><!----><!----><!----><!----><span class="v-card__underlay"></span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    mainStyles() {
      console.log(document.getElementById('home-data'))
      if (document.getElementById('#home-data') === null) {
        return {
          backgroundImage: 'url(./assets/blank.svg)',
          backgroundSize: '300px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        };
      }
      return {};
    }
  }
}
</script>


<style>
</style>