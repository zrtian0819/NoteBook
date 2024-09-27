const main = document.querySelector(".MC");
const ContList = document.querySelector(".Toc");
const bodyP = document.querySelector("body");
const subTocUl = document.querySelector(".subToc-ul");
const subToc = document.querySelector(".subToc");
console.log(subToc);

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
			scrollToTop();
			clickNav2();
		});
	}

	let contents = "";
	let i = 0;

	LoadContents(8); //開發時暫時調用

	//載入頁面
	function LoadContents(code) {
		// 把連結顯示於頁面
		let i = code;
		//匯入該頁的內容
		//匯入標題
		let MajorTilte = data[i][0].title;
		contents = `<h1 style="margin-bottom:20px;">${MajorTilte}</h1>`;

		let subTocContent = "";

		//匯入內容
		for (let j = 1; j < data[i].length; j++) {
			let tag = data[i][j].tag;
			let text = escapeHtml(data[i][j].text); //轉換字符避免json中有"<"or">"會產生異常顯示
			let style = data[i][j].style !== "" ? ` style=${data[i][j].style}` : "";
			let class_ = data[i][j].class !== "" ? ` class=${data[i][j].class}` : "";
			// let children = data[i][j].children;

			if (tag == "precode") {
				let element = `<pre><code>${text}</code></pre>`;
				// console.log(element);
				contents += element;
			} else if (tag == "h2") {
				let element = `<${tag} id="${i}-${j}">${text}</${tag}>`;
				let link = `<a href="#${i}-${j}"><li>${text}</li></a>`;
				// console.log(element);
				subTocContent += link;
				contents += element;
			} else if (tag == "img") {
				let element = `<${tag} src="${text}">`;
				// console.log(element);
				contents += element;
			} else if (tag == "a") {
				let element = `<${tag} href="${text}">📌</${tag}>`;
				// console.log(element);
				contents += element;
			} else {
				let element = `<${tag}${style}${class_}>${text}</${tag}>`;
				// console.log(element);
				contents += element;
			}
		}

		if (subTocContent == "") {
			subToc.style.display = "none";
		} else {
			subToc.style.display = "block";
		}

		subTocUl.innerHTML = `<h4>子目錄</h4>${subTocContent}`;
		main.innerHTML = contents; //內容渲染
		hljs.highlightAll(); // 將程式碼style渲染在頁面
	}
});

//讓頁面捲至最上面
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth", // 添加平滑滾動效果
	});
}

// 按鈕的製作
const Lbtn = document.querySelector(".selector");
const Nlist = document.querySelector(".navbar");

Lbtn.addEventListener("click", clickNav2);
$("nav").click(clickNav2);

//<第二版>點擊選單
function clickNav2() {
	$("nav").toggleClass("nav-open");
	$(".navbar").toggleClass("navbar-open");
}

//轉換字元
function escapeHtml(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

//滾動滑鼠打開與收合navbar的功能
const navbar = document.getElementById("navbar");
let prevScrollPos = window.pageYOffset;

// 監聽滾動事件
window.addEventListener("scroll", () => {
	const currentScrollPos = window.pageYOffset;
	// console.log(prevScrollPos + " | " + currentScrollPos);
	// 判斷滾動方向
	if (prevScrollPos > currentScrollPos) {
		// 向上滾動，顯示導覽列
		navbar.style.transition = "0.3s";
		navbar.style.top = "0";
	} else {
		// 向下滾動，隱藏導覽列
		navbar.style.transition = "2s";
		navbar.style.top = "-100px";
	}

	prevScrollPos = currentScrollPos;
});
