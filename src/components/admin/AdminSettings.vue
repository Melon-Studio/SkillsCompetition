<template>
  <div>
    <v-card style="height: calc(100vh - 100px); padding: 20px;">
      <v-card-title>
        系统设置
      </v-card-title>
      <v-card-text>
        <v-text-field label="比赛名称" variant="outlined" v-model="title"></v-text-field>
        <div class="bbb">
          <v-btn variant="outlined" @click="selectDate(1)">
            选择比赛开始日期
          </v-btn>
          <p>日期：{{ startDate }}</p>
        </div>
        <div class="bbb">
          <v-btn variant="outlined" @click="selectDate(2)">
            选择比赛截止日期
          </v-btn>
          <p>日期：{{ endDate }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="save()">
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <v-dialog v-model="dialog" width="380">
    <v-card>
      <v-date-picker v-model="date"></v-date-picker>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="setDate()">
          确定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import axios from 'axios'
import Global from '../../AppGlobal.vue'
import cookies from 'vue-cookies'
import { ref } from 'vue'
import { useMsgStore } from '@/stores/MsgStore'

const msg = useMsgStore()

const dialog = ref(false)
const title = ref()
const date = ref()
const startDate = ref()
const endDate = ref()

let startTimestamp
let endTimestamp

let temp = 1

const selectDate = (type) => {
  if (type === 1) {
    temp = 1
  } else {
    temp = 2
  }
  dialog.value = true
}

const save = () => {
  
  if (startTimestamp === null || endTimestamp === null || startTimestamp === '' || endTimestamp === '') {
    msg.setMsg('提示', '当前还有未设置完的日期')
    return
  }

  if (endTimestamp < startTimestamp) {
    msg.setMsg('提示', '当前截止日期小于开始日期，请重新选择！')
    return
  }

  if (title.value === null || title.value === '') {
    msg.setMsg('提示', '未设置比赛名称')
    return
  }
  const postData = {
    title: title.value,
    startTime: startTimestamp,
    endTime: endTimestamp
  }
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  console.log(postData);
  axios.post(Global.WebAPI_URL + '/system/setSetting?token=' + cookies.get('Token'), postData, config).then(res => {
    if (res.data.code === 200) {
      msg.setMsg('提示', '设置成功')
    } else {
      msg.setMsg('错误', '未知错误，请联系管理员')
    }
  }).catch(() => {
    msg.setMsg('错误', '未知错误，请联系管理员')
  })
}

const setDate = () => {
  if (temp === 1) {
    startDate.value = formatDateToYMD(date.value)
    startTimestamp = formatToUnixTimestamp(date.value)
    console.log(startTimestamp);
  } else {
    endDate.value = formatDateToYMD(date.value)
    endTimestamp = formatToUnixTimestamp(date.value)
    console.log(endTimestamp);
  }
  dialog.value = false
}

// 将默认格式时间转换为年月日形式
function formatDateToYMD(defaultFormatTime) {
  const regex = /(\w{3}) (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):(\d{2})/
  const parts = regex.exec(defaultFormatTime)

  const months = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  };

  const formattedDate = `${parts[4]}-${months[parts[2]]}-${parts[3]}`
  return formattedDate
}

// 将默认格式时间转换为Unix时间戳（秒）
function formatToUnixTimestamp(defaultFormatTime) {
  const date = new Date(defaultFormatTime)
  const unixTimestamp = Math.floor(date.getTime() / 1000)

  return unixTimestamp
}
</script>

<style>
.bbb {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
}

.bbb:last-child {
  margin-top: 10px;
  margin-bottom: 300px;
}

.bbb p {
  margin-left: 10px;
}
</style>