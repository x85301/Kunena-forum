<?php
/**
 * Kunena Component
 * @package Kunena.Framework
 * @subpackage Forum.Topic.Poll
 *
 * @copyright (C) 2008 - 2013 Kunena Team. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @link http://www.kunena.org
 **/
defined ( '_JEXEC' ) or die ();

/**
 * Class KunenaForumTopicPoll
 *
 * @property int $id
 * @property string $title
 * @property int $threadid
 * @property string $polltimetolive
 */
class KunenaForumTopicPoll extends JObject {
	protected $_exists = false;
	protected $_db = null;
	protected $options = false;
	protected $newOptions = false;
	protected $usercount = false;
	protected $users = false;
	protected $myvotes = array();
	protected $mytime = array();

	/**
	 * @param int $identifier
	 */
	public function __construct($identifier = 0) {
		// Always load the topic -- if poll does not exist: fill empty data
		$this->_db = JFactory::getDBO ();
		$this->load ( $identifier );
	}

	/**
	 * Returns KunenaForumTopicPoll object.
	 *
	 * @param mixed $identifier	Poll to load - Can be only an integer.
	 * @param bool  $reset
	 *
	 * @return KunenaForumTopicPoll
	 */
	static public function getInstance($identifier = null, $reset = false) {
		return KunenaForumTopicPollHelper::get($identifier, $reset);
	}

	/**
	 * @param null|bool $exists
	 *
	 * @return bool
	 */
	public function exists($exists = null) {
		$return = $this->_exists;
		if ($exists !== null) {
			$this->_exists = $exists;
		}
		return $return;
	}

	/**
	 * @param array $options	array(id=>name, id=>name)
	 */
	public function setOptions($options) {
		if (!is_array($options)) return;
		foreach ($options as $key => &$value) {
			$value = trim($value);
			if (empty($value)) {
				// Remove empty options
				unset($options[$key]);
			}
		}
		$this->newOptions = $options;
	}

	/**
	 * @return array
	 */
	public function getOptions() {
		if ($this->options === false) {
			$kquery = new KunenaDatabaseQuery();
			$kquery->select('*')->from("{$this->_db->qn('#__kunena_polls_options')}")->where("pollid={$this->_db->Quote($this->id)}")->order('id');
			$this->_db->setQuery($kquery);
			$this->options = (array) $this->_db->loadObjectList('id');
			KunenaError::checkDatabaseError();
		}
		return $this->options;
	}

	/**
	 * @return int
	 */
	public function getTotal() {
		static $total = false;
		if ($total === false) {
			$total = 0;
			$options = $this->getOptions();
			foreach ($options as $option) {
				$total += $option->votes;
			}
		}
		return $total;
	}

	/**
	 * @return int
	 */
	public function getUserCount() {
		if ($this->usercount === false) {
			$kquery = new KunenaDatabaseQuery();
			$kquery->select("COUNT(*)")->from("{$this->_db->qn('#__kunena_polls_users')}")->where("pollid={$this->_db->Quote($this->id)}");
			$this->_db->setQuery($kquery);
			$this->usercount = (int) $this->_db->loadResult();
			KunenaError::checkDatabaseError();
		}
		return $this->usercount;
	}

	/**
	 * @param int $start
	 * @param int $limit
	 *
	 * @return array
	 */
	public function getUsers($start=0, $limit=0) {
		if ($this->users === false) {
			$kquery = new KunenaDatabaseQuery();
			$kquery->select('*')->from("{$this->_db->qn('#__kunena_polls_users')}")->where("pollid={$this->_db->Quote($this->id)}")->order('lasttime DESC');
			$this->_db->setQuery($kquery, $start, $limit);
			$this->myvotes = $this->users = (array) $this->_db->loadObjectList('userid');
			KunenaError::checkDatabaseError();
		}
		return $this->users;
	}

