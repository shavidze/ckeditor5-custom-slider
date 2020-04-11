import Command from "@ckeditor/ckeditor5-core/src/command";
import ClickObserver from "@ckeditor/ckeditor5-engine/src/view/observer/clickobserver";

import Swal from "sweetalert2";

export default class SimpleBoxCommand extends Command {
  execute() {
    uploadForm().then((srcList) => {
      this.editor.model.change((writer) => {
        const slider = createSlider(writer, srcList);
        this.editor.model.insertContent(slider);
      });
    });

    const view = this.editor.editing.view;
    view.addObserver(ClickObserver);
    this.listenTo(view.document, "click", (event, data) => {
      const target = data.target;
      const modelObj = editor.editing.mapper.toModelElement(target);

      if (modelObj.name === "sliderArrowRight") {
        plusSlides(1);
      } else {
        plusSlides(-1);
      }
    });
  }
}
var slideIndex = 1;
function plusSlides(n) {
  showslides((slideIndex += n));
}

function showslides(n) {
  var i;
  var slides = document.getElementsByClassName("slider-item");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}
function createSlide(writer, src, active) {
  const sliderItem = writer.createElement("sliderItem", {
    class: active ? "active" : "",
  });
  const sliderItemImage = writer.createElement("sliderItemImage", {
    src: src,
  });
  writer.append(sliderItemImage, sliderItem);
  return sliderItem;
}

function createSlider(writer, srcList) {
  const sliderContainer = writer.createElement("sliderContainer");
  let active = true;
  srcList.forEach((src) => {
    const slide = createSlide(writer, src, active);
    writer.append(slide, sliderContainer);
    active = false;
  });
  const rightArrow = writer.createElement("sliderArrowRight", {
    class: "next",
  });
  const leftArrow = writer.createElement("sliderArrowLeft", {
    class: "prev",
  });
  writer.append(rightArrow, sliderContainer);
  writer.append(leftArrow, sliderContainer);
  return sliderContainer;
}

async function uploadForm() {
  const { value: files } = await Swal.fire({
    title: "Select image",
    input: "file",
    inputAttributes: {
      accept: "image/*",
      "aria-label": "Upload your profile picture",
      multiple: true,
    },
  });

  const promises = Object.keys(files).map((key) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(files[key]);
    });
  });

  const srcList = await Promise.all(promises);

  await Swal.fire({
    title: "Your uploaded picture",
    imageUrl: srcList[0],
    imageAlt: "The uploaded picture",
  });

  return srcList;
}
