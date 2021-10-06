<template>
  <div>
    <br />
    <br />
    <br />
    <v-card width="400" class="mx-auto mt-7 mb-7">
      <v-card-title style=" margin-bottom:5px;">
        <span
          style="color:#ff6d00;margin-left:23%;font-size:xx-large;font-weight:bold
          "
          >User Traders</span
        >
      </v-card-title>
      <v-card-text>
        <div id="signUpForm">
          <v-form>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email"
                    :rules="[rules.required]"
                    label="이메일"
                    hint="ex) jaebin@naver.com"
                    prepend-icon="mdi-account-circle"
                    autocomplete="off"
                    required
                    outlined
                  ></v-text-field>

                  <v-btn
                    rounded
                    color="#ff6d00 "
                    class="ml-9 white--text mr-3"
                    style="margin-left:70%;"
                    @click="getcheckedemail"
                  >
                    중복검사
                  </v-btn>

                  <v-icon color="green" v-if="isemailcheked == 1"
                    >mdi-check-bold</v-icon
                  >
                  <v-icon color="red" v-if="isemailcheked == 2"
                    >mdi-block-helper</v-icon
                  >
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.minPw]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="비밀번호"
                    hint="적어도 8글자 이상 입력해주세요."
                    prepend-icon="mdi-lock"
                    counter
                    @click:append="show1 = !show1"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="passwordCheck"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.minPw, rules.pwCheck]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-1"
                    label="비밀번호 확인"
                    hint="비밀번호를 한번더 입력해주세요."
                    prepend-icon="mdi-lock"
                    counter
                    @click:append="show2 = !show2"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="name"
                    :rules="[rules.minName]"
                    label="이름"
                    hint="적어도 1글자 이상 입력해주세요."
                    prepend-icon="mdi-account"
                    autocomplete="off"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="nickname"
                    :rules="[rules.minNickname]"
                    label="닉네임"
                    hint="적어도 1글자 이상 입력해주세요."
                    prepend-icon="mdi-account-multiple"
                    autocomplete="off"
                    required
                    outlined
                  ></v-text-field>

                  <v-btn
                    rounded
                    color="#ff6d00 "
                    class="ml-9 white--text"
                    style="margin-left:70%;"
                    @click="getcheckednickname"
                  >
                    중복검사
                  </v-btn>
                  <v-icon color="green" v-if="isnicknamechecked"
                    >mdi-check-bold</v-icon
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="number"
                    label="휴대폰 번호 -없이 입력"
                    prepend-icon="mdi-cellphone"
                    oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
                    autocomplete="off"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    v-model="select"
                    :items="items"
                    @click="departmentId"
                    label="학과 선택"
                    prepend-icon="mdi-school"
                    data-vv-name="select"
                    required
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="studentid"
                    :rules="[rules.minStudent]"
                    label="학번"
                    hint="적어도 1글자 이상 입력해주세요."
                    prepend-icon="mdi-card-account-details"
                    autocomplete="off"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-container fluid>
                <p>{{ gender || "null" }}</p>
                <v-radio-group v-model="gender" mandatory>
                  <v-radio label="남성" value="남성"></v-radio>
                  <v-radio label="여성" value="여성"></v-radio>
                </v-radio-group>
              </v-container>
              <!-- <h3>성별</h3>
              <v-radio-group
                v-model="radiogroup"
                row
                prepend-icon="mdi-human-male-female"
              >
                <v-radio label="남성" value="man" v-model="gender"></v-radio>
                <v-radio label="여성" value="woman" v-model="gender"></v-radio>
              </v-radio-group> -->
            </v-container>
          </v-form>
        </div>
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-actions>
        <v-btn
          :disabled="!valid"
          rounded
          color="#ff6d00 "
          class="mr-3 white--text"
          style="margin-left:70%;"
          @click="signUpSubmit"
        >
          회원가입
          <v-icon right>mdi-arrow-right-thick</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <br />

    <br />
  </div>
