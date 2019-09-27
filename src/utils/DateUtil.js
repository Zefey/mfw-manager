function DateUtil(){
}

DateUtil.prototype = {
    //格式化日期：yyyy-MM-dd HH:mm:ss
    formatDate:function (date,format) {
        var myyear = date.getFullYear(),
            mymonth = date.getMonth()+1,
            myweekday = date.getDate(),
            myhour = date.getHours(),
            myminute = date.getMinutes(),
            mysecond = date.getSeconds(),
            format = format || "yyyy-MM-dd";

        if(mymonth < 10){
            mymonth = "0" + mymonth;
        }
        if(myweekday < 10){
            myweekday = "0" + myweekday;
        }
        if (myhour<10) {
            myhour = "0"+myhour;
        }
        if (myminute<10) {
            myminute = "0"+myminute;
        }
        if (mysecond<10) {
            mysecond = "0"+mysecond;
        }

        format = format.replace('yyyy',myyear);
        format = format.replace('MM',mymonth);
        format = format.replace('dd',myweekday);

        format = format.replace('HH',myhour);
        format = format.replace('mm',myminute);
        format = format.replace('ss',mysecond);


        return format;
    },
    //字符串转日期格式，strDate要转为日期格式的字符串
    strTransDate:function (strDate){
      var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
       function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
      return date;
    }

}

export default new DateUtil();
