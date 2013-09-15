<?php
/**
 * Kunena Component
* @package Kunena.Administrator.Template
* @subpackage Categories
*
* @copyright (C) 2008 - 2012 Kunena Team. All rights reserved.
* @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
* @link http://www.kunena.org
**/

// no direct access
defined('_JEXEC') or die;
?>
<div class="modal hide fade" id="collapseModal">
	<div class="modal-header">
		<button type="button" role="presentation" class="close" data-dismiss="modal">x</button>
		<h3><?php echo JText::_('COM_CONTENT_BATCH_OPTIONS');?></h3>
	</div>
	<div class="modal-body">
		<p><?php echo JText::_('COM_CONTENT_BATCH_TIP'); ?></p>
		<div class="control-group">
			<div class="controls">
				<label id="batch-language-lbl" class="hasToolip" title="" for="batch-language-id"><?php echo JText::_('COM_KUNENA_BATCH_CATEGORY_LABEL_CATEGORIESLIST'); ?> </label>
				<div id="batch-choose-action" class="control-group">
					<?php echo $this->batch_categories; ?>
				</div>
			</div>
		</div>
		<div class="control-group">
			<div class="controls">
				<label id="batch-language-lbl" class="hasToolip" title="" for="batch-language-id"><?php echo JText::_('COM_KUNENA_BATCH_CATEGORY_LABEL_SETLOCKED'); ?> </label>
				<div id="batch-choose-action" class="control-group">
					<select name="batch_category_locked">
						<option value="-1"><?php echo JText::_('COM_KUNENA_CATEGORIESMANAGER_LABEL_BATCH_KEEPSTATE') ?></option>
						<option value="1"><?php echo JText::_('JYES') ?></option>
						<option value="0"><?php echo JText::_('JNO') ?></option>
					</select>
				</div>
			</div>
		</div>
		<div class="control-group">
			<div class="controls">
				<label id="batch-language-lbl" class="hasToolip" title="" for="batch-language-id"><?php echo JText::_('COM_KUNENA_BATCH_CATEGORY_LABEL_REMOVEMODERATORS'); ?> </label>
				<div id="batch-choose-action" class="control-group">
					<select name="batch_categoy_moderators">
						<option value="-1"><?php echo JText::_('COM_KUNENA_CATEGORIESMANAGER_LABEL_BATCH_KEEPSTATE') ?></option>
						<option value="1"><?php echo JText::_('JYES') ?></option>
					</select>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button class="btn" type="button" onclick="document.id('batch-category-id').value='';document.id('batch-access').value='';document.id('batch-language-id').value='';document.id('batch-tag-id)').value=''" data-dismiss="modal">
			<?php echo JText::_('JCANCEL'); ?>
		</button>
		<button class="btn btn-primary" type="submit" onclick="Joomla.submitbutton('batch_categories');">
			<?php echo JText::_('JGLOBAL_BATCH_PROCESS'); ?>
		</button>
	</div>
</div>
