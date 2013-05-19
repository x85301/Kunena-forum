<?php
/**
 * Kunena Component
 * @package Kunena.Site
 * @subpackage Views
 *
 * @copyright (C) 2008 - 2013 Kunena Team. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @link http://www.kunena.org
 **/
defined ( '_JEXEC' ) or die ();

/**
 * Topic View
 */
class KunenaViewTopic extends KunenaView {
	function displayEdit($tpl = null) {
		$body = JRequest::getVar('body', '', 'post', 'string', JREQUEST_ALLOWRAW);
		$response = array();
		if ($this->me->exists() || $this->config->pubwrite) {
			$msgbody = KunenaHtmlParser::parseBBCode( $body, $this );
			$response ['preview'] = $msgbody;
		}

		// Set the MIME type and header for JSON output.
		$this->document->setMimeEncoding( 'application/json' );
		JResponse::setHeader( 'Content-Disposition', 'attachment; filename="'.$this->getName().'.'.$this->getLayout().'.json"' );

		echo json_encode( $response );
	}

	function displayRate($tpl = null) {
		$starid = $this->app->input->get('starid',0,'int');
		$topicid = $this->app->input->get('topicid',0,'int');;

		if ($this->me->exists() || $this->config->ratingenabled) {
			$rate = KunenaForumTopicRateHelper::get($topicid);

			$activityIntegration = KunenaFactory::getActivityIntegration();
			if (!$rate->save($this->me) && JFactory::getApplication()->input->get('type') != 'ajax') {
				$this->app->enqueueMessage($rate->getError());
				$this->redirectBack();
			}
			$activityIntegration->onAfterRate($this->me->userid, $topic);
		}

		// Set the MIME type and header for JSON output.
		$this->document->setMimeEncoding( 'application/json' );

		echo json_encode( $response );
	}
}