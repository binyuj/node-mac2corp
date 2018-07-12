# mac2corp

> 这是一个从设备mac查生产厂商的api。

## 简介
相关数据从IEEE网站获取[ [http://standards-oui.ieee.org/oui/oui.txt](http://standards-oui.ieee.org/oui/oui.txt)
mac地址中的前6位为厂商标识。
数据解析转换为json之后存在mongodb中。
解析后为如下格式：
```json
{
    "OUI/MA-L": "E0-43-DB",
    "company_id": "E043DB",
    "Organization": "Shenzhen ViewAt Technology Co.,Ltd.",
    "Address": {
        "FullAddress": "9A,Microprofit,6th Gaoxin South Road, High-Tech Industrial Park, Nanshan, Shenzhen, CHINA.",
        "City": "shenzhen  guangdong  518057",
        "CountryCode": "CN"
    }
}
```

## 获取
[https://macapi.gooip.ml/](https://macapi.gooip.ml/)
输入mac就可以查到json化的数据。
- [x] 支持直接粘贴全mac地址
- [x] 支持`:` `-` 为分隔符，或者无分隔符。
