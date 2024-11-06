const scrollShow = () => {
	let pageTop = $(document).scrollTop();
	let pageBottom = pageTop + $(window).height();

	for (let tag of $('.container')) {
		if ($(tag).position().top < pageBottom) {
			$(tag).addClass("visible");
		} else {
			$(tag).removeClass("visible");
		}
	}
};

$(document).on("DOMContentLoaded", () => {
    $(document).on("scroll", scrollShow);
    scrollShow();
});

function openLegend() {
    document.getElementById("legendMenu").style.width = "250px";
}

function closeLegend() {
    document.getElementById("legendMenu").style.width = "0";
}