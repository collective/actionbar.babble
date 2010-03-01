import logging
from zope.interface import implements
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from Products.Five.browser import BrowserView
from babble.client import utils
from interfaces import IOnlineContacts

log = logging.getLogger('babble.feeder/browser/onlinecontacts.py')

class OnlineContacts(BrowserView):
    """ """
    implements(IOnlineContacts)
    template = ViewPageTemplateFile('templates/onlinecontacts.pt')

    def get_online_contacts(self):
        return utils.get_online_contacts(self.context)

    def show_online_contacts_box(self):
        """ """
        online_users = self.get_online_contacts()
        return self.template(online_users=online_users)

