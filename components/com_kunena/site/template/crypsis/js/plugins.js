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
	if (typeof (WBBLANG)=="undefined") {WBBLANG = {};}
	WBBLANG['all']= CURLANG = {
		bold: Joomla.JText._('COM_KUNENA_EDITOR_BOLD'),
		italic: Joomla.JText._('COM_KUNENA_EDITOR_ITALIC'),
		underline: Joomla.JText._('COM_KUNENA_EDITOR_UNDERL'),
		strike: Joomla.JText._('COM_KUNENA_EDITOR_STRIKE'),
		link: Joomla.JText._('COM_KUNENA_EDITOR_LINK'),
		img: Joomla.JText._('COM_KUNENA_EDITOR_IMAGELINK'),
		sup: Joomla.JText._('COM_KUNENA_EDITOR_SUP'),
		sub: Joomla.JText._('COM_KUNENA_EDITOR_SUB'),
		justifyleft: Joomla.JText._('COM_KUNENA_EDITOR_LEFT'),
		justifycenter: Joomla.JText._('COM_KUNENA_EDITOR_CENTER'),
		justifyright: Joomla.JText._('COM_KUNENA_EDITOR_RIGHT'),
		table: Joomla.JText._('COM_KUNENA_EDITOR_TABLE'),
		bullist: Joomla.JText._('COM_KUNENA_EDITOR_ULIST'),
		numlist: Joomla.JText._('COM_KUNENA_EDITOR_OLIST'),
		quote: Joomla.JText._('COM_KUNENA_EDITOR_QUOTE'),
		offtop: "Offtop",
		code: Joomla.JText._('COM_KUNENA_EDITOR_CODE'),
		spoiler: Joomla.JText._('COM_KUNENA_EDITOR_SPOILER'),
		fontcolor: Joomla.JText._('COM_KUNENA_EDITOR_COLOR'),
		fontsize: Joomla.JText._('COM_KUNENA_EDITOR_FONTSIZE'),
		fontfamily: "Font family",
		fs_extrasmall: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_XS'),
		fs_verysmall: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_L'),
		fs_small: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_M'),
		fs_normal: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_S'),
		fs_big: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_XL'),
		fs_verybig: Joomla.JText._('COM_KUNENA_EDITOR_HELPLINE_FONTSIZE_XS'),
		smilebox: "Insert emoticon",
		video: Joomla.JText._('COM_KUNENA_EDITOR_VIDEO'),
		removeFormat: Joomla.JText._('COM_KUNENA_EDITOR_REMOVE_FORMAT'),
		
		modal_maps_title: Joomla.JText._('COM_KUNENA_EDITOR_MODAL_MAP_TITLE'),
		modal_maps_coordinates: Joomla.JText._('COM_KUNENA_EDITOR_MODAL_MAP_COORD_CITY'),

		button_title_horizontalrule: Joomla.JText._('COM_KUNENA_EDITOR_BUTTON_TITLE_HORIZONTALRULE'),
		button_title_poll: Joomla.JText._('COM_KUNENA_EDITOR_BUTTON_TITLE_POLL'),
		button_title_spoiler: Joomla.JText._('COM_KUNENA_EDITOR_BUTTON_TITLE_SPOILER'),
		button_title_hidden: Joomla.JText._('COM_KUNENA_EDITOR_BUTTON_TITLE_HIIDEN'),
		button_title_ebay: Joomla.JText._('COM_KUNENA_EDITOR_BUTTON_TITLE_EBAY'),
		button_title_maps: Joomla.JText._('COM_KUNENA_EDITOR_BUTTON_TITLE_MAPS'),
		button_title_help: Joomla.JText._('COM_KUNENA_EDITOR_BUTTON_TITLE_HELP'),
		modal_help_title: Joomla.JText._('COM_KUNENA_EDITOR_MODAL_HELP_TITLE'),

		code_ini_format:'ini',
		code_css_format:'css',
		code_php_format:'php',
		code_javascript_format:'javascript',
		code_sql_format:'sql',
		code_xml_format:'xml',
	
		modal_link_title: "Insert link",
		modal_link_text: "Display text",
		modal_link_url: "URL",
		modal_email_text: "Display email",
		modal_email_url: "Email",
		modal_link_tab1: "Insert URL",
		
		modal_img_title: "Insert image",
		modal_imgsrc_size: "Set a size for the image",
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
				title: CURLANG.button_title_horizontalrule,
				buttonText: 'horizontalrule',
				buttonHTML: '<span class="fonticon ve-tlb-horizontalrule"></span>',
					transform: {
						'<hr class="khorizontal-rule"> ':' [horizontalrule]'
					}
				},
			poll: {
				title: CURLANG.button_title_poll,
				buttonText: 'poll',
				buttonHTML: '<span class="fonticon ve-tlb-poll"></span>',
					transform: {
						'<div class="kmsgtext-hide"> {SelText} </div> ':' [poll] {SELTEXT} [/poll]'
					}
				},
			spoiler: {
				title: CURLANG.button_title_spoiler,
				buttonText: 'spoiler',
				buttonHTML: '<span class="fonticon ve-tlb-spoiler"></span>',
					transform: {
						'<div class="spoiler"> {SelText} </div> ':' [spoiler] {SELTEXT} [/spoiler]'
					}
				},
			hidden: {
				title: CURLANG.button_title_hidden,
				buttonText: 'hidden',
				buttonHTML: '<span class="fonticon ve-tlb-hidden"></span>',
					transform: {
						'<div class="hidden"> {SelText} </div> ':' [hidden] {SELTEXT} [/hidden]'
					}
				},
			ebay: {
				title: CURLANG.button_title_ebay,
				buttonText: 'ebay',
				transform: {
					'<div class="myquote"> {SelText} </div> ':' [ebay] {SELTEXT} [/ebay]'
				}
			},
			maps: {
				title: CURLANG.button_title_maps,
				buttonText: 'maps',
				modal: {
				title: CURLANG.modal_maps_title,
					width: "500px",
					tabs: [
					{
						input: [
						{param: "COORD",title:CURLANG.modal_maps_coordinates}
						]
					}
					]
				},
				buttonHTML: '<span class="fonticon ve-tlb-maps"></span>',
				transform: {
					'<div class="maps"> {COORD} </div> ':' [maps] {COORD} [/maps]'
				}
			},
			help: {
				title: CURLANG.button_title_help,
				buttonText: 'help',
				buttonHTML: '<span class="fonticon ve-tlb-help"></span>',
				modal: {
					title: CURLANG.modal_help_title,
					width: "600px",
					tabs: [
					{
						html: '<p>This is the content of the Kunena Editor help</p>'
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

