//#region 添加FIB题型
// 引入响应式API
import { reactive, ref } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { listen } from '@/api/questionListenAPI';

/**
 * 导出添加FIB题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} getQuestion 重新获取列表
 */
export function useAddFIB(addModalVisible, getQuestion) {
  // 表单数据 校验规则
  const addFIB = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目音频
      titleAudio: "",
      // 题目原文
      titleText: [
        {
          // 答案
          answer: "",
          // 文本
          text: ""
        },
        {
          answer: "",
          text: ""
        },
      ],
      // 备注
      remark: ""
    },
    // 校验规则
    rules: {
      // 编号
      no: [
        { required: true, whitespace: true, message: '题目编号必须填写', trigger: 'blur' },
      ]
    },
  });

  // 表单ref
  const addFIBRef = ref(null);

  // 改变选择标签时
  const changeLabels = (checkedValue) => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  }

  // 添加题目原文填空
  const addTitleText = () => {
    addFIB.model.titleText.push({
      answer: "",
      text: ""
    })
  }

  // 移除题目原文填空
  const delTitleText = (index) => {
    addFIB.model.titleText.splice(index, 1);
  }

  // 添加FIB题目
  const confirmAddFIB = () => {
    // 先校验
    addFIBRef.value.validate().then(() => {
      // 发送添加题目请求
      httpPost(listen.AddQuestion('fib'), addFIB.model).then((res) => {
        if (res.success == true) {
          // 提示用户添加成功
          message.success("添加题目成功");
          // 刷新页面
          getQuestion();
          // 关闭fib模态框
          addModalVisible.fib = false;
          // 重置表单
          addFIBRef.value.resetFields();
        }
        else {
          // 添加失败，提示用户失败原因
          message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    });
  };

  // 取消添加fib题目
  const cancelAddFIB = () => {
    // 提示用户
    message.warn('取消添加fib题目');
    // 重置表单
    addFIBRef.value.resetFields();
  }

  return {
    addFIB,
    addFIBRef,
    changeLabels,
    addTitleText,
    delTitleText,
    confirmAddFIB,
    cancelAddFIB,
  }
}
//#endregion