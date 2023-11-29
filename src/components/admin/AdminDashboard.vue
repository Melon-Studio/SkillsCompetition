<template>
    <div class="d-flex aaa">
        <div class="data_list">
            <div class="data_card">
                <p>活动人数</p>
                <p>{{ numberForPeo }}</p>
            </div>
            <div class="data_card">
                <p>作品数量</p>
                <p>{{ numberForWork }}</p>
            </div>
            <div class="data_card">
                <p>评分工作完成度</p>
                <p>{{ scoringCompletion }}</p>
            </div>
            <div class="data_card">
                <p>待完成评分作品数</p>
                <p>{{ numberForScor }}</p>
            </div>
        </div>
        <div class="data_operation">
            <v-card width="100%" style="box-shadow: none;">
                <v-card-title>
                    操作
                </v-card-title>
                <br>
                <v-card-text>
                    <v-btn variant="outlined" @click="isCompleted()" :disabled="hasData">公示成绩
                        <v-tooltip activator="parent"
                            location="top">公示成绩后，所有参赛选手的个人中心将会展示出自己的排名和分数，通常情况下请在评分工作完成度到达100%时再公示成绩</v-tooltip>
                    </v-btn>
                    <v-btn variant="outlined" @click="sendEmail()" style="margin-left: 10px;" :disabled="!hasData" :loading="loadding">公布成绩
                        <v-tooltip activator="parent"
                            location="top">公布成绩，系统会自动往参赛者邮箱发送一封排名和成绩信息，通常情况，该功能与公示成绩同时使用</v-tooltip>
                    </v-btn>
                    <v-btn variant="outlined" @click="exportExcel()" style="margin-top: 10px;" :disabled="!hasData">导出成绩
                        <v-tooltip activator="parent" location="top">该功能会将成绩导出成一份Excel表格</v-tooltip>
                    </v-btn> 
                    <v-btn variant="outlined" @click="clearTable()" style="margin-top: 10px; margin-left: 10px;" :disabled="!hasData">清空成绩
                            <v-tooltip activator="parent" location="top">该功能会将已公示的成绩清空</v-tooltip>
                        </v-btn>
                </v-card-text>
            </v-card>
        </div>
    </div>
    <v-dialog v-model="dialog" width="400">
        <v-card>
            <v-card-title>警告</v-card-title>
            <v-card-text>当前还有评分组未完成评分的作品，你确定要公示成绩吗？</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="tonal" @click="dialog = false">取消</v-btn>
                <v-btn variant="outlined" @click="announced()">确定</v-btn>
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

const hasData = ref(false)
const msg = useMsgStore()
const numberForPeo = ref(0)
const numberForWork = ref(0)
const scoringCompletion = ref(0)
const numberForScor = ref(0)
const dialog = ref(false)
const loadding = ref(false)

const sendEmail = () => {
    loadding.value = true
    axios.get(Global.WebAPI_URL + '/rank/publicationScore?token=' + cookies.get('Token'))
        .then(res => {
            if (res.data.code === 200) {
                loadding.value = false
                msg.setMsg('提示', '成绩已公布给参赛选手')
            } else if (res.data.code === 401) {
                msg.setMsg('错误', '非法操作，权限不足')
            }
        })
}

axios.get(Global.WebAPI_URL + '/user/dashboardData?token=' + cookies.get('Token'))
    .then(res => {
        if (res.data.code === 200) {
            numberForPeo.value = res.data.data[0].peopleNum
            numberForWork.value = res.data.data[0].workNum
            scoringCompletion.value = res.data.data[0].proportion
            numberForScor.value = res.data.data[0].scoreNum
        } else if (res.data.code === 401) {
            msg.setMsg('错误', '连接远程服务器失败')
        }
    })

axios.get(Global.WebAPI_URL + '/rank/hasData?token=' + cookies.get('Token'))
    .then(res => {
        if (res.data.code === 200) {
            if (res.data.data.hasData === true) {
                hasData.value = true
            } 
        }else if (res.data.code === 401) {
                msg.setMsg('错误', '连接远程服务器失败')
            }
    })

const clearTable = () => {
        axios.get(Global.WebAPI_URL + '/rank/clearTable?token=' + cookies.get('Token'))
        .then(res => {
            if (res.data.code === 200) {
                if (res.data.data.clearData === true) {
                    msg.setMsg('提示', '清空成功')
                    reloadPage()
                } else {
                    msg.setMsg('提示', '清空失败')
                }
            } else if (res.data.code === 401) {
                msg.setMsg('错误', '连接远程服务器失败')
            }
        })
}

const exportExcel = () => {
    axios({
        url: Global.WebAPI_URL + '/rank/exportData?token=' + cookies.get('Token'),
        method: 'GET',
        responseType: 'blob',
    })
        .then(res => {
            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            const downloadUrl = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = downloadUrl
            link.setAttribute('成绩导出','.xlsx')
            document.body.appendChild(link)

            link.click()
            document.body.removeChild(link)
            msg.setMsg('提示', '导出成功')
        })
        .catch(() => {
            // 处理错误
            msg.setMsg('提示', '导出失败')
        });
}

const isCompleted = () => {
    if (numberForScor.value != '0') {
        dialog.value = true
    } else {
        announced()
    }
}

const reloadPage = () => {
    window.location.reload()
}

const announced = () => {
    axios.get(Global.WebAPI_URL + '/work/announced?token=' + cookies.get('Token'))
        .then(res => {
            if (res.data.code === 200) {
                msg.setMsg('提示', '成绩已发布')
                reloadPage()

            } else if (res.data.code === 401) {
                msg.setMsg('错误', '连接远程服务器失败')
            }
        })
}
</script>

<style>
.aaa {
    display: flex;
    flex-direction: column;
}

.data_list {
    height: auto;
    width: calc(100% - 40px);
    margin: 20px;
    margin-bottom: 0;
    padding: 20px;
    border-radius: 15px;
    background-color: #212121;
    display: flex;
    flex-direction: row;
}

.data_card {
    width: 25%;
    padding: 10px;
}

.data_card p:first-child {
    color: #B2B2B2;
}

.data_card p:last-child {
    font-size: 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.data_operation {
    width: 300px;
    margin: 20px;
    padding: 20px;
    border-radius: 15px;
    background-color: #212121;
    display: flex;
    flex-direction: row;
}
</style>