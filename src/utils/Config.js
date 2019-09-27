const base = {
    baseURl:'http://zefey.com'
};

const Config = {
    login: base.baseURl + '/user/login',
    logout: base.baseURl + '/user/logout',
    articleList: base.baseURl + '/blog',
    articleAdd: base.baseURl + '/blog/add',
    categoryList: base.baseURl + '/blog/category',
    labelList: base.baseURl + '/blog/label',
    fileUpload: base.baseURl + '/file/upload',
    articleDelete: base.baseURl + '/blog/delete',
    articleUpdate: base.baseURl + '/blog/update'
};

export default Config;
