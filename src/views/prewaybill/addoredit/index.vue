<template>
  <div class="main">
    <div class="dashboard-container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rulesForm"
        size="small"
      >
        <el-row :gutter="20">
          <div :class="[windowWidth < 400 ? '' :'wrap']">
            <el-col
              :sm="24"
              :xs="24"
              style="background-color: #FFFFFF;padding-bottom: 10px;"
              class="firstCol"
            >
              <el-tabs v-model="activeName">
                <el-tab-pane
                  label="基本信息"
                  name="first"
                >
                  <el-row :gutter="20">
                    <el-col
                      :lg="8"
                      :xs="24"
                    >
                      <el-form-item
                        label="订单号"
                        prop="preBillCode"
                      >
                        <div style="text-align:right;margin:0px auto 0px auto;">
                          <el-popconfirm
                            title="确认生成新的单号吗？"
                            @confirm="onCreateOrder"
                          >
                            <el-button
                              slot="reference"
                              type="primary"
                              size="mini"
                            >生成单号</el-button>
                          </el-popconfirm>
                        </div>
                        <el-input
                          v-model="ruleForm.preBillCode"
                          placeholder="请输入订单号"
                          clearable
                          size="small"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col
                      :lg="8"
                      :xs="24"
                    >
                      <el-form-item
                        label="目的地"
                        prop="consignee.countryCode"
                      >
                        <CountryCode
                          v-model="ruleForm.consignee.countryCode"
                          style="width:100%"
                          @setValue="(val) => ruleForm.consignee.countryCode = val"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col
                      :lg="8"
                      :xs="24"
                    >
                      <el-form-item
                        label="运输方式"
                        prop="carrierRouteCode"
                      >
                        <CarrierRouteCode
                          v-model="ruleForm.carrierRouteCode"
                          style="width:100%"
                          @setValue="(val) => ruleForm.carrierRouteCode = val"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                      :lg="8"
                      :xs="24"
                    >
                      <el-form-item
                        label="预报重量(KG)"
                        prop="preWeight"
                      >
                        <el-input
                          v-model="ruleForm.preWeight"
                          placeholder="请输入预报重量"
                          clearable
                          size="small"
                          @keyup.native="ruleForm.preWeight = oninput(ruleForm.preWeight,3)"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col
                      :lg="8"
                      :xs="24"
                    >
                      <el-form-item
                        label="件数"
                        prop="goodsNum"
                      >
                        <div style="text-align:right;margin:0px auto 0px auto;">
                          <el-button
                            slot="reference"
                            type="primary"
                            size="mini"
                            :disabled="volumeDisabled"
                            @click="entryVolumeClick"
                          >录入材积</el-button>
                        </div>
                        <el-input
                          v-model="ruleForm.goodsNum"
                          placeholder="请输入件数"
                          clearable
                          size="small"
                          @keyup.native="ruleForm.goodsNum=ruleForm.goodsNum.replace(/\D|^0/g,'')"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col
                      :lg="8"
                      :xs="24"
                    >
                      <el-form-item
                        label="包装"
                        prop="pack"
                      >
                        <PackType
                          v-model="ruleForm.pack"
                          style="width:100%"
                          @setValue="(val) => ruleForm.pack = val"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col
                      :lg="8"
                      :xs="24"
                    >
                      <el-form-item
                        label="货物类型"
                        prop="goodsType"
                      >
                        <GoodsType
                          v-model="ruleForm.goodsType"
                          style="width:100%"
                          @setValue="(val) => ruleForm.goodsType = val"
                          @goodsTypeSelectChange="goodsTypeSelectChange"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col
                      :lg="16"
                      :xs="24"
                      :span="16"
                    >
                      <el-form-item
                        label="备注"
                        prop="remark"
                      >
                        <el-input
                          v-model="ruleForm.remark"
                          type="textarea"
                          placeholder="请输入备注"
                          maxlength="200"
                          rows="3"
                          show-word-limit
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </div>
          <div :class="[windowWidth < 400 ? '' :'wrap']">
            <el-col
              :sm="24"
              :xs="24"
              style="background-color: #FFFFFF;margin-top: 10px;float: right;"
            >
              <div style="position: relative;">
                <el-tabs v-model="SenderAndReceiver">
                  <el-tab-pane
                    label="收件人"
                    name="Receiver"
                  >
                    <el-row :gutter="20">
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人姓名"
                          prop="consignee.name"
                        >
                          <el-input
                            v-model="ruleForm.consignee.name"
                            placeholder="请输入收件人姓名"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人公司"
                          prop="consignee.company"
                        >
                          <el-input
                            v-model="ruleForm.consignee.company"
                            placeholder="请输入收件人公司"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="税号"
                          prop="consignee.taxID"
                        >
                          <el-input
                            v-model="ruleForm.consignee.taxID"
                            placeholder="请输入税号"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人州/省"
                          prop="consignee.province"
                        >
                          <el-input
                            v-model="ruleForm.consignee.province"
                            placeholder="请输入收件人州/省"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人城市"
                          prop="consignee.city"
                        >
                          <el-autocomplete
                            v-model="ruleForm.consignee.city"
                            style="width:100%;"
                            :fetch-suggestions="queryCitySearchAsync"
                            size="small"
                            placeholder="请输入收件人城市"
                            clearable
                            @select="handleQueryCitySearchSelect"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人邮编"
                          prop="consignee.postCode"
                        >
                          <el-autocomplete
                            v-model="ruleForm.consignee.postCode"
                            style="width:100%;"
                            :fetch-suggestions="queryPostCodeSearchAsync"
                            size="small"
                            placeholder="请输入收件人邮编"
                            clearable
                            @select="handleQueryPostCodeSearchSelect"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人门牌号"
                          prop="consignee.doorplate"
                        >
                          <el-input
                            v-model="ruleForm.consignee.doorplate"
                            placeholder="请输入收件人门牌号"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人邮箱"
                          prop="consignee.email"
                        >
                          <el-input
                            v-model="ruleForm.consignee.email"
                            placeholder="请输入收件人邮箱"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人电话"
                          prop="consignee.telephone"
                        >
                          <el-input
                            v-model="ruleForm.consignee.telephone"
                            placeholder="请输入收件人电话"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人手机"
                          prop="consignee.mobile"
                        >
                          <el-input
                            v-model="ruleForm.consignee.mobile"
                            placeholder="请输入收件人手机"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人证件类型"
                          prop="consignee.certificateType"
                        >
                          <el-select
                            v-model="ruleForm.consignee.certificateType"
                            clearable
                            placeholder="请选择证件类型"
                            style="width: 100%;"
                            @change="certificateTypeChange"
                          >
                            <el-option
                              v-for="item in certificateTypeSelect"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人证件号码"
                          prop="consignee.certificateCode"
                        >
                          <el-input
                            v-model="ruleForm.consignee.certificateCode"
                            placeholder="请输入收件人证件号码"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="收件人证件有效期"
                          prop="consignee.certificatePeriod"
                        >
                          <el-date-picker
                            v-model="ruleForm.consignee.certificatePeriod"
                            align="right"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            style="width: 100%;"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="买家ID"
                          prop="buyerId"
                        >
                          <el-input
                            v-model="ruleForm.buyerId"
                            placeholder="请输入买家ID"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col
                        :lg="24"
                        :xs="24"
                        style="margin-bottom: 15px;"
                      >
                        <el-form-item
                          label="收件人地址"
                          prop="consignee.address"
                        >
                          <el-input
                            v-model="ruleForm.consignee.address"
                            placeholder="请输入收件人地址"
                            clearable
                            size="small"
                            type="textarea"
                            :rows="3"
                            maxlength="300"
                            show-word-limit
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane
                    label="发件人"
                    name="Sender"
                  >
                    <el-row :gutter="20">
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="发件人姓名"
                          prop="sender.name"
                        >
                          <el-input
                            v-model="ruleForm.sender.name"
                            placeholder="请输入发件人姓名"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="发件人公司"
                          prop="sender.company"
                        >
                          <el-input
                            v-model="ruleForm.sender.company"
                            placeholder="请输入发件人公司"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="税号"
                          prop="sender.taxID"
                        >
                          <el-input
                            v-model="ruleForm.sender.taxID"
                            placeholder="请输入税号"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="发件人国家/地区"
                          prop="sender.countryCode"
                        >
                          <CountryCode
                            v-model="ruleForm.sender.countryCode"
                            style="width:100%"
                            @setValue="(val) => ruleForm.sender.countryCode = val"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="发件人州/省"
                          prop="sender.province"
                        >
                          <el-input
                            v-model="ruleForm.sender.province"
                            placeholder="请输入发件人州/省"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="发件人城市"
                          prop="sender.city"
                        >
                          <el-input
                            v-model="ruleForm.sender.city"
                            placeholder="请输入发件人城市"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="发件人邮编"
                          prop="sender.postCode"
                        >
                          <el-input
                            v-model="ruleForm.sender.postCode"
                            placeholder="请输入发件人邮编"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="发件人邮箱"
                          prop="sender.email"
                        >
                          <el-input
                            v-model="ruleForm.sender.email"
                            placeholder="请输入发件人邮箱"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="发件人电话"
                          prop="sender.telephone"
                        >
                          <el-input
                            v-model="ruleForm.sender.telephone"
                            placeholder="请输入发件人电话"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col
                        :lg="8"
                        :xs="24"
                      >
                        <el-form-item
                          label="发件人手机"
                          prop="sender.mobile"
                        >
                          <el-input
                            v-model="ruleForm.sender.mobile"
                            placeholder="请输入发件人手机"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col
                        :lg="24"
                        :xs="24"
                        style="margin-bottom: 15px;"
                      >
                        <el-form-item
                          label="发件人地址"
                          prop="sender.address"
                        >
                          <el-input
                            v-model="ruleForm.sender.address"
                            placeholder="请输入发件人地址"
                            clearable
                            size="small"
                            type="textarea"
                            :rows="3"
                            maxlength="300"
                            show-word-limit
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
                <el-button
                  v-if="SenderAndReceiver == 'Receiver'"
                  type="primary"
                  size="small"
                  style="position: absolute;right:10px;top:3px;"
                  @click="choiceClick('选择收件人地址')"
                >收件人地址库</el-button>
                <el-button
                  v-else
                  type="primary"
                  size="small"
                  style="position: absolute;right:10px;top:3px;"
                  @click="choiceClick('选择发件人地址')"
                >发件人地址库</el-button>
              </div>
            </el-col>
          </div>
          <div :class="[windowWidth < 400 ? '' :'wrap']">
            <el-col
              :sm="12"
              :xs="24"
              style="background-color: #FFFFFF;margin-top: 10px;min-height:250px;"
              class="otherCol"
            >
              <el-tabs v-model="activeName">
                <el-tab-pane
                  label="附件上传"
                  name="first"
                />
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  :show-file-list="false"
                  :limit="5"
                  :before-upload="beforefileUpload"
                  :on-exceed="handleExceed"
                  :http-request="fileUploadHttpRequest"
                >
                  <el-button
                    slot="trigger"
                    size="small"
                    type="primary"
                  >选取文件</el-button>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                  >*最多可上传 5 个文件，单个文件大小不超过 2 MB</div>
                </el-upload>
                <el-table
                  :data="ruleForm.files"
                  size="small"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                >
                  <el-table-column
                    prop="name"
                    label="文件名称"
                    align="center"
                    min-width="180px"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="accessId"
                    label="唯一码"
                    align="center"
                    min-width="250px"
                  />
                  <el-table-column
                    prop="size"
                    label="文件大小（kb）"
                    align="center"
                    min-width="150px"
                  />
                  <el-table-column
                    label="操作"
                    fixed="right"
                    align="center"
                    :width="windowWidth >= 500 ? 220: 95"
                  >
                    <template slot-scope="scope">
                      <div v-if="windowWidth >= 500">
                        <el-button
                          size="mini"
                          @click="handlePreviewFile(scope.$index, scope.row)"
                        >预览</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click="handleDownloadFile(scope.$index, scope.row)"
                        >下载</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleFileDelete(scope.$index, scope.row)"
                        >删除</el-button>
                      </div>
                      <div v-else>
                        <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            操作按钮<i class="el-icon-arrow-down el-icon--right" />
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                              <el-button
                                size="mini"
                                type="success"
                                @click="handlePreviewFile(scope.$index,scope.row)"
                              >预览</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <el-button
                                size="mini"
                                type="primary"
                                @click="handleDownloadFile(scope.$index,scope.row)"
                              >下载</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <el-button
                                size="mini"
                                type="warning"
                                @click="handleFileDelete(scope.$index,scope.row)"
                              >删除</el-button>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tabs>
            </el-col>
            <el-col
              :sm="12"
              :xs="24"
              style="background-color: #FFFFFF;float: right;margin-top: 10px;min-height:300px;"
            >
              <el-tabs v-model="activeName">
                <el-tab-pane
                  label="额外信息"
                  name="first"
                />
              </el-tabs>
            </el-col>
          </div>
          <el-col
            v-if="ruleForm.goodsType !== 3"
            :sm="24"
            :xs="24"
            style="background-color: #FFFFFF;margin-top: 10px;min-height:200px;"
            class="tablDes"
          >
            <div style="position: relative;">
              <el-tabs v-model="activeName">
                <el-tab-pane
                  label="申报信息"
                  name="first"
                >
                  <div class="el-form-item el-form-item--small">
                    <label class="el-form-item__label">
                      <el-button
                        type="primary"
                        size="small"
                        @click="handleInvoiceAdd"
                      >新增一行</el-button>
                      <el-button
                        type="danger"
                        size="small"
                        @click="resetInvoices"
                      >清空</el-button>
                    </label>
                    <el-form-item
                      style="position: absolute;right:10px;"
                      prop="currency"
                    >
                      <label style="color: #606266;margin:10px;">申报币别</label>
                      <Currency
                        v-model="ruleForm.currency"
                        style="width:110px"
                        @setValue="(val) => ruleForm.currency = val"
                      />
                    </el-form-item>
                  </div>
                  <el-table
                    ref="invoices"
                    :data="ruleForm.invoices"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                    style="width: 100%; margin-bottom: 20px;margin-top: 15px;"
                    size="small"
                    highlight-current-row
                    :row-style="{height:'0px'}"
                    :cell-style="{padding:'0px'}"
                  >
                    <el-table-column
                      label="序号"
                      align="center"
                      width="50"
                    >
                      <template slot-scope="scope">
                        <div>
                          {{ scope.$index+1 }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="* Sku"
                      width="170"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.sku'"
                          :rules="{ required: true, message: '请输入sku', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.sku"
                            placeholder="请输入sku"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="* 英文品名"
                      width="170"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.enName'"
                          :rules="{ required: true, message: '请输入英文品名', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.enName"
                            placeholder="请输入英文品名"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="中文品名"
                      width="170"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.cnName'"
                          :rules="{ required: false, message: '请输入中文品名', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.cnName"
                            placeholder="请输入中文品名"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="* 数量"
                      width="140"
                      :rules="{ required: true, message: '请输入数量', trigger: ['blur', 'change']}"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.quantity'"
                          :rules="{ required: true, message: '请输入数量', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.quantity"
                            placeholder="请输入数量"
                            clearable
                            size="small"
                            @keyup.native="scope.row.quantity=scope.row.quantity.replace(/\D|^0/g,'')"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="* 单价"
                      width="140"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.unitcharge'"
                          :rules="{ required: true, message: '请输入单价', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.unitcharge"
                            placeholder="请输入单价"
                            clearable
                            size="small"
                            @keyup.native="scope.row.unitcharge = oninput(scope.row.unitcharge,3)"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="总价"
                      width="140"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.totalPrice'"
                          :rules="{ required: false, message: '', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.totalPrice"
                            :formatter="totalPriceFormatter(scope.row)"
                            :disabled="true"
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="计量单位"
                      width="130"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.unitCode'"
                          :rules="{ required: true, message: '请选择计量单位', trigger: ['blur', 'change']}"
                        >
                          <UnitType
                            v-model="scope.row.unitCode"
                            style="width:100%;"
                            @setValue="(val) => scope.row.unitCode = val"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="海关编码"
                      width="170"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.hsCode'"
                          :rules="{ required: false, message: '请输入海关编码', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.hsCode"
                            placeholder="请输入海关编码"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="配货信息"
                      width="170"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.note'"
                          :rules="{ required: false, message: '请输入配货信息', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.note"
                            placeholder="请输入配货信息"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="销售地址"
                      width="170"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.saleUrl'"
                          :rules="{ required: false, message: '请输入销售地址', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.saleUrl"
                            placeholder="请输入销售地址"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="商品图片地址"
                      width="200"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.pictureUrl'"
                          :rules="{ required: false, message: '请输入商品图片地址', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.pictureUrl"
                            placeholder="请输入商品图片地址"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="材质"
                      width="150"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.material'"
                          :rules="{ required: false, message: '请输入材质', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.material"
                            placeholder="请输入材质"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="用途"
                      width="150"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.use'"
                          :rules="{ required: false, message: '请输入用途', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.use"
                            placeholder="请输入用途"
                            clearable
                            size="small"
                            @keyup.native="number"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="品牌"
                      width="150"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.brand'"
                          :rules="{ required: false, message: '请输入品牌', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.brand"
                            placeholder="请输入品牌"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="原产国"
                      width="150"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.countryOrigin'"
                          :rules="{ required: false, message: '请输入原产国', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.countryOrigin"
                            placeholder="请输入原产国"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="商品单重"
                      width="160"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.netWeight'"
                          :rules="{ required: false, message: '请输入商品单重', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.netWeight"
                            placeholder="请输入商品单重"
                            clearable
                            size="small"
                            @keyup.native="scope.row.netWeight = oninput(scope.row.netWeight,3)"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="行邮税号"
                      width="160"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.posttaxNum'"
                          :rules="{ required: false, message: '请输入行邮税号', trigger: ['blur', 'change']}"
                        >
                          <el-input
                            v-model="scope.row.posttaxNum"
                            placeholder="请输入行邮税号"
                            clearable
                            size="small"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="是否带电"
                      width="70"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.isElectrified'"
                          :rules="{ required: false, message: '请选择是否带电', trigger: ['blur', 'change']}"
                        >
                          <el-switch v-model="scope.row.isElectrified" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="是否带磁"
                      width="70"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.isMagnetic'"
                          :rules="{ required: false, message: '请选择是否带磁', trigger: ['blur', 'change']}"
                        >
                          <el-switch v-model="scope.row.isMagnetic" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="是否液体"
                      width="70"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.isLiquid'"
                          :rules="{ required: false, message: '请选择是否液体', trigger: ['blur', 'change']}"
                        >
                          <el-switch v-model="scope.row.isLiquid" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="是否粉末"
                      width="70"
                    >
                      <template slot-scope="scope">
                        <el-form-item
                          :prop="'invoices.' + scope.$index + '.isPowder'"
                          :rules="{ required: false, message: '请选择是否粉末', trigger: ['blur', 'change']}"
                        >
                          <el-switch v-model="scope.row.isPowder" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      fixed="right"
                      :width="windowWidth >= 500 ? 275: 95"
                    >
                      <template slot-scope="scope">
                        <div v-if="windowWidth >= 500">
                          <el-button
                            size="mini"
                            type="success"
                            @click="handleDataCopy(scope.$index,scope.row)"
                          >复制</el-button>
                          <el-button
                            size="mini"
                            type="primary"
                            @click="handleDataPaste(scope.$index,scope.row)"
                          >粘贴</el-button>
                          <el-button
                            size="mini"
                            type="warning"
                            @click="handleDataClear(scope.$index,scope.row)"
                          >清空</el-button>
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDataDelete(scope.$index, scope.row)"
                          >删除</el-button>
                        </div>
                        <div v-else>
                          <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                              操作按钮<i class="el-icon-arrow-down el-icon--right" />
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>
                                <el-button
                                  size="mini"
                                  type="success"
                                  @click="handleDataCopy(scope.$index,scope.row)"
                                >复制</el-button>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-button
                                  size="mini"
                                  type="primary"
                                  @click="handleDataPaste(scope.$index,scope.row)"
                                >粘贴</el-button>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-button
                                  size="mini"
                                  type="warning"
                                  @click="handleDataClear(scope.$index,scope.row)"
                                >清空</el-button>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-button
                                  size="mini"
                                  type="danger"
                                  @click="handleDataDelete(scope.$index, scope.row)"
                                >删除</el-button>
                              </el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
              <el-button
                type="primary"
                size="small"
                style="position: absolute;right:10px;top:3px;"
                @click="choiceClick('选择申报信息')"
              >申报信息库</el-button>
            </div>
          </el-col>
          <el-col
            :sm="24"
            :xs="24"
            style="background-color: #FFFFFF;margin-top: 10px;height:50px;"
          >
            <div
              align="center"
              style="margin-top: 7px;"
            >
              <el-button
                v-if="!isCreate"
                type="warning"
                size="medium"
                @click="$router.back(-1)"
              >返回上一页</el-button>
              <el-button
                type="primary"
                size="medium"
                style="width: 100px"
                @click="save('ruleForm')"
              >保存</el-button>
            </div>
          </el-col>
        </el-row>
        <el-dialog
          title="编辑材积信息"
          :visible.sync="centerVolumeDialogVisible"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          width="63%"
          :fullscreen="fullscreenCargovolumes"
          :show-close="false"
        >
          <div style="position: relative;">
            <div class="el-form-item el-form-item--small">
              <label class="el-form-item__label">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleCargovolumesAdd"
                >新增一行</el-button>
                <el-button
                  type="danger"
                  size="small"
                  @click="resetCargovolumes"
                >清空</el-button>
              </label>
            </div>
            <el-table
              :data="ruleForm.cargovolumes"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              style="width: 100%; margin-bottom: 20px;margin-top: 15px;"
              size="small"
              highlight-current-row
              :row-style="{height:'0px'}"
              :cell-style="{padding:'0px'}"
              class="tablDes"
            >
              <el-table-column
                label="序号"
                align="center"
                width="50"
              >
                <template slot-scope="scope">
                  <div>
                    {{ scope.$index+1 }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="子单号"
                width="210"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'cargovolumes.' + scope.$index + '.childNumber'">
                    <el-select
                      v-model="scope.row.childNumber"
                      size="small"
                      allow-create
                      default-first-option
                      filterable
                      clearable
                      placeholder="请选择或输入子单号"
                      @change="childNumberChange"
                      @clear="clearChildNumber"
                    >
                      <el-option
                        v-for="item in childNumbers"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="* 重量(kg)"
                width="155"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'cargovolumes.' + scope.$index + '.grossweight'"
                    :rules="{ required: true, message: '请输入重量', trigger: ['blur', 'change'] }"
                  >
                    <el-input
                      v-model="scope.row.grossweight"
                      placeholder="请输入重量(kg)"
                      clearable
                      size="small"
                      @keyup.native="scope.row.grossweight = oninput(scope.row.grossweight,3)"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="* 长(cm)"
                width="155"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'cargovolumes.' + scope.$index + '.length'"
                    :rules="{ required: true, message: '请输入长', trigger: ['blur', 'change'] }"
                  >
                    <el-input
                      v-model="scope.row.length"
                      placeholder="请输入长(cm)"
                      clearable
                      size="small"
                      @keyup.native="scope.row.length = oninput(scope.row.length,1)"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="* 宽(cm)"
                width="155"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'cargovolumes.' + scope.$index + '.width'"
                    :rules="{ required: true, message: '请输入宽', trigger: ['blur', 'change'] }"
                  >
                    <el-input
                      v-model="scope.row.width"
                      placeholder="请输入宽(cm)"
                      clearable
                      size="small"
                      @keyup.native="scope.row.width = oninput(scope.row.width,1)"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="* 高(cm)"
                width="155"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'cargovolumes.' + scope.$index + '.height'"
                    :rules="{ required: true, message: '请输入高', trigger: ['blur', 'change'] }"
                  >
                    <el-input
                      v-model="scope.row.height"
                      placeholder="请输入高(cm)"
                      clearable
                      size="small"
                      @keyup.native="scope.row.height = oninput(scope.row.height,1)"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                fixed="right"
                :width="windowWidth >= 500 ? 275: 95"
              >
                <template slot-scope="scope">
                  <div v-if="windowWidth >= 500">
                    <el-button
                      size="mini"
                      type="success"
                      @click="handleCargovolumesDataCopy(scope.$index,scope.row)"
                    >复制</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleCargovolumesDataPaste(scope.$index,scope.row)"
                    >粘贴</el-button>
                    <el-button
                      size="mini"
                      type="warning"
                      @click="handleCargovolumesDataClear(scope.$index,scope.row)"
                    >清空</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleCargovolumesDataDelete(scope.$index, scope.row)"
                    >删除</el-button>
                  </div>
                  <div v-else>
                    <el-dropdown trigger="click">
                      <span class="el-dropdown-link">
                        操作按钮<i class="el-icon-arrow-down el-icon--right" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <el-button
                            size="mini"
                            type="success"
                            @click="handleCargovolumesDataCopy(scope.$index,scope.row)"
                          >复制</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button
                            size="mini"
                            type="primary"
                            @click="handleCargovolumesDataPaste(scope.$index,scope.row)"
                          >粘贴</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button
                            size="mini"
                            type="warning"
                            @click="handleCargovolumesDataClear(scope.$index,scope.row)"
                          >清空</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleCargovolumesDataDelete(scope.$index, scope.row)"
                          >删除</el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="closeVolumeDialogClick('ruleForm')">取消</el-button>
            <el-button
              type="primary"
              @click="cargovolumesClick('ruleForm')"
            >确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
      <el-dialog
        :title="choiceTitle"
        :visible.sync="centerChoiceDialogVisible"
        width="60%"
        :fullscreen="fullscreenChoice"
        @close="closeChoiceDialogClick"
      >
        <div v-if="choiceTitle =='选择收件人地址'">
          <Consignee
            :is-show-operation="isShowOperation"
            :chose-data="choseData"
          />
        </div>
        <div v-else-if="choiceTitle == '选择发件人地址'">
          <Sender
            :is-show-operation="isShowOperation"
            :chose-data="choseData"
          />
        </div>
        <div v-else-if="choiceTitle == '选择申报信息'">
          <Invoice
            :is-show-operation="isShowOperation"
            :chose-data="choseData"
          />
        </div>
      </el-dialog>
    </div>
    <el-backtop>
      <div width="100%" title="返回顶部">
        <i class="el-icon-top" />
      </div>
    </el-backtop>
    <el-image-viewer v-if="showImg" :on-close="closeImageViewer" :url-list="[viewerUrl]" />
    <Excel v-if="showExcel" :url="viewerUrl" :preview-dialog="showExcel" :title="previewFileName" @hidePlugDialog="hidePlugDialog" />
    <Pdf v-if="showPdf" :url="viewerUrl" :preview-dialog="showPdf" :title="previewFileName" @hidePlugDialog="hidePlugDialog" />
    <Word v-if="showWord" :url="viewerUrl" :preview-dialog="showWord" :title="previewFileName" @hidePlugDialog="hidePlugDialog" />
    <Other v-if="showOther" :url="viewerUrl" :preview-dialog="showOther" :title="previewFileName" @hidePlugDialog="hidePlugDialog" />
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import CarrierRouteCode from '@/components/Select/CarrierRouteCode'
import CountryCode from '@/components/Select/CountryCode'
import PackType from '@/components/Select/PackType'
import UnitType from '@/components/Select/UnitType'
import GoodsType from '@/components/Select/GoodsType'
import Currency from '@/components/Select/Currency'
import Consignee from '@/components/Table/Consignee'
import Sender from '@/components/Table/Sender'
import Invoice from '@/components/Table/Invoice'
import Excel from '@/components/FilePreview/Excel'
import Pdf from '@/components/FilePreview/Pdf'
import Word from '@/components/FilePreview/Word'
import Other from '@/components/FilePreview/Other'
import { insert, getDetail, edit } from '@/api/prewaybill'
import { getCommonSenderDefaultAsync } from '@/api/client'
import { getCountryListCache } from '@/api/cache'
import { upload, deleteFile } from '@/api/file'
import { searchAddressbook } from '@/api/tool'

export default {
  name: 'Addoredit',
  components: {
    Pdf,
    Other,
    Word,
    Excel,
    ElImageViewer,
    CarrierRouteCode,
    CountryCode,
    PackType,
    UnitType,
    GoodsType,
    Currency,
    Consignee,
    Sender,
    Invoice
  },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (value === '' && this.ruleForm.consignee.telephone === '') {
        callback(new Error('手机号码或电话至少输入一项！'))
      } else {
        callback()
      }
    }
    var validateTelephone = (rule, value, callback) => {
      if (value === '' && this.ruleForm.consignee.mobile === '') {
        callback(new Error('手机号码或电话至少输入一项！'))
      } else {
        callback()
      }
    }
    var validateSenderMobile = (rule, value, callback) => {
      if (value === '' && this.ruleForm.sender.telephone === '') {
        callback(new Error('手机号码或电话至少输入一项！'))
      } else {
        callback()
      }
    }
    var validateSenderTelephone = (rule, value, callback) => {
      if (value === '' && this.ruleForm.sender.mobile === '') {
        callback(new Error('手机号码或电话至少输入一项！'))
      } else {
        callback()
      }
    }
    var validateCertificateCode = (rule, value, callback) => {
      if (value === '' && this.ruleForm.consignee.certificateType !== '') {
        callback(new Error('证件类型不为空时，收件人证件号码必填！'))
      } else {
        callback()
      }
    }
    var validateCertificatePeriod = (rule, value, callback) => {
      if (value === '' && this.ruleForm.consignee.certificateType !== '') {
        callback(new Error('证件类型不为空时，收件人证件有效期必填！'))
      } else {
        callback()
      }
    }
    return {
      centerVolumeDialogVisible: false,
      centerChoiceDialogVisible: false,
      fullscreenChoice: false,
      choiceTitle: '',
      showImg: false,
      showPdf: false,
      showWord: false,
      showOther: false,
      showExcel: false,
      viewerUrl: '',
      addressCitybook: [],
      addressPostalCodebook: [],
      consigneecityloading: false,
      previewFileName: '',
      volumeDisabled: false,
      isShowOperation: false,
      windowWidth: document.documentElement.clientWidth,
      activeName: 'first',
      fullscreenCargovolumes: false,
      SenderAndReceiver: 'Receiver',
      certificateTypeSelect: [
        { value: 1, label: '身份证' },
        { value: 2, label: '护照' }
      ],
      fileList: [],
      isCreate: true,
      copyInvoice: {},
      childNumbers: [],
      inputChildNumbers: [],
      copyCargovolume: {},
      oldCargovolumes: [],
      choisedCargovolumes: [],
      ruleForm: {
        preBillCode: '',
        carrierRouteCode: '',
        pack: 1,
        goodsType: 1,
        preWeight: 0.2,
        goodsNum: 1,
        remark: '',
        currency: 1,
        consignee: {
          name: '',
          company: '',
          countryCode: '',
          province: '',
          city: '',
          address: '',
          postCode: '',
          telephone: '',
          mobile: '',
          email: '',
          taxID: '',
          doorplate: '',
          certificateType: '',
          certificateCode: '',
          certificatePeriod: ''
        },
        sender: {
          name: '',
          company: '',
          countryCode: '',
          province: '',
          city: '',
          address: '',
          postCode: '',
          telephone: '',
          mobile: '',
          email: '',
          taxID: ''
        },
        files: [],
        invoices: [],
        cargovolumes: []
      },
      rulesForm: {
        preBillCode: [
          {
            required: true,
            message: '请输入订单号',
            trigger: ['blur', 'change']
          },
          {
            min: 5,
            max: 60,
            message: '长度在 5 到 60 个字符',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^(?!_)(?!.*?_$)(?!.*?-$)[a-zA-Z0-9_-]+$/,
            message: '格式错误，只能包含数字、字母、下划线(_)、连接号(-)',
            trigger: ['blur', 'change']
          }
        ],
        preWeight: [
          {
            required: true,
            message: '请输入预报重量',
            trigger: ['blur', 'change']
          }
        ],
        'consignee.countryCode': [
          {
            required: true,
            message: '请选择目的地',
            trigger: ['blur', 'change']
          }
        ],
        carrierRouteCode: [
          {
            required: true,
            message: '请选择运输方式',
            trigger: ['blur', 'change']
          }
        ],
        goodsNum: [
          {
            required: true,
            message: '请输入件数',
            trigger: ['blur', 'change']
          }
        ],
        pack: [
          {
            required: true,
            message: '请选择包装方式',
            trigger: ['blur', 'change']
          }
        ],
        goodsType: [
          {
            required: true,
            message: '请选择货物类型',
            trigger: ['blur', 'change']
          }
        ],
        'consignee.name': [
          {
            required: true,
            message: '请输入收件人姓名',
            trigger: ['blur', 'change']
          }
        ],
        'consignee.address': [
          {
            required: true,
            message: '请输入收件人地址',
            trigger: ['blur', 'change']
          }
        ],
        'consignee.telephone': [
          { validator: validateTelephone, trigger: ['blur', 'change'] }
        ],
        'consignee.mobile': [
          { validator: validateMobile, trigger: ['blur', 'change'] }
        ],
        'consignee.certificateCode': [
          { validator: validateCertificateCode, trigger: ['blur', 'change'] }
        ],
        'consignee.certificatePeriod': [
          { validator: validateCertificatePeriod, trigger: ['blur', 'change'] }
        ],
        'sender.name': [
          { required: true, message: '请输入发件人姓名', trigger: ['blur', 'change'] }
        ],
        'sender.countryCode': [
          { required: true, message: '请选择发件人国家/地区', trigger: ['blur', 'change'] }
        ],
        'sender.address': [
          { required: true, message: '请输入发件人地址', trigger: ['blur', 'change'] }
        ],
        'sender.telephone': [
          { validator: validateSenderTelephone, trigger: ['blur', 'change'] }
        ],
        'sender.mobile': [
          { validator: validateSenderMobile, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {
    if (this.windowWidth < 400) {
      this.fullscreenCargovolumes = true
      this.fullscreenChoice = true
    }
    var id = this.$route.query.id
    if (id !== undefined && id > 0) {
      this.getOrder(id)
    } else {
      this.getSender()
      this.handleInvoiceAdd()
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth
        this.windowWidth = window.fullWidth // 宽
        this.fullscreenCargovolumes = false
        this.fullscreenChoice = false
        if (this.windowWidth < 400) {
          this.fullscreenCargovolumes = true
          this.fullscreenChoice = true
        }
      })()
    }
  },
  methods: {
    getOrder(id) {
      getDetail(id).then((resp) => {
        this.ruleForm = resp.data
        var countrys = getCountryListCache()
        this.ruleForm.consignee.countryCode = countrys.filter((item) => item.id === this.ruleForm.countryId)[0].code.toString()
        this.ruleForm.sender.countryCode = countrys.filter((item) => item.id === this.ruleForm.sender.countryId)[0].code.toString()
        if (this.ruleForm.consignee.certificateType === 0) {
          this.ruleForm.consignee.certificateType = ''
        }
        if (this.ruleForm.consignee.certificatePeriod) {
          this.ruleForm.consignee.certificatePeriod = this.ruleForm.consignee.certificatePeriod.split('~')
        }
        if (this.$route.query.isEdit === 'true' || this.$route.query.isEdit) {
          document.title = '编辑订单'
          this.isCreate = false
        } else {
          document.title = '创建订单'
          this.isCreate = true
          this.ruleForm.preBillCode = ''
        }
        this.goodsTypeSelectChange(this.ruleForm.goodsType)
        this.oldCargovolumes = JSON.parse(JSON.stringify(this.ruleForm.cargovolumes))
      })
    },
    getSender() {
      var countrys = getCountryListCache()
      getCommonSenderDefaultAsync(0).then((resp) => {
        this.ruleForm.sender = resp.data
        this.ruleForm.sender.countryCode = countrys.filter((item) => item.id === this.ruleForm.sender.countryId)[0].code.toString()
      })
    },
    onCreateOrder() {
      this.ruleForm.preBillCode = new Date().getTime().toString()
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    fileUploadHttpRequest(option) {
      const formData = new FormData()
      formData.append('file', option.file)
      upload(formData).then(resp => {
        if (this.ruleForm.files === undefined || this.ruleForm.files === null) {
          this.ruleForm.files = []
        }
        this.ruleForm.files.push({ name: resp.data.name, accessId: resp.data.accessId, size: resp.data.size, accessURL: resp.data.accessURL })
      })
    },
    /** 上传前 */
    beforefileUpload(file) {
      // 限制文件类型
      const strIndex = file.name.lastIndexOf('.')
      const isDoc = file.name.substring(strIndex).toLowerCase() === '.doc'
      const isDocx = file.name.substring(strIndex).toLowerCase() === '.docx'
      const isXlsx = file.name.substring(strIndex).toLowerCase() === '.xlsx'
      const isXls = file.name.substring(strIndex).toLowerCase() === '.xls'
      const isPdf = file.name.substring(strIndex).toLowerCase() === '.pdf'
      const isPng = file.name.substring(strIndex).toLowerCase() === '.png'
      const isJpg = file.name.substring(strIndex).toLowerCase() === '.jpg'
      const isGif = file.name.substring(strIndex).toLowerCase() === '.gif'
      if (!isDoc && !isDocx && !isXlsx && !isXls && !isPdf && !isPng && !isJpg && !isGif) {
        this.$message.warning(`只能上传.doc,.docx,.xlsx,.xls,.pdf,.png,.jpg,.gif文件`)
        return false
      }
      if ((file.size / 1024 / 1024) > 2) {
        this.$message.warning(`文件大小请勿超过 2 MB ，当前提交文件大小 ${(file.size / 1024 / 1024).toFixed(2)} MB`)
        return false
      }
      if (this.ruleForm.files) {
        if (this.ruleForm.files.filter((item) => item.name === file.name).length > 0) {
          this.$message.warning(`请勿上传重复文件`)
          return false
        }
      }
      return true
    },
    handlePreviewFile(index, row) {
      const strIndex = row.name.lastIndexOf('.')
      var suffix = row.name.substring(strIndex).toLowerCase()
      this.previewFileName = row.name
      this.viewerUrl = row.accessURL
      switch (suffix) {
        case '.png' :
        case '.jpg' :
          this.showImg = true
          break
        case '.xls':
          this.showOther = true
          break
        case '.xlsx':
          this.showExcel = true
          break
        case '.pdf':
          this.showPdf = true
          break
        case '.docx':
          this.showWord = true
          break
      }
    },
    hidePlugDialog() {
      if (this.showPdf) {
        this.showPdf = false
      }
      if (this.showWord) {
        this.showWord = false
      }
      if (this.showExcel) {
        this.showExcel = false
      }
      if (this.showOther) {
        this.showOther = false
      }
    },
    handleFileDelete(index, row) {
      if (this.fileList.length === 0) {
        return this.$confirm(
          `确定移除 <strong>${row.name}</strong> ？`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            type: 'warning'
          }
        ).then(() => {
          deleteFile(row.accessId).then(resp => {
            this.ruleForm.files.splice(index, 1)
            this.$message({
              type: 'success',
              message: `附件 ${row.name} 删除成功!`
            })
          })
        })
      }
    },
    closeImageViewer() {
      this.showImg = false
    },
    handleDownloadFile(index, row) {
      window.location.href = row.accessURL
    },
    handleInvoiceAdd() {
      if (this.ruleForm.invoices === undefined) {
        this.ruleForm.invoices = []
      }
      const invoice = {}
      invoice.sku = ''
      invoice.enName = ''
      invoice.cnName = ''
      invoice.quantity = ''
      invoice.unitCode = 1
      invoice.unitcharge = ''
      invoice.netWeight = ''
      invoice.hsCode = ''
      invoice.note = ''
      invoice.saleUrl = ''
      invoice.pictureUrl = ''
      invoice.material = ''
      invoice.use = ''
      invoice.brand = ''
      invoice.countryOrigin = ''
      invoice.posttaxNum = ''
      invoice.isElectrified = false
      invoice.isMagnetic = false
      invoice.isLiquid = false
      invoice.isPowder = false
      this.ruleForm.invoices.push(invoice)
    },
    totalPriceFormatter(row) {
      if (row.quantity && row.unitcharge) {
        row.totalPrice = parseFloat(
          parseInt(row.quantity) * parseFloat(row.unitcharge)
        ).toFixed(3)
      }
    },
    number() {
      this.famount = this.famount.replace(/[^\.\d]/g, '')
      this.famount = this.famount.replace('.', '')
    },
    handleDataCopy(index, row) {
      const data = JSON.parse(JSON.stringify(row))
      data.id = 0
      data.id = 0
      this.copyInvoice = data
    },
    handleDataPaste(index, row) {
      var data = JSON.parse(JSON.stringify(this.copyInvoice))
      this.ruleForm.invoices.splice(index, 1, data)
    },
    handleDataClear(index, row) {
      const invoice = {}
      invoice.index = index
      invoice.sku = ''
      invoice.enName = ''
      invoice.cnName = ''
      invoice.quantity = ''
      invoice.unitCode = 1
      invoice.unitcharge = ''
      invoice.netWeight = ''
      invoice.hsCode = ''
      invoice.note = ''
      invoice.saleUrl = ''
      invoice.pictureUrl = ''
      invoice.material = ''
      invoice.use = ''
      invoice.brand = ''
      invoice.countryOrigin = ''
      invoice.posttaxNum = ''
      invoice.isElectrified = false
      invoice.isMagnetic = false
      invoice.isLiquid = false
      invoice.isPowder = false
      this.ruleForm.invoices.splice(index, 1, invoice)
    },
    handleDataDelete(index, row) {
      if (this.ruleForm.invoices.length === 1) {
        this.$message.warning('至少有一条申报信息')
        return
      }
      this.ruleForm.invoices.splice(index, 1)
    },
    resetInvoices() {
      this.ruleForm.invoices = []
      this.handleInvoiceAdd()
    },
    choiceClick(title) {
      this.centerChoiceDialogVisible = true
      this.choiceTitle = title
    },
    entryVolumeClick() {
      if (this.ruleForm.goodsNum) {
        if (this.ruleForm.cargovolumes === undefined) {
          this.ruleForm.cargovolumes = []
        }
        const goodsNum = this.ruleForm.goodsNum - this.ruleForm.cargovolumes.length
        if (goodsNum > 0) {
          for (let index = 0; index < goodsNum; index++) {
            this.handleCargovolumesAdd()
          }
        } else if (goodsNum < 0) {
          const removeNum = this.ruleForm.cargovolumes.length + goodsNum
          var newCargovolumes = []
          this.ruleForm.cargovolumes.forEach(function (value, index) {
            if (index < removeNum) {
              newCargovolumes.push(value)
            }
          })
          this.ruleForm.cargovolumes = newCargovolumes
        }
      }

      this.buildChildNumber()
    },
    buildChildNumber() {
      if (this.ruleForm.preBillCode === '') {
        this.$message.warning('请先输入订单号')
        return
      }
      if (this.ruleForm.goodsNum <= 0) {
        this.$message.warning('请先输入件数')
        return
      }
      this.centerVolumeDialogVisible = true
      this.childNumbers = []
      for (let index = 0; index < this.inputChildNumbers.length; index++) {
        var obj1 = {}
        obj1.label = this.inputChildNumbers[index]
        obj1.value = this.inputChildNumbers[index]
        this.childNumbers.push(obj1)
      }
      for (let index = 0; index < this.ruleForm.goodsNum; index++) {
        var obj2 = {}
        obj2.label = `${this.ruleForm.preBillCode}_${index + 1}`
        obj2.value = `${this.ruleForm.preBillCode}_${index + 1}`
        this.childNumbers.push(obj2)
      }
      this.filterChoiseNum()
    },
    clearChildNumber() {
      if (this.choisedCargovolumes.length > 0) {
        for (let index = 0; index < this.choisedCargovolumes.length; index++) {
          const data = this.choisedCargovolumes[index]
          if (this.childNumbers.filter((item) => item.value === data).length === 0 && this.ruleForm.cargovolumes.filter((item) => item.childNumber === data).length === 0) {
            var obj = {}
            obj.label = data
            obj.value = data
            this.childNumbers.push(obj)
          }
        }
      }
    },
    childNumberChange(val) {
      if (val) {
        if (this.choisedCargovolumes.filter((item) => item === val).length === 0) {
          this.choisedCargovolumes.push(val)
        }
        if (this.childNumbers.filter((item) => item.value === val).length === 0 && this.inputChildNumbers.filter((item) => item === val).length === 0) {
          this.inputChildNumbers.push(val)
          var obj = {}
          obj.label = val
          obj.value = val
          this.childNumbers.push(obj)
        }
        this.filterChoiseNum()
      } else {
        this.filterChoiseNum()
      }
    },
    filterChoiseNum() {
      var choise = this.ruleForm.cargovolumes.filter(
        (item) => item.childNumber !== ''
      )
      if (choise.length > 0) {
        for (let index = 0; index < choise.length; index++) {
          this.childNumbers = this.childNumbers.filter((item) => item.value !== choise[index].childNumber)
          if (this.choisedCargovolumes.filter((item) => item === choise[index].childNumber).length === 0) {
            this.choisedCargovolumes.push(choise[index].childNumber)
          }
        }
      }
      this.clearChildNumber()
    },
    oninput(val, limit = 0) {
      val = val.replace(/[^\d.]/g, '')
      val = val.replace(/^00/, '0.')
      val = val.replace(/^\./g, '0.')
      val = val.replace(/\.{2,}/g, '.')
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      ;/^0\d+/.test(val) ? (val = val.slice(1)) : ''
      const str = '^(\\d+)\\.(\\d{' + limit + '}).*$'
      const reg = new RegExp(str)
      if (limit === 0) {
        val = val.replace(reg, '$1')
      } else {
        val = val.replace(reg, '$1.$2')
      }
      return val
    },
    resetCargovolumes() {
      this.ruleForm.cargovolumes = []
      this.inputChildNumbers = []
      this.ruleForm.goodsNum = 1
      this.choisedCargovolumes = []
      this.copyInvoice = []
      this.childNumbers = []
      this.inputChildNumbers = []
      this.copyCargovolume = []
      this.oldCargovolumes = []
      this.handleCargovolumesAdd()
      this.buildChildNumber()
    },
    handleCargovolumesAdd() {
      if (this.ruleForm.cargovolumes === undefined) {
        this.ruleForm.cargovolumes = []
      }
      const cargovolume = {}
      cargovolume.childNumber = ''
      cargovolume.length = ''
      cargovolume.width = ''
      cargovolume.height = ''
      cargovolume.grossweight = ''
      this.ruleForm.cargovolumes.push(cargovolume)
      if (this.ruleForm.cargovolumes.length > this.ruleForm.goodsNum) {
        this.ruleForm.goodsNum++
        this.buildChildNumber()
      }
    },
    cargovolumesClick(ruleForm) {
      var validates = []
      for (let index = 0; index < this.ruleForm.cargovolumes.length; index++) {
        validates.push('cargovolumes.' + index + '.length')
        validates.push('cargovolumes.' + index + '.width')
        validates.push('cargovolumes.' + index + '.height')
        validates.push('cargovolumes.' + index + '.grossweight')
      }
      var validStr = ''
      validates.map((item) => {
        this.$refs[ruleForm].validateField(item, (result) => {
          validStr += result
        })
      })
      if (validStr) {
        return
      }
      this.centerVolumeDialogVisible = false
      this.ruleForm.goodsNum = this.ruleForm.cargovolumes.length
      this.ruleForm.preWeight = 0
      this.ruleForm.cargovolumes.map((item) => {
        this.ruleForm.preWeight += parseFloat(item.grossweight)
      })
    },
    closeVolumeDialogClick(ruleForm) {
      var validates = []
      for (let index = 0; index < this.ruleForm.cargovolumes.length; index++) {
        validates.push('cargovolumes.' + index + '.length')
        validates.push('cargovolumes.' + index + '.width')
        validates.push('cargovolumes.' + index + '.height')
        validates.push('cargovolumes.' + index + '.grossweight')
      }
      var validStr = ''
      validates.map((item) => {
        this.$refs[ruleForm].validateField(item, (result) => {
          validStr += result
        })
      })
      if (validStr) {
        return
      } else {
        this.centerVolumeDialogVisible = false
      }
    },
    handleCargovolumesDataCopy(index, row) {
      const data = JSON.parse(JSON.stringify(row))
      data.id = 0
      data.childNumber = ''
      this.copyCargovolume = data
    },
    handleCargovolumesDataPaste(index, row) {
      var data = JSON.parse(JSON.stringify(this.copyCargovolume))
      if (row.childNumber !== '') {
        data.childNumber = row.childNumber
      }
      this.ruleForm.cargovolumes.splice(index, 1, data)
    },
    handleCargovolumesDataClear(index, row) {
      const cargovolume = {}
      cargovolume.childNumber = ''
      cargovolume.length = ''
      cargovolume.width = ''
      cargovolume.height = ''
      cargovolume.grossweight = ''
      this.ruleForm.cargovolumes.splice(index, 1, cargovolume)
      this.clearChildNumber()
    },
    handleCargovolumesDataDelete(index, row) {
      if (this.ruleForm.cargovolumes.length === 1) {
        this.$message.warning('至少有一条材积信息')
        return
      }
      this.ruleForm.goodsNum--
      this.ruleForm.cargovolumes.splice(index, 1)
      this.buildChildNumber()
    },
    closeSenderAndConsigneeeDialogClick() {
      this.centerChoiceDialogVisible = false
    },
    choseData(data) {
      var countrys = getCountryListCache()
      if (this.choiceTitle === '选择收件人地址') {
        data.id = this.ruleForm.consignee.id
        this.ruleForm.consignee = data
        this.ruleForm.consignee.countryCode = countrys.filter((item) => item.id === this.ruleForm.consignee.countryId)[0].code.toString()
      } else if (this.choiceTitle === '选择发件人地址') {
        data.id = this.ruleForm.sender.id
        this.ruleForm.sender = data
        this.ruleForm.sender.countryCode = countrys.filter((item) => item.id === this.ruleForm.sender.countryId)[0].code.toString()
      } else if (this.choiceTitle === '选择申报信息') {
        if (this.ruleForm.invoices === undefined) {
          this.ruleForm.invoices = []
        }
        data.id = 0
        this.ruleForm.invoices.push(data)
      }
      this.closeSenderAndConsigneeeDialogClick()
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填项后重新提交')
          return false
        }
        this.ruleForm.invoices.forEach((item) => {
          item.quantity = parseInt(item.quantity)
          item.unitcharge = parseFloat(item.unitcharge)
          item.netWeight = parseFloat(item.netWeight ? item.netWeight : 0)
        })
        if (this.ruleForm.consignee.certificateType === '') {
          this.ruleForm.consignee.certificateType = 0
        }
        this.ruleForm.consignee.certificatePeriod = this.ruleForm.consignee.certificatePeriod
          ? `${this.ruleForm.consignee.certificatePeriod[0]
            .toString()
            .substring(0, 10)}~${this.ruleForm.consignee.certificatePeriod[1]
            .toString()
            .substring(0, 10)}`
          : ''
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        if (!this.isCreate) {
          edit(this.ruleForm).then((resp) => {
            this.$notify({ title: '成功', message: '订单修改成功', type: 'success', 'duration': 1500 })
            this.$router.push('/prewaybill/index')
          })
          loading.close()
        } else {
          insert(this.ruleForm).then((resp) => {
            this.$notify({ title: '成功', message: '订单预录成功', type: 'success', 'duration': 1500 })
            this.$router.push('/prewaybill/index')
          })
          loading.close()
        }
      })
    },
    closeChoiceDialogClick() {
      this.centerChoiceDialogVisible = false
    },
    goodsTypeSelectChange(val) {
      if (val === 3) {
        this.volumeDisabled = true
        this.ruleForm.cargovolumes = []
        this.ruleForm.invoices = []
      } else {
        this.volumeDisabled = false
        if (this.ruleForm.invoices.length === 0 || this.ruleForm.invoices === undefined) {
          this.handleInvoiceAdd()
        }
      }
    },
    certificateTypeChange(val) {
      if (val) {
        var validates = []
        validates.push('consignee.certificateCode')
        validates.push('consignee.certificatePeriod')
        validates.map((item) => {
          this.$refs['ruleForm'].validateField(item, (result) => {
          })
        })
      } else {
        this.$nextTick(() => {
          this.$refs['ruleForm'].clearValidate(['consignee.certificateCode'])
          this.$refs['ruleForm'].clearValidate(['consignee.certificatePeriod'])
        })
      }
    },
    queryCitySearchAsync(queryString, cb) {
      if (queryString !== '' && this.ruleForm.consignee.countryCode !== '' && this.ruleForm.carrierRouteCode !== '') {
        var queryData = { carrierRoutesCode: this.ruleForm.carrierRouteCode, countryCode: this.ruleForm.consignee.countryCode, city: this.ruleForm.consignee.city }
        searchAddressbook(queryData).then(resp => {
          if (resp.data) {
            this.addressCitybook = resp.data
          } else {
            this.addressCitybook = []
            this.addressCitybook.push({ postalCode: '', city: queryString })
          }
          cb(this.addressCitybook.map(x => ({ ...x, value: x.postalCode === '' ? x.city : x.province + '(' + x.provinceCode + ')-' + x.city + '-' + x.postalCode })))
        })
      }
    },
    handleQueryCitySearchSelect(val) {
      if (val) {
        this.ruleForm.consignee.city = val.city
        this.ruleForm.consignee.province = !val.provinceCode ? val.province : val.provinceCode
        this.ruleForm.consignee.postCode = val.postalCode
        this.addressCitybook = []
        this.addressCitybook.push({ postalCode: '', city: this.ruleForm.consignee.city })
      }
    },
    queryPostCodeSearchAsync(queryString, cb) {
      if (queryString !== '' && this.ruleForm.consignee.countryCode !== '' && this.ruleForm.carrierRouteCode !== '') {
        var queryData = { carrierRoutesCode: this.ruleForm.carrierRouteCode, countryCode: this.ruleForm.consignee.countryCode, postalCode: this.ruleForm.consignee.postCode }
        searchAddressbook(queryData).then(resp => {
          if (resp.data) {
            this.addressPostalCodebook = resp.data
          } else {
            this.addressPostalCodebook = []
            this.addressPostalCodebook.push({ postalCode: queryString, city: '' })
          }
          cb(this.addressPostalCodebook.map(x => ({ ...x, value: x.city === '' ? x.postalCode : x.province + '(' + x.provinceCode + ')-' + x.city + '-' + x.postalCode })))
        })
      }
    },
    handleQueryPostCodeSearchSelect(val) {
      if (val) {
        this.ruleForm.consignee.city = val.city
        this.ruleForm.consignee.province = !val.provinceCode ? val.province : val.provinceCode
        this.ruleForm.consignee.postCode = val.postalCode
        this.addressPostalCodebook = []
        this.addressPostalCodebook.push({ postalCode: this.ruleForm.consignee.postCode, city: '' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #eaedf1 !important;
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
@media only screen and (min-width: 768px) {
  .el-col-sm-12 {
    width: 49.7% !important;
  }
  .firstCol {
    margin-right: 10px;
  }
  .otherCol {
    margin-right: 10px;
  }
}
@media only screen and (max-width: 767px) {
  .el-col-sm-12 {
    margin-top: 10px;
  }
  .firstCol {
    margin-top: auto;
  }
}
.dashboard {
  &-container {
    margin: 10px 20px 10px 20px;
  }
  &-text {
    font-size: 25px;
    line-height: 46px;
  }
}

.wrap {
  display: -webkit-box;
  background-color: #eaedf1 !important;
}
</style>
