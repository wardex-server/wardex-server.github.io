new WOW().init();

document.addEventListener('DOMContentLoaded', function () {
    if (typeof jQuery === 'undefined') return

    var usernameInput = $('input[name="username"]')
    var emailInput = $('input[name="email"]')

    usernameInput.on('input', function () {
        $.cookie('username', $(this).val(), { expires: 7, path: '/' })
    })

    emailInput.on('input', function () {
        $.cookie('email', $(this).val(), { expires: 7, path: '/' })
    })

    var username = $.cookie('username')
    var email = $.cookie('email')

    if (username) {
        usernameInput.val(username)
    }

    if (email) {
        emailInput.val(email)
    }
});

function copyToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    var notice = document.createElement('div');
    notice.textContent = '\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e';
    notice.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#4c6ef5;color:#fff;padding:10px 18px;border-radius:6px;z-index:99999;font-size:14px';
    document.body.appendChild(notice);
    setTimeout(function () { notice.remove(); }, 1500);
}

function setUsername(username) {
    const input = document.querySelector('[name="username"]');
    if (!input) return;
    input.value = username;

    input.dispatchEvent(new Event('input', { bubbles: true }));
}
