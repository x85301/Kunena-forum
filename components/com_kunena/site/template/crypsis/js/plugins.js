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

/**
 *  Helper function for to perform JSON request for preview
 */
function kPreviewHelper() {
	if (_previewActive == true){
		if ( jQuery('#kbbcode-message').val() != null ) {
			jQuery.ajax({
				type: 'POST',
				url: jQuery('#kpreview_url').val(),
				async: false,
				dataType: 'json',
				data: {body : jQuery('#kbbcode-message').val() },
				success: function(data){
					jQuery('#kbbcode-preview').html(data.preview);
				}
			});
		}
	}
}

jQuery(document).ready(function() {
	/* To hide or open spoiler on click */
	jQuery('.kspoiler').each(function( ) {	
		jQuery('.kspoiler-header').click(function() {
			if ( jQuery('.kspoiler-content').attr('style')=='display:none' ) {
				jQuery('.kspoiler-content').removeAttr('style');
				jQuery('.kspoiler-expand').attr('style','display:none;');
				jQuery('.kspoiler-hide').removeAttr('style');
			} else {
				jQuery('.kspoiler-content').attr('style','display:none;');
				jQuery('.kspoiler-expand').removeAttr('style');
				jQuery('.kspoiler-hide').attr('style','display:none;');
			}
		});
	});
	
	/* To check or uncheck boxes to select items */
	jQuery('input.kcheckall').click(function() {
		jQuery( '.kcheck' ).each(function( ) {			
			jQuery(this).prop('checked',!jQuery(this).prop('checked'));
		});
	});
		
	/* To close quick-reply form on hit on cancel button */
	jQuery('.kreply-cancel').click(function() {
		jQuery('.kreply-form').attr('style','display:none;');
	});
	
	/* Change avatar in gallery */
	if ( jQuery('#avatar_category_select') != undefined ) { 
		jQuery('#avatar_category_select').change(function() {
			// we getting the name of gallery selected in drop-down by user 
			var avatar_selected =	jQuery('#avatar_category_select').chosen().val();
			var td_avatar = jQuery('#kgallery_avatar_list');
			
			// we remove avatar which exist in td tag to allow us to put new one items
			jQuery('#kgallery_avatar_list').empty(); 
			// we getting from hidden input the url of kunena image gallery
			var url_gallery_main = jQuery('#Kunena_Image_Gallery_URL').val();
			var id_to_select = jQuery('#Kunena_'+avatar_selected);      
			var name_to_select = id_to_select.attr('name');
			// Convert JSON to object
			var image_object = JSON.decode(id_to_select.val());
						
			// Re-create all HTML items with avatars images from gallery selected by user
			for(var i = 0, len = image_object.length; i < len; ++i) {
				if ( name_to_select != 'default' ) {
					var name_img = name_to_select+'/'+image_object[i];
				} else {
					var name_img = image_object[i];
				}
				
				jQuery('<span></span>', {
				'id': 'kspan_gallery'+i}).appendTo(td_avatar);
				jQuery('<label></label>', {
				'id': 'klabel_gallery'+i,'for':'kavatar'+i}).appendTo('#kspan_gallery'+i);
				jQuery('<img>', {
				'src': url_gallery_main+'/'+name_img,'alt':image_object[i],'title':image_object[i]}).appendTo('#klabel_gallery'+i);
				jQuery('<input>', {
				'id': 'kavatar'+i,'type':'radio', 'value':'gallery/'+name_img, 'name':'avatar'}).appendTo('#kspan_gallery'+i);
			}
		});
	}
	
	/* Allow to make working drop-down choose destination */
	jQuery('#kchecktask').change(function() {
		var task = jQuery("select#kchecktask").val();
		if (task=='move') {
			jQuery("#kchecktarget").attr('disabled', false).trigger("liszt:updated");
		}
	});
	
	/* For wysibb editor */
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
					'<div class="highlight"><pre>{SELTEXT}</pre></div>':'[code]{SELTEXT}[/code]'
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
				modal: {
					title: CURLANG.modal_poll_title,
						width: "500px",
						tabs: [
						{
							input: [
							{param: "POLL_FIELD1",title:CURLANG.modal_poll_first_field}
							]
						}
						]
				},
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

