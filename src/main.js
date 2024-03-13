const main = document.querySelector(".MC");
const ContList = document.querySelector(".Toc");

// 異步函數的使用
var data1 = "";

async function getJson() {
  try {
    const Obj = await fetch("./123.json");
    const MyJson = await Obj.json();

    return MyJson;
  } catch (e) {
    console.log(e);
  }
}

getJson().then(function (data) {
  // 把連結顯示於頁面
  let i = 0;

  let toc = "";
  for (let k = 0; k < data.length; k++) {
    let linkTitle = data[k][0].title;

    toc += `<li>${linkTitle}</li>`;

    console.log(toc);
  }
  ContList.innerHTML = toc;

  let contents = "";

  for (let j = 1; j < data[i].length; j++) {
    let tag = data[i][j].tag;
    let text = data[i][j].text;
    let style = data[i][j].style !== "" ? ` style=${data[i][j].style}` : "";
    let class_ = data[i][j].class !== "" ? ` style=${data[i][j].class}` : "";
    let children = data[i][j].children;

    if (tag == "precode") {
      let element = `<pre><code>${text}<code></pre>`;
      // console.log(element);
      contents += element;
    } else {
      let element = `<${tag}${style}${class_}>${text}</${tag}>`;
      // console.log(element);
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
