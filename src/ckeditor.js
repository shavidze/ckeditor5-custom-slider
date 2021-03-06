import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import SimpleBox from "./plugins/simplebox/simplebox"; // ADDED
import CKEditorInspector from "@ckeditor/ckeditor5-inspector"; // ADDED

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
  Essentials,
  UploadAdapter,
  Autoformat,
  Bold,
  Italic,
  BlockQuote,
  CKEditorInspector,
  CKFinder,
  EasyImage,
  Heading,
  Image,
  ImageCaption,
  MediaEmbed,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  Link,
  List,
  Paragraph,
  PasteFromOffice,
  Table,
  TableToolbar,
  SimpleBox,
];

// Editor configuration.
ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "indent",
      "outdent",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
      "simplebox",
    ],
  },
  mediaEmbed: {
    extraProviders: [
      {
        name: "adjarasport",
        url: /^adjarasport\.com/,
        html: (match) => {
          const embedUrl = `https://${match["input"]}`;

          return (
            '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
            `<iframe src="${embedUrl}&autoplay=false" ` +
            'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
            'frameborder="0" allowfullscreen scrolling="no"> ' +
            "</iframe>" +
            "</div>"
          );
        },
      },
      {
        name: "sporcle",
        url: /^sporcle\.com/,
        html: (match) => {
          console.log("match =", match);
          const embedUrl = `https://${match["input"]}`;

          return (
            '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
            `<iframe src="${embedUrl}&autoplay=false" ` +
            'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
            'frameborder="0" allowfullscreen scrolling="no"> ' +
            "</iframe>" +
            "</div>"
          );
        },
      },
    ],
  },
  image: {
    toolbar: [
      "imageTextAlternative",
      "|",
      "imageStyle:alignLeft",
      "imageStyle:full",
      "imageStyle:alignRight",
    ],
    // styles: [
    //     // This option is equal to a situation where no style is applied.
    //     'full',
    //
    //     // This represents an image aligned to the left.
    //     'alignLeft',
    //
    //     // This represents an image aligned to the right.
    //     'alignRight'
    // ]
  },
  blockQuote: {
    toolbar: [
      "imageStyle:alignLeft",
      "imageStyle:full",
      "imageStyle:alignRight",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: "en",
};

//'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" '
