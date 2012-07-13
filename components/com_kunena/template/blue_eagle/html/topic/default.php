<?php
/**
 * Kunena Component
 * @package Kunena.Template.Blue_Eagle
 * @subpackage Topic
 *
 * @copyright (C) 2008 - 2012 Kunena Team. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @link http://www.kunena.org
 **/
defined ( '_JEXEC' ) or die ();
?>
<?php
$this->document->addScriptDeclaration('// <![CDATA[
var kunena_anonymous_name = "'.JText::_('COM_KUNENA_USERNAME_ANONYMOUS').'";
// ]]>');
?>

<?php if ($this->category->headerdesc) : ?>
	<div id="kforum-head" class="<?php echo isset ( $this->category->class_sfx ) ? ' kforum-headerdesc' . $this->escape($this->category->class_sfx) : '' ?>">
		<?php echo KunenaHtmlParser::parseBBCode ( $this->category->headerdesc ) ?>
	</div>
<?php endif ?>

<?php
	$this->displayPoll();
	$this->displayModulePosition( 'kunena_poll' );
	$this->displayTopicActions();
?>

<div class="kblock">
	<div class="kheader">
		<h2><span><?php echo JText::_('COM_KUNENA_TOPIC') ?> <?php echo $this->escape($this->topic->subject) ?></span></h2>
		<?php $this->displayModulePosition( 'kunena_topictitle' ); ?>
		<?php if ($this->usertopic->favorite) : ?><div class="kfavorite"></div><?php endif ?>
		<?php if (!empty($this->keywords)) : ?><div class="kkeywords"><?php echo JText::sprintf('COM_KUNENA_TOPIC_TAGS', $this->escape($this->keywords)) ?></div><?php endif ?>
        <!-- TODO Sven Option erstellen um Rating an und aus zu schalten -->
        <?php //if ($this->displayRating) :?><?php //endif; ?>
        <div class="krating">
            <input type="radio" id="star5" name="rating" value="5"/><label for="star5"
                                                                           title="COM_KUNENA_TOPIC_RATING_ROCKS">5
            stars</label>
            <input type="radio" id="star4" name="rating" value="4"/><label for="star4"
                                                                           title="COM_KUNENA_TOPIC_RATING_PRETTYGOOD">4
            stars</label>
            <input type="radio" id="star3" name="rating" value="3"/><label for="star3"
                                                                           title="COM_KUNENA_TOPIC_RATING_Meh">3
            stars</label>
            <input type="radio" id="star2" name="rating" value="2"/><label for="star2"
                                                                           title="COM_KUNENA_TOPIC_RATING_KINDABAD">2
            stars</label>
            <input type="radio" id="star1" name="rating" value="1"/><label for="star1"
                                                                           title="COM_KUNENA_TOPIC_RATING_SUCKS">1
            star</label>
        </div>
	</div>
	<div class="kcontainer">
		<div class="kbody"><?php $this->displayMessages() ?></div>
	</div>
</div>
<?php $this->displayTopicActions(); ?>

<div class="kcontainer klist-bottom">
	<div class="kbody">
		<div class="kmoderatorslist-jump fltrt">
				<?php $this->displayForumJump (); ?>
		</div>
		<?php if (!empty ( $this->moderators ) ) : ?>
		<div class="klist-moderators">
				<?php
				echo '' . JText::_('COM_KUNENA_MODERATORS') . ": ";
				$modlinks = array();
				foreach ( $this->moderators as $moderator) {
					$modlinks[] = $moderator->getLink ();
				}
				echo implode(', ', $modlinks);
				?>
		</div>
		<?php endif; ?>
	</div>
</div>
