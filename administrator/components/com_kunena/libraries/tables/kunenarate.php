<?php
/**
 * Kunena Component
 * @package Kunena.Framework
 * @subpackage Tables
 *
 * @copyright (C) 2008 - 2012 Kunena Team. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @link http://www.kunena.org
 **/
defined ( '_JEXEC' ) or die ();

require_once (dirname ( __FILE__ ) . '/kunena.php');

/**
 * Kunena Rate Table
 * Provides access to the #__kunena_rate table
 */
class TableKunenaRate extends KunenaTable {
	public $topicid = null;
	public $userid = null;
	public $rate = null;
	public $time = null;

	public function __construct($db) {
		parent::__construct ( '#__kunena_rate', 'topicid', $db );
	}

	public function check() {
		$user = KunenaUserHelper::get($this->userid);
		$topic = KunenaForumTopicHelper::get($this->topicid);
		if (!$user->exists()) {
			$this->setError(JText::sprintf('COM_KUNENA_LIB_TABLE_RATE_ERROR_USER_INVALID', (int) $user->userid));
		}
		if (!$topic->exists()) {
			$this->setError(JText::sprintf('COM_KUNENA_LIB_TABLE_ATTACHMENTS_ERROR_MESSAGE_INVALID', (int) $topic->id));
		}

		return ($this->getError () == '');
	}
}
