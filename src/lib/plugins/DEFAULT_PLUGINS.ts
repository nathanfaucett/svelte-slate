import BlockQuoteElement, { BLOCK_QUOTE_TYPE } from './BlockQuoteElement.svelte';
import ParagraphElement, { PARAGRAPH_TYPE } from './ParagraphElement.svelte';
import Heading1Element, { HEADING1_TYPE } from './Heading1Element.svelte';
import Heading2Element, { HEADING2_TYPE } from './Heading2Element.svelte';
import Heading3Element, { HEADING3_TYPE } from './Heading3Element.svelte';
import Heading4Element, { HEADING4_TYPE } from './Heading4Element.svelte';
import Heading5Element, { HEADING5_TYPE } from './Heading5Element.svelte';
import Heading6Element, { HEADING6_TYPE } from './Heading6Element.svelte';
import ListItemElement, { LIST_ITEM_TYPE } from './ListItemElement.svelte';
import NumberedListElement, { NUMBERED_LIST_TYPE } from './NumberedListElement.svelte';
import CheckListItemElement, { CHECK_LIST_ITEM_TYPE } from './CheckListItemElement.svelte';
import BulletedListElement, { BULLETED_LIST_TYPE } from './BulletedListElement.svelte';
import TableElement, { TABLE_TYPE, withTable } from './TableElement.svelte';

export const DEFAULT_PLUGINS = {
	[BLOCK_QUOTE_TYPE]: BlockQuoteElement,
	[PARAGRAPH_TYPE]: ParagraphElement,
	[HEADING1_TYPE]: Heading1Element,
	[HEADING2_TYPE]: Heading2Element,
	[HEADING3_TYPE]: Heading3Element,
	[HEADING4_TYPE]: Heading4Element,
	[HEADING5_TYPE]: Heading5Element,
	[HEADING6_TYPE]: Heading6Element,
	[LIST_ITEM_TYPE]: ListItemElement,
	[NUMBERED_LIST_TYPE]: NumberedListElement,
	[BULLETED_LIST_TYPE]: BulletedListElement,
	[CHECK_LIST_ITEM_TYPE]: CheckListItemElement,
	[TABLE_TYPE]: { component: TableElement, withFn: withTable }
};