	/**
	 * @param mixed $user
	 *
	 * @return int
	 */
	public function getMyVotes($user = null) {
		$user = KunenaFactory::getUser($user);
		if (!isset($this->myvotes[$user->userid])) {
			$kquery = new KunenaDatabaseQuery();
			$kquery->select("SUM(votes)")->from("{$this->_db->qn('#__kunena_polls_users')}")->where("pollid={$this->_db->Quote($this->id)}")->where("userid={$this->_db->Quote($user->userid)}");
			$this->_db->setQuery($kquery);
			$this->myvotes[$user->userid] = $this->_db->loadResult();
			KunenaError::checkDatabaseError();
		}
		return $this->myvotes[$user->userid];
	}

	/**
	 * @param mixed $user
	 *
	 * @return int
	 */
	public function getLastVoteId($user = null) {
		$user = KunenaFactory::getUser($user);
		$kquery = new KunenaDatabaseQuery();
		$kquery->select('lastvote')->from("{$this->_db->qn('#__kunena_polls_users')}")->where("pollid={$this->_db->Quote($this->id)}")->where("userid={$this->_db->Quote($user->userid)}");
		$this->_db->setQuery($kquery);
		$this->mylastvoteId = $this->_db->loadResult();
		KunenaError::checkDatabaseError();

		return $this->mylastvoteId;
	}

	/**
	 * @param mixed $user
	 *
	 * @return int
	 */
	public function getMyTime($user = null) {
		$user = KunenaFactory::getUser($user);
		if (!isset($this->mytime[$user->userid])) {
			$kquery = new KunenaDatabaseQuery();
			$kquery->select("MAX(lasttime)")->from("{$this->_db->qn('#__kunena_polls_users')}")->where("pollid={$this->_db->Quote($this->id)}")->where("userid={$this->_db->Quote($user->userid)}");
			$this->_db->setQuery($kquery);
			$this->mytime[$user->userid] = $this->_db->loadResult();
			KunenaError::checkDatabaseError();
		}
		return $this->mytime[$user->userid];
	}

	/**
	 * @param int   $option
	 * @param bool  $change
	 * @param mixed $user
	 *
	 * @return bool
	 */
	public function vote($option, $change = false, $user = null) {
		if (!$this->exists()) {
			$this->setError( JText::_ ( 'COM_KUNENA_LIB_POLL_VOTE_ERROR_DOES_NOT_EXIST' ) );
			return false;
		}
		$options = $this->getOptions();
		if (!isset($options[$option])) {
			$this->setError( JText::_ ( 'COM_KUNENA_LIB_POLL_VOTE_ERROR_OPTION_DOES_NOT_EXIST' ) );
			return false;
		}
		$user = KunenaFactory::getUser($user);
		if (!$user->exists()) {
			$this->setError( JText::_ ( 'COM_KUNENA_LIB_POLL_VOTE_ERROR_USER_NOT_EXIST' ) );
			return false;
		}

		$lastVoteId = $this->getLastVoteId($user->userid);
		$votes = $this->getMyVotes($user);

		if (!$votes) {
			// First vote
			$votes = new StdClass();
			$votes->new = true;
			$votes->pollid = $this->id;
			$votes->votes = 1;
		} elseif ($change && isset($lastVoteId)) {
			$votes = new StdClass();
			$votes->new = false;
			$votes->lasttime = null;
			$votes->lastvote = null;
			$votes->votes = 1;
			// Change vote: decrease votes in the last option
			if (!$this->changeOptionVotes($lastVoteId, -1)) {
				// Saving option failed, add a vote to the user
				$votes->votes++;
			}
		} else {
			$votes = new StdClass();
			$votes->new = false;
			// Add a vote to the user
			$votes->votes++;
		}

		$votes->lasttime = JFactory::getDate()->toSql();
		$votes->lastvote = $option;
		$votes->userid = (int)$user->userid;

		// Increase vote count from current option
		$this->changeOptionVotes($votes->lastvote, 1);

		if ($votes->new) {
			// No votes
			$kquery = new KunenaDatabaseQuery();
			$kquery->insert("{$this->_db->qn('#__kunena_polls_users')}")->set("pollid={$this->_db->Quote($this->id)}, userid={$this->_db->Quote($votes->userid)},votes={$this->_db->Quote($votes->votes)}, lastvote={$this->_db->Quote($votes->lastvote)}, lasttime={$this->_db->Quote($votes->lasttime)}");
			$this->_db->setQuery($kquery);
			$this->_db->query();
			if (KunenaError::checkDatabaseError()) {
				$this->setError( JText::_ ( 'COM_KUNENA_LIB_POLL_VOTE_ERROR_USER_INSERT_FAIL' ) );
				return false;
			}

		} else {
			// Already voted
			$kquery = new KunenaDatabaseQuery();
			$kquery->update("{$this->_db->qn('#__kunena_polls_users')}")->set("votes={$this->_db->Quote($votes->votes)},lastvote={$this->_db->Quote($votes->lastvote)},lasttime={$this->_db->Quote($votes->lasttime)}")->where("pollid={$this->_db->Quote($this->id)}")->where("userid={$this->_db->Quote($votes->userid)}");
			$this->_db->setQuery($kquery);
			$this->_db->query();
			if (KunenaError::checkDatabaseError()) {
				$this->setError( JText::_ ( 'COM_KUNENA_LIB_POLL_VOTE_ERROR_USER_UPDATE_FAIL' ) );
				return false;
			}

		}

		return true;
	}

