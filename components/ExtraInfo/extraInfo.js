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
        screenTechnology = "",
        resolution = "",
        screenSize = "",
        backCamera = "",
        video = "",
        frontCamera = "",
        operatingSystem = "",
        chip = "",
        cpu = "",
        gpu = "",
        ram = "",
        internalMemory = "",
        sim = "",
        wifi = "",
        gps = "",
        bluetooth = "",
        size = "",
        weight = "",
        batteryCapacity = "",
        batteryType = "";

      $(".page-wrapper").each((index, el) => {
        //name
        productName = $(el).find(".heading-title h1").text();
        // console.log("productName: ", productName);

        //Công nghệ màn hình
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let screenTechnologyItem = $(item).text();
            if (screenTechnologyItem.includes("Công nghệ màn hình"))
              screenTechnology = screenTechnologyItem.replace(
                "Công nghệ màn hình",
                ""
              );
            // console.log("screenTechnology: " + screenTechnology);
          });

        //Độ phân giải
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let resolutionItem = $(item).text();
            if (resolutionItem.includes("Độ phân giải"))
              resolution = resolutionItem.replace("Độ phân giải", "");
            // console.log("resolution: " + resolution);
          });

        //Màn hình rộng
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let screenSizeItem = $(item).text();
            if (screenSizeItem.includes("Màn hình rộng"))
              screenSize = screenSizeItem.replace("Màn hình rộng", "");
            // console.log("screenSize: " + screenSize);
          });

        //Camera sau
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let backCameraItem = $(item).text();
            if (backCameraItem.includes("Camera sau"))
              backCamera = backCameraItem.replace("Camera sau", "");
            // console.log("backCamera: " + backCamera);
          });

        //Camera trước
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let videoItem = $(item).text();
            if (videoItem.includes("Quay phim"))
              video = videoItem.replace("Quay phim", "");
            // console.log("video: " + video);
          });

        //Camera trước
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let frontCameraItem = $(item).text();
            if (frontCameraItem.includes("Camera trước"))
              frontCamera = frontCameraItem.replace("Camera trước", "");
            // console.log("frontCamera: " + frontCamera);
          });

        //Hệ điều hành
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let operatingSystemItem = $(item).text();
            if (operatingSystemItem.includes("Hệ điều hành"))
              operatingSystem = operatingSystemItem.replace("Hệ điều hành", "");
            // console.log("operatingSystem: " + operatingSystem);
          });

        //Chipset (hãng SX CPU)
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let chipItem = $(item).text();
            if (chipItem.includes("Chipset (hãng SX CPU)"))
              chip = chipItem.replace("Chipset (hãng SX CPU)", "");
            // console.log("chip: " + chip);
          });

        //Tốc độ CPU
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let cpuItem = $(item).text();
            if (cpuItem.includes("Tốc độ CPU"))
              cpu = cpuItem.replace("Tốc độ CPU", "");
            // console.log("cpu: " + cpu);
          });

        //Chip đồ họa (GPU)
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let gpuItem = $(item).text();
            if (gpuItem.includes("Chip đồ họa (GPU)"))
              gpu = gpuItem.replace("Chip đồ họa (GPU)", "");
            // console.log("gpu: " + gpu);
          });

        //RAM
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let ramItem = $(item).text();
            if (ramItem.includes("RAM")) ram = ramItem.replace("RAM", "");
            // console.log("ram: " + ram);
          });

        //Bộ nhớ trong
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let internalMemoryItem = $(item).text();
            if (internalMemoryItem.includes("Bộ nhớ trong"))
              internalMemory = internalMemoryItem.replace("Bộ nhớ trong", "");
            // console.log("internalMemory: " + internalMemory);
          });

        //SIM
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let simItem = $(item).text();
            if (simItem.includes("SIM")) sim = simItem.replace("SIM", "");
            // console.log("sim: " + sim);
          });

        //Wifi
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let wifiItem = $(item).text();
            if (wifiItem.includes("Wifi")) wifi = wifiItem.replace("Wifi", "");
            // console.log("wifi: " + wifi);
          });

        //GPS
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let gpsItem = $(item).text();
            if (gpsItem.includes("GPS")) gps = gpsItem.replace("GPS", "");
            // console.log("gps: " + gps);
          });

        //Bluetooth
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let bluetoothItem = $(item).text();
            if (bluetoothItem.includes("Bluetooth"))
              bluetooth = bluetoothItem.replace("Bluetooth", "");
            // console.log("bluetooth: " + bluetooth);
          });

        //Kích thước
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let sizeItem = $(item).text();
            if (sizeItem.includes("Kích thước"))
              size = sizeItem.replace("Kích thước", "");
            // console.log("size: " + size);
          });

        //Trọng lượng
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let weightItem = $(item).text();
            if (weightItem.includes("Trọng lượng"))
              weight = weightItem.replace("Trọng lượng", "");
            // console.log("weight: " + weight);
          });

        //Dung lượng pin
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let batteryCapacityItem = $(item).text();
            if (batteryCapacityItem.includes("Dung lượng pin"))
              batteryCapacity = batteryCapacityItem.replace(
                "Dung lượng pin",
                ""
              );
            // console.log("batteryCapacity: " + batteryCapacity);
          });

        //Loại pin
        $(el)
          .find(".attributes-list li")
          .each((index, item) => {
            let batteryTypeItem = $(item).text();
            if (batteryTypeItem.includes("Loại pin"))
              batteryType = batteryTypeItem.replace("Loại pin", "");
            // console.log("batteryType: " + batteryType);
          });
      });

      data.push({
        productName,
        screenTechnology,
        resolution,
        screenSize,
        backCamera,
        video,
        frontCamera,
        operatingSystem,
        chip,
        cpu,
        gpu,
        ram,
        internalMemory,
        sim,
        wifi,
        gps,
        bluetooth,
        size,
        weight,
        batteryCapacity,
        batteryType,
      });

      fs.writeFileSync(
        "./components/ExtraInfo/extraInfo.json",
        JSON.stringify(data)
      ); // lưu dữ liệu vào file data1.json
      console.log("Crawl dữ liệu thành công");
    } else {
      console.log(error);
    }
  });
});
