/**
* Kunena Component
* @package Kunena.Template.Blue_Eagle
*
* @copyright (C) 2008 - 2013 Kunena Team. All rights reserved.
* @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
* @link http://www.kunena.org
**/
window.addEvent('domready', function () {
	if ( document.id('krating_block') != undefined ) {
		$$('.kratingstar').each(function(el){
			el.addEvent('click', function (e) {
				var ratelevel = el.getProperty('value');
				var url = document.id('krating_submit_url').getProperty('value');
				var res = new Request({
					method:'post',
					url:url,
					data: 'starid='+ratelevel,
					onComplete:function (r) {
						document.id('star'+ratelevel).setProperty('checked', 'checked');
					}
				}).send();
			});
		});
	}
})