const base = {
    baseURl:'http://zefey.com:12345'
};

const Config = {
    login: base.baseURl + '/user/adminLogin',
    logout: base.baseURl + '/user/adminLogout',
    fileUpload: base.baseURl + '/file/upload',

    bannerList:base.baseURl + '/admin/bannerList',
    handleBanner:base.baseURl + '/admin/handleBanner',
    bannerDelete:base.baseURl + '/admin/bannerDelete',

    routeList:base.baseURl + '/admin/routeList',
    handleRoute:base.baseURl + '/admin/handleRoute',
    routeDelete:base.baseURl + '/admin/routeDelete',

    travelList:base.baseURl + '/admin/travelList',
    handleTravel:base.baseURl + '/admin/handleTravel',
    travelDelete:base.baseURl + '/admin/travelDelete',

    locationList:base.baseURl + '/admin/locationList',
    handleLocation:base.baseURl + '/admin/handleLocation',
    locationDelete:base.baseURl + '/admin/locationDelete',

    quickKnowList:base.baseURl + '/admin/quickKnowList',
    handleQuickKnow:base.baseURl + '/admin/handleQuickKnow',
    quickKnowDelete:base.baseURl + '/admin/quickKnowDelete',

    replyList:base.baseURl + '/admin/replyList',
    handleReply:base.baseURl + '/admin/handleReply',
    replyDelete:base.baseURl + '/admin/replyDelete',

};

export default Config;
