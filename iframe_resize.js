(function () {
    var _iframes = document.querySelectorAll('iframe'),
        _ratios = [],
        _resizing = false,
        _resizingTimeout = null;
    _iframes = Array.filter(_iframes, function (obj) {
        // 設定規則(這裡針對youtube影片,若用特定class則可捨去這段filter,直接修改上面的selector)
        if (obj.src.match(/(youtu.be|youtube)/)) {
            return true;
        }
    });

    function _iframeResize(obj, i) {
        // resize只會影響寬度,只要額外調整高度讓他維持比例即可
        if (obj.offsetHeight / obj.offsetWidth !== _ratios[i]) {
            obj.style.height = (obj.offsetWidth * _ratios[i]) + 'px';
        } else {
            return;
        }
    }

    _iframes.forEach(function (obj, i) {
        _ratios[i] = obj.height / obj.width;
        obj.style.maxWidth = obj.width + 'px';
        obj.style.width = '100%';
        _iframeResize(obj, i);
    });

    window.addEventListener('resize', function () {
        // 避免視窗縮放不斷觸發動作
        if (!_resizing) {
            _resizing = true;
        } else {
            clearTimeout(_resizingTimeout);
        }

        // 手機旋轉畫面延遲觸發
        _resizingTimeout = setTimeout(function () {
            _iframes.forEach(function (obj, i) {
                _iframeResize(obj, i);
            });
            _resizing = false;
        }, 200);
    }, false);
})();