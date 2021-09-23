<template>
  <div class="blue lighten-3 pa-3">
    <h1>User 컴포넌트</h1>
    <p>이름 : 형준</p>
    <hr />
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <UserDetail
          :name="name"
          :address="address"
          :phone="phone"
          :hasDog="hasDog"
          @child="parents"
        >
        </UserDetail>
      </v-flex>
      <v-flex xs12 sm6>
        <UserEdit></UserEdit>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import UserDetail from "./UserDetail.vue"
import UserEdit from "./UserEdit.vue"

export default {
  components: {
    UserDetail,
    UserEdit,
  },
  data() {
    return {
      name: "hyung jun",
      address: "경기도",
      phone: "010-1212-3434",
      hasDog: "ture",
    }
  },
  methods: {
    parents() {
      console.log("부모가 받았어")
    }
  }
}
</script>
