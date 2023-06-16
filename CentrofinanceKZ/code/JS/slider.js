const slider = document.querySelectorAll(".slider"),
firstSlider = slider[0].querySelectorAll(".slide")[0],
secondSlider = slider[1].querySelectorAll(".slide")[0],
arrowIcons = document.querySelectorAll(".sliderBlock i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

function GetFirstSlider(element){
	return element.querySelectorAll(".slide")[0];
}

const showHideIcons = () => {
	slider.forEach(function callback(example){
		let scrollWidth = example.scrollWidth - example.clientWidth;
		arrowIcons[0].style.display = example.scrollLeft == 0 ? "none" : "flex";
		arrowIcons[1].style.display = example.scrollLeft == scrollWidth ? "none" : "flex";
		arrowIcons[2].style.display = example.scrollLeft == 0 ? "none" : "flex";
		arrowIcons[3].style.display = example.scrollLeft == scrollWidth ? "none" : "flex";
	})
}

arrowIcons.forEach(function callback(example){
    example.addEventListener("click", () => {
		slider.forEach(function callback(sliderExample){
			let firstSliderWidth = GetFirstSlider(sliderExample).clientWidth + 20; 
			sliderExample.scrollLeft += example.id == "left" ? -firstSliderWidth : firstSliderWidth;
			setTimeout(() => showHideIcons(), 60);
		})
    });
});

const autoSlide = () => {
	slider.forEach(function callback(example){
		if(example.scrollLeft - (example.scrollWidth - example.clientWidth) > -1 || example.scrollLeft <= 0) return;

		positionDiff = Math.abs(positionDiff);
		let firstSliderWidth = GetFirstSlider(example).clientWidth + 20;

		let valDifference = firstSliderWidth - positionDiff;
	
		if(example.scrollLeft > prevScrollLeft) {
			return example.scrollLeft += positionDiff > firstSliderWidth / 3 ? valDifference : -positionDiff;
		}
		example.scrollLeft -= positionDiff > firstSliderWidth / 3 ? valDifference : -positionDiff;
	})
}

const dragStart = (e) => {
	slider.forEach(function callback(example){
		isDragStart = true;
		prevPageX = e.pageX || e.touches[0].pageX;
		prevScrollLeft = example.scrollLeft;
	})
}

const dragging = (e) => {
	slider.forEach(function callback(example){
		if(!isDragStart) return;
		e.preventDefault();
		isDragging = true;
		example.classList.add("dragging");
		positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
		example.scrollLeft = prevScrollLeft - positionDiff;
		showHideIcons();
	})
}

const dragStop = () => {
	slider.forEach(function callback(example){
		isDragStart = false;
		example.classList.remove("dragging");
	
		if(!isDragging) return;
		isDragging = false;
		autoSlide();
	})
}

slider[0].addEventListener("mousedown", dragStart);
slider[0].addEventListener("touchstart", dragStart);

slider[1].addEventListener("mousedown", dragStart);
slider[1].addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
slider[0].addEventListener("touchmove", dragging);
slider[1].addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
slider[0].addEventListener("touchend", dragStop);
slider[1].addEventListener("touchend", dragStop);
