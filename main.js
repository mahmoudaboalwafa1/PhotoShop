// Global Variables
let filters = document.querySelectorAll("input[type = 'range']");
let upload = document.querySelector(".upload");
let imageUpload = document.querySelector("input[type='file']");
let btnReset = document.querySelector(".reset");
let btnDownload = document.querySelector(".download");
let currentImage = document.querySelector("img");
let btns = document.querySelector("div.buttons");
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

// Filters
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepa = document.getElementById("sepa");
let grayScale = document.getElementById("gray-scale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

// Upload Image
// اول طريقه لجلب ملف من مستخدم
// upload.addEventListener("click", () => imageUpload.click());
// imageUpload.addEventListener("change", (e) => {
//   let url = URL.createObjectURL(e.target.files[0]);

//   currentImage.src = `${url}`;
// });

// Upload Image
// ثاني طريقة لجلب الملف من المستخدم

upload.addEventListener("click", () => imageUpload.click());
imageUpload.addEventListener("change", () => {
  uploadImage();
  reset();
  btns.style.display = "flex";
});

function uploadImage() {
  let img = new FileReader();
  img.readAsDataURL(imageUpload.files[0]);
  img.onload = () => {
    currentImage.src = img.result;

    canvas.width = currentImage.width;
    canvas.height = currentImage.height;

    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
  };
}

btnReset.onclick = () => reset();

// Filters
filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepa.value}%)
    grayscale(${grayScale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `;

    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
  });
});

// Reset
function reset() {
  ctx.filter = "none";
  saturate.value = 100;
  contrast.value = 100;
  brightness.value = 100;
  sepa.value = 0;
  grayScale.value = 0;
  blur.value = 0;
  hueRotate.vaule = 0;

  ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
}

btnReset.onclick = () => reset();

// Download
btnDownload.onclick = () => {
  btnDownload.href = canvas.toDataURL();
};
