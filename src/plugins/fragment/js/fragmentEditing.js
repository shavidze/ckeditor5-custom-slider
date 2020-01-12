/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module block-quote/fragmentediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import FragmentCommand from './fragmentcommand';

/**
 * The block quote editing.
 *
 * Introduces the `'fragment'` command and the `'fragment'` model element.
 *
 * @extends module:core/plugin~Plugin
 */
export default class FragmentEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'FragmentEditing';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		editor.commands.add( 'fragment', new FragmentCommand( editor ) );

		schema.register( 'fragment', {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );

		// Disallow fragment in fragment.
		schema.addChildCheck( ( ctx, childDef ) => {
			if ( ctx.endsWith( 'fragment' ) && childDef.name == 'fragment' ) {
				return false;
			}
		} );

		editor.conversion.elementToElement( { model: 'fragment', view: 'fragment' } );

		// Postfixer which cleans incorrect model states connected with block quotes.
		editor.model.document.registerPostFixer( writer => {
			const changes = editor.model.document.differ.getChanges();

			for ( const entry of changes ) {
				if ( entry.type == 'insert' ) {
					const element = entry.position.nodeAfter;

					if ( !element ) {
						// We are inside a text node.
						continue;
					}

					if ( element.is( 'fragment' ) && element.isEmpty ) {
						// Added an empty fragment - remove it.
						writer.remove( element );

						return true;
					} else if ( element.is( 'fragment' ) && !schema.checkChild( entry.position, element ) ) {
						// Added a fragment in incorrect place - most likely inside another fragment. Unwrap it
						// so the content inside is not lost.
						writer.unwrap( element );

						return true;
					} else if ( element.is( 'element' ) ) {
						// Just added an element. Check its children to see if there are no nested fragments somewhere inside.
						const range = writer.createRangeIn( element );

						for ( const child of range.getItems() ) {
							if ( child.is( 'fragment' ) && !schema.checkChild( writer.createPositionBefore( child ), child ) ) {
								writer.unwrap( child );

								return true;
							}
						}
					}
				} else if ( entry.type == 'remove' ) {
					const parent = entry.position.parent;

					if ( parent.is( 'fragment' ) && parent.isEmpty ) {
						// Something got removed and now fragment is empty. Remove the fragment as well.
						writer.remove( parent );

						return true;
					}
				}
			}

			return false;
		} );
	}

	/**
	 * @inheritDoc
	 */
	afterInit() {
		const editor = this.editor;
		const command = editor.commands.get( 'fragment' );

		// Overwrite default Enter key behavior.
		// If Enter key is pressed with selection collapsed in empty block inside a quote, break the quote.
		// This listener is added in afterInit in order to register it after list's feature listener.
		// We can't use a priority for this, because 'low' is already used by the enter feature, unless
		// we'd use numeric priority in this case.
		this.listenTo( this.editor.editing.view.document, 'enter', ( evt, data ) => {
			const doc = this.editor.model.document;
			const positionParent = doc.selection.getLastPosition().parent;

			if ( doc.selection.isCollapsed && positionParent.isEmpty && command.value ) {
				this.editor.execute( 'fragment' );
				this.editor.editing.view.scrollToTheSelection();

				data.preventDefault();
				evt.stop();
			}
		} );
	}
}
