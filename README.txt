Introduction
============

actionbar.babble is the Babble chat client integration package for 
the ActionBar, an extensible floating panel with links at the 
bottom of your Plone site.

For more information regarding Babble and ActionBar, please see their
respective packages: babble.client, babble.server and actionbar.panel.


How to use:
-----------

Just install actionbar.babble via the Plone control panel, or the
portal_quickinstaller tool. 

actionbar.panel and babble.client will be installed automatically as well.

Make sure that the portal_chat tool for babble.client is configured correctly.

You should now automatically have the ActionBar at
the bottom of your Plone site. At the bottom right, you will see a section
called *Online Users*. Clicking on it will popup a dialog showing all the
current online users you can chat with.

Troubleshooting:
----------------

1). The *Online Users* box, and the individual chatboxes appear slightly lower
    and behind the ActionBar panel. When you minimize a box, it disappears behind
    the panel.

 Make sure that the babblefeeder.css file is loaded *after* the chat.css file
 in the portal_css resource registry in the Zope management interface.
 You can do this by hand, or simply re-run the actionbar.babble CSS import step
 in the portal_setup tool.


Compatibility:
--------------

Tested on Plone 3.3 and Plone 4

