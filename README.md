参考文档：
https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD
https://element.eleme.cn/


{
  "preBillCode": "string",
  "carrierRouteId":1,
  "goodsType": 1,
  "pack": 1,
  "currency": 1,
  "preWeight": 0,
  "goodsNum": 0,
  "remark": "string",
  "sender": {
    "name": "string",
    "company": "string",
    "countryId": 1,
    "province": "string",
    "city": "string",
    "address": "string",
    "postCode": "string",
    "telephone": "string",
    "mobile": "string",
    "email": "string",
    "taxID": "string"
  },
  "consignee": {
    "name": "string",
    "company": "string",
    "countryId":1,
    "province": "string",
    "city": "string",
    "address": "string",
    "postCode": "string",
    "telephone": "string",
    "mobile": "string",
    "email": "string",
    "taxID": "string",
    "doorplate": "string",
    "certificateType": 0,
    "certificateCode": "string",
    "certificatePeriod": "string"
  },
  "invoices": [
    {
      "sku": "string",
      "enName": "string",
      "cnName": "string",
      "quantity": 1,
      "unitCode": 1,
      "unitcharge": 1,
      "netWeight": 0,
      "hsCode": "string",
      "note": "string",
      "saleUrl": "string",
      "pictureUrl": "string",
      "material": 0,
      "use": "string",
      "brand": "string",
      "countryOrigin": "string"
    }
  ],
  "files": [
    {
      "name": "string",
      "hash": "string",
      "size": 0,
      "accessURL": "string"
    }
  ],
  "cargovolumes": [
    {
      "childnumber": "string",
      "length": 1,
      "width": 1,
      "height": 1,
      "grossweight": 1
    }
  ]
}