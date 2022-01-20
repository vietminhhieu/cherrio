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
      let productName = "",
        customerName = [],
        customerAvatar =
          "https://www.ihep.org/wp-content/themes/ihep-theme/assets/images/user-profile.jpg",
        commentContent = [],
        commentTime = [],
        adminName = "Hiếu Viết Store",
        adminAvatar =
          "https://res.cloudinary.com/duitozhul/image/upload/v1639843038/Smartphone_Web_Frontend/Logo/logo-circle.jpg",
        response = [];

      $(".page-wrapper").each((index, el) => {
        //name
        productName = $(el).find(".heading-title h1").text();
        // console.log("productName: ", productName);

        //Tên khách hàng
        $(el)
          .find(".review-author")
          .each((index, item) => {
            customerNameItem = $(item).text();
            // console.log("customerNameItem: ", customerNameItem);
            customerName.push(customerNameItem);
          });

        //Nội dung bình luận
        $(el)
          .find(".question-content")
          .each((index, item) => {
            commentContentItem = $(item).text().trim();
            // console.log("commentContentItem: ", commentContentItem);
            commentContent.push(commentContentItem);
          });

        //Thời gian bình luận
        $(el)
          .find(".question-details-value")
          .each((index, item) => {
            commentTimeItem = $(item).text();
            // console.log("commentTimeItem: ", commentTimeItem);
            commentTime.push(commentTimeItem);
          });

        //Nội dung phản hồi
        $(el)
          .find(".reply-content")
          .each((index, item) => {
            responseItem = $(item).text().trim();
            let handleBrandResponse = "",
              handleRedundantResponse = "";
            if (responseItem.includes("Di Động Việt"))
              handleBrandResponse = responseItem.replace(
                "Di Động Việt",
                "Hiếu Viết Store"
              );
            response.push(handleBrandResponse);
          });
      });

      data.push({
        productName,
        customerName,
        customerAvatar,
        commentContent,
        commentTime,
        adminName,
        adminAvatar,
        response,
      });

      fs.writeFileSync(
        "./components/Comment/comment.json",
        JSON.stringify(data)
      ); // lưu dữ liệu vào file data1.json
      console.log("Crawl dữ liệu thành công");
    } else {
      console.log(error);
    }
  });
});
