//导入 reactive 对象
import { reactive } from "vue";

//#region 顶部 查询 和 重置 功能
export const useFeedbackHeader = () => {
  //创建对象 储存 日期选择器 和 下拉列表 绑定的值
  const headerData = reactive({
    //日期选择器发生改变时的 指定日期
    dateModel: [],
    //日期选择器确定后的 指定日期
    confirmDate: {},
    //设置 默认状态值 (全部)
    selectModel: "2"
  });

  //#region 选择项改变
  const changeStatus = value => {
    //将改变的项 属性值储存 到 双向绑定的selectModel中
    headerData.selectModel = value;
  };
  //#endregion

  //#region 日期选择确定方法
  const changeDateConfirm = data => {
    //将获取的日期 转换为时间戳 存入dateModel中
    headerData.confirmDate.startDate = data[0].valueOf();
    headerData.confirmDate.endDate = data[1].valueOf();
  };
  //#endregion

  //#region 日期选择器发生变换方法
  const changeDate = data => {
    headerData.dateModel = data;
  };
  //#endregion

  //返回 参数 和 方法
  return {
    headerData,
    changeStatus,
    changeDate,
    changeDateConfirm
  };
};
//#endregion
