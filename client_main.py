import os, sys, os.path
import signal
import warnings
import threading
import time
from apscheduler.schedulers.background import BackgroundScheduler
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
from watchdog.observers.polling import PollingObserver
import datetime
import platform
import shutil
import subprocess
import logging
import re
import pytz
import parse
import requests
import urllib3
import urllib
from urllib3.exceptions import InsecureRequestWarning
from lxml import etree
from collections import deque
from html import escape
from logging.handlers import RotatingFileHandler
import ruamel.yaml
import base64
import sqlite3
import traceback
import cn2an
import wordninja
from functools import wraps
from math import floor
from pathlib import Path
from urllib import parse
from flask import session
from flask_session import Session
from flask import Flask, request, json, render_template, make_response, session, send_from_directory, send_file
from flask_compress import Compress
from flask_login import LoginManager, login_user, login_required, current_user
from passlib.hash import phpass
import json
from enum import Enum
from flask_login import logout_user, current_user
from time import sleep
import argparse
import bisect
import hashlib
import random
import dateparser
import dateutil.parser
from bencode import bdecode
from functools import lru_cache
from multiprocessing.dummy import Pool as ThreadPool
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as es
from selenium.webdriver.support.wait import WebDriverWait
from collections import deque
from alembic.config import Config as AlembicConfig
from alembic.command import upgrade as alembic_upgrade
from sqlalchemy import cast, func
from sqlalchemy import create_engine
from sqlalchemy import Column, Float, Index, Integer, Text, text, Sequence,BOOLEAN
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.pool import QueuePool
import xmlrpc.client
from pikpakapi import PikPakApi, DownloadStatus
from pkg_resources import parse_version as v
import qbittorrentapi
from datetime import datetime
import transmission_rpc
import tempfile
from functools import reduce
import undetected_chromedriver as uc
from pyvirtualdisplay import Display
import dill
import cloudpickle
from pyquery import PyQuery
import ipaddress
import pkgutil
import importlib
from concurrent.futures import ThreadPoolExecutor
import regex as re
import xml.dom.minidom
from abc import ABCMeta, abstractmethod
from jinja2 import Template
import feapder
from feapder.utils.tools import urlencode
from random import choice
import hmac
from hashlib import md5
import rsa
import zhconv
import anitopy
import requests.exceptions
from decimal import Decimal
import concurrent.futures
from threading import Thread
from operator import itemgetter
import difflib
from plexapi.myplex import MyPlexAccount
from plexapi.server import PlexServer
from pypushdeer import PushDeer
from slack_sdk.errors import SlackApiError
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from threading import Event, Lock
from urllib.parse import urljoin, urlsplit, quote, unquote
from cacheout import CacheManager, LRUCache, Cache
import traceback

#for pyinstaller

warnings.filterwarnings('ignore')

# TODO
# fro dev
os.environ["FKHUB_CONFIG"] = os.path.join(os.path.abspath(os.path.dirname(__file__)),"config","config.yaml")
print(os.environ.get('FKHUB_CONFIG'))
from config import Config
from web.main import App
from run import sigal_handler
from run import init_system,start_service,monitor_config,judge_env,get_run_config

is_windows_exe = judge_env()
if is_windows_exe:
    # 托盘相关库
    import threading
    from windows.trayicon import TrayIcon, NullWriter

# 退出事件
signal.signal(signal.SIGINT, sigal_handler)
signal.signal(signal.SIGTERM, sigal_handler)

# 系统初始化
init_system()

# 启动服务
start_service()
print("启动服务完成")
# 监听配置文件变化
monitor_config()
print("监听配置文件变化完成")
# 本地运行
if __name__ == '__main__':
    # Windows启动托盘
    if is_windows_exe:
        homepage = Config().get_config('app').get('domain')
        if not homepage:
            homepage = "http://localhost:%s" % str(Config().get_config('app').get('web_port'))
        log_path = os.environ.get("FKHUB_LOG")

        sys.stdout = NullWriter()
        sys.stderr = NullWriter()


        def traystart():
            TrayIcon(homepage, log_path)


        if len(os.popen("tasklist| findstr %s" % os.path.basename(sys.executable), 'r').read().splitlines()) <= 2:
            p1 = threading.Thread(target=traystart, daemon=True)
            p1.start()

    # gunicorn 启动
    App.run(**get_run_config())
