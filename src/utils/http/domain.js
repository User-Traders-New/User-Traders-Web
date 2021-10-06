export default {
  boards: {
    //전체목록조회
    listAll: { task: "get", url: "/boards/list/all" },
    //페이징목록조회
    listPagenation: { task: "get", url: "/boards/list/page" },
    //상세 조회 --토큰
    listdetail: { task: "get", url: "/boards/list/detail" },
    //저장 --토큰
    boardCreate: { task: "post", url: "/boards/register" },
    //자신 게시물 --토큰
    myboard: { task: "get", url: "/boards/list/my" },
    //해당 회원 게시물  --토큰
    userBoard: { task: "get", url: "/boards/list/userId" },
    //카테고리 검색(대분류+소분류)
    categorySearch: { task: "get", url: "/boards/search/category" },
    //제목 검색
    keywordSearch: { task: "get", url: "/boards/search/title" },
    //대분류 카테고리 조회
    categoryAll: { task: "get", url: "/boards/list/category" },
    //소분류 카테고리 조회
    categorySub: { task: "get", url: "/boards/list/category/sub" },

    //게시물 찜 및 찜 취소 --토큰
    like: { task: "post", url: "/boards/like" },
    //헤딩 회원 게시물 찜 목록  --토큰
    listlike: { task: "get", url: "/boards/like/list" },
    //댓글저장
    commentSend: { task: "post", url: "/boards/parent/comment" },
  },
  user: {
    //초기 토큰 유효성 검사
    userValid: { task: "get", url: "/users/valid" },

    //회원 로그인
    login: { task: "post", url: "/users/login" },
    signup: { task: "post", url: "/users/register" },
    emailCheck: { task: "get", url: "/users/email-check" },
    nicknameCheck: { task: "get", url: "/users/nickname-check" },
    //로그아웃  --토큰
    logout: { task: "post", url: "/users/logout" },
    //프로필 조회  --토큰
    userInfo: { task: "get", url: "/users/profile" },
    //프로필 수정  --토큰
    update: { task: "patch", url: "/users/#id" },
    //회원 탈퇴  --토큰
    delete: { task: "delete", url: "/users/#id" },

    //학과 전체 목록 조회
    listdepartment: { task: "get", url: "/departments/list" },
  },

  // cart: {
  // 	register: { task: 'post', url: '/carts/register' },
  // 	list: { task: 'get', url: '/carts/list' },
  // 	remove: { task: 'delete', url: '/carts/list/delete/#id' },
  // },
  // mail: {
  // 	send: { task: 'post', url: '/messages/send' },
  // 	sent: { task: 'get', url: '/messages/list/user/sent' },
  // 	recv: { task: 'get', url: '/messages/list/user/recv' },
  // 	sentid: { task: 'get', url: '/messages/list/user/sent' },
  // 	recvid: { task: 'get', url: '/messages/list/user/recv' },
  // 	count: { task: 'get', url: '/messages//list/user/recv/count' },
  // },
};
