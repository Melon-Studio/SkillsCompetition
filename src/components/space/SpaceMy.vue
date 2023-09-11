<template>
    <div class="container">
        <h2><i class="bi bi-file-person-fill"></i>个人资料</h2>
        <v-form class="form">
            <v-text-field clearable label="姓名" variant="solo-filled"></v-text-field>
            <v-text-field clearable label="学号" variant="solo-filled"></v-text-field>
            <v-text-field clearable label="学院" variant="solo-filled"></v-text-field>
            <v-text-field clearable label="专业" variant="solo-filled"></v-text-field>
            <v-text-field clearable label="年级" variant="solo-filled"></v-text-field>
            <v-text-field clearable label="班级" variant="solo-filled"></v-text-field>
            <v-text-field clearable label="邮箱" variant="solo-filled"></v-text-field>
            <v-btn block variant="tonal" @click="submit()">提交</v-btn>
        </v-form>
    </div>
    
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        submit() {
            // 提交表单
        }
    }
}
</script>

<style>
h2 {
    margin-bottom: 15px;
}
.container {
    padding: 0.625rem 1rem;
}
i {
    margin-right: 5px;
    padding-top: 2px;
}
</style>