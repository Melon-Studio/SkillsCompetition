<template>
  <div class="operation">
    <div style="width: 420px;">
      <v-text-field class="search" label="搜索" variant="outlined" v-model="searchValue" @input="isInput" />
    </div>
    <div style="margin-left: 10px;">
      <!-- <v-btn color="blue" variant="outlined" prepend-icon="bi bi-person-add" @click="addUserDialog = true">
        添加用户
      </v-btn> -->
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
            姓名
          </th>
          <th class="text-left">
            邮箱
          </th>
          <th class="text-left">
            学院
          </th>
          <th class="text-left">
            专业
          </th>
          <th class="text-left">
            年级
          </th>
          <th class="text-left">
            班级
          </th>
          <th class="text-left">
            用户类型
          </th>
          <th class="text-left">
            用户状态
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
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.college }}</td>
          <td>{{ item.professional }}</td>
          <td>{{ item.grade }}</td>
          <td>{{ item.classes }}</td>
          <td>{{ userType(item.usertype) }}</td>
          <td>{{ item.status === 1 ? '正常' : '禁用' }}</td>
          <td>
            <!-- <v-btn variant="text" color="yellow" style="margin-right: 5px; font-size: 10px;" icon="bi bi-pen"
              :width="32" :height="32" @click="editUserDialog = true"></v-btn> -->
            <v-btn variant="text" color="red" icon="bi bi-trash3" style="font-size: 10px;" :width="32" :height="32"
              @click="deleteUser(item.sid)"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div class="text-center">
    <v-pagination v-model="nowPage" :length="pageSize" :total-visible="5" @click="jumpPage(nowPage)"></v-pagination>
  </div>

  <!-- 模态框(添加用户) -->
  <!-- <v-row justify="center">
    <v-dialog v-model="addUserDialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">添加用户</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="addSID" label="学号*" variant="outlined" name="sid" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="addName" label="姓名*" variant="outlined" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="addEmail" label="邮箱*" type="email" name="email" variant="outlined" hidden autocomplete="new-password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="addPassword" label="密码*" type="password" name="password" variant="outlined" hidden autocomplete="new-password" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="addCollege" :items="['信息技术学院', '现代农业学院', '智能制造学院', '文化旅游学院', '健康管理学院']" label="学院*" variant="outlined"
                  required></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="addProfessional" label="专业*" name="professional" variant="outlined" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="addGrade" label="年级*" variant="outlined" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="addClasses" label="班级*" variant="outlined" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="addUsertype" :items="['普通用户', '教师', '管理员']" label="用户类型*" variant="outlined"
                    required></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-switch v-model="addStatus" label="用户启用状态" inset></v-switch>
                  </v-col>
            </v-row>
          </v-container>
          <small>*为必填项</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="addUserDialog = false">
            关闭
          </v-btn>
          <v-btn variant="outlined" @click="addUserDialog = false">
            添加
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row> -->

  <!-- 模态框(添加用户) -->
  <!-- <v-row justify="center">
    <v-dialog v-model="editUserDialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">编辑用户</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="学号*" variant="outlined" name="sid" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="姓名*" variant="outlined" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="邮箱*" type="email" name="email" variant="outlined" hidden autocomplete="new-password" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="密码*" type="password" name="password" variant="outlined" hidden autocomplete="new-password" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select :items="['信息技术学院', '现代农业学院', '智能制造学院', '文化旅游学院', '健康管理学院']" label="学院*" variant="outlined"
                    required></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select :items="['假数据', '假数据', '假数据', '假数据', '假数据']" label="专业*" variant="outlined" required></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field label="年级*" variant="outlined" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="班级*" variant="outlined" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="['普通用户', '教师', '管理员']" label="用户类型*" variant="outlined"
                      required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                      <v-switch label="用户启用状态" inset></v-switch>
                    </v-col>
              </v-row>
          </v-container>
          <small>*为必填项</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="editUserDialog = false">
            关闭
          </v-btn>
          <v-btn variant="outlined" @click="editUserDialog = false">
            编辑
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row> -->

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
// const addUserDialog = ref(false)
// const editUserDialog = ref(false)
const isDelete = ref(false)
const nowPage = ref(1)
const pageSize = ref(1)
const searchValue = ref('')

// 添加用户
// const addSID = ref()
// const addName = ref()
// const addEmail = ref()
// const addPassword = ref()
// const addCollege = ref()
// const addProfessional = ref()
// const addGrade = ref()
// const addClasses = ref()
// const addUsertype = ref()
// const addStatus = ref(false)

const getUserList = (page, keyword) => {
  axios.get(Global.WebAPI_URL + '/user/pages?token=' + cookies.get('Token') + '&page=' + page + '&keyword=' + keyword)
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

const userType = (type) => {
  switch (type) {
    case 0:
      return '普通用户'
    case 1:
      return '教师'
    case 2:
      return '管理员'
    default:
      return '未知'
  }
}

const deleteUser = (sid) => {
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