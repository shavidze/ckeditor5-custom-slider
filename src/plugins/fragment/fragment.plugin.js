import FragmentIcon from './fragment.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class InsertFragment extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('fragment', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'insert Fragment',
                icon: FragmentIcon,
                tooltip: true
            });

            // Callback executed once the image is clicked.
            view.on('execute', () => {


            });

            return view;
        });
    }
}

