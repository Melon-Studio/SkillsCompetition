<template>
  <main class="v-main" style="
      --v-layout-left: 0px;
      --v-layout-right: 0px;
      --v-layout-top: 112px;
      --v-layout-bottom: 0px;
    ">
    <div class="v-container v-locale--is-ltr v-theme--dark">
      <div>
        <p style="font-weight: 800; font-size: 28px;">
          {{ activity_title }}
        </p>
        <p style="font-weight: 300; margin-bottom: 50px; font-size: 16px;">
          作品提交时间：{{ time }}
        </p>
        <p class="text-right" style="font-weight: 300; margin-right: 5px;">
          共 {{ work_num }} 个作品
        </p>
        <v-divider style="margin: 5px;"></v-divider>
      </div>
      <div class="v-row card_all">
        <v-card v-for="(item, i) in items" :key="i" @click="router.push({ path: '/work/'+item.sid })" class="card">
          <p class="card_title" :title="item.name">
            {{ item.name }}
          </p>

          <p class="card_autor">
            {{ item.username }}
          </p>

          <p class="card_date">
            {{ formattedDate(new Number(item.time)) }}
          </p>
        </v-card>
      </div>
    </div>
    <img v-show="!isShow" class="default_map" src="../assets/blank.svg" alt="缺省图" />
  </main>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Global from '../AppGlobal.vue'

const router = useRouter()
const activity_title = ref()
const time = ref()
const work_num = ref(0)
const isShow = ref(true)
const items = ref([])

axios.get(Global.WebAPI_URL + '/system/title')
  .then(res => {
    if (res.data.code === 200) {
      activity_title.value = res.data.data.title
    } else {
      activity_title.value = '暂无标题'
    }
  }).catch(() => {
    isShow.value = false
  })

  axios.get(Global.WebAPI_URL + '/system/activityTime')
  .then(res => {
    if (res.data.code === 200) {
      time.value = res.data.data.startTime + ' 至 ' + res.data.data.endTime
    } else {
      time.value = '暂无时间'
    }
  }).catch(() => {
    isShow.value = false
  })

axios.get(Global.WebAPI_URL + '/work/all')
  .then(res => {
    if (res.data.code === 200) {
      items.value = res.data.data
      if (items.value.length == 0) {
        isShow.value = false
      }
      work_num.value = items.value.length
    }
  }).catch(() => {
    isShow.value = false
  })

function formattedDate(timestamp) {
  if (timestamp) {
    const date = new Date(timestamp * 1000)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  return ''
}


</script>


<style>
.card {
  margin: 15px;
  padding: 20px !important;
  width: 350px !important;
}

.card_title {
  font-weight: 800;
  margin-bottom: 10px;
  font-size: 20px;
}

.card_autor {
  font-size: 14px;
  font-weight: 200;
}

.card_date {
  font: 10px;
  font-weight: 100;
  color: rgb(132, 132, 132);
}

.card_all {
  display: flex;
  justify-content: left;
  flex-wrap: nowrap
}

.v-main {
  position: relative;
}

.default_map {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
}
</style>