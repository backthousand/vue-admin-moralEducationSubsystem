<template>
  <div class="app-container">
    <!-- filter-container -->
    <div class="app-filter-container">
      <el-input v-model="tableQuery.projectName" clearable style="width:200px;" placeholder="班级" />
      <el-select v-model="tableQuery.activeStatus" :placeholder="'请选择考核等级'" clearable style="width: 200px;">
        <el-option label="优秀" value="0" />
        <el-option label="良好" value="1" />
        <el-option label="一般" value="2" />
        <el-option label="很差" value="3" />
      </el-select>
      <el-tooltip content="搜索" placement="top">
        <el-button v-perm="'b:user:query'" icon="el-icon-search" circle @click="fetchTableData(1)" />
      </el-tooltip>
    </div>

    <!-- 表格全局操作 -->
    <div class="app-table-controller">
      <el-button type="primary" icon="el-icon-plus" @click="dialogAddVisible = true">新增</el-button>
    </div>

    <!-- table -->
    <el-table :data="tableList" style="width: 100%;" border fit @selection-change="handleSelectionChange">

      <el-table-column :selectable="(row) => {return !(row.activeStatus === '2') }" type="selection" align="center"/>
      <el-table-column align="center" label="序号" prop="projectName"/>
      <el-table-column align="center" label="班级" prop="peojectRemarks"/>

      <el-table-column align="center" label="早自习" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.activeStatus | activeStatus('type')">
            {{ scope.row.activeStatus | activeStatus('name') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="晚自习" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.activeStatus | activeStatus('type')">
            {{ scope.row.activeStatus | activeStatus('name') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="团支部考核">
        <template slot-scope="scope">
          <el-tag :type="scope.row.activeStatus | activeStatus('type')">
            {{ scope.row.activeStatus | activeStatus('name') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="等级">
        <template slot-scope="scope">
          <el-tag :type="scope.row.activeStatus | activeStatus('type')">
            {{ scope.row.activeStatus | activeStatus('name') }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!--
      <el-table-column align="center" label="行为规范" prop="projectBehavior"/>

      <el-table-column align="center" label="教室卫生" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.activeStatus | activeStatus('type')">
            {{ scope.row.activeStatus | activeStatus('name') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="德育活动" prop="moralActivity"/>

      <el-table-column align="center" label="学习情况" prop="studyStatus"/>

      <el-table-column align="center" label="创建时间" width="150">
        <template slot-scope="scope">
          <i v-if="scope.row.createTime" class="el-icon-time" />
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="合计" prop="All"/> -->

    <!--分页-->
    <el-pagination v-if="tablePage.total > 10" :current-page="tablePage.current" :page-sizes="[10, 20, 30, 40, 50]" :page-size="tablePage.size" :total="tablePage.total" class="app-table-pagination" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <!-- 弹出窗口：添加项目 -->
    <el-dialog :visible.sync="dialogAddVisible" :close-on-click-modal="false" title="新增项目">
      <el-form ref="addProjectForm" :model="addProjectForm" :rules="rules" label-width="100px">
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="addProjectForm.project_name" />
        </el-form-item>
        <el-form-item label="项目简述" prop="peoject_remarks">
          <el-input v-model="addProjectForm.peoject_remarks" :rows="2" type="textarea" />
        </el-form-item>
        <el-form-item label="预估发送量" prop="presupposeValue">
          <el-input v-model="addProjectForm.presupposeValue" />
        </el-form-item>
        <el-form-item label="预估年度" prop="activeYear">
          <el-input v-model="addProjectForm.activeYear" />
        </el-form-item>
        <el-form-item label="预估季度" prop="activeQuarter">
          <el-input v-model="addProjectForm.activeQuarter" />
        </el-form-item>
        <el-form-item label="预估月度" prop="activeMonth">
          <el-input v-model="addProjectForm.activeMonth" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onResetForm('addProjectForm')">取 消</el-button>
        <el-button type="primary" @click="onSubmitForm('addProjectForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出窗口：配置鉴权IP -->
    <el-dialog :visible.sync="dialogIPVisible" :close-on-click-modal="false" title="配置权鉴IP（最多配置3个，最少1个）">
      <el-form ref="ipForm" :model="ipForm" :rules="ruleIP" label-width="80px">
        <el-form-item :prop="'0'" label="配置IP_1">
          <el-input v-model="ipForm['0']" />
        </el-form-item>

        <el-form-item :prop="'1'" label="配置IP_2">
          <el-input v-model="ipForm['1']" />
        </el-form-item>

        <el-form-item :prop="'2'" label="配置IP_3">
          <el-input v-model="ipForm['2']" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onResetForm('ipForm')">取 消</el-button>
        <el-button type="primary" @click="onSubmitForm('ipForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data() {
    return {
      tableQuery: {
        projectName: '',
        activeStatus: ''
      },
      tablePage: {
        current: null,
        pages: null,
        size: null,
        total: null
      },
      tableList: [],
      // 新增项目表单
      addProjectForm: {
        project_name: '',
        peoject_remarks: '',
        presupposeValue: '',
        activeYear: '',
        activeQuarter: '',
        activeMonth: ''
      },
      // (array-like object) 用于转化为数组
      ipForm: { '0': '', '1': '', '2': '', length: 3, cid: '' },
      dialogAddVisible: false,
      dialogIPVisible: false,
      rules: {
        project_name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        peoject_remarks: [{ required: true, message: '请输入项目简述', trigger: 'blur' }],
        activeMonth: [{ required: true, message: '请输入预估月度', trigger: 'blur' }]
      },
      ruleIP: {
        '0': [{ required: true, message: '至少输入一个权鉴IP', trigger: 'blur' }]
      },
      multipleSelection: []
    }
  },
  // filter
  mounted() {
    this.fetchTableData()
  },
  methods: {
    // 获取表格数据
    fetchTableData(current) {
      if (current) {
        this.tablePage.current = current
      }
    },
    /* // 新增项目
    postAddForm() {
      projectApi.addProject(this.addProjectForm).then(res => {
        this.fetchTableData()
        this.dialogAddVisible = false
      })
    },
    // 更新项目状态
    updataProject(params) {
      projectApi.updateProject(params).then(res => {
        this.$message.success(res.data.msg)
        this.fetchTableData()
      })
      this.dialogIPVisible = false
    }, */
    // 选择项目上线或下线
    onChangeTableStatus(status) {
      if (!this.multipleSelection.length) {
        this.$message.warning('未选中任何项目')
        return
      }
      const params = this.multipleSelection.map(element => {
        return { id: element.id, activeStatus: status }
      })
      this.updataProject(params)
    },
    // 展开配置ip弹窗，将当前行id写入form id
    onConfigIp(id) {
      this.ipForm.cid = id
      this.dialogIPVisible = true
    },
    // 提交表单
    onSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'addProjectForm') {
            this.postAddForm()
          } else {
            const arr = Array.from(this.ipForm)
            this.updataProject([{
              ips: arr,
              id: this.ipForm.cid
            }])
          }
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    // 取消表单提交
    onResetForm(formName) {
      this.dialogAddVisible = false
      this.dialogIPVisible = false
      this.$refs[formName].resetFields()
    },

    handleDetail(object) {
      // query传值
      this.$router.push({ path: 'project/detail', query: { object: object }})
    },

    // 监听表格选中状态变化
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },

    // 分页部分方法
    handleSizeChange(val) {
      this.tablePage.size = val
      this.fetchTableData()
    },
    handleCurrentChange(val) {
      this.tablePage.current = val
      this.fetchTableData()
    }

  }
}
</script>

<style lang="scss" scoped>
</style>

