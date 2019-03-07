function enableChattr() {
	// if (process.env.NODE_ENV === 'production') {
	// 	const BASE_URL= 'https://labs10-webchat.netlify.com/customersignup/:';
	// } else {
	// 	const BASE_URL= 'http://localhost:3000/customersignup/:'
	// }

	let wcaBtn = document.querySelector(".webChatAppBtn");
	if (wcaBtn === null) return;
	
	let wcaIFRAME = document.querySelector(".wcaIFRAME");
	wcaIFRAME.style.display = "none";
	wcaIFRAME.style.width = "450px"; 
	wcaIFRAME.style.height = "650px"; 
	wcaBtn.style.width = "40px"; 
	wcaBtn.style.height = "40px";
	wcaBtn.style.backgroundColor = "rgb(0, 188, 212)";
	wcaBtn.style.padding = "40px";
	wcaBtn.style.color = "white";
	wcaBtn.style.textAlign = "center";
	wcaBtn.style.verticalAlign = "middle";
	wcaBtn.style.borderRadius = "60px";
	wcaBtn.style.position = "absolute";
	wcaBtn.style.bottom = "20px";
	wcaBtn.style.right = "20px";
	wcaIFRAME.style.position = "absolute";
	wcaIFRAME.style.bottom = "120px";
	wcaIFRAME.style.right = "20px";
	wcaBtn.onclick = function() {
		if (wcaIFRAME.style.display == "none") { 
			wcaIFRAME.style.display = "";
			let company_id = window.location.search.replace("?company_id=","");
			wcaIFRAME.src = "https://labs10-webchat.netlify.com/customersignup/:"+company_id;
		} else {
			wcaIFRAME.style.display = "none";
		}
	}
}

window.onload = function (e) {
	enableChattr();
}

window.onpopstate = function(e){
	enableChattr();
};
