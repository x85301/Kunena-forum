<?php
/**
 * Kunena Component
 * @package Kunena.Template.Crypsis
 * @subpackage Topic
 *
 * @copyright (C) 2008 - 2013 Kunena Team. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @link http://www.kunena.org
 **/
defined ( '_JEXEC' ) or die ();

// Kunena bbcode editor
?>
<div class="control-group">
	<label class="control-label"><?php echo (JText::_('COM_KUNENA_MESSAGE')) ; ?></label>
	<div class="center"> <span class="center" onclick="kGrowShrinkMessage(100);"
		style="cursor: pointer"><?php echo JText::_('COM_KUNENA_EDITOR_ENLARGE'); ?></span>&nbsp;/&nbsp; <span class="center" onclick="kGrowShrinkMessage(-100);"
		style="cursor: pointer"><?php echo JText::_('COM_KUNENA_EDITOR_SHRINK'); ?></span></div>
	<div class="controls">
		<textarea class="input-xxlarge required" name="message" id="kbbcode-message" rows="12" tabindex="3"><?php echo $this->escape($this->message->message); ?></textarea>
	</div>
</div>

<!-- Hidden preview placeholder -->
<div id="kbbcode-preview" style="display: none;"></div>
<?php if ($this->message->exists()) : ?>
<div class="clr"> </div>
<fieldset>
	<legend><?php echo (JText::_('COM_KUNENA_EDITING_REASON')) ?></legend>
	<input class="kinputbox" name="modified_reason" size="40" maxlength="200" type="text" value="<?php echo $this->modified_reason; ?>" />
</fieldset>
<?php endif; ?>
