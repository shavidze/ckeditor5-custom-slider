import Command from "@ckeditor/ckeditor5-core/src/command";
import Swal from "sweetalert2";

export default class SimpleBoxCommand extends Command {

    execute() {
        uploadForm().then((srcList) => {
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

function createSlide(writer, src) {
    const sliderItem = writer.createElement("sliderItem", {
        classes: "active"
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

    const {value: files} = await Swal.fire({
        title: "Select image",
        input: "file",
        inputAttributes: {
            "accept": "image/*",
            "aria-label": "Upload your profile picture",
            "multiple": true,
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


//   const s1 = createSlide(
//     writer,
//     "https://i.pinimg.com/originals/b4/e8/bd/b4e8bd7a4c31ea24748e7a587a110fa1.png"
//   );
//   const s2 = createSlide(
//     writer,
//     "https://66.media.tumblr.com/2a3e8e3433c77abd4660448e0dac45d8/tumblr_nrg3iwtxm91qd31sxo2_r1_1280.gifv"
//   );
//   writer.append(s1, sliderContainer);
//   writer.append(s2, sliderContainer);
//   return sliderContainer;
//   //  const simpleBoxTitle = writer.createElement(uploadFormHtml);
//   const uploadFormHtml = `
//   <div class="slider-inner">
//     <div class="slider-item active">
//       <img src="https://i.pinimg.com/originals/b4/e8/bd/b4e8bd7a4c31ea24748e7a587a110fa1.png" alt="First slide">
//     </div>
//     <div class="slider-item" >
//       <img src="https://66.media.tumblr.com/2a3e8e3433c77abd4660448e0dac45d8/tumblr_nrg3iwtxm91qd31sxo2_r1_1280.gifv" alt="Second slide">
//     </div>
// </div>`;


// writer.append(simple, simpleBox);
// writer.append(simpleBoxDescription, simpleBox);
// const viewForm = editor.data.processor.toView(uploadFormHtml);
// const modelForm = editor.data.toModel(viewForm);

// There must be at least one paragraph for the description to be editable.
// See https://github.com/ckeditor/ckeditor5/issues/1464.
//writer.appendElement("paragraph", simpleBoxDescription);
