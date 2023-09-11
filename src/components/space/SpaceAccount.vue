<template>
    <div class="container">
        <h2><i class="bi bi-shield-shaded"></i>账号安全</h2>
        <v-form class="form">
            <p class="label">修改密码</p>
            <v-text-field clearable label="旧密码" variant="solo-filled"></v-text-field>
            <v-text-field clearable label="新密码" variant="solo-filled"></v-text-field>
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
.label {
    margin-bottom: 10px;
}
i {
    margin-right: 5px;
}
</style>