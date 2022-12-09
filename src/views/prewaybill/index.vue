<template>
  <div class="main">
    <div class="dashboard-container">
      <!--筛选条件-->
      <el-row style="background-color: #ffffff; padding: 5px 20px 5px 20px">
        <el-form
          ref="formQuery"
          :model="formQuery"
          size="small"
        >
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="单号查询"
              prop="codeType"
            >
              <el-checkbox
                v-model="formQuery.isLike"
                prop="isLike"
                label="true"
                style="float: right"
                @change="isLikeChange"
              >模糊匹配</el-checkbox>
              <el-select v-model="formQuery.codeType">
                <el-option
                  label="订单号"
                  :value="1"
                />
                <el-option
                  label="运单号"
                  :value="2"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              prop="code"
              class="custransform"
            >
              <el-input
                ref="codetextarea"
                v-model="formQuery.code"
                :type="inputCodeType"
                rows="3"
                clearable
                resize="none"
                :placeholder="
                  inputCodeType === 'text'
                    ? '请输入单号查询(模糊匹配)'
                    : '请输入单号查询，多个单号请回车换行输入'
                "
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="运输方式"
              prop="carrierRouteId"
            >
              <CarrierRouteId
                v-model="formQuery.carrierRouteId"
                @setValue="(val) => (formQuery.carrierRouteId = val)"
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="目的地"
              prop="countryId"
            >
              <CountryId
                v-model="formQuery.countryId"
                @setValue="(val) => (formQuery.countryId = val)"
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="用户"
              prop="clientId"
            >
              <Client
                v-model="formQuery.clientId"
                @setValue="(val) => (formQuery.clientId = val)"
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="是否已打印"
              prop="labelPrintStatus"
            >
              <el-select
                v-model="formQuery.labelPrintStatus"
                placeholder="是否已打印"
                clearable
              >
                <el-option
                  label="全部"
                  :value="0"
                />
                <el-option
                  label="未打印"
                  :value="2"
                />
                <el-option
                  label="已打印"
                  :value="1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="收件人"
              prop="consigneeName"
            >
              <el-input
                v-model="formQuery.consigneeName"
                placeholder="收件人"
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="选择时间"
              prop="creationTime"
            >
              <el-date-picker
                v-model="formQuery.creationTime"
                type="daterange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="5"
            :xs="24"
          >
            <el-form-item style="margin-top: 27px">
              <el-button
                type="primary"
                size="medium"
                icon="el-icon-search"
                @click="onQuery"
              >查询</el-button>
              <el-button
                plain
                size="medium"
                icon="el-icon-refresh"
                @click="resetForm('formQuery')"
              >重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <!--操作按钮-->
      <el-row style="background-color: #ffffff; padding: 5px 0px 10px 20px; margin-top: 10px;">
        <el-col style="width: 55px;margin-top: 5px;">
          <button
            type="button"
            class="el-button el-button--primary el-button--small"
            @click="createOrder"
          >
            <i
              class="icon iconfont el-icon-dy-chuangjianv"
              style="vertical-align: -10%"
            />
            <span>创建订单</span>
          </button>
        </el-col>
        <el-col style="width: 55px;margin-top: 5px;">
          <button
            type="button"
            class="el-button el-button--success el-button--small"
            @click="importOrder"
          >
            <i
              class="icon iconfont el-icon-dy-daoru"
              style="vertical-align: -10%"
            />
            <span>导入订单</span>
          </button>
        </el-col>
        <el-col style="width: 55px;margin-top: 5px;">
          <button
            type="button"
            class="el-button el-button--success el-button--small"
            @click="exportOrder"
          >
            <i
              class="icon iconfont el-icon-dy-daochu"
              style="vertical-align: -10%"
            />
            <span>导出订单</span>
          </button>
        </el-col>
        <el-col
          v-if="status == 1"
          style="width: 91px;margin-top: 5px;"
        >
          <button
            type="button"
            class="el-button el-button--primary el-button--small"
            @click="getTrackNumber"
          >
            <i
              class="icon iconfont el-icon-dy-shujuhuoqu"
              style="vertical-align: -10%"
            />
            <span>获取服务商单号</span>
          </button>
        </el-col>
        <el-col
          v-if="status == 1 || status == 2 || status == 3"
          style="width: 55px;margin-top: 5px;"
        >
          <button
            type="button"
            class="el-button el-button--success el-button--small"
            @click="printLabel"
          >
            <i
              class="icon iconfont el-icon-dy-dayinji"
              style="vertical-align: -10%"
            />
            <span>打印标签</span>
          </button>
        </el-col>
        <el-col
          v-if="status == 1 || status == 2 || status == 3"
          style="width: 79px;margin-top: 5px;"
        >
          <button
            type="button"
            class="el-button el-button--success el-button--small"
            @click="printInvoice"
          >
            <i
              class="icon iconfont el-icon-dy-dayinji"
              style="vertical-align: -10%"
            />
            <span>打印商业发票</span>
          </button>
        </el-col>
        <el-col
          v-if="status == 1 || status == 2 || status == 3"
          style="width: 55px;margin-top: 5px;"
        >
          <button
            type="button"
            class="el-button el-button--info el-button--small"
            @click="submitSeizure"
          >
            <i
              class="icon iconfont el-icon-dy-koujianshijian"
              style="vertical-align: -10%"
            />
            <span>提交扣件</span>
          </button>
        </el-col>
        <el-col
          v-if="status == 1 || status == 2 || status == 3"
          style="width: 58px;margin-top: 5px;"
        >
          <button
            type="button"
            class="el-button el-button--info el-button--small"
            @click="submitReturn"
          >
            <i
              class="icon iconfont el-icon-dy-anniu-tuijian"
              style="vertical-align: -10%"
            />
            <span>提交退件</span>
          </button>
        </el-col>
        <el-col
          v-if="status == 1 || status == 2 || status == 3"
          style="width: 68px;margin-top: 5px;"
        >
          <button
            type="button"
            class="el-button el-button--warning el-button--small"
            @click="cancelSeizureOrReturn"
          >
            <i
              class="icon iconfont el-icon-dy-quxiao"
              style="vertical-align: -10%"
            />
            <span>取消扣退件</span>
          </button>
        </el-col>
        <el-col
          v-if="status == 1 || status == 2 || status == 3"
          style="width: 55px;margin-top: 5px;"
        >
          <button
            type="button"
            class="el-button el-button--warning el-button--small"
            @click="removeOrder"
          >
            <i
              class="icon iconfont el-icon-dy-776bianjiqi_congcaogaoxiangjiazai"
              style="vertical-align: -10%"
            />
            <span>作废订单</span>
          </button>
        </el-col>
        <el-col
          v-if="status == 4"
          style="width: 67px;margin-top: 5px;"
        >
          <button
            type="button"
            class="el-button el-button--primary el-button--small"
            @click="convertToPreOrder"
          >
            <i
              class="icon iconfont el-icon-dy-776bianjiqi_congcaogaoxiangjiazai"
              style="vertical-align: -10%"
            />
            <span>转为已预录</span>
          </button>
        </el-col>
        <el-col
          v-if="status == 4"
          style="width: 55px;margin-top: 5px;"
        >
          <button
            type="button"
            class="el-button el-button--danger el-button--small"
            @click="deleteOrder"
          >
            <i
              class="icon iconfont el-icon-dy-shanchu"
              style="vertical-align: -10%"
            />
            <span>删除</span>
          </button>
        </el-col>
      </el-row>
      <!--订单状态查询-->
      <div style="margin: 10px 0px 10px 0px">
        <el-radio-group
          v-model="status"
          @change="statusChange"
        >
          <el-radio-button
            v-for="(item, index) in stateBtns"
            :key="index"
            :label="item.recState"
          >{{ item.recStateName }}({{ item.count }})</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div
      class="dashboard-container"
      style="background-color: #ffffff; padding: 20px 20px 15px 20px"
    >
      <!--订单table-->
      <el-table
        ref="multipleTable"
        :key="itemKey"
        height="500"
        size="mini"
        :default-expand-all="true"
        :data="tableData"
        :header-cell-style="tableHeaderCellStyle"
        element-loading-text="拼命加载中"
        class="tabl1"
      >
        <el-table-column
          align="center"
          width="48"
          style="border: 1px solid #ebeef5;"
        >
          <template slot="header">
            <label class="el-checkbox">
              <span :class="mycheckbox">
                <span class="el-checkbox__inner" />
                <input type="checkbox" aria-hidden="false" class="el-checkbox__original" :value="isCheck" @change="checkboxAll">
              </span>
            </label>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="conWrap">
              <div style="width: 265px;" class="elcol">
                订单号：
                <el-tooltip class="eltooltip" :content="props.row.preBillCode">
                  <el-link type="primary" @click="preBillCodeClick(props.row.id)">{{ props.row.preBillCode }}</el-link>
                </el-tooltip>
                <el-tooltip content="复制">
                  <i id="copyBtn" ref="copyPreBillCode" class="el-icon-copy-document" style="cursor: pointer; margin-left: 10px;" :data-clipboard-text="props.row.preBillCode" data-clipboard-action="copy" @click="copyPreBillCode" />
                </el-tooltip>
              </div>
              <div style="width: 220px;" class="elcol">
                运单号：{{ props.row.waybillCode }}
              </div>
              <div style="width: 222px;" class="elcol">
                转单号：
                {{ props.row.tranBillCode ? props.row.tranBillCode : '--' }}
              </div>
              <div style="width: 400px;" class="elcol">
                最新轨迹：
                <span>{{ (props.row.trackTime ? props.row.trackTime :'' )+' '+ (props.row.TrackStatus?props.row.TrackStatus : '--') }}</span>
                <el-tooltip content="查看最新轨迹">
                  <i class="el-icon-share" style="cursor: pointer; margin-left: 10px;" @click="getTracking(props.row.id)" />
                </el-tooltip>
              </div>
            </div>
            <el-table
              stripe
              size="mini"
              :cell-style="cellStyle"
              :show-header="false"
              :data="[props.row]"
              class="chiTable"
            >
              <el-table-column width="48" align="center">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.itemCheck"
                    :checked="scope.row.itemCheck"
                    @change="childCheckbox(scope.row.id,scope.row.itemCheck)"
                  />
                </template>
              </el-table-column>
              <el-table-column width="48" />
              <el-table-column
                label="运输方式"
                align="center"
                width="180"
                prop="carrierRouteName"
              >
                <template slot-scope="scope">
                  {{ scope.row.carrierRouteName }}
                </template>
              </el-table-column>
              <el-table-column
                label="收件信息"
                show-overflow-tooltip
                width="220"
              >
                <template slot-scope="scope">
                  <div>姓名：{{ scope.row.consignee ? scope.row.consignee.name :'--' }}</div>
                  <div>目的地：{{ scope.row.countryId | countryIdFilter }} </div>
                  <div>邮编：{{ scope.row.consignee ? scope.row.consignee.postCode :'--' }}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="材积"
                width="220"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div>件数：{{ scope.row.goodsNum }}</div>
                  <div>预录重量：{{ scope.row.preWeight }} KG</div>
                  <div>长*宽*高：{{ scope.row.cargovolumes && scope.row.cargovolumes.length > 0 ? scope.row.cargovolumes[0].length + '*' + scope.row.cargovolumes[0].width + '*' + scope.row.cargovolumes[0].height : '-' }} CM</div>
                </template>
              </el-table-column>
              <el-table-column
                label="申报信息"
                width="220"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div>货物类型：{{ scope.row.goodsType | goodsTypeFilter }}</div>
                  <div>包装类型：{{ scope.row.pack | packFilter }}</div>
                  <div>申报币种：{{ scope.row.currency === 1 ?'USD':'EUR' }}</div>
                  <div>{{ scope.row.invoices && scope.row.invoices.length ? scope.row.invoices[0].enName+' | '+ scope.row.invoices[0].cnName +' | '+ scope.row.invoices[0].quantity:'-' }}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="时间"
                width="220"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div>预录：{{ scope.row.creationTime }}</div>
                  <div>入仓：{{ scope.row.buildDate }}</div>
                  <div>出仓：{{ scope.row.shippedTime }}</div>
                  <div>签收：{{ scope.row.signDate }}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="标识"
                show-overflow-tooltip
                width="220"
              >
                <template slot-scope="scope">
                  <div>创建方式：{{ scope.row.createMethod | filterCreateMethod }}</div>
                  <div>创建人：{{ scope.row.clientId | filterClient }}</div>
                  <div>是否打印：{{ scope.row.isPrint ? '已打印':'未打印' }}</div>
                  <div>扣退件：{{ scope.row.backOrHold | filterBackOrHold }}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                show-overflow-tooltip
                width="220"
              >
                <template slot-scope="scope">
                  <div>订单状态：{{ scope.row.recState | filterRecState }}</div>
                  <div>轨迹状态：{{ scope.row.trackStatus }}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="190"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-tooltip content="明细"><i class="el-icon-view" style="cursor: pointer;margin-right: 10px;" @click="preBillCodeClick(scope.row.id)" /></el-tooltip>
                  <el-tooltip content="复制"><i class="el-icon-document-copy" style="cursor: pointer;margin-right: 10px;" @click="handleCopyClick(scope.row.id)" /></el-tooltip>
                  <el-tooltip v-if="scope.row.recState === 1 && scope.row.tranBillCode===''" content="修改"><i class="el-icon-edit" style="cursor: pointer;margin-right: 10px;" @click="editClick(scope.row.id)" /></el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="运输方式"
          align="center"
          width="180"
        />
        <el-table-column
          label="收件信息"
          align="center"
          width="220"
        />
        <el-table-column
          label="材积"
          align="center"
          width="220"
        />
        <el-table-column
          label="申报信息"
          align="center"
          width="220"
        />
        <el-table-column
          label="时间"
          align="center"
          width="220"
        />
        <el-table-column
          label="标识"
          align="center"
          width="220"
        />
        <el-table-column
          label="状态"
          align="center"
          width="220"
        />
        <el-table-column
          label="操作"
          align="center"
          width="190"
          fixed="right"
        />
      </el-table>
      <el-divider />
      <Pagination
        :total="total"
        style="padding-top: 20px"
        :change-pape="changePape"
        :page-size="formQuery.maxResultCount"
      />
    </div>
    <el-drawer
      :title="drawerTitle"
      :visible="drawer"
      :size="drawerSize"
      :before-close="handleDrawerClose"
    >
      <el-descriptions
        title="基本信息"
        :column="3"
        size="medium"
        border
        style="
          padding: 10px 20px 20px 20px;
          white-space: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        "
        :content-style="CS"
        :label-style="LS"
      >
        <el-descriptions-item>
          <template slot="label"> 目的国家/地区 </template>
          {{ detailedData.countryId | countryIdFilter }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 订单号 </template>
          {{ detailedData.preBillCode }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 运单号 </template>
          {{ detailedData.waybillCode }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 转单号 </template>
          {{ detailedData.tranBillCode }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 运输方式 </template>
          {{ detailedData.carrierRouteName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 预录重量（kg） </template>
          {{ detailedData.preWeight }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 件数 </template>
          {{ detailedData.goodsNum }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 包装类型 </template>
          {{ detailedData.pack | packFilter }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 货物类型 </template>
          {{ detailedData.goodsType | goodsTypeFilter }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 备注 </template>
          {{ detailedData.remark }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 额外服务 </template>
          <ExtraService ref="extraServices" :disabled="true" />
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions
        title="收件人信息"
        :column="3"
        size="medium"
        border
        style="
          padding: 10px 20px 20px 20px;
          white-space: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        "
        :content-style="CS"
        :label-style="LS"
      >
        <el-descriptions-item>
          <template slot="label"> 收件人姓名 </template>
          {{ !detailedData.consignee ?'':detailedData.consignee.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人公司 </template>
          {{ !detailedData.consignee?'':detailedData.consignee.company }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人税号 </template>
          {{ !detailedData.consignee ?'':detailedData.consignee.taxID }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人州省 </template>
          {{ !detailedData.consignee?'':detailedData.consignee.province }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人城市 </template>
          {{ !detailedData.consignee ?'':detailedData.consignee.city }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人邮编 </template>
          {{ !detailedData.consignee?'':detailedData.consignee.postCode }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人电话 </template>
          {{ !detailedData.consignee ?'':detailedData.consignee.telephone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人手机 </template>
          {{ !detailedData.consignee?'':detailedData.consignee.mobile }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人邮箱 </template>
          {{ !detailedData.consignee?'':detailedData.consignee.email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人证件类型 </template>
          {{
            detailedData.consignee ? detailedData.consignee.certificateType === 1
              ? '身份证'
              : detailedData.consignee.certificateType === 2
                ? '护照'
                : '' : ''
          }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人证件号码 </template>
          {{ !detailedData.consignee?'':detailedData.consignee.certificateCode }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人证件有效期 </template>
          {{ !detailedData.consignee?'':detailedData.consignee.certificatePeriod }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人门牌号 </template>
          {{ !detailedData.consignee?'':detailedData.consignee.doorplate }}
        </el-descriptions-item>
        <el-descriptions-item :span="2">
          <template slot="label"> 买家Id </template>
          {{ !detailedData.buyerId ?'':detailedData.buyerId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 收件人地址 </template>
          {{ !detailedData.consignee ?'':detailedData.consignee.address }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions
        title="发件人信息"
        :column="3"
        size="medium"
        border
        style="
          padding: 10px 20px 20px 20px;
          white-space: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        "
        :content-style="CS"
        :label-style="LS"
      >
        <el-descriptions-item>
          <template slot="label"> 发件人姓名 </template>
          {{ !detailedData.sender ?'':detailedData.sender.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 发件人公司 </template>
          {{ !detailedData.sender ?'':detailedData.sender.company }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 发件人税号 </template>
          {{ !detailedData.sender?'':detailedData.sender.taxID }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 发件人国家/地区 </template>
          {{ !detailedData.sender ?'':detailedData.sender.countryId| countryIdFilter }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 发件人州省 </template>
          {{ !detailedData.sender?'':detailedData.sender.province }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 发件人城市 </template>
          {{ !detailedData.sender?'':detailedData.sender.city }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 发件人邮编 </template>
          {{ !detailedData.sender?'':detailedData.sender.postCode }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 发件人电话 </template>
          {{ !detailedData.sender?'':detailedData.sender.telephone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 发件人手机 </template>
          {{ !detailedData.sender ?'':detailedData.sender.mobile }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 发件人邮箱 </template>
          {{ !detailedData.sender?'':detailedData.sender.email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 发件人地址 </template>
          {{ !detailedData.sender?'':detailedData.sender.address }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions
        title="报关信息"
        :column="3"
        size="medium"
        border
        style="padding: 10px 20px 0px 20px"
        :content-style="CS"
        :label-style="LS"
      />
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%;padding: 0px 20px 20px 20px"
        size="small"
        highlight-current-row
        :data="detailedData.invoices"
      >
        <el-table-column
          label="序号"
          align="center"
          width="50"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Sku"
          width="140"
          prop="sku"
          align="center"
        />
        <el-table-column
          label="英文品名"
          width="140"
          prop="enName"
          align="center"
        />
        <el-table-column
          label="中文品名"
          width="140"
          prop="cnName"
          align="center"
        />
        <el-table-column
          label="数量"
          width="100"
          prop="quantity"
          align="center"
        />
        <el-table-column
          label="单价"
          width="100"
          prop="unitcharge"
          align="center"
        />
        <el-table-column
          label="计量单位"
          width="120"
          prop="unitCode"
          align="center"
        >
          <template slot-scope="scope">
            <UnitType
              v-model="scope.row.unitCode"
              style="width: 100%"
              :disabled="true"
              @setValue="(val) => (scope.row.unitCode = val)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="海关编码"
          width="140"
          prop="hsCode"
          align="center"
        />
        <el-table-column
          label="配货信息"
          width="140"
          prop="note"
          align="center"
        />
        <el-table-column
          label="销售地址"
          width="170"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>
              <el-link
                :href="scope.row.saleUrl"
                target="_blank"
              >{{
                scope.row.saleUrl
              }}</el-link>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品图片"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.pictureUrl"
              :preview-src-list="[scope.row.pictureUrl]"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="材质"
          width="150"
          prop="material"
          align="center"
        />
        <el-table-column
          label="用途"
          width="150"
          prop="use"
          align="center"
        />
        <el-table-column
          label="品牌"
          width="150"
          prop="brand"
          align="center"
        />
        <el-table-column
          label="原产国"
          width="150"
          prop="countryOrigin"
          align="center"
        />
        <el-table-column
          label="商品单重"
          width="160"
          prop="netWeight"
          align="center"
        />
        <el-table-column
          label="行邮税号"
          width="160"
          prop="posttaxNum"
          align="center"
        />
        <el-table-column
          label="是否带电"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isElectrified ? "是":"否" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否带磁"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isLiquid ? "是":"否" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否液体"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isMagnetic ? "是":"否" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否粉末"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isPowder ? "是":"否" }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-descriptions
        title="材积信息"
        :column="3"
        size="medium"
        border
        style="padding: 10px 20px 0px 20px"
        :content-style="CS"
        :label-style="LS"
      />
      <el-table
        :data="detailedData.cargovolumes"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%; padding: 0px 20px 20px 20px"
        size="small"
        :show-overflow-tooltip="true"
        highlight-current-row
      >
        <el-table-column
          label="序号"
          align="center"
          width="50"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="箱号（子单号）"
          prop="childNumber"
          align="center"
          show-overflow-tooltip
          min-width="200px"
        />
        <el-table-column
          label="子单跟踪号"
          prop="childPreTranCode"
          align="center"
          show-overflow-tooltip
          min-width="200px"
        />
        <el-table-column
          label="长（cm）"
          prop="length"
          align="center"
          min-width="100px"
        />
        <el-table-column
          label="宽（cm）"
          prop="width"
          align="center"
          min-width="100px"
        />
        <el-table-column
          label="高（cm）"
          prop="height"
          align="center"
          min-width="100px"
        />
        <el-table-column
          label="重量（kg）"
          prop="grossweight"
          align="center"
          min-width="150px"
        />
      </el-table>
      <el-descriptions
        title="额外信息"
        :column="3"
        size="medium"
        border
        style="padding: 10px 20px 0px 20px"
        :content-style="CS"
        :label-style="LS"
      />
      <el-table
        :data="detailedData.extraServiceKinds"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%; padding: 0px 20px 20px 20px"
        size="small"
        :show-overflow-tooltip="true"
        highlight-current-row
      >
        <el-table-column
          label="序号"
          align="center"
          width="50"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="英文名称"
          prop="enName"
          align="center"
          show-overflow-tooltip
          min-width="200px"
        />
        <el-table-column
          label="中文名称"
          prop="cnName"
          align="center"
          show-overflow-tooltip
          min-width="200px"
        />
        <el-table-column
          label="值"
          prop="value"
          align="center"
          min-width="150px"
        />
      </el-table>
      <el-descriptions
        title="附件信息"
        :column="3"
        size="medium"
        border
        style="padding: 10px 20px 0px 20px"
        :content-style="CS"
        :label-style="LS"
      />
      <el-table
        :data="detailedData.files"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%; padding: 0px 20px 20px 20px"
        size="small"
        :show-overflow-tooltip="true"
        highlight-current-row
      >
        <el-table-column
          label="序号"
          align="center"
          width="50"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="文件名"
          prop="name"
          align="center"
          show-overflow-tooltip
          min-width="200px"
        />
        <el-table-column
          label="hash"
          prop="hash"
          align="center"
          show-overflow-tooltip
          min-width="200px"
        />
        <el-table-column
          label="文件地址（点击下载）"
          width="170"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>
              <el-link
                :href="scope.row.accessURL"
                target="_blank"
              >{{
                scope.row.accessURL
              }}</el-link>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="文件大小（kb）"
          prop="size"
          align="center"
          min-width="150px"
        />
        <el-table-column
          label="创建时间"
          prop="creationTime"
          align="center"
          min-width="150px"
        />
      </el-table>
      <el-descriptions
        title="日志信息"
        :column="3"
        size="medium"
        border
        style="padding: 10px 20px 0px 20px"
        :content-style="CS"
        :label-style="LS"
      />
      <el-table
        :data="detailedData.logs"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%; padding: 0px 20px 20px 20px"
        size="small"
        :show-overflow-tooltip="true"
        highlight-current-row
      >
        <el-table-column
          label="时间"
          prop="creationTime"
          align="center"
          min-width="150px"
        />
        <el-table-column
          label="内容"
          prop="operationRecord"
          align="center"
          show-overflow-tooltip
          min-width="450px"
        />
        <el-table-column
          label="操作人"
          prop="creator"
          min-width="100px"
          align="center"
        />
      </el-table>
      <el-backtop target=".el-drawer__body">
        <div
          width="100%"
          title="返回顶部"
        >
          <i class="el-icon-top" />
        </div>
      </el-backtop>
    </el-drawer>
    <el-dialog
      title="按勾选导出Excel"
      :visible.sync="dialogVisibleExport"
      width="70%"
    >
      <Export ref="export" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleExport = false">取 消</el-button>
        <el-button type="primary" @click="exportExcel">按勾选导出Excel</el-button>
      </span>
    </el-dialog>

    <el-backtop>
      <div
        width="100%"
        title="返回顶部"
      >
        <i class="el-icon-top" />
      </div>
    </el-backtop>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import ExtraService from '@/components/ExtraService'
import CarrierRouteId from '@/components/Select/CarrierRouteId'
import UnitType from '@/components/Select/UnitType'
import CountryId from '@/components/Select/CountryId'
import Client from '@/components/Select/Client'
import Export from '@/components/Export'
import { getRecStateSumAsync, getList, submitReturnAsync, submitSeizureAsync, cancelSeizureOrReturnAsync, exportExcelAsync, removesAsync, hardDeleteAsync, getDetail, convertToPreAsync, printLabelAsync, printInvoiceLabelAsync } from '@/api/prewaybill'
import { getCountryListCache, getPackTypeCache, getGoodsTypeCache, getClientCache } from '@/api/cache'
let that

export default {
  name: 'Prewaybill',
  components: {
    Pagination,
    Export,
    CarrierRouteId,
    UnitType,
    ExtraService,
    CountryId,
    Client
  },
  filters: {
    countryIdFilter(val) {
      const item = that.countryList.find((f) => f.id === val)
      return item ? `${item.cnName}(${item.code})` : '--'
    },
    goodsTypeFilter(val) {
      const item = that.goodsList.find((f) => f.id === val)
      return item ? item.name : '--'
    },
    packFilter(val) {
      const item = that.packList.find((f) => f.id === val)
      return item ? item.name : '--'
    },
    filterCreateMethod(val) {
      switch (val) {
        case 1:
          return '网站'
        case 2:
          return 'API'
        case 3:
          return '平台'
      }
    },
    filterClient(val) {
      const item = that.clientList.find((f) => f.id === val)
      return item ? item.name : '--'
    },
    filterBackOrHold(val) {
      switch (val) {
        case 0:
          return '正常'
        case 1:
          return '扣件'
        case 2:
          return '退件'
      }
    },
    filterRecState(val) {
      switch (val) {
        case 1:
          return '已预录'
        case 2:
          return '已入仓'
        case 3:
          return '已出仓'
        case 4:
          return '已作废'
      }
    }
  },
  data() {
    return {
      tableData: [], // 订单数据list,
      countryList: [],
      packList: getPackTypeCache(),
      goodsList: getGoodsTypeCache(),
      clientList: getClientCache(),
      windowWidth: document.documentElement.clientWidth,
      drawerSize: '80%',
      centerEditDialogVisible: true,
      dialogVisibleExport: false,
      selectIds: [],
      orderData: {},
      drawer: false,
      drawerTitle: '',
      isCheck: false,
      mycheckbox: 'el-checkbox__input',
      detailedData: {
        consignee: {
          countryId: 0
        },
        sender: {}
      },
      CS: {
        'min-width': '250px',
        'word-break': 'break-all'
      },
      LS: {
        color: '#000',
        'font-weight': '400',
        height: '40px',
        'min-width': '110px',
        'word-break': 'keep-all'
      },
      loading: true,
      itemKey: '',
      formQuery: {
        codeType: 1,
        code: '',
        isLike: false,
        carrierRouteId: undefined,
        countryId: undefined,
        clientId: undefined,
        labelPrintStatus: 0,
        consigneeName: '',
        creationTime: '',
        preWayBillStateType: 0,
        maxResultCount: 30,
        skipCount: 0
      }, // 查询条件form
      total: 0, // 总记录数
      stateBtns: [],
      status: 0,
      inputCodeType: 'textarea',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ],
        // 时间不能大于当前时间
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    this.getRecStateSum()
    this.getList()
    this.countryList = getCountryListCache()
    if (this.windowWidth < 400) {
      this.drawerSize = '100%'
    }
  },
  mounted() {
    var that = this
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth
        that.windowWidth = window.fullWidth // 宽
        if (that.windowWidth < 400) {
          that.drawerSize = '100%'
        }
      })()
    }
  },
  beforeCreate() {
    that = this
  },
  methods: {
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.formQuery.isLike = false
      this.isLikeChange(this.formQuery.isLike)
      this.getList()
    },
    onQuery() {
      this.getList()
    },
    changePape(currentPage, pageSize) {
      this.formQuery.skipCount = (currentPage - 1) * pageSize
      this.formQuery.maxResultCount = pageSize
      this.getList()
    },
    getList() {
      var than = this
      const data = JSON.parse(JSON.stringify(than.formQuery))
      if (data.code) {
        data.code = data.code.replace(/[\r\n]/g, ',')
      }
      if (!data.carrierRouteId) {
        data.carrierRouteId = 0
      }
      if (!data.countryId) {
        data.countryId = 0
      }
      if (!data.clientId) {
        data.clientId = undefined
      }
      if (data.creationTime && data.creationTime[0] !== '') {
        data.creationTimeStart = data.creationTime[0].substring(0, 10)
        data.creationTimeEnd = data.creationTime[1].substring(0, 10)
      } else {
        data.creationTimeStart = ''
        data.creationTimeEnd = ''
      }
      getList(data).then((resp) => {
        this.tableData = resp.data
        this.total = resp.total
      })
      this.loading = false
      this.resetCheck()
    },
    getRecStateSum() {
      this.status = this.status > 0 ? this.status : 0
      getRecStateSumAsync().then((resp) => {
        this.stateBtns = resp.data
      })
    },
    statusChange(value) {
      this.resetCheck()
      this.formQuery.preWayBillStateType = value
      this.resetForm('formQuery')
    },
    isLikeChange(value) {
      this.formQuery.code = ''
      this.inputCodeType = value ? 'text' : 'textarea'
    },
    resetCheck() {
      const list = []
      this.isCheck = false
      this.mycheckbox = 'el-checkbox__input'
      for (const val of this.tableData) {
        val['itemCheck'] = this.isCheck
        list.push(val)
      }
      this.tableData = list
      this.selectIds = []
      this.itemKey = Math.random()
    },
    createOrder() {
      this.$router.push('addoredit')
    },
    importOrder() {
      this.$router.push('import')
    },
    submitSeizure() {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择需要操作的订单')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '提交中，请勿刷新页面.....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      submitSeizureAsync(this.selectIds)
        .then((resp) => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 1500
          })
          this.getRecStateSum()
          this.getList()
        })
        .finally(() => {
          loading.close()
        })
    },
    submitReturn() {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择需要操作的订单')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '提交中，请勿刷新页面.....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      submitReturnAsync(this.selectIds)
        .then((resp) => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 1500
          })
          this.getRecStateSum()
          this.getList()
        })
        .finally(() => {
          loading.close()
        })
    },
    cancelSeizureOrReturn() {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择需要操作的订单')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '提交中，请勿刷新页面.....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      cancelSeizureOrReturnAsync(this.selectIds)
        .then((resp) => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 1500
          })
          this.getRecStateSum()
          this.getList()
        })
        .finally(() => {
          loading.close()
        })
    },
    removeOrder() {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择需要操作的订单')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '提交中，请勿刷新页面.....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      removesAsync(this.selectIds)
        .then((resp) => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 1500
          })
          this.status = 4
          this.formQuery.preWayBillStateType = this.status
          this.getList()
          this.getRecStateSum()
        })
        .finally(() => {
          loading.close()
        })
    },
    deleteOrder() {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择需要操作的订单')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '提交中，请勿刷新页面.....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      hardDeleteAsync(this.selectIds)
        .then((resp) => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 1500
          })
          this.getList()
          this.getRecStateSum()
        })
        .finally(() => {
          loading.close()
        })
    },
    printLabel() {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择需要操作的订单')
        return
      }
      var postData = {}
      postData.ids = this.selectIds
      this.$confirm('是否标记为已打印?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(() => {
          postData.isPrint = true
          const loading = this.$loading({
            lock: true,
            text: '打印中，请勿刷新页面.....',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          window.status = 'readytoprint'
          printLabelAsync(postData)
            .then((resp) => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 1500
              })
              window.open(resp.data, '_blank')
              this.getList()
            })
            .finally(() => {
              loading.close()
            })
        })
        .catch(() => {
          const loading = this.$loading({
            lock: true,
            text: '打印中，请勿刷新页面.....',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          printLabelAsync(postData)
            .then((resp) => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 1500
              })
              this.getList()
              window.open(resp.data, '_blank')
            })
            .finally(() => {
              loading.close()
            })
        })
    },
    printInvoice() {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择需要操作的订单')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '打印中，请勿刷新页面.....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var postData = {}
      postData.ids = this.selectIds
      printInvoiceLabelAsync(postData)
        .then((resp) => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 1500
          })
          this.getList()
          window.open(resp.data, '_blank')
        })
        .finally(() => {
          loading.close()
        })
    },
    getTrackNumber() {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择需要操作的订单')
        return
      }
    },
    exportOrder() {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择需要操作的订单')
        return
      }
      this.dialogVisibleExport = true
    },
    exportExcel() {
      var data = { 'ids': this.selectIds, 'columns': this.$refs.export.getColumns() }
      exportExcelAsync(data).then(resp => {
        console.info(resp.data)
      })
    },
    handleSelectionChange(val) {

    },
    handleCopyClick(id) {
      this.$router.push({
        name: 'addoredit',
        query: {
          id: id,
          isEdit: false
        }
      })
    },
    editClick(id) {
      this.$router.push({
        name: 'addoredit',
        query: {
          id: id,
          isEdit: true
        }
      })
    },
    preBillCodeClick(id) {
      getDetail(id).then((resp) => {
        this.drawer = true
        this.drawerTitle = `${resp.data.preBillCode} 订单明细`
        this.detailedData = resp.data
        this.$nextTick(() => {
          this.$refs.extraServices.setExtraServices(Array.isArray(this.detailedData.extraServices) ? this.detailedData.extraServices.map(x => (x.id)) : [])
        })
      })
    },

    handleDrawerClose() {
      this.drawer = false
    },
    convertToPreOrder() {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择需要操作的订单')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '提交中，请勿刷新页面.....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      convertToPreAsync(this.selectIds).then((resp) => {
        loading.close()
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 1500
        })
        this.getRecStateSum()
        this.getList()
      })
    },
    copyPreBillCode() {
      var clipboard = new this.Clipboard('#copyBtn')
      clipboard.on('success', () => {
        this.$message.success('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        this.$message.success('复制失败')
        clipboard.destroy()
      })
    },
    getTracking(v) {

    },
    tableHeaderCellStyle({ row, column, rowIndex, columnIndex }) {
      const base = 'background:#f5f7fa;color:#606266;'
      if (columnIndex === 0) {
        return base + 'border: 1px solid #ebeef5;'
      }
      if (columnIndex === 1) {
        return base + 'border-top: 1px solid #ebeef5;'
      }
      if (columnIndex === 2) {
        return base + 'border-right: 1px solid #ebeef5; border-top: 1px solid #ebeef5;padding-right: 60px;'
      }
      if (columnIndex > 2 && columnIndex <= 9) {
        return base + 'border-right: 1px solid #ebeef5;border-top: 1px solid #ebeef5;'
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'border-right: 1px solid #ebeef5;'
      }
      if (columnIndex === 2) {
        return 'border-right: 1px solid #ebeef5;padding-right: 60px;'
      }
      if (columnIndex > 2 && columnIndex <= 9) {
        return 'border-right: 1px solid #ebeef5;'
      }
    },
    checkboxAll() {
      const list = []
      const checkCount = this.tableData.filter(x => x.itemCheck).length
      if (checkCount === this.tableData.length) {
        this.isCheck = !this.isCheck
        this.mycheckbox = 'el-checkbox__input'
        for (const val of this.tableData) {
          val['itemCheck'] = this.isCheck
          list.push(val)
        }
      } else if (checkCount > 0) {
        if (checkCount + 1 === this.tableData.length) {
          this.mycheckbox = 'el-checkbox__input is-checked'
        } else {
          this.mycheckbox = 'el-checkbox__input is-indeterminate'
        }
        for (const val of this.tableData) {
          val['itemCheck'] = this.isCheck
          list.push(val)
        }
      } else {
        this.isCheck = !this.isCheck
        this.mycheckbox = 'el-checkbox__input is-checked'
        for (const val of this.tableData) {
          val['itemCheck'] = this.isCheck
          list.push(val)
        }
      }
      this.tableData = list
      this.selectIds = this.tableData.filter((item) => { return item.itemCheck }).map(item => { return item.id })
      this.itemKey = Math.random()
    },
    childCheckbox(val, isItemCheck) {
      const list = []
      for (const item of this.tableData) {
        if (val === item.id) {
          item['itemCheck'] = isItemCheck
        }
        list.push(item)
      }
      this.tableData = list
      this.itemKey = Math.random()
      const checkCount = this.tableData.filter(x => x.itemCheck).length
      if (checkCount === this.tableData.length) {
        this.mycheckbox = 'el-checkbox__input is-checked'
      } else if (checkCount > 0) {
        this.mycheckbox = 'el-checkbox__input is-indeterminate'
      } else {
        this.mycheckbox = 'el-checkbox__input'
      }
      this.selectIds = this.tableData.filter((item) => { return item.itemCheck }).map(item => { return item.id })
    }
  }
}
</script>

<style lang="scss">
.el-drawer__header {
  margin-bottom: 0px !important;
  border-bottom: 1px #dcdfe6 solid;
  padding: 10px 20px;
}
.el-drawer__header span {
  font-size: 17px;
}
.el-divider--horizontal {
  margin: 0px;
}
.el-descriptions__header {
  border-bottom: 1px #dcdfe6 solid;
}
.el-table--border {
  border-bottom: 1px solid #ebeef5;
}
.el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
  overflow: scroll !important;
}

table .el-form-item {
  margin: 5px 0px 10px 0px;
}
table .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 5px;
}
.tablDes .el-form-item__error {
  position: inherit;
}
.el-dialog__header {
  border-bottom: 1px #dcdfe6 solid;
  padding: 15px 20px 15px;
}
.el-dialog__headerbtn {
  top: 18px;
}
.el-dialog__body {
  padding: 10px 20px 15px 20px;
}
</style>

<style lang="scss" scoped>
.main {
  background-color: #eaedf1 !important;
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.dashboard {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.custransform {
  transform: translateY(-7px);
}

.el-col {
  margin-right: 50px;
}

.el-form-item {
  margin-right: 0 !important;
}

.el-form-item__label {
  position: absolute;
}

.el-form-item__content {
  width: 100%;
}

.el-select,
.el-input_inner .el-textarea_inner {
  width: 100%;
}

::v-deep :focus {
  outline: 0;
}

.el-table::before {
  background-color: white;
}

::v-deep .tabl1 .el-table__row {
  overflow: hidden;
}

.chiTable {
  border: 1px solid #ebeef5;
}

::v-deep .chiTable .el-table__body-wrapper {
  overflow: hidden;
}

.conWrap {
  height: 40px;
  background: #e5e5e5;
  line-height: 44px;
  padding: 5px 0px 0px 20px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  line-height: 19px;
  white-space: nowrap;
  color: #333333;
  display: flex;
}

.conWrap > span {
  line-height: 44px;
}

  ::v-deep  .expanded {
    display: none;
  }

.elcol {
  margin-top: 7px;
}

.eltooltip{
  display: inline-block;
  max-width:200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

::v-deep .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
  border-bottom: none;
}
</style>
