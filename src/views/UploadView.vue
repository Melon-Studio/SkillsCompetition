<template>
    <main class="v-main" style="
      --v-layout-left: 0px;
      --v-layout-right: 0px;
      --v-layout-top: 64px;
      --v-layout-bottom: 0px;
    ">
        <div class="v-container v-locale--is-ltr">
            <div class="v-row">
                <div class="v-col-md-2 v-col-12 aoboutLeft">
                    <div class="v-sheet rounded-lg" style="min-height: 268px; display: none;"></div>
                </div>
                <div class="v-col-md-8 v-col-12">
                    <div class="v-sheet rounded-lg">
                        <v-form>
                            <v-card title="上传" subtitle=" " text="" variant="tonal" style="padding: 15px">
                                <v-card-actions class="justify-center" style="flex-direction: column">
                                    <v-text-field clearable label="学号" variant="solo-filled"
                                        style="width: 380px"></v-text-field>
                                    <v-text-field clearable label="密码" type="password" variant="solo-filled"
                                        style="width: 380px"></v-text-field>

                                    <div class="mi-captchas">
                                        <mi-captcha themeColor="#41B883" image="./assets/captcha.jpg"
                                            logo="./assets/vclogo.svg" borderColor="#00000000" boxShadow=false
                                            boxShadowBlur="0" bgColor="#444444" width="380" height="40" radius="4"
                                            modalBoxShadowColor="#000000" modalBoxShadowBlur="0" />
                                    </div>
                                    <div style="display: flex; flex-direction: row">
                                        <v-checkbox label="我同意"></v-checkbox>
                                        <div class="text-center agreement">
                                            <v-dialog v-model="dialog" activator="parent" persistent width="auto">
                                                <template v-slot:activator="{ props }">
                                                    <v-btn variant="plain" v-bind="props">《用户协议与隐私政策》</v-btn>
                                                </template>
                                                <v-card style="width: 600px">
                                                    <v-card-text>
                                                        <h2>用户协议与隐私政策</h2>
                                                        <p></p>
                                                        <p>
                                                            如果你使用本网站，将默认同意《用户协议与隐私政策》，本网站无权将你的个人隐私信息分享至第三方；
                                                            本网站储存的密码会经过加密后储存，管理员将无权登录你的个人账号；本网站提供的服务免费，本网站无义务
                                                            对你上传的网页进行备份，如果丢失，本网站概不负任何责任；本网站有权审查你的网页内容，如果出现违反《
                                                            中华人民共和国宪法》及其他法律法规和地方性法律法规，本网站将有权在不进行通知的情况下删除你上传的
                                                            网页。如有不完善，将在修改时通过邮箱或者网页醒目处提醒。
                                                        </p>
                                                        <p></p>
                                                        <p>
                                                            为了提供更好的体验，我们使用了 Cookie
                                                            技术，如：保持你的登录状态等，用于在你的设备上储存这些信息。
                                                            以便你了解我们使用 Cookie 的目的。本网站不会使用 Cookie
                                                            技术来存储用户的使用记录，只会储存用户登 录凭证和一些不涉及隐私的信息。
                                                        </p>
                                                        <p></p>
                                                        <p>
                                                            注销账号：如果你想注销本网站的你的个人账号，请联系管理员，联系方式请访问“关于”页面。
                                                        </p>
                                                        <p></p>
                                                        <p>网站管理员</p>
                                                        <p>2023.9.10</p>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <v-btn variant="tonal" block @click="dialog = false">我了解</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </div>
                                    </div>
                                    <v-btn variant="tonal" style="width: 200px" @click="submit"><i
                                            class="bi bi-door-closed-fill"></i>登录</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </div>
                </div>
                <div class="v-col-md-2 v-col-12 aoboutRight">
                    <div class="v-sheet rounded-lg" style="min-height: 268px; display: none;"></div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {

}
</script>

<style></style>