	/**
	 * @param int  $option
	 * @param int  $delta
	 *
	 * @return bool
	 */
	protected function changeOptionVotes($option, $delta) {
		if (!isset($this->options[$option]->votes)) {
			// Ignore non-existent options
			return true;
		}
		$this->options[$option]->votes += $delta;
		// Change votes in the option
		$delta = intval($delta);
		$kquery = new KunenaDatabaseQuery();
		$kquery->update("{$this->_db->qn('#__kunena_polls_options')}")->set("votes=votes+{$delta}")->where("id={$this->_db->Quote($option)}");

		$this->_db->setQuery($kquery);
		$this->_db->query();
		if (KunenaError::checkDatabaseError()) {
			$this->setError( JText::_ ( 'COM_KUNENA_LIB_POLL_VOTE_ERROR_OPTION_SAVE_FAIL' ) );
			return false;
		}
		return true;
	}

	/**
	 * Method to get the polls table object.
	 *
	 * @param string $type		Polls table name to be used.
	 * @param string $prefix	Polls table prefix to be used.
	 *
	 * @return KunenaTable|TableKunenaPolls
	 */
	public function getTable($type = 'KunenaPolls', $prefix = 'Table') {
		static $tabletype = null;

		//Set a custom table type is defined
		if ($tabletype === null || $type != $tabletype ['name'] || $prefix != $tabletype ['prefix']) {
			$tabletype ['name'] = $type;
			$tabletype ['prefix'] = $prefix;
		}

		// Create the user table object
		return JTable::getInstance ( $tabletype ['name'], $tabletype ['prefix'] );
	}

	/**
	 * @param array $data
	 * @param array $allow
	 */
	public function bind(array $data, array $allow = array()) {
		if (!empty($allow)) $data = array_intersect_key($data, array_flip($allow));
		$this->setProperties ( $data );
	}

	/**
	 * Method to load a KunenaForumTopicPoll object by id.
	 *
	 * @param int $id	The poll id to be loaded.
	 *
	 * @return bool
	 */
	public function load($id) {
		// Create the table object
		$table = $this->getTable ();

		// Load the KunenaTable object based on id
		$this->_exists = $table->load ( $id );

		// Assuming all is well at this point lets bind the data
		$this->setProperties ( $table->getProperties () );

		return $this->_exists;
	}

