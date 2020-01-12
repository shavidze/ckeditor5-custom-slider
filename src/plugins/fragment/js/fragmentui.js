/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import FragmentIcon from '../img/fragment.svg';
import '../css/fragment.css';

/**
 * The block quote UI plugin.
 *
 * It introduces the `'blockQuote'` button.
 */
export default class FragmentUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( 'fragment', locale => {
			const command = editor.commands.get( 'fragment' );
			const buttonView = new ButtonView( locale );

			buttonView.set( {
				label: t( 'Fragment' ),
				icon: FragmentIcon,
				tooltip: true,
				isToggleable: true
			} );

			// Bind button model to command.
			buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute command.
			this.listenTo( buttonView, 'execute', () => editor.execute( 'fragment' ) );

			return buttonView;
		} );
	}
}
