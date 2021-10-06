let Formatter = {
  filters: {
    // loadImgOrPlaceholder: function(path) {
    //    return require('@/assets/images/' + path);
    // },
    moneyFilter: function(value) {
      if (value == undefined) {
        return undefined;
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    timeForToday: function(value) {
      const today = new Date();
      const timeValue = new Date(value);

      const betweenTime = Math.floor(
        (today.getTime() - timeValue.getTime()) / 1000 / 60
      );
      if (betweenTime < 1) return "방금전";
      if (betweenTime < 60) {
        return `${betweenTime}분전`;
      }

      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
      }

      const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
      }

      return `${Math.floor(betweenTimeDay / 365)}년전`;
    },
    timeFormate: function(value) {
      let day = value.split("T")[0];
      console.log(day);
      let time = value.split("T")[1].split(":")[0];

      return day + " " + time + " 시";
    },
    stringLowerFormate: function(value) {
      let a = value.toLowerCase();

      return a;
    },
    tradeStatus: function(value) {
      if (value == 0) {
        return "판매중";
      } else if (value == 1) {
        return "예약중";
      } else {
        return "판매완료";
      }
    },
  },
};
export default Formatter;
