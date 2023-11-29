<template>
    <div class="operation">
        <div style="margin-left: 10px;">
        </div>
    </div>
    <div class="tableBorder">
        <v-table fixed-header height="calc(100vh - 110px)">
            <thead>
                <tr>
                    <th class="text-left">
                        ID
                    </th>
                    <th class="text-left">
                        作品ID
                    </th>
                    <th class="text-left">
                        学号
                    </th>
                    <th class="text-left">
                        姓名
                    </th>
                    <th class="text-left">
                        分数
                    </th>
                    <th class="text-left">
                        排名
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in data" :key="i">
                    <td>{{ item.id }}</td>
                    <td>{{ item.work_id }}</td>
                    <td>{{ item.sid }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.score }}</td>
                    <td>{{ item.ranking }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import cookies from 'vue-cookies'
import Global from '@/AppGlobal.vue'
import { useMsgStore } from '@/stores/MsgStore.js'

const data = ref([])


const getUserList = () => {
    axios.get(Global.WebAPI_URL + '/rank/pages?token=' + cookies.get('Token'))
        .then(res => {
            
            if (res.data.code === 200) {
                data.value = res.data.data
            } else if (res.data.code === 401) {
                const msg = useMsgStore()
                msg.setMsg('错误', '你没有访问权限')
            }
        })
        .catch(() => {
            console.error('远程服务器连接失败，请联系管理员')
            const msg = useMsgStore()
            msg.setMsg('错误', '远程服务器连接失败')
        })
}

getUserList()

</script>

<style>
.tableBorder {
    padding: 10px;
}

.v-input__details {
    display: none;
}

.operation {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px;
    margin-bottom: 0;
    justify-content: space-between;
}

.search .v-field__field {
    height: 36px;
    font-size: 14px;
}

.search .v-field__input {
    min-height: 36px !important;
    height: 36px !important;

}

.search .v-label .v-field-label {
    margin-left: 10px !important;
}
</style>