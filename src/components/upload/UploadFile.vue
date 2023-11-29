<template>
    <div :class="fileMain" @dragover.prevent @drop="handleDrop" @click="handleClick" :disabled="disabled">
        <i id="icon" :class="iconClass" style="font-size: 80px;"></i>
        <p class="msg">{{ msg }}</p>
        <v-progress-linear v-if="uploading" :height="7" class="progress" :indeterminate="progressIndeterminate"
            :model-value="uploadProgress" rounded></v-progress-linear>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Global from '@/AppGlobal.vue'
import cookies from 'vue-cookies'
import { useMsgStore } from '@/stores/MsgStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const useMsg = useMsgStore()
const fileMain = ref('fileMain')
const iconClass = ref('bi bi-file-earmark-zip')
const msg = ref('将压缩包拖入此处，或者点击此处上传')
const uploading = ref(false)
const uploadProgress = ref(0)
const progressIndeterminate = ref(false)
const disabled = ref(true)
const emit = defineEmits(['uploadSuccess'])

axios.get(Global.WebAPI_URL + '/work/hasWorkInfo?token=' + cookies.get('Token')).then(res => {
    console.log(res)
    if (res.data.code === 200) {
        if (res.data.data.hasWorkInfo === true) {
            disabled.value = false
            useMsg.setMsg('提示', '作品已上传，修改请前往个人中心 - 作品管理')
        } 
    } else if (res.data.code === 401) {
        useMsg.setMsg('提示', '请登录后再操作')
        router.push('/login')
    }
})

function handleDrop(event) {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    handleFile(file)
}

function handleClick() {
    if (disabled.value) {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.zip'
        input.onchange = (event) => {
            const file = event.target.files[0]
            handleFile(file)
        }
        input.click()
    }

}

async function handleFile(file) {
    // 未选择文件
    if (!file) {
        iconClass.value = 'bi bi-dash-circle'
        msg.value = '请选择上传文件'
        fileMain.value = 'fileMain error'
        return
    }

    // 禁止重复上传
    if (!disabled.value) {
        iconClass.value = 'bi bi-dash-circle'
        msg.value = '作品已上传，禁止重复上传'
        fileMain.value = 'fileMain error'
        return
    }

    // 文件大小不符合规范
    if (file.size > 20 * 1024 * 1024) {
        iconClass.value = 'bi bi-dash-circle'
        msg.value = '文件大小不符合规范'
        fileMain.value = 'fileMain error'
        return
    }

    // 文件格式不符合规范
    if (!file.name.endsWith('.zip')) {
        iconClass.value = 'bi bi-dash-circle'
        msg.value = '文件格式不符合规范'
        fileMain.value = 'fileMain error'
        return
    }

    // 文件符合要求
    iconClass.value = 'bi bi-file-earmark-arrow-up'
    msg.value = '文件上传中...'
    disabled.value = false
    fileMain.value = 'fileMain notPointer'


    uploading.value = true
    let progress = 0

    try {
        const formData = new FormData()
        formData.append('file', file)

        await axios.post(Global.WebAPI_URL + '/work/uploadFile?token=' + cookies.get('Token'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                progress = percentCompleted
                uploadProgress.value = progress
                console.log(percentCompleted)
            }
        }).then(res => {
            if(res.data.code === 200) {
                // 文件上传完成后更新状态和标志
                uploading.value = false
                iconClass.value = 'bi bi-check-circle-fill'
                msg.value = '上传成功'
                disabled.value = false
                fileMain.value = 'fileMain success notPointer'
                emit('uploadSuccess', true)
            }else if (res.data.code === 418) {
                iconClass.value = 'bi bi-dash-circle'
                msg.value = '压缩包有密码，请删除密码后上传'
                fileMain.value = 'fileMain error'
                disabled.value = true
            } else if (res.data.code === 419) {
                iconClass.value = 'bi bi-dash-circle'
                msg.value = '压缩包损坏，请重新上传'
                fileMain.value = 'fileMain error'
                disabled.value = true
            } else if (res.data.code === 420) {
                iconClass.value = 'bi bi-dash-circle'
                msg.value = '压缩包根目录中未包含 index.html 文件，请重新上传'
                fileMain.value = 'fileMain error'
                disabled.value = true
            } else if (res.data.code === 422) {
                iconClass.value = 'bi bi-dash-circle'
                msg.value = '未到作品开放上传时间'
                fileMain.value = 'fileMain error'
                disabled.value = true
            } else {
                iconClass.value = 'bi bi-dash-circle'
                msg.value = '上传失败请重试';
                fileMain.value = 'fileMain error'
                disabled.value = true
            }
        });
    } catch (error) {
        // 处理上传失败的情况
        iconClass.value = 'bi bi-dash-circle'
        msg.value = '上传失败请重试'
        fileMain.value = 'fileMain error'
    }



}
</script>
<style>
.fileMain {
    width: 100%;
    height: 300px;
    border: 1px dashed #b1b1b1;
    color: #b1b1b1;
    border-radius: 5px;
    margin: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    cursor: pointer;
    background-color: #323232;
}

.progress {
    margin-top: 15px;
}

.error {
    color: rgb(255, 76, 76);
    border: 1px dashed rgb(255, 76, 76);
    background-color: #291d1d;
}

.success {
    color: rgb(109, 255, 109);
    border: 1px dashed rgb(109, 255, 109);
    background-color: #223023;
}

.notPointer {
    cursor: not-allowed;
}
</style>