# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in token_system/__init__.py
from token_system import __version__ as version

setup(
	name='token_system',
	version=version,
	description='Generating Tokens.',
	author='Monish Lalchandani',
	author_email='lmonish7108@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
