const cheerio = require("cheerio"); // khai báo module cheerio
const request = require("request-promise"); // khai báo module request-promise
const fs = require("fs"); // require thêm module filesystem
const res = require("express/lib/response");

const requestArr = [
  "https://didongviet.vn/iphone-11-64gb-chinh-hang.html",
  "https://didongviet.vn/iphone-12-64gb-vna",
  "https://didongviet.vn/iphone-12-pro-128gb-vna",
  "https://didongviet.vn/iphone-13-mini-128gb.html",
  "https://didongviet.vn/iphone-13-128gb.html",
  "https://didongviet.vn/iphone-13-pro-128gb.html",
  "https://didongviet.vn/iphone-13-pro-max-256gb.html",
  "https://didongviet.vn/samsung-galaxy-a12-bhdt.html",
  "https://didongviet.vn/samsung-galaxy-a22",
  "https://didongviet.vn/samsung-galaxy-a32",
  "https://didongviet.vn/samsung-galaxy-a52",
  "https://didongviet.vn/galaxy-s20-fe-256gb",
  "https://didongviet.vn/samsung-galaxy-s21-plus-8gb-256gb",
  "https://didongviet.vn/dien-thoai-galaxy-s21-ultra",
  "https://didongviet.vn/samsung-galaxy-z-fold-3.html",
  "https://didongviet.vn/oppo-a16k.html",
  "https://didongviet.vn/oppo-a55.html",
  "https://didongviet.vn/oppo-a95.html",
  "https://didongviet.vn/oppo-reno6-z",
  "https://didongviet.vn/oppo-reno6",
  "https://didongviet.vn/xiaomi-redmi-10-4gb-64gb",
  "https://didongviet.vn/xiaomi-mi-note-10-lite",
  "https://didongviet.vn/xiaomi-11-lite-5g-ne-128gb",
  "https://didongviet.vn/xiaomi-11t-128gb.html",
  "https://didongviet.vn/nokia-110-4g.html",
  "https://didongviet.vn/nokia-105-ta-1174-cty",
];

let data = [];

requestArr.map((item, index) => {
  request(item, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let name = "",
        category = "";
      let thumbnail = [],
        capacity = [],
        color = [],
        price = [],
        promotion = [],
        description = [];

      $(".page-wrapper").each((index, el) => {
        //name
        name = $(el).find(".heading-title h1").text();
        // console.log("name: ", name);

        //thumbnail
        $(el)
          .find(".gallery-placeholder  img")
          .each((index, item) => {
            let thumbnailItem = $(item).attr("src");
            // console.log("thumbnailItem: " + thumbnailItem);
            thumbnail.push(thumbnailItem);
          });

        //capacity
        $(el)
          .find(".grid-related .item-related span")
          .each((index, item) => {
            let capacityNotHandle = $(item).text();
            //Xử lý
            if (
              capacityNotHandle.includes("GB") ||
              capacityNotHandle.includes("TB")
            ) {
              capacity.push(capacityNotHandle);
            }
            // console.log("capacity: " + capacity);
          });

        //color
        $(el)
          .find(".field.configurable.required .name")
          .each((index, item) => {
            let colorItem = $(item).text();
            // console.log("colorItem: " + colorItem);
            color.push(colorItem);
          });

        //price
        if (capacity.length !== 0) {
          $(el)
            .find(".grid-related .item-related span")
            .each((index, item) => {
              let priceNotHandle = $(item).text();
              //Xử lý
              priceNotHandle.includes(".") && price.push(priceNotHandle);
              // console.log("price1: " + price);
            });
        } else {
          let priceItem = [];
          $(el)
            .find(".opt_attr .price")
            .each((index, item) => {
              let priceNotHandle = $(item).text();
              //Xử lý
              priceNotHandle.includes(".") && priceItem.push(priceNotHandle);
            });
          let count = 0;
          for (let i = 1; i < priceItem.length; i++) {
            if (priceItem[0] === priceItem[i]) ++count;
          }
          if (count == priceItem.length - 1) price.push(priceItem[0]);
          // console.log("price2: " + price);
        }

        //promotion
        $(el)
          .find(".promotion-global li")
          .each((index, item) => {
            let promotionItem = $(item).text();
            // console.log("promotionItem: ", promotionItem);
            //Xử lý
            promotion.push(promotionItem);
          });

        //category
        const categoryNoHandle = $(el).find(".heading-title h1").text();
        //xử lý
        const categoryHandle = categoryNoHandle.split(" ");
        category = categoryHandle[0];
        // console.log("category: ", category);

        //description
        $(el)
          .find(".product.attribute.description")
          .find("h2, h3, p, p img")
          .each((index, item) => {
            let descriptionItem = $(item).text();
            // console.log("descriptionItem", descriptionItem);
            //xử lý

            if (descriptionItem.length < 75)
              descriptionItem = `/strong/${descriptionItem}`;
            if (descriptionItem === "/strong/")
              descriptionItem = $(item).attr("src");
            descriptionItem !== undefined && description.push(descriptionItem);
            // console.log("description: " + description);
          });
        description.pop(); //Xoá chữ di động Việt
      });

      data.push({
        name,
        thumbnail,
        capacity,
        color,
        price,
        promotion,
        category,
        description,
      });

      fs.writeFileSync(
        "./components/Product/product.json",
        JSON.stringify(data)
      ); // lưu dữ liệu vào file data1.json
      console.log("Crawl dữ liệu thành công");
    } else {
      console.log(error);
    }
  });
});
