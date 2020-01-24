import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  toWidgetEditable
} from "@ckeditor/ckeditor5-widget/src/utils";
import { modelToViewAttributeConverter } from "@ckeditor/ckeditor5-image/src/image/converters";

import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import SimpleBoxCommand from "./simpleboxcommand"; // ADDED

export default class SimpleBoxEditing extends Plugin {
  static get requires() {
    // ADDED
    return [Widget];
  }
  init() {
    console.log("SimpleBoxEditing#init() got called");

    this._defineSchema(); // ADDED
    this._defineConverters();

    this.editor.commands.add("SimpleBox", new SimpleBoxCommand(this.editor));
  }

  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register("sliderContainer", {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: "$block"
    });

    schema.register("sliderItem", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "sliderContainer",

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: "$root"
    });

    schema.register("sliderItemImage", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "sliderItem",
      allowAttributesOf: "$root",

      allowAttributes: ["alt", "src"],
      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$root"
    });
  }

  _defineConverters() {
    // ADDED
    const conversion = this.editor.conversion;

    // conversion.for("upcast").attributeToAttribute({
    //   view: {
    //     name: "img",
    //     key: "src"
    //   },
    //   model: "src"
    // });

    conversion.elementToElement({
      model: "sliderContainer",
      view: {
        name: "div",
        classes: "slider-inner"
      }
    });

    conversion.elementToElement({
      model: "sliderItem",
      view: {
        name: "div",
        classes: "slider-item active"
      }
    });

    conversion.elementToElement({
      model: "sliderItemImage",
      view: {
        name: "img",
        classes: "",
        attributes: {
          src: true
        }
      }
    });
    // conversion.for("dataDowncast").elementToElement({
    //   model: "sliderItemImage",
    //   view: {
    //     name: "img",
    //     classes: "",
    //     attributes: {
    //       src:
    //         "https://i.pinimg.com/originals/b4/e8/bd/b4e8bd7a4c31ea24748e7a587a110fa1.png"
    //     }
    //   }
    // });
    conversion.for("editingDowncast").elementToElement({
      model: "sliderItemImage",
      view: (modelElement, viewWriter) => {
        console.log("model element", modelElement._attrs.get("src"));
        console.log("viewwriter", viewWriter);
        const img = viewWriter.createContainerElement("img", {
          attributes: {
            src: modelElement._attrs.get("src")
          }
        });
        return toWidget(img, viewWriter);
      }
    });
  }
}
