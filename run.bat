@echo off & setlocal EnableDelayedExpansion
if "%1"=="h" goto begin
start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin

set obj[0]=3333
set port=0
set pid=0

for /f "usebackq delims== tokens=1-2" %%a in (`set obj`) do (
    set port=%%b
    for /f "tokens=5" %%m in ('netstat -aon ^| findstr ":%%b"') do (
        set pid=%%m
    )
    if "!pid!"=="0" (
        echo 端口号【!port!】没有占用
    ) else (
        echo 端口号【!port!】相关进程以杀死
        taskkill /f /pid !pid!
    )
    set pid=0
)

start http://localhost:3333/
python client_main.py
