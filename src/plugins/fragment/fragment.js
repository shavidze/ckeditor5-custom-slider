/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module block-quote/blockquote
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FragmentEditing from './js/fragmentEditing';
import FragmentUI from './js/fragmentui';

/**
 * The block quote plugin.
 *
 * For more information about this feature check the {@glink api/block-quote package page}.
 *
 * This is a "glue" plugin which loads the {@link module:block-quote/blockquoteediting~BlockQuoteEditing block quote editing feature}
 * and {@link module:block-quote/blockquoteui~BlockQuoteUI block quote UI feature}.
 *
 * @extends module:core/plugin~Plugin
 */
export default class Fragment extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [FragmentEditing,FragmentUI];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Fragment';
	}
}
