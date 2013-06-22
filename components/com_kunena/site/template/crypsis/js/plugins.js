/**
 * Kunena Component
 * @package Kunena.Template.Crypsis
 *
 * @copyright (C) 2008 - 2013 Kunena Team. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @link http://www.kunena.org
 **/

function showMessage() {
	div = document.getElementById('tow', 'test1', 'k', 'row');
	div.style.display = "block";
}

function hideMessage() {
	div = document.getElementById('tow','test2', 'k', 'row');
	div.style.display = "none";
}

jQuery(document).ready(function() { 
	jQuery('#kbbcode-message').atwho({
		at: "@", 
		tpl: '<li data-value="${id}"><i class="icon-user"></i>${name} <small>${username}</small></li>',
		limit: 7, 
		callbacks: {
			remote_filter: function(query, callback)  {
				jQuery.ajax({
					url: jQuery( "#kurl_mention" ).val(),
					data: {
						search : query
					},
					success: function(data) {
						callback(data.names);
					}
				});
			}
		}
	}).atwho({
		at: ":",
		tpl:"<li data-value='${key}'>${name} <img src='http://a248.e.akamai.net/assets.github.com/images/icons/emoji/${name}.png'  height='20' width='20' /></li>",
		callbacks: {
			remote_filter: function(query, callback)  {
				jQuery.ajax({
					url: jQuery( "#kurl_emojis" ).val(),
					data: {
						search : query
					},
					success: function(data) {
						callback(data.emojis);
					}
				});
			}
		}
	});
});

window.addEvent('domready', function(){	
	$$('.kspoiler').each(function(el){
		var contentElement = el.getElement('.kspoiler-content');
		var expandElement = el.getElement('.kspoiler-expand');
		var hideElement = el.getElement('.kspoiler-hide');
		el.getElement('.kspoiler-header').addEvent('click', function(e){
			if (contentElement.style.display == "none") {
				contentElement.setStyle('display');
				expandElement.setStyle('display', 'none');
				hideElement.setStyle('display');
			} else {
				contentElement.setStyle('display', 'none');
				expandElement.setStyle('display');
				hideElement.setStyle('display', 'none');
			}
		});
	});
	
  /* To check or uncheck boxes to select items */
	$$('input.kcheckall').addEvent('click', function(e){
		this.getParent('form').getElements('input.kcheck').each(function(el){
			if(el.get('checked')==false){
				el.set('checked',true);
				el.set('value','1');
			} else {
				el.set('value','0');
				el.set('checked',false);
			}
		}); 
	});
  
  /* To close quick-reply form on hit on cancel button */
  $$('.kreply-cancel').addEvent('click', function(e){
		$$('.kreply-form').setStyle('display', 'none');
	});
});

