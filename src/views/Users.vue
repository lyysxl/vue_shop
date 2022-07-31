<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="handleSearch"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表显示区域 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="create_time" label="创建时间"> </el-table-column>
        <el-table-column prop="mobile" label="手机"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="handleUserStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                @click="handleDelete(scope.row.id)"
                size="small"
                icon="el-icon-delete"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                size="small"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 30]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryInfo.total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="60%">
      <!-- 添加表单区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="60%">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
         <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      // 用户列表数据
      userList: [],
      // 分页数据
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5,
        total: 0,
      },
      // 添加用户对话框
      addDialogVisible: false,
      // 添加用户表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      // 添加用户表单验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur',
          },
        ],
      },
      // 修改用户对话框
      editDialogVisible: false,
      // 修改用户表单数据
      editForm: {
        username: '',
        email: '',
        mobile: '',
      },
      // 修改用户表单验证规则
      editFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    /**
     * 获取用户列表数据
     */
    getUserList() {
      const { query, pagenum, pagesize } = this.queryInfo
      this.$api
        .getUserList({
          query,
          pagenum,
          pagesize,
        })
        .then((res) => {
          if (res.meta.status === 200) {
            this.userList = res.data.users
            this.queryInfo.total = res.data.total
          } else {
            this.$message.error(res.meta.msg)
          }
        })
    },
    handleSearch() {
      this.getUserList()
    },
    // 删除用户
    handleDelete(id) {
      this.$confirm('确定删除该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteUserById(id).then((res) => {
            if (res.meta.status === 200) {
              this.$message.success('删除成功')
              this.getUserList()
            } else {
              this.$message.error(res.meta.msg)
            }
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 编辑用户
    handleEdit(row) {
      this.editDialogVisible = true
      if (this.editForm.id !== row.id) {
        this.$refs.editFormRef?.resetFields()
        setTimeout(() => {
          this.editForm = {
            ...row
          }
        }, 10)
      }
    },
    // 修改用户表单确定按钮点击事件
    handleEditConfirm() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) {
          return this.$message.info('请完善表单信息')
        }

        this.$api.updateUserById(this.editForm.id, {
            username: this.editForm.username,
            email: this.editForm.email,
            mobile: this.editForm.mobile,
          }).then((res) => {
            if (res.meta.status === 200) {
              this.$message.success('修改成功')
              this.editDialogVisible = false
              this.getUserList()
            } else {
              this.$message.error(res.meta.msg)
            }
          })
      })
    },
    /**
     * 修改用户状态
     */
    handleUserStateChange(userinfo) {
      this.$api.updateUserState(userinfo.id, userinfo.mg_state).then((res) => {
        if (res.meta.status === 200) {
          this.$message.success('更新成功')
        } else {
          userinfo.mg_state = !userinfo.mg_state
          this.$message.error(res.meta.msg)
        }
      })
    },
    /**
     * 分页改变事件
     * @param {Number} current 当前页码
     */
    handleCurrentChange(current) {
      this.queryInfo.pagenum = current
      this.getUserList()
    },
    // 分页大小改变事件
    handleSizeChange(pagesize) {
      this.queryInfo.pagesize = pagesize
      this.getUserList()
    },
    // 分页上一页事件
    handlePrevClick() {
      this.queryInfo.pagenum--
      this.getUserList()
    },
    // 分页下一页事件
    handleNextClick() {
      this.queryInfo.pagenum++
      this.getUserList()
    },
    // 添加用户
    handleAddUser() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) {
          return this.$message.error('请检查表单')
        }
        this.$api
          .addUser(this.addForm)
          .then((res) => {
            if (res.meta.status === 201) {
              this.$message.success('添加成功')
              this.addDialogVisible = false
              this.getUserList()
            } else {
              this.$message.error(res.meta.msg)
            }
          })
          .catch((err) => {
            this.$message.error(err)
          })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.el-table {
  margin-top: 15px;
}

.el-pagination {
  margin-top: 15px;
}
</style>
