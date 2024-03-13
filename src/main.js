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

  let contents = "";

  // for (let j = 1; j < data[i].length; j++) {
  //   let caption = data[i][j].cap !== "" ? `<h2>${data[i][j].cap}</h2>` : "";
  //   let paragraph = data[i][j].p !== "" ? `<p>${data[i][j].p}</p>` : "";
  //   let HCode =
  //     data[i][j].code !== ""
  //       ? `<pre><code>${data[i][j].code}</code></pre>`
  //       : "";
  //   contents = contents + caption + paragraph + HCode;
  // }

  for (let j = 1; j < data[i].length; j++) {
    let tag = data[i][j].tag;
    let text = data[i][j].text;
    let style = data[i][j].style !== "" ? ` style=${data[i][j].style}` : "";
    let class_ = data[i][j].class !== "" ? ` style=${data[i][j].class}` : "";
    let children = data[i][j].children;

    // console.log(tag);

    if (tag == "precode") {
      let element = `<pre><code>${text}<code></pre>`;
      console.log(element);
      contents += element;
    } else {
      let element = `<${tag}${style}${class_}>${text}</${tag}>`;
      console.log(element);
      contents += element;
    }
  }

  main.innerHTML = contents; //內容渲染
  hljs.highlightAll(); // 將程式碼style渲染在頁面
});

// 按鈕的製作
const Lbtn = document.querySelector(".selector");
const Nlist = document.querySelector(".nevbar");

// console.log(Nlist);
// console.log(window.innerWidth);

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
