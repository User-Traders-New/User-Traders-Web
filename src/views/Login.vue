<template>
    <div>
        <v-card width="360" class="mx-auto"> 
            <div>
                <v-card-title>
                    <h3 style="color:#FFA726">User Traders</h3>
                </v-card-title>
            </div>

            <v-card-text>
               <v-form ref="form" v-model="valid" lazy-validation>  // 유효성 검사를 통과했는지 판단 하기 위해 ref="form"을 넣어줌
          <v-text-field autocomplete="off" v-model="email" :rules="emailRules" label="이메일" prepend-icon="mdi-account-circle" required></v-text-field>
          <v-text-field autocomplete="off" v-model="password" label="비밀번호" prepend-icon="mdi-lock" type="password"></v-text-field>
        </v-form>
            </v-card-text>
            <v-divider> </v-divider>
            <v-card-actions >
        <v-btn :disabled="!valid" color="#FFA726" class="ml-9 mr-2 white--text" @click="loginSubmit">
          로그인
          <v-icon>mdi-login</v-icon>
        </v-btn>

        <v-btn :to="{name: 'SignUp'}" color="#FB8C00" class="ml-9 mr-2 white--text">        
          회원가입
          <v-icon right>mdi-account-plus</v-icon>
        </v-btn>
            </v-card-actions>

        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            emailRules: [
                v => !!v || "이메일은 필수 입력사항입니다",
                v => /.+@.+\..+/.test(v) || "이메일 형식에 맞게 입력해주세요."
            ],
            password:""
        }    
    },
    methods: {
        validate() {
            this.$$refs.form.validate();
        },
        loginSubmit() {
            
        }
    }
}
</script>