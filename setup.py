from setuptools import setup, find_packages
import os

version = '0.1a3'

setup(
    name='actionbar.babble',
    version=version,
    description="A actionbar.panel integration package for the Babble instant messaging system.",
    long_description=open("README.txt").read() + "\n" +
                    open(os.path.join("docs", "HISTORY.txt")).read(),
    # Get more strings from
    # http://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
    "Framework :: Plone",
    "Programming Language :: Python",
    ],
    keywords='plone actionbar babble chat',
    author='JC Brand, Syslab.com GmbH',
    author_email='brand@syslab.com',
    url='http://plone.org/products/actionbar.babble/',
    license='GPL',
    packages=find_packages('src', exclude=['ez_setup']),
    package_dir = {'' : 'src'},
    namespace_packages=['actionbar'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'setuptools',
        'babble.client',
        'actionbar.panel',
    ],
    entry_points="""
    [z3c.autoinclude.plugin]
    target = plone
    """,
    setup_requires=["PasteScript"],
    paster_plugins=["ZopeSkel"],
    )
