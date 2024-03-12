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
  let i = 0;

  // console.log(data);
  // console.log(data[i].contents);
  let contents = "";

  for (let j = 0; j < data[i].length; j++) {
    let caption = data[i][j].cap !== "" ? `<h2>${data[i][j].cap}</h2>` : "";
    let paragraph = data[i][j].p !== "" ? `<p>${data[i][j].p}</p>` : "";
    let HCode =
      data[i][j].code !== ""
        ? `<pre><code>${data[i][j].code}</code></pre>`
        : "";

    // console.log(contents);

    contents = contents + caption + paragraph + HCode;
    // console.log(contents);
  }

  main.innerHTML = contents;
  hljs.highlightAll(); // 將程式碼渲染在頁面
});

// 按鈕的製作
const Lbtn = document.querySelector(".selector");
const Nlist = document.querySelector(".nevbar");

console.log(Nlist);
console.log(window.innerWidth);

Lbtn.addEventListener("click", function () {
  if (Nlist.style.width === "0%") {
    if (window.innerWidth < 768) {
      Nlist.style.width = "80%";
    } else {
      Nlist.style.width = "40%";
    }

    Nlist.style.opacity = "1";
  } else {
    Nlist.style.width = "0%";
    Nlist.style.opacity = "0";
  }
});
