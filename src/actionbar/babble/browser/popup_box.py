import logging
import xmlrpclib
import simplejson as json
from zope.interface import implements
from Acquisition import aq_inner
from Products.CMFCore.utils import getToolByName
from Products.Five.browser import BrowserView

log = logging.getLogger('actionbar.babble/browser/chat.py')

class BabbleException(Exception):

    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)


class OnlineUsers(BrowserView):
    implements(IChat)

