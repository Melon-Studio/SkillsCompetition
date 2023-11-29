<template>
  <main class="v-main" style="
      --v-layout-left: 0px;
      --v-layout-right: 0px;
      --v-layout-top: 64px;
      --v-layout-bottom: 0px;
    ">
    <div class="v-container v-locale--is-ltr">
      <div class="v-row">
        <div class="v-col v-col-2">
          <div class="v-sheet v-theme--dark rounded-lg">
            <div class="v-list v-theme--dark v-list--density-default v-list--one-line rounded-lg" tabindex="0"
              role="listbox">


              <div
                class="v-list-item v-list-item--link v-theme--dark v-list-item--density-default v-list-item--one-line v-list-item--variant-text"
                tabindex="-2">
                <span class="v-list-item__overlay"></span><span class="v-list-item__underlay"></span>
                <div class="v-list-item__content" data-no-activator="">
                  <div class="v-list-item-title" @click="router.push({ path: '/space/workManagement' })"><i
                      class="bi bi-filetype-html"></i> 作品管理</div>
                </div>
              </div>

              <div
                class="v-list-item v-list-item--link v-theme--dark v-list-item--density-default v-list-item--one-line v-list-item--variant-text"
                tabindex="-2">
                <span class="v-list-item__overlay"></span><span class="v-list-item__underlay"></span>
                <div class="v-list-item__content" data-no-activator="">
                  <div class="v-list-item-title" @click="router.push({ path: '/space/account' })"><i
                      class="bi bi-shield-shaded i"></i>账号安全</div>
                </div>

              </div>
              <hr class="v-divider v-theme--dark my-2" aria-orientation="horizontal" role="separator" />
              <div
                class="v-list-item v-list-item--link v-theme--dark v-list-item--density-default v-list-item--one-line v-list-item--variant-text"
                tabindex="-2">
                <span class="v-list-item__overlay"></span><span class="v-list-item__underlay"></span>
                <div class="v-list-item__content" data-no-activator="">
                  <div class="v-list-item-title" @click="router.push({ path: '/logout' })"><i
                      class="bi bi-door-open-fill i"></i>退出登录
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="v-col">
          <div class="v-sheet v-theme--dark rounded-lg" style="min-height: 70vh">
            <!-- 二级路由显示 -->
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<style>
.i {
  margin-right: 5px;
  padding-top: 2px;
}
</style>