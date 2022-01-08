const cheerio = require("cheerio"); // khai báo module cheerio
const request = require("request-promise"); // khai báo module request-promise
const fs = require("fs"); // require thêm module filesystem
const res = require("express/lib/response");

// request("https://123job.vn/tuyen-dung", (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);
//     let data = [];
//     $("job__list-item").each((item, index) => {
//       // const job = $(item).find(".job__list-item-title").text();
//       // const company = $(item).find(".job__list-item-company").text();
//       // const address = $(item)
//       //   .find(".job__list-item-info")
//       //   .find(".address")
//       //   .text();
//       // const salary = $(item).find(".job__list-item-info").find(".salary").text();
//       // const title = $(item).find(".content-group__title").text();

//       console.log(111);

//       // console.log(job);
//       // console.log(title);
//       // console.log(address);
//       // console.log(salary);
//       // console.log(job, "---" + company, "---" + address, "---" + salary);
//       // data.push({
//       //   job,
//       //   company,
//       //   address,
//       //   salary,
//       // }); // đẩy dữ liệu vào biến data
//     });

//     // fs.writeFileSync("data.json", JSON.stringify(data)); // lưu dữ liệu vào file data.json
//   } else {
//     console.log(error);
//   }
// });

/* TABLE PRODUCT */
// request(
//   "https://www.thegioididong.com/dtdd-apple-iphone",
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html); // load HTML
//       $(".item.ajaxed.__cate_42").each((index, el) => {
//         const name = $(el).find(".main-contain h3").text().trim();
//         const image = $(el).find(".item-img.item-img_42 img").attr("src");

//         console.log(name);
//         console.log(image);
//       });
//     } else {
//       console.log(error);
//     }
//   }
// );

const handleCapacity = (capacity) => {
  const indexOfFirst = capacity[capacity.length - 1].indexOf("TB");
  console.log(indexOfFirst);
  const capacityItem = capacity[capacity.length - 1].slice(0, indexOfFirst + 2);
  [a, ...rest] = capacity.reverse();
  rest.reverse();
  const finalCapacity = [];
  rest.forEach((item, index) => {
    item = item + "GB";
    finalCapacity.push(item);
  });
  finalCapacity.push(capacityItem);
  return finalCapacity;
};

request(
  "https://www.thegioididong.com/dtdd/iphone-13-pro-max?src=osp",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html); // load HTML
      // console.log(111);
      $(".box_right").each((index, el) => {
        const capacity = $(el).find(".box03.group.desk a").text().split("GB");
        const finalCapacity = handleCapacity(capacity);
        const color = $(el).find(".box03.color.group.desk a").text();
        const price = $(el).find(".box-price-present").text();
        const promotion = $(el)
          .find(".divb.t4 p")
          .text()
          .split("  Xem chi tiết");
        const category = $(el).find(".campaign.c1.dt span").text();
        const description = $(el)
          .find(".box_main")
          .find(".block-tab-content")
          .find(".review-post h3");

        console.log("capacity: " + finalCapacity);
        console.log("color: " + color);
        console.log("price: " + price);
        console.log("promotion: " + promotion);
        console.log("category: " + category);
        console.log("description: " + description);
        // console.log(111);
      });
    } else {
      console.log(error);
    }
  }
);

// request(
//   "https://fptshop.com.vn/dien-thoai/apple-iphone",
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html); // load HTML

//       $(".cdt-product-wrapper.m-b-20").each((index, el) => {
//         // const name = $(el).find(".main-contain h3").text().trim();

//         // console.log(name);
//         console.log(111);
//       });
//     } else {
//       console.log(error);
//     }
//   }
// );

/* TABLE EXTRA INFO */
// request(
//   "https://www.thegioididong.com/dtdd/iphone-13-pro-max?src=osp",
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html); // load HTML
//       $(".content-t-wrap").each((index, el) => {
//         // const screenSize = $(el).find(".main-contain h3").text();
//         // const screenTechnology = $(el).find(".main-contain h3").text();
//         // const resolution = $(el).find(".parameter-item p").text();
//         // const frontCamera = $(el).find(".main-contain h3").text();
//         // const backCamera = $(el).find(".main-contain h3").text();
//         // const video = $(el).find(".main-contain h3").text();
//         // const chip = $(el).find(".main-contain h3").text();
//         // const ram = $(el).find(".main-contain h3").text();
//         // const battery = $(el).find(".main-contain h3").text();
//         // const chargeTechnology = $(el).find(".main-contain h3").text();
//         // const chargePort = $(el).find(".main-contain h3").text();
//         // const sim = $(el).find(".main-contain h3").text();
//         // const operatingSystem = $(el).find(".main-contain h3").text();
//         // const size = $(el).find(".main-contain h3").text();
//         // const weight = $(el).find(".main-contain h3").text();
//         // const backMaterial = $(el).find(".main-contain h3").text();
//         // const borderMaterial = $(el).find(".main-contain h3").text();

//         // console.log("screenSize: " + screenSize);
//         // console.log("screenTechnology: " + screenTechnology);
//         // console.log("resolution: " + resolution);
//         // console.log("frontCamera: " + frontCamera);
//         // console.log("backCamera: " + backCamera);
//         // console.log("video: " + video);
//         // console.log("chip: " + chip);
//         // console.log("ram: " + ram);
//         // console.log("battery: " + battery);
//         // console.log("chargeTechnology: " + chargeTechnology);
//         // console.log("chargePort: " + chargePort);
//         // console.log("sim: " + sim);
//         // console.log("operatingSystem: " + operatingSystem);
//         // console.log("size: " + size);
//         // console.log("weight: " + weight);
//         // console.log("backMaterial: " + backMaterial);
//         // console.log("borderMaterial: " + borderMaterial);
//       });
//     } else {
//       console.log(error);
//     }
//   }
// );

// request(
//   "https://www.thegioididong.com/dtdd-apple-iphone",
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);
//       let data = [];
//       $(".item.ajaxed.__cate_42").each((index, el) => {
//         const name = $(el).find(".main-contain h3").text();

//         data.push({
//           name,
//         }); // đẩy dữ liệu vào biến data
//       });

//       fs.writeFileSync("data.json", JSON.stringify(data)); // lưu dữ liệu vào file data.json
//     } else {
//       console.log(error);
//     }
//   }
// );
