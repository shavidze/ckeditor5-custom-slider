import Command from "@ckeditor/ckeditor5-core/src/command";
import Swal from "sweetalert2";

export default class SimpleBoxCommand extends Command {
  execute() {
    uploadForm().then(srcList => {
      this.editor.model.change(writer => {
        const slider = createSlider(writer, srcList);
        this.editor.model.insertContent(slider);
      });
    });
  }

  // refresh() {
  //     const model = this.editor.model;
  //     const selection = model.document.selection;
  //     const allowedIn = model.schema.findAllowedParent(
  //         selection.getFirstPosition(),
  //         "sliderContainer"
  //     );
  //     this.isEnabled = allowedIn !== null;
  // }
}

function createSlide(writer, src, active) {
  const sliderItem = writer.createElement("sliderItem", {
    class: active ? "active" : ""
  });
  const sliderItemImage = writer.createElement("sliderItemImage", {
    src: src
  });
  writer.append(sliderItemImage, sliderItem);
  return sliderItem;
}

function createSlider(writer, srcList) {
  const sliderContainer = writer.createElement("sliderContainer");
  let active = true;
  srcList.forEach(src => {
    const slide = createSlide(writer, src, active);
    writer.append(slide, sliderContainer);
    active = false;
  });
  return sliderContainer;
}

async function uploadForm() {
  const { value: files } = await Swal.fire({
    title: "Select image",
    input: "file",
    inputAttributes: {
      accept: "image/*",
      "aria-label": "Upload your profile picture",
      multiple: true
    }
  });

  const promises = Object.keys(files).map(key => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(files[key]);
    });
  });

  const srcList = await Promise.all(promises);

  await Swal.fire({
    title: "Your uploaded picture",
    imageUrl: srcList[0],
    imageAlt: "The uploaded picture"
  });

  return srcList;
}