</template>
<script>
import http from "@/utils/http";
export default {
  data() {
    return {
      show1: false,
      show2: false,
      email: "",
      checkEmailString: "",
      password: "",
      passwordCheck: "",
      name: "",
      nickname: "",
      studentid: "",
      valid: true,
      items: [],
      itemsName: [],
      itemsid: [],
      select: "",
      number: "",
      isnicknamechecked: 0,
      isemailcheked: false,
      gender: "",

      rules: {
        required: (input) => !!input || "이메일을 입력해주십시오.",
        minPw: (password) => password.length >= 8 || "Min 8 characters",
        minName: (Name) => Name.length >= 1 || "Min 1 characters",
        minNickname: (nickName) => nickName.length >= 1 || "Min 1 characters",
        minPhone: (number) => number.length >= 11 || "Min 11 characters",
        pwCheck: (passwordCheck) =>
          this.password === passwordCheck || "Password mismatch",
      },
    };
  },
  watch: {
    number: function() {
      return (this.number = this.number.replace(/[^0-9]/g, ""));
    },
  },
  methods: {
    departmentId() {
      return http
        .process("user", "listdepartment")
        .then((data) => {
          console.log(data);
          for (var i = 0; i < data.userDepartmentDtoList.length; i++) {
            this.items = this.items.concat(
              data.userDepartmentDtoList[i].id +
                " " +
                data.userDepartmentDtoList[i].name
            );
          }
          // for(var i= 0; i < data.userDepartmentDtoList.length; i++){

          // }
          console.log(this.items);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    genderId() {},

    getcheckedemail() {
      let checkEmailString = this.email;
      let count = 0;
      for (var i = 0; i < checkEmailString.length; i++) {
        if (checkEmailString[i] == "@" || checkEmailString[i] == ".") {
          count++;
        }
      }
      if (!(count >= 2)) {
        this.isemailcheked = 2;
        alert("이메일을 형식에 맞게 작성해주십시오.");
        return;
      }

      if (checkEmailString == null || checkEmailString == undefined) {
        return;
      } else {
        checkEmailString = this.email;
      }

      return http
        .process("user", "emailCheck", {
          email: checkEmailString,
        })
        .then((res) => {
          console.log(res.check);
          if (res.check == "중복된 이메일 입니다.") {
            this.isemailcheked = 2;
            alert("중복된 이메일 입니다.");
          } else {
            this.isemailcheked = 1;
            // alert("사용가능한 이메일 입니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getcheckednickname() {
      let checkNicknameString = this.nickname;
      if (checkNicknameString == null || checkNicknameString == undefined) {
        return;
      } else {
        checkNicknameString = this.nickname;
      }

      return http
        .process("user", "nicknameCheck", {
          nickname: checkNicknameString,
        })
        .then((res) => {
          console.log(res.check);
          if (res.check == "중복된 닉네임 입니다.") {
            this.isnicknamechecked = false;
            alert("중복된 닉네임 입니다.");
          } else {
            this.isnicknamechecked = true;
            // alert("사용가능한 닉네임 입니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signUpSubmit() {
      if (this.isemailcheked == true) {
        const temp = this.select.split(" ");
        const department = { id: temp[0] };
        let genderId = 0;
        if (this.gender == "남성") {
          genderId = 0;
        } else {
          genderId = 1;
        }

        const userObj = {
          email: this.email,
          password: this.password,
          tel: this.number,
          departmentId: department,
          userNamed: this.name,
          nickname: this.nickname,
          gender: genderId,
          loginType: 0,
          //학번은 예정

          studentId: this.studentid,
        };
        return http
          .process("user", "signup", userObj)
          .then((res) => {
            console.log(res);
            this.$router.push({ name: "UserLogin" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("닉네임이랑 이메일 체크를 꼭하셔야합니다.");
      }
    },
  },
};
</script>
<style scoped></style>
