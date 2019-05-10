<template>
  <div class="app-container">
    <!-- filter-container -->
    <div class="app-filter-container">
      <el-input v-model="tableQuery.projectName" clearable style="width:240px;" placeholder="班级" />
      <el-select v-model="tableQuery.activeStatus" :placeholder="'请选择考核等级'" clearable style="width: 240px;">
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
    <el-table :data="tableList1" style="width: 100%;" border fit @selection-change="handleSelectionChange">

      <el-table-column :selectable="(row) => {return !(row.activeStatus === '2') }" type="selection" align="center" />
      <el-table-column align="center" label="年级" prop="project_name" />
      <el-table-column align="center" label="班级" prop="peoject_remarks" />
      <el-table-column align="center" label="宿舍号" prop="presupposeValue" />

      <el-table-column align="center" label="宿管老师考核">
        <template slot-scope="scope">
          <el-tag :type="scope.row.activeYear | activeStatus('type')">
            {{ scope.row.activeYear | activeStatus('name') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="巡查老师考核">
        <template slot-scope="scope">
          <el-tag :type="scope.row.activeQuarter | activeStatus('type')">
            {{ scope.row.activeQuarter | activeStatus('name') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column type="expand" label="详细内容" width="100">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="宿舍人员情况">
              <span>{{ props.row.activeQuarter }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.activeQuarterbeizhu }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" label="等级">
        <template slot-scope="scope">
          <el-tag :type="scope.row.activeMonth | activeStatus('type')">
            {{ scope.row.activeMonth | activeStatus('name') }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column> -->

    </el-table>

    <!--分页-->
    <el-pagination v-if="tablePage.total > 10" :current-page="tablePage.current" :page-sizes="[10, 20, 30, 40, 50]" :page-size="tablePage.size" :total="tablePage.total" class="app-table-pagination" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <!-- 弹出窗口：添加项目 -->
    <el-dialog :visible.sync="dialogAddVisible" :close-on-click-modal="false" title="新增评价">
      <el-form ref="addProjectForm" :model="addProjectForm" :rules="rules" label-width="100px">
        <el-form-item label="年级" prop="project_name">
          <el-input v-model="addProjectForm.project_name" />
        </el-form-item>
        <el-form-item label="班级" prop="peoject_remarks">
          <el-input v-model="addProjectForm.peoject_remarks" />
        </el-form-item>
        <el-form-item label="宿舍号" prop="presupposeValue">
          <el-input v-model="addProjectForm.presupposeValue" />
        </el-form-item>
        <el-form-item label="宿管老师评价" prop="activeYear">
          <el-input v-model="addProjectForm.activeYear" />
        </el-form-item>
        <el-form-item label="巡查老师评价" prop="activeQuarter">
          <el-input v-model="addProjectForm.activeQuarter" />
        </el-form-item>
        <el-form-item label="宿舍人员" prop="activeQuarterPeople">
          <el-input v-model="addProjectForm.activeQuarter" />
        </el-form-item>
        <el-form-item label="等级" prop="activeMonth">
          <el-input v-model="addProjectForm.activeMonth" />
        </el-form-item>
        <el-form-item label="备注" prop="activeQuarterbeizhu"><!-- 填写具体信息以及原因 -->
          <el-input v-model="addProjectForm.activeQuarterbeizhu" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onResetForm('addProjectForm')">取 消</el-button>
        <el-button type="primary" @click="onSubmitForm('addProjectForm')">确 定</el-button>
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
      tableList1: [],
      tableList: [{
        project_name: '1年级',
        peoject_remarks: '1班',
        presupposeValue: '212',
        activeYear: '优秀',
        activeQuarter: '优秀',
        activeMonth: '优秀',
        activeQuarterPeople: '6',
        activeQuarterbeizhu: '无'
      }],
      // 新增项目表单
      addProjectForm: {
        project_name: '',
        peoject_remarks: '',
        presupposeValue: '',
        activeYear: '',
        activeQuarter: '',
        activeMonth: '',
        activeQuarterPeople: '',
        activeQuarterbeizhu: ''
      },
      // (array-like object) 用于转化为数组
      ipForm: { '0': '', '1': '', '2': '', length: 3, cid: '' },
      dialogAddVisible: false,
      dialogIPVisible: false,
      rules: {
        project_name: [{ required: true, message: '请输入序号', trigger: 'blur' }],
        peoject_remarks: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        activeMonth: [{ required: true, message: '请输入预估等级', trigger: 'blur' }]
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
      this.tablePage.current = current
      console.log(current)
      this.tableList1 = this.tableList
      if (this.tableList.activeMonth !== current) {
        this.tableList1 = null
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

