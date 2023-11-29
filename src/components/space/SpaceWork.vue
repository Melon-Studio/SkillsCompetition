<template>
    <div class="group">
        <div class="box">
            <p>个人排名</p>
            <p>{{ ranking }}</p>
        </div>
        <div class="box">
            <p>个人成绩</p>
            <p>{{ achievements }}</p>
        </div>
    </div>
    <div class="controller" variant="outlined">
        <v-btn variant="outlined" @click="deleteWork()" :disabled="dis" style="margin-left: 20px;">删除作品</v-btn>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useMsgStore } from '@/stores/MsgStore'
import cookies from 'vue-cookies'
import Global from '../../AppGlobal.vue'

const msg = useMsgStore()

const ranking = ref('暂无数据')
const achievements = ref('暂无数据')
const dis = ref(true)

const selectWorkInfo = () => {
    axios.get(Global.WebAPI_URL + '/rank/workInfo?token=' + cookies.get('Token'))
        .then(res => {
            if (res.data.code === 200) {
                ranking.value = res.data.data[0].ranking
                achievements.value = res.data.data[0].score
            } else if (res.data.code === 401) {
                msg.setMsg('错误', '无权访问')
            }
        })
}

axios.get(Global.WebAPI_URL + '/work/hasWorkInfo?token=' + cookies.get('Token'))
    .then(res => {
        if (res.data.code === 200) {
            if (res.data.data.hasWorkInfo === true) {
                selectWorkInfo()
                dis.value = false
            }
        } else if (res.data.code === 401) {
            msg.setMsg('错误', '无权访问')
        }
    })

const deleteWork = () => {
    axios.delete(Global.WebAPI_URL + '/work/deleteWork?token=' + cookies.get('Token'))
        .then(res => {
            if (res.data.code === 200) {
                msg.setMsg('提示', '删除成功')
            } else if (res.data.code === 423) {
                msg.setMsg('提示', '删除失败，你没有作品')
            } else if (res.data.code === 401) {
                msg.setMsg('错误', '无权访问')
            }
        })
}
</script>
<style>
.group {
    padding: 20px;
    display: flex;
    flex-direction: row;
}

.box {
    width: 300px;
    height: auto;
}

.box p:first-child {
    font-size: 16px;
    color: #a8a8a8;
    font-weight: 300;
}

.box p:last-child {
    font-size: 28px;
    font-weight: 800;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>