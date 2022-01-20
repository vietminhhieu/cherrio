const cheerio = require("cheerio"); // khai báo module cheerio
const request = require("request-promise"); // khai báo module request-promise
const fs = require("fs"); // require thêm module filesystem
const res = require("express/lib/response");

const requestArr = [
  "https://www.thegioididong.com/dtdd/iphone-11?src=osp",
  "https://www.thegioididong.com/dtdd/iphone-12?src=osp",
  "https://www.thegioididong.com/dtdd/iphone-12-pro?src=osp",
  "https://www.thegioididong.com/dtdd/iphone-13-mini?src=osp",
  "https://www.thegioididong.com/dtdd/iphone-13?src=osp",
  "https://www.thegioididong.com/dtdd/iphone-13-pro?src=osp",
  "https://www.thegioididong.com/dtdd/iphone-13-pro-max?src=osp",
  "https://www.thegioididong.com/dtdd/samsung-galaxy-a12-2021?src=osp",
  "https://www.thegioididong.com/dtdd/samsung-galaxy-a22-4g?src=osp",
  "https://www.thegioididong.com/dtdd/samsung-galaxy-a32-4g?src=osp",
  "https://www.thegioididong.com/dtdd/samsung-galaxy-a52?src=osp",
  "https://www.thegioididong.com/dtdd/samsung-galaxy-s20-fan-edition?src=osp",
  "https://www.thegioididong.com/dtdd/samsung-galaxy-s21-plus?src=osp",
  "https://www.thegioididong.com/dtdd/samsung-galaxy-s21-ultra?src=osp",
  "https://www.thegioididong.com/dtdd/samsung-galaxy-z-fold-3?src=osp",
  "https://www.thegioididong.com/dtdd/oppo-a16k?src=osp",
  "https://www.thegioididong.com/dtdd/oppo-a55-4g?src=osp",
  "https://www.thegioididong.com/dtdd/oppo-a95-4g?src=osp",
  "https://www.thegioididong.com/dtdd/oppo-reno5-5g?src=osp",
  "https://www.thegioididong.com/dtdd/oppo-reno6?src=osp",
  "https://www.thegioididong.com/dtdd/xiaomi-redmi-10-4gb-64gb?src=osp",
  "https://www.thegioididong.com/dtdd/xiaomi-redmi-note-10s?src=osp",
  "https://www.thegioididong.com/dtdd/xiaomi-11-lite-5g-ne?src=osp",
  "https://www.thegioididong.com/dtdd/xiaomi-11t-pro-5g-8gb?src=osp",
  "https://www.thegioididong.com/dtdd/nokia-110-4g?src=osp",
  "https://www.thegioididong.com/dtdd/nokia-110-4g?src=osp",
];

let data = [];

requestArr.map((item, index) => {
  request(item, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let productName = "",
        customerName = [],
        avatar =
          "https://www.ihep.org/wp-content/themes/ihep-theme/assets/images/user-profile.jpg",
        submitTime = [],
        rating = [];
      feedbackContent = [];

      $(".detail ").each((index, el) => {
        //name
        productName = $(el).find("h1").text();
        // console.log("productName: ", productName);

        //Tên khách hàng
        $(el)
          .find(".txtname")
          .each((index, item) => {
            customerNameItem = $(item).text();
            // console.log("customerNameItem: ", customerNameItem);
            customerName.push(customerNameItem);
          });
        customerName.length = 2;

        //Thời gian đánh giá
        let timeCount = 0,
          a = 0;
        $(el)
          .find(".txtdate")
          .each((index, item) => {
            submitTimeItem = $(item).text();
            // console.log("submitTimeItem: ", submitTimeItem);
            //xử lý
            ++timeCount;
            if (timeCount % 2 == 0) submitTime.push(submitTimeItem);
          });

        //Đánh giá sao
        let ratingArr = [];
        $(el)
          .find(".item-rate .comment-star i")
          .each((index, item) => {
            ratingItem = $(item).attr("class");
            //xử lý
            ratingArr.push(ratingItem);
            if (ratingArr.length === 5) {
              let count = 0;
              for (let i = 0; i < ratingArr.length; i++) {
                if (ratingArr[i] === "icon-star") ++count;
              }
              rating.push(count);
              //   console.log("count", count);
              ratingArr = [];
            }
          });
        rating.length = 2;

        //Nội dung đánh giá
        $(el)
          .find(".comment__item.par .comment-content .cmt-txt")
          .each((index, item) => {
            feedbackContentItem = $(item).text().trim();
            // console.log("feedbackContentItem: ", feedbackContentItem);
            feedbackContent.push(feedbackContentItem);
          });
      });

      data.push({
        productName,
        customerName,
        avatar,
        submitTime,
        rating,
        feedbackContent,
      });

      fs.writeFileSync(
        "./components/Feedback/feedback.json",
        JSON.stringify(data)
      ); // lưu dữ liệu vào file data1.json
      console.log("Crawl dữ liệu thành công");
    } else {
      console.log(error);
    }
  });
});
