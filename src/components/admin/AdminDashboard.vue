<template>
    <div class="d-flex">
        <v-sheet class="ma-2 pa-2">
            <v-card class="mx-auto" max-width="368" style="width: 368px;">
                <v-card-item title="用户数量">
                </v-card-item>

                <v-card-text class="py-0">
                    <v-row align="center" no-gutters>
                        <v-col class="text-h2" cols="6">
                            {{ userCount }}
                        </v-col>

                        <v-col cols="6" class="text-right">
                            <i class="bi bi-people-fill" style="font-size: 88px;"></i>
                        </v-col>
                    </v-row>
                </v-card-text>

            </v-card>
        </v-sheet>
        <v-sheet class="ma-2 pa-2">
            <v-card class="mx-auto" max-width="368" style="width: 368px;">
                <v-card-item title="作品数量">
                </v-card-item>

                <v-card-text class="py-0">
                    <v-row align="center" no-gutters>
                        <v-col class="text-h2" cols="6">
                            {{ workCount }}
                        </v-col>

                        <v-col cols="6" class="text-right">
                            <i class="bi bi-book-half" style="font-size: 88px;"></i>
                        </v-col>
                    </v-row>
                </v-card-text>

            </v-card>
        </v-sheet>
        <v-sheet class="ma-2 pa-2">
            <v-card class="mx-auto" max-width="368" style="width: 368px;">
                <v-card-item title="访问量">
                </v-card-item>

                <v-card-text class="py-0">
                    <v-row align="center" no-gutters>
                        <v-col class="text-h2" cols="6">
                            {{ visitsCount }}
                        </v-col>

                        <v-col cols="6" class="text-right">
                            <i class="bi bi-door-open-fill" style="font-size: 88px;"></i>
                        </v-col>
                    </v-row>
                </v-card-text>

            </v-card>
        </v-sheet>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const userCount = ref(40)
const workCount = ref(100)
const visitsCount = ref(1000)
</script>

<style>
.v-sheet {
    background: none;
}
</style>