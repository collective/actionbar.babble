from zope.interface import implements
from zope.viewlet.interfaces import IViewlet
from Products.Five.browser import BrowserView
from babble.client import utils
from actionbar.panel.browser.viewlets import ViewletMixin

class ChatViewlet(BrowserView, ViewletMixin):
    """ """
    implements(IViewlet)

    def __init__(self, context, request, view, manager):
        super(ChatViewlet, self).__init__(context, request)
        self.__parent__ = view
        self.context = context
        self.request = request
        self.view = view
        self.manager = manager

    def get_num_online_contacts(self):
        """ Return one less to exclude the current user """
        # XXX: Consider a simple cache
        return len(utils.get_online_usernames(self.context))

    def update(self):
        pass


