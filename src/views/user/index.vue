<template>
  <div class="app-container">
    <!-- filter-container -->
    <div class="app-filter-container">
      <el-input v-model="tableQuery.projectName" clearable style="width:240px;" placeholder="请输入用户名称" />
      <el-input v-model="tableQuery.projectName" clearable style="width:240px;" placeholder="请输入学号或工号" />
      <el-select v-model="tableQuery.activeStatus" :placeholder="'请选择用户权限'" clearable style="width: 240px;">
        <el-option label="学生" value="0" />
        <el-option label="教师" value="1" />
        <el-option label="管理员" value="2" />
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
      <el-table-column align="center" label="账号" prop="projectName"/>
      <el-table-column align="center" label="学号或工号" prop="peojectRemarks"/>

      <el-table-column align="center" label="账号权限" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.activeStatus | activeStatus('type')">
            {{ scope.row.activeStatus | activeStatus('name') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleDetail(scope.row)">修改</el-button>
          <el-button size="mini" type="success" @click="handleDetail(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--分页-->
    <el-pagination v-if="tablePage.total > 10" :current-page="tablePage.current" :page-sizes="[10, 20, 30, 40, 50]" :page-size="tablePage.size" :total="tablePage.total" class="app-table-pagination" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <!-- 弹出窗口：添加项目 -->
    <el-dialog :visible.sync="dialogAddVisible" :close-on-click-modal="false" title="新增项目">
      <el-form ref="addProjectForm" :model="addProjectForm" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="project_name">
          <el-input v-model="addProjectForm.project_name" />
        </el-form-item>
        <el-form-item label="学号/工号" prop="peoject_remarks">
          <el-input v-model="addProjectForm.peoject_remarks"/>
        </el-form-item>
        <el-form-item label="权限级别" prop="presupposeValue">
          <el-input v-model="addProjectForm.presupposeValue" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onResetForm('addProjectForm')">取 消</el-button>
        <el-button type="primary" @click="onSubmitForm('addProjectForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出窗口：查看详情 -->
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
        project_name: [{ required: true, message: '请输入序号', trigger: 'blur' }],
        peoject_remarks: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        activeMonth: [{ required: true, message: '请输入等级', trigger: 'blur' }]
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

