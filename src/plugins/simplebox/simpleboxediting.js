import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { toWidget } from "@ckeditor/ckeditor5-widget/src/utils";

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
    //const model = this.editor.model;
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
      allowAttributes: ["class"],
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
        classes: "slider-item"
      }
    });

    conversion.elementToElement({
      model: "sliderItemImage",
      view: {
        name: "img"
      }
    });

    // Then the conversion might be a two way attribute-to-attribute:
    conversion.attributeToAttribute({
      model: "src",
      view: { key: "src", name: "img" }
    });

    conversion.attributeToAttribute({
      model: "alt",
      view: "alt"
    });

    conversion.attributeToAttribute({
      model: "class",
      view: {
        name: "div",
        key: "class"
      }
    });

    conversion.for("editingDowncast").elementToElement({
      model: "sliderItemImage",
      view: (modelElement, viewWriter) => {
        const img = viewWriter.createAttributeElement("img", {
          attributes: {
            src: modelElement._attrs.get("src")
          }
        });
        return toWidget(img, viewWriter);
      }
    });
  }
}
