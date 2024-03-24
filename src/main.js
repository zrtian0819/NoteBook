const main = document.querySelector(".MC");
const ContList = document.querySelector(".Toc");
const bodyP = document.querySelector("body");

// let ContentCode = "";

// 異步函數的使用

async function getJson() {
  try {
    const Obj = await fetch("./RenTianNote.json");
    const MyJson = await Obj.json();

    return MyJson;
  } catch (e) {
    console.log(e);
  }
}

getJson().then(function (data) {
  //匯入導覽列的清單
  let toc = "";
  for (let k = 0; k < data.length; k++) {
    let linkTitle = data[k][0].title;

    toc += `<li class="toc_${k} point">${linkTitle}</li>`;
    // console.log(toc);
  }

  ContList.innerHTML = toc;

  for (let k = 0; k < data.length; k++) {
    t = document.querySelector(`.toc_${k}`);
    // console.log(t);

    t.addEventListener("click", function () {
      LoadContents(k);
      clickNev();
    });
  }

  let contents = "";
  let i = 0;

  function LoadContents(code) {
    // 把連結顯示於頁面
    let i = code;
    //匯入該頁的內容
    //匯入標題
    let MajorTilte = data[i][0].title;
    contents = `<h1 style="margin-bottom:20px;">${MajorTilte}</h1>`;

    //匯入內容
    for (let j = 1; j < data[i].length; j++) {
      let tag = data[i][j].tag;
      let text = escapeHtml(data[i][j].text); //轉換字符避免json中有"<"or">"會產生異常顯示
      let style = data[i][j].style !== "" ? ` style=${data[i][j].style}` : "";
      let class_ = data[i][j].class !== "" ? ` style=${data[i][j].class}` : "";
      // let children = data[i][j].children;

      if (tag == "precode") {
        let element = `<pre><code>${text}</code></pre>`;
        // console.log(element);
        contents += element;
      } else if (tag == "img") {
        let element = `<${tag} src="${text}">`;
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
  }
});

// 按鈕的製作
const Lbtn = document.querySelector(".selector");
const Nlist = document.querySelector(".nevbar");

// console.log(Nlist);
// console.log(window.innerWidth);

Lbtn.addEventListener("click", clickNev);
// bodyP.addEventListener("click", clickNev);

function clickNev() {
  //開關導覽頁用的
  if (Nlist.style.width === "0%") {
    if (window.innerWidth < 768) {
      Nlist.style.width = "80%";
      bodyP.classList.add("fade");
    } else {
      Nlist.style.width = "40%";
    }

    Nlist.style.opacity = "1";
  } else {
    Nlist.style.width = "0%";
    Nlist.style.opacity = "0";
    bodyP.classList.remove("fade");
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
