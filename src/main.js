const main = document.querySelector(".MC");

// 異步函數的使用
async function getJson() {
  try {
    const Obj = await fetch("./123.json");
    const MyJson = await Obj.json();
    return MyJson;
  } catch (e) {
    console.log(e);
  }
}

let MyObj = getJson();

MyObj.then(function (data) {
  // 把連結顯示於頁面

  console.log(data);
  console.log(data[0].contents);
  main.innerHTML = data[0].contents;
  // main.textContent = data[0].contents;
});
