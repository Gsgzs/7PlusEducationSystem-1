//#region 获取所有标签
// 引入 响应式API
import { ref } from "vue";
// 引入get请求
import { httpGet } from "@/utils/http.js";
// 引入接口配置
import questionLabel from "@/api/questionLabelAPI";


export function useGetLabels() {
  // 声明 标签列表数据
  let labelList = ref([]);

  // 获取所有标签
  let getLabels = () => {
    httpGet(questionLabel.GetLabels).then(res => {
      if (res.success == true) {
        labelList.value = res.data;
      }
    });
  };

  return {
    getLabels,
    labelList
  };
}
//#endregion
