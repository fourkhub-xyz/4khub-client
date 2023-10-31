#!/bin/sh

cd ${WORKDIR}
if [ "${CLIENT_AUTO_UPDATE}" = "true" ]; then
    if [ ! -s /tmp/requirements.txt.sha256sum ]; then
        sha256sum requirements.txt > /tmp/requirements.txt.sha256sum
    fi
    if [ ! -s /tmp/third_party.txt.sha256sum ]; then
        sha256sum third_party.txt > /tmp/third_party.txt.sha256sum
    fi
    if [ "${CLIENT_VERSION}" != "lite" ]; then
        if [ ! -s /tmp/package_list.txt.sha256sum ]; then
            sha256sum package_list.txt > /tmp/package_list.txt.sha256sum
        fi
    fi
    echo "更新程序..."
    git remote set-url origin "${REPO_URL}" &> /dev/null
    echo "windows/" > .gitignore
    if [ "${CLIENT_VERSION}" == "linux_x86_64" ]; then
        branch="linux_x86_64"
    elif [ "${CLIENT_VERSION}" == "linux_armv7"  ]; then
        branch="linux_armv7"
    else
        branch="linux_aarch64"
    fi
    git clean -dffx
    git fetch --depth 1 origin ${branch}
    git reset --hard origin/${branch}
    if [ $? -eq 0 ]; then
        echo "更新成功..."
        # Python依赖包更新
        hash_old=$(cat /tmp/requirements.txt.sha256sum)
        hash_new=$(sha256sum requirements.txt)
        if [ "${hash_old}" != "${hash_new}" ]; then
            echo "检测到requirements.txt有变化，重新安装依赖..."
            if [ "${CLIENT_CN_UPDATE}" = "true" ]; then
                pip install --upgrade pip setuptools wheel -i "${PYPI_MIRROR}"
                pip install -r requirements.txt -i "${PYPI_MIRROR}"
            else
                pip install --upgrade pip setuptools wheel
                pip install -r requirements.txt
            fi
            if [ $? -ne 0 ]; then
                echo "无法安装依赖，请更新镜像..."
            else
                echo "依赖安装成功..."
                sha256sum requirements.txt > /tmp/requirements.txt.sha256sum
                hash_old=$(cat /tmp/third_party.txt.sha256sum)
                hash_new=$(sha256sum third_party.txt)
                if [ "${hash_old}" != "${hash_new}" ]; then
                    echo "检测到third_party.txt有变化，更新第三方组件..."
                    git submodule update --init --recursive
                    if [ $? -ne 0 ]; then
                        echo "无法更新第三方组件，请更新镜像..."
                    else
                        echo "第三方组件安装成功..."
                        sha256sum third_party.txt > /tmp/third_party.txt.sha256sum
                    fi
                fi
            fi
        fi
        # 系统软件包更新
        if [ "${CLIENT_VERSION}" != "lite" ]; then
            hash_old=$(cat /tmp/package_list.txt.sha256sum)
            hash_new=$(sha256sum package_list.txt)
            if [ "${hash_old}" != "${hash_new}" ]; then
                echo "检测到package_list.txt有变化，更新软件包..."
                if [ "${CLIENT_CN_UPDATE}" = "true" ]; then
                    sed -i "s/dl-cdn.alpinelinux.org/${ALPINE_MIRROR}/g" /etc/apk/repositories
                    apk update -f
                fi
                apk add --no-cache libffi-dev
                apk add --no-cache $(echo $(cat package_list.txt))
                if [ $? -ne 0 ]; then
                    echo "无法更新软件包，请更新镜像..."
                else
                    apk del libffi-dev
                    echo "软件包安装成功..."
                    sha256sum package_list.txt > /tmp/package_list.txt.sha256sum
                fi
            fi
        fi
    else
        echo "更新失败，继续使用旧的程序来启动..."
    fi
else
    echo "程序自动升级已关闭，如需自动升级请在创建容器时设置环境变量：CLIENT_AUTO_UPDATE=true"
fi

echo "以PUID=${PUID}，PGID=${PGID}的身份启动程序..."

if [ "${CLIENT_VERSION}" = "lite" ]; then
    mkdir -p /.pm2
    chown -R "${PUID}":"${PGID}" "${WORKDIR}" /config /.pm2
else
    mkdir -p /.local
    mkdir -p /.pm2
    chown -R "${PUID}":"${PGID}" "${WORKDIR}" /config /usr/lib/chromium /.local /.pm2
    export PATH=${PATH}:/usr/lib/chromium
fi
umask "${UMASK}"
exec su-exec "${PUID}":"${PGID}" "$(which dumb-init)" "$(which pm2-runtime)" start client_main.py -n 4khub-client --interpreter python3
