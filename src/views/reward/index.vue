<template><div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>奖惩信息公告</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogIPVisible = true">编辑</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{ o + "xxx同学,在XXX比赛中获，，，奖项" }}
    </div>
  </el-card>
  <!-- 弹出窗口：编写内容 -->
  <el-dialog :visible.sync="dialogIPVisible" :close-on-click-modal="false" title="编辑奖惩信息">
    <el-form label-width="80px">
      <el-form-item :prop="'0'" label="标题">
        <el-input />
      </el-form-item>

      <el-form-item :prop="'1'" label="内容">
        <el-input type="textarea"/>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogIPVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogIPVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogIPVisible: false
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

