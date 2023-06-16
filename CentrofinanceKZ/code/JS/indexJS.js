document.addEventListener('DOMContentLoaded', () => {

	const needAnimateItems = document.querySelectorAll('.needAnimateItem');
	const hinderedItems = document.querySelectorAll('.nativeText');
	const scrollBar=document.querySelector(".scrollBar");
	const languageButton = document.querySelector(".languageButton");
	const menuButton = document.querySelector(".menuButton");
	const menu = document.querySelector(".exitCross");

	let languageButtonFlag=true; 

	function WindowCenter(){
		return (window.innerHeight / 2) + window.scrollY;
	}
	function WindowMoreThenHalf(){
		return WindowCenter()+window.innerHeight/4;
	}
	function WindowBottom(){
		return window.innerHeight+window.scrollY;
	}

	function GetTopFromTopOfWindow(element){
		return window.scrollY+element.getBoundingClientRect().top;
	}
	function GetBottomFromTopOfWindow(element){
		return window.scrollY+element.getBoundingClientRect().bottom;
	}
	function OnScreenCheck(element){
		return WindowMoreThenHalf() >= GetTopFromTopOfWindow(element);
	}
	
	function ProgressBarAnimate(){
		if (OnScreenCheck(scrollBar)){
			var progress=(100*(WindowMoreThenHalf()-GetTopFromTopOfWindow(scrollBar)))/scrollBar.offsetHeight;
			var per=100-progress;
			scrollBar.style.background=`linear-gradient(to top, rgba(201, 61, 28, 0)0%,rgba(201, 61, 28, ${progress/100})${per}%,rgb(201, 61, 28)100%)`;
		}
		else{
			scrollBar.style.background=`linear-gradient(to top, rgba(255, 255, 255, 0)0%,rgba(255, 255, 255, 0)${100}%,rgb(201, 61, 28)100%)`;
		}
	}

	function SetFlagToAnimate(){
		needAnimateItems.forEach(function callback(element){
			OnScreenCheck(element) ? element.classList.add('doAnimate') : element.classList.remove('doAnimate')
		})
	}

	function ScrollHinderedItems(){
		hinderedItems.forEach(function callback(element){
			(WindowBottom()>=GetTopFromTopOfWindow(element) && window.scrollY<=GetBottomFromTopOfWindow(element)+200) ? element.classList.add('hinderedScroll') : element.classList.remove('hinderedScroll');
		})
	}
	const turnLanguageButton=()=>{
		if (languageButtonFlag){
			document.querySelector(".language.ru").style.background="#C93D1C";
			document.querySelector(".language.ru p").style.color="white";
			document.querySelector(".language.kz").style.background="#c93c1c00";
			document.querySelector(".language.kz p").style.color="#C93D1C";
			languageButtonFlag=false;
		}
		else{
			document.querySelector(".language.ru").style.background="#c93c1c00";
			document.querySelector(".language.ru p").style.color="#C93D1C";
			document.querySelector(".language.kz").style.background="#C93D1C";
			document.querySelector(".language.kz p").style.color="white";
			languageButtonFlag=true;
		}
	}
	const showMenu=()=>{
		document.querySelector(".menu").classList.add("showMenu");
	}
	const dontShowMenu=()=>{
		document.querySelector(".menu").classList.remove("showMenu");
	}

	languageButton.addEventListener('click', turnLanguageButton);
	menuButton.addEventListener('click', showMenu);
	menu.addEventListener('click', dontShowMenu);

	window.addEventListener('scroll', e => {
		document.documentElement.style.setProperty('--scrollTop', `${this.scrollY}px`);
		ProgressBarAnimate();
		ScrollHinderedItems();
		SetFlagToAnimate();
	})
});
