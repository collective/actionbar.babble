jQuery(document).ready(function() {

    jQuery("#chatpanel").adjustPanel(); 

    //Each time the viewport is adjusted/resized, execute the function
    jQuery(window).resize(function () {
        jQuery("#chatpanel").adjustPanel();
    });

    //Click event outside of subpanel
    jQuery(document).click(function() { 
        jQuery(".subpanel").hide(); 
        jQuery("#footpanel li a").removeClass('active'); //remove active class on subpanel trigger
    });
    jQuery('.subpanel ul').click(function(e) {
        e.stopPropagation(); //Prevents the subpanel ul from closing on click
    });

    //Click event on Chat Panel
    jQuery("#chatpanel a:first").click(function() { 
        var chatbox = jQuery('#chatbox_bottomfeeder_online_contacts');
        if (chatbox.length) {
            if(chatbox.is(':visible')){ 
                chatbox.hide(); 
            }
            else {
                positionNewChat(chatbox);
                chatbox.show(); 
            }
        }
        else { 
            jQuery.ajax({
                url: "@@show_online_contacts_box",
                cache: false,
                data: {},
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    log.error(textStatus);
                    log.error(errorThrown);
                },
                success: function(data) {
                    jQuery('body').append(data);
                    var chatbox = jQuery('#chatbox_bottomfeeder_online_contacts');
                    positionNewChat(chatbox);
                    chatbox.show();
                }
            });
        }
        return false; //Prevent browser jump to link anchor
    });

    //Show/Hide delete icons on Alert Panel
    jQuery("#alertpanel li").hover(function() {
        jQuery(this).find("a.delete").css({'visibility': 'visible'}); //Show delete icon on hover
    },function() {
        jQuery(this).find("a.delete").css({'visibility': 'hidden'}); //Hide delete icon on hover out
    });
});

