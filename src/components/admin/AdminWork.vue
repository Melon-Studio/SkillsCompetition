<template>
  <div class="operation">
    <div style="width: 420px;">
      <v-text-field class="search" label="搜索" variant="outlined" v-model="searchValue" @input="isInput" />
    </div>
    <div style="margin-left: 10px;">
    </div>
  </div>
  <div class="tableBorder">
    <v-table fixed-header height="calc(100vh - 200px)">
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            学号
          </th>
          <th class="text-left">
            名称
          </th>
          <th class="text-left">
            路径
          </th>
          <th class="text-left">
            分数
          </th>
          <th class="text-left">
            时间
          </th>
          <th class="text-left">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.username">
          <td>{{ item.id }}</td>
          <td>{{ item.sid }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.path }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.time }}</td>
          <td>
            <v-btn variant="text" color="red" icon="bi bi-trash3" style="font-size: 10px;" :width="32" :height="32"
              @click="deleteWork(item.sid)"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div class="text-center">
    <v-pagination v-model="nowPage" :length="pageSize" :total-visible="5" @click="jumpPage(nowPage)"></v-pagination>
  </div>

  <!-- 模态框(删除确认) -->
  <v-dialog v-model="isDelete" persistent width="500">
    <v-card title="敏感操作">
      <v-card-text>
        该操作不可逆，你确定要删除此用户吗？
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="取消" @click="isDelete = false"></v-btn>
        <v-btn text="确定" color="red" @click="deleteSid()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import cookies from 'vue-cookies'
import Global from '@/AppGlobal.vue'
import { useMsgStore } from '@/stores/MsgStore.js'

const data = ref([])
const isDelete = ref(false)
const nowPage = ref(1)
const pageSize = ref(1)
const searchValue = ref('')



const getUserList = (page, keyword) => {
  axios.get(Global.WebAPI_URL + '/work/pages?token=' + cookies.get('Token') + '&page=' + page + '&keyword=' + keyword)
    .then(res => {
      if (res.data.code === 200) {
        data.value = res.data.data.records
        pageSize.value = res.data.data.pages
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

getUserList(1, '')

const jumpPage = (page) => {
  getUserList(page, '')
}

const deleteWork = (sid) => {
  isDelete.value = sid
}
const deleteSid = () => {
  axios.delete(Global.WebAPI_URL + '/user/delete?token=' + cookies.get('Token') + '&sid=' + isDelete.value)
    .then(res => {
      if (res.data.code === 200) {
        const msg = useMsgStore()
        msg.setMsg('提示', '删除成功')
        jumpPage(1)
      } else if (res.data.code === 401) {
        const msg = useMsgStore()
        msg.setMsg('提示', '你没有访问权限')
      }
    })
    .catch(() => {
      console.error('未知异常')
      const msg = useMsgStore()
      msg.setMsg('错误', '未知异常')
    })
  isDelete.value = false
}

const isInput = () => {
  const a = searchValue.value
  setTimeout(() => {
    if (a === searchValue.value) {
      if (searchValue.value === '') {
        jumpPage(1)
      }
      getUserList(1, searchValue.value)
    }
  }, 1000)
}

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