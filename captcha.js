const imgEle = document.querySelector("img[aria-describedby='button-addon2']");
const inputEle = document.querySelector("input[aria-describedby='captchaHelp']");

(async () => {
	if (typeof Tesseract === "undefined") {
		return;
	}
	try {
		const workerPath = chrome.runtime.getURL("worker.min.js");
		const langPath = chrome.runtime.getURL("tessdata");
		const corePath = chrome.runtime.getURL(
			"tesseract-core-simd-lstm.wasm.js"
		);
		const worker = await Tesseract.createWorker("eng", 1, {
			workerPath: workerPath,
			langPath: langPath,
			corePath: corePath
		});
		const imageUrl = imgEle.src;
		const { data: { text } } = await worker.recognize(imageUrl);
        inputEle.value = text;
		await worker.terminate();
	} catch (error) {
		return;
	}
})();
