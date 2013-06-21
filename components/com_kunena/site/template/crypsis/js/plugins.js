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
	// Translations for Kunena BBCode editor
	if (typeof (WBBLANG)=="undefined") {WBBLANG = {};}
	WBBLANG['all']= CURLANG = {
		bold: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_BOLD'),
		italic: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_ITALIC'),
		underline: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_UNDERL'),
		strike: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_STRIKE'),
		link: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_LINK'),
		img: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_IMAGELINK'),
		sup: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_SUB'),
		sub: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_SUP'),
		justifyleft: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_LEFT'),
		justifycenter: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_CENTER'),
		justifyright: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_RIGHT'),
		table: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_TABLE'),
		bullist: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_ULIST'),
		numlist: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_OLIST'),
		quote: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_QUOTE'),
		offtop: "Offtop",
		code: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_CODE'),
		spoiler: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_SPOILER'),
		fontcolor: "Font color",
		fontsize: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE'),
		fontfamily: "Font family",
		fs_verysmall: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_L'),
		fs_small: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_M'),
		fs_normal: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_S'),
		fs_big: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_XL'),
		fs_verybig: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_XS'),
		smilebox: "Insert emoticon",
		video: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_VIDEO'),
		removeFormat:"Remove format",
			
		modal_link_title: "Insert link",
		modal_link_text: "Display text",
		modal_link_url: "URL",
		modal_email_text: "Display email",
		modal_email_url: "Email",
		modal_link_tab1: "Insert URL",
			
		modal_img_title: "Insert image",
		modal_img_tab1: "Insert URL",
		modal_img_tab2: "Upload image",
		modal_imgsrc_text: "Enter image URL",
		modal_img_btn: "Choose file",
		add_attach: "Add Attachment",
			
		modal_video_text: "Enter the URL of the video",
			
		close: "Close",
		save: "Save",
		cancel: "Cancel",
		remove: "Delete",
			
		validation_err: "The entered data is invalid",
		error_onupload: "Error during file upload",
			
		fileupload_text1: "Drop file here",
		fileupload_text2: "or",
			
		loading: "Loading",
		auto: "Auto",
		views: "Views",
		downloads: "Downloads"
	};	
	
	var kunena_editor = {
		buttons: "bold,italic,underline,strike,sup,sub,fontsize,fontcolor,|,bullist,numlist,justifyleft,justifycenter,justifyright,horizontalrule,|,quote,code,table,spoiler,hidden,poll,|,img,link,|,ebay,video,maps,|,help,removeFormat",
		allButtons: {
			code: {
				hotkey: "ctrl+shift+3", // Keyboard shortcut
				transform: {
					'<div class="mycode"><div class="codetop">Это код программы:</div><div class="codemain">{SELTEXT}</div></div>':'[code]{SELTEXT}[/code]'
				}
			},
			horizontalrule: {
				title: 'Insérer régle horzontale',
				buttonText: 'horizontalrule',
				transform: {
					'<hr class="khorizontal-rule"> ':' [horizontalrule]'
				}
			},
			poll: {
				title: 'Insérer un sondage ',
				buttonText: 'poll',
				transform: {
					'<div class="kmsgtext-hide"> {SelText} </div> ':' [poll] {SELTEXT} [/poll]'
				}
			},
			spoiler: {
				title: 'Insérer spoiler',
				buttonText: 'spoiler',
				transform: {
					'<div class="spoiler"> {SelText} </div> ':' [spoiler] {SELTEXT} [/spoiler]'
				}
			},
			hidden: {
				title: 'Insérer hidden ',
				buttonText: 'hidden',
				transform: {
					'<div class="hidden"> {SelText} </div> ':' [hidden] {SELTEXT} [/hidden]'
				}
			},
			ebay: {
				title: 'Insérer ebay ',
				buttonText: 'ebay',
				transform: {
					'<div class="myquote"> {SelText} </div> ':' [ebay] {SELTEXT} [/ebay]'
				}
			},
			maps: {
				title: 'Insérer maps ',
				buttonText: 'maps',
				transform: {
					'<div class="myquote"> {SelText} </div> ':' [maps] {SELTEXT} [/maps]'
				}
			},
			help: {
				title: 'Afficher l\'aide ',
				buttonText: 'help',
				modal: {
					title: "Aide de Kunena",
					width: "600px",
					tabs: [
						{
							html: ''
						}
					],
					onLoad: function() {
				
					}
				}
			}
		}
	}
	
	jQuery("#kbbcode-message").wysibb(kunena_editor);
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

