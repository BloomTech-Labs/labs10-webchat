function enableChattr() {
	// if (process.env.NODE_ENV === 'production') {
	// 	const BASE_URL= 'https://labs10-webchat.netlify.com/customersignup/';
	// } else {
	// 	const BASE_URL= 'http://localhost:3000/customersignup/'
	// }

	let wcaBtn = document.querySelector(".webChatAppBtn");
	if (wcaBtn === null) return;

	let wcaIFRAME = document.querySelector(".wcaIFRAME");
	let clickCount=0;
	wcaIFRAME.style.display = "none";
  wcaIFRAME.style.width = "450px";
  wcaIFRAME.style.height = "600px";
  wcaIFRAME.style.border = "1px lightgray solid";
  wcaIFRAME.style.overflowY = "hidden";
  wcaBtn.style.textAlign = "center";
  wcaBtn.style.verticalAlign = "middle";
  wcaBtn.src = "https://cdn.icon-icons.com/icons2/72/PNG/256/chat_messages_14395.png";
  wcaBtn.style.position = "fixed";
  wcaBtn.style.borderRadius = "80px";
  wcaBtn.style.width = "75px";
  wcaBtn.style.bottom = "20px";
  wcaBtn.style.outline = "none";
  wcaBtn.style.right = "40px";
  wcaIFRAME.style.position = "fixed";
	wcaIFRAME.style.borderRadius = "20px";
  wcaIFRAME.style.bottom = "120px";
  wcaIFRAME.style.right = "20px";
  wcaIFRAME.style.backgroundColor ="white";


  wcaBtn.onclick = function() {
		if (wcaIFRAME.style.display == "none" & clickCount === 0) {
      clickCount++;
      wcaIFRAME.style.display = "";
      let company_id = wcaIFRAME.getAttribute("data-company-id");
      console.log('company_id in snippet', company_id);

       wcaIFRAME.src = "https://labs10-webchat.netlify.com/customersignup/"+company_id;
      //wcaIFRAME.src = "http://localhost:3000/customersignup/"+company_id;

    } else if (wcaIFRAME.style.display == "none") {
        wcaIFRAME.style.display = "";
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
