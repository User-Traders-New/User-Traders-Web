<template>
  <div class="inner-wrap" fluid fill-height inner-wrap>
    <Message-List :msgs="msgDatas" class="msg-list"></Message-List>
    <h5>메시지 폼</h5>
    <Message-From v-on:submitMessage="sendMessage" class="msg-form" ></Message-From>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MessageList from '../views/MessageList.vue';
import MessageForm from '../views/MessageForm.vue';
import Constant from '../Constant.js';

export default {
  name: 'ChatRoom',
  data() {
    return {
      datas: [],
    };
  },
  components: {
    'Message-List': MessageList,
    'Message-From': MessageForm,
  },
  computed: {
    ...mapState({
      'msgDatas': state => state.socket.msgDatas,
    }),
  },
  created() {
    const $ths = this;
    this.$socket.on('chat', (data) => {
      this.pushMsgData(data);
      $ths.datas.push(data);
    });
  },
  methods: {
    ...mapMutations({
      'pushMsgData': Constant.PUSH_MSG_DATA,
    }),
    sendMessage(msg) {
      this.pushMsgData({
        from: {
          name: '나  ',
        },
        msg,
      });
      this.$sendMessage({
        name: this.$route.params.username,
        msg,
      });
    },
  },
};
</script>

<style>
.msg-form {
  bottom: 0;
  position: absolute;
  left: 0;
  right: 0;
  background-color: green;
}
.msg-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px;
  overflow-x: scroll;
}
</style>