	/**
	 * Method to delete the KunenaForumTopicPoll object from the database.
	 *
	 * @return bool	True on success.
	 */
	public function delete() {
		if (!$this->exists()) {
			return true;
		}

		// Create the table object
		$table = $this->getTable ();

		$success = $table->delete ( $this->id );
		if (! $success) {
			$this->setError ( $table->getError () );
		}
		$this->_exists = false;

		// Delete options
		$kquery = new KunenaDatabaseQuery();
		$kquery->delete()->from("{$this->_db->qn('#__kunena_polls_options')}")->where("pollid={$this->_db->Quote($this->id)}");
		$db->setQuery($kquery);
		$db->query();
		KunenaError::checkDatabaseError();

		// Delete votes
		$kquery = new KunenaDatabaseQuery();
		$kquery->delete()->from("{$this->_db->qn('#__kunena_polls_users')}")->where("pollid={$this->_db->Quote($this->id)}");
		$db->setQuery($kquery);
		$db->query();
		KunenaError::checkDatabaseError();

		// Remove poll from the topic
		$topic = KunenaForumTopicHelper::get($this->threadid);
		if ($success && $topic->exists() && $topic->poll_id) {
			$topic->poll_id = 0;
			$success = $topic->save();
			if (! $success) {
				$this->setError ( $topic->getError () );
			}
		}

		return $success;
	}

	/**
	 * Method to get the poll time to live.
	 *
	 * @return int
	 *
	 * @since 3.0
	 */
	public function getTimeToLive() {
		return JFactory::getDate($this->polltimetolive)->toUnix();
	}

	/**
	 * Method to save the KunenaForumTopicPoll object to the database.
	 *
	 * @param bool $updateOnly	Save the object only if not a new poll.
	 *
	 * @return bool	True on success.
	 */
	public function save($updateOnly = false) {
		//are we creating a new poll
		$isnew = ! $this->_exists;
		if ($isnew && empty($this->newOptions)) {
			$this->setError( JText::_ ( 'COM_KUNENA_LIB_POLL_SAVE_ERROR_NEW_AND_NO_OPTIONS' ) );
			return false;
		}

		// Create the topics table object
		$table = $this->getTable ();
		$table->bind ( $this->getProperties () );
		$table->exists ( $this->_exists );

		//Store the topic data in the database
		if (! $table->store ()) {
			$this->setError ( $table->getError () );
			return false;
		}

		// Set the id for the KunenaForumTopic object in case we created a new topic.
		if ($isnew) {
			$this->load ( $table->id );
			$this->options = array();
		}

		if ($this->newOptions === false) {
			// Options have not changed: nothing left to do
			return true;
		}

		// Load old options for comparision
		$options = $this->getOptions();

		// Find deleted options
		foreach ($options as $key => $item) {
			if (empty($this->newOptions[$key])) {
				$kquery = new KunenaDatabaseQuery();
				$kquery->delete()->from("{$this->_db->qn('#__kunena_polls_options')}")->where("id={$this->_db->Quote($key)}");
				$this->_db->setQuery($kquery);
				$this->_db->query();
				KunenaError::checkDatabaseError();
				// TODO: Votes in #__kunena_polls_users will be off and there's no way we can fix that
				// Maybe we should allow option to reset votes when option gets removed
				// Or we could prevent users from editing poll..
			}
		}
		// Go though new and changed options
		ksort($this->newOptions);
		foreach ($this->newOptions as $key => $value) {
			if (!$value) {
				// Ignore empty options
				continue;
			}
			$kquery = new KunenaDatabaseQuery();
			if (!isset($options[$key])) {
				// Option doesn't exist: create it
				$kquery->insert("{$this->_db->qn('#__kunena_polls_options')}")->set("text={$this->_db->quote($value)}, pollid={$this->_db->Quote($this->id)}, votes={$this->_db->Quote('0')}");
				$this->_db->setQuery($kquery);
				$this->_db->query();
				KunenaError::checkDatabaseError();

			} elseif ($options[$key]->text != $value) {
				// Option exists and has changed: update text
				$kquery->update("{$this->_db->qn('#__kunena_polls_options')}")->set("text={$this->_db->quote($value)}")->where("id={$this->_db->Quote($key)}");
				$this->_db->setQuery($kquery);
				$this->_db->query();
				KunenaError::checkDatabaseError();

			}
		}
		// Force reload on options
		$this->options = false;

		return true;
	}
}
