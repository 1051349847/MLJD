var WxApiRoot = 'https://mljg.lanwang168.com/';

module.exports = {
  WxLogin: WxApiRoot + 'api/user/userReg',//登录
  MemberInfo: WxApiRoot + 'api/v2/pushFeedBack',//上传信息
  User_info: WxApiRoot + 'api/v2/getFeedBackList',//个人信息
  Deatil: WxApiRoot + 'api/v2/getFeedBackById',//详情
  OPSFactory: WxApiRoot + 'api/v1/getEquipmentById',//获取设备编号
  
}