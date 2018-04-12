"use strict";

var consts = {
    PHOTONAMES: [],
    PHOTOSIZES: [],
    PHOTOREMOVENAMES: [],
    OFFICEPHOTONAMES: [],
    OFFICEPHOTOSIZES: [],
    OFFICEPHOTOREMOVENAMES: [],
    PRODUCTVIDEONAME: '',
    DELETEVIDEOPRODUCTNAME: '',
    CONTAIN_VIDEO_OF_PRODUCT_ID: '',
    STATUS: ['신청', '승인', '거절', '보류'],
    ALLOW_STATUS: 1,
    ARTICLE_PAGE_COUNT: 10,
    NOTIFICATION_LIMIT_COUNT: 15,
    PHOTO_URL: {
    	TEMP: 'client/uploads/temp/',
    	MEMBERS: 'client/uploads/members/',
    	PRODUCT: 'client/uploads/product/',
        OFFICE: 'client/uploads/office/',
    	PRODUCT_URL: '/uploads/product/',
        SLIDE: 'client/uploads/slider/',
        ENTRY: 'client/uploads/entry/',
        MESSAGE: 'client/uploads/message/',
    },
    VIDEO_URL: {
        OFFICE: 'client/uploads/video_office/',
        PRODUCT: 'client/uploads/video_product/',
        LECTURE:　'client/uploads/video_lecture/',
    },
    FILE_URL: {
        LECTURE: 'client/uploads/file_lecture/'
    },
    PHOTO_SIZE: {
    	PRODUCT_THUMBNAIL_SIZE: {
    		WIDTH: 340,
    		HEIGHT: 255
    	},
        MEMBERS_THUMBNAIL_SIZE : {
            WIDTH: 60,
            HEIGHT: 60
        }
    },
    TITLE: {
        DASHBOARD: "종합",
        DASHBOARD_DETAIL: {
            PRODUCT: "출품된 제품수",
            OFFICE: "출품한 단위수",
            MEMBER: "전체 사용자수",
            LECTURE: "진행될 발표회수",
        },
        PRODUCT: "프로그람제품",
        MEMBER:  "참가자",
        ARTICLE: "게시판",
        LECTURE: "과학기술강의",
        OFFICE: "참가단위",
        TYPE: "프로그람분류",
        ADVERTISE: "광고",
        NOTIFICATION: "알리는 소식",
        ADMIN: "관리자",
        SETTING: "설정",
        MESSAGE: "통보문",
        ENTRY: '전시회참가신청'
    },
    WEBSOCKET_EVENTS: {
        PE_APP: {
            getArticleDetail: 'pe_app:getarticledetail',
            getArticles: 'pe_app:getarticle',
            addArticle: 'pe_app:addarticle',
            getAllData: 'pe_app:getalldata',
            getDetailProduct: 'pe_app:getdetailproduct',
            getRatingProduct: 'pe_app:getratingproduct',
            ratingProduct: 'pe_app:ratingproduct',
            addArticleReply: 'pe_app:addarticlereply',
            getProductViewCount: 'pe_app:getproductviewcount',
            productViewCount: 'pe_app:productviewcount',
            uploadProductViewCount: 'pe_app:uploadproductcount',
            sendActiveUserList: 'pe_app:loginactiveuserlist',
            getNotifications: 'pe_app:getnotifications',
            getProductType: 'pe_app:getproducttype',
            sendMessageToAdmin: 'pe_app:sendMessageToAdmin',
            getAllMessagesFromDB: 'pe_app:getAllMessagesFromDB',
            setViewMessage: 'pe_app:setviewmessage',
            deleteMessage: 'pe_app:deleteMessage',
            getReceiveMSGs: 'pe_app:getreceivemessagedata',
            getSendMSGs: 'pe_app:getsendmessagedata',
            getAllProductsByAlphaBeta: 'pe_app:getallproductsbyalphabeta',
            getAllProductsByMark: 'pe_app:getallproductsbymark'
        }
    },
    USER_TYPE: {
        PERMISSION : [
            {
                PAGES: []
            },
            {
                TITLE: '출판검열',
                PAGES: [
                    {TITLE: '제품', LOCATION: '/admin/products', PAGEID: 'product_add', ICON: 'fa-gift'},
                    {TITLE:'제품평가', LOCATION: '/admin/product_rating', PAGEID: 'product_rating', ICON: 'fa-gift'}, 
                    {TITLE: '알리는 소식', LOCATION: '/admin/notification', PAGEID: 'notification', ICON: 'fa-envelope'},
                    {TITLE: '발표회', LOCATION: '/admin/lectures', PAGEID: 'lecture', ICON: 'fa-gift'},
                ]
            },
            {
                TITLE: '전시회상무',
                PAGES: [
                    {TITLE:'참가신청', LOCATION: '/admin/entry_exhibition', PAGEID: 'entry_exhibition', ICON: 'fa-gift'}
                ]
            }
        ]
    },
    USER_NOT_EXISTS: "그런 사용자는 존재하지 않습니다.",
    INTERVALFORREFRESH: 10
};

module.exports = consts;
